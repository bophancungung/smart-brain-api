const handleProfile = (req, res, knex) => {
	// console.log('/profile/:id');
	const { id } = req.params;
	knex.select('*').from('users').where({id})
		.then(user => user.length ? res.json(user[0]) : res.status(400))
		.catch(err => res.status(400).json('error getting user'))
}

module.exports = {
	handleProfile: handleProfile
}