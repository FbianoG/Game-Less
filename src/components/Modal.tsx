import './Modal.css'
import { useState } from 'react'
import { createUser, login } from '../api/user'
import { useForm, SubmitHandler } from "react-hook-form";
import { GamesApi } from '../interfaces/games';
import Cashout from './Cashout';

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
        <>
            <div className="bg-neutral-900 bg-opacity-50 fixed left-0 top-0 grid place-items-center w-dvw h-dvh rounded-lg z-40">
                <div className="w-96 max-md:w-11/12 px-6 py-4 relative rounded-lg shadow-xl bg-neutral-100 ">
                    <div className="flex justify-center mx-auto">
                        <img className="w-auto h-7 sm:h-8" src="../../../public/logoTitle.png" alt="" />
                    </div>

                    {type === 'login' &&
                        <>
                            {!create ?
                                <>
                                    <h4 className="mt-3 text-xl font-medium text-center text-gray-600 ">Bem Vindo</h4>
                                    <p className="mt-1 text-center text-gray-500 ">Acesse ou crie sua conta</p>
                                </>
                                :
                                <>
                                    <h4 className="mt-3 text-xl font-medium text-center text-gray-600 ">Criar Conta</h4>
                                    <p className="mt-1 text-center text-gray-500 ">Preencha o formúlario</p>
                                </>

                            }

                            <form onSubmit={!create ? handleSubmit(handleLogin) : handleSubmit(handleCreateUser)}>

                                <input className="inputForm" type="text" placeholder="Login" aria-label="Seu login" {...register('login', { required: true })} />

                                <input className="inputForm" type="password" placeholder="Senha" aria-label="Sua senha"  {...register('password', { required: true })} />

                                {create && <input className="inputForm" type="password" placeholder="Repita a Senha" aria-label="Sua senha"  {...register('rpassword', { required: true })} />}

                                <span className=' mt-4 text-red-500 text-center block'>{textAlert}</span>

                                <div className="flex items-center justify-between mt-4">

                                    {!create && <a href="#" className="text-sm text-gray-600  hover:text-gray-500">Esqueceu a senha?</a>}

                                    <button className="btnForm ml-auto">
                                        {create && 'Criar Conta'}
                                        {!create && 'Entrar'}
                                    </button>

                                </div>
                            </form>

                            <div className=" mt-8 flex items-center justify-center py-4 text-center">
                                {!create ?
                                    <>
                                        <span className="text-sm text-gray-600">Não tem uma conta? </span>
                                        <a className="mx-2 text-sm font-bold text-green-500 cursor-pointer hover:underline" onClick={() => { setCreate(true), reset() }}>Registre-se</a>
                                    </>
                                    :
                                    <>
                                        <a className="mx-2 text-sm font-bold text-green-500 cursor-pointer hover:underline" onClick={() => { setCreate(false), reset() }}>Cancelar</a>
                                    </>
                                }
                            </div>
                        </>
                    }

                    {type === 'checkout' && game && setUser && <Cashout game={game} onClick={setUser} />}

                    <button className=' absolute top-2 right-4 text-2xl text-red-500 duration-300 hover:text-neutral-500' title='Fechar' aria-label='Fechar formulário' onClick={() => onClick(false)}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
            </div>
        </>


    )
}

export default Modal