var express = require('express');
var router = express.Router();

/* recuperer les collaborateurs. */
router.get('/', function(req, res, next) {
	var provider = req.provider,
		limit = 10,
		count = 0;
	provider.getCount(function(err,_count){
		count = _count;

		var numberOfPage = Math.ceil(count/limit),
		page = req.query.page;
		page = page > numberOfPage?numberOfPage:page;
		page = (page<=1) ?1:page;

		provider.findAll( page, function(error,cbs){
			res.json(cbs);
		});
	});
});



router.post('/new', function(req, res){
		 var provider = req.provider;
    provider.save(req.body, function( error, collaborateur) {
    	if (error) {
    		res.render(error);
    	}
    	else{
    	  res.redirect('/collaborateurs');	
		}
       
    });
});

router.get('/count', function(req, res) {
	var provider = req.provider;
	provider.getCount(function(err, _count) {
		if(err) throw new Error('Something happened with count');
		else res.json(_count);
	});
});

router.param('id', function(req, res, next, id) {
	var regex = /[a-zA-Z0-9]{24}/;
	var captures;
	if(captures = regex.exec(id)) {
		req.params.id = id;
		next();
	} else {
		next('/');
	}
});

router.get('/:id', function(req, res) {
	 var provider = req.provider;
    provider.findById(req.params.id, function(error, collaborateur) {
        res.json(collaborateur);
    });
});

router.post('/:id/remove', function(req, res) {
	 var provider = req.provider;
    provider.remove(req.params.id, req.body,function(error, collaborateur) {
    	if(error){
			res.render(error);    	
    	}
    	else{
    		res.redirect('/collaborateurs/'+req.params.id);
    	}
    });
});

router.get('/:id/edit', function(req, res) {
	 var provider = req.provider;
    provider.findById(req.params.id, function(error, collaborateur) {
        res.json(collaborateur);
    });
});

router.post('/:id/edit', function(req, res) {
	 var provider = req.provider;
    provider.update(req.params.id, req.body, function(error, collaborateur) {
        if(error){
        	res.render(error);
        }
        else{
         res.redirect('/collaborateurs/'+req.params.id);
        }
    });
});

module.exports = router;
