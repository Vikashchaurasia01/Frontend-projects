class Adder {
    constructor(a) {
       this.a = a;
    }
  
    add(b) {
      const sum = this.a + b;
      return sum;
    }
  }
  const addTo2 = new Adder(2);
  console.log(addTo2.add(5)); // 7

/*Besides differences in syntax, both code examples essentially serve the 
same purpose. They both allow you to pass in some state in a "constructor" 
and have "methods" that access this state.

One key difference is that closures allow for true encapsulation. In the 
class example, there is nothing stopping you from writing addTo2.a = 3; 
and breaking it's expected behavior. However, in the closure example, 
it is theoretically impossible to access a. Note that as of 2022, true 
encapsulation is achievable in classes with # prefix syntax.

Another difference is how the functions are stored in memory. If you 
create many instances of a class, each instance stores a single reference 
to the prototype object where all the methods are stored. Whereas for 
closures, all the "methods" are generated and a "copy" of each is stored 
in memory each time the outer function is called. For this reason, 
classes can be more efficient, particularly in the case where there are 
many methods.

Unlike in languages like Java, you will tend to see code written with 
functions rather than with classes. But since JavaScript is a multi-paradigm 
language, it will depend on the particular project you are working on. */