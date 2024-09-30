# Node JS Express Project Quest:

## 1.package.json 中的 dependencies 與 devDependencies 分別是什麼

  - dependency: 是指應用程式在 "執行時" 需要的套件，例如 express 等等。這些套件會在 deployment 或到 prod 環境時也一起安裝，因為這些套件是應用程式運行時所必須使用的。
  - devDependencies: 指的是應用程式在"開發時"需要的套件，例如測試框架 mocha 等等，這些工具只在開發環境中使用，不會被安裝到 prod 環境。


## 2.package.json 中的 scripts 這個區塊怎麼用？
scripts 區塊用來 define 一些可以在 command line 中執行的 script。例如，可以在 package.json 中的 scripts 區塊定義一個名為 start 的腳本，然後透過 npm run start 來執行它。

## 3.Port number 要怎麼以環境變數來設定？
使用環境變數來設置 port，讓程式碼根據不同的配置切換port，而非寫死在程式碼中。
有兩種方式可以達成用環境變數設定port
 - 用process.env來讀取環境變數中的 port 值:
  ```
  const port = process.env.PORT ;
  ```
  並在開啟 server 時用 command 設置 port 值:
  ```
  PORT=3000 node app.js
  ```
 - 用 .env 檔與 dotenv 來設置與管理環境變數:
 先新增一個 .env 檔來設置與管理環境變數，並使用 dotenv 來讀取其中內容 :
  ```
  npm install dotenv
  ```

  在 .env 檔中設置 PORT=3000
  在 app.js 中
   ```
  const dotenv = require('dotenv'); // import dotnev
  dotenv.config(); // 讀取 .env 文件中的環境變數
  const port = process.env.PORT; 
   ```

## 4.哪些檔案應該要被放上 GitHub repo，描述看看為什麼選擇上傳某些檔案、選擇不上傳某些檔案，決策的要素是什麼？
- 會上傳到 Github repo 的有:
  1. Source Code 檔案: 如 *.js檔
  2. 設定檔案: 如package.json

- 通常不會上傳到 Github repo的有:
  1. node_modules: 可以通過 package.json 產出，所以不用上傳到 Github repo 給他人下載
  2. secret & credentials: .env 中包含的 API 金鑰、資料庫帳號密碼等不應該上傳到 Github repo, 反之可以提供 .env.example 來提供其他開發者所需要的環境變數名稱

## 5.範例程式中用 require，但上週的 Stack 是用 import/export，這兩種分別是 JavaScript 引用模組的兩種方式: CJS vs ESM，這兩者分別怎麼用？
 - CommonJS (CJS)：這是 Node.js 中的模組系統，使用 require 來 import 模組，使用 module.exports 來 export 模組。範例如下：
 ```
const express = require('express'); // import module
module.exports = app; // export module
 ```
 -ES Modules (ESM)：這是 ECMAScript 中的模組系統，使用 import 和 export 來 import & export 模組。範例如下：
 ```
import express from 'express'; // import module
export const app = express(); // export module
 ```
 比較:
    1. 同步與非同步：
        CJS：模組是同步加載的，模組在 require() 語句執行時就會被加載
        ESM：模組是非同步加載的，使用 import 會在需要時以非同步方式加載模組
    2. 執行環境：
        CJS：原生支援於 Node.js 環境 
        ESM：原生支援於較新的瀏覽器以及 Node.js（從 v12 開始逐步支援）
    3. 模組作用域：
        CJS：模組的內容包裹在一個函數作用域中，變數只在模組內部有效。
        ESM：模組有自己的 module scope，所以 import 和 export 的變數只在模組範圍內有效
    4. 檔案副檔名：
        CJS：通常使用 .js。
        ESM：可以使用 .js 或 .mjs，在 Node.js 中，需明確指定副檔名為 .mjs 或在 package.json 中設置 "type": "module"

## 6.localhost 是什麼？
- localhost 是一個本地端的 Address ，通常對應到 IP 地址 127.0.0.1。當在瀏覽器中訪問 http://localhost 時，實際上是連接到自己的電腦 127.0.0.1 ，而不是外部的伺服器, 其主要用來測試本地運行的伺服器或應用程式，開發者可以在本機上運行，而不需要公開到外部網路

## 7.curl 是什麼？

curl 是一個 command-line tool，用來從 commad line 發送 HTTP request 並接收回復。可以使用它來測試網路連線或 API Endpoint。

- 用法: 
發送 Get request    
```
curl http://localhost:3000
```
發送 Post request with post data    
```
curl -X POST -d "name=John&age=30" http://localhost:3000/user
```
在 output 顯示 response 的 header
```
curl -I http://localhost:3000
```
將請求時產生的 cookie 資訊儲存至cookie_file
```
curl -c cookie_file https://www.google.com/
```





