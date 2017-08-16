const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();


const todos = [
  {
  "task": "wash car",
  "done": false
}, {
  "task": "clean house",
  "done": false
}, {
  "task": "have fun",
  "done": true
}, {
  "task": "pet leika",
  "done": true
}
];


// find that task (return the index)
// todos[index].done = !todos[index].done;


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('index', {todos: todos});
});

app.post('/', (req, res) => {
  todos.push({task: req.body.todo, done: false});

  console.log(todos);

  res.redirect('/');
});

app.post('/mark', (req, res) => {
  let task = req.body.task;


  todos.forEach((todo)=>{
    todo.task === task ? (todo.done = !todo.done) : undefined
  });


  res.redirect('/');

});

app.listen(3000);
