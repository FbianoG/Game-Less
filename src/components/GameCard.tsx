import './GameCard.css'
import deleteStore from '../api/deleteStore'
import { GamesApi } from '../interfaces/games'
import calculateDiscount from '../utils/calculateDiscount'

interface GameCardProps {
    game: GamesApi
    isLib?: string
    isList?: boolean
    store?: boolean
}


const GameCard: React.FC<GameCardProps> = ({ game, isLib, isList, store }) => {
    let date
    if (isLib) date = new Date(isLib)

    const handleClickGame = (event: any) => {
        if (event.target.tagName === 'BUTTON' || event.target.tagName === 'I') return
        location.href = `/game?id=${game.id}`
    }

    const handleDeleteGame = async () => {
        try {
            await deleteStore(game.id)
            location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {!isList &&
                <div className="game__card bg-neutral-900 w-52 flex-shrink-0 flex-col flex rounded-lg cursor-pointer" onClick={handleClickGame}>
                    <div className="flex p-2 gap-1">
                        <div className="">
                            <span className="bg-lime-500 inline-block center w-3 h-3 rounded-full"></span>
                        </div>
                        <div className="circle">
                            <span className="bg-green-500 inline-block center w-3 h-3 rounded-full"></span>
                        </div>
                        <div className="circle">
                            <span className="bg-blue-400 box inline-block center w-3 h-3 rounded-full"></span>
                        </div>
                    </div>
                    <img className=' rounded-t-lg w-full object-cover h-64 duration-300' src={game.poster} alt={game.name} />
                    <div className=" flex flex-col p-2 flex-1">
                        <h3 className=' text-neutral-100 w-full text-nowrap text-ellipsis overflow-hidden'>{game.name}</h3>
                        {!isLib && <>
                            <span className={`mt-auto block text-neutral-300 text-lg ${game.promo > 0 && 'line-through text-sm text-neutral-500'}`}>R${game.price}</span>
                            {game.promo > 0 && <span className='text-green-500 text-lg'>R${Math.ceil(Number(game.price) - calculateDiscount(Number(game.price), game.promo)).toFixed(2)}</span>}
                        </>}
                        {isLib && <span className=' text-neutral-400 text-sm'>Compra em: {new Date(isLib).toLocaleDateString()}</span>}


                    </div>
                </div>
            }

            {isList &&
                <div className=" game__card w-full -mt-3 relative flex bg-neutral-900 rounded-lg overflow-hidden cursor-pointer" onClick={handleClickGame}>
                  
                    <img className=' w-20 h-24 rounded-lg object-cover duration-300' src={game.poster} alt={game.name} />
                    <div className=" flex flex-col p-2 flex-1 overflow-hidden">
                        <h3 className=' text-neutral-100 w-full text-nowrap text-ellipsis overflow-hidden'>{game.name}</h3>

                        {!isLib && <>

                            <span className={`mt-auto block text-neutral-300 text-lg ${game.promo > 0 && 'line-through text-sm text-neutral-500'}`}>R${game.price}</span>

                            {game.promo > 0 && <span className='text-green-500 text-lg'>R${Math.ceil(Number(game.price) - calculateDiscount(Number(game.price), game.promo)).toFixed(2)}</span>}

                            <button className='p-2 absolute bottom-2 right-5 text-red-600 duration-300 hover:text-neutral-700' title='Remover da lista' onClick={handleDeleteGame}><i className="fa-solid fa-trash-can"></i></button>

                        </>}

                        {isLib && <span className='  text-neutral-400 text-sm'>Compra em: {new Date(isLib).toLocaleDateString()}</span>}

                    </div>
                </div>
            }

        </>

    )
}

export default GameCard