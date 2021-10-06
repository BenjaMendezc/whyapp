const Router = require('express')
const {Reasons} = require ('../db/models/index.js')
const router = Router()


router.get('/', (req, res, next)=>{

	const {key} = req.query

	const findReason =  Reasons.findOne({
		where:{
			id: key
		}
	})
	.then((result)=>{
		if(result === null){
			return res.status(404).send('No reason found, stay home')
		} else {
			return res.send(result)
		}
	})
	.catch(next)
});

router.get('/all', async (req, res, next)=>{

	const findLength = await Reasons.findAll()
	return res.send(findLength)
	
})

module.exports = router