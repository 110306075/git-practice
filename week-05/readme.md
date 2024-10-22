### 1. 你的網址，應該是 https://www.xxx.xxx，點擊過去應該要可以看到個人作業 4 架設的 Express server （由 Nginx proxy 到 Express）

[我的網址](https://dddd.nccumisoj.online/)

### 2. 你在哪裡購買網域的

我們是在 [GoDaddy](https://www.godaddy.com/en-sg/offers/godaddy?isc=sem3year&countryview=1&currencyType=TWD&cdtl=c_17606417449.g_139428062098.k_kwd-88659201.a_684576982462.d_c.ctv_g&bnb=b&gad_source=1&gclid=Cj0KCQjwmt24BhDPARIsAJFYKk2eeWAm1KZWbCIY0E5quXRt6BSNvsgxcpLC-ZUbhyqovG8jjgm6KMgaAnIKEALw_wcB) 上面買一個我們組專案要用的 Domain ， 然後自己在創 subdomain 來練習。

### 3. DNS 的 A Record 是什麼？

A Record（Address Record）是 DNS 中的一種 Record Type，它將 domain（例如 `nccumisoj.online`）mapping 到對應的 IP 位址（例如 `192.0.2.1`）。當用戶在瀏覽器中輸入 Domain 時，DNS 伺服器會查找該 Domain 的 A Record，並返回對應的 IP 位址，讓瀏覽器能夠與該伺服器進互動。且 A Record 只 mapping IPv4，對於 IPv6 則要使用 AAAA Record 。


### 4. DNS 的 NS Record 是什麼？

NS Record（Name Server Record）是指定某個域名的中具權威性的 DNS 伺服器的 Record。這些伺服器負責保存該域名的所有 DNS Record（如 A Record、MX Record 等），並處理其他伺服器對該域名的 DNS request 。當一個域名的 NS 記錄設置後，該域名的 DNS request 會被導向那具權威性的 DNS 伺服器，且在一般 Domain 中會有不只一個 NS Record 來提供 redundancy 或 load balancing 的功能。

### 5. Domain Name vs FQDN vs URL 這三者分別為何？

- **Domain Name（域名）**：是 Internet 上用來標記網站的 Readable Name ，主要是用來代替一長串數字的 IP Address 。 域名由多個部分組成，通常包括一個 TLD 和一個 SLD 。

- **FQDN（全域名稱）**：是指完整的域名路徑。例如，`www.example.com` 是 `example.com` 的 FQDN。FQDN 通常由 subdomain、Domain name、top-level domain 組成。

- **URL（Uniform Resource Locator）**：URL 不僅包含域名，還包含 Protocol（如 `http://` 或 `https://`）、路徑（如 `/about`）、甚至端口號和查詢參數等資訊。它是用來指定網頁或其他資源的完整地址。例如，`https://www.example.com/about` 是一個 URL。

### 6. 為什麼應該要為網站加上憑證？而不是直接用 HTTP 就好？

主要目的是為網站提高安全性，使用 SSL/TLS 憑證來加密網絡傳輸，從而轉換為 HTTPS 協議。主要原因如：

- **數據加密**：憑證能夠加密用戶和伺服器之間的數據傳輸，防止第三方攔截、竊取或篡改敏感資訊。
  
- **身份驗證**：SSL 憑證可以證明網站的身份，確保用戶訪問的是合法的網站，而非偽造或釣魚網站。

- **瀏覽器支持**：現代瀏覽器越來越多地對非 HTTPS 網站顯示「不安全」的警告，這可能會被使用者誤以為是非法或是不正常的網站。因此，為網站加上憑證已經成為網絡世界中的基本要求。
