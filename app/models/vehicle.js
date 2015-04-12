import DS from "ember-data";
 
var Vehicle = DS.Model.extend({
  make: DS.attr(),
  model: DS.attr(),
});

/*
Vehicle.reopenClass({
  FIXTURES: [
    {
    	id: 1,
    	make: 'Honda',
    	model: ['CBR250R','CBR600RR','CBR1000RR']
    },
    {
      id: 2,
      make: 'Kawasaki',
      model: ['Ninja 250R','Ninja 650R','Ninja ZX-6']
    },
    {
      id: 3,
      make: 'Ducati',
      model: ['Monster 696']
    }
  ]
});
*/

export default Vehicle;
