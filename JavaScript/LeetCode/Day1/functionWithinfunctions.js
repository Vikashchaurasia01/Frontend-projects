/*A powerful feature of JavaScript is that
we can actually create functions 
within other functions and even return them! */

function createFunction() {
    function fcn(a, b) {
      const sum = a + b;
      return sum;
    }
    return fcn;
  }
  const f = createFunction();
  console.log(f(3, 4)); // 7