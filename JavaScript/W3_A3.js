// Task 1
var dairy = ['cheese', 'sour cream', 'milk', 'yogurt', 'ice cream', 'milkshake']

function logDairy(){
    for (var groceries of dairy) {
        console.log(groceries);
    }
}
logDairy();

// Task 2
const animal = {
    canJump: true
};
const bird = Object.create(animal);
bird.canFly = true;
bird.hasFeathers = true;

function birdCan() {
    //const birds = Object.create(bird);
    for (prop of Object.keys(bird)) {
        console.log(prop + ": " + bird[prop]);
    }
}
birdCan();

// Task 3
function animalCan() {
    // bird.canJump = true;
    for (prop of Object.keys(bird)) {
        console.log(prop + ": " + bird[prop]);
    }
    for (prop of Object.keys(animal)) {
        console.log(prop + ": " + animal[prop]);
    }
}

animalCan();

