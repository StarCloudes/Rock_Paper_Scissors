//双人对战游戏类
class RpsGame {
    //玩家信息
    constructor(p1, p2) {
      //玩家属性
      this._players = [p1, p2];
      this._choices = [null, null];
  
      this._sendToPlayers('游戏开始!');
      //客户端获取玩家选择信息
      this._players.forEach((player, idx) => {
        player.on('choice', (choice) => {
          this._onTurn(idx, choice);
        });
      });
    }
    //方法1.输出游戏开始
    _sendToPlayer(playerIndex, msg) {
      this._players[playerIndex].emit('message', msg);
    }
    //方法2.输出本轮玩家选择情况
    _sendToPlayers(msg) {
      this._players.forEach((player) => {
        player.emit('message', msg);
      });
    }
    //方法3.获取本轮玩家自身选择情况
    _onTurn(playerIndex, choice) {
      this._choices[playerIndex] = choice;
      this._sendToPlayer(playerIndex, `你选择了 ${choice}`);
      //检查对方是否进行选择
      this._checkGameOver();
    }
    //方法4.检测是否双方均已选择并输出选择结果
    _checkGameOver() {
      const choices = this._choices;
      //如果双方进行选择，则游戏结束并比较输赢
      if (choices[0] && choices[1]) {
        //输出双方选择情况
        this._sendToPlayers('本轮结束 => ' + choices.join(' : '));
        //比较输赢结果
        this._getGameResult();
        //清空选择
        this._choices = [null, null];
        this._sendToPlayers('下一局!!!!');
      }
    }
    //方法5.比较游戏结果，方法来自stackoverflow
    _getGameResult() {
      //解码选择情况
      const p0 = this._decodeChoice(this._choices[0]);
      const p1 = this._decodeChoice(this._choices[1]);
      //转圈思想？蛮有意思的算法
      const distance = (p1 - p0 + 3) % 3;
  
      switch (distance) {
        case 0:
          this._sendToPlayers('平局!加把劲！');
          break;
  
        case 1:
          this._sendWinMessage(this._players[0], this._players[1]);
          break;
  
        case 2:
          this._sendWinMessage(this._players[1], this._players[0]);
          break;
      }
    }
    //方法6、输出游戏结果
    _sendWinMessage(winner, loser) {
      winner.emit('message', '你赢了!!!幸运儿！');
      loser.emit('message', '你输了...别放弃！');
    }
    //方法7、把选择解码成0，1，2
    _decodeChoice(choice) {
      switch (choice) {
        case 'rock':
          return 0;
        case 'scissors':
          return 1;
        case 'paper':
          return 2;
        default:
          throw new Error(`Could not decode choice ${choice}`);
      }
    }
  
  }
  
  module.exports = RpsGame;
  