const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d')
const text = document.getElementById('text')

let textMeasurements = text.getBoundingClientRect()
let title = {
    x: textMeasurements.left,
    y: textMeasurements.top,
    width: textMeasurements.width,
    height: 10
}



let colors = [
    "#B5EAEA",
    "#FFBCBC",
    "#F38BA0",
    "#EDF6E5",
    "#FFDEFA",
    "#C490E4",
    "#A7C5EB",
    "#CD5D7D",
    "#FAFCC2",
    "#DDF3F5",
    "#F9F9F9"
]
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const numberOfParticles = Math.floor(Math.random() * 300)


let particles = [];

class Particle {
    constructor(x, y, color) {
        this.x = x
        this.y = y
        this.color = color
        this.size = Math.random() * 10 + 1 // to randomize
        this.weight = Math.random() * 10 + 1 // to randomize
        this.directionX = Math.random() * -5
    }

    update() {
        if (this.y > canvas.height) {
            this.y = 0 - this.size;
            this.weight = Math.random() * 10 + 1
            this.x = Math.random() * canvas.width * 1.3
        }
        this.weight += 0.01
        this.y += this.weight
        this.x += this.directionX

        if (this.x < title.x + title.width
            &&
            this.x + this.size > title.x
            &&
            this.y < title.y + title.height
            &&
            this.y + this.size > title.y) {
            this.y -= Math.random() * 5 + 3
            // this.x += Math.random() * 5 + 3
            this.weight *= -0.5
        }

        
    }

    draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()
    }
}

const init = () => {
    particles = [];
    for (i = 0; i < numberOfParticles; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const color = colors[Math.floor(Math.random() * colors.length)]

        
        particles.push(new Particle(x, y, color))

        
    }

    // console.log(particles)
}

init();



const animate = () => {
    // const gradient = 
    ctx.fillStyle = 'rgba(0,0,0)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    for (i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()
    }
  
    requestAnimationFrame(animate)
}

animate();

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    textMeasurements = text.getBoundingClientRect()
    title = {
        x: textMeasurements.left,
        y: textMeasurements.top,
        width: textMeasurements.width,
        height: 10
    }
    init()
})