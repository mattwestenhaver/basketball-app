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
    { key: 'ft_pct', value: 'ft_pct', text: 'Free Throw %'},
    { key: 'fg3_pct', value: 'fg3_pct', text: '3PT Field Goal %'},
]

function Graphs({ players }) {
    const [pointsData, setPointsData] = useState([])
    const [activeStat, setActiveStat] = useState('pts')
    const colors = ['#2acaea', '#008000', '#a10505', '#8d52eb', '#ff3399']

    useEffect(() => {
        let graphData = []

        for (let i = 0; i < players.length; i++) {
            for (let j = 0; j < players[i].stats.length; j++) {
                if (!graphData[j]) {
                    graphData[j] = {
                        game: j
                    }
                }
                graphData[j][players[i].info.first_name + " " + players[i].info.last_name] = players[i].stats[j][activeStat]
            }
        }

        setPointsData(graphData)
    }, [players, activeStat])

    const handleChangeStat = (e, {value}) => {
        setActiveStat(value)
    }

    return (
        players.length
            ?   <div className="graph-container">
                    <h1>Stats over last 10 games</h1>
                    <Dropdown selection name="stat" value={activeStat} options={statOptions} onChange={handleChangeStat} />
                    <LineChart
                        width={600}
                        height={400}
                        data={pointsData}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 10,
                            bottom: 5,
                        }}
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