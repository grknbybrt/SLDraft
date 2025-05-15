// cleaned-up JSX, closing tags, and popup logic corrected

import React, { useState } from 'react';

const teams = [
  "Gaziantep", "Sivasspor", "Samsunspor", "Eyüpspor", "Çaykur Rizespor", "Kayserispor",
  "Galatasaray", "Kasımpaşa", "Antalyaspor", "Hatayspor", "Konyaspor", "Alanyaspor",
  "Fenerbahçe", "Trabzonspor", "Göztepe", "Bodrumspor", "Başakşehir", "Beşiktaş"
];

const initialPlayers = [
  { name: 'M. Buljubašić', positions: ['MO', 'MDO'], ovr: 57, pot: 66 },
  { name: 'V. Simić', positions: ['SĞO', 'SLO'], ovr: 57, pot: 57 },
  { name: 'E. Keskin', positions: ['MO', 'MDO'], ovr: 57, pot: 63 },
  { name: 'B. Yavuz', positions: ['SĞB'], ovr: 57, pot: 74 },
  { name: 'H. Akman', positions: ['MO'], ovr: 57, pot: 73 },
  { name: 'C. Dumanlı', positions: ['ST'], ovr: 57, pot: 57 },
  { name: 'E. Bilsel', positions: ['SLB', 'SĞB', 'SĞO'], ovr: 57, pot: 69 },
  { name: 'A. Gerxhaliu', positions: ['STP'], ovr: 56, pot: 66 },
  { name: 'Y. Buz', positions: ['STP'], ovr: 56, pot: 73 },
  { name: 'O. Matur', positions: ['SLB'], ovr: 56, pot: 61 },
  { name: 'E. Bulut', positions: ['SLO'], ovr: 56, pot: 68 },
  { name: 'K. Ersunar', positions: ['KL'], ovr: 56, pot: 70 },
  { name: 'M. Özbaskıcı', positions: ['MOO', 'MO'], ovr: 55, pot: 74 },
  { name: 'K. Karayiğit', positions: ['SĞB'], ovr: 55, pot: 70 },
  { name: 'D. Ertaş', positions: ['KL'], ovr: 55, pot: 70 },
  { name: 'İ. Erdal', positions: ['STP'], ovr: 55, pot: 69 },
  { name: 'B. Bulut', positions: ['MO'], ovr: 55, pot: 66 },
  { name: 'H. Maldar', positions: ['SĞK'], ovr: 55, pot: 78 },
  { name: 'E. Uzun', positions: ['MO'], ovr: 54, pot: 71 },
  { name: 'İ. Çelik', positions: ['MOO', 'MO'], ovr: 54, pot: 68 },
  { name: 'D. Sarıcalı', positions: ['KL'], ovr: 54, pot: 68 },
  { name: 'A. Karapo', positions: ['STP', 'SĞB'], ovr: 54, pot: 64 },
  { name: 'M. Albayrak', positions: ['STP', 'SĞB'], ovr: 54, pot: 66 },
  { name: 'T. Aydın', positions: ['STP'], ovr: 54, pot: 69 },
  { name: 'E. Yiğit', positions: ['SĞK'], ovr: 54, pot: 72 },
  { name: 'E. Gökçe', positions: ['SĞB'], ovr: 54, pot: 63 },
  { name: 'T. Özmert', positions: ['SLK'], ovr: 53, pot: 73 },
  { name: 'M. Eser', positions: ['KL'], ovr: 53, pot: 66 },
  { name: 'B. Gezek', positions: ['MOO', 'MO'], ovr: 53, pot: 69 },
  { name: 'O. Aksoy', positions: ['SĞO'], ovr: 53, pot: 77 },
  { name: 'M. Doğru', positions: ['MDO'], ovr: 53, pot: 68 },
  { name: 'H. Bağcı', positions: ['KL'], ovr: 53, pot: 65 },
  { name: 'A. Aktaş', positions: ['SLB'], ovr: 53, pot: 67 },
  { name: 'U. Toy', positions: ['STP'], ovr: 53, pot: 68 },
  { name: 'A. Usluoğlu', positions: ['ST'], ovr: 53, pot: 71 },
  { name: 'B. İngenç', positions: ['MOO'], ovr: 52, pot: 71 },
  { name: 'H. Güreler', positions: ['STP'], ovr: 52, pot: 72 },
  { name: 'S. Alkaş', positions: ['ST'], ovr: 52, pot: 73 },
  { name: 'B. Ersoy', positions: ['STP'], ovr: 51, pot: 59 },
  { name: 'E. Özbek', positions: ['MOO'], ovr: 51, pot: 62 },
  { name: 'A. Daş', positions: ['KL'], ovr: 51, pot: 57 },
  { name: 'M. Kaya', positions: ['MOO'], ovr: 51, pot: 74 },
  { name: 'A. Müjde', positions: ['MO'], ovr: 51, pot: 65 },
  { name: 'B. Tetik', positions: ['KL'], ovr: 51, pot: 52 },
  { name: 'A. Üresin', positions: ['SĞB'], ovr: 50, pot: 58 },
  { name: 'M. Bayram', positions: ['KL'], ovr: 50, pot: 66 }
];

