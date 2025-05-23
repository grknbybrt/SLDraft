import React, { useState, useRef, useEffect } from 'react';

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
  { name: 'G. Bayrakdar', positions: ['SĞO', 'ST', 'SĞK'], ovr: 69, pot: 75 },
  { name: 'N. Uysal', positions: ['STP', 'MDO', 'SĞB'], ovr: 68, pot: 68 },
  { name: 'T. Sanuç', positions: ['STP'], ovr: 68, pot: 72 },
  { name: 'A. Batagov', positions: ['STP'], ovr: 68, pot: 79 },
  { name: 'S. van de Streek', positions: ['MOO', 'MO', 'SĞO'], ovr: 68, pot: 68 },
  { name: 'E. Rakip', positions: ['MDO', 'MO'], ovr: 68, pot: 68 },
  { name: 'Ö. Şahiner', positions: ['SĞB', 'SĞO', 'MO'], ovr: 68, pot: 68 },
  { name: 'P. Szysz', positions: ['SĞO', 'ST', 'SLO'], ovr: 68, pot: 68 },
  { name: 'U. Güneş', positions: ['MO', 'MDO'], ovr: 68, pot: 73 },
  { name: 'L. Carole', positions: ['SLB'], ovr: 68, pot: 68 },
  { name: 'S. Bahoken', positions: ['ST'], ovr: 68, pot: 68 },
  { name: 'J. Jeanvier', positions: ['STP'], ovr: 68, pot: 68 },
  { name: 'M. Hosseini', positions: ['STP'], ovr: 68, pot: 70 },
  { name: 'Juan', positions: ['ST', 'MOO'], ovr: 68, pot: 77 },
  { name: 'L. Nielsen', positions: ['STP', 'SĞB', 'SĞO'], ovr: 68, pot: 68 },
  { name: 'M. Bokele', positions: ['STP', 'SĞB'], ovr: 68, pot: 75 },
  { name: 'B. Akintola', positions: ['SĞO', 'SLO', 'SĞK'], ovr: 68, pot: 68 },
  { name: 'I. Olawoyin', positions: ['MOO', 'MO', 'MDO'], ovr: 68, pot: 69 },
  { name: 'A. Pritchard', positions: ['MOO', 'MO'], ovr: 68, pot: 68 },
  { name: 'Q. Menig', positions: ['SLK', 'SLO', 'SĞK'], ovr: 68, pot: 68 },
  { name: 'U. Çiftçi', positions: ['SLB'], ovr: 68, pot: 68 },
  { name: 'C. Charisis', positions: ['MO', 'MDO'], ovr: 68, pot: 68 },
  { name: 'A. Poungouras', positions: ['STP'], ovr: 68, pot: 68 },
  { name: 'F. Soyalp', positions: ['MO', 'MDO', 'MOO'], ovr: 68, pot: 68 },
  { name: 'A. Kızıldağ', positions: ['STP', 'SĞB'], ovr: 68, pot: 72 },
  { name: 'S. Güler', positions: ['STP'], ovr: 68, pot: 68 },
  { name: 'C. Keleş', positions: ['SĞO', 'SLO'], ovr: 68, pot: 73 },
  { name: 'E. Taşkıran', positions: ['KL'], ovr: 68, pot: 68 },
  { name: 'F. Hadergjonaj', positions: ['SĞB'], ovr: 68, pot: 68 },
  { name: 'N. Janvier', positions: ['MO'], ovr: 68, pot: 71 },
  { name: 'Richard', positions: ['MDO', 'MO'], ovr: 68, pot: 68 },
  { name: 'F. Aksoy', positions: ['STP', 'MDO', 'SĞB'], ovr: 68, pot: 71 },
  { name: 'M. Kabasakal', positions: ['MDO', 'MO', 'SĞB'], ovr: 68, pot: 68 },
  { name: 'G. Pușcaș', positions: ['ST', 'SLK'], ovr: 68, pot: 68 },
  { name: 'Y. Demir', positions: ['SĞO', 'MOO', 'SĞK'], ovr: 67, pot: 75 },
  { name: 'E. Aydın', positions: ['MDO', 'MO'], ovr: 67, pot: 80 },
  { name: 'H. Türkmen', positions: ['STP', 'SĞB'], ovr: 67, pot: 70 },
  { name: 'M. Eskihellaç', positions: ['SLB', 'SĞB', 'SĞO'], ovr: 67, pot: 67 },
  { name: 'E. Destan', positions: ['ST'], ovr: 67, pot: 76 },
  { name: 'T. Jabol-Folcarelli', positions: ['MO', 'MDO'], ovr: 67, pot: 72 },
  { name: 'O. Petrusenko', positions: ['MDO', 'STP', 'MO'], ovr: 67, pot: 69 },
  { name: 'V. Sarı', positions: ['STP'], ovr: 67, pot: 67 },
  { name: 'A. Gaich', positions: ['ST'], ovr: 67, pot: 70 },
  { name: 'S. Dikmen', positions: ['MO', 'MDO'], ovr: 67, pot: 67 },
  { name: 'I. Brnić', positions: ['SĞO', 'SLO'], ovr: 67, pot: 74 },
  { name: 'O. Ergün', positions: ['MDO', 'MO'], ovr: 67, pot: 67 },
  { name: 'D. Nazon', positions: ['ST'], ovr: 67, pot: 67 },
  { name: 'Héliton', positions: ['STP'], ovr: 67, pot: 67 },
  { name: 'A. Dennis', positions: ['MDO', 'MO'], ovr: 67, pot: 75 },
  { name: 'O. Bayrak', positions: ['SĞB', 'SĞO'], ovr: 67, pot: 70 },
  { name: 'Victor Hugo', positions: ['MO', 'MOO', 'MDO'], ovr: 67, pot: 77 },
  { name: 'İ. Köybaşı', positions: ['SLB', 'SLO'], ovr: 67, pot: 67 },
  { name: 'A. Ildız', positions: ['MO', 'MOO', 'MDO'], ovr: 67, pot: 67 },
  { name: 'N. Sangaré', positions: ['SĞB', 'SĞO'], ovr: 67, pot: 67 },
  { name: 'K. Matsuki', positions: ['MO', 'MOO', 'ST'], ovr: 67, pot: 77 },
  { name: 'N. Miroshi', positions: ['MDO', 'STP', 'SLB'], ovr: 67, pot: 77 },
  { name: 'K. Çörekçi', positions: ['SĞB', 'SLB'], ovr: 67, pot: 67 },
  { name: 'F. Calvo', positions: ['STP', 'SLB'], ovr: 67, pot: 67 },
  { name: 'G. Kilama', positions: ['STP'], ovr: 67, pot: 72 },
  { name: 'A. Parmak', positions: ['MDO', 'MO', 'MOO'], ovr: 67, pot: 67 },
  { name: 'L. Diack', positions: ['MDO', 'MO'], ovr: 67, pot: 73 },
  { name: 'J. Słowik', positions: ['KL'], ovr: 67, pot: 67 },
  { name: 'B. Kramer', positions: ['ST'], ovr: 67, pot: 67 },
  { name: 'N. Boranijašević', positions: ['SĞO', 'SĞB'], ovr: 67, pot: 67 },
  { name: 'A. Ndao', positions: ['SĞO'], ovr: 67, pot: 67 },
  { name: 'A. Demirbağ', positions: ['STP'], ovr: 67, pot: 70 },
  { name: 'M. Bjørlo', positions: ['MO'], ovr: 67, pot: 67 },
  { name: 'G. Papanikolaou', positions: ['MO', 'STP', 'MDO'], ovr: 67, pot: 70 },
  { name: 'T. Şahin', positions: ['SĞB'], ovr: 67, pot: 74 },
  { name: 'K. Alikulov', positions: ['STP'], ovr: 67, pot: 71 },
  { name: 'A. Zeqiri', positions: ['SLO', 'SĞO'], ovr: 67, pot: 73 },
  { name: 'D. Varešanović', positions: ['MOO', 'MO'], ovr: 67, pot: 75 },
  { name: 'B. Koita', positions: ['ST', 'SĞO'], ovr: 67, pot: 67 },
  { name: 'E. Başsan', positions: ['SĞO'], ovr: 67, pot: 67 },
  { name: 'C. Mandouki', positions: ['MDO', 'MO'], ovr: 67, pot: 67 },
  { name: 'S. M\'Bakata', positions: ['SĞB', 'SLB'], ovr: 67, pot: 68 },
  { name: 'H. Dervişoğlu', positions: ['ST', 'MOO'], ovr: 67, pot: 68 },
  { name: 'Cafú', positions: ['MDO', 'MO', 'SLO'], ovr: 67, pot: 67 },
  { name: 'J. Espinoza', positions: ['SĞB', 'SĞO'], ovr: 67, pot: 70 },
  { name: 'Y. Özcan', positions: ['STP', 'SLB'], ovr: 67, pot: 81 },
  { name: 'F. Aliti', positions: ['STP', 'SLB'], ovr: 67, pot: 67 },
  { name: 'Nuno Lima', positions: ['STP'], ovr: 67, pot: 76 },
  { name: 'R. Niyaz', positions: ['MO', 'MOO', 'MDO'], ovr: 67, pot: 67 },
  { name: 'T. Bingöl', positions: ['SLB', 'SLO', 'MO'], ovr: 67, pot: 67 },
  { name: 'U. Meraş', positions: ['SLB', 'SLO'], ovr: 67, pot: 67 },
  { name: 'Pedro Brazão', positions: ['SĞO', 'SĞK', 'MOO'], ovr: 67, pot: 79 },
  { name: 'B. Kapacak', positions: ['SĞO', 'SĞB'], ovr: 66, pot: 69 },
  { name: 'C. Çanak', positions: ['MOO', 'SĞO', 'MO'], ovr: 66, pot: 81 },
  { name: 'E. Yeşilyurt', positions: ['SĞO', 'SLO', 'SĞB'], ovr: 66, pot: 66 },
  { name: 'D. Milošević', positions: ['MOO', 'MO'], ovr: 66, pot: 66 },
  { name: 'J. Kałuziński', positions: ['MDO', 'MO', 'MOO'], ovr: 66, pot: 79 },
  { name: 'C. Yüksel', positions: ['MDO', 'MO'], ovr: 66, pot: 67 },
  { name: 'S. Gönül', positions: ['SLB'], ovr: 66, pot: 67 },
  { name: 'P. Keny', positions: ['ST', 'SĞK', 'SLO'], ovr: 66, pot: 71 },
  { name: 'Maestro', positions: ['MDO', 'MO'], ovr: 66, pot: 75 },
  { name: 'H. Kaldırım', positions: ['SLB'], ovr: 66, pot: 66 },
  { name: 'R. Civelek', positions: ['SĞO', 'SĞB', 'SLO'], ovr: 66, pot: 66 },
  { name: 'D. Kolovetsios', positions: ['STP'], ovr: 66, pot: 66 },
  { name: 'A. Karimi', positions: ['MO', 'MDO'], ovr: 66, pot: 66 },
  { name: 'Y. Ackah', positions: ['MDO', 'MO'], ovr: 66, pot: 70 },
  { name: 'K. Kanatsızkuş', positions: ['ST'], ovr: 66, pot: 66 },
  { name: 'D. Erdoğan', positions: ['MDO', 'MO'], ovr: 66, pot: 67 },
  { name: 'T. Altıkardeş', positions: ['STP', 'MDO', 'SĞB'], ovr: 66, pot: 81 },
  { name: 'Rui Pedro', positions: ['MOO', 'MO'], ovr: 66, pot: 67 },
  { name: 'C. Sertel', positions: ['SLB', 'STP'], ovr: 66, pot: 71 },
  { name: 'Joelson Fernandes', positions: ['SLO', 'SĞO', 'SLK'], ovr: 66, pot: 75 },
  { name: 'C. Matondo', positions: ['MDO', 'MO'], ovr: 66, pot: 70 },
  { name: 'T. Çetin', positions: ['KL'], ovr: 66, pot: 69 },
  { name: 'S. Camara', positions: ['STP'], ovr: 66, pot: 66 },
  { name: 'O. Özçiçek', positions: ['MO', 'MDO'], ovr: 66, pot: 69 },
  { name: 'S. Çiftpınar', positions: ['STP'], ovr: 66, pot: 66 },
  { name: 'N. Opoku', positions: ['STP'], ovr: 66, pot: 69 },
  { name: 'S. Córdova', positions: ['ST', 'MOO'], ovr: 66, pot: 67 },
  { name: 'L. Augusto', positions: ['SĞB', 'SĞO'], ovr: 66, pot: 71 },
  { name: 'R. Yalçın', positions: ['STP', 'SĞB', 'MDO'], ovr: 66, pot: 66 },
  { name: 'Z. Dimitrov', positions: ['SLO', 'SLK'], ovr: 66, pot: 67 },
  { name: 'A. Aytemur', positions: ['STP'], ovr: 66, pot: 67 },
  { name: 'A. Yiğiter', positions: ['KL'], ovr: 65, pot: 70 },
  { name: 'B. Öztürk', positions: ['STP'], ovr: 65, pot: 66 },
  { name: 'K. Pirić', positions: ['KL'], ovr: 65, pot: 66 },
  { name: 'Thalisson Kelven', positions: ['STP'], ovr: 65, pot: 67 },
  { name: 'Ö. Beyaz', positions: ['MOO', 'MO', 'SĞO'], ovr: 65, pot: 78 },
  { name: 'J. Attamah', positions: ['STP', 'MDO'], ovr: 65, pot: 66 },
  { name: 'G. Sazdağı', positions: ['SĞB', 'ST', 'SLO'], ovr: 65, pot: 66 },
  { name: 'Djalma Silva', positions: ['SLB', 'SLO'], ovr: 65, pot: 65 },
  { name: 'F. Bayır', positions: ['STP'], ovr: 65, pot: 72 },
  { name: 'E. Boateng', positions: ['MO'], ovr: 65, pot: 66 },
  { name: 'A. Mocsi', positions: ['STP'], ovr: 65, pot: 74 },
  { name: 'A. Turgunboev', positions: ['SLK', 'SLO'], ovr: 65, pot: 65 },
  { name: 'Z. Erdal', positions: ['SLB'], ovr: 65, pot: 65 },
  { name: 'N. Sonko Sundberg', positions: ['STP'], ovr: 65, pot: 66 },
  { name: 'D. Nikolic', positions: ['KL'], ovr: 65, pot: 68 },
  { name: 'E. Ersoy', positions: ['STP'], ovr: 65, pot: 65 },
  { name: 'C. Lungoyi', positions: ['SLK', 'ST', 'SGK'], ovr: 65, pot: 71 },
  { name: 'A. Husic', positions: ['STP', 'SLB'], ovr: 65, pot: 74 },
  { name: 'G. Gul', positions: ['MDO'], ovr: 65, pot: 70 },
  { name: 'Y. Özdemir', positions: ['SLO', 'SLB'], ovr: 65, pot: 71 },
  { name: 'S. Özdamar', positions: ['STP', 'SGB'], ovr: 65, pot: 65 },
  { name: 'M. Baltacı', positions: ['STP', 'SGB'], ovr: 64, pot: 75 },
  { name: 'Y. Çift', positions: ['STP', 'MDO', 'SGB'], ovr: 64, pot: 72 },
  { name: 'D. Dilmen', positions: ['KL'], ovr: 64, pot: 79 },
  { name: 'A. Aktaş', positions: ['MOO', 'MO', 'SĞO'], ovr: 64, pot: 66 },
  { name: 'Y. Barası', positions: ['ST', 'SLK'], ovr: 64, pot: 75 },
  { name: 'O. Piri', positions: ['KL'], ovr: 64, pot: 65 },
  { name: 'Emersonn', positions: ['SĞK', 'ST', 'SLK'], ovr: 64, pot: 78 },
  { name: 'K. Alıcı', positions: ['SĞB', 'STP'], ovr: 64, pot: 65 },
  { name: 'V. Bekaj', positions: ['KL'], ovr: 64, pot: 68 },
  { name: 'F. Damjanović', positions: ['STP'], ovr: 64, pot: 69 },
  { name: 'Pedrinho', positions: ['SLK'], ovr: 64, pot: 64 },
  { name: 'U. Yazgih', positions: ['STP', 'MDO', 'SĚB'], ovr: 64, pot: 69 },
  { name: 'O. Ülgün', positions: ['MDO', 'MO'], ovr: 64, pot: 67 },
  { name: 'A. Okumuş', positions: ['SĞB', 'SĞO'], ovr: 64, pot: 64 },
  { name: 'M. Paluli', positions: ['SĞB'], ovr: 64, pot: 64 },
  { name: 'M. Bozan', positions: ['KL'], ovr: 64, pot: 70 },
  { name: 'T. İlter', positions: ['MDO', 'MO'], ovr: 64, pot: 64 },
  { name: 'T. Seferi', positions: ['ST', 'SLO', 'SĞO'], ovr: 64, pot: 64 },
  { name: 'J. Yılmaz', positions: ['KL'], ovr: 63, pot: 78 },
  { name: 'Y. Akçiçek', positions: ['STP'], ovr: 63, pot: 82 },
  { name: 'M. Hekimoğlu', positions: ['ST', 'SLK', 'SĞK'], ovr: 63, pot: 78 },
  { name: 'S. Terzi', positions: ['SLB'], ovr: 63, pot: 73 },
  { name: 'M. Yılmaz', positions: ['SĞB'], ovr: 63, pot: 66 },
  { name: 'A. Dursun', positions: ['SLB'], ovr: 63, pot: 66 },
  { name: 'A. Kol', positions: ['ST', 'SLK', 'SĞK'], ovr: 63, pot: 70 },
  { name: 'B. Balat', positions: ['MOO', 'SĞK'], ovr: 63, pot: 63 },
  { name: 'R. Yılmaz', positions: ['STP', 'SĞB'], ovr: 63, pot: 63 },
  { name: 'E. Taşdemir', positions: ['SLB'], ovr: 63, pot: 63 },
  { name: 'Q. Daubin', positions: ['MO', 'MDO'], ovr: 63, pot: 63 },
  { name: 'Ö. Artan', positions: ['SĞB', 'SĞO'], ovr: 63, pot: 68 },
  { name: 'M. Gümüşkaya', positions: ['SLO', 'SĞO'], ovr: 63, pot: 68 },
  { name: 'S. Gümüş', positions: ['SĞO', 'ST'], ovr: 63, pot: 63 },
  { name: 'E. Öğrüce', positions: ['MO', 'MOO'], ovr: 63, pot: 78 },
  { name: 'A. Ünyay', positions: ['STP', 'SĞB'], ovr: 62, pot: 82 },
  { name: 'E. Akman', positions: ['MDO', 'MO'], ovr: 62, pot: 82 },
  { name: 'K. Arroyo', positions: ['SĞO', 'SLK', 'SLO'], ovr: 62, pot: 83 },
  { name: 'M. Tepe', positions: ['KL'], ovr: 62, pot: 69 },
  { name: 'D. Özkan', positions: ['KL'], ovr: 62, pot: 68 },
  { name: 'E. Uzunhan', positions: ['STP'], ovr: 62, pot: 71 },
  { name: 'A. Uzodimma', positions: ['SĞB', 'MDO', 'SĞO'], ovr: 62, pot: 65 },
  { name: 'A. Kocaman', positions: ['STP', 'SLB'], ovr: 62, pot: 76 },
  { name: 'I. Solet', positions: ['MO', 'MDO'], ovr: 62, pot: 71 },
  { name: 'A. Özçimen', positions: ['KL'], ovr: 62, pot: 71 },
  { name: 'M. Bostan', positions: ['ST', 'SLK'], ovr: 62, pot: 76 },
  { name: 'M. Ibrahimoglu', positions: ['MO', 'MDO'], ovr: 62, pot: 69 },
  { name: 'M. Pala', positions: ['MDO', 'SLB'], ovr: 62, pot: 68 },
  { name: 'J. Biegański', positions: ['MDO'], ovr: 62, pot: 70 },
  { name: 'B. Luş', positions: ['SLK', 'SLO'], ovr: 61, pot: 82 },
  { name: 'É. Ricardo', positions: ['MO', 'MDO'], ovr: 61, pot: 75 },
  { name: 'B. Fougeu', positions: ['ST'], ovr: 61, pot: 70 },
  { name: 'A. Aymbetov', positions: ['ST'], ovr: 61, pot: 61 },
  { name: 'T. Aydoğan', positions: ['MO', 'MOO'], ovr: 61, pot: 61 },
  { name: 'A. Kurtulan', positions: ['SĞB', 'SĞO'], ovr: 61, pot: 69 },
  { name: 'C. Demir', positions: ['STP', 'SLB'], ovr: 61, pot: 68 },
  { name: 'Y. Subaşı', positions: ['SLB'], ovr: 61, pot: 61 },
  { name: 'T. Taşçı', positions: ['SLO', 'SĞO'], ovr: 61, pot: 70 },
  { name: 'A. Aslan', positions: ['MDO'], ovr: 61, pot: 69 },
  { name: 'M. Mohammed', positions: ['MDO', 'MO'], ovr: 61, pot: 70 },
  { name: 'K. Subaşı', positions: ['SLB'], ovr: 60, pot: 79 },
  { name: 'G. Gürpüz', positions: ['MO', 'MOO'], ovr: 60, pot: 80 },
  { name: 'E. Çetin', positions: ['KL'], ovr: 60, pot: 72 },
  { name: 'E. Yegen', positions: ['STP'], ovr: 60, pot: 66 },
  { name: 'H. Yeral', positions: ['KL'], ovr: 60, pot: 66 },
  { name: 'V. Karakuş', positions: ['KL'], ovr: 60, pot: 63 },
  { name: 'S. Kavrazlı', positions: ['SĞK', 'ST', 'SĞO'], ovr: 60, pot: 69 },
  { name: 'A. Burak', positions: ['STP', 'MDO', 'SLB'], ovr: 60, pot: 60 },
  { name: 'J. Ćalušić', positions: ['STP', 'SLB'], ovr: 60, pot: 60 },
  { name: 'E. Korkmaz', positions: ['SĞB'], ovr: 60, pot: 67 },
  { name: 'A. Yanar', positions: ['KL'], ovr: 60, pot: 65 },
  { name: 'Y. Karagöz', positions: ['KL'], ovr: 60, pot: 66 },
  { name: 'S. Malkoçoğlu', positions: ['MDO', 'MO', 'STP'], ovr: 59, pot: 76 },
  { name: 'A. Yılmaz', positions: ['STP'], ovr: 59, pot: 74 },
  { name: 'E. Kaplan', positions: ['SLB', 'SĞB'], ovr: 59, pot: 65 },
  { name: 'T. Sarıarslan', positions: ['ST'], ovr: 59, pot: 73 },
  { name: 'B. Böke', positions: ['ST'], ovr: 59, pot: 63 },
  { name: 'G. Stephen', positions: ['SLB'], ovr: 59, pot: 63 },
  { name: 'Ü. Ergün', positions: ['SĞB'], ovr: 59, pot: 59 },
  { name: 'C. Şen', positions: ['SLB', 'SLO'], ovr: 59, pot: 66 },
  { name: 'A. Boşluk', positions: ['SLB', 'SLO'], ovr: 58, pot: 72 },
  { name: 'B. Çetin', positions: ['STP'], ovr: 58, pot: 73 },
  { name: 'T. Kalender', positions: ['STP'], ovr: 58, pot: 66 },
  { name: 'N. Korkmaz', positions: ['SLO'], ovr: 58, pot: 68 },
  { name: 'J. Okoronkwo', positions: ['ST', 'SĞK', 'SLK'], ovr: 58, pot: 68 },
  { name: 'E. Başyiğit', positions: ['STP'], ovr: 58, pot: 70 },
  { name: 'E. Gökay', positions: ['SĞO'], ovr: 58, pot: 77 },
  { name: 'E. Değişmez', positions: ['MDO'], ovr: 58, pot: 58 },
  { name: 'M. Erdilman', positions: ['MO', 'MDO'], ovr: 58, pot: 72 },
  { name: 'H. Osman', positions: ['SLK', 'SĞK', 'ST'], ovr: 58, pot: 67 },
  { name: 'Y. Kılıç', positions: ['SLK', 'SĞK'], ovr: 57, pot: 70 },
  { name: 'E. Karaağaç', positions: ['SLB'], ovr: 57, pot: 69 },
  { name: 'O. Demirbağ', positions: ['SLK', 'SĞK', 'ST'], ovr: 57, pot: 74 },
  { name: 'O. Kaynak', positions: ['SĞK', 'SLO'], ovr: 57, pot: 72 },
  { name: 'E. Gökçek', positions: ['SĞB'], ovr: 57, pot: 72 },
  { name: 'S. Temel', positions: ['MDO', 'MO'], ovr: 57, pot: 63 },
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
  { name: 'M. Bayram', positions: ['KL'], ovr: 50, pot: 66 },

];

