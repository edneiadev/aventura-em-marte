// =======================
// VARIÁVEIS GLOBAIS
// =======================

let soundEnabled = true;
let installPrompt = null;
let currentScreen = 'home';
let currentNarrative = 0;
let currentLevel = 0;
let currentQuestion = 0;
let correctAnswers = 0;
let gameTimer = null;
let timeRemaining = 0;
let timerInterval = null;

// Audio Context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let backgroundMusic = null;
let soundEffects = {};

// Game Data
const narratives = [
    { text: 'Vocês são jovens cadetes da Academia Estelar, enviados para explorar o planeta Marte.', image: 'assets/images/narrativa-1.jpg' },
    { text: 'Durante a viagem, um campo magnético misterioso desvia a nave, deixando a tripulação presa em uma enorme nebulosa.', image: 'assets/images/narrativa-2.jpg' },
    { text: 'Agora vocês têm que encarar altos desafios para consertar a nave, escapar da nebulosa e continuar a missão.', image: 'assets/images/narrativa-3.jpg' }
];

const level1Questions = [
    { number: 9, answers: ['4 + 5', '6 + 2', '5 + 3', '8 + 0'], correct: 0 },
    { number: 10, answers: ['4 + 5', '6 + 2', '5 + 3', '8 + 2'], correct: 3 },
    { number: 8, answers: ['4 + 5', '6 + 3', '5 + 3', '8 + 1'], correct: 2 },
    { number: 14, answers: ['6 + 5', '6 + 3', '7 + 7', '8 + 0'], correct: 2 },
    { number: 15, answers: ['9 + 5', '7 + 8', '8 + 8', '8 + 4'], correct: 1 }
];

const level1LightColors = [
    '#ff6b6b', '#ff9f43', '#feca57', '#1dd1a1', '#54a0ff',
    '#5f27cd', '#ee5253', '#00d2d3', '#ff9ff3', '#48dbfb',
    '#10ac84', '#f368e0', '#ffb142', '#7bed9f', '#70a1ff'
];

