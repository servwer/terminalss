import { h, Component } from 'preact';

import { formatNumber, betFormatNumber } from './Helpers';

class Bet extends Component {
    constructor (props) {
        super(props);

        this.date = new Date(this.props.bet.betDate);
        this.formattedDate = this.date.toLocaleDateString('ru-RU', { year: '2-digit', month: '2-digit', day: 'numeric' });
        this.formattedTime = this.date.toLocaleString('ru-RU', { hour: 'numeric', minute: 'numeric' });
        this.isNonOrdinar = this.props.bet.type.toLowerCase() !== 'single';
        this.isOrdinar = this.props.bet.type.toLowerCase() === 'single';
        this.isSystem = this.props.bet.type.toLowerCase() === 'combo';
        this.isExpress = this.props.bet.type.toLowerCase() === 'express';
        this.outcomesLength = this.props.bet.betEvents.length;

        this.state = {
            isOpen: false
        }
        this.onClickOpenBody = this.onClickOpenBody.bind(this);
    }

    get name () {
        if (this.isOrdinar) {
            return this.props.bet.betEvents[0].eventTitle;
        } else if (this.isExpress) {
            return `Экспресс из ${this.outcomesLength} событий`;
        } else if (this.isSystem) {
            return `Система`;
        }
    }

    onClickOpenBody () {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render ({ bet }, { isOpen }) {
        const { points, betSumm, betId, betEvents, totalFactor } = bet;

        return (
            <div class='bet rates__table-item'>
                <div class='bet__top-block'>
                    <span>
                        <time>{this.formattedTime}</time>
                        <time>{this.formattedDate}</time>
                    </span>
                    <span>№{betId}</span>
                    <span data-pad={this.isNonOrdinar}>
                        {this.isNonOrdinar && <div class='bet__arrow' data-open={isOpen} onClick={this.onClickOpenBody} />}
                        {this.name}
                    </span>
                    <span>{formatNumber(betSumm)}</span>
                    <span>{betFormatNumber(totalFactor)}</span>
                    <span>{formatNumber(points)}</span>
                </div>
                {this.isNonOrdinar && isOpen && (
                    <div class='bet__body'>
                        {betEvents.map((event, index) => <div key={`index-${index}`}>{event.eventTitle}</div>)}
                    </div>
                )}
            </div>
        )
    }
}

export default Bet;
