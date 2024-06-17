let button1 = document.querySelector('.b3');

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

button1.addEventListener('click',()=>{
    let snakes = [];
    let ladders = [];

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