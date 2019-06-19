## アプリのセットアップ
`npm install` を実行すると、依存ファイルがすべてインストールされます。

# インテグレーションテスト
`npm run e2e` を実行するとアプリが起動したのちに、テストが実行されます。

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
