const server = require('./src/server.js')
const {sequelize} = require('./src/db/models/index.js')

sequelize.sync()
	.then(()=>{

		server.listen(3001, ()=>{
		console.log('Server started on port 3001 :)')

	});
});