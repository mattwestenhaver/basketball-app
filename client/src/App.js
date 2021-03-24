import React, { useState } from "react"
import "./App.css"
import Search from "./components/Players/Search"
import PlayerStats from "./components/Players/PlayerStats"
import Graph from "./components/Graph"
import auth from "./auth"

function App() {
    const [players, setPlayers] = useState([])

    const addPlayer = (player) => {
        let exists = false
        for (var i = 0; i < players.length; i++) {
            if (players[i].info.id === player.id) {
                exists = true
                break
            }
        }

        if (!exists) {
            auth.getPlayerStats(player.id)
                .then((response) => {
                    const playerData = {
                        info: player,
                        averages: response.averages,
                        stats: response.stats,
                    }
                    setPlayers([...players, playerData])
                })
                .catch((err) => {
                    return err
                })
        }
    }

    const removePlayer = (id) => {
        setPlayers(players.filter((player) => player.info.id !== id))
    }

    return (
        <div className="App">
            <Search addPlayer={addPlayer} playersLength={players.length} />
            <PlayerStats players={players} removePlayer={removePlayer} />
            <Graph players={players} />
        </div>
    )
}

export default App
