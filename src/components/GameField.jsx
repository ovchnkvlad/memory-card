import Card from "./Card";
import React, {useEffect, useRef, useState} from "react";
import Modal from "./Modal";
import GameInfo from "./GameInfo";
import ShuffleArr from "../utils/ShuffleArr";

const GameField = ({uniqueCard}) => {

    const INITIAL_STATE = ShuffleArr(Object.keys(uniqueCard));


    const [cards, setCards] = useState(INITIAL_STATE);
    const [openCards, setOpenCards] = useState([]);
    const [clearedCards, setClearedCards] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [moves, setMoves] = useState(0);
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

    useEffect(() => {
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
        if (cards[first] === cards[second]) {
            setClearedCards((prev) => ({...prev, [cards[first]]: true}));
            setOpenCards([]);
        }
        timeout.current = setTimeout(() => {
            setOpenCards([]);
        }, 500);
    }

    const checkGameFinish = () => {

        if (Object.keys(clearedCards).length === Object.keys(uniqueCard).length) {
            setShowModal(true);
            const highScore = Math.min(moves, +bestScore);
            setBestScore(highScore);
            setTimerOn(false);
            localStorage.setItem("bestScore", highScore);
        }
    }

    const onCardClickHandler = (index) => {
        if (openCards.length === 1) {
            setOpenCards((prev) => [...prev, index])
            setMoves(moves + 1);
            disableCard();
        } else {
            clearTimeout(timeout.current);
            setOpenCards([index])
        }
    }

    const checkIsFlipped = (index) => {
        return openCards.includes(index);
    };
    const checkIsInactive = (index) => {
        return Boolean(clearedCards[index]);
    }

    const restartGame = () => {
        setClearedCards({});
        setOpenCards([]);
        setShowModal(false);
        setMoves(0);
        setTimerOn(true);
        enableCard();
        setTime(0);
        setCards(INITIAL_STATE);
    }
    return (
        <>
            <GameInfo movesCount={moves} bestScore={bestScore} time={time} restartHandler={restartGame}/>
            <main className="game-field">
                {cards.map((item, index) => <Card key={index}
                                                index={index}
                                                card={uniqueCard[item]}
                                                isFlipped={checkIsFlipped(index)}
                                                isInactive={checkIsInactive(item)}
                                                isDisabled={shouldDisableAllCards}
                                                onClickHandler={onCardClickHandler}/>
                )}
                {showModal ? <Modal moveCount={moves} bestScore={bestScore} restartHandler={restartGame} time={time}/> : ''}
            </main>
        </>
    );
};

export default GameField;
