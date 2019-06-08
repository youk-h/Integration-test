# インテグレーションテスト
現段階では、REST APIを受け付けるための実装になっています。
今後、インテグレーションテスト実行環境へステップアップします。

## アプリのセットアップ
`npm install` を実行すると、依存ファイルがすべてインストールされます。

## アプリのスタート
`npm run start` を実行すると、アプリが起動しHTTPリクエストを受け付けます。

## データベースの準備
Postgresコンテナの準備を以下の二つのコマンドで行います

`docker build -t postgres:e2e .`

`docker run -it --rm -d --name postgres -p 5432:5432 postgres:e2e`

## REST API実行
アプリのスタート　と　データベースの準備を終えて
GET localhost:3000/cars/:name

POST localhost:3000/cars

PUT localhost:3000/cars/:name

DELETE localhost:3000/cars/:name

で操作できます

## ティアダウン
Postgresコンテナを削除するには以下のコマンドを実行します
`docker stop postgres`
