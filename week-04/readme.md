## 1. 在 Readme 中提供 instance 的 public IP，我會連線過去檢查，所以要保持主機是一直在啟動中
- **Public IP 地址：** Public IPv4 IP address **3.107.26.19**
## 2. 什麼是 instance type?
- **Instance Type：** 在 AWS EC2 中，instance type 不同的 instance type 會有不同的 虛擬機設定與配置，像是虛擬 vCPU 的數量、記憶體大小、存儲類型和網路性能等等。通常每一種 instance type 會有自己適合的工作類型像是有些適合用於一般計算，有些適合一些 memory-intensive 的應用或是 computing-intensive 等等。

## 3. 什麼是 Nginx？有哪些用途與特性？
- **Nginx：** Nginx 是一個快速且較輕量的的 Web server ，通常也會被用作 proxy 、load balancer 和 cache 。
- **常見用途：**
  - **Web Server ：** 當 Nginx 作為 web server 時主要用來 handle HTTP request 並可以快速提供 static file（例如圖片、CSS 和 JavaScript） 。
  - **Reverse Proxy：** Ngnix 可以將 client 的 request 轉發到 其他 server（通常是內部的後端 server ），並將 response 返回給 client 端。
  - **Load Balancer：**   Ngnix 可以用各種 load balance 的方式 ( 如 round robin, least connections, IP hash 等等)來分配 request 到多個伺服器，來確保可靠性與性能。
  - **Cache：** Nginx 可以 cache upstream web server 的 response 來降低對 後端 server 還有資料庫的 頻繁抓取以提供性能。

## 4. pm2 套件是什麼？有什麼用處？
- **PM2：** PM2 是一個用於 Node.js application 的 process manager ， 通常用於使 Node.js application 在 production 環境能順利運行。
- **用途：**
  - **Process Management：** 維持 application 的運行，像是在 application crash 掉後或是 server reload 後可以自動重啟，使 application 可以順利運作。
  - **Log：** pm2 會紀錄並管理 applicatoin 的 logs 。
  - **Monitoring：** pm2 提供 application 的重啟次數、 cpu 用量、 記憶體用量 、 process id 等等，以監控 application 的 peroformance 與資源使用情形。

## 5. 步驟 9 中提到的 `proxy` 是什麼意思？為什麼要透過 Nginx 來 `proxy` 到 Express 開發的 Web Server?
- **Proxy：** 在 nginx work as proxy 的 proxy 是指作為一個在 client 端與後端 server 端的中間人，使 client 並不會直接與後端 server 互動，而是與 proxy ， proxy server 在接收到 client 的 request 後會在 redirct 到後端 server，這段過程也稱為反向代理。
- **為什麼使用 Nginx 作為代理：**
  - 使用 Nginx 可以 更有效地管理流量 (load balancing) 、 處理 SSL termination，而且用 nginx 的話只有 proxy server 在 public 因此可以隱藏後端 server 來增強安全性並簡化資安防護流程 （one entrypoint) ，也可以 中心化監控資料。

## 6. 在 Readme 中提供步驟 9 的 Nginx 設定檔

```nginx
server {
    listen 80;
    server_name 3.107.26.19;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
## 7. Security Group 是什麼？用途為何？有什麼設定原則嗎？
- **Security Group：** Security Group 通常作為一個虛擬防火牆，可以控制進入和外出 EC2 instance 的流量，以達到對網路安全性的控管。
- **用途：**
  - Security 會指定哪些 IP address 或哪些範圍的 IP address 可以訪問此 EC2 instance ，也會限制哪些 protocol 還有 port 是會開放給 web stream 的 。
- **設定原則：**
  -  Least Privilege ：通常只會開放必要的 protocol 與 port number 。
  - 根據不同的資源與用途來設定適合該用途的網路安全性管理。
  - 定期審查和更新 security group 的設定來確保適合當前的使用場景，也可以搭配 AWS Config 來監控與檢查 security group 的適配性。

## 8. 什麼是 sudo? 為什麼有的時候需要加上 sudo，有時候不用？
- **Sudo：** `sudo` 代表 "superuser do"，允許有權限的使用者以 superuser 的身份來執行 command 。
- **什麼時候使用：**
  - 當 command 需要較高級權限時（例如安裝軟體、修改系統文件、管理用戶和權限、啟動或停止系統服務等等），需要使用 `sudo` ，或是設置硬體或網路的配置時也會需要用 `sudo` 。
  - 通常屬於非系統級的操作或是日常操作可以不使用 `sudo`。

## 9. Nginx 的 Log 檔案在哪裡？你怎麼找到的？怎麼看 Nginx 的 Log？
- **Nginx Log 檔案位置：** 預設情況下，Nginx 的 log 檔位於 `/var/log/nginx/` directory 下：
  - **access log：** `/var/log/nginx/access.log`
  - **error log：** `/var/log/nginx/error.log`
- **如何找到並查看 log ：**
    ```bash
    cd /var/log/nginx/
    ```
  - 查看 log ，可以使用 `cat`、`less` 或 `tail` 。例如：
    ```bash
    tail -f /var/log/nginx/access.log 
    tail -f /var/log/nginx/error.log  
    ```
## 10. 其他你在過程中遭遇的問題，有找到解答就記錄下來，沒有可以把問題放著，下次上課討論。如果沒有遇到任何問題，也可以回答「無」

**問題 1：**  
使用下載的 `.pem` 金鑰檔案進行 SSH 連線時，出現了權限錯誤，提示檔案權限 too open。

**已解決：**  
使用 `chmod 400 ~/.ssh/D's-web-server-key.pem` 將金鑰檔案的權限設置為只有擁有者可讀取。然後就解決權限錯誤。
**問題 2：**  
當我使用 PM2 啟動 Express 伺服器時，出現了 `MODULE_NOT_FOUND` 的 error 。

**已解決：**  
後來發現是因為我沒有在專案中執行 `npm install`，因此缺少需要的 modules 。然後我 cd 進入專案後並執行 `npm install` 來安裝所需的依賴後，問題解決，Express 伺服器也成功啟動。


**問題 3：**  
在配置 Nginx 作為 reverse proxy 時，conf 檔中的 `proxy_pass` 沒有正確指向 Express application server 的 port number ，導致無法正常轉發 request 。

**已解決：**  
檢查並更新了 `nginx.conf`，將 `proxy_pass` 設置為 `http://localhost:3000`，正確指向 Express server ，問題解決，Nginx 成功 forward 到 Express application server。

## 11. 列出完成本作業時參考的資料
https://unix.stackexchange.com/questions/115838/what-is-the-right-file-permission-for-a-pem-file-to-ssh-and-scp

https://youtu.be/iInUBOVeBCc?si=0M1RO1_MdZ5AyNFN

https://youtu.be/iHX-jtKIVNA?si=uO2CPmwwl-rThlR-

https://medium.com/learn-or-die/%E5%A5%BD-pm2-%E4%B8%8D%E7%94%A8%E5%97%8E-fc7434cc8821

https://youtu.be/4NB0NDtOwIQ?si=jZphqsecFNG5XdWY

https://docs.aws.amazon.com/zh_tw/vpc/latest/userguide/vpc-security-groups.html




