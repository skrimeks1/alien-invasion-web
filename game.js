// Получаем canvas и контекст для рисования
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Координаты игрока
let playerX = 400;
let playerY = 500;
const playerSpeed = 5;
const playerWidth = 50;
const playerHeight = 50;

// Пришельцы
const aliens = [];
const alienWidth = 40;
const alienHeight = 40;
const alienSpeed = 2;

// Создаем пришельцев
function createAliens() {
    for (let i = 0; i < 10; i++) {
        aliens.push({
            x: i * 60 + 50,
            y: 50,
            width: alienWidth,
            height: alienHeight,
            direction: 1 // 1 - вправо, -1 - влево
        });
    }
    console.log("Пришельцы созданы:", aliens); // Отладочное сообщение
}

// Отрисовка игрока
function drawPlayer() {
    ctx.fillStyle = "#00FF00"; // Зеленый цвет
    ctx.fillRect(playerX, playerY, playerWidth, playerHeight); // Квадрат 50x50
}

// Отрисовка пришельцев
function drawAliens() {
    ctx.fillStyle = "#FF0000"; // Красный цвет
    aliens.forEach(alien => {
        console.log("Отрисовка пришельца:", alien); // Отладочное сообщение
        ctx.fillRect(alien.x, alien.y, alien.width, alien.height);
    });
}

// Очистка экрана
function clearScreen() {
    ctx.fillStyle = "#000000"; // Черный цвет
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Заливка экрана черным
}

// Обработка нажатий клавиш
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
        playerX = Math.max(0, playerX - playerSpeed); // Не выходит за левую границу
    } else if (event.key === "ArrowRight") {
        playerX = Math.min(canvas.width - playerWidth, playerX + playerSpeed); // Не выходит за правую границу
    }
});

// Движение пришельцев
function moveAliens() {
    aliens.forEach(alien => {
        alien.x += alienSpeed * alien.direction;

        // Если пришелец дошел до края экрана, меняем направление
        if (alien.x + alien.width > canvas.width || alien.x < 0) {
            alien.direction *= -1;
            alien.y += 20; // Сдвигаем пришельцев вниз
        }
    });
    console.log("Пришельцы двигаются:", aliens); // Отладочное сообщение
}

// Основной игровой цикл
function gameLoop() {
    clearScreen();
    drawPlayer();
    drawAliens();
    moveAliens();
    requestAnimationFrame(gameLoop);
}

// Инициализация игры
createAliens();
gameLoop();