const level2Questions = [
    {
        grid: [
            [' ', ' ', ' ', ' ', '☀️'],
            [' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' '],
            [' ', '⭐', ' ', ' ', '🌜'],
            [' ', ' ', ' ', ' ', ' ']
        ],
        question: 'Se o astronauta andar 3 casas para cima e 2 casas para a esquerda, ele vai ficar na mesma posição do(a):',
        answers: ['SOL', 'LUA', 'ASTEROIDE', 'ESTRELA'],
        correct: 3
    },
    {
        grid: [
            [' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' '],
            [' ', ' ', '🌟', ' ', ' ']
        ],
        question: 'Qual é a localização da estrela Alfa?',
        answers: ['A1', 'D5', 'B5', 'C3'],
        correct: 2
    },
    {
        grid: [
            [' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' '],
            [' ', ' ', '🚀', ' ', ' ']
        ],
        question: 'Se o foguete avançar 4 casas para cima e 2 casas à direita, em que posição ele vai ficar?',
        answers: ['A4', 'D5', 'B4', 'A5'],
        correct: 3
    },
    {
        grid: [
            [' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' '],
            ['🧑‍🚀', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ']
        ],
        question: 'Qual é a posição do astronauta?',
        answers: ['A4', 'A3', 'C4', 'B1'],
        correct: 0
    },
    {
        grid: [
            [' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' '],
            ['🧑‍🚀', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ']
        ],
        question: 'Se o astronauta avançar duas casas para baixo e três casas à esquerda, ele vai ficar em qual posição?',
        answers: ['A3', 'D1', 'C1', 'B1'],
        correct: 2
    }
];

const level3Questions = [
    { question: 'Qual das operações abaixo deixa o tanque 100% cheio?', answers: ['55 + 45', '55 + 55', '45 + 45', '60 + 45'], correct: 0 },
    { question: 'Qual operação completa o tanque?', answers: ['45 + 50', '60 + 35', '25 + 75', '50 + 45'], correct: 2 },
    { question: 'Qual das operações tem resultado 100?', answers: ['78 + 21', '77 + 34', '33 + 77', '65 + 35'], correct: 3 },
    { question: 'Qual operação deixa o tanque cheio?', answers: ['98 + 1', '95 + 6', '84 + 26', '94 + 6'], correct: 3 },
    { question: 'Qual operação acende o tanque para 100%?', answers: ['38 + 45', '54 + 26', '63 + 37', '92 + 7'], correct: 2 }
];

const clues = [
    '1º Quantos números pares há entre o 1 e o 17?',
    '2º Quantos números ímpares há entre o 0 e o 10?',
    '3º Quantas vezes o número 1 aparece entre o 0 e o 13?',
    '4º Número que corresponde à letra I.'
];

const correctCode = [8, 5, 6, 9];

// =======================
// INICIALIZAÇÃO
// =======================

window.addEventListener('DOMContentLoaded', () => {
    registerServiceWorker();
    setupInstallPrompt();
    setupEventListeners();
    loadSounds();
    playBackgroundMusic();
    showScreen('home');
});

// =======================
// SERVICE WORKER
// =======================

function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js').catch(() => {
            console.log('Service Worker não disponível');
        });
    }
}

// =======================
// INSTALL PROMPT
// =======================

function setupInstallPrompt() {
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        installPrompt = e;
        document.getElementById('installPrompt').classList.remove('hidden');
    });

    document.getElementById('installBtn').addEventListener('click', () => {
        if (installPrompt) {
            installPrompt.prompt();
            installPrompt.userChoice.then(() => {
                installPrompt = null;
                document.getElementById('installPrompt').classList.add('hidden');
            });
        }
    });

    document.getElementById('dismissBtn').addEventListener('click', () => {
        document.getElementById('installPrompt').classList.add('hidden');
    });
}

// =======================
// EVENT LISTENERS
// =======================

function setupEventListeners() {
    // Botões de navegação
    document.getElementById('startBtn').addEventListener('click', startGame);
    document.getElementById('nextNarrativeBtn').addEventListener('click', nextNarrative);
    document.getElementById('revealCodeBtn').addEventListener('click', showCodeInput);
    document.getElementById('submitCodeBtn').addEventListener('click', submitCode);
    document.getElementById('backHomeBtn').addEventListener('click', goHome);

    // Controles
    document.getElementById('soundBtn').addEventListener('click', toggleSound);
    document.getElementById('fullscreenBtn').addEventListener('click', toggleFullscreen);

    // Code boxes
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`codeBox${i}`).addEventListener('keyup', (e) => {
            if (e.key >= '0' && e.key <= '9') {
                if (i < 4) document.getElementById(`codeBox${i + 1}`).focus();
            } else if (e.key === 'Backspace' && i > 1) {
                document.getElementById(`codeBox${i - 1}`).focus();
            }
        });
    }
}

// =======================
// SOUND MANAGEMENT
// =======================

function loadSounds() {
    const sounds = [
        'acerto', 'erro', 'tempo-esgotado', 'derrota', 'vitoria'
    ];

    sounds.forEach(sound => {
        const audio = new Audio(`assets/sounds/${sound}.mp3`);
        soundEffects[sound] = audio;
    });
}

function playBackgroundMusic() {
    if (!backgroundMusic) {
        backgroundMusic = new Audio('assets/sounds/musica.mp3');
        backgroundMusic.loop = true;
        backgroundMusic.volume = 0.3;
    }
    if (soundEnabled) {
        backgroundMusic.play().catch(() => {});
    }
}

function playSound(soundName) {
    if (soundEnabled && soundEffects[soundName]) {
        soundEffects[soundName].currentTime = 0;
        soundEffects[soundName].play().catch(() => {});
    }
}

function playTickTack() {
    if (soundEnabled) {
        const audio = new Audio('assets/sounds/tic-tac.mp3');
        audio.play().catch(() => {});
    }
}

function toggleSound() {
    soundEnabled = !soundEnabled;
    const btn = document.getElementById('soundBtn');
    btn.classList.toggle('muted', !soundEnabled);
    btn.textContent = soundEnabled ? '🔊' : '🔇';
    
    if (soundEnabled && backgroundMusic) {
        backgroundMusic.play().catch(() => {});
    } else if (backgroundMusic) {
        backgroundMusic.pause();
    }
}

// =======================
// SCREEN MANAGEMENT
// =======================

function showScreen(screenName) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenName + 'Screen').classList.add('active');
    currentScreen = screenName;
    
    if (gameTimer) clearInterval(gameTimer);
}

