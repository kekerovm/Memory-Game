let clickedCard = null;
let preventClick = false;
let combosFound = 0;

const colors = [
  'orchid',
  'orangered',
  'blueviolet',
  'goldenrod',
  'brown',
  'silver',
  'blanchedalmond',
  'greenyellow',
];

const cards = [...document.querySelectorAll('.card')];
for (let color of colors) {
  const cardAIndex = parseInt(Math.random() * cards.length);
  const cardA = cards[cardAIndex];
  cards.splice(cardAIndex, 1);
  cardA.className += ` ${color}`
  cardA.setAttribute('data-color', color);

  const cardBIndex = parseInt(Math.random() * cards.length);
  const cardB = cards[cardBIndex];
  cards.splice(cardBIndex, 1);
  cardB.className += ` ${color}`
  cardB.setAttribute('data-color', color);
}

const start8tn = document.getElementById('start8tn')

function initialize() {
  start8tn.style.display ='none'
  // moveCount = 3;
}

// ctx.fillText('Moves left : ', + moveCount, 150, 50):

// moveCount--;

// flipCard(card) {
//   if(this.canFlipCard(card)) {
//     this.totalClicks++;
//     this.ticker.innerText = this.totalClicks;
//   }
// }

// startGame() {
//   this.totalClicks = 0;
//   this.timeRemaining = this.totalTime;
//   this.cardToCheck = null;
//   this.matchedCards = [];
//   this.busy = true;
//   setTimeout(() => {
//       this.audioController.startMusic();
//       this.shuffleCards(this.cardsArray);
//       this.countdown = this.startCountdown();
//       this.busy = false;
//   }, 500)
//   this.hideCards();
//   this.timer.innerText = this.timeRemaining;
//   this.ticker.innerText = this.totalClicks;
// }
// startCountdown() {
//   return setInterval(() => {
//       this.timeRemaining--;
//       this.timer.innerText = this.timeRemaining;
//       if(this.timeRemaining === 0)
//           this.gameOver();
//   }, 1000);
// }
// gameOver() {
//   clearInterval(this.countdown);
//   this.audioController.gameOver();
//   document.getElementById('game-over-text').classList.add('visible');
// }
// victory() {
//   clearInterval(this.countdown);
//   this.audioController.victory();
//   document.getElementById('victory-text').classList.add('visible');
// }
// hideCards() {
//   this.cardsArray.forEach(card => {
//       card.classList.remove('visible');
//       card.classList.remove('matched');
//   });
// }

function onCardClicked(e) {
  const target = e.currentTarget;

  if (
    preventClick ||
    target === clickedCard ||
    target.className.includes('done')
  ) {
    return;
  }

  target.className = target.className
      .replace('color-hidden', '')
      .trim();
  target.className += ' done';

  if (!clickedCard) {
    
    clickedCard = target;
  } else if (clickedCard) {
    
    if (
      clickedCard.getAttribute('data-color') !==
      target.getAttribute('data-color') 
    ) {
      preventClick = true;
      setTimeout(() => {
        clickedCard.className = 
          clickedCard.className.replace('done', '').trim() + 
          ' color-hidden';
        target.className = 
          target.className.replace(' done', '').trim() + 
          ' color-hidden';
        clickedCard = null;
        preventClick = false;
      }, 500);
    } else {
      combosFound ++;
      clickedCard = null;
      if (combosFound === 8) {
        alert('You WIN');
      }
    }
  }
}
