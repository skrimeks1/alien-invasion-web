// Инициализация canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;
canvas.focus(); // Критически важно!

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

// Игровой цикл
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Обновление позиций
    playerX += playerDX;
    
    // Отрисовка
    drawPlayer();
    drawAliens();
    drawBullets();
    drawScore();
    
    requestAnimationFrame(gameLoop);
}

// Функции отрисовки (должны быть реализованы)
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

// Инициализация игры
function init() {
    createAliens();
    initControls();
    gameLoop();
}

// Запуск при полной загрузке страницы
window.addEventListener('load', init);