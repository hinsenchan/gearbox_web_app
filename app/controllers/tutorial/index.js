import Ember from 'ember';

var TutorialIndexController = Ember.ObjectController.extend({
	modalClass: 'modal fade',
	modalTextAreaValue: '',
	section: '',
	index: '',
	imageButton: false,
	//set average rating for this tutorial
	setAvgRating: function() {
		var self = this;
		var avgRating = 0;
		var totalRating = 0;
		var totalReviews = 0;
		
		return this.store.find('review').then(function(reviews){
			for (var i=0; i<reviews.get('length'); i++) {
				if (self.get('tutorial.id') === reviews.objectAt(i).get('tutorial').get('id')) {
					var rating = Number(reviews.objectAt(i).get('rating'));
					totalRating = totalRating + rating;
					totalReviews = totalReviews + 1;
				}				
			}
		}).then(function(){
			avgRating = (totalRating / totalReviews);
			if (avgRating) {
				self.set('avgRating', avgRating);
			}
			else {
				self.set('avgRating', 0);
			}
		});		
	}.observes('review'),
	//return url with review hash
	reviewLink: function() {
		return 'tutorial/' + this.get('tutorial.id') + '#reviews';
	}.property(),
	//return safestring of processes retrieved
	safeStringedProcesses: function() {		
		var processes = this.get('tutorial.process');
		var safeStringedProcesses = [];

		for (var iter=0; iter<processes.length; iter++) {						
			safeStringedProcesses[iter] = new Ember.Handlebars.SafeString(this.get('tutorial.process')[iter]);
		}
		return safeStringedProcesses;
	}.property('tutorial.process'),
	//return list of reviews for this tutorial
	reviews: function() {
		var reviewList = [];
		var self = this;
		
		this.store.find('review').then(function(reviews){
			for (var i=0; i<reviews.get('length'); i++) {
				if (self.get('tutorial.id') === reviews.objectAt(i).get('tutorial').get('id')) {
					var comment = reviews.objectAt(i).get('comment');
					var rating = reviews.objectAt(i).get('rating');
					var aReview = {comment: comment, rating: rating};
					reviewList.pushObject(aReview);
				}				
			}
		});
		
		return reviewList;
	}.property('tutorial'),
	actions: {
		//rate this tutorial
		rateTutorial: function(rating) {
			this.set('rating', rating);
		},
		//save comment and rating for this tutorial
		saveReview: function(reviewComment) {
			if (reviewComment) {
				var self = this;
				var id = this.get('tutorial.id');
				var rating = this.get('rating');

				this.store.find('tutorial', id).then(function(thisTutorial){
					self.store.createRecord('review', {comment: reviewComment, rating: rating, tutorial: thisTutorial}).save();
				});
				this.send('refreshme');
				this.setAvgRating();
				this.set('rating', 0);
			}
			else {
				alert("Please enter a review first...");
			}
		},
		//handle changes made for selected process in the modal
		imageChanges: function() {
			var section = this.get('section');
			var index = this.get('index');
			var text = this.get('modalTextAreaValue');		
			if (this.get('editButtonLabel') === 'Add') {	
				this.addNewImage(index, text);
				this.get('content.tutorial').save();		
			}
			else if (this.get('editButtonLabel') === 'Erase') {
				this.eraseImage(index);
				this.get('content.tutorial').save();
			}
			this.set('modalClass', 'modal fade');			
			this.set('section', '');
			this.set('index', '');
			this.set('modalTextAreaValue', '');		
		},
		//cancel changes made in the modal
		cancelChanges: function() {
			this.set('modalClass', 'modal fade');
			this.set('section', '');
			this.set('index', '');
			this.set('modalTextAreaValue', '');					
		},
		//save changes made to tutorial
		saveChanges: function() {
			var section = this.get('section');
			var index = this.get('index');
			var text = this.get('modalTextAreaValue');

			//handle adding
			if (this.get('editButtonLabel') === 'Add') {
				switch(section) {					
					case 'tools':
						this.addNewTool(index, text);
						this.get('content.tutorial').save();
						break;
					case 'parts':
						this.addNewPart(index, text);
						this.get('content.tutorial').save();
						break;
					case 'process':
						this.addNewProcess(index, text);
						this.get('content.tutorial').save();
						break;
				}
			}
			//handle editing
			else if (this.get('editButtonLabel') === 'Edit') {
				switch(section) {					
					case 'tools':
						this.editTool(index, text);
						this.get('content.tutorial').save();
						break;
					case 'parts':
						this.editPart(index, text);
						this.get('content.tutorial').save();
						break;
					case 'process':
						this.editProcess(index, text);
						this.get('content.tutorial').save();
						break;
				}
			}
			//handle deleting
			else if (this.get('editButtonLabel') === 'Erase') {
				switch(section) {					
					case 'tools':
						this.eraseTool(index);
						this.get('content.tutorial').save();
						break;
					case 'parts':
						this.erasePart(index);
						this.get('content.tutorial').save();
						break;
					case 'process':
						this.eraseProcess(index);
						this.get('content.tutorial').save();
						break;
				}
			}

			this.set('modalClass', 'modal fade');			
			this.set('section', '');
			this.set('index', '');
			this.set('modalTextAreaValue', '');			
		},
		//handle edit button pressed and fade in modal
		editButtonAction: function(section, index) {			
			this.set('section', section);
			this.set('index', index);
			if (section === 'process' && (this.get('editButtonLabel') === 'Add' || 
					this.get('editButtonLabel') === 'Erase')) {
				this.set('imageButton', true);
			} else {
				this.set('imageButton', false);
			}
			if (this.get('editButtonLabel') === 'Edit' || this.get('editButtonLabel') === 'Erase') { 
				this.set('modalTextAreaValue', this.get('content.tutorial').get(section).objectAt(index));
			}
			this.set('modalClass', 'modal fade in show-modal');			
		}
	},
	//add new tool
	addNewTool: function(index, item) {
		var tutorial = this.get('content.tutorial');
		var tools = tutorial.get('tools');		
		var newTools = [];

		for (var i=0; i<tools.length; i++) {
			if (i === index) { newTools.pushObject(item); }
			newTools.pushObject(tools.objectAt(i));
		}

		if (index === 'new') { newTools.pushObject(item); }

		tutorial.set('tools', newTools);
	},
	//edit tool
	editTool: function(index, item) {
		var tutorial = this.get('content.tutorial');
		var tools = tutorial.get('tools');		
		var newTools = [];

		for (var i=0; i<tools.length; i++) {
			if (i === index) { newTools.pushObject(item); }
			else { newTools.pushObject(tools.objectAt(i)); }
		}

		tutorial.set('tools', newTools);
	},
	//erase tool
	eraseTool: function(index) {
		var tutorial = this.get('content.tutorial');
		var tools = tutorial.get('tools');		
		var newTools = [];

		for (var i=0; i<tools.length; i++) {
			if (i!== index) { newTools.pushObject(tools.objectAt(i)); }
		}

		tutorial.set('tools', newTools);
	},	
	//add new part
	addNewPart: function(index, item) {
		var tutorial = this.get('content.tutorial');
		var tools = tutorial.get('parts');		
		var newTools = [];

		for (var i=0; i<tools.length; i++) {
			if (i === index) { newTools.pushObject(item); }
			newTools.pushObject(tools.objectAt(i));
		}

		if (index === 'new') { newTools.pushObject(item); }

		tutorial.set('parts', newTools);
	},
	//edit part
	editPart: function(index, item) {
		var tutorial = this.get('content.tutorial');
		var tools = tutorial.get('parts');		
		var newTools = [];

		for (var i=0; i<tools.length; i++) {
			if (i === index) { newTools.pushObject(item); }
			else { newTools.pushObject(tools.objectAt(i)); }
		}

		tutorial.set('parts', newTools);
	},
	//erase part
	erasePart: function(index) {
		var tutorial = this.get('content.tutorial');
		var tools = tutorial.get('parts');		
		var newTools = [];

		for (var i=0; i<tools.length; i++) {
			if (i!== index) { newTools.pushObject(tools.objectAt(i)); }
		}

		tutorial.set('parts', newTools);
	},		
	//add new process
	addNewProcess: function(index, item) {
		var tutorial = this.get('content.tutorial');
		var process = tutorial.get('process');		
		var newProcess = [];

		for (var i=0; i<process.length; i++) {
			if (i === index) { newProcess.pushObject(item); }
			newProcess.pushObject(process.objectAt(i));
		}

		if (index === 'new') { newProcess.pushObject(item); }

		tutorial.set('process', newProcess);
	},
	//edit process
	editProcess: function(index, item) {
		var tutorial = this.get('content.tutorial');
		var process = tutorial.get('process');		
		var newProcess = [];

		for (var i=0; i<process.length; i++) {
			if (i === index) { newProcess.pushObject(item); }
			else { newProcess.pushObject(process.objectAt(i)); }
		}

		tutorial.set('process', newProcess);
	},
	//erase process
	eraseProcess: function(index) {
		var tutorial = this.get('content.tutorial');
		var process = tutorial.get('process');		
		var newProcess = [];

		for (var i=0; i<process.length; i++) {
			if (i!== index) { newProcess.pushObject(process.objectAt(i)); }
		}

		tutorial.set('process', newProcess);
	},		
	//add new image
	addNewImage: function(index, item) {
		var tutorial = this.get('content.tutorial');
		var process = tutorial.get('process');
		var image = tutorial.get('images');		
		var newProcess = [];
		var newImages = [];
		var safeItem;

		safeItem = '<img src="'+item+'">';
		for (var i=0; i<process.length; i++) {
			if (i === index) {
			 newProcess.pushObject(safeItem); 
			}
			newProcess.pushObject(process.objectAt(i));
		}

		for (i=0; i<image.length; i++) {
			if (i === index) {
			 newImages.pushObject({name: item, location: item});
			}
			newImages.pushObject({name: image.objectAt(i).name, location: image.objectAt(i).location});
		}

		if (index === 'new') {
		 newProcess.pushObject(safeItem); 
		 newImages.pushObject({name: item, location: item});
		}

		tutorial.set('process', newProcess);
		tutorial.set('images', newImages);
	},	
	//erase image
	eraseImage: function(index, item) {
		var tutorial = this.get('content.tutorial');
		var process = tutorial.get('process');
		var image = tutorial.get('images');		
		var newProcess = [];
		var newImages = [];

		for (var i=0; i<process.length; i++) {
			if (i!== index) { newProcess.pushObject(process.objectAt(i)); }
		}

		tutorial.set('process', newProcess);

		for (i=0; i<image.length; i++) {
			if (i!== index) { newImages.pushObject(image.objectAt(i)); }
		}

		tutorial.set('images', newImages);		
	},	
	//return tutorial id 
	tutorialId: function() {
		return this.get('content.tutorial.id');
	}.property(),
	//return url with description hash
	resourceIdHash: function() {
		return '/tutorial/' + this.get('tutorialId') + '#description';
	}.property(),
	//return url with collapse tools hash
	collapseToolsHref: function() {
		return '/tutorial/' + this.get('tutorialId') + '#collapseTools';
	}.property(),
	//return url with collapse parts hash
	collapsePartsHref: function() {
		return '/tutorial/' + this.get('tutorialId') + '#collapseParts';
	}.property(),
	//return url with collapse processes hash
	collapseProcessesHref: function() {
		return '/tutorial/' + this.get('tutorialId') + '#collapseProcesses';		
	}.property(),
	//return url with collapse images hash
	collapseImagesHref: function() {
		return '/tutorial/' + this.get('tutorialId') + '#collapseImages';		
	}.property(),
	//return bootstrap image carousel in html
	carousel: function() {
		var images = this.get('content.tutorial.images');
		var carouselBody = '';
		var carouselHead =
		'<div id="carousel-images" class="carousel slide" data-ride="carousel">' +
			'<div class="carousel-inner">';

				for (var i=0; i<images.length; i++) {
					var activeDiv = '';
					if (i===0) { activeDiv = '<div class="item active">'; }
					else { activeDiv = '<div class="item">'; }

					carouselBody +=
					activeDiv +
					  '<img src="' + images[i].location + '" alt="' + '"' + images[i].name + '">' +
					  '<div class="carousel-caption">' +
					    images[i].name +
					  '</div>' +
					'</div>';
				}

		var carouselFooter = 
			'</div>' +
			'<a class="left carousel-control" href="#carousel-images" role="button" data-slide="prev">' +
				'<span class="glyphicon glyphicon-chevron-left"></span>' +
			'</a>' +
			'<a class="right carousel-control" href="#carousel-images" role="button" data-slide="next">' +
				'<span class="glyphicon glyphicon-chevron-right"></span>' +
			'</a>' +
		'</div>';

		var carousel = new Ember.Handlebars.SafeString(carouselHead + carouselBody + carouselFooter);
		return carousel;
	}.property(),		
	/*
	toolsIndices: function() {
		var tools = this.get('content.tutorial.tools');
		var index = 0;
		return tools.map(function(){
			return index++;
		});
	}.property()
	*/
});

export default TutorialIndexController;