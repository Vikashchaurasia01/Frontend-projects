/* 
There are 3 major differences between arrow syntax and function syntax.
1. More minimalistic syntax. This is especially true for anonymous functions 
and single-line functions. For this reason, this way is generally 
preferred when passing short anonymous functions to other functions.

2. Arrow functions have a shorter scope than regular functions. They do not
have their own "this" value or prototype object. Because of this, they are
more efficient in terms of memory usage.

3. No automatic hoisting. You are only allowed to use the function after 
it was declared. This is generally considered a good thing for readability.

4. Can't be bound to this, super, and arguments or be used as a constructor. 
These are all complex topics in themselves but the basic takeaway should 
be that arrow functions are simpler in their feature set.
*/