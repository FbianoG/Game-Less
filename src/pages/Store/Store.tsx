import { useEffect, useState } from 'react'
import SideBar from '../../components/SideBar/SideBars'
import './Store.css'
import { UserGamesApi } from '../../interfaces/userGames'
import { GamesApi } from '../../interfaces/games'
import getUserStore from '../../api/getUserStore'
import getGames from '../../api/getGames'
import GameCard from '../../components/GameCard/GameCard'
import Footer from '../../components/Footer/Footer'
import SearchBar from '../../components/SearchBar/SearchBar'
import Toast from '../../components/Toast/Toast'

const Store = () => {

    useEffect(() => { loadUserGames() }, [])

    const [userStore, setUserStore] = useState<UserGamesApi[]>()

    const [games, setGames] = useState<GamesApi[]>()

    const [toast, setToast] = useState<false | { text: string, type: 'success' | 'error' }>(false)

    const loadUserGames = async () => {
        try {
            const [gamesStore, allGames] = await Promise.all([getUserStore(), getGames()])
            setUserStore(gamesStore)
            setGames(allGames)
        } catch (error: any) {
            setToast({ text: error.message, type: 'error' })
        }
    }

    return (
        <>
            <SideBar />
            <div className='store'>
                <SearchBar setToast={setToast} />
                {userStore && <>
                    <h3 className='gamesList__title'>Jogos desejados - {(userStore.length)}</h3>
                    <ul className='libs__list'>
                        {games && games.length > 0 && userStore.length > 0 && games.map(element => {
                            const findGame = userStore.find(e => e.game_id === element.id)
                            if (!findGame) return
                            return <GameCard key={element.id} game={element} isLib={findGame.create_at} isList={true} store={true} />
                        })}
                    </ul>
                </>}

                {toast && <Toast text={toast} onClick={setToast} />}
                <Footer />
            </div>

        </>
    )
}

export default Store