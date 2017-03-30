# About
This module demonstrates a potential issue when using [globalize-webpack-plugin](https://github.com/rxaviers/globalize-webpack-plugin) with webpack-2 and [CommonsChunkPlugin](https://webpack.js.org/plugins/commons-chunk-plugin/).

# Running
```
git clone git@github.com:jbellenger/globalize-webpack-plugin-testcase.git
cd globalize-webpack-plugin-testcase
npm install
npm start
```
After `npm start` finishes, a page will be opened in your browser containing links for good and bad webpack builds.

Errors in the bad build can be examined by clicking on the 'bad' link and examining the javascript console.

```
manifest.c8408812356c0537.js:53 Uncaught TypeError: Cannot read property 'call' of undefined
    at __webpack_require__ (manifest.c8408812356c0537.js:53)
    at Object.9 (main.471eb69afffda4e8.js:6)
    at __webpack_require__ (manifest.c8408812356c0537.js:53)
    at webpackJsonpCallback (manifest.c8408812356c0537.js:24)
    at main.471eb69afffda4e8.js:1
manifest.c8408812356c0537.js:53 Uncaught TypeError: Cannot read property 'call' of undefined
    at __webpack_require__ (manifest.c8408812356c0537.js:53)
    at webpackJsonpCallback (manifest.c8408812356c0537.js:24)
    at en.d6f3f8f027ac2992da9e.js:1
```

# Remarks
The issue appears to surface when using CommonsChunkPlugin with a `maxChunks` value less than or equal to the number of supported languages. 
