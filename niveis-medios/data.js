window.gameDataOverrides = {
    level1QuestionPrompt: 'Qual operação acende o painel com o número ao lado?',
    narratives: [
        { text: 'Vocês são jovens cadetes da Academia Estelar, enviados para explorar o planeta Marte.', image: '../assets/images/narrativa-1.jpg' },
        { text: 'Durante a viagem, um campo magnético misterioso desvia a nave, deixando a tripulação presa em uma enorme nebulosa.', image: '../assets/images/narrativa-2.jpg' },
        { text: 'Agora vocês têm que encarar altos desafios para consertar a nave, escapar da nebulosa e continuar a missão.', image: '../assets/images/narrativa-3.jpg' }
    ],
    level1Questions: [
        { number: 9, answers: ['4 + 5', '6 + 2', '5 + 3', '8 + 0'], correct: 0 },
        { number: 10, answers: ['4 + 5', '6 + 2', '5 + 3', '8 + 2'], correct: 3 },
        { number: 8, answers: ['4 + 5', '6 + 3', '5 + 3', '8 + 1'], correct: 2 },
        { number: 14, answers: ['6 + 5', '6 + 3', '7 + 7', '8 + 0'], correct: 2 },
        { number: 15, answers: ['9 + 5', '7 + 8', '8 + 8', '8 + 4'], correct: 1 }
    ],
    level1LightColors: [
        '#ff6b6b', '#ff9f43', '#feca57', '#1dd1a1', '#54a0ff',
        '#5f27cd', '#ee5253', '#00d2d3', '#ff9ff3', '#48dbfb',
        '#10ac84', '#f368e0', '#ffb142', '#7bed9f', '#70a1ff'
    ],
    level2Questions: [
        {
            grid: [
                [' ', ' ', ' ', ' ', '☀️'],
                [' ', '⭐', ' ', ' ', '🌜'],
                [' ', ' ', ' ', ' ', '☄️'],
                [' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', '🧑‍🚀', ' ']
            ],
            question: 'Se o astronauta andar 3 casas para cima e 2 casas para a esquerda, ele vai ficar na mesma posição do(a):',
            answers: ['SOL', 'LUA', 'ASTEROIDE', 'ESTRELA'],
            correct: 3
        },
        {
            grid: [
                [' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', '🌟'],
                [' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ']
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
                [' ', ' ', ' ', ' ', '🚀']
            ],
            question: 'Se o foguete avançar 4 casas para cima, em que posição ele vai ficar?',
            answers: ['A4', 'D5', 'B4', 'A5'],
            correct: 3
        },
        {
            grid: [
                [' ', ' ', '🧑‍🚀', ' ', ' '],
                [' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ']
            ],
            question: 'Qual é a posição do astronauta?',
            answers: ['A4', 'A3', 'C4', 'B1'],
            correct: 1
        },
        {
            grid: [
                [' ', ' ', '🧑‍🚀', ' ', ' '],
                [' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ']
            ],
            question: 'Se o astronauta avançar duas casas para baixo e duas casas à esquerda, ele vai ficar em qual posição?',
            answers: ['A3', 'D1', 'C1', 'B1'],
            correct: 2
        }
    ],
    level3Questions: [
        { question: 'Qual das operações abaixo deixa o tanque 100% cheio?', answers: ['55 + 45', '55 + 55', '45 + 45', '60 + 45'], correct: 0 },
        { question: 'Qual operação completa o tanque?', answers: ['45 + 50', '60 + 35', '25 + 75', '50 + 45'], correct: 2 },
        { question: 'Qual das operações tem resultado 100?', answers: ['78 + 21', '77 + 34', '33 + 77', '65 + 35'], correct: 3 },
        { question: 'Qual operação deixa o tanque cheio?', answers: ['98 + 1', '95 + 6', '84 + 26', '94 + 6'], correct: 3 },
        { question: 'Qual operação acende o tanque para 100%?', answers: ['38 + 45', '54 + 26', '63 + 37', '92 + 7'], correct: 2 }
    ],
    clues: [
        '1º Quantos números pares há entre o 1 e o 17?',
        '2º Quantos números ímpares há entre o 0 e o 10?',
        '3º Quantas vezes o número 1 aparece entre o 0 e o 13?',
        '4º Número que corresponde à letra I.'
    ],
    correctCode: [8, 5, 6, 9]
};
