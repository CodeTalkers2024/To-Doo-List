// Login Functionality
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const error = document.getElementById('error');

    if (username === 'sneha123' && password === 'kjc123') {
        document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('todoContainer').style.display = 'flex';
    } else {
        error.textContent = 'Invalid username or password';
    }
}

// Adding a Task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText === '') return;

    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    li.innerHTML = `
        <input type="checkbox" onclick="toggleTask(this)">
        <span>${taskText}</span>
        <button onclick="removeTask(this)">Remove</button>`;
    taskList.appendChild(li);
    taskInput.value = '';
}

// Removing a Task
function removeTask(button) {
    const taskList = document.getElementById('taskList');
    taskList.removeChild(button.parentElement);
}

// Toggling Task Completion
function toggleTask(checkbox) {
    const task = checkbox.nextElementSibling;
    if (checkbox.checked) {
        task.style.textDecoration = 'line-through';
    } else {
        task.style.textDecoration = 'none';
    }
}

// Check if All Tasks are Completed
function checkCompletion() {
    const tasks = document.querySelectorAll('#taskList li input[type="checkbox"]');
    let allCompleted = true;

    tasks.forEach(task => {
        if (!task.checked) {
            allCompleted = false;
        }
    });

    if (allCompleted) {
        document.getElementById('goodJobMessage').style.display = 'block';
        document.getElementById('incompleteMessage').style.display = 'none';
        triggerConfetti();
    } else {
        document.getElementById('goodJobMessage').style.display = 'none';
        document.getElementById('incompleteMessage').style.display = 'block';
        triggerSadEmojis();
    }
}

// Confetti Effect with Party Popper
function triggerConfetti() {
    const confettiCanvas = document.getElementById('confetti');
    const ctx = confettiCanvas.getContext('2d');
    const confettiPieces = [];
    const confettiCount = 100;

    // Resize canvas
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;

    // Create confetti pieces
    for (let i = 0; i < confettiCount; i++) {
        confettiPieces.push({
            x: Math.random() * confettiCanvas.width,
            y: Math.random() * confettiCanvas.height,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            size: Math.random() * 6 + 2,
            speed: Math.random() * 5 + 1
        });
    }

    function drawConfetti() {
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

        confettiPieces.forEach(piece => {
            ctx.fillStyle = piece.color;
            ctx.beginPath();
            ctx.arc(piece.x, piece.y, piece.size, 0, Math.PI * 2);
            ctx.fill();

            piece.y += piece.speed;
            if (piece.y > confettiCanvas.height) {
                piece.y = 0;
                piece.x = Math.random() * confettiCanvas.width;
            }
        });

        requestAnimationFrame(drawConfetti);
    }

    drawConfetti();

    setTimeout(() => {
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }, 5000);
}

// Sad Emoji Animation
function triggerSadEmojis() {
    const incompleteMessage = document.getElementById('incompleteMessage');
    incompleteMessage.innerHTML = '😔😔😔 Try to do better next time!';

    incompleteMessage.style.fontSize = '50px';
    incompleteMessage.style.animation = 'fall 2s infinite';

    setTimeout(() => {
        incompleteMessage.innerHTML = '😔 Try to do better next time!';
        incompleteMessage.style.animation = '';
    }, 5000);
}
