const equationWindow = document.getElementById('equation-line')
const exitBtn = document.getElementById("exit-btn")
const durationBtn = document.getElementById("duration-btn")
const difficultyBtn = document.getElementById("difficulty-btn")
const goBtn = document.getElementById("go-btn")
const oneBtn = document.getElementById("one-btn")
const twoBtn = document.getElementById("two-btn")
const threeBtn = document.getElementById("three-btn")
const fourBtn = document.getElementById("four-btn")
const fiveBtn = document.getElementById("five-btn")
const sixBtn = document.getElementById("six-btn")
const sevenBtn = document.getElementById("seven-btn")
const eightBtn = document.getElementById("eight-btn")
const nineBtn = document.getElementById("nine-btn")
const zeroBtn = document.getElementById("zero-btn")
const dblZeroBtn = document.getElementById("dbl-zero-btn")
const dotBtn = document.getElementById("dot-btn")
const equalsBtn = document.getElementById("equals-btn")





const player = {
    name: "Jordan",
    skill: 0,
    preferences: {
        operator: "add",
        difficulty: 0.0
    },
    results:[],
    set_name: function() {
        player.name = prompt("Tell me your name and I'll give you your forture")
    },
    set_difficulty: function() {
        player.preferences.difficulty = parseFloat(prompt("What difficulty would you like to set as default?"))
    },
    record_results: function() {
        console.log("Record results")
        //record results here
    },
    set_skill: function() {
        //Sets skill based on previous results
    }
};

const game = {
    duration_type: "rounds",
    duration: 10,
    difficulty: 0.0,
    operators: ["add"],
    player_input: 0,
    results: 0,

    start_game: function() {
        console.log("Start game");

        game.start_round();
    },

    start_round: function() {
        console.log("Start round")
        

        game.next_question()
        
        //Start the multiquestion round
    },
    next_question: function() {
        console.log("Next question")

        game.evaluate_difficulty()
        let question = quizMaster.generateEquation(game.difficulty) 

        equationWindow.innerText = String(question.x) + " " + question.op + " "
                + String(question.y) + " = " 


        game.input_answer()
        console.log(game.player_input)


        console.log(question)
        
        // evaluate difficulty and send difficulty and operators to quiz master

    },
    evaluate_difficulty: function() {
        console.log("Evaluate difficulty")

        game.difficulty = game.results
        //Look at results and set a difficulty for the next question. 
    },
    input_answer: function() {
        console.log("Input answer");
        let buffer_input = ""
        let handler = function(event) {
            if (event.charCode == 13) {
                game.player_input = Number(buffer_input)
                document.removeEventListener('keypress', handler)
                return;
            }
            buffer_input += String.fromCharCode(event.charCode)
            equationWindow.innerText += String.fromCharCode(event.charCode)
        }
        document.addEventListener('keypress', handler)
    },
    check_answer: function() {
        console.log("Check answer")
        // evaluate input against the answer
    },
    record_question: function() {
        console.log("Record_question")
        // Record the users results in the results 
    },
    continue_play: function() {
        // Check if game should still continue
    }
};


const quizMaster = {
    x: 0,
    y: 0,
    ans: 0,
    generateEquation: function(difficulty) {
        console.log("Generate equation")
        quizMaster.gen_x(difficulty)
        quizMaster.gen_y(difficulty)
        quizMaster.check_answer_length()

        return {x: quizMaster.x,y: quizMaster.y,ans: quizMaster.ans, op: "+"}

    },
    rand_int: function(range) {
        return parseInt(Math.random() * range);
    },
    gen_x: function(difficulty) {
        quizMaster.x = quizMaster.rand_int(10 + difficulty)
    },
    gen_y: function(difficulty) {
        quizMaster.y = quizMaster.rand_int(10 + difficulty)
    },
    check_answer_length: function() {
        quizMaster.ans = quizMaster.x + quizMaster.y
    }
};




let new_game = game;
new_game.start_game()

