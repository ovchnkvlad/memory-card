import React from 'react';

const GameInfo = ({movesCount,bestScore,time,restartHandler}) => {

    return (<section className='game-info'>

        <p>Best score: <span>{bestScore}</span> </p>
        <p>Moves: <span>{movesCount}</span> </p>
        <div className="stopwatch-display">
            <p>Time:</p>
            <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
            <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
            <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
        </div>
        {/*<button onClick={restartHandler}>Start</button>*/}
        <button onClick={restartHandler}>Restart</button>


    </section>);
};

export default GameInfo;
