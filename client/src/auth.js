import axios from "axios"

class AuthClient {
    constructor() {
        this.request = axios.create({
            baseURL: "https://mw-basketball-app.herokuapp.com/",
            // baseURL: "http://localhost:3001",
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

    getPlayerStats(id) {
        return this.request({
            method: "GET",
            url: `/players/averages?playerId=${id}`,
        }).then((response) => {
            if (response.status === 200) {
                return this.request({
                    method: "GET",
                    url: `/players/stats?playerId=${id}`,
                }).then((response2) => {
                    if (response2.status === 200) {
                        return {
                            averages: response.data.data[0] || {},
                            stats: response2.data.data || {},
                        }
                    } else {
                        return { success: false }
                    }
                })
            } else {
                return { success: false }
            }
        })
    }
}

export default new AuthClient()
