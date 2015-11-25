# poc-cordova-webview-datadir

proof of concept for navigating a WebView to content stored in an app's private data directory


## What?

This project demonstrates that a Cordova app may generate a new app,
write this app (the HTML, CSS, etc) to the private data directory,
and navigate the WebView to this new app.


## Results

Working in iOS 9 and Android 6 with the following component versions:

- platform: android @ 4.1.1

- platform: ios @ 3.9.2

- [cordova-plugin-file](https://github.com/apache/cordova-plugin-file) @ 3.0.0

Requires more experimentation to resolve issues in Windows 10.
