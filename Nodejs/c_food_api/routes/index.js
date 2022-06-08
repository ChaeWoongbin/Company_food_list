var express = require('express');
var router = express.Router();

//mssql
var sql = require('mssql');

// 정보 수정필요
var config = {
  user: '',//'<DB계정 이름>', // DB로그인 계정
  password: '',//'<DB계정 패스워드>', // DB로그인 계정
  server: '',//'<서버ip>',
  database: '',//'<DB이름>',
      options: {
      encrypt: false ,
      port: 0// <port번호>
  }
}


const cors=require('cors'); // cors 권한
router.use(cors()); // cors open

//라우터 모듈 (food)
const food = require('./food');
router.use('/api/food', food);

//라우터 모듈 (login)
const login = require('./login');
router.use('/api/login', login);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;


// mssql
router.get('/api/get/mssql', function(req, res, next) {
  sql.connect(config, function(err){
    if(err){
      res.status(200).json({
        "message" : "MSSQL 연결 실패"
      });  
        return console.error('error : ', err);
    }
    console.log('MSSQL 연결 완료')
    res.status(200).json({
      "message" : "MSSQL 연결 완료"
    });  
  })
});


// mssql 부서 검색
router.get('/api/get/depart', function(req, res, next) {
  sql.connect(config, function(err){
    if(err){
      res.status(200).json({
        "message" : "MSSQL 연결 실패"
      });  
        return console.error('error : ', err);
    }
    console.log('MSSQL 연결 완료')
    
    var request = new sql.Request();
      request.stream = true;
      
      query = 'select n_name '+
            'from cpart ';
      request.query(query , (err, recordset) => {
          if(err){
              return console.log('query error :',err)
          }
      });
      
      var result = []; // 결과 저장
      request.on('error', function(err){
          console.log(err); 
      })
      .on('row', (row) => {
          result.push(row)
      })
      .on
      ('done', () => {
          console.log('result :', result)
          res.send(result);
      });
      return console.log(query );
  })
});
