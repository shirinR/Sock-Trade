var db = require("../models");

module.exports = function(app) {
	app.get("/api/socks/:OwnerId?",function(req,res){
		var query = {
		 	include: [{
		 		model: db.Owner,
		 		attributes: ["profile_img", "user_name"]

		 	}]
		 };

		if(req.params.OwnerId) {
		 	query.where = {
		 		OwnerId: req.params.OwnerId
		 	}
		}

		 	db.Sock.findAll(query)
			.then(function(dbPost) {
		  	res.json(dbPost)
		});
	});

	app.get("/api/user/:id", function(req,res) {
		db.Owner.findAll({
			where: {
				id: req.params.id
			}
		}).then(function(dbUser){
			res.json(dbUser)
		});
	});

	app.get("/api/owners", function(req,res){
      	db.Owner.findAll({ }).then(function(dbPost){
          	res.json(dbPost);
      	});
  	});

	//For item.html
	app.get("/api/sock/:SockId", function(req,res){
		var query = {
		 	include: [{
		 		model: db.Owner,
		 		attributes: ["profile_img", "user_name"]
		 	}],
		 	where: {
    		id: req.params.SockId
    	}
		 };
    db.Sock.findAll(query).then(function(dbPost){
     	res.json(dbPost);
   	});
  });

};

