
/** Define our Animal prototype values
 * These values are shared across all instances of Animal
 * The prototype can access properties of any instance
 */

Animal.prototype = {
  init: function() {
    console.log("Get in it");
  }
};

function Animal (name, species, dob) {
  this.name = name;
  this.species = species;
  this.ageInYears = function(dob) {
    var years = moment().diff(dob, 'years');
    return years;
  };
  this.myName = function() {
    console.log("My name is " + this.name + ".");
  };
  this.speak = function(language) {
    console.log(this.name + " says " + language);
  };
  this.legs = function(numberOfLegs) {
    console.log(this.name + " have " + numberOfLegs + " legs.");
  };

  this.birth = function(givesBirth) {
    if (givesBirth) {
      console.log("I can have babies.");
    } else {
      console.log("I lay eggs.");
    }
  };

  switch (this.species) {
  case "Mammal":
    console.log("I am a mammal");
    break;
  case "Reptile":
    console.log("I am a reptile");
    break;
  case "Amphibians":
    console.log("I am an amphibian");
    break;
  case "Fish":
    console.log("I am a fish");
    break;
  default:
    console.log("I am an animal");
  }
}

var cat = new Animal("Jasper", "Mammal", "07/25/2008");
cat.myName();
cat.speak("meow");
cat.legs(4);
cat.dob(1981-01-01);
cat.ageInYears();
cat.birth(true);
var narwhale = new Animal("Water boy", "Mammal", "09/07/2007");
narwhale.myName();
narwhale.speak("oooorghhh");
narwhale.legs(0);
cat.birth(true);
var snake = new Animal("Slytherin", "Reptile", "66/66/6666");
snake.myName();
snake.speak("TSSSSSKKK");
snake.legs(0);
snake.birth(false);
