//记录游戏信息（包括选择、输赢结果等）
const writeEvent = (text) => {
  //获取 events id 并写入
  const parent = document.querySelector('#events');
  const el = document.createElement('li');
  el.innerHTML = text;
  //向event节点添加子节点
  parent.appendChild(el);
};

//获取input输入信息
const onFormSubmitted = (event) => {
  //通过调用该方法，阻止默认事件，表单将不会提交到服务器
  event.preventDefault();

  //获取input值并发送给服务器
  const input = document.querySelector('#chat');
  const text = input.value;
  input.value = '';
  sock.emit('message', text);
};

//获取button选择信息
const addButtonListeners = () => {
    //监听每个button id的点击事件，通知服务器选择情况
  ['rock', 'paper', 'scissors'].forEach((id) => {
    const button = document.getElementById(id);
    button.addEventListener('click', () => {
      sock.emit('choice', id);
    });
  });
};
 

//输出游戏名称 
writeEvent('石头剪刀布游戏');
 
//客户端与服务器端通信并把message写入dom
const sock = io();
sock.on('message', writeEvent);

//选择chat-form并监听submit事件
document
    .querySelector('#chat-form')
    .addEventListener('submit', onFormSubmitted);
  
addButtonListeners();
  