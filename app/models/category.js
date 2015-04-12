import DS from "ember-data";
 
var Category = DS.Model.extend({
  name: DS.attr(),
  tutorials: DS.hasMany('tutorial', {async: false})
});

/*
Category.reopenClass({
  FIXTURES: [
    {
    	id: 1,
      name: 'Engine',
    	tutorials: ['1','2','3']
    },
    {
    	id: 2,
      name: 'Bodywork & Frame',
      tutorials: ['4','5']
    }
  ]
});
*/

export default Category;
