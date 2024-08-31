import './Home.css'
import { useEffect, useState } from 'react'
import { GamesApi } from '../../interfaces/games'
import getGames from '../../api/getGames'
import CategoryList from '../../components/CategoryList/CategoryList'
import Footer from '../../components/Footer/Footer'
import GamesList from '../../components/GamesList/GamesList'
import SearchBar from '../../components/SearchBar/SearchBar'
import SideBar from '../../components/SideBar/SideBars'
import Toast from '../../components/Toast/Toast'
import Loading from '../../components/Loading/Loading'


const Home = () => {

    const [games, setGames] = useState<GamesApi[]>()

    const [gamesFiltered, setGamesFiltered] = useState<'guerra' | 'simulação' | 'rpg' | 'estratégia' | 'esporte' | 'indie'>()

    const [toast, setToast] = useState<false | { text: string, type: 'success' | 'error' }>(false)

    useEffect(() => { loadGames() }, [])

    const loadGames = async () => setGames(await getGames())

    return (

        <>
            <SideBar />
            
            <div className='home'>

                <SearchBar setToast={setToast} />

                <div className="groupButtons">
                    <button onClick={() => setGamesFiltered(undefined)}><i className="fa-solid fa-house"></i>Início</button>
                    <button onClick={() => setGamesFiltered('guerra')}><i className="fa-solid fa-gun"></i>Ação</button>
                    <button onClick={() => setGamesFiltered('simulação')}><i className="fa-solid fa-vr-cardboard"></i>Simulação</button>
                    <button onClick={() => setGamesFiltered('estratégia')} ><i className="fa-solid fa-brain"></i>Estratégia</button>
                    <button onClick={() => setGamesFiltered('rpg')}><i className="fa-solid fa-shield-halved"></i>RPG</button>
                    <button onClick={() => setGamesFiltered('esporte')}><i className="fa-solid fa-volleyball"></i>Esportes</button>
                    <button onClick={() => setGamesFiltered('indie')}><i className="fa-solid fa-align-right"></i>Indie</button>
                </div>
                {games && games.length > 0 && <>
                    {gamesFiltered && <GamesList games={games.filter(element => element.category === gamesFiltered)} title={gamesFiltered} />}
                    {!gamesFiltered && <>
                        <CategoryList title="Em oferta" games={games.filter(element => element.promo > 0)} />
                        <CategoryList title="RPG" games={games.filter(element => element.category === 'rpg')} />
                        <CategoryList title="Ação" games={games.filter(element => element.category === 'guerra')} />
                        <CategoryList title="Simulação" games={games.filter(element => element.category === 'simulação')} />
                    </>}
                </>}
                {!games && <Loading />}

                <Footer />
            </div >
            {toast && <Toast text={toast} onClick={setToast} />}
        </>
    )
}

export default Home