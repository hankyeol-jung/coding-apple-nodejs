const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));

const MongoClient = require('mongodb').MongoClient;
app.set('view engine', 'ejs');

var db;
MongoClient.connect('mongodb+srv://admin:qwer1234@cluster0.ghdzi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', function(에러, client){
    // 연결되면 할일
    if(에러) return console.log(에러)

    db = client.db('todoapp');

    db.collection('post').insertOne({이름 : 'John', _id : 100}, function(에러, 결과){
        console.log('저장완료');
    });

    app.listen(8080, function(){
        console.log('listening on 8080');
    });
})



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
    db.collection('post').insertOne({제목 : 요청.body.title, 날짜 : 요청.body.date}, function(에러, 결과){
        console.log('저장완료');
    });
})

// 어떤 사람이 /add 라는 경로로 post 요청을 하면,
// 데이터 2개(날짜, 제목)를 보내주는데,
// 이 때, 'post'라는 이름을 가진 collection에 두개데이터를 저장하기
// {제목 : '어쩌구', 날짜 : '어쩌구'}

// /list 로 Get요청으로 접속하면
// 실제 DB에 저장된데이터들로 예쁘게 꾸며진 html을 보여줌

app.get('/list', function(요청, 응답){

    db.collection('post').find().toArray(function(에러, 결과){
        console.log(결과);
        응답.render('list.ejs', { posts : 결과 });
    });

    // 디비에 저장된 post라는 collection안의 모든 데이터를 꺼내주세요
})