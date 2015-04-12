import Ember from 'ember';

var NavigationController = Ember.Controller.extend({
    needs: ['tutorial/index'],
    //path to add new
    addNewLink: function() {
        return 'tutorial/new/';
    }.property(),
    actions: {
        //goto new route and refesh 
        addNew: function() {
            this.transitionToRoute("new");
            this.send('refreshme');
        },
        //change page to read state
        read: function() {
            this.get('controllers.tutorial/index').set('isEditing', false);
            this.get('controllers.tutorial/index').set('isAdding', false);            
            this.get('controllers.tutorial/index').set('editButtonLabel', '');
            this.get('controllers.tutorial/index').set('imageButton', false); 
            this.get('controllers.tutorial/index').set('modalLabel', '');
        },
        //change page to add state
        add: function(){
            this.get('controllers.tutorial/index').set('isEditing', true);
            this.get('controllers.tutorial/index').set('isAdding', true);
            this.get('controllers.tutorial/index').set('editButtonLabel', 'Add');
            this.get('controllers.tutorial/index').set('imageButton', true);            
            this.get('controllers.tutorial/index').set('modalLabel', 'Add - Enter text or Image URL');
        },
        //change page to edit state
        edit: function(){
            this.get('controllers.tutorial/index').set('isEditing', true);
            this.get('controllers.tutorial/index').set('isAdding', false);                        
            this.get('controllers.tutorial/index').set('editButtonLabel', 'Edit');
            this.get('controllers.tutorial/index').set('imageButton', false);                        
            this.get('controllers.tutorial/index').set('modalLabel', 'Edit - Change text or Image URL');
        },
        //change page to erase state
        erase: function(){
            this.get('controllers.tutorial/index').set('isEditing', true);
            this.get('controllers.tutorial/index').set('isAdding', false);                        
            this.get('controllers.tutorial/index').set('editButtonLabel', 'Erase');
            this.get('controllers.tutorial/index').set('imageButton', true);          
            this.get('controllers.tutorial/index').set('modalLabel', 'Erase - Confirm the Deletion');      
        }
    },
    //set tutorial paths for the navigation links
    setTutorialHref: function() {
        var size = this.get('tutorials.length');
        var tutorial = this.get('tutorials');
        for (var i=0; i<size; i++) {
            var id = tutorial.objectAt(i).get('id');
            var link = '/tutorial/' + id + '';
            tutorial.objectAt(i).set('href', link);
        }
    }.observes('tutorials')
});

export default NavigationController;