import React, { useState, useEffect } from 'react';

function PlayerStrokes({ players, handleStrokesChange }) {
  const [strokes, setStrokes] = useState({});

  useEffect(() => {
    const initialStrokes = players.reduce((acc, player, i) => {
      acc[player.name] = players.map((_, j) => ((i > j) || (i === j) ? '' : ''));
      return acc;
    }, {});
    setStrokes(initialStrokes);
  }, [players]);

  const handleChange = (playerName, index, value) => {
    const updatedStrokes = { ...strokes };
    updatedStrokes[playerName][index] = value;
    setStrokes(updatedStrokes);
    handleStrokesChange(updatedStrokes);
  };

  return (
    <table className="strokes-table">
      <thead>
        <tr>
          <th></th>
          {players.map((player, i) => (
            <th key={i}>{player.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {players.map((player, i) => (
          <tr key={i}>
            <th>{player.name}</th>
            {players.map((_, j) => (
              <td key={j}>
                <input
                  type="number"
                  value={strokes[player.name] ?  strokes[player.name][j] : ''} 
                  onChange={(e) => handleChange(player.name, j, e.target.value)}
                  className="strokes-input"
                  disabled={(i > j) || (i === j)}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PlayerStrokes;
