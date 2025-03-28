// Инициализация canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;
canvas.focus();

// Настройки игры
const settings = {
    playerWidth: 50,
    playerHeight: 30,
    alienWidth: 50,
    alienHeight: 30,
    bulletWidth: 5,
    bulletHeight: 10,
    playerSpeed: 5,
    alienSpeed: 1,
    bulletSpeed: 5,
    alienDirection: 1,
    maxBullets: 3,
};

// Игровые переменные
let playerX = canvas.width / 2 - settings.playerWidth / 2;
let playerY = canvas.height - settings.playerHeight - 10;
let playerDX = 0;
let bullets = [];
let aliens = [];
let score = 0;
let level = 1;

// Создание пришельцев
function createAliens() {
    aliens = [];
    const rows = 4;
    const cols = 8;
    const offsetX = 50;
    const offsetY = 50;
    
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            aliens.push({
                x: c * (settings.alienWidth + 20) + offsetX,
                y: r * (settings.alienHeight + 20) + offsetY
            });
        }
    }
}

// Управление
function initControls() {
    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') playerDX = settings.playerSpeed;
        if (e.key === 'ArrowLeft') playerDX = -settings.playerSpeed;
        if (e.key === ' ' || e.key === 'w' || e.key === 'W' || e.key === 'ArrowUp') {
            fireBullet();
            e.preventDefault();
        }
    });
    
    window.addEventListener('keyup', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            playerDX = 0;
        }
    });
}

// Стрельба
function fireBullet() {
    if (bullets.length < settings.maxBullets) {
        bullets.push({
            x: playerX + settings.playerWidth / 2 - settings.bulletWidth / 2,
            y: playerY,
            width: settings.bulletWidth,
            height: settings.bulletHeight
        });
    }
}

// Движение пришельцев
function updateAliens() {
    let edgeReached = false;
    
    aliens.forEach(alien => {
        alien.x += settings.alienSpeed * settings.alienDirection;
        
        if (alien.x + settings.alienWidth > canvas.width || alien.x < 0) {
            edgeReached = true;
        }
    });
    
    if (edgeReached) {
        settings.alienDirection *= -1;
        aliens.forEach(alien => {
            alien.y += 20;
        });
    }
}

// Обновление пуль
function updateBullets() {
    bullets = bullets.filter(bullet => {
        bullet.y -= settings.bulletSpeed;
        return bullet.y > 0;
    });
}

// Проверка столкновений
function checkCollisions() {
    bullets.forEach((bullet, bIndex) => {
        aliens.forEach((alien, aIndex) => {
            if (bullet.x < alien.x + settings.alienWidth &&
                bullet.x + settings.bulletWidth > alien.x &&
                bullet.y < alien.y + settings.alienHeight &&
                bullet.y + settings.bulletHeight > alien.y) {
                
                aliens.splice(aIndex, 1);
                bullets.splice(bIndex, 1);
                score += 10;
                
                if (aliens.length === 0) {
                    level++;
                    createAliens();
                }
            }
        });
    });
}

// Отрисовка
function drawPlayer() {
    ctx.fillStyle = "#00FF00";
    ctx.fillRect(playerX, playerY, settings.playerWidth, settings.playerHeight);
}

function drawAliens() {
    ctx.fillStyle = "#FF0000";
    aliens.forEach(alien => {
        ctx.fillRect(alien.x, alien.y, settings.alienWidth, settings.alienHeight);
    });
}

function drawBullets() {
    ctx.fillStyle = "#FFFF00";
    bullets.forEach(bullet => {
        ctx.fillRect(bullet.x, bullet.y, settings.bulletWidth, settings.bulletHeight);
    });
}

function drawScore() {
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${score}`, 10, 30);
    ctx.fillText(`Level: ${level}`, canvas.width - 100, 30);
}

// Игровой цикл
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Обновление
    playerX += playerDX;
    playerX = Math.max(0, Math.min(canvas.width - settings.playerWidth, playerX));
    updateAliens();
    updateBullets();
    checkCollisions();
    
    // Отрисовка
    drawPlayer();
    drawAliens();
    drawBullets();
    drawScore();
    
    requestAnimationFrame(gameLoop);
}

// Запуск игры
function init() {
    createAliens();
    initControls();
    gameLoop();
}

window.addEventListener('load', init);