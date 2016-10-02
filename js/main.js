// Animal constructor
function Animal(name, dateOfBirth) {
  this.name = name;
  this.dateOfBirth = dateOfBirth;
  this.species = "unknown";
  this.type = "unknown";
  this.regions = {
    container: null,
    infoContainer: null,
    theAnimal: null
  };
  this.updateInfo = function() {
    this.regions.infoContainer.innerHTML = '';
    this.addInfo(this.displayIntro());
  };
}

// Animal prototype... ADD METHODS TO PROTOTYPE
Animal.prototype.ageInYears = function(dateOfBirth) {
  var currentYear = new Date().getFullYear();
  var birthYear = this.dateOfBirth.split("/")[2];
  return currentYear - birthYear;
};
Animal.prototype.reproduce = function() {
  if (this.type === "mammal") {
    return "can give birth";
  } else {
    return "can lay eggs"
  }
};
Animal.prototype.displayIntro = function() {
  return "My name is " + this.name + ", and I'm a " + this.ageInYears() + " year old " + this.species + ". I'm also a " + this.type + " and " + this.reproduce() + ".";
};
Animal.prototype.toString = function() {
  return "Animal: " + "name=" + this.name + ", dateOfBirth=" + this.dateOfBirth + ", species=" + this.species + ", type=" + this.type;
};
Animal.prototype.buildMe = function() {
  var bodyContainer = document.getElementById('container'),
    container = document.createElement('div'),
    infoContainer = document.createElement('div'),
    theAnimal = document.createElement('div');

  container.className = "animalContainer";
  infoContainer.className = "infoContainer";
  theAnimal.className = this.species;

  container.appendChild(theAnimal);
  container.appendChild(infoContainer);
  bodyContainer.appendChild(container);

  this.regions.container = container;
  this.regions.infoContainer = infoContainer;
  this.regions.theAnimal = this.species;
};
Animal.prototype.addInfo = function(content) {
  var info = document.createElement('p');
  info.innerHTML = content;
  this.regions.infoContainer.appendChild(info);
};

// Elephant constructor
function Elephant(name, dateOfBirth) {
  Animal.call(this, name, dateOfBirth);
  this.species = "elephant";
  this.type = "mammal";
}
// Elephant prototype
Elephant.prototype = Object.create(Animal.prototype);
Elephant.prototype.hobbies = function(hobby) {
  return " I like to " + hobby + " in my free time.";
};

var elephant = new Elephant("Hugo", "08/20/2014", "true");

elephant.buildMe();
elephant.updateInfo();

// Snake constructor
function Snake(name, dateOfBirth, isVenomous) {
  Animal.call(this, name, dateOfBirth);
  this.isVenomous = isVenomous;
  this.species = "snake";
  this.type = "reptile";
}
// Snake prototype.
Snake.prototype = Object.create(Animal.prototype);
Snake.prototype.prey = function(food) {
  return " My favorite food " + food;
};
Snake.prototype.toString = function() {
  return Animal.prototype.toString.call(this) + ", isVenomous=" + this.isVenomous;
};

var snake = new Snake('Slinky', "09/07/1989", 'true');
snake.buildMe();
snake.updateInfo();

// Bat constructor
function Bat(name, dateOfBirth) {
  Animal.call(this, name, dateOfBirth);
  this.species = "bat";
  this.type = "mammal";
}
Bat.prototype = Object.create(Animal.prototype);

Bat.prototype.fly = function() {
  return " Flying is my specialty!";
};

var bat = new Bat('B-Man', '03/04/1947', 'true');
bat.buildMe();
bat.updateInfo();
