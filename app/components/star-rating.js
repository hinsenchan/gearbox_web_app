import Ember from 'ember';

//star-rating component
var StarRatingComponent = Ember.Component.extend({
    maxStars: 0,
    starRating: 0,
    stars: [],
    actions: {
        //handle rating selected
        click: function(star){
            this.set('starRating', star.index);
            this.sendAction('action', star.index);
        }
    },
    //set rating selected and highlight
    setRating: function() {
        var stars = [], i = 0;
        var starRating = this.get('starRating');
        for(i = 0; i < this.get('maxStars'); i++){
            stars.pushObject(Ember.Object.create({empty:i >= starRating, index:i+1}));
        }
        this.set('stars', stars);
    }.observes('starRating').on('didInsertElement')
});

export default StarRatingComponent;