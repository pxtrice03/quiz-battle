const GAME = [
    {
        level: 0,
        time: 20,
        questions: [
            {
                q: "Completez la phrase: Une variable ...",
                a: ["Mets de cote", "Reserve", "Stocker", "Garder"],
                c: 2
            },
            {
                q: "Quelle instruction permet de creer une constante?",
                a: ["const", "let", "var", "constant"],
                c: 0
            },
            {
                q: "Un age est de quel type en JavaScript?",
                a: ["Entier", "Int", "Nombre", "Number"],
                c: 3
            }
        ]
    },
    {
        level: 1,
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
            },
            {
                q: "A quoi sert JavaScript?",
                a: ["Creer des jeux", "Changer les couleurs seul", "Rendre le site dynmique", "Faire disparaitre les elements"],
                c: 2
            },
        ]
    },
    {
        level: 2,
        time: 10,
        questions: [
            {
                q: "Que retourne la fonction sans return?",
                a: ["undefined", "null", "false", "0"],
                c: 0
            },
            {
                q: "Quelle methode permet de creer un nouveau tableau a partir d'un autre tableau?",
                a: ["console()", "map()", "push()", "forEach()"],
                c: 1
            },
            {
                q: "Quel operateur verifie la valeur et le type?",
                a: ["===", "==", "=", "!="],
                c: 0
            }
        ]
    }
]

const CORRECT = 100
const WRONG = 25
const Q_KEYS = ["A", "B", "C", "D"]
const SCREENS = ["Welcome", "Rules", "Quiz", "Final"]
const LVL_TIMERS = GAME.map(q => q.time)
// Difficulty keys: 0: Beginner, 1: Intemediate, 2: Difficult
const LVL_TITLE = ["Debutant", "Moyen", "Difficile"]

// helper functions
const byId = id => document.getElementById(id)

const show = name => SCREENS.forEach(s => {
    byId('screen' + s).classList.toggle('hidden', s !== name)
})

const shuffleArr = (array) => {
    const arr = array.slice()
    for(let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        [arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
}

// HTML Element
// SCREENS
const screenStart = byId("screenStart")
const screenRule = byId("screenRule")
const screenQuiz = byId("screenQuiz")
const screenFinal = byId("screenFinal")
// On Game Buttons
const gameWelcome = byId("gameWelcome")
const gameStart = byId("gameStart")
const replayBtn = byId("replay")
// Quiz Screen
const levelTitle = byId("levelTitle")
const questionCount = byId("questCount")
const xp = byId("xp")
const secText = byId("secs")
const question = byId("question")
const answers = byId("answers")
const feedback = byId("feedback")

let qId = 0, levelId = 0
// score & progress tracking
let score = 0, correctAnswers = 0, totalAnswerd = 0
let results = [] // results[i] = { correct, total }
let answered = false // prevents double-clicking or clicking after timeout
let currentLevel = 0
let currentQuestion = 0
let timer = null
let q
let answerd = false

// update timer bar
const startTimer = (seconds, barEl = byId("bar")) => {
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
const stopTimer = () => {}

const resetGame = () => {
    let score = 0, correctAnswers = 0, totalAnswerd = 0
    let currentLevel = 0
    let currentQuestion = 0
    let timer = null
}

const nextQuestion = () => {
    currentQuestion++
    if(currentQuestion < GAME[currentLevel].questions.length) {
        loadQuestion()
        return
    }
    currentLevel++
    currentQuestion = 0
    if(currentLevel < GAME.length) {
        loadQuestion()
    } else {
        showFinalScore()
    }
}

const showCorrectAnswer = (answerId) => {
    feedback.style.display = 'block'
    feedback.textContent = `Mauvaise reponse! -25 XP. Il fallait dire: ${q.a[answerId]}`
    setTimeout(() => {
        feedback.style.display = 'none'
    }, 2500);
    answers.querySelectorAll('button')[answerId].classList.add('correct')
}

const updateQuestionCount = () => {
    questionCount.innerHTML = ""
    const levelQuestTotal = GAME[currentLevel].questions.length
    totalAnswerd++
    questionCount.innerHTML = `Question: <strong>${totalAnswerd}</strong> sur <strong>${levelQuestTotal}</strong>`
}

const checkAnswer = (selectedBtnId, clickedBtn) => {
    if(answerd) return
    answerd = true

    q = GAME[currentLevel].questions[currentQuestion]

    // disable evry list element
    answers.querySelectorAll('button').forEach((b, i) => {
        if(i !== selectedBtnId) b.classList.add('disabled')
    })

    updateQuestionCount()

    if(selectedBtnId === q.c) {
        score += CORRECT
        clickedBtn.classList.add("correct")
        correctAnswers++
    } else {
        score = Math.max(0, score - WRONG)
        clickedBtn.classList.add("wrong")
        // show the correct answer
        showCorrectAnswer(q.c)
    }
    xp.textContent = `${score} XP`
    setTimeout(() => {
        answerd = false
        nextQuestion()
    }, 1500);
}

const resetTxts = () => {
    levelTitle.innerHTML = ""
    questionCount.innerHTML = ""
    question.innerHTML = ""
    answers.innerHTML = ""
}

const loadQuestion = () => {
    resetTxts()
    levelTitle.innerHTML = LVL_TITLE[currentLevel]
    const levelQuestTotal = GAME[currentLevel].questions.length
    questionCount.innerHTML = `Question: <strong>${totalAnswerd}</strong> sur <strong>${levelQuestTotal}</strong>`
    q = GAME[currentLevel].questions[currentQuestion]
    question.textContent = q.q
    // const shuffleAnswers = shuffleArr([...q.a])
    const ans = [...q.a]
    ans.forEach((a, i) => {
        const button = document.createElement('button')
        button.classList.add('answer')
        // button.dataset.key = Q_KEYS[i]
        button.setAttribute('data-key', Q_KEYS[i])
        button.classList.remove('correct', 'wrong')
        button.textContent = a
        button.addEventListener('click', (e) => checkAnswer(i, e.currentTarget))
        answers.appendChild(button)
    })
    timer = LVL_TIMERS[currentLevel]
    startTimer(timer)
}

const loadGame = () => {
    const startScreens = document.querySelectorAll('start')
    const rules = [
        `${GAME.length} niveaux, ${GAME[0].questions.length} questions chacun`,
        `+${CORRECT} XP par bonne reponse`,
        `-${WRONG} XP par erreur ou temps ecoule`
    ]
    const rulesEl = byId('rules')
    rulesEl.innerHTML = ""
    rules.forEach(r => {
        const li = document.createElement('li')
        li.classList.add('rule')
        li.textContent = r
        rulesEl.appendChild(li)
    })
}

const showFinalScore = () => {}

// GAME LOAD
document.addEventListener('DOMContentLoaded', () => {
    show("Welcome")
    gameWelcome.addEventListener('click', () => {
        show("Rules")
    })
    loadGame()
    gameStart.addEventListener('click', () => {
        show("Quiz")
        loadQuestion()
    })
})
