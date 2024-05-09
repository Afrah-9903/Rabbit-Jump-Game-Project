// game.js

document.addEventListener("DOMContentLoaded", function () {
  const character = document.getElementById("character")
  const carrotsContainer = document.getElementById("carrots")
  let score = 0

  // Function to check collision between two elements
  function isCollision(element1, element2) {
    const rect1 = element1.getBoundingClientRect()
    const rect2 = element2.getBoundingClientRect()
    return !(
      rect1.bottom < rect2.top ||
      rect1.top > rect2.bottom ||
      rect1.right < rect2.left ||
      rect1.left > rect2.right
    )
  }

  // Function to animate character and update score
  function animateCharacter() {
    const carrots = document.querySelectorAll(".carrot")
    carrots.forEach(function (carrot) {
      if (isCollision(character, carrot)) {
        carrot.remove() // Remove carrot
        score++ // Increment score
        document.getElementById("score").textContent = score // Update score display
        // Add animation to character (e.g., change color)
        character.style.backgroundColor = "yellow"
        setTimeout(function () {
          character.style.backgroundColor = "#f00"
        }, 200)
      }
    })
  }

  // Function to generate a new carrot
  function generateCarrot() {
    const newCarrot = document.createElement("div")
    newCarrot.classList.add("carrot")
    newCarrot.style.top = "0" // Set initial top position
    newCarrot.style.left = Math.random() * 90 + "%" // Randomize left position
    carrotsContainer.appendChild(newCarrot)
  }

  // Generate carrots periodically
  setInterval(generateCarrot, 3000) // Adjust the interval as needed

  // Check for collisions and animate character periodically
  setInterval(animateCharacter, 100) // Adjust the interval as needed
})
