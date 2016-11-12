(() => {
  "use strict";

  const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

  let ParkingSchema = new Schema({
    street: String,
    info: String,
    area: Number,
    slots: Number,
    lat: Number,
    long: Number,
    img: String,
    freeSlots: Number,
    id: Number
  });

  let Parking = mongoose.model('Parking', ParkingSchema);

  module.exports = Parking;

})();
