import { GamesApi } from '../../interfaces/games'
import GameCard from '../GameCard/GameCard'
import './GamesList.css'


interface GamesListProps {
    games: GamesApi[]
    title: string
}

const GamesList: React.FC<GamesListProps> = ({ games, title }) => {

    return (
        <>
            <h3 className='gamesList__title'>Todos {title}</h3>
            <ul className='gamesList'>
                {games.length > 0 && games.map(element => <GameCard key={element.id} game={element} />)}
            </ul>
        </>
    )
}

export default GamesList