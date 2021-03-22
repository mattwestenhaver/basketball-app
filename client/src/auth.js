import axios from "axios"

class AuthClient {
    constructor() {
        this.request = axios.create({
            baseURL: "http://localhost:3001",
            headers: {},
        })
    }

    getPlayers(value) {
        return this.request({
            method: "GET",
            url: `/players?search=${value}`,
        }).then((response) => {
            if (response.status === 200) {
                return response.data
            } else {
                return { success: false }
            }
        })
    }
}

export default new AuthClient()
