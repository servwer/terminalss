import { h, Component } from 'preact'

import Rules from './Rules';
import Rates from './Rates';
import Line from './Line';
import Loader from './Loader';
import Popup from './Popup';

import Transport from '../transport';

import { formatNumber } from './Helpers';

class App extends Component {
    constructor (props) {
        super();

        this.markaURL = props.markaURL;
        this.externalId = props.externalId;
        this.channelTypeId = props.channelTypeId;
        this.userCard = props.userCard;
        this.currentRating = null;
        this.prevRating = null;
        this.transport = null;
        this.authToken = props.authToken;
        this.isRequestUser = (props.type === 'start' && !props.isVip) || (props.type === 'vip' && props.isVip);

        this.state = {
            isSettingsReceived: props.isSettingsReceived,
            isAuth: props.isAuth,
            activeTab: 'rules',
            isPopupOpen: false,
            tour: 1,
            leaders: [],
            bets: [],
            user: null,
            type: props.type,
            isVIP: props.isVIP,
            campaignId: props.campaignId
        };

        this.sendMessageToParent = this.sendMessageToParent.bind(this);
        this.onSwitchTab = this.onSwitchTab.bind(this);
        this.onClickShowPopup = this.onClickShowPopup.bind(this);
    }

    onClickShowPopup () {
        this.setState({ isPopupOpen: !this.state.isPopupOpen })
    }

    onSwitchTab (e) {
        const name = e.target.dataset.name;

        if (!name || (name === this.state.activeTab)) {
            return;
        }

        this.setState({ activeTab: name });
        this.updateActionData();
    }

    async getCurrentRating () {
        const { result, error } = await this.transport.requestRatings(this.state.campaignId);

        if (error) {
            throw new Error(error);
        }

        const ratingIndex = Array.isArray(result) && result.findIndex((item) => item.status === 'Current');
        const rating = (ratingIndex !== -1) && result[ratingIndex];

        if (rating) {
            const tour = ratingIndex + 1;

            if (tour !== 1) {
                this.prevRating = result[ratingIndex - 1].id;

                if (!this.prevRating) {
                    throw new Error('[MARKA landing] prev rating not found');
                }
            }

            this.currentRating = result[ratingIndex].id;
            this.setState({ tour });
        }
    }

    async getLeaders () {
        const { result, error } = await this.transport.requestLeaders(this.currentRating);
        let leaders = result;

        if (error) {
            throw new Error(error);
        }

        if (this.state.tour !== 1 && this.prevRating) {
            const { result: prevLeaders, error: prevError } = await this.transport.requestLeaders(this.prevRating);

            if (prevError) {
                throw new Error(prevError);
            }
            leaders = this.concatPrevAndCurrentLeaders(leaders, prevLeaders)
        }

        this.setState({ leaders });
    }

    concatPrevAndCurrentLeaders (currentLeaders, prevLeaders) {
        const prevLeadersWithResetScores = prevLeaders.map((prevLeader) => {
            const isContainsInCurrentLeaders = currentLeaders.find((leader) => leader.clientNumber === prevLeader.clientNumber);

            if (isContainsInCurrentLeaders) {
                return null;
            }

            return {
                ...prevLeader,
                pointsCount: 0
            }
        }).filter((item) => item);

        return [...currentLeaders, ...prevLeadersWithResetScores];
    }

    async updateActionData () {
        if (!(this.transport && this.state.campaignId)) {
            throw Error(`Can't update ratings, transport: ${this.transport}, campaignId: ${this.state.campaignId}`)
        }

        await this.getCurrentRating();

        if (!this.currentRating) {
            console.error('[MARKA landing] current rating not found');
            this.sendMessageToParent({ message: 'marka-iframe:redirect:home' });
        } else {
            await this.getLeaders();
        }
    }

