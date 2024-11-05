document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    const restartButton = document.getElementById("restartGame");
    const messageElement = document.getElementById("message");
    let player = { x: 40, y: 40, size: 40, color: "red" };
    const blockSize = canvas.width / 10;
    const maze = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 1, 0, 0, 1],
        [1, 0, 1, 1, 1, 0, 1, 0, 1, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];

    function startGame() {
        document.addEventListener("keydown", movePlayer);
        drawMaze();
        drawPlayer();
        messageElement.textContent = "화면의 미로에서 캐릭터를 움직여 탈출하세요!";
    }

    function drawMaze() {
        for (let row = 0; row < maze.length; row++) {
            for (let col = 0; col < maze[row].length; col++) {
                if (maze[row][col] === 1) {
                    ctx.fillStyle = "#000";
                    ctx.fillRect(col * blockSize, row * blockSize, blockSize, blockSize);
                }
            }
        }
    }

    function drawPlayer() {
        ctx.fillStyle = player.color;
        ctx.fillRect(player.x, player.y, player.size, player.size);
    }

    function movePlayer(event) {
        let newX = player.x;
        let newY = player.y;
        if (event.key === "ArrowUp") {
            newY -= blockSize;
        } else if (event.key === "ArrowDown") {
            newY += blockSize;
        } else if (event.key === "ArrowLeft") {
            newX -= blockSize;
        } else if (event.key === "ArrowRight") {
            newX += blockSize;
        }

        // Check if the new position is within bounds and not a wall
        const row = Math.floor(newY / blockSize);
        const col = Math.floor(newX / blockSize);
        if (maze[row] && maze[row][col] === 0) {
            player.x = newX;
            player.y = newY;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawMaze();
            drawPlayer();
        }

        // Check if player has reached the exit
        if (row === maze.length - 1 && col === maze[0].length - 1) {
            messageElement.textContent = "축하합니다! 미로를 탈출하셨습니다!";
            document.removeEventListener("keydown", movePlayer); // 게임 종료 후 이동 방지
        }
    }

    restartButton.addEventListener("click", function() {
        player.x = 40;
        player.y = 40;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        startGame();
    });

    startGame();
});
