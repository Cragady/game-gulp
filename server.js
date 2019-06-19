const express = require('express'),
	app = express(),
	path = require('path'),
	Liquid = require('liquidjs'),
	PORT = process.env.PORT || 3000,
	engine = new Liquid({
		root: path.resolve(__dirname, 'dist/views/'),
		extname: '.liquid'
	});

app.engine('liquid', engine.express());
app.set('views', ['./dist/views', './dist/partials']);
app.set('view engine', 'liquid');
app.use(express.static('dist'));

app.get('/', function(req, res){
	const todos = ['swap out this for file/database-info', 'implement gulp-nodemon', 'Push to github finally(this is the first step)'];
	res.render('todolist', {
		todos: todos,
		title: 'liquid/nodemon boiler'
	});
});

app.listen(PORT, ()=>{
	console.log(`🙉 ==> Server now listening to you... ON PORT ${PORT}!!!`);
});
