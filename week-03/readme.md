# AWS Region and Availability Zone

AWS (Amazon Web Services) 使用全球的 Region 和 Availability Zone (AZ) 來提供可靠且高可用的雲端基礎設施。兩者之間有不同的功能與目的：

## 1. AWS Region
- **定義**：Region 是一個地理區域，每個 AWS Region 都是相對獨立的、完整的數據中心
- **特性**：
  - 每個 Region 位於不同的地理位置，如美國東部（北弗吉尼亞），歐洲（愛爾蘭），亞太地區（東京）等等
  - 各 Region 彼此獨立，因此數據和應用程式不會在不同 Region 之間自動同步。
  - Region 是針對遵從法規、地理距離、延遲等問題而設計的。使用者可以根據法規要求或服務性能選擇適合的 Region
  - 每個 Region 都包含多個 Availability Zone ，確保高可用性

## 2. AWS Availability Zone (AZ)
- **定義**：Availability Zone 是一個或多個獨立的數據中心，位於同一 Region 內，但物理上彼此隔離，而且具有不同的電力、網路及冷卻等硬體設備
- **特性**：
  - 每個 Region 內包含多個 AZ，通常至少有三個
  - AZ 之間相互連接，延遲極低，並且設計成在一個 AZ 發生故障時，其他 AZ 仍能保持正常運作，確保業務的高可用性和容錯能力
  - 使用者可以在多個 AZ 之間部署應用程式以實現高可用性和故障恢復能力（例如將應用程式和資料庫設置在不同的 AZ 中）

## Region 和 AZ 的實際應用
- **Region 的選擇**：用戶通常會根據距離、法規要求、數據主權法（例如 GDPR 法規）、服務價格等等來選擇合適的 Region。不同的 Region 之間有價格差異，並且有些服務可能僅限於特定 Region
- **AZ 的用途**：在一個 Region 內，用戶會使用多個 AZ 來分佈應用程式和資料庫，避免單點故障。通過這樣的設計，即使一個 AZ 發生了故障，應用依然可以在另一個 AZ 正常運作


# 選擇 AWS Region 的考量因素

選擇 AWS Region 是一個需要考慮多方因素的決策，因為不同的 Region 會對應用的性能、合規性、成本等對直接影響之因素。以下是選擇 Region 時應考慮的關鍵因素：

## 1. 數據主權與合規性（Data Sovereignty & Compliance）
- **法規要求**：根據不同國家或地區的法規，有些數據必須儲存在特定地理區域內。例如，歐盟的 “GDPR” 法規要求某些類型的數據必須儲存在歐盟內的 Region
- **本地法規**：選擇 Region 時需要考慮當地政府的法律、隱私政策以及對數據存儲位置的要求。如醫療、金融等高度監管行業中會遇到這類限制與規範

## 2. 延遲和性能
- **地理距離**：應選擇靠近的主要客戶或業務所在地的 Region ，這可以減少網路延遲，提高應用程式的性能。假如客戶主要在亞洲，選擇東京或新加坡 Region 會比美國的 Region 更加合適
- **邊緣位置（Edge Location）**：如果應用依賴於 AWS 的內容傳遞網路（CDN，如 CloudFront），應確保邊緣節點也接近用戶所在地，進一步提高速度

## 3. 成本
- **價格差異**：不同 Region 的定價是不同的，例如，AWS 在美國東部（北弗吉尼亞）的成本通常比其他地區便宜
- **數據傳輸費用**：跨 Region 的數據傳輸費用較高，最好能在同一個 Region 中進行部署，盡量避免在不同 Region 間頻繁傳輸大量數據

## 4. 可用的 AWS 服務
- **服務覆蓋**：並非所有的 AWS 服務都在每個 Region 可以使用。例如，某些新服務或技術通常首先在美國推出，然後才擴展到其他 Region。如果需要使用特定的 AWS 服務，應確認該服務在所選的 Region 是否可用

## 5. 災難恢復（Disaster Recovery）
- **異地備援**：使用者可以選擇多個 Region 來設置且通常會會在不同的地理位置部署應用，確保在某個 Region 出現問題時可以快速切換到另一個 Region

## 6.稅務優惠
- **稅務考量**：部分國家或地區可能會對雲服務徵收稅費，選擇某些 Region 可能會影響你的總體費用。例如，AWS 在特定地區的稅收優惠政策可能會降低你的總成本


## 測量、量化 latency 的 方法：

### 1. 網路診斷工具
- **Ping**：測量從本地端到 AWS Region 伺服器的 RTT ，像是如果是測試到東京的 latency ，可以用東京 region 內的一個 EC2 的 IP ，然後用 ping 多次測試，並分析回應時間。
- **Traceroute**：顯示從本地端到 AWS Region 的路徑，並顯示每個節點的 latency，並找出 bottleneck 或 high latency 的區域，測試方法跟 ping 類似 （但用 traceroute 可能會因防火牆或路由器問題而有些節點會無法顯示）。

### 2. AWS 內建工具
- **AWS CloudWatch Synthetics**：利用 Canary 並設定 script來模擬使用者行為，如 call api 或 HTTP request 等等，然後再設定 Canary 的執行 interval 與 位置，來進行多次測試，然後就可以在 Synthetics 看到數據與報告。
- **Connection Health Check**: 利用 amozon workplace 裡面的 connection health check 來觀察當前位置到全球各個不同的 region 的 RTT ，並會提供 speed rating 像是 acceptable slow 等等，讓使用者可以輕易獲取 latency 的數據
  
  參考資料：https://docs.aws.amazon.com/whitepapers/latest/best-practices-deploying-amazon-workspaces/how-to-check-latency-to-the-closest-aws-region.html








