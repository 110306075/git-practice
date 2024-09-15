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

## 4. `git add`
**操作**：將文件變化添加到暫存區。

**.git 目錄變化**：
- **`.git/index` 文件**：`git add` 會將文件變化快照寫入 `.git/index`，該文件存儲了被暫存的變更信息，包括文件的路徑、權限及 Blob 的哈希值。

---

## 5. `git commit`
**操作**：提交暫存區的變更，生成新的 commit。

**.git 目錄變化**：
- **`.git/objects/`**：生成新的 Git 對象，包括 Blob、Tree 和 Commit 對象：
  - **Blob**：存儲每個文件的內容。
  - **Tree**：代表當前的目錄結構，連結 Blob 和文件名。
  - **Commit**：存儲提交信息、指向 Tree 對象，並記錄父提交。
- **`.git/refs/heads/`**：提交後更新當前分支的引用，指向新的 commit。
- **`.git/HEAD`**：指向當前分支，保持指向最新的 commit。

---

## 6. `git checkout`
**操作**：切換到另一個分支或 commit。

**.git 目錄變化**：
- **`.git/HEAD`**：切換分支後，HEAD 文件會更新為指向新分支或 commit 的引用。如果切換到特定 commit，將進入「分離頭指針」狀態，`.git/HEAD` 會直接指向 commit 的哈希值。

---

## 7. `git push`
**操作**：將本地提交的變更推送到遠端倉庫。

**.git 目錄變化**：
- **無直接變化**：`git push` 是一個將本地變更同步到遠端倉庫的操作，不會直接更改本地 `.git` 目錄。然而，它會更新遠端倉庫中相應的分支指針（如 `refs/remotes/origin/master`）。
