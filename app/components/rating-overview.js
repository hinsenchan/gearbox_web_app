import Ember from 'ember';

//rating-overview component
var RatingOverviewComponent = Ember.Component.extend({
    setOnce: true,
    maxStars: 0,
    starRating: 0,
    stars: [],
    actions: {
        //handle rating selected
        click: function(star){
            this.set('starRating', star.index);
            //this.sendAction('action', star.index);
        }
    },
    //set rating and highlight
    setRating: function() {
        if (this.get('setOnce')) {
            var stars = [], i = 0;
            var starRating = this.get('starRating');
            for(i = 0; i < this.get('maxStars'); i++){
                stars.pushObject(Ember.Object.create({empty:i >= starRating, index:i+1}));
            }
            this.set('stars', stars);
            this.set('setOnce', false);
        }
    }.observes('starRating').on('didInsertElement')
});

export default RatingOverviewComponent;