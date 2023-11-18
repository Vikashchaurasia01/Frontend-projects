/*you can declare functions within other functions and return them. 
The inner function has access to any variables declared above it. */

function createAdder(a) {
    return function add(b) {
      const sum = a + b;
      return sum;
    }
  }
  const addTo2 = createAdder(2);
  addTo2(5); // 7