# インテグレーションテスト
現段階では、REST APIを受け付けるための実装になっています。
今後、インテグレーションテスト実行環境へステップアップします。

## アプリのセットアップ
`npm install` を実行すると、依存ファイルがすべてインストールされます。

## アプリのスタート
`npm run start` を実行すると、アプリが起動しHTTPリクエストを受け付けます。

## REST API実行
アプリの起動後

GET localhost:3000/cars/:name

POST localhost:3000/cars

PUT localhost:3000/cars/:name

DELETE localhost:3000/cars/:name

で操作できます

## ティアダウン
`npm run end`を実行すると、稼働しているコンテナを削除できます
