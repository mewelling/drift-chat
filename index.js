var request = require("request-promise");
var Drift = (function() {
  function Drift(token) {
    this.token = token;
    this.url = 'https://driftapi.com/'
  }

  Drift.prototype.getAllContacts = function (callback) {
    let isCallback = false;
    let parsedResponse;
    if (typeof callback === "function") {
      isCallback = true;
    }
    let request_arg = {
      url: 'https://driftapi.com/contacts/',
      headers: {
        'User-Agent': 'Request-Promise',
        'Authorization': 'Bearer ' + this.token,
      }
    };
    return request(request_arg)
      .then(function (contacts) {
        if (isCallback) {
          try {
            parsedResponse = JSON.parse(contacts);
          } catch (err) {
            callback(err)
          }
          callback(null, parsedResponse);
        } else {
          try {
            parsedResponse = JSON.parse(contacts);
          } catch (err) {
            return Promise.reject(err);
          }
          return Promise.resolve(parsedResponse);
        }
      })
      .catch(function (err) {
        if (isCallback) {
          callback(err);
        } else {
          return Promise.reject(err);
        }
      });
  };

  Drift.prototype.getContact = function (id, options, callback) {
    if (options == null) {
      options = {};
    }
    if (typeof options === "function") {
      callback = options;
      options = {};
    }
    let isCallback = false;
    let parsedResponse;
    if (typeof callback === "function") {
      isCallback = true;
    }
    let request_arg = {
      url: 'https://driftapi.com/contacts/' + id,
      headers: {
        'User-Agent': 'Request-Promise',
        'Authorization': 'Bearer ' + this.token,
      }
    };
    return request(request_arg)
      .then(function (contact) {
        if (isCallback) {
          try {
            parsedResponse = JSON.parse(contact);
          } catch (err) {
            callback(err)
          }
          callback(null, parsedResponse);
        } else {
          try {
            parsedResponse = JSON.parse(contact);
          } catch (err) {
            return Promise.reject(err);
          }
          return Promise.resolve(parsedResponse);
        }
      })
      .catch(function (err) {
        if (isCallback) {
          callback(err);
        } else {
          return Promise.reject(err);
        }
      });
  }

  Drift.prototype.getConvo = function(message, options, callback) {
    if (options == null) {
      options = {};
    }
    if (typeof options === "function") {
      callback = options;
      options = {};
    }
    let isCallback = false;
    let parsedResponse;
    if (typeof callback === "function") {
      isCallback = true;
    }
    let request_arg = {
      url: 'https://driftapi.com/v1/conversations/' + message.body.data.conversationId.toString() + '/messages',
      headers: {
        'User-Agent': 'request',
        'Authorization': 'Bearer ' + this.token,
      }
    };
    return request(request_arg)
      .then(function (convo) {
        if (isCallback) {
          try {
            parsedResponse = JSON.parse(convo);
          } catch (err) {
            callback(err)
          }
          callback(null, parsedResponse);
        } else {
          try {
            parsedResponse = JSON.parse(convo);
          } catch (err) {
            return Promise.reject(err);
          }
          return Promise.resolve(parsedResponse);
        }
      })
      .catch(function (err) {
        if (isCallback) {
          callback(err);
        } else {
          return Promise.reject(err);
        }
      });
  };

  Drift.prototype.postMessage = function(message, options, callback) {

    if(!options.orgId){
      options.orgId = message.body.orgId
    }
    let isCallback = false;
    if (typeof callback === "function") {
      isCallback = true;
    }
    let request_arg = {
      method: 'POST',
      url: 'https://driftapi.com/v1/conversations/' + message.body.data.conversationId.toString() + '/messages',
      body: options,
      json: true,
      headers: {
        'User-Agent': 'request',
        'Authorization': 'Bearer ' + this.token,
      }
    };
    return request(request_arg)
      .then(function (chat) {
        if (isCallback) {
          callback(null, chat);
        } else {
          return Promise.resolve(chat);
        }
      })
      .catch(function (err) {
        if (isCallback) {
          callback(err);
        } else {
          return Promise.reject(err);
        }
      });
  };

  return Drift;
})();

module.exports = Drift;