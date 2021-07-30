const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex') ({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'postgres',
		password: 'test',
		database: 'smart-brain'
	}
});
const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => res.json('it is working'))
app.post('/signin', signin.handleSignin(knex, bcrypt))
app.post('/register', (req, res) => register.handleRegister(req, res, knex, bcrypt))
app.get('/profile/:id', (req, res) => profile.handleProfile(req, res, knex))
app.put('/image', (req, res) => image.handleImage(req, res, knex))
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})

app.listen(process.env.PORT || 3000, () => {
	console.log(`app is running on port ${process.evn.PORT}`)
})