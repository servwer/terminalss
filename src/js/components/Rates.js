import { h } from 'preact';

import { formatNumber } from './Helpers';

const Rates = ({ tourNumber, leaders, user = {}, type }) => {
    const maxListCount = (tourNumber === 3) ? 50 : 100;
    let formattedLeaders = leaders.slice(0, maxListCount).map((user, index) => ({
        ...user,
        name: `${user.name} ${user.lastNameFirstChar}`,
        position: index + 1
    }));
    const dataGroups = Array.isArray(formattedLeaders) ? [formattedLeaders.slice(0, maxListCount / 2), formattedLeaders.slice(maxListCount / 2)] : [];
    const userInfoPositionInDataGroups = (dataGroups[1] && dataGroups[1].length) ? 1 : 0;
    const userPosition = user && user.position;
    const userPositionOutOfTable = userPosition && (userPosition > maxListCount);
    const markedPlacesCountInFinalTour = 10;
    const finalTour = 3;

    return (
        <div class='rates'>
            <div class={`rates__heading heading heading_${type}`}>
                <div class='rates__heading-item-left'>
                    <span>Позиция в рейтинге: <b>{userPosition || '-'}</b></span>
                    <span>количество очков: <b>{user ? user.score : '-'}</b></span>
                </div>
                <div class='rates__heading-item-right'><span>{tourNumber}</span> тур</div>
            </div>
            <div class='rates__table-heading'>
                <span>№</span>
                <span>Имя Ф.</span>
                <span>Клубная карта</span>
                <span>Очки</span>
            </div>
            <div class='rates__table-wrapper'>
                {dataGroups.map((group, groupIndex) => (
                    <div class='rates__table' key={`key-${groupIndex}`}>
                        {group.map((user, index) => (
                            <div
                                class='rates__table-item'
                                key={`key-${index}`}
                                data-pos={user.position}
                                data-user={userPosition === user.position}
                                data-active={(tourNumber === finalTour) && (user.position <= markedPlacesCountInFinalTour)}
                            >
                                <span>{user.position}</span>
                                <span title={user.name}>{user.name}</span>
                                <span>{user.cardNumbers}</span>
                                <span>{formatNumber(user.pointsCount)}</span>
                            </div>
                        ))}
                        {(user && userPositionOutOfTable && (groupIndex === userInfoPositionInDataGroups)) && (
                            <div class='rates__table-item' data-user>
                                <span>{(userPosition > 1000) ? '1000+' : userPosition}</span>
                                <span>{user.name}</span>
                                <span>{user.cardNumber}</span>
                                <span>{user.score}</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Rates;
