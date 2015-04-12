import Ember from 'ember';

var TutorialRoute = Ember.Route.extend({
  model: function(params) {
    return Ember.RSVP.hash({
      //retrieve category data
      category: this.store.find('category'),
      //retreive tutorial data
      tutorials: this.store.find('tutorial'),      
      //retrieve dynamic tutorial
      tutorial: this.store.find('tutorial', params.tutorial_id),
      //retrieve reviews
      reviews: this.store.find('review'),
    });
  },
  setupController: function(controller, model) {
    //set navi controller content
    this.controllerFor('navigation').set('content', model.category);
    //set navi controller tutorials
    this.controllerFor('navigation').set('tutorials', model.tutorials);
    this.controllerFor('navigation').set('pageOptions', true);
    //set links for navi controller
    this.controllerFor('navigation').setTutorialHref();    
    //set tutorial controller
    controller.set('content', model.tutorials);
    //set tutorial/index controller
    this.controllerFor('tutorial/index').set('content', model.tutorial);
  },     
  renderTemplate: function() {
    //render tutorial template
    this.render();
    //render navigation template
    this.render('navigation', {
      into: 'tutorial',
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

export default TutorialRoute;
