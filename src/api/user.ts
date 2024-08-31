import axios from "axios"
import UrlApi from "./UrlApi"

const login = async (login: string, password: string) => {
    try {
        if (login.trim() === '' || password.trim() === "") throw new Error("Preencha todos os campos.");
        const response = await axios.post(`${UrlApi}/login`, { login, password })
        return response.data
    } catch (error: any) {
        if (error.response) throw new Error(error.response.data.message)
        else if (error.request) throw new Error("Error de rede. Tente novamente.")
        else throw new Error(error.message)
    }
}

const verifyUser = async () => {
    try {
        const response = await axios.get(`${UrlApi}/verifyUser`, { withCredentials: true })
        return response.data
    } catch (error: any) {
        if (error.response) throw new Error(error.response.data.message)
        else if (error.request) throw new Error("Error de rede. Tente novamente.")
        else throw new Error(error.message)
    }
}

const createUser = async (login: string, password: string) => {
    try {
        const response = await axios.post(`${UrlApi}/createUser`, { login, password })
        return response.data
    } catch (error: any) {
        if (error.response) throw new Error(error.response.data.message)
        else if (error.request) throw new Error("Error de rede. Tente novamente.")
        else throw new Error(error.message)
    }
}




export { login, verifyUser, createUser }