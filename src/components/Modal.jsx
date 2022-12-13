import React from 'react';

const Modal = () => {

    const onClickHandler = () => {
        window.close();
    }

    return (<div className="modal">
        <div className="info__padding">
            <h2>Hurray!!! You completed the challenge</h2>
            <p>
                You completed the game in moves moves. Your best score is bestScore moves.
            </p>
        </div>
        <div className="button__group">
            <button onClick={onClickHandler}>Exit</button>
            <button>Play again</button>
        </div>
    </div>)
};

export default Modal;
