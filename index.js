const express = require("express"),
    logger = require("morgan"),
    cors = require("cors"),
    path = require("path"),
    app = express(),
    PORT = 3001,
    playersRoutes = require("./routes/players")

app.use(cors())
app.use(logger("dev"))
app.use(express.json())

app.use(express.static(path.join(__dirname, "client", "build")))

app.get("/", (req, res) => {
    res.json({ message: "Basketball API" })
})

app.use("/players", playersRoutes)

playersRoutes.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"))
})

app.listen(PORT, (err) => {
    console.log(err || `Server running on Port ${PORT}`)
})
