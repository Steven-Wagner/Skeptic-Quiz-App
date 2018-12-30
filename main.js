STORE = 
    [
    {
        question: `Methodological skepticism is associated with the writings and methodology of which famous philosopher?`,
        choices: ['René Descartes', 'Aristotle', 'Immanuel Kant', 'Confucius'],
        answer: 'René Descartes',
        },
        {
        question: 'What is methodological skepticism?',
        choices: ['An approach that subjects all knowledge claims to scrutiny with the goal of sorting out true from false claims', 
        'An approach that assumes all knowledge claims are false until proven true',
        'An approach that questions the possibility of certain knowledge',
        'An approach that doubts all widely held beliefs'],
        answer: 'An approach that subjects all knowledge claims to scrutiny with the goal of sorting out true from false claims'
        },
        {
        question: 'What is philosophical skepticism?',
        choices: ['An approach that subjects all knowledge claims to scrutiny with the goal of sorting out true from false claims',
        'An approach that assumes all knowledge claims are false until proven true',
        'An approach that questions the possibility of certain knowledge',
        'An approach that doubts all widely held beliefs'],
        answer: 'An approach that questions the possibility of certain knowledge'
        },
        {
        question: 'According to Cartesian doubt what, "...is often erroneous and therefore must be doubted"?',
        choices: ['The truth', 
        'Politicians',
        'Science',
        'Sensory experience'],
        answer: 'Sensory experience'
        },
        {
        question: `René Descartes is famous for the saying, "I think,..."`,
        choices: ['Therefore I am',
        'I would like coffee with that',
        'Therefore I exist',
        'I think?'],
        answer: 'Therefore I am'
        },
        {
        question: 'What is the best way to describe what Descartes meant when he wrote, I think, therefore I am?',
        choices: ['Descartes tried to doubt his own existence, but found that even his doubting showed that he existed, since he could not doubt if he did not exist.',
        'Descartes believed that only that which can think can be proven to truly exist.',
        'Truth is determined by the individual.',
        'We create our own realities and determine for ourselves what it means to exist.'],
        answer: 'Descartes tried to doubt his own existence, but found that even his doubting showed that he existed, since he could not doubt if he did not exist.'
        },
        {
        question: `Diogenes Laërtius listed ten modes of reasoning which Pyrrhonists thought justified their skeptic position: Which one of these is not mentioned in that list?`,
        choices: ['There is no reason to think one is sane while others are insane—the opposite could be true.',
        'Each sense gives a different impression of the same object.',
        'When a thing is rare, it surprises people. When a thing is common, it does not surprise people.',
        'Each person can hear a story and come to a different interpretation'],
        answer: 'Each person can hear a story and come to a different interpretation'
        },
        {
        question: `What is scientific skepticism?`,
        choices: ['A position in which one questions the veracity of claims lacking empirical evidence',
        'A position in which one questions the claims of the scientific community',
        'A position in which one questions the veracity of empirical evidence',
        'A position in which one doubts the accuracy of science to discover reality'],
        answer: 'A position in which one questions the veracity of claims lacking empirical evidence'
        },
        {
        question: `Which of these professions tends to be a large target of scientific skepticism?`,
        choices: ['Biologist',
        'Psychic',
        'Paleontologist',
        'Physician',],
        answer: 'Psychic'
        },
        {
        question: `What is Presuppositionalism?`,
        choices: ['A school of Christian apologetics that believes the Christian faith is the only basis for rational thought',
        'A school of thought that believes all truth must be assumed',
        'A position in which one accepts that truth is unknowable and bases their reality on a set of arbitrary or pragmatic beliefs',
        'A position in which one denies all evidence contrary to their assumed beliefs'],
        answer: 'A school of Christian apologetics that believes the Christian faith is the only basis for rational thought'
        }
    ]

let questionIndex = -1;
let score = 0;

function startButton () {
    console.log('startButtonRunning')
    $('main').on('click', '.start', function () {
        questionIndex = -1;
        score = 0;
        askNextQuestion (getNextQuestionIndex());
    });
}

