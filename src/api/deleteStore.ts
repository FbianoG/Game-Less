import axios from "axios"
import UrlApi from "./UrlApi"

const deleteStore = async (game_id: number) => {
    try {
        const token = sessionStorage.getItem('Token')
        if (!token) throw new Error("Faça login para acessar esta página.")
        const response = await axios.post(`${UrlApi}/deleteStore`, { game_id }, { headers: { 'Authorization': `Bearer ${token}` } })
        return response.data
    } catch (error: any) {
        if (error.response) throw new Error(error.response.data.message)
        else if (error.request) throw new Error("Error de rede. Tente novamente.")
        else throw new Error(error.message)
    }
}


export default deleteStore