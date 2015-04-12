import Ember from 'ember';

var NewRoute = Ember.Route.extend({
  model: function(params) {
    return Ember.RSVP.hash({
      //retrieve category from store
      category: this.store.find('category'),
      //retrieve tutorial from store
      tutorials: this.store.find('tutorial')
    });
  },
  setupController: function(controller, model) {
    //set navi controller content
    this.controllerFor('navigation').set('content', model.category);
    //set navi controller tutorials
    this.controllerFor('navigation').set('tutorials', model.tutorials);
    this.controllerFor('navigation').set('pageOptions', false);
    //set links for navi controller
    this.controllerFor('navigation').setTutorialHref();    
    controller.set('content', model.category);
  },     
  renderTemplate: function() {
    //render new template
    this.render();
    //render navigation template
    this.render('navigation', {
      into: 'new',
      outlet: 'navigation',
      controller: 'navigation'
    });
  },
  actions: {
    //refresh page
    refreshme: function() {
      this.refresh();
    }
  }
});

export default NewRoute;
