import React from 'react';
import cabage from '../assets/img/cabage.png'
import star from '../assets/img/star.png'

const Card = () => {
    return (
        <div className="flip-container card" onTouchStart="this.classList.toggle('hover');">
            <div className="flipper">
                <div className="front">
                    <img src={star} alt="Star"/>
                </div>
                <div className="back">
                    <img src={cabage} alt=""/>
                </div>
            </div>
        </div>
    );
};

export default Card;