const formationNeeds = [
  'KL', 'STP', 'STP', 'SLB', 'SĞB', 'MDO', 'MDO', 'MOO', 'MOO', 'MOO', 'ST'
];

export default function App() {
  const [rosters, setRosters] = useState(Object.fromEntries(teams.map(team => [team, []])));
  const [currentPickIndex, setCurrentPickIndex] = useState(0);
  const [availablePlayers, setAvailablePlayers] = useState(initialPlayers);
  const [lastPickedPlayer, setLastPickedPlayer] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [baseOrder, setBaseOrder] = useState([...teams]);
  const [pickOrder, setPickOrder] = useState([...teams]);
  const [draftType, setDraftType] = useState('snake');

  const currentRound = Math.floor(currentPickIndex / pickOrder.length) + 1;
  const currentPickInRound = (currentPickIndex % pickOrder.length) + 1;
  const currentTeam = pickOrder[currentPickIndex % pickOrder.length];

  const handleNextPick = () => {
    if (availablePlayers.length === 0) return;
    const teamRoster = rosters[currentTeam];
    const neededIndex = teamRoster.length;
    const neededPosition = teamRoster.length === 0 ? null : formationNeeds[neededIndex] || null;

    const isMatch = (player, pos) => {
      if (!pos) return true;
      if (pos === 'SĞK' || pos === 'SLK') return player.positions.includes(pos) || player.positions.includes('MOO');
      return player.positions.includes(pos);
    };

    const scoredPlayers = availablePlayers.map(player => {
      const match = isMatch(player, neededPosition);
      const isGK = player.positions.includes('KL');
      const isST = player.positions.includes('ST');
      const baseScore = (player.ovr ** 2) * 0.18 + player.pot * 1.05;
      const bonus = isST ? 8 : isGK ? 1 : 0;
      const randomness = Math.random() * (player.ovr > 84 ? 2 : 10);
      const positionFactor = match ? 1 : 0.85;
      const score = (baseScore + bonus + randomness) * positionFactor;
      return { ...player, score };
    }).filter(p => p.match).sort((a, b) => b.score - a.score);

    const matches = scoredPlayers.length > 0 ? scoredPlayers : availablePlayers.map(player => {
      const isGK = player.positions.includes('KL');
      const isST = player.positions.includes('ST');
      const baseScore = player.ovr * 1.5 + player.pot * 1.2;
      const bonus = (isGK || isST) ? 15 : 0;
      const randomFactor = Math.random() * 10;
      const score = baseScore + bonus + randomFactor;
      return { ...player, score };
    }).sort((a, b) => b.score - a.score);

    const nextPlayer = matches[0];
    if (!nextPlayer) return;

    setRosters(prev => ({
      ...prev,
      [currentTeam]: [...prev[currentTeam], nextPlayer]
    }));
    setAvailablePlayers(prev => prev.filter(p => p.name !== nextPlayer.name));
    setCurrentPickIndex(prev => {
      const nextIndex = prev + 1;
      const totalTeams = baseOrder.length;
      const currentRound = Math.floor(prev / totalTeams);
      const nextRound = Math.floor(nextIndex / totalTeams);
      if (nextRound !== currentRound) {
        if (draftType === 'snake') {
          const isEven = nextRound % 2 === 0;
          setPickOrder(isEven ? [...baseOrder] : [...baseOrder].reverse());
        } else if (draftType === 'random') {
          const reshuffled = [...baseOrder].sort(() => Math.random() - 0.5);
          setPickOrder(reshuffled);
        } else if (draftType === 'fair') {
          const rotated = [...pickOrder.slice(1), pickOrder[0]];
          setPickOrder(rotated);
        }
      }
      return nextIndex;
    });
    setLastPickedPlayer({ ...nextPlayer, team: currentTeam });
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 4000);
  };

  return (
    <div className={`p-6 font-sans min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Süper Lig Draft Simulator</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-3 py-1 border rounded text-sm shadow hover:bg-gray-200 dark:hover:bg-gray-800"
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      <div className="mb-6 flex flex-col md:flex-row md:items-center gap-4 justify-between">
        <div className="flex gap-4 items-center">
          <button
            onClick={handleNextPick}
            className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
          >
            Next Pick
          </button>
          <span className="text-lg font-medium bg-black text-lime-400 px-2 py-1 rounded">
            <strong>{currentTeam}</strong> - Round {currentRound}, Pick {currentPickInRound}
          </span>
        </div>
        <select
          value={draftType}
          onChange={(e) => setDraftType(e.target.value)}
          className={`border px-2 py-1 rounded shadow text-sm ${darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
        >
          <option value="snake">Snake</option>
          <option value="random">Random Each Round</option>
          <option value="fair">Fairest</option>
        </select>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Draft Order</h2>
        <div className="flex flex-wrap justify-center gap-2">
          {pickOrder.map((team, index) => (
            <div
              key={team}
              className={`px-3 py-1 rounded-full text-sm border ${index === currentPickIndex % pickOrder.length ? 'bg-yellow-300 font-semibold' : darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}
            >
              {index + 1}. {team}
            </div>
          ))}
        </div>
      </div>

      {showPopup && lastPickedPlayer && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white text-center px-6 py-4 rounded-lg shadow-lg animate-bounceFade">
          <p className="font-bold text-xl">{lastPickedPlayer.team} selected {lastPickedPlayer.name}</p>
          <p className="text-sm mt-1">{lastPickedPlayer.positions.join(" / ")} ({lastPickedPlayer.ovr}/{lastPickedPlayer.pot})</p>
        </div>
      )}

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Available Players</h2>
        <div className="max-h-64 overflow-y-auto border rounded p-2">
          {availablePlayers.map((p, idx) => (
            <div key={idx} className={`border-b py-1 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <p className="font-medium text-sm">{p.name}</p>
              <p className="text-xs">{p.positions.join(" / ")} ({p.ovr}/{p.pot})</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-6 gap-4">
        {teams.map(team => (
          <div key={team} className={`border p-2 rounded shadow ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}>
            <h2 className="font-semibold text-lg mb-1">{team}</h2>
            <ul>
              {rosters[team].map((p, idx) => (
                <li key={idx}>{p.name} - {p.positions.join("/")} ({p.ovr}/{p.pot})</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <button
          onClick={() => {
            const shuffledTeams = [...teams].sort(() => Math.random() - 0.5);
            setBaseOrder(shuffledTeams);
            setRosters(Object.fromEntries(shuffledTeams.map(team => [team, []])));
            setAvailablePlayers(initialPlayers);
            setCurrentPickIndex(0);
            setLastPickedPlayer(null);
            teams.splice(0, teams.length, ...shuffledTeams);
            setPickOrder(shuffledTeams);
          }}
          className="bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700"
        >
          Reset Draft
        </button>
      </div>
    </div>
  );
}
