document.addEventListener('DOMContentLoaded', () => {
    let dieButton1 = document.querySelector('.b1');
    let dieButton2 = document.querySelector('.b2');
    let button1 = document.querySelector('.b3');

    let playerPositions = [1, 1];
    let snakes = [];
    let ladders = [];

    /* updateDisplay1();
    updateDisplay2(); */

    function generateRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    button1.addEventListener('click',()=>{
        snakes = [];
        ladders = [];

        while(snakes.length < 3){
            let start = generateRandomNumber(2,98);
            let end = generateRandomNumber(1,start-1);
            if(!snakes.some(s => s.start === start)){
                snakes.push({start, end});
            }
        }

        while(ladders.length < 3){
            let start = generateRandomNumber(2,98);
            let end = generateRandomNumber(start+1,99);
            if(!ladders.some(l => l.start === start) && !snakes.some(s => s.start === start)){
                ladders.push({start, end});
            }
        }

        displaySnakesAndLadders(snakes,ladders);
    });

    function displaySnakesAndLadders(snakes,ladders){
        let output = document.getElementById('d3');
        let snakesHtml = '<h3>Snakes</h3>';
        snakes.forEach(snake => {
            snakesHtml += `<p>Snake from ${snake.start} to ${snake.end}.</p>`;
        });
        
        let laddersHtml = '<h3>Ladders</h3>';
        ladders.forEach(ladder => {
            laddersHtml += `<p>Ladder from ${ladder.start} to ${ladder.end}</p>`;
        });
        
        output.innerHTML = snakesHtml + laddersHtml;
    }

    /*function randint(min, max) {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
    }

    dieButton1.addEventListener("click", ()=>{
        random1 = randint(1,6);
        count1=count1+random1;
        if(count1 > 100){
            count1 = count1-random1;
            updateDisplay1();
        }
        else{
            updateDisplay1();
        }    
    } );

    dieButton2.addEventListener("click", ()=>{
        random2 = randint(1,6);
        count2=count2+random2;
        if(count2 > 100){
            count2 = count2-random2;
            updateDisplay2();
        }
        else{
            updateDisplay2();
        }    
    } );*/

    /*function updateDisplay1() {
        if(count1 == 100){
            alert("You have won!");
            display1.textContent = "You have won!";

        }
        else{
            display1.textContent=count1;
        }
        
    }
    function updateDisplay2() {
        if(count2 == 100){
            alert("You have won!");
            display2.textContent = "You have won!";

        }
        else{
            display2.textContent=count2;
        }
        
    }*/

    /* function generateRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    } */

        function rollDie() {
            return generateRandomNumber(1, 6);
        }

        function movePlayer(playerIndex) {
            let dieValue = rollDie();
            let newPosition = playerPositions[playerIndex] + dieValue;

            // Check for snakes and ladders
            let snake = snakes.find(s => s.start === newPosition);
            let ladder = ladders.find(l => l.start === newPosition);

            if (snake) {
                newPosition = snake.end;
            } else if (ladder) {
                newPosition = ladder.end;
            }

            // Update player position
            playerPositions[playerIndex] = newPosition > 100 ? 100 : newPosition;
            updateDisplay(playerIndex);

            if (newPosition >= 100) {
                alert(`Player ${playerIndex + 1} wins!`);
                resetGame();
            }
        }

        function updateDisplay(playerIndex) {
            let display = document.getElementById(`display${playerIndex + 1}`);
            display.textContent = playerPositions[playerIndex];
        }

        function resetGame() {
            playerPositions = [1, 1];
            updateDisplay(0);
            updateDisplay(1);
        }

        dieButton1.addEventListener('click', () => movePlayer(0));
        dieButton2.addEventListener('click', () => movePlayer(1));
    });