let deckSize = 52;
var playerHand = new Array();
var dealerHand = new Array();
var cardPosition = 0;
var i = 0;
var j = 0;
var subCard = 0;
var playerScore = 0;
var dealerScore = 0;
var playerValue = "Player has ";
const bustValue = 21;

var suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
var values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
var deck = new Array();

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function createDeck() {
  deck = new Array();
  for (var i = 0; i < values.length; i++) {
    for (var x = 0; x < suits.length; x++) {
      var weight = parseInt(values[i]);
      if (values[i] == "J" || values[i] == "Q" || values[i] == "K") weight = 10;
      if (values[i] == "A") weight = 11;
      var card = { Value: values[i], Suit: suits[x], Weight: weight };
      deck.push(card);
    }
  }
}

function updatePlayerScore() {
  playerScore = 0;
  playerValue = "Player has ";
  for (var i = 0; i < playerHand.length; i++) {
    playerScore += playerHand[i].Weight;

    playerValue += `, ${playerHand[i].Value} of ${playerHand[i].Suit} `;
  }

  playerValue += `with a value of ${playerScore}`;
}

function displayScore() {
  document.getElementById("output-div").innerHTML =
    `${playerValue}` + "<br>" + `${dealerValue}`;
}

function winnerChecker() {
  if (playerScore == bustValue && playerHand.length == 2 ) {
    document.getElementById("output-div").innerHTML =
      "Blackjack!" + "<br>" + "Player wins!";
  }
  if (dealerScore == bustValue && dealerHand.length == 2) {
    document.getElementById("output-div").innerHTML =
      "Blackjack!" + "<br>" + "Dealer wins!";
  }
  if (playerScore > bustValue) {
    document.getElementById("output-div").innerHTML =
      `${playerValue}` +
      "<br>" +
      `${dealerValue}` +
      "<br>" +
      `Player busts` +
      "<br>" +
      "Player loses";
  } else if (dealerScore > bustValue) {
    document.getElementById("output-div").innerHTML =
      `${playerValue}` +
      "<br>" +
      `${dealerValue}` +
      "<br>" +
      `Dealer busts` +
      "<br>" +
      "Player wins";
  }
  if (playerScore < bustValue && dealerScore < bustValue) {
    if (playerScore > dealerScore) {
      document.getElementById("output-div").innerHTML =
        `${playerValue}` + "<br>" + `${dealerValue}` + "<br>" + "Player wins";
    }
    if (dealerScore > playerScore) {
      document.getElementById("output-div").innerHTML =
        `${playerValue}` + "<br>" + `${dealerValue}` + "<br>" + "Player loses";
    }
    if (playerScore == dealerScore) {
      document.getElementById("output-div").innerHTML =
        `${playerValue}` + "<br>" + `${dealerValue}` + "<br>" + "Draw";
    }
  }
}

function updateDealerScore() {
  dealerScore = 0;
  dealerValue = "Dealer has ";
  for (var i = 0; i < dealerHand.length; i++) {
    dealerScore += dealerHand[i].Weight;
    dealerValue += `, ${dealerHand[i].Value} of ${dealerHand[i].Suit} `;
  }
  dealerValue += `with a value of ${dealerScore}`;
}
function shuffle() {
  for (var x = 0; x < 1000; x++) {
    i = getRandomInt(deckSize);
    j = getRandomInt(deckSize);
    subCard = deck[i];
    deck[i] = deck[j];
    deck[j] = subCard;
  }
}

function dealHands() {
  playerHand.push(deck[0]);
  playerHand.push(deck[2]);
  dealerHand.push(deck[1]);
  dealerHand.push(deck[3]);
  cardPosition += 4;
  updatePlayerScore();
  updateDealerScore();
}

function startblackjack() {
  playerHand = new Array();
  dealerHand = new Array();
  cardPosition = 0;
  i = 0;
  j = 0;
  subCard = 0;
  playerScore = 0;
  dealerScore = 0;
  playerValue = "Player has ";
  const bustValue = 21;
  document.getElementById("btnStart").value = "Restart";

  createDeck();
  shuffle();
  dealHands();
  displayScore();
}

function hitMe() {
  playerHand.push(deck[cardPosition]);
  updatePlayerScore();
  document.getElementById("output-div").innerHTML =
    `Player has ${playerScore}` + "<br>" + `Test`;
  cardPosition += 1;
  updatePlayerScore();
  displayScore();
}

function stay() {
  while (dealerScore < 16) {
    dealerHand.push(deck[cardPosition]);
    cardPosition += 1;
    updateDealerScore();
  }
  winnerChecker();
}
