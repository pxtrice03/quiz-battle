import LEVELS from "./questions"

const CORRECT = 100
const WRONG = 25
const Q_KEYS = ["A", "B", "C", "D"]
const SCREENS = ["Start", "Rules", "Quiz", "Final"]

// helper functions
const byId = id => document.getElementById(id)
const show = name => SCREENS.forEach(s => {
    byId('screen' + s).hidden = s !== name
})

let qId = 0, levelId = 0
let score = 0, correct = 0
let results = [] // results[i] = { correct, total }

const newGame = () => {
    score = 0; results = [];
}
