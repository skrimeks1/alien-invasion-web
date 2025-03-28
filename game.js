// Инициализация игры
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');

canvas.width = 800;
canvas.height = 600;
canvas.focus();

// Настройки игры
const settings = {
    playerWidth: 50,
    playerHeight: 30,
    alienWidth: 40,
    alienHeight: 40,
    bulletWidth: 5,
    bulletHeight: 15,
    playerSpeed: 8,
    alienSpeed: 1,
    bulletSpeed: 7,
    alienRows: 4,
    alienCols: 8,
    alienPadding: 20
};

// Состояние игры
let playerX = canvas.width / 2 - settings.playerWidth / 2;
let playerY = canvas.height - settings.playerHeight - 20;
let playerDX = 0;
let bullets = [];
let aliens = [];
let score = 0;
let gameOver = false;
let alienDirection = 1;
let alienDropDistance = 20;

// Создание пришельцев
function createAliens() {
    aliens = [];
    for (let r = 0; r < settings.alienRows; r++) {
        for (let c = 0; c < settings.alienCols; c++) {
            aliens.push({
                x: c * (settings.alienWidth + settings.alienPadding) + 50,
                y: r * (settings.alienHeight + settings.alienPadding) + 50,
                width: settings.alienWidth,
                height: settings.alienHeight
            });
        }
    }
}

// Управление
function handleKeyDown(e) {
    if (e.key === 'ArrowRight') playerDX = settings.playerSpeed;
    if (e.key === 'ArrowLeft') playerDX = -settings.playerSpeed;
    if (e.key === ' ' || e.key === 'Space') {
        fireBullet();
        e.preventDefault();
    }
}

function handleKeyUp(e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        playerDX = 0;
    }
}

// Стрельба
function fireBullet() {
    if (bullets.length < 5) { // Максимум 5 пуль на экране
        bullets.push({
            x: playerX + settings.playerWidth / 2 - settings.bulletWidth / 2,
            y: playerY,
            width: settings.bulletWidth,
            height: settings.bulletHeight
        });
    }
}

// Обновление игры
function update() {
    if (gameOver) return;

    // Движение игрока
    playerX += playerDX;
    playerX = Math.max(0, Math.min(canvas.width - settings.playerWidth, playerX));

    // Движение пуль
    bullets.forEach(bullet => bullet.y -= settings.bulletSpeed);
    bullets = bullets.filter(bullet => bullet.y > 0);

    // Движение пришельцев
    let edgeReached = false;
    aliens.forEach(alien => {
        alien.x += settings.alienSpeed * alienDirection;
        if (alien.x + settings.alienWidth > canvas.width || alien.x < 0) {
            edgeReached = true;
        }
    });

    if (edgeReached) {
        alienDirection *= -1;
        aliens.forEach(alien => alien.y += alienDropDistance);
    }

    // Проверка столкновений
    checkCollisions();

    // Проверка конца игры
    if (aliens.some(alien => alien.y + settings.alienHeight >= playerY) || aliens.length === 0) {
        gameOver = true;
        setTimeout(() => {
            alert(aliens.length === 0 ? 'You Win! Score: ' + score : 'Game Over! Score: ' + score);
            resetGame();
        }, 100);
    }
}

function checkCollisions() {
    // Пули с пришельцами
    bullets.forEach((bullet, bIndex) => {
        aliens.forEach((alien, aIndex) => {
            if (bullet.x < alien.x + alien.width &&
                bullet.x + bullet.width > alien.x &&
                bullet.y < alien.y + alien.height &&
                bullet.y + bullet.height > alien.y) {
                
                aliens.splice(aIndex, 1);
                bullets.splice(bIndex, 1);
                score += 10;
                scoreElement.textContent = 'Score: ' + score;
                return;
            }
        });
    });
}

// Отрисовка
function draw() {
    // Очистка экрана
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Игрок
    ctx.fillStyle = '#4CAF50';
    ctx.fillRect(playerX, playerY, settings.playerWidth, settings.playerHeight);

    // Пришельцы
    ctx.fillStyle = '#FF5722';
    aliens.forEach(alien => {
        ctx.fillRect(alien.x, alien.y, alien.width, alien.height);
    });

    // Пули
    ctx.fillStyle = '#FFEB3B';
    bullets.forEach(bullet => {
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });
}

// Сброс игры
function resetGame() {
    playerX = canvas.width / 2 - settings.playerWidth / 2;
    playerY = canvas.height - settings.playerHeight - 20;
    playerDX = 0;
    bullets = [];
    score = 0;
    gameOver = false;
    alienDirection = 1;
    scoreElement.textContent = 'Score: 0';
    createAliens();
}

// Игровой цикл
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Инициализация
function init() {
    createAliens();
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    canvas.addEventListener('click', () => canvas.focus());
    gameLoop();
}

// Запуск игры при загрузке страницы
window.addEventListener('load', init);