import React from 'react';


const GameInfo = ({movesCount,bestScore}) => {

    return (<section className='game-info'>

        <p>Best score: <span>{bestScore}</span> </p>
        <p>Moves: <span>{movesCount}</span> </p>
        <p>Time: <span>00:00:00</span> </p>
    </section>);
};

export default GameInfo;
