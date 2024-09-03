import { useEffect, useState } from 'react'
import Modal from '../Modal/Modal'
import './SideBar.css'
import { Link } from 'react-router-dom'

const SideBar = () => {

    const [showModal, setShowModal] = useState<boolean>(false)

    const [user, setUser] = useState<any>()

    useEffect(() => {
        const userStr = sessionStorage.getItem("User")
        if (!userStr) return
        setUser(JSON.parse(userStr))
    }, [])


    const logout = () => {
        sessionStorage.clear()
        location.reload()
    }

    const [ShowSideBar, setShowSideBar] = useState(false)

    const handleShowSideBar = () => {
        if (ShowSideBar) {
            setShowSideBar(false)
        } else {
            setShowSideBar(true)
        }
    }

    return (
        <div className='sideBar' style={ShowSideBar ? { left: "0" } : {}}>
            <img src='logoTitle.png' alt='' className='logo__titile' />
            {!user && <div className="header" onClick={() => setShowModal(true)}>
                <div className="header__data" style={{ padding: '0 0 0 1rem' }} >
                    <p>Faça Login</p>
                    <span>Clique aqui</span>
                </div>
            </div>}
            {user && <div className="header">
                <img src='https://i.pinimg.com/474x/08/93/2e/08932eeeaec1411bfb71fa506c08e595.jpg' alt={user.login} />
                <div className="header__data">
                    <p>{user.login}</p>
                    <span>PC GAMES</span>
                </div>
            </div>}

            <nav className="sideBar__list">
                <Link to='/'><i className="fa-solid fa-gamepad"></i>Game Less</Link>
                <Link to='/libs'><i className="fa-solid fa-hard-drive"></i>Biblioteca</Link>
                <Link to='/store'><i className="fa-solid fa-bag-shopping"></i>Carrinho</Link>
            </nav>

            {user && <button className='sideBar__btn-logout' onClick={logout}>Logout<i className="fa-solid fa-right-from-bracket"></i></button>}

            {showModal && <Modal type='login' onClick={setShowModal} setUser={setUser} />}

            {!ShowSideBar && <div className="sideBar__btnShow" title='Mostrar menu' onClick={handleShowSideBar}>
                <i className="fa-solid fa-chevron-right"></i>
            </div>}
            {ShowSideBar && <div className='sideBar__backdrop' onClick={handleShowSideBar}></div>}
        </div>
    )
}

export default SideBar