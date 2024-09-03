import {useState } from 'react';
import { GamesApi } from '../interfaces/games';
import searchGames from '../api/searchGames';

interface SearchBarProps {
    setToast: (a: { text: string, type: 'success' | 'error' }) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ setToast }) => {

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
            document.addEventListener('click', handleSearchOut)
        } catch (error: any) {
            setToast({ text: error.message, type: 'error' })
        }
    }

    const handleSearchOut = () => {
        setShowSearchList(false)
        document.removeEventListener('click', handleSearchOut)
    }

    return (
        <div className="w-6/12 min-w-80 p-2 mx-auto mb-8  relative flex gap-3 items-center text-neutral-100 bg-neutral-900 rounded-lg">
            <i className="fa-solid fa-magnifying-glass"></i>

            <input className='flex-1 bg-transparent outline-none' onChange={(e) => handleSearch(e.target.value)} type='text' placeholder='Pesquisar jogo' />

            {showSearchList &&
                <ul className=' p-2 absolute top-11 left-0 flex flex-col gap-2 bg-neutral-900 rounded-lg shadow-md z-50  overflow-auto'>
                    {gamesSearched.length > 0 &&
                        gamesSearched.map(element => (
                            <li key={element.id} className='p-1 h-20 flex gap-4 rounded overflow-hidden cursor-pointer hover:bg-neutral-800' onClick={() => location.href = `/game?id=${element.id}`}>
                                <img src={element.poster} alt={element.name} />

                                <div>
                                    <h5>{element.name}</h5>

                                    <p className='text-neutral-400 font-light' title={element.description}>{element.description}</p>
                                </div>
                            </li>
                        ))
                    }

                    {gamesSearched.length === 0 &&
                        <h5>Nenhum jogo encontrado</h5>
                    }
                </ul>}
        </div>
    )
}

export default SearchBar