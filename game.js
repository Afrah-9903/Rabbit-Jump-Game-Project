document.addEventListener("DOMContentLoaded", function () {
  let character = document.getElementById("character")
  let carrotsContainer = document.getElementById("carrots")
  let obstaclesContainer = document.getElementById("obstacles")
  let scoreDisplay = document.getElementById("score")
  let livesDisplay = document.getElementById("remaining-lives")
  let carrotSound = document.getElementById("carrotSound")
  let obstacleSound = document.getElementById("obstacleSound")
  let newGameButton = document.getElementById("new-game-button")

  let score = 0
  let lives = 3 // Number of lives
  let initialLives = 3 // Initial number of lives
  let carrotsToWin = 20 // Number of carrots required to win
  let obstacleSpeed = 2 // Initial speed of falling obstacles
  let characterSize = 30 // Initial size of the character
  let gameOverFlag = false // Flag to indicate whether the game is over

  // Function to generate carrots
  function generateCarrot() {
    let carrot = document.createElement("div")
    carrot.classList.add("carrot")
    carrot.style.left = Math.random() * 80 + "vw" // Random horizontal position
    carrot.style.animationDuration = Math.random() * 2 + 1 + "s" // Random animation duration
    carrotsContainer.appendChild(carrot)
  }

  // Generate multiple carrots
  function generateCarrots() {
    for (let i = 0; i < 20; i++) {
      generateCarrot()
    }
  }

  // Function to generate obstacles
  function generateObstacle() {
    let obstacle = document.createElement("div")
    obstacle.classList.add("obstacle")
    obstacle.style.left = Math.random() * 80 + "vw" // Random horizontal position
    obstacle.style.animationDuration = obstacleSpeed + "s" // Set animation duration
    obstaclesContainer.appendChild(obstacle)
  }

  // Generate multiple obstacles
  function generateObstacles() {
    for (let i = 0; i < 5; i++) {
      generateObstacle()
    }
  }

  // Initialize the game
  function initGame() {
    score = 0
    lives = initialLives // Reset lives to initial value
    gameOverFlag = false
    updateScore()
    updateLives()
    generateCarrots()
    generateObstacles()
    character.style.top = "50vh" // Initial vertical position
    character.style.left = "10vw" // Initial horizontal position
  }

  // Event listener for arrow key presses
  document.addEventListener("keydown", function (event) {
    if (!gameOverFlag) {
      if (event.key === "ArrowUp") {
        moveCharacterUp()
      } else if (event.key === "ArrowDown") {
        moveCharacterDown()
      } else if (event.key === "ArrowLeft") {
        moveCharacterLeft()
      } else if (event.key === "ArrowRight") {
        moveCharacterRight()
      }

      checkCollision() // Check for collision after each move
    }
  })

  // Event listener for the "New Game" button
  newGameButton.addEventListener("click", function () {
    initGame() // Start a new game
  })

  // Function to move the character up
  function moveCharacterUp() {
    let characterTop = parseInt(window.getComputedStyle(character).top)
    character.style.top = characterTop - 10 + "px" // Adjust speed as needed
  }

  // Function to move the character down
  function moveCharacterDown() {
    let characterTop = parseInt(window.getComputedStyle(character).top)
    character.style.top = characterTop + 10 + "px" // Adjust speed as needed
  }

  // Function to move the character left
  function moveCharacterLeft() {
    let characterLeft = parseInt(window.getComputedStyle(character).left)
    character.style.left = characterLeft - 10 + "px" // Adjust speed as needed
  }

  // Function to move the character right
  function moveCharacterRight() {
    let characterLeft = parseInt(window.getComputedStyle(character).left)
    character.style.left = characterLeft + 10 + "px" // Adjust speed as needed
  }

  // Function to check for collision between character and carrots/obstacles
  function checkCollision() {
    if (!gameOverFlag) {
      let carrots = document.querySelectorAll(".carrot")
      carrots.forEach(function (carrot) {
        if (isCollision(character, carrot)) {
          carrot.remove()
          score++
          updateScore()
        }
      })

      let obstacles = document.querySelectorAll(".obstacle")
      obstacles.forEach(function (obstacle) {
        if (isCollision(character, obstacle)) {
          obstacle.remove()
          if (lives > 1) {
            lives-- // Deduct a life if more than 1 life remaining
            playLifeLostMessage() // Play life lost message
          } else {
            lives = 0 // If only 1 life remaining, set lives to 0
            gameOver() // Trigger game over if no more lives
          }
          updateLives() // Update remaining lives
        }
      })
    }
  }

  // Function to handle game over
  function gameOver() {
    gameOverFlag = true
    alert("Game Over! You lose!")
    // You can add more game over actions here such as resetting the game
  }

  // Function to update score
  function updateScore() {
    scoreDisplay.innerText = "Score: " + score
    if (score >= carrotsToWin) {
      showWinner()
    }
  }

  // Function to update remaining lives
  function updateLives() {
    livesDisplay.innerText = lives
  }

  // Function to play life lost message
  function playLifeLostMessage() {
    alert("You lost a life!")
  }

  // Function to check collision between character and object
  function isCollision(char, obj) {
    const charRect = char.getBoundingClientRect()
    const objRect = obj.getBoundingClientRect()
    return (
      charRect.top < objRect.bottom &&
      charRect.bottom > objRect.top &&
      charRect.left < objRect.right &&
      charRect.right > objRect.left
    )
  }

  // Function to handle winning
  function showWinner() {
    gameOverFlag = true
    alert("Congratulations! You win!")
  }

  // Initialize the game when the page loads
  initGame()
})
