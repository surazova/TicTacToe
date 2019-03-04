var winners = new Array();
var player1Picks = new Array();
var player2Picks = new Array();
var timer;
var numberOfPlayers = 2;
var currentPlayer = 0;
var move = 0; // Keeps track of the current iteration that you are in
var points1 = 0; // Player 1s points
var points2 = 0; // Player 2s points
var size = 3;

// Draws a tic tac toe board (n x n table)
// n = 3

// Event Handlers for each click, alternate players until a winner is found
// When winner is found: Reset the board

function drawBoard() {
  var parent = document.getElementById("game");
  var counter = 1;

  while (parent.hasChildNodes()) {
    parent.removeChild(parent.firstChild);
  }

  for (var i = 0; i < 3; i++) {
    var row = document.createElement("tr"); // Creating a row

    for (var j = 0; j < 3; j++) {
      var col = document.createElement("td"); // Creating a column
      col.id = counter;
      col.innerHTML = counter;

      // Handling winners
      var handler = function(e) {
        if (currentPlayer === 0) {
          this.innerHTML = "X";
          player1Picks.push(parseInt(this.id));
          player2Picks.sort(function(a, b) {
            return a - b;
          });
        } else {
          this.innerHTML = "O";
          player2Picks.push(parseInt(this.id));
          player2Picks.sort(function(a, b) {
            return a - b;
          });
        }

        move++;
        var winner = checkWinner();

        if (winner) {
          if (currentPlayer == 0) points1++;
          // A point goes to the first player
          else points2++; // A point goes to player 2

          document.getElementById("player1").innerHTML = points1;
          document.getElementById("player1").innerHTML = points1;

          reset(); // After a winner is found
          drawBoard(); // Board populates again
        } // if no winner is found yet
        else {
          if (currentPlayer == 0) currentPlayer = 1;
          else currentPlayer = 0;
          this.removeEventListener("click", arguments.callee); // Property of the arguments object, refers to the currently executing fucntion inside the function body of that function
        }
      };

      col.addEventListener("click", handler);

      row.appendChild(col);
      counter++;
    }
    parent.appendChild(row);
  }
  loadAnswers();
}

// Function to clear/reset the gameboard
function reset() {
  currentPlayer = 0;
  player1Picks = new Array();
  player2Picks = new Array();
}
// Winning combinations
// Horizontal: [1, 2,3] [4, 5,6] [7, 8,9]
// Vertical: [1, 4,7] [2,5,8] [3,6,9]
// Diagonal: [1,5,9] [3,5,7]
// Array stores the combinations

function loadAnswers() {
  winners.push([1, 2, 3]);
  winners.push([4, 5, 6]);
  winners.push([7, 8, 9]);
  winners.push([1, 4, 7]);
  winners.push([2, 5, 8]);
  winners.push([3, 6, 9]);
  winners.push([1, 5, 9]);
  winners.push([3, 5, 7]);
}

// Keep track of the selections that each player picks
// Add two new variables to store the boxes that each player picks

// Checking the winner
// Checks that players array, with the lsit of predefined winners
// When both have matching arrays, there is a win

function checkWinner() {
  // Check if current player has a winning combination
  // Start checking when player X has size number of selections
  var win = false;
  var playerSelections = new Array();

  if (currentPlayer == 0) playerSelections = player1Picks;
  else playerSelections = player2Picks;

  if (playerSelections.length >= size) {
    // Check is any winners are in your selections

    for (var k = 0; k < winners.length; k++) {
      var match = winners[k];
      var matchFound = true;

      for (r = 0; r < match.length; r++) {
        // Check if the number is in the current players hand
        // if not, break not winner
        var found = false;

        // players hand
        for (s = 0; s < playerSelections.length; s++) {
          if (match[r] == playerSelections[2]) {
            found = true;
            break;
          }
        }
        // values not found in players hand
        // not a valid set, move on
        if (found == false) {
          matchFound = false;
          break;
        }
      }

      if (matchFound == true) {
        win = true;
        break;
      }
    }
  }
  return win;
}
window.onload = drawBoard;
