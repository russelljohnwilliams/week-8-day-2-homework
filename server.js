var express = require( 'express' );
var app = express();
var MongoClient = require( 'mongodb' ).MongoClient;
var bodyParser = require( 'body-parser');
app.use( bodyParser.json() );
var url = 'mongodb://localhost:27017/farm';

app.delete( '/animals/:id', function(req, res){
  MongoClient.connect( url, function(err, db){
    var collection = db.collection( 'animals' )
    var objectId = require('mongodb').ObjectId
    collection.remove({ _id : objectId });
      res.status(200).end();
      db.close()
    });
  });

app.put( '/animals/:id', function(req, res){
  MongoClient.connect( url, function(err, db){
    var collection = db.collection( 'animals' )
    var objectId = require('mongodb').objectId
    collection.updateOne({ _id:objectId },{$set:req.body } );
    console.log("ID!!", objectId)
    console.log("over here", req.body)
      res.status(200).end();
      db.close()
    });
  });

  app.post( '/animals', function(req, res){
    MongoClient.connect( url, function(err, db){
      var collection = db.collection( 'animals' )
      collection.insert( req.body );
      res.status(200).end();
      db.close()
    });
  })

  app.get( '/animals', function(req, res){
    MongoClient.connect( url, function( err, db ){ 
      var collection = db.collection( 'animals' )
      collection.find({}).toArray( function(err, docs){
        res.json( docs );
        db.close();
      });
    });
  });

  app.listen('3000', function(){
    console.log('running on 3000');
  })