    async getBets () {
        if (!(this.userCard && this.transport)) {
            throw new Error(`[MARKA landing] Can't get auth token, userCard is ${this.userCard}`);
        }

        if (!this.currentRating || !this.authToken) {
            throw new Error(`[MARKA landing] error: currentRating is ${this.currentRating}, token is ${this.authToken}`)
        }

        this.transport.setAuthToken(this.authToken);
        const { result: bets, error } = await this.transport.requestClientBets(this.currentRating);

        if (error) {
            throw new Error(error);
        }

        this.setState({ bets })
    }

    async getUser () {
        if (!this.currentRating || !this.authToken) {
            throw new Error(`[MARKA landing] error: currentRating is ${this.currentRating}, token is ${this.authToken}`)
        }

        const { result: user, error } = await this.transport.requestCurrentUser(this.currentRating);

        if (error) {
            throw new Error(error);
        }

        const { points, position, name, lastNameFirstChar, cardNumbers, clientNumbers } = user;
        const formattedUser = {
            position,
            name: `${name} ${lastNameFirstChar}`,
            score: formatNumber(points),
            cardNumber: cardNumbers,
            clientNumbers
        }

        this.setState({ user: formattedUser })
    }

    sendMessageToParent (data) {
        const message = JSON.stringify(data); // отправляем только объекты через postMEssage!!!

        window.parent.postMessage(message, '*')
    }

    async componentWillReceiveProps (nextProps) {
        this.markaURL = nextProps.markaURL;
        this.externalId = nextProps.externalId;
        this.channelTypeId = nextProps.channelTypeId;
        this.userCard = nextProps.userCard;
        this.authToken = nextProps.authToken;

        this.setState({
            isSettingsReceived: nextProps.isSettingsReceived,
            isAuth: nextProps.isAuth,
            type: nextProps.type,
            campaignId: nextProps.campaignId
        });

        if (nextProps.isAuth && ((nextProps.type === 'start' && !nextProps.isVip) || (nextProps.type === 'vip' && nextProps.isVip))) {
            await this.getBets();
            await this.getUser();
        }
    }

    async componentDidMount () {
        this.transport = new Transport(this.markaURL, this.authToken);

        await this.updateActionData();

        if (this.userCard && this.isRequestUser) {
            await this.getBets();
            await this.getUser();
        }
    }

    render (props, { isAuth, type, isSettingsReceived, isPopupOpen, tour, leaders, bets }) {
        const headerClass = `header header_${type}`;

        return (
            <div class='container' id='container'>
                <div class='button-back' onClick={props.onClick}>
                    <svg width='16' height='16' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M18 9H5.83L11.42 3.41L10 2L2 10L10 18L11.41 16.59L5.83 11H18V9Z' fill='white' />
                    </svg>
                    <span>Лига Миллионеров</span>
                </div>
                <div class='sticky'>
                    <div class={headerClass} />
                    <ul class='menu' onClick={this.onSwitchTab}>
                        <li class='menu__item' data-active={this.state.activeTab === 'rules'} data-name='rules'>Условия акции</li>
                        <li class='menu__item' data-active={this.state.activeTab === 'rates'} data-name='rates'>Рейтинг участников</li>
                        {isAuth && !!bets.length && <li class='menu__item' data-active={this.state.activeTab === 'line'} data-name='line'>Квалификационные пари</li>}
                    </ul>
                </div>
                {isSettingsReceived
                    ? (
                        <div class='content'>
                            {this.state.activeTab === 'rules' && <Rules type={type} onClickShowPopup={this.onClickShowPopup} />}
                            {this.state.activeTab === 'rates' && <Rates type={type} tourNumber={tour} leaders={leaders} user={this.state.user} />}
                            {this.state.activeTab === 'line' && isAuth && <Line type={type} isAuth={isAuth} user={this.state.user} tourNumber={tour} bets={bets} />}
                        </div>
                    ) : <Loader />
                }
                {isPopupOpen && <Popup onClose={this.onClickShowPopup} />}
            </div>
        )
    }
}

export default App;
