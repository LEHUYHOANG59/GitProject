const canvas = document.getElementById('gameBoard');
const ctx = canvas.getContext('2d');

// Các đối tượng và biến
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    dx: 3, // Tăng tốc mượt hơn
    dy: -3,
    radius: 10
};
const bar = {
    x: canvas.width / 2 - 50,
    y: canvas.height - 20,
    width: 100,
    height: 10,
    speed: 5, // Tốc độ di chuyển thanh bar
    moveLeft: false,
    moveRight: false
};

// Hàm vẽ các đối tượng
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Vẽ bóng
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();

    // Vẽ thanh bar
    ctx.beginPath();
    ctx.rect(bar.x, bar.y, bar.width, bar.height);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}

// Hàm cập nhật vị trí của các đối tượng
function update() {
    // Cập nhật vị trí của bóng
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Va chạm với các cạnh canvas
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx = -ball.dx; // Đổi hướng ngang
    }
    if (ball.y - ball.radius < 0) {
        ball.dy = -ball.dy; // Đổi hướng dọc
    }

    // Kiểm tra nếu bóng va chạm thanh bar
    if (
        ball.y + ball.radius > bar.y &&
        ball.x > bar.x &&
        ball.x < bar.x + bar.width
    ) {
        ball.dy = -ball.dy; // Đổi hướng dọc
    }

    // Kiểm tra nếu bóng rơi khỏi thanh bar
    if (ball.y - ball.radius > canvas.height) {
        alert("Game Over!");
        document.location.reload(); // Reload lại game
    }

    // Di chuyển thanh bar
    if (bar.moveLeft && bar.x > 0) {
        bar.x -= bar.speed;
    }
    if (bar.moveRight && bar.x + bar.width < canvas.width) {
        bar.x += bar.speed;
    }
}

// Xử lý phím điều khiển thanh bar
document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") {
        bar.moveLeft = true;
    } else if (e.key === "ArrowRight") {
        bar.moveRight = true;
    }
});

document.addEventListener("keyup", function (e) {
    if (e.key === "ArrowLeft") {
        bar.moveLeft = false;
    } else if (e.key === "ArrowRight") {
        bar.moveRight = false;
    }
});

// Vòng lặp game
function gameLoop() {
    draw();
    update();
    requestAnimationFrame(gameLoop);
}

// Bắt đầu trò chơi
gameLoop();
