function log (msg) {
  var ul = document.getElementById('log');
  var li = document.createElement('li');
  li.appendChild(document.createTextNode(msg));
  ul.appendChild(li);
}

function logEvent (ctx, type) {
  ctx.addEventListener(type, function (e) {
    log('event: ' + type);
    console.log(type, e);
  }, false);
}

function logError (err, msg) {
  log('error: ' + msg);
  log(err);
  console.error(err, msg);
}

function errorLogger (msg) {
  return function (err) {
    logError(err, msg);
  }
}

function onWrite () {
  var a = document.createElement('a');
  a.href = cordova.file.dataDirectory + 'app.html';
  a.appendChild(document.createTextNode('app.html'));
  document.body.querySelector('main').appendChild(a);

  log('done!');
  console.log('done!');
}

function onFileWriter (fileWriter) {
  var a = '<a href="' + cordova.file.applicationDirectory + 'www/index.html">index.html</a>';
  var blob = new Blob(['<!DOCTYPE html><html><head><title>app.html</title></head><body><h1>app.html</h1>' + a + '</body></html>']);
  fileWriter.onwrite = onWrite;
  fileWriter.onerror = errorLogger('fileWriter.write');
  fileWriter.write(blob);
}

function onFileEntry (fileEntry) {
  fileEntry.createWriter(onFileWriter, errorLogger('createWriter'));
}

function onDirectoryEntry (dirEntry) {
  dirEntry.getFile('app.html', { create: true }, onFileEntry, errorLogger('getFile'));
}

function onDeviceReady () {
  [
    'applicationDirectory',
    'applicationStorageDirectory',
    'dataDirectory',
    'cacheDirectory',
    'tempDirectory'
  ].forEach(function (prop) {
    log('cordova.file.' + prop + ': ' + cordova.file[prop]);
  });
  window.resolveLocalFileSystemURL(
    cordova.file.dataDirectory,
    onDirectoryEntry,
    errorLogger('resolveLocalFileSystemURL')
  );
}

logEvent(document, 'deviceready');
logEvent(document, 'orientationchange');
logEvent(document, 'resize');

document.addEventListener('deviceready', onDeviceReady, false);
