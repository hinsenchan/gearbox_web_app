import DS from 'ember-data';

//var ApplicationAdapter = DS.FixtureAdapter;

/*
var ApplicationAdapter = DS.FirebaseAdapter.extend({
  firebase: new window.Firebase('https://gearbox.firebaseIO.com')
});
*/

//local storage adapter
var ApplicationAdapter = DS.LSAdapter.extend({
});

export default ApplicationAdapter;