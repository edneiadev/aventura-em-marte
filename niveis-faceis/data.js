window.gameDataOverrides = {
    level1QuestionPrompt: 'Qual operação acende o painel com o número ao lado?',
    narratives: [
        { text: 'Vocês são jovens cadetes da Academia Estelar, enviados para explorar o planeta Marte.', image: '../assets/images/narrativa-1.jpg' },
        { text: 'Durante a viagem, um campo magnético misterioso desvia a nave, deixando a tripulação presa em uma enorme nebulosa.', image: '../assets/images/narrativa-2.jpg' },
        { text: 'Agora vocês têm que encarar altos desafios para consertar a nave, escapar da nebulosa e continuar a missão.', image: '../assets/images/narrativa-3.jpg' }
    ],
    level1Questions: [
        { number: 8, answers: ['4 + 4', '6 + 3', '5 + 1', '8 + 2'], correct: 0 },
        { number: 10, answers: ['4 + 5', '6 + 2', '5 + 3', '8 + 2'], correct: 3 },
        { number: 6, answers: ['4 + 5', '6 + 3', '5 + 1', '8 + 1'], correct: 2 },
        { number: 5, answers: ['2 + 4', '4 + 3', '3 + 2', '5 + 1'], correct: 2 },
        { number: 9, answers: ['7 + 1', '1 + 8', '8 + 0', '4 + 4'], correct: 1 }
    ],
    level1LightColors: [
        '#ff6b6b', '#ff9f43', '#feca57', '#1dd1a1', '#54a0ff',
        '#5f27cd', '#ee5253', '#00d2d3', '#ff9ff3', '#48dbfb',
        '#10ac84', '#f368e0', '#ffb142', '#7bed9f', '#70a1ff'
    ],
    level2Questions: [
        {
            grid: [
                [' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', '☀️', ' ']
            ],
            question: 'Qual é a posição do sol?',
            answers: ['D1', 'E3', 'C2', 'E4'],
            correct: 3
        },
        {
            grid: [
                [' ', ' ', ' ', ' ', ' '],
                [' ', '⭐', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ']
            ],
            question: 'Qual é a localização da estrela?',
            answers: ['A1', 'D5', 'B2', 'C3'],
            correct: 2
        },
        {
            grid: [
                [' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' '],
                [' ', '☄️', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ']
            ],
            question: 'Qual é a localização do meteoro?',
            answers: ['A4', 'D5', 'B4', 'C2'],
            correct: 3
        },
        {
            grid: [
                [' ', ' ', ' ', '🧑‍🚀', ' '],
                [' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ']
            ],
            question: 'Qual é a posição do astronauta?',
            answers: ['A4', 'A3', 'C4', 'B1'],
            correct: 0
        },
        {
            grid: [
                [' ', ' ', ' ', '🧑‍🚀', ' '],
                [' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ']
            ],
            question: 'Se o astronauta avançar duas casas para baixo, ele vai ficar em qual posição?',
            answers: ['A3', 'D1', 'C4', 'B1'],
            correct: 2
        }
    ],
    level3Questions: [
        { question: 'Qual das operações abaixo deixa o tanque 100% cheio?', answers: ['50 + 50', '55 + 55', '40 + 40', '70 + 40'], correct: 0 },
        { question: 'Qual das operações abaixo deixa o tanque 100% cheio?', answers: ['40 + 50', '60 + 35', '70 + 30', '50 + 45'], correct: 2 },
        { question: 'Qual das operações abaixo deixa o tanque 100% cheio?', answers: ['80 + 10', '70 + 70', '30 + 80', '90 + 10'], correct: 3 },
        { question: 'Qual das operações abaixo deixa o tanque 100% cheio?', answers: ['90 + 1', '50 + 60', '70 + 50', '80 + 20'], correct: 3 },
        { question: 'Qual das operações abaixo deixa o tanque 100% cheio?', answers: ['30 + 40', '50 + 20', '70 + 30', '90 + 70'], correct: 2 }
    ],
    clues: [
        '1º Qual é o número par: 2 ou 3?',
        '2º Qual é o número ímpar: 5 ou 6?',
        '3º Qual é o número que vem depois do 8?',
        '4º Qual é o número que vem antes do 7.'
    ],
    correctCode: [2, 5, 9, 6]
};