function showMessage(text, subtext = '', duration = 2000) {
    document.getElementById('messageText').textContent = text;
    document.getElementById('messageSubtext').textContent = subtext;
    showScreen('message');
    
    setTimeout(() => {
        if (currentScreen === 'message') {
            nextGameStep();
        }
    }, duration);
}

// =======================
// GAME FLOW
// =======================

function startGame() {
    currentNarrative = 0;
    showNarrative();
}

function showNarrative() {
    if (currentNarrative < narratives.length) {
        const narrative = narratives[currentNarrative];
        document.getElementById('narrativeImage').src = narrative.image;
        document.getElementById('narrativeText').textContent = narrative.text;
        showScreen('narrative');
    } else {
        startLevel1();
    }
}

function nextNarrative() {
    currentNarrative++;
    if (currentNarrative < narratives.length) {
        showNarrative();
    } else {
        startLevel1();
    }
}

function startLevel1() {
    currentLevel = 1;
    currentQuestion = 0;
    correctAnswers = 0;
    showLevel1Question();
}

function showLevel1Question() {
    if (currentQuestion < level1Questions.length) {
        const q = level1Questions[currentQuestion];
        
        // Mostrar número do painel com círculos coloridos
        const panelLights = document.getElementById('powerPanel').querySelector('.panel-lights');
        const panelNumber = document.getElementById('panelNumber');
        panelNumber.textContent = q.number;
        panelLights.querySelectorAll('.light').forEach(light => light.remove());

        const angleSlice = (Math.PI * 2) / q.number;
        const radius = 95;

        for (let i = 0; i < q.number; i++) {
            const light = document.createElement('div');
            light.className = 'light active';
            light.style.backgroundColor = level1LightColors[i % level1LightColors.length];
            light.style.color = level1LightColors[i % level1LightColors.length];

            const angle = angleSlice * i;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            light.style.left = `calc(50% + ${x}px - 17px)`;
            light.style.top = `calc(50% + ${y}px - 17px)`;

            panelLights.appendChild(light);
        }
        
        // Mostrar alternativas
        const answersContainer = document.getElementById('level1Answers');
        answersContainer.innerHTML = '';
        
        q.answers.forEach((answer, index) => {
            const btn = document.createElement('button');
            btn.className = 'answer-btn';
            btn.textContent = String.fromCharCode(65 + index) + ') ' + answer;
            btn.addEventListener('click', () => selectLevel1Answer(index));
            answersContainer.appendChild(btn);
        });
        
        startTimer(1, 'timer1', () => {
            playSound('tempo-esgotado');
            showMessage('⏰ Tempo esgotado!', '', 2000);
            currentQuestion++;
            setTimeout(() => showLevel1Question(), 2000);
        });
        
        showScreen('level1');
    } else {
        endLevel1();
    }
}

function selectLevel1Answer(index) {
    const q = level1Questions[currentQuestion];
    const buttons = document.querySelectorAll('#level1Answers .answer-btn');
    
    buttons.forEach(btn => btn.disabled = true);
    
    if (index === q.correct) {
        correctAnswers++;
        buttons[index].classList.add('correct');
        playSound('acerto');
        showMessage('✓ Correto!', '', 1000);
    } else {
        buttons[index].classList.add('incorrect');
        buttons[q.correct].classList.add('correct');
        playSound('erro');
        showMessage('✗ Incorreto!', '', 1000);
    }
    
    currentQuestion++;
    setTimeout(() => showLevel1Question(), 2000);
}

function endLevel1() {
    if (correctAnswers >= 4) {
        showResult(true, 'nivel1-vitoria', 'Vocês conseguiram! As luzes da nave voltaram a se acender!', 'Continuar', startLevel2);
        playSound('vitoria');
    } else {
        showResult(false, 'nivel1-derrota', 'Vocês fracassaram, é preciso escalar outra equipe para tentar fazer o trabalho.', 'Tentar Novamente', startLevel1);
        playSound('derrota');
    }
}

function startLevel2() {
    currentLevel = 2;
    currentQuestion = 0;
    correctAnswers = 0;
    showLevel2Question();
}

