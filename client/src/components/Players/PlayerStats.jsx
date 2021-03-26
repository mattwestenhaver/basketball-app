import React, {useState} from 'react'
import { VscChromeClose } from 'react-icons/vsc'

const statOptions = [
    { key: 'pts', text: 'PTS'},
    { key: 'ast', text: 'AST'},
    { key: 'reb', text: 'REB'},
    { key: 'stl', text: 'STL'},
    { key: 'blk', text: 'BLK'},
    { key: 'turnover', text: 'TO'},
    { key: 'fg_pct', text: 'FG%'},
    { key: 'fg3_pct', text: '3P%'},
    { key: 'ft_pct', text: 'FT%'},
]

function PlayerStats({ players, removePlayer }) {
    const [sortingStat, setSortingStat] = useState('pts')

    const handleRemovePlayer = (id) => {
        removePlayer(id)
    }

    const getPlayerString = (player) => {
        return `${player.info.first_name} ${player.info.last_name} ${player.info.position ? `(${player.info.position})` : ''} - ${player.info.team.abbreviation}`
    }

    const handleChangeSort = (stat) => {
        setSortingStat(stat)
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
                                    {statOptions.map((stat) => {
                                        return (
                                            <th
                                                key={stat.key} 
                                                onClick={() => handleChangeSort(stat.key)}
                                                className={stat.key === sortingStat ? 'active-stat' : ''}
                                            >
                                                {stat.text}
                                            </th>
                                        )
                                    })}
                                </tr>
                                {players.sort((a, b) => {
                                    return a.averages[sortingStat] > b.averages[sortingStat] ? -1 : 1
                                }).map((player, index) => {
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