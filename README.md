# Ruby on Rails + React

## 環境作成手順

```sh
rails new todo_react --skip-yarn --skip-test --skip-active-storage --skip-action-cable
cd todo_react/
git add .
git commit -m 'init'
rails g scaffold todo due:date task:string
rake db:migrate
rails s   # Add test data and exit(^C)
git add .
git commit -m 'Add Todo scaffold'
mkdir frontend
cd frontend/
mkdir src
mkdir public

npm init -y
npm install react react-dom
npm install webpack webpack-cli webpack-dev-server --save-dev
npm install @babel/core @babel/preset-env @babel/preset-react @babel/cli -save-dev
npm install eslint babel-eslint eslint-loader eslint-plugin-react --save-dev
npm install css-loader style-loader babel-loader --save-dev

# write .babelrc .eslintrc.json webpack.config.js
# write src/index.js public/index.html from hello_react
# add frontend directories to .gitignore
git add .
git commit -m 'Add React environment'
```

## Files

* .babelrc


```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```
* .eslintrc.json

```json
{
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "es6": true
  },
  "parserOptions": {
    "sourceType": "module",
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    }
  },
  "extends": ["eslint:recommended", "plugin:react/recommended"],
  "plugins": ["react"],
  "rules": {
    "no-console": "off"
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
```
* webpack.config.js

```js
module.exports = {
  entry: {
    app: "./src/index.js"
  },
  output: {
    path: __dirname + '/public/js',
    filename: "[name].js"
  },
    devServer: {
    contentBase: __dirname + '/public',
    port: 8080,
    publicPath: '/js/'
  },
  devtool: "eval-source-map",
  mode: 'development',
  module: {
    rules: [{
      test: /\.js$/,
      enforce: "pre",
      exclude: /node_modules/,
      loader: "eslint-loader"
    }, {
      test: /\.css$/,
      loader: ["style-loader","css-loader"]
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
     }]
  }
};
```

* public/index.html

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta http-equiv="X-UA-Compatible" content="IE=Edge, chrome=1" />
  <title>React App</title>
</head>
<body>
  <div id="root"></div>
  <script type="text/javascript" src="js/app.js" charset="utf-8"></script>
</body>
</html>
```
* src/index.js

```js
import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(
  <h1>Hello, world!!</h1>,
  document.getElementById('root')
)
```


