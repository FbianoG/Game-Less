
import { useEffect, useState } from 'react'
import './Libs.css'
import getUserGames from '../../api/getUserGames'
import { UserGamesApi } from '../../interfaces/userGames'
import getGames from '../../api/getGames'
import { GamesApi } from '../../interfaces/games'
import GameCard from '../../components/GameCard'
import SideBar from '../../components/SideBars'
import Footer from '../../components/Footer/Footer'
import SearchBar from '../../components/SearchBar'
import Toast from '../../components/Toast/Toast'
import Loading from '../../components/Loading'

const Libs = () => {

    useEffect(() => { loadUserGames() }, [])

    const [userGames, setGamesUser] = useState<UserGamesApi[]>()

    const [games, setGames] = useState<GamesApi[]>()

    const [toast, setToast] = useState<false | { text: string, type: 'success' | 'error' }>(false)

    const loadUserGames = async () => {
        try {
            const [userGames, allGames] = await Promise.all([getUserGames(), getGames()])
            setGamesUser(userGames)
            setGames(allGames)
        } catch (error: any) {
            setToast({ text: error.message, type: 'error' })
        }
    }

    const [typelist, setTypeList] = useState<boolean>(false)


    return (
        <>
            <SideBar />
            <div className='libs'>
                <SearchBar setToast={setToast} />
                {userGames && <>
                    <h3 className='gamesList__title'>Meus jogos - {(userGames.length)}</h3>
                    <div className=" mb-8 max-md:ml-auto flex gap-2 text-xl">
                        <button className='py-2 px-3 bg-neutral-800 text-neutral-100 rounded-lg duration-300 hover:bg-neutral-600' title='Mostrar em card' onClick={() => setTypeList(false)}><i className="fa-solid fa-qrcode"></i></button>
                        <button className='py-2 px-3 bg-neutral-800 text-neutral-100 rounded-lg duration-300 hover:bg-neutral-600' title='Mostrar em lista' onClick={() => setTypeList(true)}><i className="fa-solid fa-list-ul"></i></button>
                    </div>
                    <ul className='libs__list' key={'1'}>
                        {games && userGames && games.length > 0 && userGames.length > 0 && games.map(element => {
                            const findGame = userGames.find(e => e.game_id === element.id)
                            if (!findGame) return
                            else if (typelist) return <GameCard key={element.id} game={element} isLib={findGame.create_at} isList={true} />
                            else if (!typelist) return <GameCard key={element.id} game={element} isLib={findGame.create_at} />

                        })}
                    </ul>
                </>}

                {!userGames && <Loading />}

                <Footer />

            </div>

            {toast && <Toast text={toast} onClick={setToast} />}
        </>
    )
}

export default Libs