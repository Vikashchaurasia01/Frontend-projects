/**
 * @param {integer} init
 * @return { increment: Function, decrement: Function, reset: Function }
 */
var createCounter = function(init) {
    var current = 0;
    return {
        increment: () => init + ++current,
        decrement: () => init + --current,
        reset: () => {
            current = 0;
            return init;
        }
    }
};


const counter = createCounter(5)
var i = counter.increment(); // 6
var j = counter.reset(); // 5
var k = counter.decrement(); // 4
console.log(i,j,k);