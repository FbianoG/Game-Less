import { useState } from "react"
import { GamesApi } from "../interfaces/games"
import calculateDiscount from "../utils/calculateDiscount"

interface CashoutProps {
    game: GamesApi
    onClick: (a: any) => void
}

const Cashout: React.FC<CashoutProps> = ({ game, onClick }) => {

    const [step, setStep] = useState<1 | 2>(1)

    return (
        <div>
            <h4 className='mt-3 text-xl font-medium text-center text-gray-600'>Conclua Sua Compra</h4>

            <ol className=" mt-6 flex items-center text-base justify-center gap-4 w-full  md:text-lg font-medium text-center text-gray-500">

                <li className="flex items-center  gap-2 text-green-600" onClick={() => setStep(1)}>
                    <span className="grid place-items-center w-5 h-5 text-xs border border-green-600 rounded-full  ">1</span>
                    Dados Cartão
                </li>

                <svg className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180 duration-500" style={step === 2 ? { color: 'rgb(22 163 74' } : {}} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 9 4-4-4-4M1 9l4-4-4-4" />
                </svg>

                <li className="flex items-center gap-2 duration-500" style={step === 2 ? { color: 'rgb(22 163 74' } : {}}>
                    <span className="flex items-center justify-center w-5 h-5 text-xs border border-neutral-400 rounded-full duration-500" style={step === 2 ? { borderColor: 'rgb(22 163 74' } : {}}>2</span>
                    Confirmar
                </li>

            </ol>

            {step === 1 &&
                <>
                    <input className="inputForm" type='number' placeholder="Numéro do cartão" />

                    <div className='flex gap-4'>
                        <input className="inputForm" type='number' placeholder="Cvv" />
                        <input className="inputForm" type='text' placeholder="Validade" />
                    </div>

                    <input className="inputForm" type='text' placeholder="Nome no cartão" />
                    <input className="inputForm" type='number' placeholder="CPF" />

                    <button className="btnForm ml-auto mt-4 block" onClick={() => setStep(2)}>
                        Prosseguir
                    </button>
                </>
            }

            {step === 2 &&
                <>
                    <div className=" py-4 my-4 flex items-center gap-4 text-neutral-700 border-b border-neutral-300 peer ">
                        <input className='' type="checkbox" id='check' />
                        <label htmlFor='check'>Estou ciente dos <span className='text-green-600 cursor-pointer hover:opacity-70'>"Termos & Condições"</span> antes de efetuar esta compra. </label>
                    </div>

                    <div className="w-full flex gap-2 text-neutral-800 font-medium">
                        <img className='w-16 shadow-md shadow-neutral-400' src={game.poster} alt='' />
                        <p>{game.name}</p>
                        <p className='w-max ml-auto text-nowrap'>R$ {game.price}</p>
                    </div>

                    <div className="w-full my-4 flex flex-col items-end text-neutral-500">
                        <p>Desconto: R${calculateDiscount(Number(game.price), game.promo).toFixed(2)}</p>
                        <p>Taxas: R$ 0.00</p>
                        <h5 className=' font-medium text-xl text-green-600'>Total: R$ {(Number(game.price) - calculateDiscount(Number(game.price), game.promo)).toFixed(2)}</h5>
                    </div>

                    <button className={` btnForm w-full hidden peer-has-[:checked]:block`} onClick={onClick}>Comprar</button>
                    <button className={` py-7 btnForm w-full  opacity-70  peer-has-[:checked]:hidden`} disabled >Aceite os termos</button>
                </>}
        </div>
    )
}

export default Cashout