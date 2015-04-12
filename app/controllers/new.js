import Ember from 'ember';

var NewController = Ember.ObjectController.extend({
	modalClass: 'modal fade',
	modalTextAreaValue: '',
	section: '',
	index: '',
	imageButton: false,
	
	//return list of categories
	categoryList: function() {
		return this.get('content.@each.name');
	}.property(),
	
	actions: {
		//create new tutorial
		createNew: function() {
			var category = this.get('selectedCategory');
			var title = this.get('newTitle');
			var description = this.get('newDescription');
			var self = this;
			var newTutorial;

			this.store.find('category', {name: category}).then(function(thisCategory){
				newTutorial = self.store.createRecord('tutorial', 
					{title: title, description: [description], tools: [], parts: [], 
						process: [], images: [], category: thisCategory.objectAt(0)}).save().then(function(newt){
							
							self.transitionToRoute('tutorial', newt.get('id'));
						});
			});
						
			this.store.find('category', {name: category}).then(function(thisCategory){
				thisCategory.addObject(newTutorial).save();
			});			

			/*
			this.store.find('category', {name: category}).then(function(thisCategory){
				newTutorial = self.store.createRecord('tutorial', 
					{title: title, description: [description], tools: [], parts: [], 
						process: [], images: [], category: thisCategory.objectAt(0)}).save();
			});

			this.store.find('category', {name: category}).then(function(thisCategory){
				thisCategory.addObject(newTutorial).save();
			});

			alert("Tutorial skeleton successfully created...");
			this.transitionToRoute('application');
			*/
		}
	},

	//refresh page
	refreshMenu: function() {
		this.send('refreshme');
	}
});

export default NewController;