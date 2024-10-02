function fib(n) {
  // Initialize first two Fibonacci numbers, f0 and f1
  let num1 = 0;
  let num2 = 1;

  if (n === 0) {
    return num1; // return f0
  }
  if (n === 1) {
    return num2; // return f1
  }

  for (let i = 2; i <= n; i++) {
    // Use destructuring assignment to swap values in one line
    [num1, num2] = [num2, num1 + num2];
  }

  return num2; // return the nth Fibonacci number
}

console.log("fibonacci sequence with iterative:");
console.log(fib(0));
console.log(fib(1));
console.log(fib(5));
console.log(fib(10));

function fib_recursive(n) {
  // implement fibonacci in recursive

  if (n == 0) {
    // Base case: if n is 0, return 0
    return 0;
  }
  if (n == 1) {
    // Base case: if n is 0, return 0

    return 1;
  }
  // Recursive situation: sum of the fn-1 and fn-2
  else {
    return fib_recursive(n - 1) + fib_recursive(n - 2);
  }
}
console.log("fibonacci sequence with recursive:");

console.log(fib_recursive(0));
console.log(fib_recursive(1));
console.log(fib_recursive(5));
console.log(fib_recursive(10));
