import './Modal.css'
import { useState } from 'react'
import { createUser, login } from '../api/user'
import { useForm, SubmitHandler } from "react-hook-form";
import { GamesApi } from '../interfaces/games';
import calculateDiscount from '../utils/calculateDiscount';

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

    const style = {
        title: 'text-neutral-800 text-3xl font-medium ',
        form: 'flex flex-col items-center',
        input: 'p-1 mb-3 border border-neutral-300 rounded bg-transparent outline-none focus:border-green-600',
        label: 'text-neutral-700',
        btnMain: 'w-full p-3 bg-green-600 text-neutral-100 font-semibold  rounded hover:brightness-110',
        btnLink: 'mt-auto text-green-600 duration-300 hover:opacity-60 ',
        alert: 'text-red-500 mb-3',
    }

    return (
        <>
            <div className="bg-neutral-900 bg-opacity-50 fixed left-0 top-0 grid place-items-center w-dvw h-dvh rounded-lg">
                <div className="w-96 max-md:w-11/12 px-6 py-4 relative rounded-lg shadow-xl bg-neutral-100 ">
                    <div className="flex justify-center mx-auto">
                        <img className="w-auto h-7 sm:h-8" src="../../../public/logoTitle.png" alt="" />
                    </div>

                    {type === 'login' &&
                        <>
                            {!create &&
                                <>
                                    <h3 className="mt-3 text-xl font-medium text-center text-gray-600 ">Bem Vindo</h3>

                                    <p className="mt-1 text-center text-gray-500 ">Acesse ou crie sua conta</p>
                                </>
                            }
                            {create &&
                                <>
                                    <h3 className="mt-3 text-xl font-medium text-center text-gray-600 ">Criar Conta</h3>

                                    <p className="mt-1 text-center text-gray-500 ">Preencha o formúlario</p>
                                </>
                            }

                            <form onSubmit={!create ? handleSubmit(handleLogin) : handleSubmit(handleCreateUser)}>
                                <input className="block w-full px-4 py-2 mt-4  text-gray-700 placeholder-gray-500 bg-white border rounded-lg focus:border-green-400 focus:ring-opacity-40 outline-none focus:ring focus:ring-green-300" type="text" placeholder="Login" aria-label="Seu login" {...register('login', { required: true })} />

                                <input className="block w-full px-4 py-2 mt-4 text-gray-700 placeholder-gray-500 bg-white border rounded-lg focus:border-green-400 focus:ring-opacity-40 outline-none focus:ring focus:ring-green-300" type="password" placeholder="Senha" aria-label="Sua senha"  {...register('password', { required: true })} />

                                {create &&
                                    <input className="block w-full px-4 py-2 mt-4 text-gray-700 placeholder-gray-500 bg-white border rounded-lg focus:border-green-400 focus:ring-opacity-40 outline-none focus:ring focus:ring-green-300" type="password" placeholder="Repita a Senha" aria-label="Sua senha"  {...register('rpassword', { required: true })} />
                                }

                                <span className=' mt-4 text-red-500 text-center block'>{textAlert}</span>

                                <div className="flex items-center justify-between mt-4">

                                    {!create &&
                                        <a href="#" className="text-sm text-gray-600  hover:text-gray-500">Esqueceu a senha?</a>
                                    }

                                    <button className="px-6 py-2 text-sm ml-auto font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-600 rounded-lg hover:bg-green-500 outline-none focus:ring focus:ring-green-300 focus:ring-opacity-50 shadow-md">
                                        {create && 'Criar Conta'}

                                        {!create && 'Entrar'}
                                    </button>
                                </div>
                            </form>

                            <div className=" mt-8 flex items-center justify-center py-4 text-center">
                                {!create && <>
                                    <span className="text-sm text-gray-600">Não tem uma conta? </span>

                                    <a className="mx-2 text-sm font-bold text-green-500 cursor-pointer hover:underline" onClick={() => { setCreate(true), reset() }}>Registre-se</a>
                                </>
                                }

                                {create && <>
                                    <a className="mx-2 text-sm font-bold text-green-500 cursor-pointer hover:underline" onClick={() => { setCreate(false), reset() }}>Cancelar</a>
                                </>
                                }
                            </div>
                        </>
                    }

                    {type === 'checkout' && game &&
                        <>
                            <h4 className='mt-3 text-xl font-medium text-center text-gray-600'>Conclua Sua Compra</h4>

                            <div className=" py-4 flex items-center gap-4 text-neutral-700 border-b border-neutral-300">
                                <input type="checkbox" id='check' />
                                <label htmlFor='check'>Estou ciente dos "Termos & Condições" antes de efetuar esta compra. </label>
                            </div>

                            <div className="w-full flex gap-2 text-neutral-800 font-medium">
                                <img className='w-16 shadow-xl' src={game.poster} alt='' />
                                <p>{game.name}</p>
                                <p className='w-max ml-auto text-nowrap'>R$ {game.price}</p>
                            </div>

                            <div className="w-full my-4 flex flex-col items-end text-neutral-500">
                                <p>Desconto: R${calculateDiscount(Number(game.price), game.promo).toFixed(2)}</p>
                                <p>Taxas: R$ 0.00</p>
                                <h5 className=' font-medium text-xl text-green-600'>Total: R$ {(Number(game.price) - calculateDiscount(Number(game.price), game.promo)).toFixed(2)}</h5>
                            </div>

                            <button className={style.btnMain} onClick={setUser} >Comprar</button>
                        </>
                    }

                    <button className=' absolute top-2 right-4 text-2xl text-red-500 duration-300 hover:text-neutral-500' title='Fechar' aria-label='Fechar formulário' onClick={() => onClick(false)}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
            </div>
        </>


    )
}

