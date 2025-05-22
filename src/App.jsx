MAY 22, 2025 live working version

import React, { useState, useRef } from 'react';

const teams = [
  "Alanyaspor", "Antalyaspor", "Sivasspor", "Samsunspor", "Eyüpspor", "Çaykur Rizespor", "Kayserispor",
  "Galatasaray", "Kasımpaşa", "Hatayspor", "Konyaspor", "Gaziantep",
  "Fenerbahçe", "Trabzonspor", "Göztepe", "Bodrumspor", "Başakşehir", "Beşiktaş"
];

const initialPlayers = [
  { name: 'V. Osimhen', positions: ['SNT'], ovr: 87, pot: 89 },
  { name: 'Morata', positions: ['ST', 'MOO'], ovr: 83, pot: 83 },
  { name: 'M. Erdilman', positions: ['MO', 'MDO'], ovr: 58, pot: 72 },
  { name: 'H. Osman', positions: ['SLK', 'SĞK', 'ST'], ovr: 58, pot: 67 },
  { name: 'Y. Kılıç', positions: ['SLK', 'SĞK'], ovr: 57, pot: 70 },
  { name: 'E. Karaağaç', positions: ['SLB'], ovr: 57, pot: 69 },
  { name: 'O. Demirbağ', positions: ['SLK', 'SĞK', 'ST'], ovr: 57, pot: 74 },
  { name: 'O. Kaynak', positions: ['SĞK', 'SLO'], ovr: 57, pot: 72 },
  { name: 'E. Gökçek', positions: ['SĞB'], ovr: 57, pot: 72 },
  { name: 'S. Temel', positions: ['MDO', 'MO'], ovr: 57, pot: 63 },
  { name: 'A. Saint-Maximin', positions: ['SLK', 'SLO'], ovr: 80, pot: 80 },
  { name: 'D. Livaković', positions: ['KL'], ovr: 80, pot: 81 },
  { name: 'S. Savić', positions: ['STP'], ovr: 80, pot: 80 },
  { name: 'F. Muslera', positions: ['KL'], ovr: 79, pot: 79 },
  { name: 'M. Lemina', positions: ['MDO', 'MO'], ovr: 79, pot: 79 },
  { name: 'A. Bardakcı', positions: ['STP', 'SLB'], ovr: 79, pot: 79 },
  { name: 'B. Yılmaz', positions: ['SĞO', 'SLO', 'SLB'], ovr: 79, pot: 84 },
  { name: 'Gabriel Sara', positions: ['MO', 'MOO', 'SĞO'], ovr: 79, pot: 84 },
  { name: 'Diego Carlos', positions: ['STP'], ovr: 79, pot: 79 },
  { name: 'S. Amrabat', positions: ['MDO', 'MO', 'STP'], ovr: 79, pot: 79 },
  { name: 'İ. Kahveci', positions: ['SĞK', 'MOO', 'MO'], ovr: 79, pot: 79 },
  { name: 'S. Szymański', positions: ['MOO', 'MO'], ovr: 79, pot: 82 },
  { name: 'João Mário', positions: ['SLO', 'SĞO', 'MO'], ovr: 79, pot: 79 },
  { name: 'Gedson Fernandes', positions: ['MO', 'MDO', 'MOO'], ovr: 79, pot: 82 },
  { name: 'E. Višća', positions: ['SĞO', 'SLO'], ovr: 79, pot: 79 },
  { name: 'U. Çakır', positions: ['KL'], ovr: 79, pot: 81 },
  { name: 'P. Frankowski', positions: ['SĞB', 'SĞO'], ovr: 78, pot: 78 },
  { name: 'A. Djiku', positions: ['STP', 'MDO'], ovr: 78, pot: 78 },
  { name: 'M. Günok', positions: ['KL'], ovr: 78, pot: 78 },

  
];

const formationNeeds = [
  'KL', 'STP', 'STP', 'SLB', 'SĞB', 'MDO', 'MDO', 'MOO', 'MOO', 'MOO', 'ST'
];

