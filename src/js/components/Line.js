import { h } from 'preact';

import Bet from './Bet';

const Line = ({ tourNumber, bets, user, type }) => (
    <div class='line rates'>
        <div class={`rates__heading heading heading_${type}`}>
            <div class='rates__heading-item-left'>
                <span>Позиция в рейтинге: <b>{user ? user.position : '-'}</b></span>
                <span>количество очков: <b>{user ? user.score : '-'}</b></span>
            </div>
            <div class='rates__heading-item-right'><span>{tourNumber}</span> тур</div>
        </div>
        {!!bets.length && (
            <div class='line__table-heading'>
                <span>Время и дата</span>
                <span>ID пари</span>
                <span>Событие</span>
                <span>Сумма пари</span>
                <span>Коэфф.</span>
                <span>Очки</span>
            </div>
        )}
        <div class='rates__table line__table'>
            {bets.map((bet, index) => <Bet key={`key-${index}`} bet={bet} />)}
        </div>
    </div>
)

export default Line;
