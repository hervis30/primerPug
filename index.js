const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');

const app = express();
//setings
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


//middleware
dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//definir la variable con el valor de la variable entorno (dotenv) .env

port=process.env.PORT || 3000;

//arreglo de objetos users 
let users = [
    {username: 'tv', password: '11',name:'teresa gutierres'},
    {username: 'fz', password: '22',name:'faustino zapata'}
]

//routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    //tomar la info del formulario
let {username, password} = req.body;
let user = users.find(user => user.username === username && user.password === password);
if (user !== undefined) {
res.render('profile', {name: user.name});
}else{
    res.render('login');
}
});
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
})