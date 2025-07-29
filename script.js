const quizdata = [
    {question : "Who created python?",
    option : ["Bjarne Stroustrup" ,"Guido van rossum" , "James Gosling" , "Jensen Huang"],
    answer : "Guido van rossum"
    },
    {question : "What is the only active volcano on mainland Europe called?",
    option: ["Mount Etna" , "Mount Vesuvius" , "Mount Stromboli" , "Mount Fuji"],
    answer : "Mount Vesuvius"
    },
    {question : "Who painted the Mona Lisa?",
    option: ["Vincent van Gogh" , "Pablo Picasso","Leonardo da Vinci","Michelangelo "],
    answer : "Leonardo da Vinci"
    },
    {question : 'Who wrote the novel "1984"?',
    option: [ "Aldous Huxley","Ray Bradbury" ,"J.R.R. Tolkien","George Orwell"],
    answer : "George Orwell"
    },
    {question : "Which country features a shipwreck on its national flag?",
    option: ["Bermuda" , "Cyprus" , "Malta" ,"Greece"],
    answer : "Bermuda"
    },
    {
    question: "Which civilization built the city of Machu Picchu?",
    option: ["Aztec", "Maya", "Inca", "Olmec"],
    answer: "Inca"
    },
    {
    question: "What chemical element is named after the creator of the periodic table?",
    option: ["Einsteinium", "Mendelevium", "Curium", "Seaborgium"],
    answer: "Mendelevium"
    },
    {
    question: "What is the name of the first artificial Earth satellite?",
    option: ["Sputnik 1", "Apollo 11", "Vostok 1", "Luna 2"],
    answer: "Sputnik 1"
    },
    {
    question: "In Greek mythology, who is the god of the underworld?",
    option: ["Zeus", "Poseidon", "Hades", "Ares"],
    answer: "Hades"
    },
    {
    question: "Which element on the periodic table has the highest melting point?",
    option: ["Carbon", "Iron", "Tungsten", "Osmium"],
    answer: "Tungsten"
    }
]

let questionno = 0;
let highscore = document.getElementById("highsc");
let highs = localStorage.getItem("highscore")||0;
highscore.textContent = `High Score : ${highs}`;

let score = 0;
let b1 , b2,b3 , b4 , newel;
let currentindex =-1;
let remainingquestions = [...quizdata]
let que = document.getElementById("questions")
let count = 10;
let interval;
let timer = document.getElementById("timer");
const corrects = new Audio("sound/correct.mp3");
const wrongs = new Audio("sound/extremely-loud-incorrect-buzzer_0cDaG20.mp3");
let res,playa

function play(){
    remainingquestions = shufflearray([...quizdata])
    

    document.getElementById("play").remove();
    document.getElementById("rules").remove();
    runtimer();

    for (let i = 1 ; i <= 4 ; i++){
        let newel = document.createElement("button");
        newel.id = `b${i}`;
        newel.className = "b";
        document.body.appendChild(newel);
        newel.addEventListener("click" , () => checkanswer(i))
        
    }

    b1 = document.getElementById("b1");
    b2 = document.getElementById("b2");
    b3 = document.getElementById("b3");
    b4 = document.getElementById("b4");
    
    loadquestion()
}

function shufflearray(array){
    return array.sort(()=> Math.random()-0.5)
}


function loadquestion(){
    let q = remainingquestions[0]

    let shuffledoptions = shufflearray([...q.option]);

    que.textContent = q.question;
    b1.textContent = shuffledoptions[0];
    b2.textContent = shuffledoptions[1];
    b3.textContent = shuffledoptions[2];
    b4.textContent = shuffledoptions[3];
    
    questionno+=1;
    que.dataset.answer = q.answer;

}


function checkanswer(ans){
    let providedanswer = document.getElementById(`b${ans}`).textContent

    let correct = que.dataset.answer;
    timer.textContent = count;
    
    if (providedanswer === correct){
        score+=1;
    }

    remainingquestions.shift();
    if (remainingquestions.length > 0){
        count += 5;
        loadquestion();
    }
    else{
        endfun();
    }
    
}

function runtimer(){
    if(interval) return;
    

    interval = setInterval(() => {
        count--;
        document.getElementById("timer").textContent = String(count)

        if (count <= 0){
            clearInterval(interval)
            interval = null
            setTimeout(()=> {
                const wrong = new Audio("sound/youre-taking-too-long.mp3")
                wrong.play()
            },2000)
            
            endfun()
        }       
    }, 1000);
}

function endfun(){
    clearInterval(interval);
    interval = null;
    timer.remove();
    que.remove();
    b1.remove();
    b2.remove();
    b3.remove();
    b4.remove();
    let res = document.createElement("div");

    let playa = document.createElement("button");
    playa.id = "playa";
    playa.textContent = "Play again";
    playa.onclick = replay;

    res.id = "re";
    if (score >= highs){
        highs = score;
        localStorage.setItem("highscore",highs);
        highscore.textContent = `High Score : ${highs}`;
    }

    if (score == 10){
        const audio = new Audio("sound/nice-sound-effect-95595.mp3");
        audio.play();
    }
    else if(score == 0){
        const audio1 = new Audio("sound/tuco-get-out.mp3");
        audio1.play();

    }
    else if([9,8,7,6,5].includes(score)){
        const audio2 = new Audio("sound/not-bad-not-bad.mp3");
        audio2.play();

    }
    else{
        const laugh = new Audio("sound/cat-laugh-meme-1.mp3");
        laugh.play()
    }
    if (count == 0){
        res.textContent = `You ran out of time and scored ${score}/${quizdata.length}`;
    }
    else{
    res.textContent = `You have scored ${score}/${quizdata.length} with ${count} seconds to spare`;
    }
    document.body.appendChild(res);
    document.body.appendChild(playa);
}

function replay(){
    clearInterval(interval);
    interval = null;

    const resound = new Audio("sound/gta-san-andreas-ah-shit-here-we-go-again_BWv0Gvc.mp3");
    resound.play();

    remainingquestions = shufflearray([...quizdata])
    document.getElementById("re").remove()
    document.getElementById("playa").remove()

    score = 0;
    count = 10;

    let time = document.createElement("h1")
    time.id = "timer";
    time.textContent = "10";
    document.body.appendChild(time);
    timer = document.getElementById("timer");

    let quea = document.createElement("h1");
    quea.id= "questions";
    document.body.appendChild(quea);
    que = document.getElementById("questions");
    

    runtimer()

    for (let i = 1 ; i <= 4 ; i++){
        let newel = document.createElement("button");
        newel.id = `b${i}`;
        newel.className = "b";
        document.body.appendChild(newel);
        newel.addEventListener("click" , () => checkanswer(i))
        
    }

    b1 = document.getElementById("b1");
    b2 = document.getElementById("b2");
    b3 = document.getElementById("b3");
    b4 = document.getElementById("b4");
    
    loadquestion()


}



