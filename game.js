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
    } else if (event.key === " ") { // Пробел для стрельбы
        bullets.push({
            x: playerX + playerWidth / 2 - bulletWidth / 2,
            y: playerY,
            width: bulletWidth,
            height: bulletHeight
        });
        console.log("Снаряд выпущен:", bullets); // Отладочное сообщение
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
}

// Снаряды
const bullets = [];
const bulletWidth = 5;
const bulletHeight = 15;
const bulletSpeed = 7;

// Отрисовка снарядов
function drawBullets() {
    ctx.fillStyle = "#FFFF00"; // Желтый цвет
    bullets.forEach(bullet => {
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });
}

// Движение снарядов
function moveBullets() {
    bullets.forEach((bullet, index) => {
        bullet.y -= bulletSpeed;

        // Удаляем снаряд, если он вышел за пределы экрана
        if (bullet.y + bullet.height < 0) {
            bullets.splice(index, 1);
        }
    });
}

let score = 0;

// Проверка столкновений
function checkCollisions() {
    for (let i = bullets.length - 1; i >= 0; i--) {
        for (let j = aliens.length - 1; j >= 0; j--) {
            const bullet = bullets[i];
            const alien = aliens[j];
            if (bullet.x < alien.x + alien.width &&
                bullet.x + bullet.width > alien.x &&
                bullet.y < alien.y + alien.height &&
                bullet.y + bullet.height > alien.y) {
                // Уничтожение пришельца и снаряда
                aliens.splice(j, 1);
                bullets.splice(i, 1);
                score += 10; // Увеличиваем счет
                console.log("Пришелец уничтожен! Счет:", score); // Отладочное сообщение
                break; // Прерываем внутренний цикл, так как снаряд уже уничтожен
            }
        }
    }
}

// Отрисовка счета
function drawScore() {
    ctx.fillStyle = "#FFFFFF"; // Белый цвет
    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${score}`, 10, 30);
}

let gameOver = false;

// Проверка конца игры
function checkGameOver() {
    aliens.forEach(alien => {
        if (alien.y + alien.height > playerY) {
            gameOver = true;
        }
    });
}

// Основной игровой цикл
function gameLoop() {
    if (gameOver) {
        ctx.fillStyle = "#FFFFFF"; // Белый цвет
        ctx.font = "40px Arial";
        ctx.fillText("Game Over!", canvas.width / 2 - 100, canvas.height / 2);
        return; // Останавливаем игровой цикл
    }

    clearScreen();
    drawPlayer();
    drawAliens();
    drawBullets();
    drawScore();
    moveAliens();
    moveBullets();
    checkCollisions();
    checkGameOver();
    requestAnimationFrame(gameLoop);
}

// Инициализация игры
createAliens();
gameLoop();