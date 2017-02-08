const exp = require('express')

const router = exp.Router()

router.get('/:foldername/new',function(req,res){
	var foldername = req.params.foldername;

	res.render('new',{
		foldername
	})
})

module.exports = router;