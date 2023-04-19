import { h, Component } from 'preact'

import Main from './Main';
import Transport from '../transport';
import NavStart from '../../img/nav-start.jpg';
import NavVIP from '../../img/nav-vip.jpg';

class App extends Component {
    constructor () {
        super();

        this.userCard = null;
        this.transport = null;
        this.authToken = null;
        this.markaURL = null;
        this.userCard = null;
        this.externalId = null;
        this.channelTypeId = null;
        this.campaignResId = null;
        this.campaignResIdVIP = null;

        this.state = {
            type: null,
            isVIP: false,
            campaignId: null,
            isAuth: true,
            isSettingsReceived: false
        };

        this.onParentMessage = this.onParentMessage.bind(this);
        this.onClickBack = this.onClickBack.bind(this);
    }

    set (key, value) {
        this[key] = value;
    }

    setSettings (data) {
        const { message, ...settings } = data;
        console.log('setSettings', data)
        Object.keys(settings).forEach((key) => {
            this.set(key, settings[key]);
        })
    }

    async setInitialSettings (data) {
        this.setSettings(data);
        this.transport = new Transport(this.markaURL, this.authToken);
        console.log('this.markaURL, this.authToken, userCard', this.markaURL, this.authToken, this.userCard)
        this.setState({
            isAuth: !!this.userCard,
            isSettingsReceived: true
        });

        await this.getActions();

        if (this.userCard) {
            await this.getUserInfo();
        }
    }

    async getUserInfo () {
        try {
            const response = await this.transport.getUserInfo(this.authToken);
            const data = await response.json();
            const vipStatus = data.result && data.result.vipStatus;

            this.setState({
                isVIP: vipStatus
            });
        } catch (e) {
            console.error(e);
        }
    }

    async getActions () {
        const { result, error } = await this.transport.requestActions(this.externalId, this.channelTypeId);

        if (error) {
            throw new Error(error);
        }

        const { campaignsMeta } = result || [];

        if (campaignsMeta.length < 2) {
            throw new Error('Недостаточное количество начавшихся акций, меньше чем 2');
        }

        const { campaignId } = campaignsMeta[0];
        const { campaignId: campaignIdVIP } = campaignsMeta[1];

        this.campaignResId = campaignId;
        this.campaignResIdVIP = campaignIdVIP;
    }

    async onParentMessage (event) {
        if (!event.data || (event.origin === window.location.origin)) {
            return;
        }

        try {
            const data = JSON.parse(event.data);

            switch (data.message) {
            case 'terminal:init': {
                this.setInitialSettings(data);
                break;
            }
            case 'terminal:auth:off': {
                this.setSettings(data);
                this.setState({ isAuth: false });
                break;
            }
            case 'terminal:auth:on': {
                this.setSettings(data);
                this.setState({ isAuth: true });

                await this.getUserInfo();
            }
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    onClickChangeType (type) {
        if (type === 'start' && this.campaignResId) {
            this.setState({
                type,
                campaignId: this.campaignResId
            });
        }

        if (type === 'vip' && this.campaignResIdVIP) {
            this.setState({
                type,
                campaignId: this.campaignResIdVIP
            });
        }
    }

    onClickBack () {
        this.setState({
            type: null
        })
    }

    componentDidMount () {
        window.addEventListener('message', this.onParentMessage);
    }

    componentWillUnmount () {
        window.removeEventListener('message', this.onParentMessage);
    }

    render (props, { type, isVIP, campaignId, isSettingsReceived, isAuth }) {
        return (
            <div class='app'>
                {type ? (
                    <Main
                        type={type}
                        isVIP={isVIP}
                        onClick={this.onClickBack}
                        campaignId={campaignId}
                        markaURL={this.markaURL}
                        externalId={this.externalId}
                        channelTypeId={this.channelTypeId}
                        userCard={this.userCard}
                        authToken={this.authToken}
                        isAuth={isAuth}
                        isSettingsReceived={isSettingsReceived}
                    />
                ) : (
                    <div class='app__nav'>
                        <div class='app__nav-header'>Выберите свою Лигу (iframe)</div>
                        <div class='app__nav-block'>
                            <div class='app__nav-img-left' onClick={() => this.onClickChangeType('start')}>
                                <img src={NavStart} />
                            </div>
                            <div class='app__nav-img-right' onClick={() => this.onClickChangeType('vip')}>
                                <img src={NavVIP} />
                            </div>
                        </div>
                        <div class='app__nav-bottom' />
                    </div>
                )}
            </div>
        );
    }
}

export default App;
