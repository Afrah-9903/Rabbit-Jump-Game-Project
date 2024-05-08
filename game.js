let image = document.getElementById("image")
let jump = document.getElementById("jump")

document.addEventListener("DOMContentLoaded", function () {
  let character = document.getElementById("character")
  let carrotContainers = document.querySelectorAll(".carrotContainer")

  function triggerjump() {
    character.classList.add("jump")
    setTimeout(() => {
      character.classList.remove("jump")
    }, 600)
  }
  function handlekeypress(event) {
    if (event.code === "Space") {
      triggerjump()
      shootCarrot()
      generateCarrot(carrotContainers)
    }
  }
  function generateCarrot(carrotContainers) {
    //gets a random index to select a carrot container.
    const ramdomIndex = Math.floor(Math.random() * carrotContainers.length)
    // Selects the carrot container at the random index.
    const carrotContainer = carrotContainers[ramdomIndex] // used to create  a new element div for the carrot.
    const carrot = document.createElement("div") //adding css to the newly created div which is  used to style the carrot.
    carrot.classList.add("carrot")
    // append the carrot to the selected carrot container.
    carrotContainer.appendChild(carrot)
    // Append the carrot to the selected carrot container.
  }
  function shootCarrot() {
    let carrot = document.createElement("div")
    carrot.classList.add("carrot", "shoot")
    carrotContainers[0].apendChild(carrot)

    setTimeout(() => {
      // remove the carrot after it's shot
      carrot.remove()
    }, 1000)
  }

  document.addEventListener("keyup", handlekeypress)
})
