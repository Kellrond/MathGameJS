const equationWindow = document.getElementById('equation-line');
const newBtn = document.getElementById("new-btn");
const clearBtn = document.getElementById("clear-btn");
const deleteBtn = document.getElementById("delete-btn");
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
const equalsBtn = document.getElementById("equals-btn");
const round_scoreboard = document.getElementById("round-scoreboard");
const correct_scoreboard = document.getElementById("correct-scoreboard");
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
        this.init_top_keys();
    };
    init = function () {
        this.player_input = 0
        this.buffer_input = ""
        this.buffer_to_screen = false
    };

    init_top_keys = function () {
        newBtn.innerText = 'New'
        clearBtn.innerText = 'Clear'
        deleteBtn.innerText = 'Delete'

        newBtn.onclick = function () { new_game.start_game() }
        clearBtn.onclick = function () { 
            this.buffer_input = "";
            console.log(`window_text ${this.window_text}`)
            equationWindow.innerHTML = this.window_text + this.buffer_input;
        }.bind(this)
        deleteBtn.onclick = function () {
            this.buffer_input = this.buffer_input.slice(0, -1)
            equationWindow.innerHTML = this.window_text + this.buffer_input
        }.bind(this)
    };

    disable_top_keys = function () {
        newBtn.innerText = ''
        clearBtn.innerText = ''
        deleteBtn.innerText = ''

        newBtn.onclick = null;
        clearBtn.onclick = null;
        deleteBtn.onclick = null;
    };

    init_numeric_input = function() {
        console.log("game.init_numeric_input")
        equalsBtn.innerText = 'Enter'
        
        oneBtn.innerText = 1;
        twoBtn.innerText = 2;
        threeBtn.innerText =3;
        fourBtn.innerText = 4;
        fiveBtn.innerText = 5;
        sixBtn.innerText = 6;
        sevenBtn.innerText = 7;
        eightBtn.innerText = 8;
        nineBtn.innerText = 9;
        zeroBtn.innerText = 0;

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
        oneBtn.onclick = null;
        twoBtn.onclick = null;
        threeBtn.onclick = null;
        fourBtn.onclick = null;
        fiveBtn.onclick = null;
        sixBtn.onclick = null;
        sevenBtn.onclick = null;
        eightBtn.onclick = null;
        nineBtn.onclick = null;
        zeroBtn.onclick = null;
    };

    operator_input = function () {
        oneBtn.innerText = "";
        twoBtn.innerText = "-";
        threeBtn.innerText ="";
        fourBtn.innerText = "+";
        fiveBtn.innerText = "";
        sixBtn.innerText = "*";
        sevenBtn.innerText = "";
        eightBtn.innerText = "/";
        nineBtn.innerText = "";
        zeroBtn.innerText = "";

        fourBtn.onclick = function() { this.add_operator_to_list('+') }.bind(this);
        twoBtn.onclick = function() { this.add_operator_to_list('-') }.bind(this);
        sixBtn.onclick = function() { this.add_operator_to_list('*') }.bind(this);
        eightBtn.onclick = function() { this.add_operator_to_list('/') }.bind(this);
    }
 
    add_to_buffer = function(v) {
        this.buffer_input += v
        equationWindow.innerHTML = this.window_text + this.buffer_input
    };

    start_game = function() {
        console.log(`--------------------------Start game. Duration: ${this.duration} ${this.duration_type}`);
        this.clear_last_game()
        this.pick_operator()
    };

    clear_last_game = function () {
        this.results = []
        this.rounds_complete = 0
        this.init()
    };

    pick_operator = function() {
        console.log("game.pick_operator")
        this.operators = []
        this.window_text = "Pick operators "
        equationWindow.innerText = this.window_text
        equalsBtn.innerText = "Enter"

        this.operator_input();

        equalsBtn.onclick = function() {
            if (this.buffer_input.length > 0 ) {
                this.write_buffer_to_operators();
                this.disable_operators();
                this.set_duration();                
            }
        }.bind(this)
    };

    disable_operators = function () {
        fourBtn.onclick = null
        twoBtn.onclick = null
        sixBtn.onclick = null
        eightBtn.onclick = null;
    };

    add_operator_to_list = function(op) {
        if (!this.buffer_input.includes(op)) {
            this.buffer_input += op            
        } else {
            this.buffer_input.split(op).join('')
        }
        equationWindow.innerText = this.window_text + " " + this.buffer_input
    };

    write_buffer_to_operators = function () {
        for (let i = 0;i < this.buffer_input.length; i++) {
            this.operators.push(this.buffer_input.charAt(i))
        }; 
        this.buffer_input = ""
        console.log(`game.write_buffer_to_operators:${this.operators}`)

    };

    set_duration = function() {
        console.log("game.set_duration");
        this.disable_operators()
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
        equalsBtn.onclick = null
        let countdown_text = [".", ".", ".", "2", ".", ".", ".", "1", ".", ".", ".", " GO! ", ""];
        equationWindow.innerText = "Ready? ";
        this.disable_numeric_input()
        
        setTimeout( function() { 
            equationWindow.innerText = "3";
            for (let i=0;i <= countdown_text.length; i++) {
                setTimeout(function () {
                    equationWindow.innerText += countdown_text[i]
                    if (i == countdown_text.length ) {
                        setTimeout(this.start_next_round(), 1000)
                    }
                    }.bind(this), 150 * i)
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
        perc_scoreboard.innerText = parseFloat(this.rounds_complete > 0 ? (number_correct / (this.rounds_complete - 0.0)) * 100 : 100.0).toFixed(2)+"%"

    };

    count_correct = function() {
        let output = 0
        this.results.forEach(result => { output += result.correct ? 1 : 0 })
        return output
    };

    ask_question = function() {
        let operator_this_round = this.random_operator()

        this.set_new_difficulty()


        let newMaster = new QuizMaster()
        this.round_question = newMaster.generateEquation(operator_this_round, this.difficulty)
        this.window_text = this.round_question.str 
        equationWindow.innerHTML = this.window_text
        console.log(`game.ask_question:             ${this.round_question.str}`)    
    };

    random_operator = function () {
        let random_int = parseInt(Math.random() * this.operators.length)
        return this.operators[random_int]
    };

    set_new_difficulty = function() {
        this.difficulty = 10 + this.count_correct()

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
            this.disable_numeric_input()
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
        equalsBtn.innerText = 'Again'
        equalsBtn.onclick = function () {
            this.clear_last_game()
            this.countdown_to_new_game()
        }.bind(this)
    };
};


class QuizMaster {
    constructor() {
        this.x = 0,
        this.y = 0,
        this.op = '',
        this.ans = 0,
        this.str = ""
    }

    generateEquation = function(op, difficulty) {
        console.log("quizMaster.generate_equation")
        this.op = op
        this.gen_x(difficulty)
        this.gen_y(difficulty)

        this.check_answer_length()
        this.write_equation_string()

        return {x: this.x,y: this.y,ans: this.ans, op: "+", str: this.str, correct: false}

    };

    rand_int = function(range) {
        let output = 0
        while (output === 0) {
            output = parseInt(Math.random() * range);
        }
        return output
    };

    gen_x = function(difficulty) {
        if (this.op === '+') {
            this.x = this.rand_int(difficulty)    
        } else if (this.op === '-') {
            while (this.x < 5) {
                this.x = this.rand_int(difficulty)
            }
        } else if (this.op === '*') {
            this.x = this.rand_int(difficulty)
        } else if (this.op === '/') {
            this.x = this.rand_int(difficulty / 2) * (this.rand_int(difficulty / 2) + 1)
        };
        
    };

    gen_y = function(difficulty) {
        if (this.op === '+') {
            this.y = this.rand_int(difficulty)
        } else if (this.op === '-') {
            this.y = this.rand_int(this.x)
        } else if (this.op === '*') {
            this.y = this.rand_int(difficulty)
        } else if (this.op === '/') {
            while (this.x % this.y != 0 ) {
                this.y = this.rand_int(this.x)
            }
        };
    };

    check_answer_length = function() {
        let temp_eq_string = this.x + this.op + this.y
        this.ans = eval(temp_eq_string)
    };

    write_equation_string = function() {
        let this_op = this.op
        if (this.op == '*') {
            this_op = 'x'
        } else if (this.op == '/') {
            this_op = '÷'
        }
        this.str = `${this.x} ${this_op} ${this.y} =&nbsp;`
    }
};


let new_game = new Game();
new_game.start_game()



