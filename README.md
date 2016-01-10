# What is Gearbox?

Gearbox is a web application that uses an open-content model which allow its community to contribute to a motorcycle repair/maintenance tutorial database. Anyone can submit a tutorial to the database. Contributors can add, edit, or remove content from existing tutorials. In addition, the community can review and rate tutorials that have been submitted from other users. This web app can be used as a template to build other types of open-content applications. It can functions as both a native-style mobile and desktop web application. Gearbox was developed with HTML5, CSS3, JavaScript, and Firebase (Backend). It uses the Ember.js web applications framework which is based on the model-view-controller (MVC) software architectural pattern. Ember.js allows developers to create scalable web applications that are object oriented, has a rich object model, delcarative two-way data binding, computed properties, and auto-updated templates. Its components are modularized to ensure its maintainability, reusability, and extendability. With the help of a built-in router, it allows the application to conveniently manage its state all from a single page. Data can be stored or retrieved using the REST API. The current Gearbox release utilizes the Ember.js's local storage storage adapter for development testing. If you would like to implement Firebase for a production release, just swap out the local storage adapter for the EmberFire adapter.

## Mobile
![gearbox_web_app_collage](https://github.com/hinsenchan/gearbox_web_app/blob/master/readme/gearbox_web_app_collage.png)

## Desktop
![gearbox_web_app_desktop_collage](https://github.com/hinsenchan/gearbox_web_app/blob/master/readme/gearbox_web_app_desktop_collage.png)

# Application Features

## Index Page 

**Route:**
  *http://localhost:4200/*

* View App Description (learn more)
* Filter Tutorials By Vehicles (not fully implemented. vehicles make and models are loaded from the data store.)
* Navigate to specific Tutorials
* Navigate to add Tutorial page

![Gearbox Intro](https://github.com/hinsenchan/gearbox_web_app/blob/master/readme/img2_menuOverview.png)

## New Tutorial

**Route:**
  *http://localhost:4200/tutorial/new/*

* Navigate to specific Tutorials
* Navigate to add Tutorial page (clears filled-out contents)
* Navigate back to application index page
* Create new tutorial by…
  * selecting predefined category
  * entering a title
  * entering a description

![Gearbox Intro](https://github.com/hinsenchan/gearbox_web_app/blob/master/readme/img3_new.png)

## View Tutorial

**Route:**
  *http://localhost:4200/tutorial/1*

* Navigate to specific Tutorials
* Navigate to add Tutorial page
* Navigate back to application index page
* Navigate to Add/Edit/Erase mode via Page Options
* View Tutorial Description
* View Tutorial toolbox
* View Tutorial parts and supplies
* View Tutorial process
* View Tutorial images
* View Tutorial reviews

![Gearbox Intro](https://github.com/hinsenchan/gearbox_web_app/blob/master/readme/img4_tutorial.png)

## Tutorial - Page Options

* Change application to Read/Add/Edit/Erase mode
  * Add - adds new components
  * Edit - edit existing components
  * Erase - erase existing components

![Gearbox Intro](https://github.com/hinsenchan/gearbox_web_app/blob/master/readme/img5_pageOption.png)

## Tutorial - Add Content

* Change application to Add mode
  * Add - adds new components using a modal to input text
  * Add - for processes, images can be added as a process step and to the image carousel using the add image button

![Gearbox Intro](https://github.com/hinsenchan/gearbox_web_app/blob/master/readme/img6_add.png)

![Gearbox Intro](https://github.com/hinsenchan/gearbox_web_app/blob/master/readme/img7_addImage.png)

## Tutorial - Edit Content

* Change application to Edit mode
  * Edit - change text in existing components using a modal to modify text

![Gearbox Intro](https://github.com/hinsenchan/gearbox_web_app/blob/master/readme/img8_edit.png)

## Tutorial - Erase Content

* Change application to Erase mode
  * Erase - remove text in existing components using a modal to confirm 
  * Erase - remove images in process and image carousel using the remove image button

![Gearbox Intro](https://github.com/hinsenchan/gearbox_web_app/blob/master/readme/img9_erase.png)

![Gearbox Intro](https://github.com/hinsenchan/gearbox_web_app/blob/master/readme/img10_confirmErase.png)

## Tutorial - Description

* View tutorial description
* View total number of reviews
* View average review rating (only refreshes when the page loads. doesn’t automatically refresh when a user submits a new review. also there is a bug where if a rating wasn’t submitted with a review, the average rating will not show properly)

![Gearbox Intro](https://github.com/hinsenchan/gearbox_web_app/blob/master/readme/img11_tutorialDescription.png)

## Tutorial - Image Carousel

* View images for tutorial in a carousel. Click next or pref to scroll through the set of images

![Gearbox Intro](https://github.com/hinsenchan/gearbox_web_app/blob/master/readme/img12_imageCarousel.png)

## Tutorial - Reviews

* Review current tutorial
* Rate current tutorial
* Read past tutorials

![Gearbox Intro](https://github.com/hinsenchan/gearbox_web_app/blob/master/readme/img13_review.png)

![Gearbox Intro](https://github.com/hinsenchan/gearbox_web_app/blob/master/readme/img14_readReviews.png)

# Setup Instructions (with Ember.js previously installed)

1. run “ember init” from gearbox directory
2. in gearbox/app/routes/index.js, there are two calls that are used for debugging. by default, these are not commented out for convenience purposes. after the initial run, these two lines can be commented out for the data to persist properly. if these two lines are left in, data for app can be reset by just going back to index route at http://localhost:4200/
  * line 6: localStorage.clear() will clear local storage data
  * line 9: this.buildFixtures() will repopulate application with default fixture data
3. run “ember server” to start ember server service
4. goto http://localhost:4200/ to view app
5. add "/node_modules" and "/vendor/*" to .gitignore to stop git from updating these static dependencies

# Setup Instructions (without Ember.js installed)

This README outlines the details of collaborating on this Ember application.

## Dependency Issues

The deprecated ember-cli release used for this Ember app has some build error issues that are caused by the release of Node v4.x.x and Ember v2.x.x. In order to simplify the build process, the npm node_modules and bower vendor dependencies are included to eliminate any other unforseen dependency issues. To get up and running, you will need the following module versions:

* Node v.0.10.41
* NPM 1.4.21
* Ember v0.0.41
* Bower@1.4.0

## Installation

* `brew install homebrew/versions/node010`
* `npm install -g ember-cli@0.0.41`
* `npm install -g bower@1.4.0`
* `git clone` this repository
* You will not need to run `npm install` and `bower install` since it's already included in this repository.

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

## Commits
* add "/node_modules" and "/vendor/*" to .gitignore to stop git from updating these static dependencies

For more information on using ember-cli, visit [http://iamstef.net/ember-cli/](http://iamstef.net/ember-cli/).

# Reference

* Ember JS: http://emberjs.com/
* Ember-CLI: http://www.ember-cli.com/
* Bootstrap: http://getbootstrap.com/
* Firebase: https://www.firebase.com/
* w3Schools: http://www.w3schools.com/

# Credits

This software was developed by Hinsen Chan, Yishu Chen, Jillian Carleton at Santa Clara University in Summer 2014.
