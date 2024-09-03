import React, { useState, useEffect } from 'react';
import CourseDropdown from './course/CourseDropdown';
import PlayerStrokes from './player/PlayerStrokes';

function HomePage() {
  const [players, setPlayers] = useState([]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [courseIndex, setCourseIndex] = useState(new Array(18).fill(0));
  const [coursePar, setCoursePar] = useState(new Array(18).fill(0));
  const [strokes, setStrokes] = useState({});
  const [selectedCourse, setSelectedCourse] = useState('');
  const [gameAmount, setGameAmount] = useState(0);
  const [dormieAmount, setDormieAmount] = useState(0);
  const [buyAmount, setBuyAmount] = useState(0);
  const [response, setResponse] = useState([]);
  const api_url = process.env.REACT_APP_API_URL

  useEffect(() => {
    if (selectedCourse) {
      fetchCourseDetails(selectedCourse);
    }
  }, [selectedCourse]);

  function handleCourseSelect(courseName) {
    setSelectedCourse(courseName);
  }

  function fetchCourseDetails(courseName) {
    fetch(`${api_url}/api/v1/course?courseName=${encodeURIComponent(courseName)}`)
      .then(response => {
        console.log('Response status:', response.status); // Debug logging
        if (response.ok) {
          return response.json();
        }
        throw new Error(`Failed to fetch details for ${courseName}`);
      })
      .then(data => {
        console.log('Fetched course details:', data); // Debug logging
        setCoursePar(data.par);
        setCourseIndex(data.index);
      })
      .catch(error => {
        console.error('Error fetching course details:', error);
      });
  }

  const addPlayer = () => {
    if (newPlayerName && players.length < 4) {
      const newPlayer = { name: newPlayerName, score: new Array(18).fill(0) };
      const updatedPlayers = [...players, newPlayer];
      setPlayers(updatedPlayers);
      setNewPlayerName('');

      const initialStrokes = updatedPlayers.reduce((acc, player, i) => {
        acc[player.name] = updatedPlayers.map((_, j) => (i === j ? 0 : 0));
        return acc;
      }, {});
      setStrokes(initialStrokes);
    } else {
      alert('Please enter a player name or the maximum number of players has been reached.');
    }
  };

  const handleScoreChange = (playerIndex, holeIndex, value) => {
    const updatedPlayers = [...players];
    updatedPlayers[playerIndex].score[holeIndex] = parseInt(value, 10);
    setPlayers(updatedPlayers);
  };

  const handleCourseIndexChange = (index, value) => {
    const updatedCourseIndex = [...courseIndex];
    updatedCourseIndex[index] = parseInt(value, 10);
    setCourseIndex(updatedCourseIndex);
  };

  const handleCourseParChange = (index, value) => {
    const updatedCoursePar = [...coursePar];
    updatedCoursePar[index] = parseInt(value, 10);
    setCoursePar(updatedCoursePar);
  };

  const handleStrokesChange = (newStrokes) => {
    setStrokes(newStrokes);
  };

  const calculate = async () => {
    const playerScores = players.reduce((acc, player) => {
      acc[player.name] = player.score;
      return acc;
    }, {});
    const playerStrokes = players.reduce((acc, player) => {
      acc[player.name] = strokes[player.name];
      return acc;
    }, {});

    const payload = {
      coursePar,
      courseIndex,
      playerScores,
      strokes: playerStrokes,
      gameMode: 18,
      gameAmount: {
        GameAmount: gameAmount,
        DormieAmount: dormieAmount,
        BuyAmount: buyAmount
      }
    };

    try {
      const response = await fetch(`${api_url}/api/v1/calculate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      setResponse(result['result']);
    } catch (error) {
      console.error('Error calculating points:', error);
    }
  };

  return (
    <div className="container">
      <h1>Game Dormie Buy</h1>
      <CourseDropdown onSelect={handleCourseSelect} />
      <h2>Set Game Amount</h2>
      <div className="amount-inputs">
        <label>
          Game Amount:
          <input
            type="number"
            value={gameAmount}
            onChange={(e) => setGameAmount(parseInt(e.target.value, 10))}
            className="input"
          />
        </label>
        <label>
          Dormie Amount:
          <input
            type="number"
            value={dormieAmount}
            onChange={(e) => setDormieAmount(parseInt(e.target.value, 10))}
            className="input"
          />
        </label>
        <label>
          Buy Amount:
          <input
            type="number"
            value={buyAmount}
            onChange={(e) => setBuyAmount(parseInt(e.target.value, 10))}
            className="input"
          />
        </label>
      </div>
      <h2>Add Player</h2>
      <div className="input-container">
        <input
          type="text"
          value={newPlayerName}
          onChange={(e) => setNewPlayerName(e.target.value)}
          placeholder="Enter player name"
          className="input"
        />
        <button onClick={addPlayer} className="button">Add Player</button>
      </div>
      {players.length > 0 && (
        <>
          <h3>Stroke Advantages</h3>
          <PlayerStrokes players={players} handleStrokesChange={handleStrokesChange} />
        </>
        
      )}
      <h2>Score Table</h2>
      <table className="score-table">
        <thead>
          <tr>
            <th>Hole</th>
            {coursePar.map((_, index) => (
              <th key={index}>{index + 1}</th>
            ))}
          </tr>
          <tr>
            <th>Par</th>
            {coursePar.map((par, index) => (
              <td key={index}>
                <input
                  type="number"
                  value={par}
                  onChange={(e) => handleCourseParChange(index, e.target.value)}
                  className="course-input"
                />
              </td>
            ))}
          </tr>
          <tr>
            <th>Index</th>
            {courseIndex.map((indexValue, index) => (
              <td key={index}>
                <input
                  type="number"
                  value={indexValue}
                  onChange={(e) => handleCourseIndexChange(index, e.target.value)}
                  className="course-input"
                />
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {players.map((player, playerIndex) => (
            <tr key={playerIndex}>
              <th>{player.name}</th>
              {player.score.map((score, holeIndex) => (
                <td key={holeIndex}>
                  <input
                    type="number"
                    value={score ? score : ''}
                    onChange={(e) => handleScoreChange(playerIndex, holeIndex, e.target.value)}
                    className="score-input"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={calculate} className="button">Calculate</button>
      {  console.log(response['result']) }
      {response.length > 0 && (
        <div className="response-container">
          <h2>Calculation Results:</h2>
          {response.map((holeResult, holeIndex) => (
            <div key={holeIndex}>
              <ul>
                {Object.entries(holeResult).map(([player, score]) => (
                  <li key={player}>{player}: {score}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
