const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  // var id = counter.getNextUniqueId((err, id)=>{
  // console.log('CALLBACK', callback);
  // }
  counter.getNextUniqueId((err, id) => {
    var filename = `${exports.dataDir}/${id}.txt`;
    fs.writeFile(filename, text, (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null, {id, text});
      }

    });
  });
};

exports.readAll = (callback) => {

  fs.readdir(exports.dataDir, (err, files) => {
    if (err) {
      callback(err);
    } else {
      data = _.map(files, (file) => {
        var id = file.split('.');
        id = id[0];
        text = id;
        return {id, text};
      });
      callback(null, data);

    }
  });

};

exports.readOne = (id, callback) => {

  if (fs.existsSync(`${exports.dataDir}/${id}.txt`)) {
    fs.readFile(`${exports.dataDir}/${id}.txt`, (err, data) => {
      var text = data.toString();
      callback(null, { id, text });
    });

  } else {
    callback(new Error(`No item with id: ${id}`));
  }
};


exports.update = (id, text, callback) => {
  if (fs.existsSync(`${exports.dataDir}/${id}.txt`)) {
    fs.writeFile(`${exports.dataDir}/${id}.txt`, text, (err) => {

      if (err) {
        callback(err);
      } else {
        callback(null, { id, text });
      }
    });

  } else {
    callback(new Error(`No item with id: ${id}`));
  }
};

exports.delete = (id, callback) => {

  if (fs.existsSync(`${exports.dataDir}/${id}.txt`)) {

    fs.unlink(`${exports.dataDir}/${id}.txt`, (err) => {
      if (err) {
        callback(err);
      } else {
        callback();
      }
    });
  } else {
    callback(new Error(`No item with id: ${id}`));
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');
//'/Users/mango/work/hr-rpp36-cruddy-todo/datastore/data/00001

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
