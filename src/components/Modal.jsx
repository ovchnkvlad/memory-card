import React from 'react';

const Modal = ({moveCount, restartHandler, bestScore}) => {


    return (<div className="modal">
        <div className="info__padding">
            <h2>Hurray!!! You completed the challenge</h2>
            <p>
                You completed the game in {moveCount} moves. Your best score is {bestScore} moves.
            </p>
        </div>
        <div className="button__group">
            <button onClick={() => window.close()}>Exit</button>
            <button onClick={restartHandler}>Play again</button>
        </div>
    </div>)
};

export default Modal;
