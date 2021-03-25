import React, { useState } from 'react'
import auth from '../../auth'

function Search({ addPlayer, playersLength }) {
    const [searchValue, setSearchValue] = useState("")
    const [searchResults, setSearchResults] = useState([])

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value)
        getSearchResults(e.target.value)
    }

    const getSearchResults = (value) => {
        auth.getPlayers(value).then(response => {
            if (response.success) {
                if (value !== '') {
                    setSearchResults(response.data)
                } else {
                    setSearchResults([])
                }
            }
        })
    }

    const handlePlayerSelect = (player) => {
        if (playersLength < 5) {
            addPlayer(player)
        }
        setSearchValue("")
        setSearchResults([])
    }

    return (
        <div className={`search-container ${playersLength === 0 ? 'centered' : ''}`}>
            <input name="Search" value={searchValue} placeholder="Search Player" onChange={handleSearchChange} />
            {searchResults.length
                ?   <div className={`${playersLength === 0 ? 'centered-results' : ''}`}>
                        <ul className="search-results-list">
                            {searchResults.map((player, index) => {
                                return (
                                    <li key={index} onClick={() => handlePlayerSelect(player)}>{player.first_name} {player.last_name} - {player.team.abbreviation}</li>
                                )
                            })}
                        </ul>
                    </div>
                : null
            }
            
        </div>
    )
}

export default Search