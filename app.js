const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
let time = 0
let score = 0
//создаем массив с цветами
const colors = ['#ffff', '#dda0faf8', '#a0fafaf8', '#c2faa0f8', '#faa6a0f8', '#fa5faaf8']

//добавляем прослушку на кнопку, отменили "хреф"
startBtn.addEventListener('click', (event) => {
  event.preventDefault()
  //убираем при клике первый экран
  screens[0].classList.add('up')
})

//добавим слушателья на всю доску клик только по кружку
board.addEventListener('click', event => {
  //проверяем клик по кружку
  if (event.target.classList.contains('circle')){
    score++
    event.target.remove()
    createrandomCircle()
  }
}) 

//слушаем конкретную кнопку в блоке и полуаем ее значение data-time и оборачиваем в парсинт чтобы получить число а не строчку. и все помещаем в переменную time
timeList.addEventListener('click', event => {
  if (event.target.classList.contains ('time-btn')) {
    time = parseInt(event.target.getAttribute('data-time'))
    screens[1].classList.add('up')
    //вызываем ф-цию старт гейм
    startGame()
  }
})

function startGame() {
  setInterval(decreaseTime, 1000)
  createrandomCircle()
  //помещаем выбранное время в счетчик
  setTime(time)
}

function decreaseTime() {
  if (time === 0) {
    finishGame()
  } else {
    let current = --time
    if (current < 10) {
      current = `0${current}`
    }
    setTime(current)
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`
}

function finishGame() {
  timeEl.parentNode.classList.add('hide')
  board.innerHTML = `<h1>Счет: <span class="primary">${score}</span><h1>`
}

//создаем ф-цию для создания рандомных кружков и обработки кликов по ним
function createrandomCircle() {
  const circle = document.createElement('div')
  const size = getRandomNumber(10, 60)
  //вытаскиваем габарит поля
  const {width, height} = board.getBoundingClientRect()
  const x = getRandomNumber(0, width - size)
  const y = getRandomNumber(0, height - size)
  const color = getRandomColor()

  circle.classList.add('circle')
  //создаем размер кружочка
  circle.style.width = `${size}px`
  circle.style.height = `${size}px`
  //создаем положение кружка
  circle.style.top = `${y}px`
  circle.style.left = `${x}px`

  circle.style.background = color
  circle.style.boxShadow = `0 0 5px ${color}, 0 0 5px ${color}`

  board.append(circle)
}

//ф-ция для создания рандомного размера для кружка в диапазоне
function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

//функция сдля случайного выбора цвета
function getRandomColor() {
  const index = Math.floor(Math.random() * colors.length)
  return colors[index]
}
