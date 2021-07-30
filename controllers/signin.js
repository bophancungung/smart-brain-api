const handleSignin = (knex, bcrypt) => (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json('incorrect form submission');
	} else {
		knex.select('email', 'hash')
			.from('login')
			.where('email', '=', req.body.email)
			.then(data => {
				// console.log(data)
				const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
				// console.log(isValid);
				if (isValid) {
					knex.select('*').from('users')
						.where('email', '=', req.body.email)
						.then(user => res.json(user[0]))
						.catch(err => res.status(400).json('unable to get users'));
				} else {
					res.status(400).json('wrong credentials');
				}
			})
			.catch(err => res.status(400).json('wrong credentials'));
	}
}

module.exports = {
	handleSignin: handleSignin
}