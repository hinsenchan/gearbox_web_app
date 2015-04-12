import Ember from 'ember';

var IndexRoute = Ember.Route.extend({  
  beforeModel: function() {
    //clear local storage data
    localStorage.clear();

    //recreate fixture data
    this.buildFixtures();
  },
  actions: {
    //refresh page
    refreshme: function() {
      this.refresh();
    }
  },
  model: function() {
    return Ember.RSVP.hash({
      //load vehicles from store
      vehicles: this.store.find('vehicle'),
      //load categories from store
      category: this.store.find('category'),
      //load tutorials from store
      tutorials: this.store.find('tutorial')
    });
  },
  setupController: function(controller, model) {    
    //setup vehicle controller
    this.controllerFor('vehicles').set('content', model.vehicles);
    this.controllerFor('vehicles').setHashCollapseID();
    this.controllerFor('vehicles').setCollapseID();
    //setup navigation controller
    this.controllerFor('navigation').set('content', model.category);
    this.controllerFor('navigation').set('tutorials', model.tutorials);
    this.controllerFor('navigation').set('pageOptions', false);
    this.controllerFor('navigation').setTutorialHref();
  },  
  renderTemplate: function() {
    //render index template
    this.render();
    //render navigation template
    this.render('navigation', {
      into: 'index',
      outlet: 'navigation',
      controller: this.controllerFor('navigation')
    });
    //render welcome template
    this.render('welcome', {
      into: 'index',
      outlet: 'welcome'
    });
    //render vehicle template
    this.render('vehicle', {
      into: 'index',
      outlet: 'vehicle',
      controller: this.controllerFor('vehicles')
    });
  },
  //build fixture data
  buildFixtures: function() {
    var vehicle1 = this.store.createRecord('vehicle', {
      id: 1,
      make: 'Honda',
      model: ['CBR250R','CBR600RR','CBR1000RR']
    });
    var vehicle2 = this.store.createRecord('vehicle', {
      id: 2,
      make: 'Kawasaki',
      model: ['Ninja 250R','Ninja 650R','Ninja ZX-6']
    });    
    var vehicle3 = this.store.createRecord('vehicle', {
      id: 3,
      make: 'Ducati',
      model: ['Monster 696','Panigale 899']
    }); 
    var vehicle4 = this.store.createRecord('vehicle', {
      id: 4,
      make: 'Suzuki',
      model: ['GSX-R600','SV650']
    });                
    var category1 = this.store.createRecord('category', {
      id: 1,
      name: 'Engine'
    });
    var category2 = this.store.createRecord('category', {
      id: 2,
      name: 'Bodywork & Frame'
    });
    var category3 = this.store.createRecord('category', {
      id: 3,
      name: 'Electrical & Lighting'
    });
        var category4 = this.store.createRecord('category', {
      id: 4,
      name: 'Tires'
    });
    var tutorial1 = this.store.createRecord('tutorial', {
      id: 1,
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
        '6-point socket (17mm for the oil filter and drain plug)',
        'long-handled ratchet',
        'breaker bar'
      ],
      parts: [
        '2 quarts of oil',
        'filter',
        'drain pan',
        'drain plug washer'
      ],
      process: [
        "Warm up the engine by riding it. Turn off the engine and let it sit for a couple minutes. Place the bike on the centerstand. Removing the lower fairing is optional. Some people prefer to do it because it's quick, gives you a bit more room in which to work, and minimizes mess; others think it's not worth the effort, so it's up to you; it's held on by 7 bolts.",
        "First, remove the drain plug and drain the oil into a suitable 3+ quart pan (don't burn yourself). Removing the oil filler cap will help the oil drain faster. Let the oil drain until it's obvious that no more is going to come out. This will usually be 5+ minutes.",
        'The drain plug and filter bolt can be quite stubborn to remove, so use a 6-point socket (17mm for the oil filter and drain plug) and long-handled ratchet, shown below. A 6-point socket is superior to a 12-point because it fits the bolt/nut better, providing more surface area and less chance of rounding off the head. In some more drastic cases a breaker bar may be helpful. Do not use your torque wrench to loosen the drain bolt; torque wrenches are only for checking torque as you tighten a bolt.',
        "Make darn sure you are turning the wrench in the right direction. Make sure you don't spin the bike or pull it over on top of you while you're putting pressure on the ratchet. If the bolt is so tight that you really have to pull hard on it, get some help so these things don't happen. Other suggestions for supporting the bike.",
        "After the oil drains, remove the filter bolt and plate, just in front of the drain bolt. More oil and a dirty filter element will come out. Be sure to keep all the springs/grommets in order. Once the oil is drained and the filter removed, check the filter for debris. If you see metal particles or other debris, it could mean serious engine damage is occurring. This filter looks clean, so it's time to install the new filter and o-rings.",
        "Before replacing the filter, install new o-rings on the filter bolt and plate. Coat the O-rings with oil before installation. Not doing so could cause a tear when you put everything back on.",
        "Note that many riders do not replace the small o-ring at every oil change; if you don't separate the bolt from the plate, you should maintain a good seal.",
        "Once the o-rings are in place, insert the bolt back into the filter plate. The oil filter assembly consists of the bolt/plate, a spring, a washer, the filter element, and the filter retainer. Note that the washer has a tendency to stick to the filter; check for it before pitching the old filter.",
        "Place the spring over the bolt, follower by the washer as shown.",
        "Then, place the filter element on the bolt. Dip your finger in your new oil and spread a bit around the two inner grommets on the filter, where it rides over the bolt. Then add the retainer as shown.",
        "The filter assembly is now ready to install. Dip your finger in your new oil and spread a bit around the large o-ring to prevent it from catching and being pulled out of its groove as you tighten the assembly. Screw the bolt into the crankcase, making sure the o-ring stays in place. Tighten the filter bolt to 14.5 ft/lbs.",
        "Here is a diagram of the filter assembly.",
        "Make sure the drain plug washer is installed on the drain plug and tighten the drain plug to 14.5 ft/lbs (the same as the filter bolt). Use a new drain plug washer (92065-097 GASKET, 12X22X2). Many people don't replace these every time, but they're cheap. Stock up. When you reuse the crush washer, you run the risk of oil seeping out around the already compressed (old) crush washer. Why skimp on a $0.33 part (92065-097 from ronayers.com)? Two alternatives are Hyundai part #21513-23001 or Nissan #11026-01M02.",
        "The torque value of 14.5 ft/lbs is very important. Don't over-tighten it or you risk stripping the threads out of the engine case. This is difficult to fix.",
        "After you have both the filter and the drain plug installed and properly torqued, open the filler cap on the right side of engine if you haven't already. Fill with 1.5 quarts of your favorite oil. Wait a minute, then add a very small amount of oil at a time until the level in the sight glass is up to the upper mark. Replace the filler cap. Start the engine, make sure the oil light goes out, and let the engine idle for a minute. Shut the engine off and wait a few minutes before checking the window again. Add oil as necessary to bring the level up to the upper mark (when both wheels are on the ground). Repeat until the oil level is consistently in the center or higher of the view window. Keeping the oil at or close to the upper mark is desirable, but do not overfill it, as you could blow a gasket. This is why you're adding oil bit by bit.",
        "You may also want to check the old oil for any contamination or debris. Dispose of old oil responsibly. (Recycle)",
        "Make sure you check for leaks, and check your oil level frequently. Ride it for a few minutes and check for leaks again. Make sure there is no oil leaking from around the filter assembly or drain plug."
      ],
      images: [
        {
          name: '2Winterize',
          location: 'assets/images/tutorial/2Winterize.jpg'
        },
        {
          name: '2.1Winterize',
          location: 'assets/images/tutorial/2.1Winterize.jpg'
        },
        {
          name: '3Winterize',
          location: 'assets/images/tutorial/3Winterize.jpg'          
        },
        {
          name: '600',
          location: 'assets/images/tutorial/600.jpg'
        },
        {
          name: '4Winterize',
          location: 'assets/images/tutorial/4Winterize.jpg'
        },
        {
          name: '5Winterize',
          location: 'assets/images/tutorial/5Winterize.jpg'
        },
        {
          name: '6Winterize',
          location: 'assets/images/tutorial/6Winterize.jpg'
        },
        {
          name: '575px-7Winterize',
          location: 'assets/images/tutorial/575px-7Winterize.jpg'          
        },
        {
          name: '585px-8Winterize',
          location: 'assets/images/tutorial/585px-8Winterize.jpg'
        },
        {
          name: '596px-OIL_PUMP_OIL_FILTER-2',
          location: 'assets/images/tutorial/596px-OIL_PUMP_OIL_FILTER-2.png'
        },
        {
          name: '590px-9Winterize',
          location: 'assets/images/tutorial/590px-9Winterize.jpg'
        },
        {
          name: '10Winterize',
          location: 'assets/images/tutorial/10Winterize.jpg'
        },
        {
          name: '11Winterize',
          location: 'assets/images/tutorial/11Winterize.jpg'
        }                                                     
      ],
      category: category1
    });
    var tutorial2 = this.store.createRecord('tutorial', {
      id: 2,
      title: 'How do I check my oil?',
      description: ['description2'],
      tools: ['id.2.tool1','id.2.tool2'],
      parts: ['id.2.parts1','id.2.parts2'],
      process: ['id.2.process1','id.2.process2'],
      images: ['id.2.image1','id.2.image2'],
      category: category1
    });
    var tutorial3 = this.store.createRecord('tutorial', {
      id: 3,
      title: 'Oil Filters',
      description: ['description3'],
      tools: ['id.3.tool1','id.3.tool2'],
      parts: ['id.3.parts1','id.3.parts2'],
      process: ['id.3.process1','id.3.process2'],
      images: ['id.3.image1','id.3.image2'],
      category: category1    
    });
    var tutorial4 = this.store.createRecord('tutorial', {
      id: 4,
      title: 'How do I remove the fairing, fuel tank, etc?',
      description: ['description4'],
      tools: ['id.4.tool1','id.4.tool2'],
      parts: ['id.4.parts1','id.4.parts2'],
      process: ['id.4.process1','id.4.process2'],
      images: ['id.4.image1','id.4.image2'], 
      category: category2
    });
    var tutorial5 = this.store.createRecord('tutorial', {
      id: 5,
      title: 'I need to remove a stripped screw',
      description: ['description5'],
      tools: ['id.5.tool1','id.5.tool2'],
      parts: ['id.5.parts1','id.5.parts2'],
      process: ['id.5.process1','id.5.process2'],
      images: ['id.5.image1','id.5.image2'],
      category: category2
    });
    vehicle1.save();
    vehicle2.save();
    vehicle3.save();
    vehicle4.save();
    category1.save();
    category2.save();
    category3.save();
    category4.save();
    tutorial1.save();
    tutorial2.save();
    tutorial3.save();
    tutorial4.save();
    tutorial5.save();
  }
});

export default IndexRoute;
