import axios from "axios"
const baseUrl = "/api/login"

const login = async credentials => {
    console.log("Login Service")
    const res = await axios.post(baseUrl, credentials)
    console.log("Login Service")
    return res.data
}

export default { login }