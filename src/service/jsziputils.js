var JSZipUtils = {};
JSZipUtils._getBinaryFromXHR = function (xhr) {
  return xhr.response || xhr.responseText;
};

function createStandardXHR() {
  try {
    return new window.XMLHttpRequest();
  } catch (e) {}
}

function createActiveXHR() {
  try {
    return new window.ActiveXObject('Microsoft.XMLHTTP');
  } catch (e) {}
}

var createXHR =
  typeof window !== 'undefined' && window.ActiveXObject
    ? function () {
        return createStandardXHR() || createActiveXHR();
      }
    : createStandardXHR;

/**
 * @param  {string} path
 * @param  {function|{callback: function, progress: function}} options
 * @return {Promise|undefined}
 */
JSZipUtils.getBinaryContent = function (path, options) {
  var promise, resolve, reject;
  var callback;

  if (!options) {
    options = {};
  }

  if (typeof options === 'function') {
    callback = options;
    options = {};
  } else if (typeof options.callback === 'function') {
    callback = options.callback;
  }

  if (!callback && typeof Promise !== 'undefined') {
    promise = new Promise(function (_resolve, _reject) {
      resolve = _resolve;
      reject = _reject;
    });
  } else {
    resolve = function (data) {
      callback(null, data);
    };
    reject = function (err) {
      callback(err, null);
    };
  }

  try {
    var xhr = createXHR();

    xhr.open('GET', path, true);

    if ('responseType' in xhr) {
      xhr.responseType = 'arraybuffer';
    }

    if (xhr.overrideMimeType) {
      xhr.overrideMimeType('text/plain; charset=x-user-defined');
    }

    xhr.onreadystatechange = function (event) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200 || xhr.status === 0) {
          try {
            resolve(JSZipUtils._getBinaryFromXHR(xhr));
          } catch (err) {
            reject(new Error(err));
          }
        } else {
          reject(new Error('Ajax error for ' + path + ' : ' + this.status + ' ' + this.statusText));
        }
      }
    };

    if (options.progress) {
      xhr.onprogress = function (e) {
        options.progress({
          path: path,
          originalEvent: e,
          percent: (e.loaded / e.total) * 100,
          loaded: e.loaded,
          total: e.total,
        });
      };
    }

    xhr.send();
  } catch (e) {
    reject(new Error(e), null);
  }

  return promise;
};

// export
module.exports = JSZipUtils;
