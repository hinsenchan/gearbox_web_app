import Ember from 'ember';

var VehiclesController = Ember.ArrayController.extend({
	//set bootstrap collapse hash for vehicles
	setHashCollapseID: function() {
		var size = this.get('content.length');
		var collapseHash = '#collapse';
		for (var i=0; i<size; i++) {
			var output = collapseHash + this.get('content').objectAt(i).get('id');
			this.get('content').objectAt(i).set('hashCollapseID', output);
		}
	},
	//set bootstrap collapse id for vehicles
	setCollapseID: function() {
		var size = this.get('content.length');
		var collapse = 'collapse';
		for (var i=0; i<size; i++) {
			var output = collapse + this.get('content').objectAt(i).get('id');
			this.get('content').objectAt(i).set('collapseID', output);
		}
	}	
});

export default VehiclesController;