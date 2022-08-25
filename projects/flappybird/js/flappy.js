function createNewElement(tagName, className) {
    const elem = document.createElement(tagName)
    elem.className = className
    return elem
}

function Barrier(reverse = false) {
    this.barrierElement = createNewElement('div', 'barrier')
    
    const barrierBorder = createNewElement('div', 'barrier-border')
    const barrierBody = createNewElement('div', 'barrier-body')
    this.barrierElement.appendChild(reverse ? barrierBody : barrierBorder)
    this.barrierElement.appendChild(reverse ? barrierBorder : barrierBody)
    
    this.setHeight = barrierHeight => barrierBody.style.height = `${barrierHeight}px`
}

function BarrierTwins(height, spaceBetween, x) {
    this.barrierTwins = createNewElement('div', 'barrier-twins')
    
    this.topBarrier = new Barrier(true)
    this.bottomBarrier = new Barrier(false)

    this.barrierTwins.appendChild(this.topBarrier.barrierElement)
    this.barrierTwins.appendChild(this.bottomBarrier.barrierElement)

    this.sortSpaceBetween = () => {
        const topHeight = Math.random() * (height - spaceBetween)
        const bottomHeight = height - spaceBetween - topHeight
        this.topBarrier.setHeight(topHeight)
        this.bottomBarrier.setHeight(bottomHeight)
    }
    this.getX = () => parseInt(this.barrierTwins.style.left.split('px')[0])
    this.setX = (x) => this.barrierTwins.style.left = `${x}px`
    this.getWidth = () => this.barrierTwins.clientWidth

    this.sortSpaceBetween()
    this.setX(x)
}

function BarriersGenerator(height, width, spaceBetween, countScore) {
    this.barriers = [
        new BarrierTwins(height, spaceBetween, width),
        new BarrierTwins(height, spaceBetween, width + spaceBetween),
        new BarrierTwins(height, spaceBetween, width + spaceBetween * 2),
        new BarrierTwins(height, spaceBetween, width + spaceBetween * 3),
        new BarrierTwins(height, spaceBetween, width + spaceBetween * 4)
    ]
    const displacement = 3
    this.animate = () => {
        this.barriers.forEach(twin => {
            const newPositionX = twin.getX() - displacement
            twin.setX(newPositionX)

            if (twin.getX() < -twin.getWidth()) {
                twin.setX(twin.getX() + spaceBetween * this.barriers.length)
                twin.sortSpaceBetween()
            }

            const half = width / 2
            const crossHalf = twin.getX() + displacement >= half && twin.getX() < half
            if(crossHalf) countScore()
        })  
    }
}

function Bird(gameHeight) {
    let flying = false

    this.getElement = createNewElement('img', 'bird')
    this.getElement.src = 'imgs/bird.png'

    this.getY = () => parseInt(this.getElement.style.bottom.split('px')[0])
    this.setY = (y) => this.getElement.style.bottom = `${y}px`

    window.onkeydown = e => flying = true
    window.onkeyup = e => flying = false

    this.animate = () => {
        const newY = this.getY() + (flying ? 8 : -5)
        const maxHeight = gameHeight - this.getElement.clientHeight

        if (newY <= 0) {
            this.setY(0)
        } else if (newY >= maxHeight) {   
            this.setY(maxHeight)
        } else {
            this.setY(newY)
        }
    }

    this.setY(gameHeight / 2)
}

function Progress() {
    this.getElement = createNewElement('span', 'game-progress')
    this.updateScore = points => {
        this.getElement.innerHTML = points
    }
    this.updateScore(0)
}

function isOverlapping(elementA, elementB) {
    const a = elementA.getBoundingClientRect()
    const b = elementB.getBoundingClientRect()

    const horizontal = a.left + a.width >= b.left && b.left + b.width >= a.left
    const vertical = a.top + a.height >= b.top && b.top + b.height >= a.top

    return horizontal && vertical
}

function isCollision(bird, barriers) {
    let isCollision = false
    barriers.barriers.forEach(twin => {
        if (!isCollision) {
            const superior = twin.topBarrier.barrierElement
            const inferior = twin.bottomBarrier.barrierElement
            isCollision = isOverlapping(bird.getElement, superior) || isOverlapping(bird.getElement, inferior)
        }
    })
    return isCollision
}


function FlappyBird() {
    let points = 0

    const gameArea = document.querySelector('[wm-flappy]')
    const gameHeight = gameArea.clientHeight
    const gameWidth = gameArea.clientWidth

    const progress = new Progress()
    const barrierGenerator = new BarriersGenerator(gameHeight, gameWidth, 300, () => progress.updateScore(++points))
    const bird = new Bird(gameHeight)

    gameArea.appendChild(bird.getElement)
    gameArea.appendChild(progress.getElement)
    barrierGenerator.barriers.forEach(twin => gameArea.appendChild(twin.barrierTwins))

    this.start = () => {
        const timer = setInterval(() => {
            barrierGenerator.animate()
            bird.animate()

            if (isCollision(bird, barrierGenerator)) {
                clearTimeout(timer)
            }
        }, 20)
    }
}


new FlappyBird().start()