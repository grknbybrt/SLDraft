import React, { useState, useRef } from 'react';

const teams = [
  "Alanyaspor", "Antalyaspor", "Sivasspor", "Samsunspor", "Eyüpspor", "Çaykur Rizespor", "Kayserispor",
  "Galatasaray", "Kasımpaşa", "Hatayspor", "Konyaspor", "Gaziantep",
  "Fenerbahçe", "Trabzonspor", "Göztepe", "Bodrumspor", "Başakşehir", "Beşiktaş"
];

const initialPlayers = [
  { name: 'V. Osimhen', positions: ['ST'], ovr: 87, pot: 89 },
  { name: 'Morata', positions: ['ST', 'MOO'], ovr: 83, pot: 83 },
  { name: 'M. Icardi', positions: ['ST'], ovr: 83, pot: 83 },
  { name: 'L. Torreira', positions: ['MDO', 'MO'], ovr: 83, pot: 83 },
  { name: 'Y. En-Nesyri', positions: ['ST'], ovr: 83, pot: 84 },
  { name: 'Rafa', positions: ['MOO', 'ST'], ovr: 83, pot: 83 },
  { name: 'D. Sánchez', positions: ['STP'], ovr: 82, pot: 82 },
  { name: 'E. Džeko', positions: ['ST'], ovr: 82, pot: 82 },
  { name: 'D. Tadić', positions: ['MOO', 'SLK', 'SĞK'], ovr: 82, pot: 82 },
  { name: 'Anderson Talisca', positions: ['MOO', 'ST', 'SĞK'], ovr: 82, pot: 82 },
  { name: 'C. Immobile', positions: ['ST'], ovr: 82, pot: 82 },
  { name: 'F. Kostić', positions: ['SLO', 'SLB'], ovr: 81, pot: 81 },
  { name: 'Fred', positions: ['MO', 'MDO'], ovr: 81, pot: 81 },
  { name: 'M. Škriniar', positions: ['STP'], ovr: 81, pot: 81 },
  { name: 'S. Banza', positions: ['ST'], ovr: 81, pot: 81 },
  { name: 'D. Mertens', positions: ['MOO', 'ST'], ovr: 80, pot: 80 },
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
  { name: 'Gabriel Paulista', positions: ['STP'], ovr: 78, pot: 78 },
  { name: 'O. Zubkov', positions: ['SĞO', 'MOO', 'SLO'], ovr: 78, pot: 78 },
  { name: 'R. Sallai', positions: ['SĞO', 'ST', 'MOO'], ovr: 77, pot: 77 },
  { name: 'Ç. Söyüncü', positions: ['STP'], ovr: 77, pot: 78 },
  { name: 'Rodrigo Becão', positions: ['STP'], ovr: 77, pot: 78 },
  { name: 'İ. Yüksek', positions: ['MDO', 'MO'], ovr: 77, pot: 81 },
  { name: 'A. Barák', positions: ['MO', 'MOO'], ovr: 77, pot: 77 },
  { name: 'Y. Akgün', positions: ['SĞO', 'MOO', 'SLO'], ovr: 76, pot: 82 },
  { name: 'B. Osayi-Samuel', positions: ['SĞB', 'SĞO'], ovr: 76, pot: 77 },
  { name: 'J. Oosterwolde', positions: ['SLB', 'STP'], ovr: 76, pot: 83 },
  { name: 'J. Svensson', positions: ['SĞB'], ovr: 76, pot: 76 },
  { name: 'A. Oxlade-Chamberlain', positions: ['MO', 'MOO'], ovr: 76, pot: 76 },
  { name: 'M. Rashica', positions: ['SĞO', 'SLO'], ovr: 76, pot: 76 },
  { name: 'F. Uduokhai', positions: ['STP'], ovr: 76, pot: 79 },
  { name: 'O. Yokuşlu', positions: ['MDO', 'MO'], ovr: 76, pot: 76 },
  { name: 'A. Nwakaeme', positions: ['SLO', 'ST'], ovr: 76, pot: 76 },
  { name: 'K. Piątek', positions: ['ST'], ovr: 76, pot: 76 },
  { name: 'V. Aboubakar', positions: ['ST'], ovr: 76, pot: 76 },
  { name: 'Guilherme Sityá', positions: ['SLB', 'SLO'], ovr: 76, pot: 76 },
  { name: 'R. Ghezzal', positions: ['SĞK', 'SĞO'], ovr: 76, pot: 76 },
  { name: 'R. Manaj', positions: ['ST'], ovr: 76, pot: 76 },
  { name: 'J. Brekalo', positions: ['SLO', 'SLK', 'MOO'], ovr: 76, pot: 77 },
  { name: 'K. Ayhan', positions: ['SĞB', 'STP', 'MDO'], ovr: 75, pot: 75 },
  { name: 'K. Demirbay', positions: ['MDO', 'MO', 'MOO'], ovr: 75, pot: 75 },
  { name: 'O. Aydın', positions: ['SLK', 'SĞK', 'SĞO'], ovr: 75, pot: 80 },
  { name: 'E. Muçi', positions: ['MOO', 'SLK'], ovr: 75, pot: 82 },
  { name: 'B. Mendy', positions: ['MDO', 'STP'], ovr: 75, pot: 80 },
  { name: 'Y. Sarı', positions: ['SĞO', 'SĞK'], ovr: 75, pot: 76 },
  { name: 'Rômulo', positions: ['ST', 'SLK'], ovr: 75, pot: 81 },
  { name: 'A. Maxim', positions: ['MOO', 'MO', 'SLO'], ovr: 75, pot: 75 },
  { name: 'Kévin Rodrigues', positions: ['SLB'], ovr: 75, pot: 75 },
  { name: 'H. Hajradinović', positions: ['MO', 'MOO'], ovr: 75, pot: 75 },
  { name: 'E. Bardhi', positions: ['MOO', 'MO', 'SLO'], ovr: 75, pot: 75 },
  { name: 'I. Jakobs', positions: ['SLB', 'SLO'], ovr: 74, pot: 78 },
  { name: 'M. Müldür', positions: ['SĞB', 'SLB', 'STP'], ovr: 74, pot: 77 },
  { name: 'A. Masuaku', positions: ['SLB'], ovr: 74, pot: 74 },
  { name: 'J. Lundstram', positions: ['MDO', 'MO', 'STP'], ovr: 74, pot: 74 },
  { name: 'M. Cham', positions: ['MOO', 'SĞK'], ovr: 74, pot: 80 },
  { name: 'Pedro Malheiro', positions: ['SĞB'], ovr: 74, pot: 81 },
  { name: 'Léo Duarte', positions: ['STP', 'SĞB'], ovr: 74, pot: 76 },
  { name: 'C. Operi', positions: ['SLB', 'SLO'], ovr: 74, pot: 74 },
  { name: 'R. Bazoer', positions: ['STP', 'MDO'], ovr: 74, pot: 75 },
  { name: 'T. Stepanenko', positions: ['MDO', 'MO'], ovr: 74, pot: 74 },
  { name: 'M. Thiam', positions: ['ST', 'SLO'], ovr: 74, pot: 74 },
  { name: 'B. Özer', positions: ['KL'], ovr: 74, pot: 81 },
  { name: 'G. Güvenç', positions: ['KL'], ovr: 73, pot: 73 },
  { name: 'E. Elmalı', positions: ['SLB'], ovr: 73, pot: 78 },
  { name: 'E. Kristensen', positions: ['SĞB', 'SLB'], ovr: 73, pot: 81 },
  { name: 'C. Tosun', positions: ['ST', 'SLK'], ovr: 73, pot: 73 },
  { name: 'İ. Eğribayat', positions: ['KL'], ovr: 73, pot: 77 },
  { name: 'A. Hadžiahmetović', positions: ['MDO', 'MO'], ovr: 73, pot: 73 },
  { name: 'E. Destanoğlu', positions: ['KL'], ovr: 73, pot: 78 },
  { name: 'O. Tufan', positions: ['MDO', 'MOO', 'ST'], ovr: 73, pot: 73 },
  { name: 'D. Sikan', positions: ['ST', 'SLO'], ovr: 73, pot: 80 },
  { name: 'F. Tait', positions: ['MDO', 'MO', 'MOO'], ovr: 73, pot: 73 },
  { name: 'O. Ntcham', positions: ['MO', 'MDO', 'MOO'], ovr: 73, pot: 73 },
  { name: 'O. Kocuk', positions: ['KL'], ovr: 73, pot: 73 },
  { name: 'R. van Drongelen', positions: ['STP', 'SLB'], ovr: 73, pot: 77 },
  { name: 'D. Türüç', positions: ['SĞO', 'MO'], ovr: 73, pot: 73 },
  { name: 'O. Ba', positions: ['STP', 'SLB'], ovr: 73, pot: 74 },
  { name: 'M. Lis', positions: ['KL'], ovr: 73, pot: 76 },
  { name: 'C. Højer', positions: ['SLB'], ovr: 73, pot: 73 },
  { name: 'I. Grbić', positions: ['KL'], ovr: 73, pot: 73 },
  { name: 'T. Ciğerci', positions: ['MDO'], ovr: 73, pot: 73 },
  { name: 'B. Ndiaye', positions: ['MO', 'MDO'], ovr: 73, pot: 73 },
  { name: 'D. Okereke', positions: ['ST', 'SĞK', 'SLK'], ovr: 73, pot: 74 },
  { name: 'Nuno da Costa', positions: ['ST'], ovr: 73, pot: 73 },
  { name: 'K. Piątkowski', positions: ['STP'], ovr: 73, pot: 77 },
  { name: 'T. Vilhena', positions: ['MO', 'MDO'], ovr: 73, pot: 73 },
  { name: 'L. Dubois', positions: ['SĞB', 'SLB'], ovr: 73, pot: 73 },
  { name: 'E. Akbaba', positions: ['MOO', 'MO'], ovr: 73, pot: 73 },
  { name: 'C. Cuesta', positions: ['STP'], ovr: 72, pot: 76 },
  { name: 'B. Kutlu', positions: ['MO', 'MDO', 'SLB'], ovr: 72, pot: 73 },
  { name: 'S. Uçan', positions: ['MO', 'MDO', 'MOO'], ovr: 72, pot: 72 },
  { name: 'S. Saatçı', positions: ['STP'], ovr: 72, pot: 79 },
  { name: 'S. Larsson', positions: ['SLO', 'MOO', 'ST'], ovr: 72, pot: 72 },
  { name: 'C. Holse', positions: ['MOO', 'SĞO', 'MO'], ovr: 72, pot: 76 },
  { name: 'M. Mouandilmadji', positions: ['ST'], ovr: 72, pot: 73 },
  { name: 'S. Gürler', positions: ['SLO', 'SĞO'], ovr: 72, pot: 72 },
  { name: 'O. Kemen', positions: ['MO', 'MOO', 'MDO'], ovr: 72, pot: 72 },
  { name: 'B. Özdemir', positions: ['MO', 'MDO'], ovr: 72, pot: 74 },
  { name: 'Miguel Crespo', positions: ['MO', 'MDO'], ovr: 72, pot: 72 },
  { name: 'A. Sowe', positions: ['ST'], ovr: 72, pot: 72 },
  { name: 'A. Ömür', positions: ['MOO', 'SĞK', 'MO'], ovr: 72, pot: 75 },
  { name: 'B. Özcan', positions: ['MO', 'MDO', 'ST'], ovr: 72, pot: 73 },
  { name: 'E. Boateng', positions: ['ST', 'SLK'], ovr: 72, pot: 72 },
  { name: 'Bruno Viana', positions: ['STP'], ovr: 72, pot: 72 },
  { name: 'A. Gianniotis', positions: ['KL'], ovr: 72, pot: 72 },
  { name: 'Cláudio Winck', positions: ['SĞB'], ovr: 72, pot: 72 },
  { name: 'Hwang Ui Jo', positions: ['ST'], ovr: 72, pot: 72 },
  { name: 'E. Karaca', positions: ['MOO', 'SĞO', 'ST'], ovr: 72, pot: 72 },
  { name: 'G. Makouta', positions: ['MDO', 'MO', 'MOO'], ovr: 72, pot: 74 },
  { name: 'F. Midtsjø', positions: ['MO', 'MDO'], ovr: 72, pot: 72 },
  { name: 'C. Hérelle', positions: ['STP'], ovr: 72, pot: 72 },
  { name: 'M. Yandaş', positions: ['MO', 'MOO'], ovr: 71, pot: 71 },
  { name: 'L. Mercan', positions: ['SLB', 'MO', 'STP'], ovr: 71, pot: 75 },
  { name: 'E. Topçu', positions: ['STP'], ovr: 71, pot: 78 },
  { name: 'S. Kılıçsoy', positions: ['SLK', 'ST', 'SLO'], ovr: 71, pot: 83 },
  { name: 'D. Drăguș', positions: ['ST', 'SLO'], ovr: 71, pot: 76 },
  { name: 'A. Townsend', positions: ['MOO', 'SĞO'], ovr: 71, pot: 71 },
  { name: 'E. Kılınç', positions: ['SLO', 'SĞO', 'SLK'], ovr: 71, pot: 71 },
  { name: 'M. Bola', positions: ['SLB', 'SLO', 'STP'], ovr: 71, pot: 72 },
  { name: 'A. Muja', positions: ['SĞO', 'SLO', 'SĞK'], ovr: 71, pot: 72 },
  { name: 'Lucas Lima', positions: ['SLB'], ovr: 71, pot: 71 },
  { name: 'J. Opoku', positions: ['STP'], ovr: 71, pot: 76 },
  { name: 'Carlos Mané', positions: ['SLO', 'SĞK', 'SĞO'], ovr: 71, pot: 71 },
  { name: 'D. Aleksić', positions: ['MO', 'MOO'], ovr: 71, pot: 71 },
  { name: 'V. Jurečka', positions: ['ST'], ovr: 71, pot: 71 },
  { name: 'Garry Rodrigues', positions: ['SLO', 'SĞO'], ovr: 71, pot: 71 },
  { name: 'S. Moutoussamy', positions: ['MO', 'MDO'], ovr: 71, pot: 71 },
  { name: 'K. Kodro', positions: ['ST'], ovr: 71, pot: 71 },
  { name: 'D. Sorescu', positions: ['SĞO', 'SĞB'], ovr: 71, pot: 71 },
  { name: 'A. Kara', positions: ['MO', 'MDO'], ovr: 71, pot: 71 },
  { name: 'M. Fall', positions: ['ST', 'SĞO'], ovr: 71, pot: 71 },
  { name: 'A. Šporar', positions: ['ST'], ovr: 71, pot: 71 },
  { name: 'J. Balkovec', positions: ['SLB', 'STP'], ovr: 71, pot: 71 },
  { name: 'D. Toköz', positions: ['MO', 'MDO', 'SĞB'], ovr: 71, pot: 71 },
  { name: 'E. Mor', positions: ['SĞO', 'SLO', 'MOO'], ovr: 71, pot: 71 },
  { name: 'H. Akbunar', positions: ['SĞO', 'SLO'], ovr: 71, pot: 71 },
  { name: 'O. Čelůstka', positions: ['STP', 'SĞB'], ovr: 71, pot: 71 },
  { name: 'Diogo Sousa', positions: ['KL'], ovr: 71, pot: 76 },
  { name: 'A. Kutucu', positions: ['SLO', 'ST'], ovr: 70, pot: 73 },
  { name: 'O. Bulut', positions: ['SĞB', 'SĞO'], ovr: 70, pot: 70 },
  { name: 'G. Vural', positions: ['SLB', 'SLO'], ovr: 70, pot: 70 },
  { name: 'M. Djenepo', positions: ['SLO', 'SĞO'], ovr: 70, pot: 71 },
  { name: 'B. Samudio', positions: ['SLO', 'SĞO', 'ST'], ovr: 70, pot: 70 },
  { name: 'R. Safuri', positions: ['MOO', 'MO'], ovr: 70, pot: 70 },
  { name: 'S. Aydoğdu', positions: ['MO', 'MDO', 'MOO'], ovr: 70, pot: 70 },
  { name: 'Y. Aït Bennasser', positions: ['MDO', 'MO', 'STP'], ovr: 70, pot: 70 },
  { name: 'L. Dimata', positions: ['ST', 'SLO', 'MOO'], ovr: 70, pot: 71 },
  { name: 'K. Schindler', positions: ['SĞO', 'SĞB', 'SĞK'], ovr: 70, pot: 70 },
  { name: 'V. Babacan', positions: ['KL'], ovr: 70, pot: 70 },
  { name: 'A. Gravillon', positions: ['STP', 'SĞB'], ovr: 70, pot: 72 },
  { name: 'Miguel Cardoso', positions: ['SLO', 'MOO', 'MO'], ovr: 70, pot: 70 },
  { name: 'B. Bayazıt', positions: ['KL'], ovr: 70, pot: 75 },
  { name: 'K. Günter', positions: ['STP'], ovr: 70, pot: 70 },
  { name: 'D. Tijanić', positions: ['MOO', 'MO'], ovr: 70, pot: 71 },
  { name: 'C. Strandberg', positions: ['ST', 'SĞO', 'SLO'], ovr: 70, pot: 70 },
  { name: 'Y. Erdoğan', positions: ['SLO', 'SĞO', 'SLB'], ovr: 70, pot: 70 },
  { name: 'U. Nayir', positions: ['ST'], ovr: 70, pot: 70 },
  { name: 'S. Akaydin', positions: ['STP'], ovr: 70, pot: 70 },
  { name: 'E. Bekiroğlu', positions: ['MOO', 'MO'], ovr: 70, pot: 70 },
  { name: 'S. Bolat', positions: ['KL'], ovr: 70, pot: 70 },
  { name: 'C. Erkin', positions: ['SLB'], ovr: 70, pot: 70 },
  { name: 'Rúben Vezo', positions: ['STP'], ovr: 70, pot: 70 },
  { name: 'Fredy', positions: ['MO', 'MOO', 'MDO'], ovr: 70, pot: 70 },
  { name: 'A. Ajeti', positions: ['STP'], ovr: 70, pot: 70 },
  { name: 'T. Antalyalı', positions: ['MO', 'MDO'], ovr: 70, pot: 70 },
  { name: 'G. Akkan', positions: ['KL'], ovr: 70, pot: 71 },
  { name: 'B. Zainutdinov', positions: ['SLO', 'SLB', 'STP'], ovr: 69, pot: 69 },
  { name: 'B. Balcı', positions: ['SĞB', 'SĞO'], ovr: 69, pot: 74 },
  { name: 'Ľ. Šatka', positions: ['STP'], ovr: 69, pot: 69 },
  { name: 'Z. Yavru', positions: ['SĞB', 'STP'], ovr: 69, pot: 69 },
  { name: 'João Figueiredo', positions: ['ST', 'SLO'], ovr: 69, pot: 69 },
  { name: 'M. Şengezer', positions: ['KL'], ovr: 69, pot: 72 },
  { name: 'Matchoi Djaló', positions: ['SĞK', 'SLK', 'MOO'], ovr: 69, pot: 81 },
  { name: 'F. Ebosele', positions: ['SĞO', 'SĞB', 'SLO'], ovr: 69, pot: 77 },
  { name: 'N. Alioui', positions: ['SLK', 'ST', 'SLO'], ovr: 69, pot: 70 },
  { name: 'M. Bourabia', positions: ['MO', 'MDO'], ovr: 69, pot: 69 },
  { name: 'K. Yılmaz', positions: ['MDO', 'MO'], ovr: 69, pot: 74 },
  { name: 'B. Boutobba', positions: ['SĞO', 'SĞK', 'ST'], ovr: 69, pot: 70 },
  { name: 'G. Sağlam', positions: ['MDO', 'MO', 'MOO'], ovr: 69, pot: 72 },
  { name: 'F. Bamgboye', positions: ['SĞO', 'SĞK', 'SLO'], ovr: 69, pot: 70 },
  { name: 'H. Keyta', positions: ['SLK', 'ST', 'MOO'], ovr: 69, pot: 69 },
  { name: 'M. Jevtović', positions: ['MDO', 'MO'], ovr: 69, pot: 69 },
  { name: 'L. Prip', positions: ['SĞK', 'SĞO'], ovr: 69, pot: 69 },
  { name: 'U. Radaković', positions: ['STP'], ovr: 69, pot: 69 },
  { name: 'A. Vural', positions: ['KL'], ovr: 69, pot: 69 },
  { name: 'S. Dioudis', positions: ['KL'], ovr: 69, pot: 69 },
  { name: 'K. Kozłowski', positions: ['SLO', 'MOO'], ovr: 69, pot: 79 },
  { name: 'M. Ben Ouanes', positions: ['SLB', 'SĞO', 'SLO'], ovr: 69, pot: 69 },
  { name: 'P. Ampem', positions: ['SLK', 'SLO'], ovr: 69, pot: 69 },
  { name: 'U. Bozok', positions: ['ST'], ovr: 69, pot: 69 },
  { name: 'Y. Kayan', positions: ['MO', 'MDO', 'MOO'], ovr: 69, pot: 72 },
  { name: 'J. Okita', positions: ['SLK', 'ST', 'SLO'], ovr: 69, pot: 69 },
  
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

  const getTeamPositionCounts = (roster) => {
    const count = {};
    roster.forEach(p => {
      p.positions.forEach(pos => {
        if (!count[pos]) count[pos] = 0;
        count[pos]++;
      });
    });
    return count;
  };

  const getFirst11 = (roster) => roster.slice(0, 11);

  const handleNextPick = () => {
    if (availablePlayers.length === 0) return;
    const teamRoster = rosters[currentTeam];
    const first11 = getFirst11(teamRoster);
    const neededIndex = teamRoster.length;
    const neededPosition = formationNeeds[neededIndex] || null;

    const positionCounts = getTeamPositionCounts(first11);
    const alreadyHasGK = positionCounts['KL'] > 0;
    const alreadyHasST = positionCounts['ST'] > 0;

    const isMatch = (player, pos) => {
      if (!pos) return true;
      if (pos === 'MOO') return player.positions.includes('MOO') || ['SLK', 'SĞK', 'SLO', 'SĞO'].some(p => player.positions.includes(p));
      if (['SLK', 'SĞK', 'SLO', 'SĞO'].includes(pos)) return player.positions.includes(pos);
      if (pos === 'MDO') return player.positions.includes('MDO') || player.positions.includes('MO');
      if (pos === 'MO') return player.positions.includes('MO') || player.positions.includes('MDO');
      return player.positions.includes(pos);
    };

    const gkUrgencyBoost = (!alreadyHasGK && currentRound >= 3 && currentRound <= 8)
      ? (currentRound - 2) * 1.5
      : 0;

    const scoredPlayers = availablePlayers.map(player => {
      const isGK = player.positions.includes('KL');
      const isST = player.positions.includes('ST');
      const isMatchPosition = isMatch(player, neededPosition);

      const baseScore = player.ovr * 2.0 + player.pot * 1.2;

      const gkWeight = (5 + Math.random() * 3 + (isGK ? gkUrgencyBoost : 0)) * (!alreadyHasGK ? 1.2 : 0.6);
      const stWeight = (7 + Math.random() * 3) * (!alreadyHasST ? 1 : 0.6);

      const positionBonus = isGK ? gkWeight : isST ? stWeight : 0;
      const matchMultiplier = isMatchPosition ? 1.0 : 0.98; // reduced impact

      const duplicatePenalty = (isGK && alreadyHasGK) || (isST && alreadyHasST) ? -20 : 0;

      const redundancyPenalty = (teamRoster.length < 11 && teamRoster.some(p => p.positions.includes('ST')) && isST) ? -10 : 0;

      return {
        ...player,
        score: (baseScore + positionBonus + duplicatePenalty + redundancyPenalty) * matchMultiplier,
      };
    }).sort((a, b) => b.score - a.score);

    const nextPlayer = scoredPlayers[0];
    if (!nextPlayer) return;

    setRosters(prev => ({
      ...prev,
      [currentTeam]: [...prev[currentTeam], nextPlayer],
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
          <span className="text-lg font-medium bg-red-600 text-white px-2 py-1 rounded">
            <strong>{currentTeam}</strong> - Round {currentRound}, Pick {currentPickInRound}
          </span>
        </div>
        <select
          value={draftType}
          onChange={(e) => setDraftType(e.target.value)}
          className={`border px-2 py-1 rounded shadow text-sm ${darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
        >
          <option value="snake">Snake</option>
          <option value="random">Random</option>
          <option value="fair">Fairest</option>
        </select>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Draft Order</h2>
        <div className="flex flex-wrap justify-center gap-2">
          {pickOrder.map((team, index) => (
            <div
              key={team}
              className={`px-3 py-1 rounded-full text-sm border ${index === currentPickIndex % pickOrder.length ? 'bg-red-600 text-white font-semibold' : darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}
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
                    <span key={pos} className={`inline-block px-1 py-0.5 rounded ml-1 ${(() => {
                      if (pos === 'KL') return 'text-[10px] font-bold bg-orange-500 text-white';
                      if (['SLB','STP','SĞB'].includes(pos)) return 'text-[10px] font-bold bg-yellow-300 text-black';
                      if (['MOO','MO','MDO','SLO','SĞO'].includes(pos)) return 'text-[10px] font-bold bg-green-600 text-white';
                      return 'text-[10px] font-bold bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-white';
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
      <h2 className={`font-semibold text-lg mb-1 px-2 py-1 rounded ${
  darkMode ? 'bg-white text-gray-800' : 'bg-gray-800 text-white'
}`}>{team}</h2>
      <ul>
        {rosters[team].map((p, idx) => (
          <li key={idx} className="text-sm mb-1">
            <span className="mr-1 text-gray-500 dark:text-gray-400">{idx + 1}.</span>
            <span className="font-medium">{p.name}</span> -
            {p.positions.map((pos) => (
              <span key={pos} className={`inline-block px-1 py-0.5 rounded ml-1 ${(() => {
                if (pos === 'KL') return 'text-[10px] font-bold bg-orange-500 text-white';
                if (['SLB','STP','SĞB'].includes(pos)) return 'text-[10px] font-bold bg-yellow-300 text-black';
                if (['MOO','MO','MDO','SLO','SĞO'].includes(pos)) return 'text-[10px] font-bold bg-green-600 text-white';
                return 'text-[10px] font-bold bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-white';
              })()}`}>
                {pos}
              </span>
            ))}
            <span className={`ml-2 text-[10px] font-bold px-1 py-0.5 rounded ${p.ovr >= 85 ? 'bg-green-300 text-green-900' : p.ovr >= 75 ? 'bg-yellow-400 text-black' : 'bg-red-200 text-red-800'} dark:${p.ovr >= 85 ? 'bg-green-700 text-white' : p.ovr >= 75 ? 'bg-yellow-600 text-white' : 'bg-red-800 text-white'}`}>{p.ovr}/{p.pot}</span>
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
