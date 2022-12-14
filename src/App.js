import './scss/app.scss'
import Header from "./components/Header";
import GameField from "./components/GameField";

function App() {

    const uniqueGameElements = [
        {
            type: 'banana',
            image: './assets/img/banana.png'
        },
        {
            type: 'cabbage',
            image: './assets/img/cabbage.png'
        },
        {
            type: 'carrot',
            image: './assets/img/carrot.png'
        },
        {
            type: 'cucumber',
            image: './assets/img/cucumber.png'
        },
        {
            type: 'onion',
            image: './assets/img/onion.png'
        },
        {
            type: 'peach',
            image: './assets/img/peach.png'
        },
        {
            type: 'potato',
            image: './assets/img/potato.png'
        },
        {
            type: 'tomato',
            image: './assets/img/tomato.png'
        },
    ]

    return (
        <div className="app-wrapper">
            <Header/>
            <GameField uniqueGameElements={uniqueGameElements}/>
        </div>
    );
}

export default App;
