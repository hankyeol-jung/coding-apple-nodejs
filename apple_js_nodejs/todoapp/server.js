const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));

app.listen(8081, function(){
    console.log('listening on 8080');
});

// 누군가가 /pet 으로 방문을 하면..
// pet관련된 안내문을 띄어주자

app.get('/pet', function(요청, 응답){
    응답.send('펫용품 쇼핑할 수 있는 페이지입니다.');
});

app.get('/beauty', function(요청, 응답){
    응답.send('뷰티용품ㄸ')
})

app.get('/', function(요청, 응답){
    응답.sendFile(__dirname + '/index.html')
})

app.get('/write', function(요청, 응답){
    응답.sendFile(__dirname + '/write.html')
})

app.post('/add', function(요청, 응답){
    응답.send('전송완료');
    console.log(요청.body.date);
    console.log(요청.body.title);
})