function showLevel2Question() {
    if (currentQuestion < level2Questions.length) {
        const q = level2Questions[currentQuestion];
        
        document.getElementById('level2QuestionNumber').textContent = `Questão ${currentQuestion + 1}/5`;
        
        // Mostrar grid
        const gridContainer = document.getElementById('gridContainer');
        gridContainer.innerHTML = '';

        const grid = document.createElement('div');
        grid.className = 'grid';
        const rowLabels = ['A', 'B', 'C', 'D', 'E'];

        for (let row = 0; row < 5; row++) {
            const label = document.createElement('div');
            label.className = 'grid-row-label';
            label.textContent = rowLabels[row];
            grid.appendChild(label);

            for (let col = 0; col < 5; col++) {
                const cell = document.createElement('div');
                cell.className = 'grid-cell';
                cell.textContent = q.grid[row][col] || ' ';
                grid.appendChild(cell);
            }
        }
        gridContainer.appendChild(grid);
        
        // Mostrar alternativas
        const answersContainer = document.getElementById('level2Answers');
        answersContainer.innerHTML = '';

        const questionText = document.createElement('p');
        questionText.className = 'level2-question';
        questionText.textContent = q.question;
        answersContainer.appendChild(questionText);
        
        q.answers.forEach((answer, index) => {
            const btn = document.createElement('button');
            btn.className = 'answer-btn';
            btn.textContent = String.fromCharCode(65 + index) + ') ' + answer;
            btn.addEventListener('click', () => selectLevel2Answer(index));
            answersContainer.appendChild(btn);
        });
        
        startTimer(1, 'timer2', () => {
            showMessage('⏰ Tempo esgotado!', '', 2000);
            currentQuestion++;
            setTimeout(() => showLevel2Question(), 2000);
        });
        
        showScreen('level2');
    } else {
        endLevel2();
    }
}

function selectLevel2Answer(index) {
    const q = level2Questions[currentQuestion];
    const buttons = document.querySelectorAll('#level2Answers .answer-btn');
    
    buttons.forEach(btn => btn.disabled = true);
    
    if (index === q.correct) {
        correctAnswers++;
        buttons[index].classList.add('correct');
        playSound('acerto');
        showMessage('✓ Correto!', '', 1000);
    } else {
        buttons[index].classList.add('incorrect');
        buttons[q.correct].classList.add('correct');
        playSound('erro');
        showMessage('✗ Incorreto!', '', 1000);
    }
    
    currentQuestion++;
    setTimeout(() => showLevel2Question(), 2000);
}

function endLevel2() {
    if (correctAnswers >= 4) {
        showResult(true, 'nivel2-vitoria', 'O mapa foi reconstruído, agora vocês já podem se orientar!', 'Continuar', startLevel3);
        playSound('vitoria');
    } else {
        showResult(false, 'nivel2-derrota', 'Vocês fracassaram, é preciso escalar outra equipe para tentar fazer o trabalho.', 'Tentar Novamente', startLevel2);
        playSound('derrota');
    }
}

function startLevel3() {
    currentLevel = 3;
    currentQuestion = 0;
    correctAnswers = 0;
    updateFuelTank(0);
    showLevel3Question();
}

function showLevel3Question() {
    if (currentQuestion < level3Questions.length) {
        const q = level3Questions[currentQuestion];
        
        document.getElementById('level3QuestionNumber').textContent = `Nível ${currentLevel}`;
        document.getElementById('level3Question').textContent = q.question;
        
        // Mostrar alternativas
        const answersContainer = document.getElementById('level3Answers');
        answersContainer.innerHTML = '';
        
        q.answers.forEach((answer, index) => {
            const btn = document.createElement('button');
            btn.className = 'answer-btn';
            btn.textContent = String.fromCharCode(65 + index) + ') ' + answer;
            btn.addEventListener('click', () => selectLevel3Answer(index));
            answersContainer.appendChild(btn);
        });
        
        startTimer(1, 'timer3', () => {
            showMessage('⏰ Tempo esgotado!', '', 2000);
            currentQuestion++;
            setTimeout(() => showLevel3Question(), 2000);
        });
        
        showScreen('level3');
    } else {
        endLevel3();
    }
}

