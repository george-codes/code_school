var App = Ember.Application.create({
  LOG_TRANSITIONS: true
});


// -----------------------------------------------------------------------------
// ROUTER
// ------

App.Router.map(function() {
  this.route('credits');
  this.resource('products', function() {
    this.resource('product', { path: '/:product_id' });
  });
  this.resource('contacts', function() {
    this.resource('contact', { path: '/:contact_id' });
  });
});


// -----------------------------------------------------------------------------
// ROUTES
// ------

App.ProductsRoute = Ember.Route.extend({
  model: function() {
    // return App.PRODUCTS;
    return this.store.findAll('product');
  }
});

App.ProductRoute = Ember.Route.extend({
  model: function(params) {
    console.log(params);
    // return App.PRODUCTS.findBy('title', params.title);
    return this.store.find('product', params.product_id);
  }
});

App.ContactsRoute = Ember.Route.extend({
  model: function() {
    // return App.CONTACTS;
    return this.store.findAll('contact');
  }
});

App.ContactRoute = Ember.Route.extend({
  model: function(params) {
    // return App.CONTACTS.findBy('name', params.name);
    return this.store.find('contact', params.contact_id);
  }
});


// -----------------------------------------------------------------------------
// CONTROLLERS
// -----------

App.IndexController = Ember.Controller.extend({
  productsCount: 3,
  logo: './images/logo-small.png',
  time: function() {
    return (new Date()).toDateString()
  }.property()
});

App.ContactsIndexController = Ember.Controller.extend({
  contactName: "Jorge",
  avatar: "./images/contacts/adam.png",
  open: function() {
    if (new Date().getDay() === 0) {
      return "Closed";
    }
    else {
      return "Open";
    }
  }.property()
});


// -----------------------------------------------------------------------------
// DATA ADAPTERS
// -------------

App.ApplicationAdapter = DS.FixtureAdapter.extend();

// To communicate with an HTTP server using JSON
//  App.ApplicationAdapter = DS.RESTAdapter.extend();


// -----------------------------------------------------------------------------
// MODELS
// ------

App.Product = DS.Model.extend({
  title: DS.attr('string'),
  price: DS.attr('number'),
  description: DS.attr('string'),
  isOnSale: DS.attr('boolean'),
  image: DS.attr('string')
});

App.Contact = DS.Model.extend({
  name: DS.attr('string'),
  avatar: DS.attr('string'),
  about: DS.attr('string')
});


// -----------------------------------------------------------------------------
// FIXTURES
// --------


App.Product.FIXTURES = [
  {
    id: 1,
    title: 'Flint',
    price: 99,
    description: 'Flint is...',
    isOnSale: true,
    image: './images/products/flint.png'
  },
  {
    id: 2,
    title: 'Kindling',
    price: 249,
    description: 'Easily..',
    isOnSale: false,
    image: './images/products/kindling.png'
  },
  {
    id: 3,
    title: 'Birch',
    price: 118,
    description: 'Birch is lorem ipsum color sit amet...',
    isOnSale: true,
    image: './images/products/birch.png'
  },
  {
    id: 4,
    title: 'Bow-drill',
    price: 207,
    description: 'The Bow-drill is the most awesome..',
    isOnSale: true,
    image: './images/products/bow-drill.png'
  },
  {
    id: 5,
    title: 'Matches',
    price: 81,
    description: 'Matches is lorem ipsum color sit amet...',
    isOnSale: true,
    image: './images/products/matches.png'
  },
  {
    id: 6,
    title: 'Tinder',
    price: 116,
    description: 'The Tinder really lorem the most awesome..',
    isOnSale: true,
    image: './images/products/tinder.png'
  }
];

App.Contact.FIXTURES = [
  {
    id: 1,
    name: "Adam",
    avatar: './images/contacts/adam.png',
    about: "Lorem ipsum color sit amet"
  },
  {
    id: 2,
    name: "Martin",
    avatar: './images/contacts/martin.png',
    about: "Lorem ipsum color sit amet"
  }
];
