import Stack from "./stack.js";

let stack = new Stack();

stack.print(); // Should print nothing
console.log("Current stack size:", stack.size()); // 0

console.log("Start pushing:");

stack.push(5);
stack.push(8);
stack.push(12);
console.log("After pushing 5, 8, 12:");
stack.print(); // 5,8,12
console.log("Current stack size:", stack.size()); // 3

// Test peek() method when stack is not empty
console.log("Peek the top element:", stack.peek()); // 12

// Test pop() method when stack is not empty
console.log("Pop the top element:", stack.pop()); // 12
console.log("After popping:");
stack.print(); // 5,8

// Test peek() after pop
console.log("Peek the top element after pop:", stack.peek()); // 8

// Test clear() method
console.log("Clear stack:");
stack.clear();
stack.print(); // Should print nothing
console.log("Current stack size after clearing:", stack.size()); // 0
console.log("Peek the top element when stack is empty:", stack.peek()); // null
console.log("Pop the top element when stack is empty:", stack.pop()); // null

// Test isEmpty() after clearing
console.log("Test the stack is empty?", stack.isEmpty()); // true
