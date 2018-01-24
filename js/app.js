const database = require('./js/database');


//开始游戏，点击按钮返回游戏数据
$("button[name=choice]").on("click", function () {
    let buttonid = $(this).prop("id");
    let choise2 = '';
    let random = Math.random();
    
    if (random < 0.34)
        choise2 = 'rock';
    else if (random <= 0.67)
        choise2 = "paper";
    else
        choise2 = "scissors";
    compare(buttonid, choise2);
})


// 电脑pk用户并返回输赢结果
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
    returnScores(result);
    showDatabase()
}
//弹出窗口显示输赢情况
function notificaiton(result) {
    if (result === "你赢了") {
    swal("你赢了", "幸运儿!", "success");
    } else if (result === "你输了") {
    swal("你输了", "别放弃!", "error");
    } else if (result === "平局") {
        swal("平局", "加把劲!", "info");
    }
}
//获得得分写入数据库
function returnScores(result){
    let computerScoresSpan = $('#computer-scores').text(), 
    computerScores = parseInt(computerScoresSpan);
    let userScoresSpan = $('#user-scores').text(), 
    userScores = parseInt(userScoresSpan);
    console.log("点击前用户得分：",userScores);
    console.log("点击前电脑得分：",computerScores);

    if (result === "你赢了") {
        userScores += 1;
        $('#user-scores').text(userScores);
    }else if(result === "你输了"){
        computerScores += 1;
        $('#computer-scores').text(computerScores);
    }    
    console.log("用户得分：",userScores);
    console.log("电脑得分：",computerScores);
    //把用户得分写入数据库
    database.addScores(computerScores,userScores);
}

//console显示数据库的最后一个比分
function showDatabase() {
    database.getScores(function(scores) {
        let i = scores.length-1;
        console.log("数据库电脑得分：",scores[i].computerScores);
        console.log("数据库用户得分：",scores[i].userScores);
        
    });
}

//重新开始游戏并删除数据库里的数据
$("#reset").on("click", function () {
    $('#user-scores').text(0);
    $('#computer-scores').text(0);
    database.deleteScores();
})








