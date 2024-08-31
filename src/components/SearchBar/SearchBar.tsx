import './SearchBar.css'
import { useEffect, useRef, useState } from 'react';
import { GamesApi } from '../../interfaces/games';
import searchGames from '../../api/searchGames';

interface SearchBarProps {
    setToast: (a:{ text: string, type: 'success' | 'error' }) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ setToast }) => {

    const searchBarRef = useRef<any>()
    const [showSearchList, setShowSearchList] = useState<boolean>(false)
    const [gamesSearched, setGamesSearched] = useState<GamesApi[]>([])


    const handleSearch = async (text: string) => {
        try {
            if (text.trim().length <= 2) {
                setShowSearchList(false)
                return
            }
            const response = await searchGames(text)
            setGamesSearched(response)
            setShowSearchList(true)
        } catch (error: any) {
            setToast({ text: error.message, type: 'error' })
        }
    }

    useEffect(() => {
        const handleSearchClickOutside = (event: MouseEvent) => {
            if (!searchBarRef.current.contains(event.target)) setShowSearchList(false)
        }
        document.addEventListener('mousedown', handleSearchClickOutside);
    }, [searchBarRef]);

    return (
        <div className="searchBar" ref={searchBarRef}>
            <i className="fa-solid fa-magnifying-glass"></i>
            <input onChange={(e) => handleSearch(e.target.value)} onBlur={() => setShowSearchList} type='text' placeholder='Pesquisar jogo' />
            {showSearchList && <ul className='searchBar__list'>
                {gamesSearched.length > 0 ? gamesSearched.map(element => <li key={element.id} className='searchBar__item' onClick={() => location.href = `/game?id=${element.id}`}>
                    <img src={element.poster} alt={element.name} />
                    <div className="searchBar__item__content">
                        <h5>{element.name}</h5>
                        <p title={element.description}>{element.description}</p>
                    </div>
                </li>)
                    :
                    <h5>Nenhum jogo encontrado</h5>}
            </ul>}
        </div>
    )
}

export default SearchBar