// Получаем canvas и контекст для рисования
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Координаты игрока
let playerX = 400;
let playerY = 500;
const playerSpeed = 5;
const playerWidth = 50;
const playerHeight = 50;

// Отрисовка игрока
function drawPlayer() {
    ctx.fillStyle = "#00FF00"; // Зеленый цвет
    ctx.fillRect(playerX, playerY, playerWidth, playerHeight); // Квадрат 50x50
}

// Очистка экрана
function clearScreen() {
    ctx.fillStyle = "#000000"; // Черный цвет
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Заливка экрана черным
}

// Обработка нажатий клавиш
document.addEventListener("keydown", (event) => {
    console.log("Key pressed:", event.key); // Отладочное сообщение
    if (event.key === "ArrowLeft") {
        playerX = Math.max(0, playerX - playerSpeed); // Не выходит за левую границу
    } else if (event.key === "ArrowRight") {
        playerX = Math.min(canvas.width - playerWidth, playerX + playerSpeed); // Не выходит за правую границу
    }
});

// Основной игровой цикл
function gameLoop() {
    clearScreen();
    drawPlayer();
    requestAnimationFrame(gameLoop);
}

// Запуск игры
gameLoop();