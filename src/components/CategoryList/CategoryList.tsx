import './CategoryList.css'
import {useRef } from 'react'
import { GamesApi } from '../../interfaces/games'
import GameCard from '../GameCard/GameCard'

interface CategoryListProps {
    title: string
    games: GamesApi[]
}

const CategoryList: React.FC<CategoryListProps> = ({ title, games }) => {

    const list = useRef<any>()

    const nextPage = () => list.current.scrollLeft += list.current.clientWidth

    const prevPage = () => list.current.scrollLeft -= list.current.clientWidth


    return (
        <div className='categoryList'>

            <div className="categoryList__header">
                <h3 className='categoryList__title'>{title}</h3>
                <div className="categoryList__groupBtn-slider">
                    <button onClick={prevPage}><i className="fa-solid fa-chevron-left"></i></button>
                    <button onClick={nextPage}><i className="fa-solid fa-chevron-right"></i></button>
                </div>

            </div>

            <ul className="categoryList__list" ref={list}>

                {games.map(element => <GameCard key={element.id} game={element} />)}

            </ul>

        </div>
    )
}

export default CategoryList