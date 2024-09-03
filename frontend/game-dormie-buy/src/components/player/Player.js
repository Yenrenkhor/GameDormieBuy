import React from 'react';

function Player({ players, handleScoreChange }) {

  return (
    <tbody>
      {players.map((player, playerIndex) => (
        <tr key={playerIndex}>
          <th>{player.name}</th>
          {player.score.map((score, holeIndex) => (
            <td key={holeIndex}>
              <input
                type="number"
                value={score}
                onChange={(e) => handleScoreChange(playerIndex, holeIndex, e.target.value)}
                className="score-input"
              />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default Player;
