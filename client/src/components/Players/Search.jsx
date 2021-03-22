import React, { useState } from 'react'
import auth from '../../auth'

function Search({ addPlayer }) {
    const [searchValue, setSearchValue] = useState("")
    const [searchResults, setSearchResults] = useState([])

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value)
        getSearchResults(e.target.value)
    }

    const getSearchResults = (value) => {
        auth.getPlayers(value).then(response => {
            if (response.success) {
                setSearchResults(response.data)
            }
        })
    }

    const handlePlayerSelect = (id) => {
        addPlayer(id)
    }

    return (
        <div>
            <input name="Search" value={searchValue} placeholder="Search Player" onChange={handleSearchChange} />
            <ul>
                {searchResults.map((player, index) => {
                    return (
                        <li key={index} onClick={() => handlePlayerSelect(player.id)}>{player.first_name} {player.last_name}</li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Search