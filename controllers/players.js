const request = require("request"),
    apiUrl = "https://www.balldontlie.io/api/v1"

module.exports = {
    search: (req, res) => {
        const searchTerm = req.query.search ? req.query.search : ""
        request(
            `${apiUrl}/players?search=${searchTerm}`,
            { json: true },
            (err, response) => {
                if (err) {
                    return console.log(err)
                }
                res.json({
                    success: true,
                    data: response.body.data,
                    meta: response.body.meta,
                })
            }
        )
    },

    averages: (req, res) => {
        const playerIdString = `&player_ids[]=${req.query.playerId}`
        request(
            `${apiUrl}/season_averages?seasons[]=2020${playerIdString}`,
            { json: true },
            (err, response) => {
                if (err) {
                    return console.log(err)
                }
                res.json({ success: true, data: response.body.data })
            }
        )
    },

    stats: (req, res) => {
        const queryString = `&player_ids[]=${req.query.playerId}&postseason=false`

        request(
            `${apiUrl}/stats?seasons[]=2020${queryString}&per_page=82`,
            { json: true },
            (err, response) => {
                if (err) {
                    return console.log(err)
                }
                // returns last 10 game stats
                res.json({
                    success: true,
                    data: response.body.data
                        .sort((a, b) => {
                            return a.game.date > b.game.date ? 1 : -1
                        })
                        .slice(
                            response.body.data.length - 10,
                            response.body.data.length
                        ),
                })
            }
        )
    },
}
