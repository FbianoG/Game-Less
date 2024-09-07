import { useRef } from 'react'
import { GamesApi } from '../interfaces/games'
import GameCard from './GameCard'

interface CategoryListProps {
    title: string
    games: GamesApi[]
}

const CategoryList: React.FC<CategoryListProps> = ({ title, games }) => {

    const list = useRef<any>()

    const nextPage = () => list.current.scrollLeft += list.current.clientWidth

    const prevPage = () => list.current.scrollLeft -= list.current.clientWidth


    return (
        <div className='my-10'>
            <div className="flex justify-between">
                <h3 className='text-2xl text-neutral-100 font-bold'>{title}</h3>

                <div className="mb-4 flex gap-2">
                    <button className='py-2 px-3 bg-neutral-800 text-neutral-100 rounded-lg duration-300 hover:bg-neutral-600' title='Voltar jogos' aria-label='Voltar jogos' onClick={prevPage}><i className="fa-solid fa-chevron-left"></i></button>

                    <button className='py-2 px-3 bg-neutral-800 text-neutral-100 rounded-lg duration-300 hover:bg-neutral-600' title='Passar jogos' aria-label='Passar jogos' onClick={nextPage}><i className="fa-solid fa-chevron-right"></i></button>
                </div>
            </div>

            <div className=" pb-3 flex gap-5 overflow-auto lg:overflow-hidden" ref={list}>
                {games.map(element => <GameCard key={element.id} game={element} />)}
            </div>
        </div>
    )
}

export default CategoryList