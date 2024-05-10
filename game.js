document.addEventListener("DOMContentLoaded", function () {
  let character = document.getElementById("character")
  let carrotsContainer = document.getElementById("carrots")
  let obstaclesContainer = document.getElementById("obstacles")

  let score = 0
  let carrotsToWin = 20 // Number of carrots required to win

  // Function to generate carrots
  function generateCarrot() {
    let carrot = document.createElement("div")
    carrot.classList.add("carrot")
    carrotsContainer.appendChild(carrot)
  }

  // Generate multiple carrots
  for (let i = 0; i < 20; i++) {
    generateCarrot()
  }

  // Function to generate obstacles
  function generateObstacle() {
    let obstacle = document.createElement("div")
    obstacle.classList.add("obstacle")
    obstaclesContainer.appendChild(obstacle)
  }

  // Generate multiple obstacles
  for (let i = 0; i < 3; i++) {
    generateObstacle()
  }

  // Animation for moving character up
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

  function moveCharacterRight() {
    let characterLeft = parseInt(window.getComputedStyle(character).left)
    character.style.left = characterLeft + 10 + "px" // Adjust speed as needed
  }

  // Event listener for arrow key presses
  document.addEventListener("keydown", function (event) {
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
  })

  // Function to check for collision between character and carrots
  function checkCollision() {
    let carrots = document.querySelectorAll(".carrot")
    carrots.forEach(function (carrot) {
      if (isCollision(character, carrot)) {
        carrot.classList.add("bump") // Apply bumping animation to the carrot
        character.classList.add("bump") // Apply bumping animation to the character

        setTimeout(function () {
          carrot.remove() // Remove the carrot after animation
          score++ // Increase the score
          updateScore() // Update the score display
          character.classList.remove("bump") // Remove bumping animation from the character

          // Check if the player wins
          if (score >= carrotsToWin) {
            showWinner()
          }
        }, 500) // Adjust duration as needed
      }
    })

    let obstacles = document.querySelectorAll(".obstacle")
    obstacles.forEach(function (obstacle) {
      if (isCollision(character, obstacle)) {
        // Handle collision with obstacle
        gameOver() // Call game over function
      }
    })
  }

  // Function to handle game over
  function gameOver() {
    alert("Game Over! You lose!")
    // You can add more game over actions here such as resetting the game
  }

  // Function to handle winning
  function showWinner() {
    // Play a victory sound
    let audio = new Audio("victory.mp3")
    audio.play()

    // Display a special message
    alert("Congratulations! You win!")

    // Change background color to celebrate victory
    document.body.style.backgroundColor = "#ffd700"
  }

  // Function to update score
  function updateScore() {
    document.getElementById("score").innerText = "Score: " + score
  }

  // Function to check collision between character and object
  function isCollision(char, obj) {
    // Get the position and dimensions of the character
    const charRect = char.getBoundingClientRect()

    // Get the position and dimensions of the object
    const objRect = obj.getBoundingClientRect()

    // Check for collision using the bounding box approach
    return (
      charRect.top < objRect.bottom &&
      charRect.bottom > objRect.top &&
      charRect.left < objRect.right &&
      charRect.right > objRect.left
    )
  }
})
