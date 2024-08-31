import { useEffect, useState } from 'react'
import { createUser, login } from '../../api/user'
import './Modal.css'

import { useForm, SubmitHandler } from "react-hook-form";
import { GamesApi } from '../../interfaces/games';
import calculateDiscount from '../../utils/calculateDiscount';

interface ModalProps {
    onClick: (a: boolean) => void
    setUser?: (a: any) => void
    game?: GamesApi
    type: 'login' | 'checkout'
}

interface InputForm {
    login: string
    password: string
    rpassword?: string
}



const Modal: React.FC<ModalProps> = ({ onClick, setUser, type, game }) => {


    const { register, handleSubmit, reset } = useForm<InputForm>();

    const [textAlert, setTextAlert] = useState<string>()

    const [create, setCreate] = useState<boolean>(false)

    useEffect(() => { document.body.style.overflow = 'hidden' }, [])

    const handleLogin: SubmitHandler<InputForm> = async (data) => {
        setTextAlert(undefined)
        try {
            if (!setUser) throw new Error("Erro ao carregar dados. Atualize a página.")
            const response = await login(data.login, data.password)
            sessionStorage.setItem('User', JSON.stringify(response.user))
            sessionStorage.setItem('Token', response.token)
            location.reload()
        } catch (error: any) {
            setTextAlert(error.message)
        }
    }

    const handleCreateUser: SubmitHandler<InputForm> = async (data) => {
        setTextAlert(undefined)
        try {
            if (data.password !== data.rpassword) throw new Error("As senhas não estão iguais.");
            const response = await createUser(data.login, data.password)
            console.log(response)
            setCreate(false)
        } catch (error: any) {
            console.log(error)
            setTextAlert(error.message)
        }
    }


    return (
        <div className='modal'>
            <div className="modal__content">
                {type === 'login' && <>
                    {!create ?
                        <>
                            <h4 className='modal__content-title'>Faça Seu Login</h4>
                            <form onSubmit={handleSubmit(handleLogin)}>
                                <label htmlFor='login'>Login</label>
                                <input type='text' id='login' {...register("login", { required: true })} />
                                <label htmlFor='password'>Senha</label>
                                <input type='password' id='password'{...register("password", { required: true })} />
                                <p>{textAlert}</p>
                                <button type='submit' className='btn-main'>Entrar</button>
                            </form>
                            <button className='btn-link' onClick={() => { setCreate(true), reset(), setTextAlert(undefined) }}>Criar uma conta</button>
                            <button className='btn-close' onClick={() => { document.body.style.overflow = '', onClick(false) }}><i className="fa-solid fa-xmark"></i></button>
                        </>
                        :
                        <>
                            <h4 className='modal__content-title'>Criar Conta</h4>
                            <form onSubmit={handleSubmit(handleCreateUser)}>
                                <label htmlFor='login'>Login</label>
                                <input type='text' id='login' {...register("login", { required: true })} />
                                <label htmlFor='password'>Senha</label>
                                <input type='password' id='password'{...register("password", { required: true })} />
                                <label htmlFor='rpassword'>Repita a Senha</label>
                                <input type='password' id='rpassword'{...register("rpassword", { required: true })} />
                                <p>{textAlert}</p>
                                <button type='submit' className='btn-main'>Criar Conta</button>
                            </form>
                            <button className='btn-link' onClick={() => { setCreate(false), reset(), setTextAlert(undefined) }}>Cancelar</button>
                            <button className='btn-close' onClick={() => { document.body.style.overflow = '', onClick(false) }}><i className="fa-solid fa-xmark"></i></button>
                        </>
                    }
                </>}

                {type === 'checkout' && game && <>
                    <h4 className='modal__content-title'>Conclua Sua Compra</h4>
                    <div className="modal__content-terms">
                        <input type="checkbox" id='check' />
                        <label htmlFor='check'>Estou ciente dos "Termos & Condições" antes de efetuar esta compra. </label>
                    </div>
                    <div className="modal__content-game">
                        <img src={game.poster} alt='' />
                        <p>{game.name}</p>
                        <p>R$ {game.price}</p>
                    </div>
                    <div className="modal__content-price">
                        <p>Desconto: R${calculateDiscount(Number(game.price), game.promo).toFixed(2)}</p>
                        <p>Taxas: R$ 0.00</p>
                        <h5>Total: R$ {(Number(game.price) - calculateDiscount(Number(game.price), game.promo)).toFixed(2)}</h5>
                    </div>

                    <button className='btn-main' onClick={setUser} >Comprar</button>
                    <button className='btn-close' onClick={() => { document.body.style.overflow = '', onClick(false) }}><i className="fa-solid fa-xmark"></i></button>
                </>}
            </div>
        </div >
    )
}

export default Modal