# 課題管理アプリ

React と Spring Boot で構築した課題管理システムです。  
一般ユーザーと管理者ユーザーで適切な権限分離を行い、安全かつシンプルな進捗管理を実現しています。

---

## 画面イメージ

_(ここにGIF画像やスクリーンショットのURLを掲載すると効果的です)_

---

## 主要機能

- **認証・認可機能**
  - ログイン / ログアウト
  - ロールに基づくアクセス制御（`ADMIN` / `USER`）
- **課題管理機能**
  - 課題の一覧表示・詳細表示
  - 課題の新規作成
  - 課題の編集（ステータス変更：`TODO` / `DOING` / `DONE`）
  - 課題の削除（**`ADMIN` 権限のみ可能**）
- **ユーザー管理機能（`ADMIN` 権限のみアクセス・操作可能）**
  - ユーザー情報の一覧表示
  - ユーザーの新規作成
  - ユーザー情報の編集
  - ユーザーの削除

---

## こだわったポイント・設計思想

1. **実用性を考慮した権限設計**
   - 一般ユーザー（`USER`）にも課題の起票・進捗更新（編集）を許可し、日々の運用をスムーズに行えるようにしています。
   - 誤操作や不正によるデータ喪失を防ぐため、「削除」操作のみ管理者（`ADMIN`）に限定しました。
2. **堅牢な二重制御**
   - **フロントエンド (React):** ログイン中の権限（`authority`）を判定し、`USER` 権限時には課題の「削除ボタン」および「ユーザー管理画面への遷移ボタン」を UI 上で非表示化。
   - **バックエンド (Spring Boot):** UI 側の制御だけに頼らず、API 層で `@PreAuthorize("hasAuthority('ADMIN')")` を付与し、不正な直接リクエストに対しても 403 Forbidden を返す二重のセキュリティを確保。
3. **TypeScript による型安全な開発**
   - Props や API のレスポンス型を厳密に定義し、コンパイル時点でバグを検知できる堅牢なフロントエンド構成にしています。

---

## 技術スタック

### フロントエンド

- React 18
- TypeScript
- Vite
- Bootstrap 5 / HTML5 / CSS3

### バックエンド

- Java 17
- Spring Boot 3
- Spring Security
- MyBatis

### データベース & インフラ

- MySQL 8.0
- Docker / Docker Compose

---

## セットアップ・起動方法 (Docker)

_(※Docker構成が完成した後に記述するセクションです)_

### 1. リポジトリのクローン

```bash
git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
cd your-repo-name
```
