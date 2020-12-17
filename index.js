const express = require('express');
const session = require('express-session');
const app = express();

let globalCounter = 0;

app.use(
	session({
		// mandatory configuration ensures that session IDs are not predictable
		//  random generator?
		secret: 'SunnyB3aches',
		// resave states that if yo uhaven't changed anything, don't resave
		// it is recommended and reduces session concurrency issues
		resave: false,
		// this option says if I am new but not modified, still save
		saveUnitialized: true,
	})
);

// Session logging middleware
app.use((req, res, next) => {
	console.log('SESSION -> ', req.session);
	next();
});

// Counter Exercise
app.use((req, res, next) => {
	globalCounter++;
	if (!req.session.counter) req.session.counter = 0;
	console.log('Client Counter', ++req.session.counter);
	console.log('Global Counter', globalCounter);
	next();
});

app.get('/', (req, res, next) => {
	res.send('Hello');
});

app.listen(8080, () => console.log('Listening at http://localhost:8080'));
