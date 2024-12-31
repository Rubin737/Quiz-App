

const easyBtn = document.querySelector('.easy');
const mediumBtn = document.querySelector('.medium');
const hardBtn = document.querySelector('.Hard');
const optionsBtns = document.querySelector('.options');
const levelCon = document.querySelector('.level-type');
const qnName = document.querySelector('.qn-name');
const nextBtn = document.querySelector('.next');
const backBtn = document.querySelector('.back');
const playAginBtn = document.querySelector('.play-again');
const lastPart = document.querySelector('.last-part');

let currentQnArray =[]
let score = 0;

async function getQuestiens(){
   
    try{
        const response = await fetch('https://opentdb.com/api.php?amount=20&category=9&type=multiple');
        if(!response.ok){
            throw new error
            
        }
        const data = await response.json();
        //console.log(data)
        currentQnArray  = data.results;
    }
    catch(error){
        console.log(`can't connect with server`)
    }

}
getQuestiens()


easyBtn.addEventListener('click', function(){
    
    startQuizz(currentQnArray)
});

mediumBtn.addEventListener('click', function(){
   
    startQuizz(currentQnArray)
});
hardBtn.addEventListener('click', function(){
    startQuizz(currentQnArray)
});




let currentQnIntex = 0;
function startQuizz(arrayInput) {

    if (currentQnIntex < arrayInput.length) {
        levelCon.innerHTML = '';
        optionsBtns.style.display = 'none';
        addQuestiens(currentQnIntex);

    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; 
    }
    return array; 
}

function addQuestiens(currentQnIntex) {
    let currentQn = currentQnArray[currentQnIntex];
    let questienNumber = currentQnIntex + 1;
    qnName.innerHTML = `${questienNumber}.${currentQn.question}`;
    levelCon.innerHTML = '';


    const allAnswers = shuffle([...currentQn.incorrect_answers, currentQn.correct_answer]);


        allAnswers.forEach(function (answer) {
        const newBtns = document.createElement('button');
        newBtns.innerHTML = answer;
        levelCon.append(newBtns);

        newBtns.addEventListener('click', function(){
            optionsBtns.style.display = 'flex';

            const allBtn = levelCon.querySelectorAll('button');
            allBtn.forEach(function (button) {
                button.classList.remove('correct', 'incorrect');
            });

            if (answer === currentQn.correct_answer) {
                score++;
                console.log(score)
                newBtns.classList.add('correct');
            } else {
                newBtns.classList.add('incorrect');

                levelCon.querySelectorAll('button').forEach(button => {
                    if (button.innerHTML === currentQn.correct_answer) button.classList.add('correct');
                });

                // correctBtn.classList.add('correct');
            }
            levelCon.querySelectorAll('button').forEach(button => button.disabled = true);
        });
    });
}

nextBtn.addEventListener('click', function () {
    currentQnIntex++;
    if (currentQnIntex < currentQnArray.length) {
        startQuizz(currentQnArray);
        optionsBtns.style.display = 'none';
    } else {
        levelCon.innerHTML = '';
document.querySelector('.score').innerHTML = ` You Scored: <strong>${score}</strong>  out of <strong>${currentQnArray.length}</strong>  Questions`;        optionsBtns.style.display = 'none';
        qnName.innerHTML = 'Completed!';
        lastPart.style.display = 'block';
    }
});

backBtn.addEventListener('click', function () {
    currentQnIntex--;
    if (currentQnIntex >= 0) {
        optionsBtns.style.display = 'none';
        document.querySelector('.score').innerHTML = ` You Scored: <strong>${score}</strong>  out of <strong>${currentQnArray.length}</strong>  Questions`;
        startQuizz(currentQnArray);
    }
});

playAginBtn.addEventListener('click', function () {
    currentQnIntex = 0;
    optionsBtns.style.display = 'none'; 
    nextBtn.style.display = 'block';   
    backBtn.style.display = 'block';
    lastPart.style.display ='none'  
    score =0;
    document.querySelector('.score').style.display = 'none';
    startQuizz(currentQnArray);
});

const mainBtn = document.querySelector('.main-menu');
mainBtn.addEventListener('click',function(){
   
  window.location.href ='quizz.html'

})