function selectLevel3Answer(index) {
    const q = level3Questions[currentQuestion];
    const buttons = document.querySelectorAll('#level3Answers .answer-btn');
    
    buttons.forEach(btn => btn.disabled = true);
    
    if (index === q.correct) {
        correctAnswers++;
        updateFuelTank((correctAnswers / 5) * 100);
        buttons[index].classList.add('correct');
        playSound('acerto');
        showMessage('✓ Correto!', '', 1000);
    } else {
        buttons[index].classList.add('incorrect');
        buttons[q.correct].classList.add('correct');
        playSound('erro');
        showMessage('✗ Incorreto!', '', 1000);
    }
    
    currentQuestion++;
    setTimeout(() => showLevel3Question(), 2000);
}

function updateFuelTank(percentage) {
    const tankFill = document.getElementById('tankFill');
    const tankLabel = document.querySelector('.tank-label');
    tankFill.style.height = percentage + '%';
    tankLabel.textContent = Math.round(percentage) + '%';
}

function endLevel3() {
    if (correctAnswers >= 4) {
        showResult(true, 'nivel3-vitoria', 'Vocês conseguiram! O tanque está cheio e já podem avançar!', 'Ir para o Desafio Final', showClues);
        playSound('vitoria');
    } else {
        showResult(false, 'nivel3-derrota', 'Vocês fracassaram, é preciso escalar outra equipe para tentar fazer o trabalho.', 'Tentar Novamente', startLevel3);
        playSound('derrota');
    }
}

function showClues() {
    const cluesList = document.getElementById('cluesList');
    cluesList.innerHTML = '';
    
    clues.forEach(clue => {
        const clueDiv = document.createElement('div');
        clueDiv.className = 'clue';
        clueDiv.innerHTML = '<p>' + clue + '</p>';
        cluesList.appendChild(clueDiv);
    });
    
    startTimer(5, 'timerClues', () => {
        showMessage('⏰ Tempo esgotado!', '', 1000);
        setTimeout(showCodeInput, 1000);
    });
    
    showScreen('clues');
}

function showCodeInput() {
    if (gameTimer) clearInterval(gameTimer);
    
    // Limpar inputs
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`codeBox${i}`).value = '';
    }
    document.getElementById('codeBox1').focus();
    
    showScreen('code');
}

function submitCode() {
    const code = [
        parseInt(document.getElementById('codeBox1').value) || 0,
        parseInt(document.getElementById('codeBox2').value) || 0,
        parseInt(document.getElementById('codeBox3').value) || 0,
        parseInt(document.getElementById('codeBox4').value) || 0
    ];
    
    if (code.every((digit, index) => digit === correctCode[index])) {
        playSound('vitoria');
        showResult(true, 'vitoria-final', 'Vocês conseguiram! Escaparam da nebulosa e completaram a missão!', 'Ver Créditos', showCredits);
    } else {
        playSound('erro');
        showResult(false, 'derrota-final', 'Vocês fracassaram, é preciso escalar outra equipe para tentar fazer o trabalho.', 'Tentar Novamente', showCodeInput);
    }
}

function showResult(isVictory, imageName, message, buttonText, callback) {
    document.getElementById('resultImage').src = `assets/images/${imageName}.jpg`;
    document.getElementById('resultText').textContent = message;
    
    const btn = document.getElementById('resultBtn');
    btn.textContent = buttonText;
    btn.onclick = callback;
    
    showScreen('result');
}

function showCredits() {
    showScreen('credits');
}

function goHome() {
    if (gameTimer) clearInterval(gameTimer);
    showScreen('home');
}

// =======================
// TIMER
// =======================

function startTimer(minutes, timerId, onComplete) {
    if (gameTimer) clearInterval(gameTimer);
    
    timeRemaining = minutes * 60;
    
    gameTimer = setInterval(() => {
        timeRemaining--;
        
        const mins = Math.floor(timeRemaining / 60);
        const secs = timeRemaining % 60;
        
        const display = String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0');
        
        const timerElement = document.getElementById(timerId);
        if (timerElement) {
            timerElement.textContent = display;
        }
        
        if (timeRemaining <= 0) {
            clearInterval(gameTimer);
            if (onComplete) onComplete();
        }
    }, 1000);
}

// =======================
// FULLSCREEN
// =======================

function toggleFullscreen() {
    const container = document.getElementById('gameContainer');
    
    if (!document.fullscreenElement) {
        if (container.requestFullscreen) {
            container.requestFullscreen();
        } else if (container.webkitRequestFullscreen) {
            container.webkitRequestFullscreen();
        } else if (container.mozRequestFullScreen) {
            container.mozRequestFullScreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        }
    }
}
