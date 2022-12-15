import React from 'react';

const Modal = ({moveCount, restartHandler, bestScore,time}) => {

    return (<div className="modal">
        <div className="info__padding">
            <h2>Hurray!!! You completed the challenge</h2>
            <p>
                You completed the game in <b>{moveCount}</b> moves.
                <br/>
                Your best score is <b>{bestScore}</b> moves.
                <br/>
                Your time: <b>
                <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
                <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
                <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
            </b>
            </p>
        </div>
        <div className="button__group">
            <button onClick={() => window.close()}>Exit</button>
            <button onClick={restartHandler}>Play again</button>
        </div>
    </div>)
};

export default Modal;
