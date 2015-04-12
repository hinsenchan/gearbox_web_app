import DS from "ember-data";
 
var Tutorial = DS.Model.extend({
  category: DS.belongsTo('category'),
  review: DS.hasMany('review', {async: false}),
  title: DS.attr(),
  description: DS.attr(),
  tools: DS.attr(),
  parts: DS.attr(),
  process: DS.attr(),
  images: DS.attr()
});

/*
Tutorial.reopenClass({
  FIXTURES: [
    {
    	id: 1,
      category: 1,
    	title: 'Oil Change Procedure',
    	description: [
        "You should change both oil and filter every 3000-6000 miles, depending on your riding conditions and habits. If you frequently make short trips, ride in stop-and-go traffic, extreme temperatures, or dusty conditions, stick to the short end of the range. If you only ride several hours at a time on the freeway, the oil will last longer.",
        "The Kawasaki service manual recommends changing the engine oil and oil filter after the first 500 miles (800 km) of engine break-in and at 6000 mile (10,000 km) intervals thereafter. In addition, the service manual recommends changing the engine oil prior to storing the bike. Many riders change engine oil at intervals considerably more frequent than the service manual recommendation. There is no harm in more frequent oil changes.",
        "Recommended oil weight is 10w40 to 20w50, depending on your climate. See your owner's manual. You can also use Shell Rotella 5w40.",
        "It is highly recommended that you start using synthetic oil after your bike gets 3000-5000 miles on the odometer.",
        "Synthetic oil can arguably be run longer than regular oil, but this is an issue of some debate. Some claim that synthetic can be run out to 6000 or 7000 miles, but this may allow the oil to break down too much. Change at 3000 miles if you have any doubts."
      ],
    	tools: [
        'Torque Wrench',
        '6-point socket (17mm for the oil filter and drain plug)'
      ],
    	parts: [
        '2 quarts of oil',
        'filter'
      ],
    	process: [
        "Warm up the engine by riding it. Turn off the engine and let it sit for a couple minutes. Place the bike on the centerstand. Removing the lower fairing is optional. Some people prefer to do it because it's quick, gives you a bit more room in which to work, and minimizes mess; others think it's not worth the effort, so it's up to you; it's held on by 7 bolts.",
        "First, remove the drain plug and drain the oil into a suitable 3+ quart pan (don't burn yourself). Removing the oil filler cap will help the oil drain faster. Let the oil drain until it's obvious that no more is going to come out. This will usually be 5+ minutes."
      ],
      images: [
        {
          name: '2Winterize',
          location: 'assets/images/tutorial/2Winterize.jpg'
        },
        {
          name: '2.1Winterize',
          location: 'assets/images/tutorial/2.1Winterize.jpg'
        }
      ]
    },
    {
    	id: 2,
      category: 1,
    	title: 'How do I check my oil?',
    	description: ['description2'],
      tools: ['id.2.tool1','id.2.tool2'],
      parts: ['id.2.parts1','id.2.parts2'],
      process: ['id.2.process1','id.2.process2'],
      images: ['id.2.image1','id.2.image2']
    },
    {
      id: 3,
      category: 1,
      title: 'Oil Filters',
      description: ['description3'],
      tools: ['id.3.tool1','id.3.tool2'],
      parts: ['id.3.parts1','id.3.parts2'],
      process: ['id.3.process1','id.3.process2'],
      images: ['id.3.image1','id.3.image2']
    },
    {
      id: 4,
      category: 2,
      title: 'How do I remove the fairing, fuel tank, etc?',
      description: ['description4'],
      tools: ['id.4.tool1','id.4.tool2'],
      parts: ['id.4.parts1','id.4.parts2'],
      process: ['id.4.process1','id.4.process2'],
      images: ['id.4.image1','id.4.image2']
    },    
    {
      id: 5,
      category: 2,
      title: 'I need to remove a stripped screw',
      description: ['description5'],
      tools: ['id.5.tool1','id.5.tool2'],
      parts: ['id.5.parts1','id.5.parts2'],
      process: ['id.5.process1','id.5.process2'],
      images: ['id.5.image1','id.5.image2']
    }     
  ]
});
*/

export default Tutorial;
