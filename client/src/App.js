import React, { useState } from "react"
import "./App.css"
import Search from "./components/Players/Search"
import Players from "./components/Players"

function App() {
    const [playerIds, setPlayerIds] = useState([])

    const addPlayer = (id) => {
        if (!playerIds.includes(id)) {
            setPlayerIds([...playerIds, id])
        }
    }

    return (
        <div className="App">
            <h2>Basketball App</h2>
            <Search addPlayer={addPlayer} />
            <Players playerIds={playerIds} />
        </div>
    )
}

export default App
