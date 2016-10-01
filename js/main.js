// Animal constructor
function Animal(name, dateOfBirth) {
  this.name = name;
  this.dateOfBirth = dateOfBirth;
  this.species = "unknown";

  this.regions = {
    container: null,
    infoContainer: null,
    theAnimal: null
  };

  this.updateInfo = function() {
    this.regions.infoContainer.innerHTML = '';
    this.addInfo(this.toString());
  };
}

// Animal prototype... ADD METHODS TO PROTOTYPE
// Animal.prototype.myName = function() {
//     console.log("My name is " + this.name + ".");
// };
Animal.prototype.ageInYears = function(dateOfBirth) {
  var currentYear = new Date().getFullYear();
  var birthYear = this.dateOfBirth.split("/")[2];
  return currentYear - birthYear;
};
Animal.prototype.saySpecies = function() {
  var speak = "I'm a " + this.species;
  return speak;
};

Animal.prototype.age = function() {
  return " I am " + this.ageInYears() + " years old.";
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
function Elephant(name, dateOfBirth, isMammal) {
  Animal.call(this, name, dateOfBirth);
  this.isMammal = isMammal;
  this.species = "elephant";
}
// Elephant prototype
Elephant.prototype = Object.create(Animal.prototype);
Elephant.prototype.hobbies = function(hobby) {
  return "I " + this.hobby + " in my free time.";
};
Elephant.prototype.mammal = function() {
  return (this.isMammal ? " I'm also a mammal." : "I'm not a mammal.");
};

var elephant = new Elephant("Hugo", "08/20/2014", "true");
Elephant.prototype.toString = function() {
  var intro = "My name is " + this.name + ". " + this.saySpecies();
  var mammal = " and " + this.mammal();
  return intro + mammal;
};
elephant.buildMe();
elephant.updateInfo();

// Snake constructor
function Snake(name, dateOfBirth, isReptile, isVenomous) {
  Animal.call(this, name, dateOfBirth);
  this.isReptile = isReptile;
  this.isVenomous = isVenomous;
  this.species = "snake";
}
// Snake prototype.
Snake.prototype = Object.create(Animal.prototype);
Snake.prototype.layEggs = function(numberOfEggs) {
  return " I laid " + numberOfEggs +" eggs yesterday.";
};
Snake.prototype.prey = function(food) {
    return " My favorite food " + food;
};
Snake.prototype.toString = function() {
   var intro = " My name is " + this.name + ". " + this.saySpecies();
   var venom = " and I'm " + (this.isVenomous ? "" : "not") + " venomous! ";
   var age = this.age();
   var eggs = (this.isReptile ? " I'm a reptile and " +  this.layEggs(5) : "I'm not a reptile.");
   var food = this.prey(" is caught locally, mice!");
   return intro + venom + age + eggs + food;
};

var snake = new Snake('Slinky', "09/07/1989", 'true');
snake.buildMe();
snake.updateInfo();
