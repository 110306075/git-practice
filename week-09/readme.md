##  恭喜你成為一位網站工程師，現在公司有一台 EC2 instance，裡面有用 `systemd` 管理了一個 NGINX web server，但它現在似乎無法正確運作，請修復它。
### 使用 AMI 建立好 EC2 instance 後，利用 ssh 連線過去

```shell

# 設定 key 的權限解決 certificate too open 的 issue
chmod 400 /Users/hongsheng/Downloads/trouble_shooting_key.pem 

# 使用 ssh 連線到 EC2 instance
ssh -i "/Users/hongsheng/Downloads/trouble_shooting_key.pem" ubuntu@ec2-52-195-168-27.ap-northeast-1.compute.amazonaws.com

# 檢查 server 上本地的 HTTP 服務是否運行正常
curl localhost
```
###  遇到訊息
haha, I am the fake web server. Try to find the real web server!

###  嘗試啟動 nginx 並查看 status

![image](https://github.com/user-attachments/assets/b7361fc4-97c7-42e1-adcf-66263330855b)
![image](https://github.com/user-attachments/assets/6425ebcd-b262-42c0-b1ac-160d655dd911)

從 nginx status 可以看出 nginx.conf test 失敗，所以其中可能有 syntax error, 也可以看到在 nginx.conf 中真的有 unexpected ";" in /etc/nginx/nginx.conf:8
```shell
Nov 10 02:31:10 ip-172-31-35-36 nginx[9317]: 2024/11/10 02:31:10 [emerg] 9317#9317: unexpected ";" in /etc/nginx/nginx.conf:8
Nov 10 02:31:10 ip-172-31-35-36 nginx[9317]: nginx: configuration file /etc/nginx/nginx.conf test failed
```

因此我使用 nano 去 nginx.conf 修改錯誤

```shell

sudo nano /etc/nginx/nginx.conf

```

### 解決此問題後，我們重新看一次 nginx status

![image](https://github.com/user-attachments/assets/11fcf662-bc62-4eae-a293-24089972a52a)

可以看到還是有問題，並且是 port 80 被佔用此

因此我們找出哪個 process 在佔用 port 80 ，並 kill 掉

![image](https://github.com/user-attachments/assets/b0ad8599-83e5-4ba4-a8e8-f02eee3f4bc7)

```shell

sudo lsof -i :80
sudo kill 576

```
### 現在 nginx 可以啟動，我們便用 curl 測試 但還是有問題

![image](https://github.com/user-attachments/assets/6f8dc2db-8c6c-452f-aac9-07983af8744c)

有組員發現要將 nginx 文件權限 (原本只有 root )

![image](https://github.com/user-attachments/assets/a33cc095-4610-4a3c-adea-2a4cf0c7340c)

所以我們用 

```shell
sudo chown root:www-data /var/myweb/index.html
```

改變 /var/myweb/index.html 文件的群組擁有者到 www-data



### 重新嘗試從 localhost 訪問，但還是有問題

經過小組模索與討論後，我們認為可能是防火牆問題，我們先檢查目前的防火牆 rule

```shell

sudo iptables -L

```
![image](https://github.com/user-attachments/assets/2408540e-5276-4707-8a68-f718e0f9f569)

然後去到 /etc/iptables/ 裡面改 rule.v4 的檔案，並加入

```shell

-A INPUT -p tcp -m tcp --dport 80 -j ACCEPT

```

然後儲存，接下來 在用 curl 測試時就成功了

```shell
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Troubleshooting 101</title>
  </head>
  <body>
    <h1>Congratulations!</h1>
  </body>
</html>
```

###  然而當我們將 instance reboot 後又會有問題了，發現 port 80 被佔用的問題沒有解決，我們發現是 srv 的 process 一直佔用，所以把他 disable 掉

![image](https://github.com/user-attachments/assets/f0f44f86-d27d-4c91-9eef-545bab8eddb2)

### 最後在用 curl 測試就成功了

```shell
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Troubleshooting 101</title>
  </head>
  <body>
    <h1>Congratulations!</h1>
  </body>
</html>
```


### 心得

這次的除錯挑戰對我來說真的是一個挑戰，以前沒有接觸過這樣的實例體驗，所以在一開始發現問題的時候不知道該除了起手，所以有點在瞎猜，但之後隨著老師在 notion 上面的小提示，讓我們慢慢循著錯誤訊息找到 ngnix.conf 的 syntax error ，之後大家就比較繼續看 status, logs 來找可能出錯的地方，並上網找解決方法改正，但我們在 reboot 後其實卡了一段時間，一開始是 port的問題，最後才發現 reboot 後有 process 還是會被重啟，所以應該直接 disable 掉才會是比較治本的方法，最後在 防火牆 rule 卡了許久，經過組員討論與找資料後，我們才發現怎麼永久更改 rule 的方法，這過程一開始有點煩但其實很有趣，主要讓我學會有耐心地面對錯誤並從中一層層找到潛在或確切因素，而非看到 error, not work 就整個躁起來，我想這或許是我在面對錯誤需要更加強的地方




