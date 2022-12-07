import './scss/app.scss'
import Header from "./components/Header";
import GameField from "./components/GameField";

function App() {
    return (
        <div className="app-wrapper">
            <Header/>
            <GameField/>
        </div>
    );
}

export default App;
