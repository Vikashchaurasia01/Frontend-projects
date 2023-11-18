/*JavaScript has a feature called hoisting 
where a function can sometimes be used before it is initialized. 
we can only do this if you declare functions with the function syntax. */

function createFunction() {
    return f;
    function f(a, b) {
      const sum = a + b;
      return sum;
    }
  }
  const f = createFunction();
  console.log(f(3, 4)); // 7