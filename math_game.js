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


class Player {
    constructor() {
        this.name = "Jordan";
        this.skill = 0;
        this.preferences = {
            operator: "add",
            difficulty: 0.0
        };
        this.results = [];
    }

    set_name() {
        this.name = prompt("Tell me your name and I'll give you your forture");
    };
    
    set_difficulty() {
        this.preferences.difficulty = parseFloat(prompt("What difficulty would you like to set as default?"))
    };

    record_results() {
        console.log("Record results")
        //record results here
    };

    set_skill() {
        //Sets skill based on previous results
    };
    
};

class Game {
    constructor() { 
        this.duration_type = "rounds";
        this.duration = 3,
        this.difficulty = 0.0,
        this.game_over = false,
        this.operators = ['+'],
        this.rounds_complete = 0,
        this.round_question = {x: 0,y: 0,ans: 0, op: "+", str: "0 + 0 =&nbsp;", correct: true},
        this.results = [];
        this.init()
    };
    init = function () {
        this.player_input = 0
        this.buffer_input = ""
    }
    start_game = function() {
        console.log(`--------------------------Start game. Duration: ${this.duration} ${this.duration_type}`);
        this.start_next_round();  
    };


    start_next_round = function() {
        console.log(`------------------------------Start round. ${this.rounds_complete + 1} of ${this.duration} ${this.duration_type}`);
        this.ask_question()     
        this.input_answer()
    };

    ask_question = function() {
        this.set_new_difficulty()
        let newMaster = new QuizMaster()
        this.round_question = newMaster.generateEquation(this.difficulty) 
        equationWindow.innerHTML = this.round_question.str
        console.log(`game.ask_question:         ${this.round_question.str}`)   
          
    };


    set_new_difficulty = function() {
        this.difficulty = 10

        console.log(`game.evaluate_difficulty:  ${this.difficulty}`)
        //Look at results and set a difficulty for the next question. 
    };

    handler = function(event) {
        if (event.charCode == 13 && this.buffer_input != "\r") {
            document.removeEventListener('keypress', this.handler)
            this.player_input = Number(this.buffer_input);
            console.log(`input_answer:         ${this.player_input}`);
            this.post_round()
        };
        if (this.buffer_input == " ") {this.buffer_input = ""};
        this.buffer_input += String.fromCharCode(event.charCode);
        equationWindow.innerHTML = this.round_question.str + this.buffer_input.replace(/(\r\n|\n|\r)/gm, ""); 
    }.bind(this);

    input_answer = function() {
        document.addEventListener('keypress', this.handler)
    };

    post_round = function() {
        this.check_answer()
        this.record_question()
        this.is_game_over()
        if (!this.game_over) {
            this.init()
            this.start_next_round()
        }
    };

    check_answer = function() {
        if (this.player_input === this.round_question.ans) {
            this.round_question.correct = true
        } else {
            this.round_question.correct = false
        }
        console.log(`game.check_answer:         ${this.round_question.correct}`)
    };


    record_question = function() {
        this.rounds_complete = this.results.push(this.round_question)
        let log_results = Object.values(this.results[this.rounds_complete-1])
        console.log(`game.record_question:      ${log_results}`)

    };

    is_game_over = function() {
        
        this.game_over = ((this.rounds_complete >= this.duration) ? true : false)
        
        console.log(`game.is_game_over:         ${this.game_over}`)
        // Check if game should still continue
    };
};


class QuizMaster {
    constructor() {
        this.x = 0,
        this.y = 0,
        this.op = ['+'],
        this.ans = 0,
        this.str = ""
    }

    generateEquation = function(difficulty) {
        console.log("quizMaster.generate_equation")
        difficulty = 0
        this.gen_x(difficulty)
        this.gen_y(difficulty)

        this.check_answer_length()
        this.write_equation_string()

        return {x: this.x,y: this.y,ans: this.ans, op: "+", str: this.str, correct: false}

    };

    rand_int = function(range) {
        return parseInt(Math.random() * range);
    };

    gen_x = function(difficulty) {
        while (this.x === 0){
            this.x = this.rand_int(10 + difficulty)    
        }  
    };

    gen_y = function(difficulty) {
        while (this.y === 0) {
            this.y = this.rand_int(10 + difficulty)
        }
    };

    check_answer_length = function() {
        let temp_eq_string = this.x + this.op[0] + this.y
        this.ans = eval(temp_eq_string)
    };

    write_equation_string = function() {
        this.str = `${this.x} ${this.op[0]} ${this.y} =&nbsp;`
    }
};


let new_game = new Game();
new_game.start_game()

