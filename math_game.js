const equationWindow = document.getElementById('equation-line');
const newBtn = document.getElementById("new-btn");
const durationBtn = document.getElementById("duration-btn");
const difficultyBtn = document.getElementById("difficulty-btn");
const goBtn = document.getElementById("go-btn");
const oneBtn = document.getElementById("one-btn");
const twoBtn = document.getElementById("two-btn");
const threeBtn = document.getElementById("three-btn");
const fourBtn = document.getElementById("four-btn");
const fiveBtn = document.getElementById("five-btn");
const sixBtn = document.getElementById("six-btn");
const sevenBtn = document.getElementById("seven-btn");
const eightBtn = document.getElementById("eight-btn");
const nineBtn = document.getElementById("nine-btn");
const zeroBtn = document.getElementById("zero-btn");
const dotBtn = document.getElementById("dot-btn");
const addBtn = document.getElementById("add-btn");
const subtractBtn = document.getElementById("subtract-btn");
const multiplybtn = document.getElementById("multiply-btn");
const divideBtn = document.getElementById("divide-btn");
const equalsBtn = document.getElementById("equals-btn");
const round_scoreboard = document.getElementById("round-scoreboard");
const correct_scoreboard = document.getElementById("correct-scoreboard");
const wrong_scoreboard = document.getElementById("wrong-scoreboard");
const perc_scoreboard = document.getElementById("perc-scoreboard");



