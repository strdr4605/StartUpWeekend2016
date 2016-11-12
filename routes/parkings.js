(() => {
  "use strict";
  const router = require('express').Router(),
    Parking = require('../models/parking'),
    assert = require('assert');

  router.get('/getAllParkings', (req, res) => {
    Parking.find({}, (err, doc) => {
      if (err) {
        res.json(err);
      } else {
        res.json(doc);
      }
    });
  });

  router.get('/:id', (req, res) => {
    let id = req.params.id;

    Parking.find({
      id: id
    }, (err, doc) => {
      if (err) {
        res.json(err);
      } else {
        res.json(doc);
      }
    });

  });

  // create
  router.post('/', (req, res) => {
    let parking = req.body;

    // create a new user
    var newParking = Parking(parking);

    // save the user
    newParking.save(function(err) {
      if (err) throw err;
      console.log('Parking created!');
    });
    res.send({message: 'parking created'});
  });

  var time1 = 0;
  var time2 = 0;
  router.post('/changeSlots', (req, res) => {
    console.log(req.body);
    let id = req.body.id;
    let park = req.body.park;
    let sent = false
    if(id == 1) time1 = Date.now();
    if(id == 2) time2 = Date.now();
    console.log(time1)
    console.log(time2)
    if(time1 != 0 && time2 != 0){
      sent = true
      if(time1 < time2) {
        Parking.find({id: park}, (err, doc) => {
          let freeSlots = doc.freeSlots;
          freeSlots--;

          if (freeSlots < 0) {
            freeSlots = 0;
          }
          Parking.update({
            id: park
          },
            {"$set":{ "freeSlots": freeSlots}
          }, (err, doc) => {
            res.json({success: true});
          });
        });
      } else {
        Parking.find({id: park}, (err, doc) => {
          let freeSlots = doc.freeSlots;
          freeSlots++;

          if (freeSlots > doc.slots) {
            freeSlots = doc.slots;
          }

          Parking.update({
            id: park
          },
            {"$set":{"freeSlots": freeSlots
          }}, (err, doc) => {
            res.json({success: true});
          });
        });
      }
      time1 = 0;
      time2 = 0;
    }
    if (!sent) res.json({message: 'recieved'});
  });

  router.delete('/:id', (req, res) => {
    let id = req.params.id;
    Parking.remove({id: id}, (err, doc) => {
      console.log(doc);
    });
    res.json({success: true, id: id})
  });



  module.exports = router;
})();
