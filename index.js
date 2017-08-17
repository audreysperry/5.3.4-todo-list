const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();

//create pre set tasks
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
//boiler plates
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//render the landing page with the pre-set tasks
app.get('/', (req, res) => {
  res.render('index', {todos: todos});
});

//add tasks to todo list array
app.post('/', (req, res) => {
  todos.push({task: req.body.todo, done: false});

  res.redirect('/');
});

//mark tasks complete and move to completed task section
app.post('/mark', (req, res) => {
  let task = req.body.task;
  todos.forEach((todo)=>{
    todo.task === task ? (todo.done = !todo.done) : undefined
  });

  res.redirect('/');

});

app.listen(3000);
