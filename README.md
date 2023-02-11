# Cloths_Trade

主にスキル向上を目的に、ポートフォリオとしてフリマ開催用アプリ (**Cloths_Trade**) を作成しました。 
これはシングルページアプリケーション (SPA) として作成しており、フロントエンドには、**TypeScript / React**、バックエンドには、**PHP / Laravel**、インフラには、**Vercel** (静的サイト) / **Heroku**  を使用しています。


## 機能

- 認証
  - ログイン / ログアウト
    - Cookie / セッション
  - ユーザー登録 / 表示 (マイページ) / 更新 / 削除
  - メールアドレス認証
    - 未認証ユーザー削除 (定期処理)
  - ユーザーパスワード更新
  - パスワードリセット
- トレード 管理
  - 新規作成 / 表示(一覧＆詳細) / 更新 / 削除
  - 検索(都道府県別)
  - 他人のトレードへの参加申請
  - 自分のトレードの参加申請受理
  - ページネーション

## フロントエンド
### 開発環境 
フロントエンドの開発言語として**TypeScript**を使用し、ライブラリとして使用したのは**React**です。またこれらを基本とした開発環境の構築には**Create React App** (**CRA**)を用いています。その他実行環境は以下のようになっています。(括弧内の数字はバージョン) 

- [Create React App](https://create-react-app.dev) (4.0.3)
  - [Yarn](https://yarnpkg.com/) (1.22.5)
  - [Npm](https://www.npmjs.com/) (6.14.10)
  - [Node.js](https://nodejs.org/) (14.15.2)
  - [React](https://reactjs.org) (16.13.1)

動作確認の際のブラウザには、Chrome (Mac) を使用しています。  

### 主要使用技術
- [TypeScript](https://www.typescriptlang.org/) (4.6.4) - 開発言語、静的型付け
- [React](https://reactjs.org) (16.13.1)
- [React Router Dom](https://reactrouter.com/web/guides/quick-start) (5.2.0) - ルーティング
- [React Helmet Async](https://github.com/staylor/react-helmet-async) (1.0.9) - HTMLタグ更新
- [Redux](https://redux.js.org) (4.0.0) - 状態管理
- [React Redux](https://react-redux.js.org) (7.2.4) - 状態管理 Reactバインディング
- [Redux Toolkit](https://redux-toolkit.js.org) (1.5.1) - 状態管理 (Redux簡便化ツール)
- [Marerial-UI](https://material-ui.com) (4.12.4) - UIデザイン
- [Axios](https://github.com/axios/axios) (0.27.2) - HTTPクライアント
- [React Hook Form](https://react-hook-form.com/) (7.30.0) - フォーム生成
- [Yup](https://github.com/jquense/yup) (0.32.11) - スキーマ構築

## バックエンド
### 開発環境 
バックエンドの開発言語には**PHP**、Webアプリケーションフレームワークには**Laravel**を利用しました。開発環境の構築には、Laravelから公式に提供されている**Laravel Sail**を用いており、これにより開発用のデータベースやセッションストアの他、メール送信まで行うことができる環境を整えています。 構築した環境は以下の通りです。  

- [Docker for Mac](https://docs.docker.com/desktop/mac/release-notes/) (4.6.0)
- [Laravel Sail](https://laravel.com/docs/8.x/sail) (1.29.2)
  - PHP (8.0.20)
  - [Laravel](https://laravel.com/) (9.7.0)
  - [MySQL](https://www.mysql.com/) (8.0.23) - RDB
  - [Redis](https://redis.io/) (6.0.10) - キャッシュ、セッションストア
  - [MailHog](https://github.com/mailhog/MailHog) - メール送受信

### 主要使用技術
- PHP (8.0.20) - 開発言語
- [Laravel](https://laravel.com/) (9.7.0) - Webアプリケーションフレームワーク
- [MySQL](https://www.mysql.com/) (8.0.23) - RDB (開発環境)
- [Redis](https://redis.io/) (6.0.10) - キャッシュ、セッションストア (開発環境)
- [MailHog](https://github.com/mailhog/MailHog) - メール送受信 (開発環境)
- [PHPUnit](https://phpunit.de/) (9.5.10) - テスト
- [Telescope](https://laravel.com/docs/8.x/telescope) (4.9) - デバッガー(HTTPリクエスト)
- [Sanctum](https://laravel.com/docs/8.x/sanctum) (2.15) - SPA認証 (セッション、CSRF & XSS 防衛)
- [Fortify](https://laravel.com/docs/8.x/fortify) (1.13) - 認証用バックエンド (ルーティング、コントローラー etc)
- Faker (1.9.1) - テストデータ生成
- Tinker (2.7) - DB操作


