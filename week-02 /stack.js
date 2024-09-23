// stack.js
// 完成以下 TODO 的部分，並且以 Module 的方式匯出 (ESM)
export default class Stack {
	// TODO: # 有特別的意思嗎？請以註解回覆。
    // # indicates that this is a private attribute, which can only be accessed within this class
  #items;

  constructor() {
    this.#items = [];
  }

  // 在 stack 頂部加入元素i
  push(element) {
		// TODO
        // using js array method push() to adds a new element to the end of an array 
        this.#items.push(element);
  }

  // 移除並回傳 stack 頂部的元素
  pop() {
		// TODO
        if (this.isEmpty()) { // check whether the stack contain item
            return null; 
          }
        // using js array method push() to remove and retrun  an element at the end of an array 
        return this.#items.pop();
  }

  // 回傳 stack 頂部的元素，但不移除它
  peek() {
    // TODO
    if (this.isEmpty()) { // check whether the stack contain item
        return null; 
      }
    //   return the item which index is 1 minus the length of array(last element in an array)
    return this.#items[this.#items.length - 1];

  }

  // 檢查 stack 是否為空
  isEmpty() {
    // TODO
    // check whether the stack contain element
    return this.#items.length === 0;
  }

  // 回傳 stack 中元素的個數
  size() {
    // TODO
    return this.#items.length;
  }

  // 清空 stack 
  clear() {
    // TODO
    this.#items = []
  }

  // 印出 stack 內容
  print() {
    // TODO
    // using js array method toString() to converts an array to a string of array values, and print it out
    console.log(this.#items.toString());
  }
}