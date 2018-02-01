const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const RpsGame = require('./rps-game');

//使用express定义一个 Web应用实例，并且使用静态文件启动它
const app = express();
const clientPath = `${__dirname}/../client`;
console.log(`Serving static from ${clientPath}`);
app.use(express.static(clientPath));

//创建web应用的服务器
const server = http.createServer(app);

//使用socketio监听服务器
const io = socketio(server);
let waitingPlayer = null;

//连接服务器
io.on('connection', (sock) => {
  
  //双人游戏条件，寻找在线玩家
  if (waitingPlayer) {
    new RpsGame(waitingPlayer, sock);
    waitingPlayer = null;
  } else {
    waitingPlayer = sock;
    //通知服务器有玩家在等待其他在线玩家
    waitingPlayer.emit('message', '寻找在线玩家');
   }
    
   //信息推送给所有在线的客户端和服务端
  sock.on('message', (text) => {
    io.emit('message', text);
  });
});

server.on('error', (err) => {
  console.error('Server error:', err);
});

server.listen(3000, () => {
  console.log('RPS started on 3000');
});