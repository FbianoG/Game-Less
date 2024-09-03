// import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import deleteStore from '../../api/deleteStore'
import { GamesApi } from '../../interfaces/games'
import calculateDiscount from '../../utils/calculateDiscount'
import './GameCard.css'
// import UrlApi from '../../api/UrlApi'

interface GameCardProps {
    game: GamesApi
    isLib?: string
    isList?: boolean
    store?: boolean
}


const GameCard: React.FC<GameCardProps> = ({ game, isLib, isList, store }) => {
    let date
    if (isLib) date = new Date(isLib)

    const navigate = useNavigate()

    const handleClickGame = (event: any) => {
        if (event.target.tagName === 'BUTTON' || event.target.tagName === 'I') return
        location.href = `/game?id=${game.id}`
    }

    const handleDeleteGame = async () => {
        try {

            const response = await deleteStore(game.id)
            location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {!isList && <div className="game__card" onClick={handleClickGame}>
                <img src={game.poster} alt={game.name} loading='lazy' />
                <div className="game__card-data">
                    <p title={game.name}>{game.name}</p>
                    {isLib && <span className='game__card__data-priceCut'>Compra em: {date?.toLocaleString().split(',')[0]}</span>}
                    {!isLib && <>
                        <span className={`game__card__data - priceCut ${game.promo > 0 && 'priceCut'} `}>R${game.price}</span>
                        {game.promo > 0 && <span className='game__card__data-price'>R${Math.ceil(Number(game.price) - calculateDiscount(Number(game.price), game.promo)).toFixed(2)}</span>}
                    </>}
                </div>
            </div>}

            {isList && !store && <div className="game__card typeList" onClick={handleClickGame}>
                <img src={game.poster} alt={game.name} loading='lazy' />
                <div className="game__card-data">
                    <p title={game.name}>{game.name}</p>
                    <span className='game__card__data-priceCut'>Compra em: {date?.toLocaleString().split(',')[0]}</span>
                </div>
            </div>}

            {isList && store && <div className="game__card typeList" onClick={handleClickGame}>
                <img src={game.poster} alt={game.name} loading='lazy' />
                <div className="game__card-data">
                    <p title={game.name}>{game.name}</p>
                    <span className={`game__card__data - priceCut ${game.promo > 0 && 'priceCut'} `}>R${game.price}</span>
                    <button title='Remover da lista' onClick={handleDeleteGame}><i className="fa-solid fa-trash-can"></i></button>
                    {game.promo > 0 && <span className='game__card__data-price'>R${Math.ceil(Number(game.price) - calculateDiscount(Number(game.price), game.promo)).toFixed(2)}</span>}
                </div>
            </div>}

        </>

    )
}

export default GameCard