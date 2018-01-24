// 初始化数据库
let Datastore = require('nedb');
db = new Datastore({ filename: 'db/scores.db', autoload: true });

// 把游戏得分写入数据库
exports.addScores = function(computerScores, userScores) {
  var score = {
    "computerScores": computerScores,
    "userScores": userScores
  };
  db.insert(score, function(err, newDoc) {
  });
};

// 返回得分
exports.getScores = function(fnc) {
  db.find({}, function(err, docs) {
    fnc(docs);
  });
}

// 删除数据库
exports.deleteScores = function(fnc) {
  db.remove({}, { multi: true },function (err, numRemoved) {
  });
}