export default Modal









{/* return (
        <div className='w-dvw h-dvh fixed top-0 left-0 grid place-items-center z-40 bg-black bg-opacity-70 opacity-0' id='modal'>
            <div className=" w-96 min-h-96 p-8 relative bg-neutral-50 rounded flex flex-col items-center gap-4 max-md:w-11/12">
                {type === 'login' && <>
                    {!create ?
                        <>
                            <h4 className={style.title}>Faça Seu Login</h4>
                            <form className={style.form} onSubmit={handleSubmit(handleLogin)}>
                                <label className={style.label} htmlFor='login'>Login</label>
                                <input className={style.input} id='login' type='text'  {...register("login", { required: true })} />
                                <label className={style.label} htmlFor='password'>Senha</label>
                                <input className={style.input} id='password' type='password' {...register("password", { required: true })} />
                                <p className={style.alert}>{textAlert}</p>
                                <button type='submit' className={style.btnMain}>Entrar</button>
                            </form>
                            <button className={style.btnLink} onClick={() => { setCreate(true), reset(), setTextAlert(undefined) }}>Criar uma conta</button>
                        </>
                        :
                        <>
                            <h4 className={style.title}>Criar Conta</h4>
                            <form className={style.form} onSubmit={handleSubmit(handleCreateUser)}>
                                <label className={style.label} htmlFor='login'>Login</label>
                                <input className={style.input} id='login' type='text'  {...register("login", { required: true })} />
                                <label className={style.label} htmlFor='password'>Senha</label>
                                <input className={style.input} id='password' type='password' {...register("password", { required: true })} />
                                <label className={style.label} htmlFor='rpassword'>Repita a Senha</label>
                                <input className={style.input} id='rpassword' type='password' {...register("rpassword", { required: true })} />
                                <p className={style.alert}>{textAlert}</p>
                                <button type='submit' className={style.btnMain}>Criar Conta</button>
                            </form>
                            <button className={style.btnLink} onClick={() => { setCreate(false), reset(), setTextAlert(undefined) }}>Cancelar</button>
                        </>
                    }

                </>}

               
                <button className=' absolute top-3 right-5 text-2xl text-red-600 duration-300 hover:opacity-70' onClick={() => { document.body.style.overflow = '', onClick(false) }}><i className="fa-solid fa-xmark"></i></button>

            </div>
        </div >
    ) */}