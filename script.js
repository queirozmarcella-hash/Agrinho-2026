// ========== NAVBAR RESPONSIVA ==========
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// ========== SCROLL SUAVE ==========
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// ========== QUIZ INTERATIVO ==========
const quizData = [
    {
        question: "O que causa a maior parte da poluição do ar nas cidades?",
        options: [
            { text: "Carros e indústrias", correct: true, detailedFeedback: "✅ CORRETO! Carros e indústrias liberam gases nocivos como CO2, óxido de nitrogênio e material particulado que prejudicam a qualidade do ar. Isso causa doenças respiratórias e aquecimento global." },
            { text: "Árvores e plantas", correct: false, detailedFeedback: "❌ ERRADO! Na verdade, árvores e plantas fazem o oposto - elas limpam o ar! Através da fotossíntese, produzem oxigênio e absorvem CO2." },
            { text: "Chuva e vento", correct: false, detailedFeedback: "❌ ERRADO! Chuva e vento são fenômenos naturais que na verdade ajudam a dispersar poluentes. Eles não causam poluição do ar." },
            { text: "Animais domésticos", correct: false, detailedFeedback: "❌ ERRADO! Animais domésticos não causam poluição do ar. Os principais culpados são indústrias, transportes e queimadas." }
        ],
        emoji: "🚗"
    },
    {
        question: "Qual é o tempo de decomposição de um plástico?",
        options: [
            { text: "1 ano", correct: false, detailedFeedback: "❌ ERRADO! Um ano é muito pouco tempo. O plástico é um material extremamente resistente e leva muito mais tempo para se decompor naturalmente." },
            { text: "50 anos", correct: false, detailedFeedback: "❌ ERRADO! Ainda é pouco! Embora alguns plásticos mais finos possam levar cerca de 50 anos, muitos plásticos levam ainda mais tempo." },
            { text: "100 a 500 anos", correct: true, detailedFeedback: "✅ CORRETO! Dependendo do tipo de plástico, pode levar entre 100 a 500 anos ou até mais para se decompor completamente. Por isso é tão importante reciclar e reduzir o uso de plástico!" },
            { text: "Nunca se decompõe", correct: false, detailedFeedback: "❌ ERRADO! Eventualmente o plástico se decompõe, mas leva séculos! Por enquanto, temos que assumir que plásticos descartados hoje prejudicarão gerações futuras." }
        ],
        emoji: "♻️"
    },
    {
        question: "Qual alternativa é MELHOR para o meio ambiente?",
        options: [
            { text: "Usar sacolas plásticas", correct: false, detailedFeedback: "❌ ERRADO! Sacolas plásticas são usadas por apenas alguns minutos, mas levam séculos para se decompor. Prejudicam animais marinhos e terrestres que as confundem com alimento." },
            { text: "Usar sacolas de pano reutilizáveis", correct: true, detailedFeedback: "✅ CORRETO! Sacolas de pano podem ser usadas centenas de vezes. Uma única sacola de pano substitui centenas de sacolas plásticas, reduzindo drasticamente o lixo e a poluição." },
            { text: "Usar sacolas de papel branco", correct: false, detailedFeedback: "❌ ERRADO! Embora o papel se decomponha mais rapidamente, sua produção consome muitos recursos naturais. Sacolas reutilizáveis são sempre melhores!" },
            { text: "Não usar sacolas", correct: false, detailedFeedback: "❌ ERRADO! Precisamos de sacolas para transportar compras. A melhor opção é usar sacolas reutilizáveis que duram muito tempo!" }
        ],
        emoji: "🛍️"
    },
    {
        question: "O que os oceanos mais precisam ser protegidos?",
        options: [
            { text: "Do plástico e do lixo", correct: true, detailedFeedback: "✅ CORRETO! Aproximadamente 8 milhões de toneladas de plástico entram nos oceanos anualmente. Isso mata peixes, tartarugas, baleias e forma 'ilhas de lixo' gigantescas. É uma emergência ambiental!" },
            { text: "Dos peixes", correct: false, detailedFeedback: "❌ ERRADO! Peixes são parte vital do ecossistema oceânico, não são uma ameaça. Eles precisam ser protegidos, não o contrário!" },
            { text: "Da água salgada", correct: false, detailedFeedback: "❌ ERRADO! A água salgada é uma característica natural dos oceanos há bilhões de anos. Não é uma ameaça ao oceano." },
            { text: "Das ondas", correct: false, detailedFeedback: "❌ ERRADO! Ondas são fenômenos naturais e essenciais para o oceano. Elas oxigenam a água e distribuem nutrientes." }
        ],
        emoji: "🌊"
    },
    {
        question: "Qual ação NÃO ajuda a reduzir poluição?",
        options: [
            { text: "Andar de bicicleta", correct: false, detailedFeedback: "❌ ERRADO! Andar de bicicleta é excelente! Não emite poluentes, não consome combustíveis fósseis e ainda é um exercício saudável." },
            { text: "Reciclar lixo", correct: false, detailedFeedback: "❌ ERRADO! Reciclar é fundamental! Reduz a quantidade de lixo em aterros, economiza recursos naturais e energia." },
            { text: "Jogar plástico na rua", correct: true, detailedFeedback: "✅ CORRETO! Jogar plástico na rua é exatamente o que NÃO fazer! Aumenta a poluição do solo, polui rios e oceanos, e prejudica animais que podem engoli-lo ou se machucar." },
            { text: "Usar transportes públicos", correct: false, detailedFeedback: "❌ ERRADO! Transportes públicos reduzem muito as emissões de CO2 comparado com carros individuais. É uma ótima forma de ajudar!" }
        ],
        emoji: "🚫"
    }
];

