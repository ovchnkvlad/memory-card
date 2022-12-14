import Card from "./Card";
import React, {useEffect, useRef, useState} from "react";
import Modal from "./Modal";
import GameInfo from "./GameInfo";
import getShuffleArr from "../utils/ShuffleArr";

const GameField = ({uniqueGameElements}) => {

    const [cards, setCards] = useState(() => getShuffleArr(uniqueGameElements));

    // Check the OpenCards
    const [openCards, setOpenCards] = useState([]);

    // Check the card which was matching
    const [clearedCards, setClearedCards] = useState({});

    //Show game finish model
    const [showModal, setShowModal] = useState(false);

    // To calculate the number of moving
    const [moves, setMoves] = useState(0);

    //Stopwatch timer
    const [timerOn, setTimerOn] = React.useState(true);
    const [time, setTime] = React.useState(0);

    const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);

    const [bestScore, setBestScore] = useState(JSON.parse(localStorage.getItem("bestScore")) || Number.POSITIVE_INFINITY);

    const timeout = useRef(null);

    useEffect(() => {
        let timeout = null;
        if (openCards.length === 2) {
            timeout = setTimeout(compareCard, 300);
        }
        return () => {
            clearTimeout(timeout);
        };
    }, [openCards]);

    useEffect(() => {
        checkGameFinish();
    }, [clearedCards]);

    React.useEffect(() => {
        let interval = null;
        if (timerOn) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        } else if (!timerOn) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [timerOn]);

    const disableCard = () => {
        setShouldDisableAllCards(true);
    }
    const enableCard = () => {
        setShouldDisableAllCards(false);
    }

    const compareCard = () => {
        const [first, second] = openCards;
        enableCard();
        if (cards[first].type === cards[second].type) {
            setClearedCards((prev) => ({...prev, [cards[first].type]: true}));
            setOpenCards([]);
        }

        timeout.current = setTimeout(() => {
            setOpenCards([]);
        }, 500);
    }
    const checkGameFinish = () => {
        if (Object.keys(clearedCards).length === uniqueGameElements.length) {
            setShowModal(true);
            const highScore = Math.min(moves, bestScore);
            setBestScore(highScore);
            setTimerOn(false);
            localStorage.setItem("bestScore", highScore);
        }
    }

    const onCardClickHandler = (index) => {
        if (openCards.length === 1) {
            setOpenCards((prev) => [...prev, index])
        } else {
            clearTimeout(timeout.current);
            setOpenCards([index])
        }
        setMoves(moves + 1);
    }

    const checkIsFlipped = (index) => {
        return openCards.includes(index);
    };
    const checkIsInactive = (card) => {
        return Boolean(clearedCards[card.type]);
    }

    const restartGame = () => {
        setClearedCards({});
        setOpenCards([]);
        setShowModal(false);
        setMoves(0);
        setTimerOn(true);
        enableCard();
        setTime(0);
        setCards(getShuffleArr(uniqueGameElements));
    }
    return (
        <>
            <GameInfo movesCount={moves} bestScore={bestScore} time={time} restartHandler={restartGame}/>
            <main className="game-field">
                {cards.map((item, idx) => <Card key={idx}
                                                index={idx}
                                                card={item}
                                                isFlipped={checkIsFlipped(idx)}
                                                isInactive={checkIsInactive(item)}
                                                isDisabled={shouldDisableAllCards}
                                                onClickHandler={onCardClickHandler}/>
                )}
                {showModal ? <Modal moveCount={moves} bestScore={bestScore} restartHandler={restartGame}/> : ''}
            </main>
        </>
    );
};

export default GameField;
