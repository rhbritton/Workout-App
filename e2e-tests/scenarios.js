'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {

  browser.get('index.html');

  it('should automatically redirect to /home when location hash/fragment is empty', function() {
    expect(browser.getLocationAbsUrl()).toMatch("/home");
  });


  describe('home', function() {

    beforeEach(function() {
      browser.get('index.html#/home');
    });


    it('should render home when user navigates to /home', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for home/);
    });

  });


  describe('restaurants', function() {

    beforeEach(function() {
      browser.get('index.html#/restaurants');
    });


    it('should render restaurants when user navigates to /restaurants', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for restaurants/);
    });

  });
});



  describe('contact', function() {

    beforeEach(function() {
      browser.get('index.html#/contact');
    });


    it('should render contact when user navigates to /contact', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for contact/);
    });

  });
});