let currentQuestion = 0;
let score = 0;
let quizStarted = false;

function startQuiz() {
    currentQuestion = 0;
    score = 0;
    quizStarted = true;
    showQuestion();
}

function showQuestion() {
    const quizContent = document.getElementById('quiz-content');
    const quiz = quizData[currentQuestion];
    
    let optionsHTML = '<div class="quiz-options">';
    quiz.options.forEach((option, index) => {
        optionsHTML += `<button class="option-btn" onclick="selectAnswer(${index})">${option.text}</button>`;
    });
    optionsHTML += '</div>';

    quizContent.innerHTML = `
        <div class="quiz-question">
            <div style="font-size: 2rem; margin-bottom: 1rem;">${quiz.emoji}</div>
            <h3>${quiz.question}</h3>
            ${optionsHTML}
        </div>
    `;

    document.getElementById('next-btn').style.display = 'none';
    document.getElementById('restart-btn').style.display = 'none';
}

function selectAnswer(index) {
    const quiz = quizData[currentQuestion];
    const optionBtns = document.querySelectorAll('.option-btn');
    
    // Desabilitar todos os botões
    optionBtns.forEach(btn => btn.disabled = true);

    // Verificar se acertou ou errou
    const isCorrect = quiz.options[index].correct;
    const detailedFeedback = quiz.options[index].detailedFeedback;
    
    // Mostrar resposta correta/incorreta
    optionBtns.forEach((btn, i) => {
        if (i === index && quiz.options[i].correct) {
            btn.classList.add('correct');
            score++;
        } else if (i === index && !quiz.options[i].correct) {
            btn.classList.add('incorrect');
        } else if (quiz.options[i].correct) {
            btn.classList.add('correct');
        }
    });

    // Mostrar feedback detalhado
    const quizResult = document.getElementById('quiz-result');
    quizResult.innerHTML = `<div style="background: linear-gradient(135deg, ${isCorrect ? '#E8F8E8' : '#FFE8F0'} 0%, ${isCorrect ? '#D6F0D6' : '#FFD6E8'} 100%); padding: 1.5rem; border-radius: 12px; border-left: 5px solid ${isCorrect ? '#7FD87F' : '#FF8FB3'}; animation: slideInUp 0.5s ease;"><p style="font-size: 1rem; line-height: 1.8; color: #333;">${detailedFeedback}</p></div>`;

    // Mostrar botão próxima pergunta
    setTimeout(() => {
        document.getElementById('next-btn').style.display = 'inline-block';
    }, 1500);
}

function showNextQuestion() {
    currentQuestion++;
    
    if (currentQuestion < quizData.length) {
        showQuestion();
    } else {
        showQuizResult();
    }
}

