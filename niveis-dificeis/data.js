window.gameDataOverrides = {
    level1QuestionPrompt: 'Qual operação acende o painel com o número ao lado?',
    narratives: [
        { text: 'Vocês são jovens cadetes da Academia Estelar, enviados para explorar o planeta Marte.', image: '../assets/images/narrativa-1.jpg' },
        { text: 'Durante a viagem, um campo magnético misterioso desvia a nave, deixando a tripulação presa em uma enorme nebulosa.', image: '../assets/images/narrativa-2.jpg' },
        { text: 'Agora vocês têm que encarar altos desafios para consertar a nave, escapar da nebulosa e continuar a missão.', image: '../assets/images/narrativa-3.jpg' }
    ],
    level1Questions: [
        { number: 16, answers: ['9 + 7', '6 + 6', '5 + 8', '9 + 3'], correct: 0 },
        { number: 13, answers: ['9 + 5', '6 + 8', '5 + 7', '6 + 7'], correct: 3 },
        { number: 18, answers: ['9 + 5', '6 + 8', '9 + 9', '8 + 9'], correct: 2 },
        { number: 17, answers: ['7 + 9', '4 + 9', '8 + 9', '5 + 9'], correct: 2 },
        { number: 14, answers: ['7 + 8', '6 + 8', '8 + 9', '4 + 9'], correct: 1 }
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
                [' ', ' ', ' ', '🧑‍🚀', ' ']
            ],
            question: 'Se o astronauta andar 3 casas para cima, duas casas para a esquerda e uma casa para baixo, em qual posição ele vai ficar?',
            answers: ['C2', 'E3', 'B2', 'E4'],
            correct: 0
        },
        {
            grid: [
                [' ', ' ', ' ', ' ', ' '],
                [' ', '⭐', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ']
            ],
            question: 'Se a estrela andar uma casa para cima, duas para a direita e 2 para baixo, em qual posição vai ficar?',
            answers: ['A1', 'D5', 'B2', 'C4'],
            correct: 3
        },
        {
            grid: [
                [' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' '],
                [' ', '☄️', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ']
            ],
            question: 'Se o meteoro andar 1 casa para baixo, duas para a direita e mais uma para baixo, em qual posição vai ficar?',
            answers: ['A4', 'D5', 'B4', 'E4'],
            correct: 3
        },
        {
            grid: [
                [' ', ' ', ' ', '⭐', ' '],
                [' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ']
            ],
            question: 'Se a estrela avançar 3 casas para baixo e uma para a esquerda, em que posição vai ficar?',
            answers: ['D3', 'A3', 'C4', 'B1'],
            correct: 0
        },
        {
            grid: [
                [' ', ' ', ' ', '🌜', ' '],
                [' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ']
            ],
            question: 'Se a lua avançar duas casas para baixo e uma para a direita, ela vai ficar em qual posição?',
            answers: ['A3', 'D1', 'C5', 'B1'],
            correct: 2
        }
    ],
    level3Questions: [
        { question: 'Qual das operações abaixo deixa o tanque 100% cheio?', answers: ['78 + 22', '55 + 55', '45 + 45', '60 + 45'], correct: 0 },
        { question: 'Qual das operações abaixo deixa o tanque 100% cheio?', answers: ['45 + 50', '60 + 35', '56 + 44', '50 + 45'], correct: 2 },
        { question: 'Qual das operações abaixo deixa o tanque 100% cheio?', answers: ['78 + 21', '77 + 34', '33 + 77', '59 + 41'], correct: 3 },
        { question: 'Qual das operações abaixo deixa o tanque 100% cheio?', answers: ['98 + 1', '32 + 38', '84 + 26', '84 + 16'], correct: 3 },
        { question: 'Qual das operações abaixo deixa o tanque 100% cheio?', answers: ['38 + 45', '54 + 26', '63 + 37', '84 + 26'], correct: 2 }
    ],
    clues: [
        '1º Pensei em um número, somei 5 e obtive 13. Qual é esse número?',
        '2º Pensei em um número, diminui 3 e obtive 4. Qual é esse número?',
        '3º Pensei em um número, multipliquei por 2 e obtive 14. Qual é esse número?',
        '4º Pensei em um número, dividi por 2 e obtive 3. Qual é esse número?'
    ],
    correctCode: [8, 7, 7, 6]
};
