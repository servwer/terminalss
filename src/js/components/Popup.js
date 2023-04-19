import { h } from 'preact'

import TextRules from './TextRules';

const Popup = ({ children, ...props }) => {
    const detectOutWindowClick = (e) => {
        const target = e.target;
        const isInnerClick = target.classList.contains('popup') || (target.closest('.popup') && target.closest('.popup').classList.contains('popup'));

        if (isInnerClick) {
            return;
        }

        props.onClose();
    }

    return (
        <div class='popup__layer' onClick={detectOutWindowClick}>
            <div class='popup'>
                <div class='popup__close' onClick={props.onClose} />
                <h4 class='popup__header'>правила и условия участия в акции «Лига миллионеров»</h4>
                <div class='popup__content custom-scrollbar'>
                    <TextRules />
                </div>
            </div>
        </div>
    )
}

export default Popup;
