# Cloths_Trade

主にスキル向上を目的に、ポートフォリオとしてフリマ開催用アプリ (**Cloths_Trade**) を作成しました。 
これはシングルページアプリケーション (SPA) として作成しており、フロントエンドには、**TypeScript / React**、バックエンドには、**PHP / Laravel**、インフラには、**Vercel** (静的サイト) / **Heroku**  を使用しています。

## 目次

- [機能](#機能)
- [フロントエンド](#フロントエンド)
- [バックエンド](#バックエンド)
- [使用技術その他](#使用技術その他)
- [画面](#画面)
  - [ホーム](#ホーム)
  - [ログイン](#ログイン)
  - [ユーザー登録](#ユーザー登録)
  - [メールアドレス認証](#メールアドレス認証)
  - [マイページ](#マイページ)
  - [トレードの投稿](#トレードの投稿)
  - [検索から参加申請](#検索から参加申請)
  - [トレードの管理](#トレードの管理)
  - [参加申請中のトレード](#参加申請中のトレード)



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
- [Redux Toolkit](https://redux-toolkit.js.org) (1.5.1) - 状態管理 (Redux簡易化ツール)
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



## 使用技術その他
- [Docker](https://docs.docker.com/desktop/mac/release-notes/) - コンテナ管理
- [GitHub Actions](https://docs.github.com/actions) - CI/CD

アプリ→ [https://cloths-trade-laravel-react.vercel.app/](https://cloths-trade-laravel-react.vercel.app/)

(＊Herokuサーバを立ち上げていないため、ログインはできません。以下画面キャプチャにより基本的な動作を確認できます。)



## 画面
### ホーム
![home_page](https://user-images.githubusercontent.com/64412873/218245370-a14093a5-12ab-46ac-baf3-841d70536fcc.png)

---

### ログイン

| 入力時バリデーション | 送信時バリデーション |
| -- | -- |
| ![login_input_validation](https://user-images.githubusercontent.com/64412873/218248330-f92e326e-b7b3-40fb-9893-eadf9b1c8ef1.png) | ![login_submit_validation](https://user-images.githubusercontent.com/64412873/218247908-a74f7e81-db61-4e0e-a5b8-aeecfb403daa.png) |

![ログイン](https://user-images.githubusercontent.com/64412873/218251371-ee1015d1-a2c7-4a8f-a614-ea629518ebeb.gif)

---

### ユーザー登録

| 入力時バリデーション | 送信時バリデーション |
| -- | -- |
| ![register_input_validation](https://user-images.githubusercontent.com/64412873/218248210-9dcf6ae7-cee9-4753-9abd-545b307d6235.png) | ![register_submit_validation](https://user-images.githubusercontent.com/64412873/218248233-f7bad4cb-a01e-4208-b714-03b30d7d0558.png) |

https://user-images.githubusercontent.com/64412873/218252075-ed142146-13b0-44bf-a40d-43b9ecb7c0fe.mp4

---

### メールアドレス認証

#### 認証確認通知

![verification_notification](https://user-images.githubusercontent.com/64412873/218248804-a3d60fa6-6ea5-4752-99de-51ddd52b9d7c.png)

---

#### 認証用メール

![verification_email](https://user-images.githubusercontent.com/64412873/218248806-dd54df2c-1734-4915-9cbd-6dc38f20f850.png)

---

#### 未認証警告+再送信ボタン (マイページ)

![verification_warning](https://user-images.githubusercontent.com/64412873/218250086-12646bd6-6f8a-4f04-99bb-6a890e45f495.png)

---

### マイページ

![mypage](https://user-images.githubusercontent.com/64412873/218248502-d24b59c1-0472-4150-be4d-9312cfdff9a3.png)

#### プロフィールの変更

https://user-images.githubusercontent.com/64412873/218298177-3edae253-f385-4c67-b40f-6314c298e252.mp4

#### パスワードの変更

https://user-images.githubusercontent.com/64412873/218298420-a81c75c4-db81-4efc-98ea-c6e9951b45ff.mp4

---

### トレードの投稿

まずは自分が開催したい日付や上限人数などを書き込み、必要な画像をアップロードしてトレードを投稿します。

https://user-images.githubusercontent.com/64412873/218297334-0c578e9a-718d-4dca-a2df-5cf46aeeb358.mp4

---

### 検索から参加申請

#### 検索

都道府県で絞り込み、各地で開催予定のトレードを検索できます。投稿の数が12件よりも多い場合、ページネーションが表示されます。

https://user-images.githubusercontent.com/64412873/218315655-20eead32-37d3-4bf1-8292-489e6e1f0547.mp4

#### 詳細ページから参加申請

検索結果に表示されたトレードから参加したいトレードを選択し、参加申請を送ります。申請を送ると主催者に通知が行き、主催者が申請を受理すると参加決定となります。

https://user-images.githubusercontent.com/64412873/218314999-52d262bf-1179-4d0b-9989-407ce903e2ef.mp4

---

### トレードの管理

#### 一覧ページ

自分が開催予定のトレードが表示されます。

それぞれ色ごとに、

黄色...受理待ちの参加申請のあるトレード

オレンジ...受理待ちの参加申請があり、参加者もいるトレード

ピンク...受理待ちの参加申請はなく、参加者がいるトレード

となり、黄色とオレンジのトレードの参加申請を受理して、開催日を待ちます。(参加者がいるトレード内でのチャット機能の実装を検討中です。)


![trade_manage](https://user-images.githubusercontent.com/64412873/218315264-e930b8a9-3f6c-4943-ae90-d4975e2f7c39.png)

#### 参加申請受理

参加申請を受理すると、申請した人の参加が決定します。

https://user-images.githubusercontent.com/64412873/218315021-89ed7fd1-ccee-469b-84ab-a5610145399b.mp4

#### 投稿の編集

https://user-images.githubusercontent.com/64412873/218315035-f2359651-591a-4530-bcad-cdd2c880780f.mp4

---

### 参加申請中のトレード

参加申請中のトレード一覧画面から、申請の取り消しができます。

https://user-images.githubusercontent.com/64412873/218315052-6f8d36d5-f12c-4956-805e-ab1bdd277d3f.mp4

---
