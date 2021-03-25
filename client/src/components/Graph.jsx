import React, {useState, useEffect} from 'react'
import { LineChart, XAxis, YAxis, Legend, Tooltip, CartesianGrid, Line } from 'recharts'
import { Dropdown } from 'semantic-ui-react'

const statOptions = [
    { key: 'pts', value: 'pts', text: 'Points' },
    { key: 'ast', value: 'ast', text: 'Assists'},
    { key: 'reb', value: 'reb', text: 'Rebounds'},
    { key: 'stl', value: 'stl', text: 'Steals'},
    { key: 'blk', value: 'blk', text: 'Blocks'},
    { key: 'turnover', value: 'turnover', text: 'Turnovers'},
    { key: 'fg_pct', value: 'fg_pct', text: 'Field Goal %'},
    { key: 'fg3_pct', value: 'fg3_pct', text: '3PT Field Goal %'},
    { key: 'ft_pct', value: 'ft_pct', text: 'Free Throw %'},
]

const gameOptions = [
    { key: 5, value: 5, text: 5 },
    { key: 10, value: 10, text: 10},
    { key: 15, value: 15, text: 15},
    { key: 20, value: 20, text: 20},
]

function Graphs({ players }) {
    const [pointsData, setPointsData] = useState([])
    const [activeStat, setActiveStat] = useState('pts')
    const [games, setGames] = useState(10)
    const colors = ['#2acaea', '#008000', '#a10505', '#8d52eb', '#ff3399']

    useEffect(() => {
        let graphData = []

        for (let i = 0; i < players.length; i++) {
            let playerName = `${players[i].info.first_name} ${players[i].info.last_name}`
            let tempStats = players[i].stats.slice(20 - games, players[i].stats.length)
            for (let j = 0; j < tempStats.length; j++) {
                if (!graphData[j]) {
                    graphData[j] = {
                        game: j
                    }
                }
                graphData[j][playerName] = tempStats[j][activeStat]
            }
        }

        setPointsData(graphData)
    }, [players, activeStat, games])

    const handleChangeStat = (e, {value}) => {
        setActiveStat(value)
    }

    const handleChangeGames = (e, {value}) => {
        setGames(value)
    }

    const getStatText = () => {
        return statOptions.filter(stat => stat.key === activeStat)[0].text
    }

    return (
        players.length
            ?   <div className="graph-container">
                    <h2>{getStatText()} over last {games} games</h2>
                    <div className="dropdown-container">
                        <h4>Stat:</h4>
                        <Dropdown selection name="stat" value={activeStat} options={statOptions} onChange={handleChangeStat} />
                        <h4>Games:</h4>
                        <Dropdown selection name="games" value={games} options={gameOptions} onChange={handleChangeGames} />
                    </div>
                    <LineChart
                        width={650}
                        height={400}
                        data={pointsData}
                        className="stats-graph"
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {players.map((player, index) => {
                            return (
                                <Line
                                    key={index} 
                                    type="monotone" 
                                    dataKey={player.info.first_name + " " + player.info.last_name} 
                                    stroke={colors[index]} 
                                    activeDot={{ r: 8 }} 
                                    />
                            )
                        })}
                    </LineChart>
                </div>
            : null
    )
}

export default Graphs