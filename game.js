const LEVELS = [
    {
        name: "Beginner",
        time: 20,
        questions: [
            {
                q: "Une variable ...",
                a: ["Mets de cote", "Reserve", "Stocke", "REserve"],
                c: 2
            }
        ]
    },
    {
        name: "Intermediate",
        time: 15,
        questions: [
            {
                q: "A quoi sert Figma?",
                a: ["Le design", "Dessiner", "Les montages", "Editer"],
                c: 0
            }
        ]
    },
    {
        name: "Expert",
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

// helper functions
const byId = id => document.getElementById(id)
const show = name => SCREENS.forEach(s => {
    byId('screen' + s).hidden = s !== name
})

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
            barEl.style.backgroundColor = 'var(--wrong)'
        }
        seconds--
        setTimeout(tick, 1000)
    }
    tick()
}

// GAME LOAD
document.addEventListener('DOMContentLoaded', () => {
    startCountdown(10)
})
