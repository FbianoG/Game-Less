import { useEffect, useState } from 'react'
import Modal from './Modal'
import { Link } from 'react-router-dom'

import { IoGameController, IoLogoGooglePlaystore, IoLogOutOutline } from "react-icons/io5";
import { IoMdCart } from 'react-icons/io';


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

    const style = {
        header: 'flex gap-3 items-center mb2 cursor-pointer duration-300 hover:opacity-60',
        navItem: 'p-4 flex gap-4 items-center rounded-lg duration-300 hover:bg-neutral-800',
    }

    return (
        <div className='w-72 h-dvh p-2 fixed left-0 top-0 flex gap-2 flex-col duration-300 z-30 bg-neutral-900 max-md:-left-72' style={ShowSideBar ? { left: "0" } : {}}>
            <img src='logoTitle.png' alt='Logo Game Less' className='w-52 h-auto block p-4 mx-auto' />

            <div className={style.header} onClick={() => { !user && setShowModal(true) }}>
                {user && <img className='w-12 h-12 rounded-full object-cover' src='https://i.pinimg.com/474x/08/93/2e/08932eeeaec1411bfb71fa506c08e595.jpg' alt={user.login} />}

                <div className="pl-4" >
                    <p className='text-neutral-100 font-bold'>{user ? user.login : "Faça login"}</p>

                    <span className='bg-slate-100 px-1 text-sm text-neutral-900 font-bold'>{!user ? 'Clique aqui' : 'PC GAMES'}</span>
                </div>
            </div>

            <nav className="flex gap-3 flex-col list-none text-neutral-100 font-medium">
                <Link className={style.navItem} to='/'>
                    <IoLogoGooglePlaystore className='text-2xl' />
                    Game Less
                </Link>

                {user &&
                    <>
                        <Link className={style.navItem} to='/libs' >
                            <IoGameController className='text-2xl' />
                            Biblioteca
                        </Link>

                        <Link className={style.navItem} to='/store'>
                            <IoMdCart className='text-2xl' />
                            Carrinho
                        </Link>
                    </>
                }
            </nav>

            {user &&
                <button className='p-4 mt-auto mx-auto text-lg text-red-600 flex gap-2 items-center duration-300 hover:opacity-50' onClick={logout}>
                    Logout
                    <IoLogOutOutline className='text-2xl' />
                </button>
            }

            {showModal && <Modal type='login' onClick={setShowModal} setUser={setUser} />}

            {!ShowSideBar &&
                <div className="w-6 h-20 fixed left-0 top-1/2 -translate-y-1/2 rounded-r-xl bg-neutral-50 place-items-center hidden max-md:grid " title='Mostrar menu' onClick={handleShowSideBar}>
                    <i className="fa-solid fa-chevron-right"></i>
                </div>
            }

            {ShowSideBar && <div className='w-dvw h-dvh fixed left-0 top-0 bg-opacity-50 bg-black -z-10' onClick={handleShowSideBar}></div>}
        </div>
    )
}

export default SideBar