var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

Provider = function(host, port) {
  this.db= new Db('gestion', new Server(host, port, {auto_reconnect: true}),{safe:false});
  this.db.open(function(){});
};


Provider.prototype.getCollection= function(callback) {
  this.db.collection('collaborateurs', function(error, collab_collection) {
    if( error ) callback(error);
    else callback(null, collab_collection);
  });
};

Provider.prototype.findAll = function(page, callback) {
    var limit = 10;
    this.getCollection(function(error, collab_collection) {
      if( error ) callback(error);
      else {
        collab_collection.find({"sortie" : {$exists : false}}).skip(page > 0?((page-1)*limit):0).limit(limit).sort({"prenom" : 1}).toArray(function(error, results) {
          if( error ) callback(error);
          else callback(null, results);
        });
      }
    });
};

Provider.prototype.getCount = function(callback) {
  this.getCollection(function(error, collabCollection) {
    if(error) callback(error);
    else {
      collabCollection.count({"sortie" : {$exists : false}},function(err, items) {
        if(err) callback(err);
        else callback(null, items);
      });
    }
  });
};


Provider.prototype.findById = function(id, callback) {
    this.getCollection(function(error, collab_collection) {
      if( error ) callback(error);
      else {
      	
         collab_collection.findOne({_id: new require('mongodb').ObjectID(id) }, function(error, result) {
          
          if( error ) callback(error);
          else callback(null, result);
        });
      }
    });
};

Provider.prototype.save = function(collaborateurs, callback) {
    this.getCollection(function(error, collab_collection) {
      if( error ) callback(error);
      else {
        collab_collection.insert(collaborateurs, function(error,result) {
        if(error){
        	callback(error);
        }	
        else{
         callback(null,result)
        }
        });
      }
    });
};

Provider.prototype.remove = function(collaborateurId,param,callback){
    this.getCollection(function(error, collab_collection) {
       	collab_collection.update(
       	{_id:new require('mongodb').ObjectID(collaborateurId)},
            {$set: param},
            function(err, object) {
              if (err){
              	callback(err)
              }else{
              	callback(null,"")    
              }
           });          
	});
		
};

Provider.prototype.update = function(collaborateurId,param,callback){
    this.getCollection(function(error, collab_collection) {
       	collab_collection.update(
       	{_id:new require('mongodb').ObjectID(collaborateurId)},
            param,
            function(err, object) {
              if (err){
              	callback(err)
              }else{
              	callback(null,"")    
              }
           });          
	});	
};

Provider.prototype.getMaxSalary = function(maxSalary, callback) {
	
    this.getCollection(function(error, collab_collection) {
      if( error ) callback(error);
      else {
        collab_collection.find().sort({salaire: 1}).limit(-1).toArray(function(error, results) {
        	if(error){
        		callback(error)
        	}else {
          	callback(null,results);  
         }     
        });
      }
    });
};

exports.Provider = Provider;
