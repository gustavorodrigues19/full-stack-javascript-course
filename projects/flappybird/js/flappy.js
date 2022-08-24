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
    this.setX = () => this.barrierTwins.style.left = `${x}px`
    this.getWidth = () => this.barrierTwins.style.clientWidth

    this.sortSpaceBetween()
    this.setX(x)
}

function BarriersGenerator(height, width, spaceBetween, scoreNotification) {
    this.barriers = [
        new BarrierTwins(height, spaceBetween, width, scoreNotification),
        new BarrierTwins(height, spaceBetween, width, scoreNotification),
        new BarrierTwins(height, spaceBetween, width, scoreNotification),
        new BarrierTwins(height, spaceBetween, width, scoreNotification)
    ]
    const displacement = 3
    this.animate = () => {
        this.barriers.forEach(twin => {
            twin.setX(twin.getX() - displacement)

            if (twin.getX() < -twin.getWidth()) {
                twin.setX(twin.getX() + displacement * this.barriers.length)
                twin.sortSpaceBetween()

                const half = width / 2
                const crossHalf = twin.getX() + displacement >= half
                    && twin.getX() < half
                crossHalf && scoreNotification()
            }
        })
    }
}

const barriers = new BarriersGenerator(700, 1200, 200, 400)
const gameArea = document.querySelector('[wm-flappy]')
barriers.barriers.forEach(twin => gameArea.appendChild(twin.barrierTwins))

setInterval(() => {
    barriers.animate()
}, 20)