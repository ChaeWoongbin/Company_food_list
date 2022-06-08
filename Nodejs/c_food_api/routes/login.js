const router = require('express').Router();



//mssql
var sql = require('mssql');




//     /api/login/~~~


module.exports = router;

//test
router.get('/get/test', function(req, res, next) {
    res.status(200).json({
      "message" : "login test"
    });  
  });



router.post('/post/login_check', function(req, res, next) {

    var config = {
        user: req.body.user_id,
        password: req.body.user_password,
        server: '',//'ERP 서버 IP',
        database: '',//'ERP 정보 db이름',
            options: {
            encrypt: false ,
            port: 0 // port
        }
      }
  sql.close();  
  let cnn = sql.connect(config, function(err){
    if(err){
      res.status(200).json({
        "message" : "MSSQL 연결 실패"
      });  
        return console.error('error : ', err);
    }
    console.log('MSSQL 연결 완료')
    var request = new sql.Request();
      request.stream = true;
      
      query = 'select last_name from pc_user_def where user_id = \''+ req.body.user_id + '\' '
      
      request.query(query , (err, recordset) => {
          if(err){
              return console.log('query error :',err)
          }
      });

      res.status(200).json({
        "message" : "접속 계정 확인"
      });  
    cnn.close();
      return console.log(query );
  })
  });
