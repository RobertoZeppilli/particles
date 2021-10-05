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

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const numberOfParticles = Math.floor(Math.random() * 100)
const gradient = ctx.createLinearGradient(0, 0, canvas.height, canvas.width);

gradient.addColorStop(0, "#B5EAEA");
gradient.addColorStop(0.1, "#FFBCBC");
gradient.addColorStop(0.2, "#F38BA0");
gradient.addColorStop(0.3, "#EDF6E5");
gradient.addColorStop(0.4, "#FFDEFA");
gradient.addColorStop(0.5, "#C490E4");
gradient.addColorStop(0.6, "#A7C5EB");
gradient.addColorStop(0.7, "#CD5D7D");
gradient.addColorStop(0.8, "#FAFCC2");
gradient.addColorStop(0.9, "#DDF3F5");
gradient.addColorStop(1, "#F9F9F9");

let particles = [];

class Particle {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.size = Math.random() * 50 + 1 // to randomize
        this.weight = Math.random() * 10 + 1 // to randomize
        this.directionX = -3


    }

    update() {
        if (this.y > canvas.height) {
            this.y = 0 - this.size;
            this.weight = Math.random() * 10 + 1
            this.x = Math.random() * canvas.width * 1.3
        }
        this.weight += 0.05
        this.y += this.weight
        this.x += this.directionX

        if (this.x < title.x + title.width
            &&
            this.x + this.size > title.x
            &&
            this.y < title.y + title.height
            &&
            this.y + this.size > title.y) {
            this.y -= 3
            this.weight *= -0.5
        }
    }

    draw() {
        ctx.fillStyle = gradient
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
        
        particles.push(new Particle(x, y))
    }

    console.log(particles)
}

init();



const animate = () => {
    // const gradient = 
    ctx.fillStyle = 'rgba(255,255,255,0.7)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    for (i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()
    }
    // ctx.fillRect(title.x, title.y, title.width, title.height)
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