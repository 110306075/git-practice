# 說明 blob, tree, commit, branch, head 分別是什麼

---

# Git 中的五個關鍵概念

## 1. Blob (Binary Large Object)
- **定義**：Blob 是 Git 中用來存儲文件內容的對象，代表文件的快照。它只存儲文件的內容，而不存儲文件名或目錄結構。每個 Blob 由文件內容的 SHA-1 哈希值標識。
- **作用**：當你提交一個文件，Git 會將文件內容存儲為 Blob。如果兩個文件的內容相同，無論文件名如何，Git 都會生成相同的 Blob。
- **特點**：Blob 是不可變的。一旦創建，無法更改，因此 Git 可以高效管理文件版本，因為未改變的文件內容不會被重新存儲。

---

## 2. Tree
- **定義**：Tree 是 Git 中用來描述目錄結構的對象，包含其他 Tree（表示子目錄）和 Blob（表示文件）。它存儲了目錄中的文件名、權限以及對應的 Blob 或子 Tree 的 SHA-1 哈希值。
- **作用**：Tree 是 Git 目錄結構的核心，通過將文件（Blob）和子目錄（子 Tree）連結，構建項目目錄。在每次提交時，Git 會生成代表當前目錄狀態的 Tree。
- **特點**：Tree 將文件和目錄連接成一個層次結構的樹，這讓 Git 可以有效管理項目的文件和目錄。

---

## 3. Commit
- **定義**：Commit 是 Git 中記錄項目狀態的快照。每個 commit 包含：
  - 指向一個 Tree（當前目錄和文件的結構快照）。
  - 父 commit 的引用（上一個 commit 的 SHA-1 哈希值）。
  - 提交的元數據（提交者、提交時間、提交信息等）。
- **作用**：Commit 代表一次提交，記錄當時的項目快照。Git 通過 commit 形成一個歷史鏈，讓你可以回顧和追蹤文件的變化。
- **特點**：每個 commit 是不可變的，並且連接到過去的 commit，形成不可改變的歷史記錄，這是 Git 版本控制的核心。

---

## 4. Branch
- **定義**：Branch 是 Git 中的可變指針，指向某一個 commit。每個 branch 代表一個開發線，每當有新的提交時，branch 會自動指向新的 commit。
- **作用**：Branch 讓開發者可以在不同開發線上工作，彼此之間不會干擾。常見的有主分支（`master` 或 `main`）和功能分支，用於獨立開發功能或修正。
- **特點**：Branch 是輕量級的，它只是指向 commit 的指針。切換 branch 僅更改指針位置，不會複製代碼庫。

---

## 5. HEAD
- **定義**：HEAD 是 Git 中的特殊指針，指向當前檢出的分支或 commit。通常情況下，HEAD 是指向某個 branch。
- **作用**：HEAD 用來跟踪當前工作所在的分支或 commit。如果檢出某個 branch，HEAD 會指向該 branch；如果檢出某個 commit，HEAD 會指向該 commit，稱為「分離頭指針」（detached HEAD）。
- **特點**：HEAD 能靈活切換分支或 commit，並反映當前的工作環境。當你提交變更時，HEAD 會更新指向最新的 commit。

# Git 操作對 `.git` 目錄的變化

---

## 1. `git init`
**操作**：初始化一個新的 Git 存儲庫。

**.git 目錄變化**：
- **創建 `.git/` 目錄**：包括以下子目錄和文件：
  - **`.git/objects/`**：用來存放所有 Git 對象（Blob、Tree、Commit 等）。
  - **`.git/refs/`**：保存分支和標籤的引用信息。
  - **`.git/HEAD`**：指向當前檢出的分支，通常是 `refs/heads/master` 或 `refs/heads/main`。
  - **`.git/index`**：暫存區，用來追蹤被 `git add` 的變更。

---

## 2. `git branch`
**操作**：列出、創建或刪除分支。

**.git 目錄變化**：
- **`.git/refs/heads/`**：創建分支時，Git 會在此目錄下生成一個新文件，該文件保存了新分支指向的 commit 的 SHA-1 哈希值。
- **`.git/HEAD`**：切換分支後，HEAD 文件更新為指向新分支的引用，例如 `ref: refs/heads/new-feature`。

---

## 3. `git add`
**操作**：將文件變化添加到暫存區。

**.git 目錄變化**：
- **`.git/index` 文件**：`git add` 會將文件變化快照寫入 `.git/index`，該文件存儲了被暫存的變更信息，包括文件的路徑、權限及 Blob 的哈希值。

---

## 4. `git commit`
**操作**：提交暫存區的變更，生成新的 commit。

**.git 目錄變化**：
- **`.git/objects/`**：生成新的 Git 對象，包括 Blob、Tree 和 Commit 對象：
  - **Blob**：存儲每個文件的內容。
  - **Tree**：代表當前的目錄結構，連結 Blob 和文件名。
  - **Commit**：存儲提交信息、指向 Tree 對象，並記錄父提交。
- **`.git/refs/heads/`**：提交後更新當前分支的引用，指向新的 commit。
- **`.git/HEAD`**：指向當前分支，保持指向最新的 commit。

---

## 5. `git checkout`
**操作**：切換到另一個分支或 commit。

**.git 目錄變化**：
- **`.git/HEAD`**：切換分支後，HEAD 文件會更新為指向新分支或 commit 的引用。如果切換到特定 commit，將進入「分離頭指針」狀態，`.git/HEAD` 會直接指向 commit 的哈希值。

---


