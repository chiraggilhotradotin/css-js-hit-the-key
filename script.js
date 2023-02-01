document.getElementById("ground").style.width = window.innerWidth - window.innerWidth % 50 + "px";
document.getElementById("ground").style.height = window.innerHeight - window.innerHeight % 50 - 50 + "px";

score = 0;
correct = 0;
wrong = 0;
per_move = 1000;

document.addEventListener("keypress", function(event){
    key = document.querySelector(`div.keys[char='${event.key}']`);
    if(key == undefined)
    {
        wrong++;
        score--;
    }
    else
    {
        score++;
        correct++;
        key.remove();
        if(score % 10 == 0)
        {
            per_move -= per_move*1/100;
        }
    }
    document.getElementById("score").innerHTML = score;
});

characters = "abcdefghijklmnopqrstuvwxyz";
function generate_key()
{
    char = characters[Math.floor(Math.random()*characters.length)];
    left = Math.floor(Math.random()*(((window.innerWidth - window.innerWidth%50 - 50)/50)+1))*50;
    document.getElementById("ground").innerHTML += `<div class='keys' style="top:0px; left:${left}px;" char="${char}">${char}</div>`;
}

function move_down()
{
    keys = document.getElementsByClassName("keys");
    for(i=0;i<keys.length;i++)
    {
        keys[i].style.top = parseInt(keys[i].style.top.replace("px","")) + 50 + "px";
        if((window.innerHeight - window.innerHeight%50 - 100) <= parseInt(keys[i].style.top.replace("px","")))
        {
            clearInterval(move_down_interval);
            clearInterval(generate_key_interval);
            document.getElementById("scorediv").innerText = `Gameover. Score = ${score}, Correct = ${correct}, Wrong = ${wrong}.`;
        }
    }
}


document.getElementById("start").addEventListener("click", function(){
    move_down_interval = setInterval(move_down, per_move);
    generate_key_interval = setInterval(generate_key, per_move);
    document.getElementById("start").style.display = "none";
});