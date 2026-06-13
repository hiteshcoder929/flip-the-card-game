let gameBody = document.querySelector(".game-body")
let restart = document.querySelector(".restart-btn")
let feedBack = document.querySelector(".feedback")


let items = ["A", "A", "B", "B", "C", "C"]
shuffle()

let first = null
let second = null
let lock = false
let matchCount = 0

function render() {
    gameBody.innerHTML = ""
    items.forEach((e) => {
        let div = document.createElement("div")
        div.classList.add("card")

        div.innerHTML = `
        <div class="inner-card">
                        <div class="front"></div>
                        <div class="back">${e}</div>
                    </div>
        `
        gameBody.appendChild(div)
    })
}

render()


gameBody.addEventListener("click", (e) => {
    let card = e.target.closest(".card")

    if (!card) return
    if (card.classList.contains("flip")) return

    card.classList.add("flip")

    if (!first) {
        first = card
        return
    }
    if (first == card) return
    second = card
    match()
})

function shuffle() {
    for (let i = items.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))

            ;[items[i], items[j]] = [items[j], items[i]]
    }
    items = items
}

function match() {
    let firstValue = first.querySelector(".back").innerText
    let secondValue = second.querySelector(".back").innerText

    if (firstValue === secondValue) {
        feedBack.innerText = "match"
        feedBack.style.color = "white"

        matchCount++
    } else {
        feedBack.innerText = "not match"
        feedBack.style.color = "red"
        first.classList.remove("flip")
        second.classList.remove("flip")
    }
    first = null
    second = null
    if(matchCount === items.length/2){
        feedBack.innerText = "you won🏆"
    }
}


restart.addEventListener("click", () => {
    shuffle()
    render()

    let card = document.querySelectorAll(".card ")
    card.forEach(element => {
        element.classList.remove("flip")
    });
    feedBack.innerText = "new game"
})

let dropdown = document.querySelector(".dropdown")
let selected = document.querySelector(".dropdown-selected")
let options = document.querySelector(".dropdown-options")

dropdown.addEventListener("click", () => {
  options.classList.toggle("active")
})

options.addEventListener("click", (e) => {
  if (e.target.classList.contains("dropdown-item")) {
    selected.innerText = e.target.innerText
    options.classList.add("active")
    if(selected.innerText === "Easy"){
        let items = ["A", "A", "B", "B", "C", "C"]
        shuffle()
        render()
    }else if(selected.innerText === "Medium"){
        let items = ["A", "A", "B", "B", "C", "C","D","D","E","E","F","F"]
        shuffle()
        render()
    }else if(selected.innerText === "Hard"){
        let items = ["A", "A", "B", "B", "C", "C","D","D","E","E","F","F","G","G","H","H","I","I"]
        shuffle()
        render()
    }
  }
})