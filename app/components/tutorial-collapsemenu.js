import Ember from 'ember';

//tutorial-collapsemenu component
var TutorialCollapsemenuComponent = Ember.Component.extend({
	actions: {
		//handle edit button and pass current section and index
		editButtonAction: function(section, index) {
			this.sendAction('editButtonAction', section, index);
		}
	}
});

export default TutorialCollapsemenuComponent;