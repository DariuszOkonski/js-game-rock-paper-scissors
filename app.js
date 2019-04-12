const domElements = {
  btnStart: document.querySelector('button.start'),
  btnReset: document.querySelector('button.reset'),
  imgTags: [...document.querySelectorAll('div.select img')],
  spanYourChoice: document.querySelector('[data-summary="your-choice"]'),
  spanAiChoice: document.querySelector('[data-summary="ai-choice"]'),
  spanWhoWin: document.querySelector('[data-summary="who-win"]'),
  spanNumbers: document.querySelector('p.numbers span'),
  spanWins: document.querySelector('p.wins span'),
  spanLosses: document.querySelector('p.losses span'),
  spanDraws: document.querySelector('p.draws span'),
}

const results = {
  numberOfGames: 0,
  wins: 0,
  losses: 0,
  draws: 0,
}

const players = {
  human: '',
  computer: '',
}


const play = () => {
  if (!players.human)
    return alert('Choose hand');

  domElements.imgTags.forEach(img => img.removeEventListener('click', humanChoose, false));

  computerChoose();

  findWinner();

  displayResults();

  domElements.btnStart.style.visibility = 'hidden';
  domElements.btnReset.style.visibility = 'hidden';

  setTimeout(() => {
    clearRound();
  }, 3000);
}

const humanChoose = (e) => {
  domElements.imgTags.forEach(img => img.style.boxShadow = '');
  e.target.style.boxShadow = '0 0 10px 10px yellow';
  players.human = e.target.dataset.option;
  domElements.spanYourChoice.textContent = players.human;
}

const computerChoose = () => {
  const tempArray = domElements.imgTags.map(el => el.dataset.option);

  players.computer = tempArray[Math.floor(Math.random() * tempArray.length)];
  domElements.imgTags.forEach(img => {
    if (img.dataset.option === players.computer) {
      if (players.computer === players.human)
        img.style.boxShadow = '0 0 10px 10px red';
      else
        img.style.boxShadow = '0 0 10px 10px yellowgreen';
    }
  })
  domElements.spanAiChoice.textContent = players.computer;
}

const findWinner = () => {
  let result;
  let fontColor;

  results.numberOfGames++;
  if (players.human === players.computer) {
    result = 'Draw';
    fontColor = 'gray'
    results.draws++;
  } else if ((players.human === 'paper' && players.computer === 'rock') ||
    (players.human === 'rock' && players.computer === 'scissors') ||
    (players.human === 'scissors' && players.computer === 'paper')) {
    result = 'You won';
    fontColor = 'green';
    results.wins++;
  } else {
    result = 'You lost';
    fontColor = 'red';
    results.losses++;
  }

  domElements.spanWhoWin.textContent = result;
  domElements.spanWhoWin.style.color = fontColor;
}

const displayResults = () => {
  domElements.spanNumbers.textContent = results.numberOfGames;
  domElements.spanWins.textContent = results.wins;
  domElements.spanLosses.textContent = results.losses;
  domElements.spanDraws.textContent = results.draws;
}

const clearRound = () => {
  players.human = '';
  players.computer = '';

  domElements.btnStart.style.visibility = 'visible';
  domElements.btnReset.style.visibility = 'visible';

  domElements.imgTags.forEach(img => img.addEventListener('click', humanChoose));

  domElements.imgTags.forEach(img => img.style.boxShadow = '');
  domElements.spanYourChoice.textContent = '';
  domElements.spanAiChoice.textContent = '';
  domElements.spanWhoWin.textContent = '';
}

const clearAll = () => {
  if (!window.confirm('Are you sure???')) {
    return;
  }

  clearRound();
  results.numberOfGames = 0;
  results.wins = 0;
  results.losses = 0;
  results.draws = 0;

  displayResults();
}


domElements.imgTags.forEach(img => img.addEventListener('click', humanChoose));
domElements.btnReset.addEventListener('click', clearAll);
domElements.btnStart.addEventListener('click', play);