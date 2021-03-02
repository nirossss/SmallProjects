import React, { useEffect, useState } from 'react';
import GamesDataContext from '../contexts/GamesDataContext';
import GamesTable from '../GamesTable/GamesTable';
import './GamesView.css'


const GamesView = (props) => {

    const [games, setGames] = useState([])
    const [error, setError] = useState(false)
    const [isGame, setIsGame] = useState([false, 0])
    const [selectOption, setSelectOption] = useState('all')

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch('http://localhost:3001/api/games');
                const { success, data } = await res.json();

                console.log(data);

                if (success) {
                    setGames(data);
                    setError(false);
                } else {
                    setError(true);
                }

            } catch (e) {
                setError(true);
            }
        })();
    }, []);

    const viewedGames = () => {
        let chosenGames = [...games]

        if (isGame[0]) {
            chosenGames = chosenGames.filter(game => game.id === isGame[1])
        }
        if (selectOption === 'Football' || selectOption === 'Basketball') {
            chosenGames = chosenGames.filter(game => game.category === selectOption)
        }
        if (selectOption === 'date') {
            chosenGames = chosenGames.sort((a, b) => {
                return new Date(a.date) - new Date(b.date);
            });
        }

        return chosenGames.map(game => <GamesTable key={game.id} {...game}></GamesTable>)
    }

    return (
        <GamesDataContext.Provider value={{ games, setGames, isGame, setIsGame }}>
            <header>
                {isGame[0] ||
                    <div className="sort-data">
                        <select name='selectOption' value={selectOption} onChange={(e) => { setSelectOption(e.target.value) }} >
                            <option value='all'>All</option>
                            <option value='Football'>Football</option>
                            <option value='Basketball'>Basketball</option>
                            <option value='date'>Date</option>
                        </select>
                    </div>
                }
                {isGame[0] && <button onClick={() => setIsGame([false, 0])}>Back to home page</button>}
            </header>
            <div className="games-cards">
                {viewedGames()}
                {error && <div>Error</div>}
            </div>
        </GamesDataContext.Provider>
    )
}

export default GamesView