function showQuizResult() {
    const quizContent = document.getElementById('quiz-content');
    const resultPercent = Math.round((score / quizData.length) * 100);
    let message = '';
    let emoji = '';

    if (resultPercent === 100) {
        message = `Perfeito! 🌟 Você acertou todas! Você é um super herói do planeta!`;
        emoji = '🦸‍♀️';
    } else if (resultPercent >= 80) {
        message = `Excelente! 🌈 Você é muito consciente do meio ambiente!`;
        emoji = '🌟';
    } else if (resultPercent >= 60) {
        message = `Bom! 💪 Você está no caminho certo! Continue aprendendo!`;
        emoji = '💚';
    } else {
        message = `Continue tentando! 📚 Leia as dicas e tente novamente!`;
        emoji = '📖';
    }

    quizContent.innerHTML = `
        <div style="text-align: center; animation: slideInUp 0.5s ease;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">${emoji}</div>
            <h3 style="color: var(--pink-dark); font-size: 1.3rem; margin-bottom: 1rem;">${message}</h3>
            <p style="font-size: 1.2rem; color: var(--pink-dark); font-weight: 600;">
                Você acertou <strong>${score}</strong> de <strong>${quizData.length}</strong> perguntas!
            </p>
            <p style="font-size: 4rem; margin-top: 1.5rem;">${resultPercent}%</p>
        </div>
    `;

    document.getElementById('next-btn').style.display = 'none';
    document.getElementById('restart-btn').style.display = 'inline-block';
    document.getElementById('quiz-result').innerHTML = '';
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById('quiz-result').innerHTML = '';
    startQuiz();
}

// Iniciar quiz ao carregar
document.addEventListener('DOMContentLoaded', () => {
    // Criar botão Start Quiz
    const quizContent = document.getElementById('quiz-content');
    quizContent.innerHTML = `
        <div style="text-align: center; animation: slideInUp 0.5s ease;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">🧠</div>
            <p style="font-size: 1.1rem; color: #666; margin-bottom: 2rem;">
                Teste seus conhecimentos sobre poluição com nosso quiz divertido! Clique abaixo para começar!
            </p>
        </div>
    `;
    
    const startBtn = document.createElement('button');
    startBtn.className = 'btn btn-primary';
    startBtn.textContent = 'Começar Quiz!';
    startBtn.onclick = startQuiz;
    quizContent.appendChild(startBtn);
});

// ========== JOGO DA CAÇA AO LIXO ==========
const trashEmojis = ['🗑️', '♻️', '🚮', '🛢️', '🧪'];
let trashScore = 0;
let trashGameActive = false;

function startTrashGame() {
    trashScore = 0;
    trashGameActive = true;
    const gameArea = document.getElementById('game-area');
    gameArea.innerHTML = '<div class="score-board">Lixos Coletados: <span id="trash-score">0</span>/5</div>';

    let collected = 0;

    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            if (trashGameActive) {
                const trash = document.createElement('div');
                trash.className = 'trash-item';
                trash.textContent = trashEmojis[Math.floor(Math.random() * trashEmojis.length)];
                trash.onclick = (e) => {
                    e.target.remove();
                    collected++;
                    document.getElementById('trash-score').textContent = collected;

                    if (collected === 5) {
                        gameArea.innerHTML = `
                            <div style="text-align: center; animation: slideInUp 0.5s ease;">
                                <div style="font-size: 3rem; margin-bottom: 1rem;">🎉</div>
                                <h3 style="color: var(--pink-dark);">Parabéns! Você coletou todo o lixo!</h3>
                                <p style="color: #666;">Planeta limpo graças a você! 🌍💚</p>
                            </div>
                        `;
                        trashGameActive = false;
                    }
                };

                gameArea.appendChild(trash);
                
                // Remover item após 3 segundos se não clicado
                setTimeout(() => {
                    if (trash.parentNode) {
                        trash.remove();
                    }
                }, 3000);
            }
        }, i * 800);
    }
}

// ========== JOGO DA MEMÓRIA ==========
const memoryEmojis = ['🌍', '🌱', '💧', '🌳', '♻️', '🦋', '🌍', '🌱', '💧', '🌳', '♻️', '🦋', '☀️', '🐝', '🌺', '🌻'];
let memoryCards = [];
let flippedCards = [];
let matchedPairs = 0;

