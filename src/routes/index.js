const {Router} = require('express');
const becauseRoute = require('./because.js')

const router = Router()

router.use('/because', becauseRoute)

module.exports = router;