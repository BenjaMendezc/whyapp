const {Reasons} = require('../db/models/index.js')


const createReason = async (parsedMessage)=>{
	const {key, value} = parsedMessage
	const store = await Reasons.create({id: key, value: value})

	return store
}

module.exports = {
	createReason,
}