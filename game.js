// Получаем canvas и контекст для рисования
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Пример отрисовки
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00FF00";
    ctx.fillRect(50, 50, 100, 100);
}

// Основной игровой цикл
function gameLoop() {
    draw();
    requestAnimationFrame(gameLoop);
}

// Запуск игры
gameLoop();