export default function App() {
  const [rosters, setRosters] = useState(Object.fromEntries([...teams].sort().map(team => [team, []])));
  const [currentPickIndex, setCurrentPickIndex] = useState(0);
  const [availablePlayers, setAvailablePlayers] = useState(initialPlayers);
  const [lastPickedPlayer, setLastPickedPlayer] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [baseOrder, setBaseOrder] = useState([...teams].sort());
  const [pickOrder, setPickOrder] = useState([...teams].sort());
  const [draftType, setDraftType] = useState('snake');
  const popupTimeoutRef = useRef(null);

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
      return { ...player, score, match };
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
    if (popupTimeoutRef.current) clearTimeout(popupTimeoutRef.current);
    popupTimeoutRef.current = setTimeout(() => setShowPopup(false), 8000);
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
              className={`px-3 py-1 rounded-full text-sm border ${index === currentPickIndex % pickOrder.length ? (darkMode ? 'bg-yellow-300 text-black font-semibold' : 'bg-yellow-300 font-semibold') : darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}
            >
              {index + 1}. {team}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Available Players</h2>
        <div className="max-h-64 overflow-y-auto border border-gray-400 rounded p-2 bg-gray-200 dark:bg-gray-700 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
          {availablePlayers.map((p, idx) => (
            <div key={idx} className={`p-2 rounded border border-gray-300 hover:shadow-md transition-shadow duration-200 ${darkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-100 text-black hover:bg-gray-200'}`}>
              <p className="font-medium text-sm">{p.name}</p>
              <div className="flex flex-wrap items-center gap-1 mt-1">
                {p.positions.map((pos, posIdx) => (
                  <span key={pos} className={`inline-block px-1.5 py-0.5 rounded ${(() => {
  if (pos === 'KL') return 'text-[10px] font-bold bg-orange-500 text-white';
  if (['SLB','STP','SĞB'].includes(pos)) return 'text-[10px] font-bold bg-yellow-300 text-black';
  if (['MOO','MO','MDO'].includes(pos)) return 'text-[10px] font-bold bg-green-600 text-white';
  return posIdx === 0 ? 'text-[10px] font-bold bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-white' : 'text-[9px] font-normal bg-gray-200 text-gray-600 dark:bg-gray-600 dark:text-gray-100';
})()}`}>
                    {pos}
                  </span>
                ))}
                <span className={`ml-auto text-[10px] font-bold px-1 py-0.5 rounded ${p.ovr >= 85 ? 'bg-green-300 text-green-900' : p.ovr >= 75 ? 'bg-yellow-400 text-black' : 'bg-red-200 text-red-800'} dark:${p.ovr >= 85 ? 'bg-green-700 text-white' : p.ovr >= 75 ? 'bg-yellow-600 text-white' : 'bg-red-800 text-white'}`}>
                  {p.ovr}/{p.pot}
                </span>
              </div>
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

      <div className="grid grid-cols-6 gap-4">
        {teams.map(team => (
          <div key={team} className={`p-2 rounded border border-gray-300 hover:shadow-md transition-shadow duration-200 ${darkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-100 text-black hover:bg-gray-200'}`}>
            <h2 className="font-semibold text-lg mb-1">{team}</h2>
            <ul>
              {rosters[team].map((p, idx) => (
                <li key={idx} className="text-sm mb-1">
                <span className="mr-1 text-gray-500 dark:text-gray-400">{idx + 1}.</span>
                <span className="font-medium">{p.name}</span> -
                {p.positions.map((pos, posIdx) => (
                  <span key={pos} className={`inline-block px-1 py-0.5 rounded ml-1 ${posIdx === 0 ? 'text-[10px] font-semibold bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-white' : 'text-[9px] font-normal bg-gray-200 text-gray-600 dark:bg-gray-600 dark:text-gray-100'}`}>
                    {pos}
                  </span>
                ))}
                <span className={`ml-2 text-[10px] font-bold px-1 py-0.5 rounded ${p.ovr >= 85 ? 'bg-green-300 text-green-900' : p.ovr >= 75 ? 'bg-yellow-300 text-black' : 'bg-red-200 text-red-800'} dark:${p.ovr >= 85 ? 'bg-green-700 text-white' : p.ovr >= 75 ? 'bg-yellow-800 text-white' : 'bg-red-800 text-white'}`}>{p.ovr}/{p.pot}</span>
              </li>
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
