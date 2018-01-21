// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
//点击按钮开始游戏
$("button[name=choice]").on("click", function () {
            let buttonid = $(this).prop("id")
            let choise2 = ''
            let random = Math.random()

            if (random < 0.34)
                choise2 = 'rock'
            else if (random <= 0.67)
                choise2 = "paper"
            else
                choise2 = "scissors"
            compare(buttonid, choise2)
        })
// 比较，并返回输赢结果
function compare(choice1, choice2) {
    if (!choice1 || !choice2) return;

    let result = '';
    if (choice1 === choice2) {
        result = "平局";
    }
    else if (choice1 === "rock") {
        if (choice2 === "scissors")
            result = '你赢了';
        else
            result = '你输了';
    }
    else if (choice1 === "paper") {
        if (choice2 === "rock")
            result = '你赢了';
        else
            result = '你输了';
    }
    else if (choice1 === "scissors") {
        if (choice2 === "rock")
            result = '你赢了';
        else
            result = '你输了';
    }
    notificaiton(result);
    addscore(result);
}


function notificaiton(result) {
    if (result === "你赢了") {
       swal("你赢了", "幸运儿!", "success");
    } else if (result === "你输了") {
       swal("你输了", "别放弃!", "error");
    } else if (result === "平局") {
        swal("平局", "加把劲!", "info");
    }
    return
}

function addscore(result){
    let computerScoresSpan = $('#computer-scores').text(), 
    computerScores = parseInt(computerScoresSpan);
    let userScoresSpan = $('#user-scores').text(), 
    userScores = parseInt(userScoresSpan);
    
    if (result === "你赢了") {
        userScores += 1;
        $('#user-scores').text(userScores);
    }else if(result === "你输了"){
        computerScores += 1;
        $('#computer-scores').text(computerScores);
    }
    

}






