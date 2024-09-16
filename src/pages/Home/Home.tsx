import { useEffect, useState } from 'react'
import { GamesApi } from '../../interfaces/games'
import getGames from '../../api/getGames'
import CategoryList from '../../components/CategoryList'
import Footer from '../../components/Footer/Footer'
import GamesList from '../../components/GamesList/GamesList'
import SearchBar from '../../components/SearchBar'
import SideBar from '../../components/SideBars'
import Toast from '../../components/Toast/Toast'
import Loading from '../../components/Loading'

const Home = () => {

    const [games, setGames] = useState<GamesApi[]>()

    const [gamesFiltered, setGamesFiltered] = useState<'guerra' | 'simulação' | 'rpg' | 'estratégia' | 'esporte' | 'indie'>()

    const [toast, setToast] = useState<false | { text: string, type: 'success' | 'error' }>(false)

    useEffect(() => { loadGames() }, [])

    const loadGames = async () => setGames(await getGames())

    const style = {
        btn: 'p-4 rounded-lg uppercase flex items-center gap-2 text-neutral-200 hover:brightness-125 duration-300 ',
        sbtn: { background: 'linear-gradient(to bottom right, #17b346, #1a69c4)' }
    }

    return (
        <>
            <SideBar />

            <div className='px-8 max-md:px-5 min-h-dvh pl-80 relative p flex flex-col bg-gradient-to-b from-[#000b] to-transparent' >

                <video className='w-full h-dvh  absolute left-0 top-0 object-cover blur-sm -z-50 ' src="game.mp4" autoPlay loop muted playsInline> fala aew</video>

                <div className=" py-40 max-md:py-20 mb- relative flex flex-col gap-8 items-center border-neutral-700">
                    <h3 className=' max-w-[450px] object-cover text-5xl text-neutral-100 text-center'>Faça parte desse universo <span className='text-green-600 font-semibold'>Game Less</span><span className='bg-green-600 w-2 h-2 inline-block rounded-full ' >
                        <span className='w-full h-full block bg-green-400 animate-ping rounded-full'></span></span></h3>

                    <p className='text-neutral-300 text-center text-lg'>Somos focados em lhe proporcionar entretenimento e diversão no mais alto nível.</p>

                    <form className="flex flex-col md:flex-row border border-neutral-700 rounded-lg">
                        <input type="email" placeholder="Escreva seu E-mail" className="flex-1 h-10 px-4 py-2 m-1 text-neutral-100 placeholder-gray-400 bg-transparent border-none appearance-none  outline-none focus:placeholder-transparent " />

                        <button type="button" className="h-10 px-4 py-2 m-1 text-white transition-colors duration-300 transform bg-green-500 rounded-md hover:bg-green-400 outline-none">
                            Fale Conosco
                        </button>
                    </form>
                </div>

                <SearchBar setToast={setToast} />

                <div className=" mb-10 flex gap-4 justify-center flex-wrap" onClick={() => document.querySelectorAll('.search')[0].scrollIntoView({ behavior: 'smooth' })}>
                    <button className={style.btn} style={style.sbtn} onClick={() => setGamesFiltered(undefined)}><i className="fa-solid fa-house"></i>Início</button>
                    <button className={style.btn} style={style.sbtn} onClick={() => setGamesFiltered('guerra')}><i className="fa-solid fa-gun"></i>Ação</button>
                    <button className={style.btn} style={style.sbtn} onClick={() => setGamesFiltered('simulação')}><i className="fa-solid fa-vr-cardboard"></i>Simulação</button>
                    <button className={style.btn} style={style.sbtn} onClick={() => setGamesFiltered('estratégia')} ><i className="fa-solid fa-brain"></i>Estratégia</button>
                    <button className={style.btn} style={style.sbtn} onClick={() => setGamesFiltered('rpg')}><i className="fa-solid fa-shield-halved"></i>RPG</button>
                    <button className={style.btn} style={style.sbtn} onClick={() => setGamesFiltered('esporte')}><i className="fa-solid fa-volleyball"></i>Esportes</button>
                    <button className={style.btn} style={style.sbtn} onClick={() => setGamesFiltered('indie')}><i className="fa-solid fa-align-right"></i>Indie</button>
                </div>

                {games && games.length > 0 &&
                    <>
                        {gamesFiltered &&
                            <GamesList games={games.filter(element => element.category === gamesFiltered)} title={gamesFiltered} />
                        }

                        {!gamesFiltered &&
                            <>
                                <CategoryList title="Em oferta" games={games.filter(element => element.promo > 0)} />

                                <CategoryList title="RPG" games={games.filter(element => element.category === 'rpg')} />


                                <div className=" h-auto max-h-80 max-md:max-h-none my-24 flex max-md:flex-col bg-neutral-800 rounded-xl overflow-hidden shadow-lg">
                                    <div className="w-1/2 max-md:w-full">
                                        <div className="h-full">
                                            <img className='w-full h-full object-cover' src='https://media.wired.com/photos/62feb60bcea7c0581e825cb0/16:9/w_2400,h_1350,c_limit/Fate-of-Game-Preservation-Games-GettyImages-1170073827.jpg' alt='' />
                                        </div>
                                    </div>

                                    <div className="w-1/2 max-md:w-full px-6 py-12 max-xl:py-2">
                                        <h2 className="text-2xl font-semibold text-neutral-100 ">
                                            Construa Sua <span className="text-green-500">História</span>
                                        </h2>

                                        <p className="mt-4 text-neutral-300 ">
                                            Explore títulos variados que atendem a todos os gostos, desde aventuras épicas até desafios estratégicos. Cada jogo é cuidadosamente selecionado para garantir horas de diversão e entretenimento sem fim.
                                        </p>

                                        <a className=" w-max mt-6 block px-6 py-2 text-sm text-white font-medium shadow-md duration-300 bg-green-600 rounded-lg hover:bg-green-500">
                                            Começe Agora
                                        </a>
                                    </div>
                                </div>


                                <CategoryList title="Ação" games={games.filter(element => element.category === 'guerra')} />

                                <CategoryList title="Simulação" games={games.filter(element => element.category === 'simulação')} />
                            </>
                        }

                    </>
                }

                {!games && <Loading />}

                <Footer />
            </div >

            {toast && <Toast text={toast} onClick={setToast} />}
        </>
    )
}

export default Home