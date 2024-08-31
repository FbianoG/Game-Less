import axios from "axios"
import UrlApi from "./UrlApi"

const getGame = async (gameId) => {
    try {
        const response = await axios.get(`${UrlApi}/getGame?id=${gameId}`)
        return response.data
    } catch (error: any) {
        if (error.response) throw new Error(error.response.data.message)
        else if (error.request) throw new Error("Error de rede. Tente novamente.")
        else throw new Error(error.message)
    }
}


export default getGame