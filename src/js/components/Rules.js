import { h } from 'preact'

const Rules = ({ ...props }) => {
    const isStartType = props.type === 'start';
    const sum = isStartType ? ' 500' : ' 3 000';
    const allSums = isStartType ? (
        <div class='prize'>
            <div class={`prize__item prize__item_${props.type}`} data-num='1'>
                <span class={`prize__name heading heading_${props.type}`}>тур</span>
                <ul class='prize__list colored-list'>
                    <li class='prize__list-item'><span>1 место – 50 000 &#8381;</span></li>
                    <li class='prize__list-item'><span>2 место – 40 000 &#8381;</span></li>
                    <li class='prize__list-item'><span>3 место – 30 000 &#8381;</span></li>
                    <li class='prize__list-item'><span>4 место – 25 000 &#8381;</span></li>
                    <li class='prize__list-item'><span>5 место – 20 000 &#8381;</span></li>
                    <li class='prize__list-item'><span>6 место – 15 000 &#8381;</span></li>
                    <li class='prize__list-item'><span>7 место – 15 000 &#8381;</span></li>
                    <li class='prize__list-item'><span>8-10 место – 10 000 &#8381;</span></li>
                    <div class='prize__list-anno'><span>фрибетами</span></div>
                </ul>
            </div>
            <div class={`prize__item prize__item_${props.type}`} data-num='2'>
                <span class={`prize__name heading heading_${props.type}`}>тур</span>
                <ul class='prize__list colored-list'>
                    <li class='prize__list-item'><span>1 место – 50 000 &#8381;</span></li>
                    <li class='prize__list-item'><span>2 место – 40 000 &#8381;</span></li>
                    <li class='prize__list-item'><span>3 место – 30 000 &#8381;</span></li>
                    <li class='prize__list-item'><span>4 место – 25 000 &#8381;</span></li>
                    <li class='prize__list-item'><span>5 место – 20 000 &#8381;</span></li>
                    <li class='prize__list-item'><span>6 место – 15 000 &#8381;</span></li>
                    <li class='prize__list-item'><span>7 место – 15 000 &#8381;</span></li>
                    <li class='prize__list-item'><span>8-10 место – 10 000 &#8381;</span></li>
                    <div class='prize__list-anno'><span>фрибетами</span></div>
                </ul>
            </div>
            <div class={`prize__item prize__item_${props.type}`} data-num='3'>
                <span class={`prize__name heading heading_${props.type}`}>тур</span>
                <ul class='prize__list colored-list'>
                    <li class='prize__list-item'><span>1 место – <em>300 000</em> &#8381;</span></li>
                    <div class='prize__list-anno prize__list-anno_last'><span>деньгами</span></div>
                    <li class='prize__list-item'><span>2 место – 200 000 &#8381;</span></li>
                    <li class='prize__list-item'><span>3 место – 125 000 &#8381;</span></li>
                    <li class='prize__list-item'><span>4 место – 75 000 &#8381;</span></li>
                    <li class='prize__list-item'><span>5 место – 50 000 &#8381;</span></li>
                    <li class='prize__list-item'><span>6 место – 40 000 &#8381;</span></li>
                    <li class='prize__list-item'><span>7 место – 30 000 &#8381;</span></li>
                    <li class='prize__list-item'><span>8-10 место – 25 000 &#8381;</span></li>
                    <li class='prize__list-item'><span>11 место – 20 000 &#8381;</span></li>
                    <li class='prize__list-item'><span>12 место – 20 000 &#8381;</span></li>
                    <li class='prize__list-item'><span>13-19 место – 15 000 &#8381;</span></li>
                    <li class='prize__list-item'><span>20 место – 10 000 &#8381;</span></li>
                    <div class='prize__list-anno prize__list-anno_last'><span>фрибетами</span></div>
                </ul>
            </div>
        </div>
    ) : (
        <div class='prize'>
            <div class={`prize__item prize__item_${props.type}`} data-num='1'>
                <span class={`prize__name heading heading_${props.type}`}>тур</span>
                <ul class='prize__list colored-list'>
                    <li class='prize__list-item'><span>1 место – 200 000 &#8381;</span></li>
                    <li class='prize__list-item'><span>2 место – 100 000 &#8381;</span></li>
                    <li class='prize__list-item'><span>3 место – 50 000 &#8381;</span></li>
                    <li class='prize__list-item'><span>4 место – 25 000 &#8381;</span></li>
                    <li class='prize__list-item'><span>5 место – 25 000 &#8381;</span></li>
                    <div class='prize__list-anno'><span>фрибетами</span></div>
                </ul>
            </div>
            <div class={`prize__item prize__item_${props.type}`} data-num='2'>
                <span class={`prize__name heading heading_${props.type}`}>тур</span>
                <ul class='prize__list colored-list'>
                    <li class='prize__list-item'><span>1 место – 200 000 &#8381;</span></li>
                    <li class='prize__list-item'><span>2 место – 100 000 &#8381;</span></li>
                    <li class='prize__list-item'><span>3 место – 75 000 &#8381;</span></li>
                    <li class='prize__list-item'><span>4 место – 50 000 &#8381;</span></li>
                    <li class='prize__list-item'><span>5 место – 25 000 &#8381;</span></li>
                    <div class='prize__list-anno'><span>фрибетами</span></div>
                </ul>
            </div>
            <div class={`prize__item prize__item_${props.type}`} data-num='3'>
                <span class={`prize__name heading heading_${props.type}`}>тур</span>
                <ul class='prize__list colored-list'>
                    <li class='prize__list-item'><span>1 место – <em>500 000</em> &#8381;</span></li>
                    <li class='prize__list-item'><span>2 место – 250 000 &#8381;</span></li>
                    <li class='prize__list-item'><span>3 место – 100 000 &#8381;</span></li>
                    <li class='prize__list-item'><span>4 место – 75 000 &#8381;</span></li>
                    <li class='prize__list-item'><span>5 место – 50 000 &#8381;</span></li>
                    <li class='prize__list-item'><span>6-10 место – 25 000 &#8381;</span></li>
                    <div class='prize__list-anno prize__list-anno_last'><span>деньгами</span></div>
                </ul>
            </div>
        </div>
    );

    return (
        <div class='rules'>
            <h4 class={`rules__header heading heading_${props.type}`}>призовой фонд</h4>
            {allSums}
            <h4 class={`rules__header heading heading_${props.type}`}>механика акции</h4>
            <ul class='icon-list'>
                <li class='icon-list__item'>Сумма одного пари для участия в акции – <em>от {sum} </em>&nbsp;рублей</li>
                <li class='icon-list__item'>Общий коэффициент пари – <em>от 1,50</em></li>
                <li class='icon-list__item'>
                    <div>
                        Количество очков = (сумма пари / {sum}) х общий коэффициент пари, <br />
                        <span>где коэффициент округляется до целого числа в меньшую сторону и не может превышать 7,00 при расчёте</span>
                    </div>
                </li>
            </ul>
            <div class='rules__tour'>
                <h4 class={`rules__tour-heading heading heading_${props.type}`}>
                    <span>1</span> тур &nbsp;<em>(с 1 по 10 число каждого месяца)</em>
                </h4>
                <ul class='rules__tour-list colored-list'>
                    <li><span>В первом туре принимают участие Гости БК «Лига Ставок», заключающие пари в клубах БК «Лига Ставок», перечисленных в пункте 3 полных условий акции. </span></li>
                    <li><span>Участники первого тура, занявшие первые 100 мест в рейтинге, т.е. набравшие максимальное количество очков по итогам тура, переходят во второй тур акции.</span></li>
                </ul>
            </div>
            <div class='rules__tour'>
                <h4 class={`rules__tour-heading heading heading_${props.type}`}>
                    <span>2</span> тур &nbsp;<em>(с 11 по 20 число каждого месяца)</em>
                </h4>
                <ul class='rules__tour-list colored-list'>
                    <li><span>Очки, набранные в первом туре, не учитываются в рейтинге второго тура.</span></li>
                    <li><span>Во втором туре участвуют Гости, занявшие первые 100 мест в рейтинге первого тура.</span></li>
                    <li><span>Участники второго тура, занявшие первые 50 мест в рейтинге, т.е. набравшие максимальное количество очков по итогам тура, переходят в третий тур акции.</span></li>
                </ul>
            </div>
            <div class='rules__tour'>
                <h4 class={`rules__tour-heading heading heading_${props.type}`}>
                    <span>3</span> тур &nbsp;<em>(с 21 числа календарного месяца до конца календарного месяца)</em>
                </h4>
                <ul class='rules__tour-list colored-list'>
                    <li><span>Очки, набранные в первом и во втором туре рейтинга, не учитываются в третьем.</span></li>
                    <li><span>В третьем туре участвуют Гости, занявшие первые 50 мест в рейтинге, т.е. набравшие максимальное количество очков по итогам второго тура.</span></li>
                </ul>
            </div>
            <div class='rules__show-btn'><span onClick={props.onClickShowPopup}>узнать полные условия акции ></span></div>
        </div>
    )
}

export default Rules;