class Player {
    constructor() {
        this.name = "Jordan";
        this.skill = 0;
        this.preferences = {
            operators: ["+"],
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
        this.duration = 0,
        this.difficulty = 0.0,
        this.game_over = false,
        this.operators = [],
        this.rounds_complete = 0,
        this.round_question = {x: 0,y: 0,ans: 0, op: "+", str: "0 + 0 =&nbsp;", correct: true},
        this.results = [];
        this.window_text = ""
        this.init();
    };
    init = function () {
        this.player_input = 0
        this.buffer_input = ""
        this.buffer_to_screen = false
    };

    init_numeric_input = function() {
        console.log("game.init_numeric_input")
        oneBtn.onclick = function () {this.add_to_buffer("1")}.bind(this);
        twoBtn.onclick = function () {this.add_to_buffer("2")}.bind(this);
        threeBtn.onclick = function () {this.add_to_buffer("3")}.bind(this);
        fourBtn.onclick = function () {this.add_to_buffer("4")}.bind(this);
        fiveBtn.onclick = function () {this.add_to_buffer("5")}.bind(this);
        sixBtn.onclick = function () {this.add_to_buffer("6")}.bind(this);
        sevenBtn.onclick = function () {this.add_to_buffer("7")}.bind(this);
        eightBtn.onclick = function () {this.add_to_buffer("8")}.bind(this);
        nineBtn.onclick = function () {this.add_to_buffer("9")}.bind(this);
        zeroBtn.onclick = function () {this.add_to_buffer("0")}.bind(this);
    };

    disable_numeric_input = function() {
        console.log("game.disable_numeric_input")
        oneBtn.removeAttribute("onclick");
        twoBtn.removeAttribute("onclick");
        threeBtn.removeAttribute("onclick");
        fourBtn.removeAttribute("onclick");
        fiveBtn.removeAttribute("onclick");
        sixBtn.removeAttribute("onclick");
        sevenBtn.removeAttribute("onclick");
        eightBtn.removeAttribute("onclick");
        nineBtn.removeAttribute("onclick");
        zeroBtn.removeAttribute("onclick");
    };
 
    add_to_buffer = function(v) {
        this.buffer_input += v
        equationWindow.innerHTML = this.window_text + this.buffer_input
    };

    start_game = function() {
        console.log(`--------------------------Start game. Duration: ${this.duration} ${this.duration_type}`);
        this.pick_operator()
    };

    pick_operator = function() {
        console.log("game.pick_operator")
        this.operators = []
        this.window_text = "Pick operators "
        equationWindow.innerText = this.window_text
        equalsBtn.innerText = "Enter"

        addBtn.onclick = function() { this.add_operator_to_list('+') }.bind(this);
        subtractBtn.onclick = function() { this.add_operator_to_list('-') }.bind(this);
        multiplybtn.onclick = function() { this.add_operator_to_list('*') }.bind(this);
        divideBtn.onclick = function() { this.add_operator_to_list('/') }.bind(this);

        equalsBtn.onclick = function() {
            if (this.operators.length > 0 ) {
                addBtn.removeAttribute("onclick");
                subtractBtn.removeAttribute("onclick");
                multiplybtn.removeAttribute("onclick");
                divideBtn.removeAttribute("onclick");
                console.log(`game.pick_operator:            ${this.operators}`)
                this.set_duration();                
            }
        }.bind(this)
    };

    add_operator_to_list = function(op) {
        if (this.operators.find(element => element == op ) == undefined) {
            this.operators.push(op)            
        }
        equationWindow.innerText = this.window_text + " " + this.operators.join("")
    };

    set_duration = function() {
        console.log("game.set_duration");
        equalsBtn.removeAttribute("onclick");
        this.window_text = "How many rounds? "
        equationWindow.innerText = this.window_text
        this.numeric_input()
        equalsBtn.onclick = function () {
            if (this.buffer_input != "") {
                this.disable_numeric_input();
                this.duration = Number(this.buffer_input)
                console.log(`game.set_duration:             ${this.duration} `  )
                this.buffer_to_screen= false
                this.countdown_to_new_game()                
            }
        }.bind(this);

    };

    numeric_input = function () {
        console.log("game.numeric_input");
        this.init_numeric_input()
        this.buffer_input = ""
        this.buffer_to_screen = true
    };

    countdown_to_new_game = function() {
        console.log("game.countdown_to_new_game");
        equalsBtn.removeAttribute("onclick");
        let countdown_text = [".", ".", ".", "2", ".", ".", ".", "1", ".", ".", ".", " GO! ", ""];
        equationWindow.innerText = "Ready? ";
        
        setTimeout( function() { 
            equationWindow.innerText = "3";
            for (let i=0;i <= countdown_text.length; i++) {
                setTimeout(function () {
                    equationWindow.innerText += countdown_text[i]
                    if (i == countdown_text.length ) {
                        setTimeout(this.start_next_round(), 1000)
                    }
                    }.bind(this), 175 * i)
            };
        }.bind(this), 1000);
    };

    start_next_round = function() {
        console.log(`------------------------------Start round. ${this.rounds_complete + 1} of ${this.duration} ${this.duration_type}`);
        this.update_scoreboard()
        this.ask_question() 
        this.input_answer()
    };

    update_scoreboard = function() {
        let round = this.game_over ? this.rounds_complete : this.rounds_complete + 1
        let number_correct = this.count_correct()

        round_scoreboard.innerText = round
        correct_scoreboard.innerText = number_correct
        wrong_scoreboard.innerText = this.rounds_complete - number_correct
        perc_scoreboard.innerText = this.rounds_complete > 0 ? number_correct / (this.rounds_complete - 0.0) : 1.0

    };

    count_correct = function() {
        let output = 0
        this.results.forEach(result => { output += result.correct ? 1 : 0 })
        return output
    };

    ask_question = function() {
        this.set_new_difficulty()
        let newMaster = new QuizMaster()
        this.round_question = newMaster.generateEquation(this.difficulty)
        this.window_text = this.round_question.str 
        equationWindow.innerHTML = this.window_text
        console.log(`game.ask_question:             ${this.round_question.str}`)    
    };

    set_new_difficulty = function() {
        this.difficulty = 10

        console.log(`game.evaluate_difficulty:      ${this.difficulty}`)
        //Look at results and set a difficulty for the next question. 
    };


    input_answer = function() {
        console.log("game.input_answer");
        this.numeric_input()
        equalsBtn.onclick = function () {
            if (this.buffer_input != "") {
                this.player_input = Number(this.buffer_input)
                this.post_round()
            } 
        }.bind(this)
    };

    post_round = function() {
        console.log("game.post_round");
        equalsBtn.removeAttribute("onclick")
        this.check_answer()
        this.record_question()
        this.is_game_over()
        this.update_scoreboard()
        if (!this.game_over) {
            this.init()
            this.start_next_round()
        } else {
            this.end_game()
        }
    };

    check_answer = function() {
        if (this.player_input === this.round_question.ans) {
            this.round_question.correct = true
        } else {
            this.round_question.correct = false
        }
        console.log(`game.check_answer:             ${this.round_question.correct}`)
    };

    record_question = function() {
        this.rounds_complete = this.results.push(this.round_question)
        let log_results = Object.values(this.results[this.rounds_complete-1])
        console.log(`game.record_question:          ${log_results}`)

    };

    is_game_over = function() {
        
        this.game_over = ((this.rounds_complete >= this.duration) ? true : false)
        
        console.log(`game.is_game_over:             ${this.game_over}`)
        // Check if game should still continue
    };

    end_game = function () {
        equationWindow.innerText = `Game over ${this.count_correct()} of ${this.rounds_complete} correct`
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

newBtn.onclick = function() {
    new_game.start_game()
}

