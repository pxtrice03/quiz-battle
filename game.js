const LEVELS = [
    {
        nameId: 0,
        time: 20,
        questions: [
            {
                q: "Une variable ...",
                a: ["Mets de cote", "Reserve", "Stocke", "Reserve"],
                c: 2
            },
            {
                q: "A quoi sert JavaScript?",
                a: ["Creer des jeux", "Changer les couleurs seul", "Rendre le site dynmique", "Faire disparaitre les elements"],
                c: 2
            }
        ]
    },
    {
        nameId: 1,
        time: 15,
        questions: [
            {
                q: "A quoi sert Figma?",
                a: ["Le design", "Dessiner", "Les montages", "Editer"],
                c: 0
            },
            {
                q: "Quel est le principale usage de GitHub?",
                a: ["Garder du code", "Stoker les donnees", "Coder", "Collaborer & partage du code"],
                c: 3
            }
        ]
    },
    {
        nameId: 2,
        time: 10,
        questions: [
            {
                q: ""
            }
        ]
    }
]

const CORRECT = 100
const WRONG = 25
const Q_KEYS = ["A", "B", "C", "D"]
const SCREENS = ["Start", "Rules", "Quiz", "Final"]
const L_TITLES = ["Debutant", "Intermediare", "Expert"]

// helper functions
const byId = id => document.getElementById(id)

const show = name => SCREENS.forEach(s => {
    byId('screen' + s).hidden = s !== name
})

const shuffleArr = (array) => {
    const arr = array.slice()
    for(let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        [arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
}

let qId = 0, levelId = 0
let score = 0, correct = 0
let results = [] // results[i] = { correct, total }

const secText = byId("secs")

// update timer bar
const startCountdown = (seconds, barEl = byId("bar")) => {
    const total = seconds
    const tick = () => {
        const quarterTime = 1 / 4 * total // 1/4 of seconds
        barEl.style.width = (seconds / total * 100) + '%'
        secText.textContent = seconds + 's'
        if(seconds <= 0) return
        if(seconds == Math.round(quarterTime)) {
            secText.style.color = 'var(--wrong)'
            barEl.style.backgroundColor = 'var(--wrong-bg)'
        }
        seconds--
        setTimeout(tick, 1000)
    }
    tick()
}

// GAME LOAD
document.addEventListener('DOMContentLoaded', () => {
    // startCountdown(10)
    console.log(LEVELS[0].questions[0].a)
})
