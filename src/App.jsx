import React, { useState, useRef } from 'react';

const teams = [
  "Alanyaspor", "Antalyaspor", "Sivasspor", "Samsunspor", "Eyüpspor", "Çaykur Rizespor", "Kayserispor",
  "Galatasaray", "Kasımpaşa", "Hatayspor", "Konyaspor", "Gaziantep",
  "Fenerbahçe", "Trabzonspor", "Göztepe", "Bodrumspor", "Başakşehir", "Beşiktaş"
];

const initialPlayers = [
  { name: 'V. Osimhen', positions: ['SNT'], ovr: 87, pot: 89 },
  { name: 'Morata', positions: ['ST', 'MOO'], ovr: 83, pot: 83 }
];

export default function App() {
  const [rosters, setRosters] = useState(Object.fromEntries([...teams].sort().map(team => [team, []])));
  return (
    <div className="p-6 font-sans min-h-screen bg-white text-black">
      <h1 className="text-3xl font-bold mb-4">Süper Lig Draft Simulator</h1>
      <div className="grid grid-cols-6 gap-4">
        {teams.map(team => (
          <div key={team} className="p-2 rounded border bg-gray-100">
            <div className="flex items-center gap-2 mb-1">
              <img src={`/logos/${team.replace(/ /g, '_')}.png`} alt={team} className="w-6 h-6 rounded-full" />
              <h2 className="font-semibold text-lg">{team}</h2>
            </div>
            <ul>
              {rosters[team].map((p, idx) => (
                <li key={idx}>{p.name}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
