// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
//获取按钮的选择值
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
}

function notificaiton(result) {
    if (result === "你赢了") {
        alert("你赢了");
    } else if (result === "你输了") {
        alert("你输了");
    } else if (result === "平局") {
        alert("平局");
    }
    return
}