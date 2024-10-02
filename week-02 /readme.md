### Node.js 安裝版本

**v20.13.1(LTS)**
先前就安裝的，為當時最新的版本，且為 LTS(long term support)，因此相對可靠與穩定。

---

### npm 是什麼？

-  **npm** 為 JavaScript 的套件管理工具（*node package manager*)，通常會跟著 **Node.js** 一起安裝，其主要用於管理 JavaScript 套件。
   
- 主要功能為使用 npm 安裝、更新、解除安裝和管理所需的各種外部模組。
  
- 我認為使用 npm 主要對發開造成的影響有對 module 和 dependency 的管理，在沒有 npm 的情況下開發者需要手動下載、安裝所需要的 module 和 dependency ，這過程中有時耗時甚至容易出錯，而 npm 能做到自動管理並處理其之間的版本兼容問題。

---

### nvm 是什麼？

- **nvm** (*node version manager*) 為管理 **Node.js** 版本的工具，使開發者可以在同一台機器安裝或切換多個 **Node.js** 版本。
  
- 這樣開發者可以針對每個項目使用不同的 **Node.js** 版本，並且不會相互衝突。
  
- 我認為使用 nvm 主要可以解決版本衝突與開發環境一致性的問題，就版本衝突的部分，有些專案可能需要較舊或特定版本的 Node.js 而有些需要較新的版本，若沒有 nvm 的話開發者需要手動切換、管理多的版本，而 nvm 解決了此問題。 至於環境一致性的問題， nvm 可以在不同機器上保證使用相同的 Node.js 版本，從而避免因版本差異帶來的問題。
  
參考來源： https://stark920.github.io/2022/02/21/nodejsStart/