function startMemoryGame() {
    const memoryGame = document.getElementById('memory-game');
    memoryGame.innerHTML = '';
    memoryCards = [];
    flippedCards = [];
    matchedPairs = 0;

    // Embaralhar emojis
    const shuffledEmojis = memoryEmojis.sort(() => Math.random() - 0.5);

    shuffledEmojis.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.textContent = '❓';
        card.dataset.emoji = emoji;
        card.dataset.index = index;
        card.onclick = () => flipCard(card);

        memoryGame.appendChild(card);
        memoryCards.push(card);
    });
}

function flipCard(card) {
    if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
        card.textContent = card.dataset.emoji;
        card.classList.add('flipped');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.emoji === card2.dataset.emoji) {
        // Match
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;

        flippedCards = [];

        if (matchedPairs === 8) {
            setTimeout(() => {
                const memoryGame = document.getElementById('memory-game');
                memoryGame.innerHTML = `
                    <div style="grid-column: 1/-1; text-align: center; animation: slideInUp 0.5s ease;">
                        <div style="font-size: 3rem; margin-bottom: 1rem;">🏆</div>
                        <h3 style="color: var(--pink-dark);">Parabéns! Você ganhou! 🎉</h3>
                        <p style="color: #666;">Sua memória é incrível! 🧠✨</p>
                    </div>
                `;
            }, 500);
        }
    } else {
        // No match
        setTimeout(() => {
            card1.textContent = '❓';
            card2.textContent = '❓';
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 800);
    }
}

// ========== FRASES MOTIVACIONAIS ==========
const motivationalPhrases = [
    "🌍 Toda ação conta! Você está fazendo a diferença!",
    "💚 A Terra agradece seus cuidados!",
    "🌱 Pequenas atitudes, grandes mudanças!",
    "🦋 Você é um herói do planeta!",
    "♻️ Reciclar é amar o nosso mundo!",
    "🌳 Uma árvore plantada hoje, uma floresta amanhã!",
    "💧 Cada gota de água é preciosa!",
    "🌸 Juntos cuidamos do nosso planeta!",
    "🌺 A natureza agradece seu carinho!",
    "✨ Você pode mudar o mundo! Comece agora!",
    "🌈 Deixe o planeta melhor do que você encontrou!",
    "🐝 Proteja a natureza, proteja a vida!",
    "🌍 Um planeta saudável = um futuro melhor!",
    "💪 Você tem o poder de fazer diferença!",
    "🎉 Parabéns por se importar com o meio ambiente!"
];

function getMotivationalPhrase() {
    const randomIndex = Math.floor(Math.random() * motivationalPhrases.length);
    const phrase = motivationalPhrases[randomIndex];
    const motivationalText = document.getElementById('motivational-text');
    
    motivationalText.style.animation = 'none';
    setTimeout(() => {
        motivationalText.textContent = phrase;
        motivationalText.style.animation = 'fadeIn 0.5s ease';
    }, 10);
}

// ========== EFEITOS ADICIONAIS ==========
// Adicionar efeito ao scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight - 100) {
            section.style.opacity = '1';
        }
    });
});

// Inicializar seções com opacidade 0
window.addEventListener('load', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        if (section.offsetTop > window.innerHeight) {
            section.style.opacity = '0.5';
            section.style.transition = 'opacity 0.3s ease';
        }
    });
});

// ========== INTERATIVIDADE DOS CARDS ==========
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card, .tip, .game-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.animation = 'pulse 0.6s ease';
        });
    });
});

// Animação pulse customizada
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.02); }
    }
`;
document.head.appendChild(style);

// ========== CONFETE NO QUIZ ==========
function createConfetti() {
    const confettiPiece = document.createElement('div');
    confettiPiece.style.position = 'fixed';
    confettiPiece.style.left = Math.random() * window.innerWidth + 'px';
    confettiPiece.style.top = '-10px';
    confettiPiece.style.fontSize = '2rem';
    confettiPiece.style.pointerEvents = 'none';
    confettiPiece.style.zIndex = '999';
    confettiPiece.textContent = ['🌟', '✨', '💚', '🎉', '🌸'][Math.floor(Math.random() * 5)];

    document.body.appendChild(confettiPiece);

    const duration = Math.random() * 2 + 2;
    const animation = confettiPiece.animate(
        [
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${window.innerHeight + 10}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ],
        { duration: duration * 1000 }
    );

    animation.onfinish = () => confettiPiece.remove();
}

// Disparar confete no Quiz quando acertar
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('option-btn') && e.target.classList.contains('correct')) {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => createConfetti(), i * 100);
        }
    }
});