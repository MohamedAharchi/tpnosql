var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
        res.render('corps', {'title' : 'It Works'});
});

router.get('/new', function(req, res) {
    res.render('collaborateurs_new.jade', { locals: {
        title: 'New Collaborateur'
    }
    });
});
router.get('/statistiques',function(req, res) {
    var provider = req.provider;
    provider.getMaxSalary(function( error, results) {
    	console.dir(results);
    	if (error) {
    		res.render(error);
    	}
    	else{
    	  res.redirect(results);	
		}
       
    });
});


module.exports = router;
