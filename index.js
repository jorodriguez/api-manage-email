const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {create,verify } = require('./controllers/tokenManage');

const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET,POST'); // If needed
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Origin,Accept,Authorization,x-access-token'); // If needed	
	res.setHeader('Access-Control-Allow-Credentials', true); // If needed
	next();
});

//app.post('/create',create);

app.get('/', (request, response) => {
	console.log(process.env);
	console.log("=====================");	
	response.json({ info: `Api para envio de correos ${process.env.NODE_ENV})` });

});

app.listen(port, () => {
	console.log(`Api para envio de correos  puerto ${port} (env:${process.env.NODE_ENV})`);
});





