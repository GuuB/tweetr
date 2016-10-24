"use strict";

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://127.0.0.1:27017/tweetr";

const initialTweets = require("./tweets");

let db;
MongoClient.connect(MONGODB_URI, (err, data) => {
  if (err) {
    console.log('Could not connect! Unexpected error. Details below.');
    throw err;
  }
  db = data;
});

const dbMethods = {

  saveTweet: (data) => {
    db.collection("tweets").insertOne(data, (err, results) => {
      if(err) {
        console.log("saveTweet error");
      }
    });
  },

  getTweets: (_cb) => {
    db.collection("tweets").find().toArray((err, results) => {
      if(err) {
        console.log("error");
      }
      _cb(results);
    })
  }
};

module.exports = {

  connect: (onConnect) => {

    onConnect(dbMethods);

  }

}
