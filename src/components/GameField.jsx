import Card from "./Card";
import {useEffect, useState} from "react";
import Modal from "./Modal";

const GameField = ({gameItem}) => {

    const [cards, setCards] = useState(() => gameItem.concat(gameItem).sort(() => Math.random() - 0.5));

    // Check the OpenCards
    const [openCards, setOpenCards] = useState([]);

    // Check the card which was matching
    const [clearedCards, setClearedCards] = useState({});

    //Show game finish model
    const [showModal, setShowModal] = useState(false);

    // To calculate the number of moving
    // const [moves, setMoves] = useState(0);

    const compareCard = () => {
        const [first, second] = openCards;
        if (cards[first].type === cards[second].type) {
            setClearedCards((prev) => ({...prev, [cards[first].type]: true}));
            setOpenCards([]);
        }
    }
    const checkGameFinish = () => {
        if (Object.keys(clearedCards).length === gameItem.length) {
            console.log('Game Over')
            setShowModal(true);
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
    }

    const checkIsFlipped = (index) => {
        return openCards.includes(index);
    };
    const checkIsInactive = (card) => {
        return Boolean(clearedCards[card.type]);
    }
    return (
        <main className="game-field">
            {cards.map((item, idx) => <Card key={idx}
                                            index={idx}
                                            card={item}
                                            isFlipped={checkIsFlipped(idx)}
                                            isInactive={checkIsInactive(item)}
                                            onClickHandler={onCardClickHandler}/>
            )}

            {showModal ? <Modal/> : ''}
        </main>
    );
};

export default GameField;
