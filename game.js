// Получаем canvas и контекст для рисования
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Координаты игрока
let playerX = 400;
let playerY = 500;

// Отрисовка игрока
function drawPlayer() {
    ctx.fillStyle = "#00FF00"; // Зеленый цвет
    ctx.fillRect(playerX, playerY, 50, 50); // Квадрат 50x50
}

// Очистка экрана
function clearScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Основной игровой цикл
function gameLoop() {
    clearScreen();
    drawPlayer();
    requestAnimationFrame(gameLoop);
}

// Запуск игры
gameLoop();