function getNextQuestionIndex () {
    console.log('getNextQuestionIndex')
    return questionIndex += 1;
}

function askNextQuestion (questionIndex) {
    console.log('runaskQuestion');
    if (questionIndex > STORE.length - 1) {
        results ();
    }
    else {
        let newChoices = getChoicesInHTML(questionIndex);
        $('main').html(`<div class = "stats-row">
        <p class = "stats">Question ${questionIndex + 1}/10</p>
        <p class = "stats">Score: ${score}</p>
        </div>
        <div>
            <h2>${STORE[questionIndex].question}</h2>
        </div>
        <form>
            ${newChoices}
            <div>
                <input class = "submit" type = "submit" value="Submit"></input>
            </div>
        </form>`);
    }
}

function getChoicesInHTML (questionIndex) {
    console.log('gettingChoicesInHTML');
    let questionChoices = [];
    for (let i=0; i<4; i++) {
        questionChoices.push(
            `<div class="answer">
                <div class = "radio-button">
                    <input type = "radio" name="choice" value = "${STORE[questionIndex].choices[i]}" id = "choice${i}" required>
                </div>
                <div class = "label-div">
                    <label for="choice${i}">${STORE[questionIndex].choices[i]}</label>
                </div>
            </div>`
        )
    }
    return questionChoices.join('');
}


function submitAnswer () {
    $('main').on('submit', function(event) {
        event.preventDefault();
        let chosenAnswer = $('input:checked').val();
        checkAnswer (chosenAnswer);
        updateStats ();
        console.log(`${chosenAnswer}`);
    } )
}

//Adds css class .selectedChoice to the selected .answer choice
function selectAnswer () {
    $('main').on('click', '.answer', function() {
        $(this).find('input').prop('checked', true);
        $('.answer').removeClass('selectedChoice')
        $(this).addClass('selectedChoice');
    })
}

function updateStats () {
    $('div').first().html(`<p class = "stats">Question ${questionIndex + 1}/10</p>
    <p class = "stats">Score: ${score}</p>`);
    console.log('updateStats');
}

function addScore () {
    score += 1;
}

function checkAnswer (chosenAnswer) {
    console.log('checkingAnswer');
    let answerSelect = STORE[questionIndex].answer;
    if (chosenAnswer === answerSelect) {
        addScore();
        correctFeedback (answerSelect);
    }
    else {
        wrongFeedback (answerSelect);
    }
}
  
function correctFeedback (answerSelect) {
    console.log(`runRightFeedback`);
    $(`input[value="${answerSelect}"]`).prop('checked', true);
    $('input:checked').closest('.answer').addClass('correct');
    $('h2').html(`You're right!<br>The Correct Answer Was:<br><br>
    ${STORE[questionIndex].answer}`);
    $('div').last().html(`<input class = "next" type = "button" value="Next Question"></input>`);
}

function wrongFeedback (answerSelect) {
    console.log(`runWrongFeedback`);
    $(`input[value="${answerSelect}"]`).prop('checked', true);
    $('input:checked').closest('.answer').addClass('wrong');
    $('h2').html(`You're wrong!<br>The Correct Answer Was:<br><br>
    ${STORE[questionIndex].answer}`);
    $('div').last().html(`<input class = "next" type = "button" value="Next Question"></input>`);
}

function nextButton () {
    $('main').on('click', '.next', function() {
        askNextQuestion (getNextQuestionIndex());
        console.log('next_button')
    })
}

function results () {
    console.log('runResults');
    let grade = calculateResults();
    $('main').html(`<div>
            <h2>Good Job! You scored ${grade}!</h2>
        </div>
        <div>
            <h2>Click start to try again</h2>
        </div>
        <form>
            <div>
                <input class = "start" type = "button" value = "Start">
            </div>
        </form>`);
}

function calculateResults () {
    console.log(`calculateResults`);
    return (score/questionIndex * 100).toFixed(0) + '%';
}

function quizApp () {
    console.log('quizAppRunning');
    startButton ();
    submitAnswer ();
    nextButton();
    selectAnswer();
}

$(quizApp)