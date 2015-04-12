import DS from "ember-data";
 
var Review = DS.Model.extend({
  tutorial: DS.belongsTo('tutorial'),
  comment: DS.attr(),
  rating: DS.attr()
});

export default Review;
