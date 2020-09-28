(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.EasyUtils = factory());
}(this, function () {'use strict';
var EasyUtils = Object();

EasyUtils.mergeHash = function(a, b){
   var c = {};
   return c;
}

EasyUtils.diffHash = function (a, b) {
    var a_json = JSON.stringify(a);
    var b_json = JSON.stringify(b);
    return a_json == b_json;
}

EasyUtils.encodeURL = function(app, api) {
    return encodeURI("/?APP=" + app + "&api=" + api)
}

return EasyUtils;
}));