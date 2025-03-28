// Получаем доступ к canvas и контексту
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;
// Конфигурация игры
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
    alienDirection: 1, // 1 для движения вправо, -1 влево
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
    // Очистить экран
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Движение игрока
    playerX += playerDX;
    if (playerX < 0) playerX = 0;
    if (playerX + settings.playerWidth > canvas.width) playerX = canvas.width - settings.playerWidth;

    // Движение снарядов
    bullets.forEach(bullet => {
        bullet.y -= settings.bulletSpeed;
        if (bullet.y < 0) {
            bullets = bullets.filter(b => b !== bullet);
        }
    });

    // Движение пришельцев
    let edgeReached = false;
aliens.forEach(alien => {
    alien.x += settings.alienSpeed * settings.alienDirection;
    if (!edgeReached && 
        (alien.x + settings.alienWidth > canvas.width || alien.x < 0)) {
        edgeReached = true;
    }
});

if (edgeReached) {
    settings.alienDirection *= -1;
    aliens.forEach(a => a.y += 10);
    edgeReached = false;
}

    // Проверка на коллизии снарядов с пришельцами
    bullets.forEach(bullet => {
        aliens.forEach(alien => {
            if (bullet.x < alien.x + settings.alienWidth &&
                bullet.x + settings.bulletWidth > alien.x &&
                bullet.y < alien.y + settings.alienHeight &&
                bullet.y + settings.bulletHeight > alien.y) {
                // Удалить пришельца и снаряд
                aliens = aliens.filter(a => a !== alien);
                bullets = bullets.filter(b => b !== bullet);
                score += 10;
            }
        });
    });

    // Если все пришельцы уничтожены, создаем новый флот
    if (aliens.length === 0) {
        level++;
        createAliens();
    }

    // Отрисовка элементов
    drawPlayer();
    drawAliens();
    drawBullets();
    drawScore();
    
    // Рекурсивно вызываем игровой цикл
    requestAnimationFrame(gameLoop);
}

// Отрисовка игрока
function drawPlayer() {
    ctx.fillStyle = "#00FF00";
    ctx.fillRect(playerX, playerY, settings.playerWidth, settings.playerHeight);
}

// Отрисовка пришельцев
function drawAliens() {
    ctx.fillStyle = "#FF0000";
    aliens.forEach(alien => {
        ctx.fillRect(alien.x, alien.y, settings.alienWidth, settings.alienHeight);
    });
}

// Отрисовка снарядов
function drawBullets() {
    ctx.fillStyle = "#FFFF00";
    bullets.forEach(bullet => {
        ctx.fillRect(bullet.x, bullet.y, settings.bulletWidth, settings.bulletHeight);
    });
}

// Отрисовка счета
function drawScore() {
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${score}`, 10, 30);
    ctx.fillText(`Level: ${level}`, canvas.width - 100, 30);
}

// Создание нового флота пришельцев
function createAliens() {
    aliens = [];
    const numberOfAliens = 10;
    for (let i = 0; i < numberOfAliens; i++) {
        aliens.push({
            x: i * (settings.alienWidth + 10),
            y: 50,
        });
    }
}

// Управление игроком
function movePlayer(e) {
    // Движение вправо
    if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        playerDX = settings.playerSpeed;
    }
    
    // Движение влево
    if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        playerDX = -settings.playerSpeed;
    }
    
    // Стрельба (пробел, стрелка вверх, W)
    if (e.key === " " || e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
        fireBullet();
        e.preventDefault(); // Блокирует прокрутку страницы при стрельбе
    }
}

// Обработчик событий
window.addEventListener("keydown", movePlayer);
window.addEventListener("keyup", stopPlayerMovement);


// Инициализация игры
createAliens();
gameLoop();