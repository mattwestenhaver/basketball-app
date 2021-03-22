const request = require("request"),
    apiUrl = "https://www.balldontlie.io/api/v1"

module.exports = {
    index: (req, res) => {
        const searchTerm = req.query.search ? req.query.search : ""
        request(
            `${apiUrl}/players?search=${searchTerm}`,
            { json: true },
            (err, response, body) => {
                if (err) {
                    return console.log(err)
                }
                res.json({ success: true, data: body.data, meta: body.meta })
            }
        )
    },
}
