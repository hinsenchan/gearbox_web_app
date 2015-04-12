import Ember from 'ember';

var Router = Ember.Router.extend({
  location: GearboxENV.locationType
});

Router.map(function() {	
	this.resource('tutorial', { path: '/tutorial/:tutorial_id' }, function(){});
  this.route('new', { path: '/tutorial/new' });
});

export default Router;
