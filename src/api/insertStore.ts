import axios from "axios"
import UrlApi from "./UrlApi"

const insertStore = async (gameId: number) => {
    try {
        const token = sessionStorage.getItem('Token')
        const userStr = sessionStorage.getItem('User')
        if (!token || !userStr) throw new Error("Você precisa estar logado para comprar este jogo.");
        const userId = JSON.parse(userStr).id
        const response = await axios.post(`${UrlApi}/includeUserStore`, { userId, gameId }, { headers: { 'Authorization': `Bearer ${token}` } })
        return response.data
    } catch (error: any) {
        if (error.response) throw new Error(error.response.data.message)
        else if (error.request) throw new Error("Error de rede. Tente novamente.")
        else throw new Error(error.message)
    }
}

export default insertStore