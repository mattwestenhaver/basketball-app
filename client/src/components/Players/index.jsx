import React from 'react'

function Players({ playerIds }) {
    return (
        <div>
            <h1>players</h1>
            {playerIds.map((id, index) => {
                return (
                    <div key={index}>
                        <p>{id}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Players