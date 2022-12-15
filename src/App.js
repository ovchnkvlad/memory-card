import React from 'react';
import './scss/app.scss'
import Header from "./components/Header";
import GameField from "./components/GameField";


const CARD_ELEMENTS = {
    BANANA:
        {
            type: 'banana',
            image: './assets/img/banana.png'
        },
    CABBAGE:
        {
            type: 'cabbage',
            image: './assets/img/cabbage.png'
        },
    CARROT:
        {
            type: 'carrot',
            image: './assets/img/carrot.png'
        },
    CUCUMBER:
        {
            type: 'cucumber',
            image: './assets/img/cucumber.png'
        },
    ONION:
        {
            type: 'onion',
            image: './assets/img/onion.png'
        },
    PEACH:
        {
            type: 'peach',
            image: './assets/img/peach.png'
        },
    POTATO:
        {
            type: 'potato',
            image: './assets/img/potato.png'
        },
    TOMATO:
        {
            type: 'tomato',
            image: './assets/img/tomato.png'
        }
}

function App() {
    return (
        <div className="app-wrapper">
            <Header/>
            <GameField uniqueCard={CARD_ELEMENTS}/>
        </div>
    );
}

export default App;
