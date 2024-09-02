import './Game.css'
import { useEffect, useState } from 'react'
import { GamesApi } from '../../interfaces/games'
import getGame from '../../api/getGame'
import getGames from '../../api/getGames'
import insertGame from '../../api/insertGame'
import calculateDiscount from '../../utils/calculateDiscount'
import Toast from '../../components/Toast/Toast'
import Footer from '../../components/Footer/Footer'
import SideBar from '../../components/SideBar/SideBars'
import CategoryList from '../../components/CategoryList/CategoryList'
import getUserGames from '../../api/getUserGames'
import { UserGamesApi } from '../../interfaces/userGames'
import Modal from '../../components/Modal/Modal'
import Loading from '../../components/Loading/Loading'

const Game = () => {

    const [game, setGame] = useState<GamesApi>() // jogo selecionado

    const [games, setGames] = useState<GamesApi[]>() // jogos similares

    const [toast, setToast] = useState<false | { text: string, type: 'success' | 'error' }>(false)

    const [gamePurchased, setGamePurchased] = useState<boolean>(false) // jogo é ou não comprado 

    const [showModal, setShowModal] = useState<boolean>(false)

    useEffect(() => { loadGame() }, [])

    useEffect(() => {
        if (!game) return
        loadGames()
        loadUserGames()
    }, [game])

    const loadGame = async () => { // get jogo selecionado
        try {
            const gameId = new URLSearchParams(window.location.search).get("id")
            if (!gameId) throw new Error("Jogo não encontrado")
            const response = await getGame(gameId)
            setGame(response[0])
        } catch (error: any) {
            setToast(error.message)
        }
    }

    const loadGames = async () => { // get todos os jogos similares do dataBase
        try {
            const response: GamesApi[] = await getGames()
            const gamesSimilar = response.filter(element => element.category === game?.category && element.id !== game.id)
            setGames(gamesSimilar)
        } catch (error: any) {
            setToast(error.message)
        }
    }

    // Mexer aqui depois para checkout de compra --->
    const buyGame = async () => {
        try {
            if (!game) return
            const response = await insertGame(game?.id)
            setShowModal(false)
            setToast({ text: response.message, type: 'success' })
        } catch (error: any) {
            console.log(error)
            setToast({ text: error.message, type: 'error' })
        }
    }

    const loadUserGames = async () => { // Jogos adquiridos pelo user
        try {
            const userGames: UserGamesApi[] = await getUserGames()
            if (userGames.some(element => element.game_id === game?.id)) setGamePurchased(true)
        } catch (error: any) {
            console.error(error)
        }
    }

    return (
        <>
            <SideBar />
            <div className='game'>

                {game && <>
                    <div className="content">
                        <div className="content__data">
                            <h2 className='content__title'>{game.name}</h2>
                            <div className="content__discount">
                                <i className="fa-solid fa-tag"></i>
                                {game.promo > 0 ? <span>{game.promo}% de desconto</span> : <span>Preço original</span>}
                            </div>
                            <div className="content__description">{game.description}</div>
                        </div>
                        <div className="poster">
                            <img src={game.poster} alt={game.name} />
                        </div>
                    </div>


                    <div className="groupBtn">
                        <button style={{ background: '#358b34' }}>Instalar</button>
                        {gamePurchased && <button>Já possui este jogo</button>}
                        {!gamePurchased && <>
                            {game.promo == 0 ?
                                <button onClick={() => setShowModal(true)}>Comprar
                                    <span> R${game.price}</span>
                                </button>
                                :
                                <button onClick={() => setShowModal(true)}>Comprar
                                    <span style={{ textDecoration: 'line-through' }}> R${game.price}
                                    </span>
                                    <span style={{ color: 'yellow' }}> R${Math.ceil((Number(game.price)) - calculateDiscount(Number(game.price), game?.promo)).toFixed(2)}</span>
                                </button>}
                            <button ><i className="fa-solid fa-bag-shopping"></i></button>
                        </>}
                    </div>

                </>}

                {!game && <Loading />}

                {games &&
                    <div style={{ gridColumn: 'span 2' }}>
                        <CategoryList title='Jogos similares' games={games} />
                    </div>
                }
                {game && !games && <Loading />}

                <Footer />

            </div >

            {showModal && <Modal type='checkout' onClick={setShowModal} game={game} setUser={buyGame} />}

            {toast && <Toast text={toast} onClick={setToast} />}
        </>
    )
}

export default Game