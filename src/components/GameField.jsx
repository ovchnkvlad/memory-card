import Card from "./Card";
import {useEffect, useState} from "react";
import Modal from "./Modal";
import GameInfo from "./GameInfo";

const GameField = ({gameItem}) => {

    const [cards, setCards] = useState(() => gameItem.concat(gameItem).sort(() => Math.random() - 0.5));

    // Check the OpenCards
    const [openCards, setOpenCards] = useState([]);

    // Check the card which was matching
    const [clearedCards, setClearedCards] = useState({});

    //Show game finish model
    const [showModal, setShowModal] = useState(false);

    // To calculate the number of moving
    const [moves, setMoves] = useState(0);

    const [bestScore, setBestScore] = useState(JSON.parse(localStorage.getItem("bestScore")) || Number.POSITIVE_INFINITY);

    const compareCard = () => {
        const [first, second] = openCards;
        if (cards[first].type === cards[second].type) {
            setClearedCards((prev) => ({...prev, [cards[first].type]: true}));
            setOpenCards([]);
        }
    }
    const checkGameFinish = () => {
        if (Object.keys(clearedCards).length === gameItem.length) {
            setShowModal(true);
            const highScore = Math.min(moves, bestScore);
            setBestScore(highScore);
            debugger
            localStorage.setItem("bestScore", highScore);

        }
    }

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


    const onCardClickHandler = (index) => {
        if (openCards.length === 1) {
            setOpenCards((prev) => [...prev, index])
        } else {
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
        setCards(gameItem.concat(gameItem).sort(() => Math.random() - 0.5));
    }
    return (
        <>
            <GameInfo movesCount={moves} bestScore={bestScore}/>
            <main className="game-field">
                {cards.map((item, idx) => <Card key={idx}
                                                index={idx}
                                                card={item}
                                                isFlipped={checkIsFlipped(idx)}
                                                isInactive={checkIsInactive(item)}
                                                onClickHandler={onCardClickHandler}/>
                )}
                {showModal ? <Modal moveCount={moves} bestScore={bestScore} restartHandler={restartGame}/> : ''}
            </main>
        </>
    );
};

export default GameField;
