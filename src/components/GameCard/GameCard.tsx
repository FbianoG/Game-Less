import { GamesApi } from '../../interfaces/games'
import calculateDiscount from '../../utils/calculateDiscount'
import './GameCard.css'

interface GameCardProps {
    game: GamesApi
    isLib?: string
}


const GameCard: React.FC<GameCardProps> = ({ game, isLib }) => {
    let date
    if (isLib) date = new Date(isLib)

    return (
        <div className="game__card" onClick={() => location.href = `/game?id=${game.id}`}>
            <img src={game.poster} alt={game.name} loading='lazy' />
            <div className="game__card-data">
                <p title={game.name}>{game.name}</p>
                {isLib && <span>Compra em: {date?.toLocaleString().split(',')[0]}</span>}
                {!isLib && <><span className={`${game.promo > 0 && 'priceCut'}`}>R${game.price}</span>
                    {game.promo > 0 && <h5>R${Math.ceil(Number(game.price) - calculateDiscount(Number(game.price), game.promo)).toFixed(2)}</h5>}</>}
            </div>
        </div>
    )
}

export default GameCard