const formationNeeds = [
  'KL', 'STP', 'STP', 'SLB', 'SĞB', 'MDO', 'MDO', 'MOO', 'MOO', 'MOO', 'ST'
];

export default function App() {
  const [rosters, setRosters] = useState(() => {
    const saved = localStorage.getItem("rosters");
    return saved ? JSON.parse(saved) : Object.fromEntries([...teams].sort().map(team => [team, []]));
  });
  const [currentPickIndex, setCurrentPickIndex] = useState(() => {
    const saved = localStorage.getItem("currentPickIndex");
    return saved ? JSON.parse(saved) : 0;
  });
  const [availablePlayers, setAvailablePlayers] = useState(() => {
    const saved = localStorage.getItem("availablePlayers");
    return saved ? JSON.parse(saved) : initialPlayers;
  });
  const [lastPickedPlayer, setLastPickedPlayer] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [baseOrder, setBaseOrder] = useState([...teams].sort());
  const [pickOrder, setPickOrder] = useState([...teams].sort());
  const [draftType, setDraftType] = useState('snake');
  const popupTimeoutRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("rosters", JSON.stringify(rosters));
    localStorage.setItem("currentPickIndex", JSON.stringify(currentPickIndex));
    localStorage.setItem("availablePlayers", JSON.stringify(availablePlayers));
  }, [rosters, currentPickIndex, availablePlayers]);

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
        <h1 className="text-3xl font-bold">GRKN Süper Lig Draft Simulatorü</h1>
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
            Sıradaki Seçim
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
          <option value="snake">Yılan</option>
          <option value="random">Random</option>
          <option value="fair">Adil</option>
        </select>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Draft Sırası</h2>
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
      <h2 className="text-xl font-semibold mb-2">Oyuncu Havuzu</h2>
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
          <p className="font-bold text-xl">{lastPickedPlayer.team} {lastPickedPlayer.name} seçti!</p>
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
