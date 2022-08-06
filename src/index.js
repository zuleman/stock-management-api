const app = require('./config/app');
// const dbConnect = require('./config/db');

const port = process.env.APP_PORT || 3000;

app.use(require('./routes'));
app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});


// dbConnect()
// 	.then( response => { 
// 		console.log('Database is connected to', response.config.database);
// 		app.use(require('./routes'));
// 	})
// 	.catch( error => {
// 		console.log('Database is not connected:', error);	//////////////
// 		app.all('/*', (req, res) => {
// 			res.status(500).send({ error: 'Database is not connected.' });
// 		});
// 	})
// 	.finally( () => {
// 		app.listen(port, () => {
// 			console.log(`App listening on port ${port}`);
// 		});
// 	});