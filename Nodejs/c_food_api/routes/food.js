const router = require('express').Router();



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


//     /api/food/~~~


module.exports = router;

 // insert 쿼리 생성
  /// 일자 , 부서, 등록자, 점심/저녁, 인원, 사업장, 비고, 식수/샐러드  
  function insert_query(date, cpart, user_skey, seq, count, place, temp, db){
    query = 
    'IF EXISTS (SELECT 1 FROM ' + db +' WHERE date = \'' + date +'\' and cpart= \'' + cpart + '\' and seq = \'' + seq + '\' ) ' +
	  ' BEGIN' +
		' update ' + db +' set cpart= \'' + cpart + '\', user_skey= \'' + user_skey + '\', seq= \'' + seq + '\', count= \'' + count + '\', place= \'' + place + '\', temp = \'' + temp + '\''+
		' from ' + db +' where date = \'' + date + '\' and cpart = \'' + cpart + '\' and seq = \'' + seq + '\'' +
	  ' END' +
    ' ELSE' +
	  ' BEGIN' +
		  ' insert into ' + db +' values ( \''+ date + '\' , \'' + cpart +'\', \'' + user_skey +'\', \'' + seq +'\', \'' + count +'\', \'' + place + '\', \'' + temp + '\' )' +
	  ' END' ;
    return query;
}

 function search_query(date, place, seq, db){
   query = 
        ' select n.n_name as cpart, n.date,  df.user_skey, df.seq, df.count, df.place, df.temp '+
        '  from '+
        '  ( select distinct \''+ date + '\' as date ,n_name '+
        '    from cpart'+
        '    ) n'+
        '  left outer join ('+
        '    select *'+
        '    from ' + db +
        '    where seq like \'%'+ seq + '%\' and place like \'%'+ place + '%\' '+
        '  ) df on ( n.n_name = df.cpart and n.date = df.Date  )'+
        '  where n.date = \''+ date + '\''
        return query;
 }



//test
router.get('/get/test', function(req, res, next) {
    res.status(200).json({
      "message" : "food test"
    });  
  });


// insert food member 식수등록
// insert 정보 날짜, 신청자, 인원, 점심/저녁, 사업장, 비고 , 식수/샐러드
// 기존 일자 기록있을떄 updaet / 지난일자 수정 금지
router.post('/post/insert_food', function(req, res, next) {
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
      
      query = insert_query(req.body.date, req.body.cpart, req.body.user_skey, req.body.seq, req.body.count, req.body.place, req.body.temp, req.body.db);
      
    //console.log(query)
      //query = 'select * from ' + req.body.a;
      request.query(query , (err, recordset) => {
          if(err){
              return console.log('query error :',err)
          }
          else{
            res.status(200).json({
              "result" : "데이터 입력"
            });  
          }
      });
  }) 
  });


  // 식수현황 (날짜, DB)
router.post('/post/search', function(req, res, next) {
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
      
      query = search_query(req.body.date, req.body.seq, req.body.place, req.body.db);
      //console.log(query);
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
