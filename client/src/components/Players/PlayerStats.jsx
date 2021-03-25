import React from 'react'
import { VscChromeClose } from 'react-icons/vsc'

function PlayerStats({ players, removePlayer }) {
    const handleRemovePlayer = (id) => {
        removePlayer(id)
    }

    const getPlayerString = (player) => {
        return `${player.info.first_name} ${player.info.last_name} ${player.info.position ? `(${player.info.position})` : ''} - ${player.info.team.abbreviation}`
    }

    return (
        players.length
            ?   <div className="players-container">
                    <div className="player-stats__container">
                        <h2>2020 Season Averages</h2>
                        <table>
                            <tbody>
                                <tr className="table-labels">
                                    <th></th>
                                    <th>Player</th>
                                    <th>PTS</th>
                                    <th>AST</th>
                                    <th>REB</th>
                                    <th>STL</th>
                                    <th>BLK</th>
                                    <th>TO</th>
                                    <th>FG%</th>
                                    <th>3P%</th>
                                    <th>FT%</th>
                                </tr>
                                {players.map((player, index) => {
                                    return (
                                        <tr key={index} className="player-stats__row">
                                            <td>
                                                <VscChromeClose className="remove-player__icon" onClick={() => handleRemovePlayer(player.info.id)}/>
                                            </td>
                                            <th className="player-stats__header">
                                                {getPlayerString(player)}
                                            </th>
                                            <td>{player.averages.pts || "N/A"}</td>            
                                            <td>{player.averages.ast || "N/A"}</td>            
                                            <td>{player.averages.reb || "N/A"}</td>            
                                            <td>{player.averages.stl || "N/A"}</td>            
                                            <td>{player.averages.blk || "N/A"}</td>            
                                            <td>{player.averages.turnover || "N/A"}</td>            
                                            <td>{player.averages.fg_pct || "N/A"}</td>            
                                            <td>{player.averages.fg3_pct || "N/A"}</td>            
                                            <td>{player.averages.ft_pct || "N/A"}</td>            
                                        </tr>
                                    )
                                })}
                            </tbody> 
                        </table>     
                    </div>
                </div>
            : <h2>Search for a player to get started</h2>
    )
}

export default PlayerStats