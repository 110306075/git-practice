// ary: number array

function sum(ary) {
  // TODO: sum all elements in ary
  // implment in recursive
  // Base case: if the array is empty, return 0
  if (ary.length === 0) {
    return 0;
  }
  // Recursive situation: sum the first element with the sum of the rest of the array
  // js array method slice are able to return a portion of array from the given start
  return ary[0] + sum(ary.slice(1));
}

console.log(sum([1, 5, 3, 2])); // 11

function sum_reduce(ary) {
  // TODO: sum all elements in ary
  // The reduce() method of Array instances executes a user-supplied "reducer" callback function on each element of the array
  // by https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
  return ary.reduce((a, b) => a + b);
}

console.log(sum_reduce([1, 5, 3, 2])); // 11

// 挑戰題

function sum_sequence(n) {
  // using formula that approach achieves constant time complexity O(1).
  return ((1 + n) * n) / 2;
}

console.log(sum_sequence(10)); // 55
console.log(sum_sequence(100)); // 5050

function sum_sequence_recursive(n) {
  // implement with recursive
  // Base case if n is 1 return n
  if (n == 1) {
    return n;
  }
  // Recursive situation: add n to the sum of 1 to n-1
  return n + sum_sequence_recursive(n - 1);
}

console.log(sum_sequence_recursive(10)); // 55
console.log(sum_sequence(100)); // 5050
