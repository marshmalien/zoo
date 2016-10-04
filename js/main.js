// jQuery Snake and Elephant Animations
$(document).ready(function() {
  $('.snake').on('click', function() {
    $(this).animate({
      left: '+=600'
    }, 6000);
    $(this).animate({
      left: "-=600"
    }, 2000);
    $(this).next().toggle('slow');
  });
  $('.elephant').on('click', function() {
    $(this).toggleClass('rotated');
    $(this).next().toggle('slow');
  });
  $('.bat').on('click', function() {
    $(this).next().toggle('slow');
  });
});

// Animal Constructor
function Animal(name, dateOfBirth) {
  // Can't create animal directly
  if (this.constructor === Animal) {
    throw new Error("Can't create the animal directly.");
  }
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
    var numBabies = Math.round(Math.random() * 3 + 1);
    return " I want to give birth to " + numBabies + " babies";
  } else {
    var numEggs = Math.round(Math.random() * 30 + 10);
    return "can lay " + numEggs + " eggs";
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


// Elephant Constructor
function Elephant(name, dateOfBirth) {
  Animal.call(this, name, dateOfBirth);
  this.species = "elephant";
  this.type = "mammal";
}
// Elephant Prototype
Elephant.prototype = Object.create(Animal.prototype);
Elephant.prototype.constructor = Elephant;
Elephant.prototype.hobbies = function(hobby) {
  this.hobby = hobby;
  return " I like to " + hobby + " in my free time.";
};
Elephant.prototype.toString = function() {
  return Animal.prototype.toString.call(this) + ", Hobby=" + this.hobby;
};
Elephant.prototype.displayIntro = function() {
  return Animal.prototype.displayIntro.call(this) + (this.hobbies(this.hobby));
};

// Snake Constructor
function Snake(name, dateOfBirth, isVenomous) {
  Animal.call(this, name, dateOfBirth);
  this.isVenomous = isVenomous;
  this.species = "snake";
  this.type = "reptile";
}
// Snake Prototype.
Snake.prototype = Object.create(Animal.prototype);
Snake.prototype.constructor = Snake;
Snake.prototype.toString = function() {
  return Animal.prototype.toString.call(this) + ", isVenomous=" + this.isVenomous;
};
Snake.prototype.displayIntro = function() {
  return Animal.prototype.displayIntro.call(this) + (this.isVenomous ? " Watch out! I'm venomous." : "");
};

// Bat Constructor
function Bat(name, dateOfBirth) {
  Animal.call(this, name, dateOfBirth);
  this.species = "bat";
  this.type = "mammal";
}
// Bat Prototype
Bat.prototype = Object.create(Animal.prototype);
Bat.prototype.constructor = Bat;
Bat.prototype.fly = function() {
  this.dist = Math.floor(Math.random() * 4 + 1);
  return " I flew " + this.dist + " miles!";
};

Bat.prototype.toString = function() {
  return Animal.prototype.toString.call(this) + ", fly= " + this.dist + " miles";
};
Bat.prototype.displayIntro = function() {
  return Animal.prototype.displayIntro.call(this) + this.fly();
};

// HTTP Request with vanilla JavaScript
var http = new XMLHttpRequest();
http.onload = function() {
  if (http.status === 200) {
    var jsonObject = JSON.parse(http.response);
    var instance;
    jsonObject.animals.forEach(function(animal) {
      switch (animal.species) {
        case "elephant":
          instance = new Elephant(animal.name, animal.dateOfBirth);
          break;
        case "snake":
          instance = new Snake(animal.name, animal.dateOfBirth, animal.isVenomous);
          break;
        case "bat":
          instance = new Bat(animal.name, animal.dateOfBirth);
          break;
      }
      instance.buildMe();
      instance.updateInfo();
    });
  }
};
http.open('GET', 'animals.json');
http.send();

// TEST
// Arrange, Act, Assert
// Arrange - Setup. create snake or Animal
// Act - test methods, like birth
// Assert - When you call species.reproduce it gives you what you expect

// can't create animal directly
try {
  new Animal();
} catch (e) {
  console.assert(e.message === "Can't create the animal directly.");
}

// Elephant Test
var daisy = new Elephant("Daisy", "01/02/2013");
console.assert(daisy.name === "Daisy");
console.assert(daisy.dateOfBirth === "01/02/2013");
console.assert(daisy.species === "elephant");
console.assert(daisy.type === "mammal");
console.assert(daisy.reproduce().includes("birth"));
console.assert(daisy.ageInYears() === 3);
console.assert(daisy.hobbies("paint") === " I like to paint in my free time.");

// Snake Test
var slytherin = new Snake("Slytherin", "07/07/1988", true);
console.assert(slytherin.name === "Slytherin");
console.assert(slytherin.dateOfBirth === "07/07/1988");
console.assert(slytherin.species === "snake");
console.assert(slytherin.type === "reptile");
console.assert(slytherin.reproduce().includes("eggs"));
console.assert(slytherin.ageInYears() === 28);
console.assert(slytherin.isVenomous === true);

// Bat Test
var geneSimmons = new Bat("Gene Simmons", "01/02/2000");
console.assert(geneSimmons.name === "Gene Simmons");
console.assert(geneSimmons.dateOfBirth === "01/02/2000");
console.assert(geneSimmons.species === "bat");
console.assert(geneSimmons.type === "mammal");
console.assert(geneSimmons.reproduce().includes("birth"));
console.assert(geneSimmons.ageInYears() === 16);
console.assert(geneSimmons.fly().includes("miles"));
