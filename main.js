let questionIndex = -1;
let score = 0;

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
            'I would like coffe with that',
            'Therefore I exist',
            'I think?'],
        answer: 'Therefore I am'
        },
        {
        question: 'What is the best way to describe what Descartes meant when he wrote, I think, therfore I am?',
        choices: ['Descartes tried to doubt his own existence, but found that even his doubting showed that he existed, since he could not doubt if he did not exist.',
            'Descartes beleived that only that which can think can be proven to truly exist.',
            'Truth is determained by the individual.',
            'We create our own realities and determain for ourselves what is means to exist.'],
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
        question: `Which of these proffesions tends to be a large target of scientific skepticism?`,
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
            'A position in which one accepts that truth is unknowable and bases thier reality on a set of arbitrary or pragmatic beliefs',
            'A position in which one denies all evidance contrary to their assumed belifes'],
        answer: 'A school of Christian apologetics that believes the Christian faith is the only basis for rational thought'
        }
    ]

function quizApp () {
    console.log('quizApp');
    startButton ();
    submitAnswer ();
    nextButton();
    answerButtonStyles();
}

function startButton () {
    console.log('startButton')
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
        $('main').html(`<div class = "stats-row">
        <p class = "stats questionNumber">Question ${questionIndex + 1}/10</p>
        <p class = "stats score">Score: ${score}</p>
        </div>
        <div class = "row">
            <h2>${STORE[questionIndex].question}</h2>
        </div>
        <form>
            <div class="row answer">
                <div class = "radio-button">
                    <input type = "radio" name="choice" value = "${STORE[questionIndex].choices[0]}" id = "choice1" required>
                </div>
                <div class = "label-div">
                    <label for="choice1">${STORE[questionIndex].choices[0]}</label>
                </div>
            </div>
            <div class="row answer">
                <div class = "radio-button">
                    <input type = "radio" name="choice" value = "${STORE[questionIndex].choices[1]}" id = "choice2" required>
                </div>
                <div class = "label-div">
                    <label for="choice2">${STORE[questionIndex].choices[1]}</label>
                </div>
            </div>
            <div class="row answer">
                <div class = "radio-button">                            
                    <input type = "radio" name="choice" value = "${STORE[questionIndex].choices[2]}" id = "choice3" required>
                </div>
                <div class = "label-div">
                    <label for="choice3">${STORE[questionIndex].choices[2]}</label>
                </div>
            </div>
            <div class="row answer">
                <div class = "radio-button">
                <input type = "radio" name="choice" value = "${STORE[questionIndex].choices[3]}" id = "choice4" required>
                </div>
                <div class = "label-div">
                    <label for="choice4">${STORE[questionIndex].choices[3]}</label>
                </div>
            </div>
            <div class = "row">
                <input class = "submit navButton" type = "submit" value="Submit"></input>
            </div>
        </form>`);
    }
}

function submitAnswer () {
    $('main').on('submit', function(event) {
        event.preventDefault();
        let chosenAnswer = $('input:checked').val();
        answerFeedback (chosenAnswer);
        updateStats ();
        console.log(`${chosenAnswer}`);
    } )
}

//Adds css class to the selected row and updates the currently selected row
function answerButtonStyles () {
    $('main').on('click', function() {
        $('.answer').removeClass('selectedChoice')
        $('input:checked').closest('.answer').addClass('selectedChoice');
    })
    $('main').on('click', '.answer', function() {
        $(this).find('input').prop('checked', true);
    })
}

function updateStats () {
    $('div').first().html(`<p class = "stats questionNumber">Question ${questionIndex + 1}/10</p>
    <p class = "stats score">Score: ${score}</p>`);
    console.log('updateStats');
}

function addScore () {
    score += 1;
}

function answerFeedback (chosenAnswer) {
    let answerSelect = STORE[questionIndex].answer;
    
    if (chosenAnswer === answerSelect) {
        $(`input[value="${answerSelect}"]`).prop('checked', true);
        $('input:checked').closest('.row').addClass('correct');
        $('h2').html(`You're right!<br>The Correct Answer Was:<br><br>
        ${STORE[questionIndex].answer}`);
        addScore();
    }
    else {
        $(`input[value="${answerSelect}"]`).prop('checked', true);
        $('input:checked').closest('.row').addClass('wrong');
        $('h2').html(`You're wrong!<br>The Correct Answer Was:<br><br>
        ${STORE[questionIndex].answer}`);
    }
    $('div').last().html(`<input class = "next navButton" type = "button" value="Next Question"></input>`);
    console.log(`${answerSelect}`)
}

function nextButton () {
    $('main').on('click', '.next', function() {
        askNextQuestion (getNextQuestionIndex());
        console.log('next_button')
    })
}

function results () {
    let grade = calculateResults();
    $('main').html(`<div class = "row">
            <h2 class = "result">Good Job you scored ${grade}!</h2>
        </div>
        <div class = "row">
            <h2 class = 'restart'>Click start to try again</h2>
        </div>
        <form>
            <div class = "row">
                <input class = "start navButton" type = "button" value = "Start">
            </div>
        </form>`);
}

function calculateResults () {
    console.log(`${score/questionIndex}`);
    return (score/questionIndex * 100).toFixed(0) + '%';
}

$(quizApp)