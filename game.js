let image = document.getElementById("image")
let block = document.getElementById("block")

let jump = document.getElementById("jump")

document.addEventListener("DOMContentLoaded", function () {
  let character = document.getElementById("character")
  function triggerjump() {
    character.classList.add("jump")
    setTimeout(() => {
      character.classList.remove("jump")
    }, 600)
  }
  function handlekeypress(event) {
    if (event.code === "Space") {
      triggerjump()
      generateCarrot()
    }
  }
  function generateCarrot() {
    const carrotContainer = document.getElementById("carrrotContainer") // gets the element in  html id with the carrot container
    const carrot = document.createElement("div") // used to create new div in element memory.
    carrot.classList.add("carrot") //adding css to the newly created div which is  used to style the carrot.
    const x = Math.random() * (carrotContainer.clientWidth - 30) // generate a random x co-ordinate for the carrot within the width of the carrotContainer and subtract 30 from the width to ensure that the carrot stays within the container bounds.
    const y = Math.random() * (carrotContainer.clientHeight - 30) // generate a random y co-ordinate for the carrot within the height of the cvarrotContainer and subtract 30 to  ensure the carrot stayes within the container bounds.
    carrot.style.left = x + "px" // set the left css prpty to the carrot div to the randomly generate x  co-ordinate. This determines the horizontal position of the carrot within its  container.
    carrot.style.top = x + "px" // set the top css prpty to the carrot to the randomly generate y co-ordinate. This determines the vertical position of the carrot within its  container.
    carrotContainer.appendChild(carrot) // finally we append the newly created carrot div to the carrotContainer element in the html. This adds the carrot visually on the screen.
  }

  document.addEventListener("keyup", handlekeypress)
})
