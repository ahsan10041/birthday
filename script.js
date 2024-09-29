const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Firework {
    constructor(x, y, radius, color, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.speedX = speedX;
        this.speedY = speedY;
        this.alpha = 1;
        this.fade = Math.random() * 0.01 + 0.01;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= this.fade;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }
}

class FireworkExplosion {
    constructor(x, y) {
        this.particles = [];
        this.createExplosion(x, y);
    }

    createExplosion(x, y) {
        const particleCount = Math.random() * 50 + 50;
        const angleIncrement = (Math.PI * 2) / particleCount;
        for (let i = 0; i < particleCount; i++) {
            const speed = Math.random() * 3 + 1;
            const speedX = Math.cos(angleIncrement * i) * speed;
            const speedY = Math.sin(angleIncrement * i) * speed;
            const radius = Math.random() * 2 + 1;
            const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
            this.particles.push(new Firework(x, y, radius, color, speedX, speedY));
        }
    }

    update() {
        this.particles.forEach((particle, index) => {
            particle.update();
            if (particle.alpha <= 0) {
                this.particles.splice(index, 1);
            }
        });
    }

    draw() {
        this.particles.forEach(particle => particle.draw());
    }
}

const fireworks = [];

function createFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    fireworks.push(new FireworkExplosion(x, y));
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fireworks.forEach((firework, index) => {
        firework.update();
        firework.draw();
        if (firework.particles.length === 0) {
            fireworks.splice(index, 1);
        }
    });
    requestAnimationFrame(animate);
}

setInterval(createFirework, 800);  // Create a new firework every 800ms
animate();

// Resize canvas if the window size changes
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
