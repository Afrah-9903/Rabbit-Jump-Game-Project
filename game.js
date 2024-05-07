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
    }
  }

  document.addEventListener("keyup", handlekeypress)
})
