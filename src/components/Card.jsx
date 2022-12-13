import React from 'react';
import star from '../assets/img/star.png'
import classnames from "classnames";

const Card = ({card, index, isFlipped,isInactive, onClickHandler}) => {

    return (
        <div className="flip-container card" onClick={() => onClickHandler(index)}>
            <div className={classnames("flipper", {
                "is-flipped": isFlipped,
                "is-inactive": isInactive
            })}>
                <div className="front">
                    <img src={star} alt="Star"/>
                </div>
                <div className="back">
                    <img src={card.image} alt="id"/>
                </div>
            </div>
        </div>
    );
};

export default Card;
