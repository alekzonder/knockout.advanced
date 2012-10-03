# knockout.advanced.js

some advanced knockout.js functions

* ko.advanced.createObservableIfNotExists, can create observable params, if they not exists.

 By default, in knockout.js with mapping plugin, if you want update models with ajax, first you must initialize model data for bindings on page.

 createObservableIfNotExists create undefined params and when you get data from server and apply it with ko.mapping.fromJS, all bindings work.

Example: http://jsfiddle.net/alekzonder/xyDmQ/