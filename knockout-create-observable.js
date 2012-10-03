(function (factory) {
    // Module systems magic dance.

    if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
        // CommonJS or Node: hard-coded dependency on "knockout"
        factory(require("knockout"), exports);
    } else if (typeof define === "function" && define["amd"]) {
        // AMD anonymous module with hard-coded dependency on "knockout"
        define(["knockout", "exports"], factory);
    } else {
        // <script> tag: use the global `ko` object, attaching a `mapping` property
        factory(ko, ko.advanced = {});
    }
}(function (ko, exports) {

    exports.createObservableIfNotExists = function(value, context) {
        var dotPos = value.indexOf('.');

        var result;

        if (dotPos != -1) {
            var elements = value.split('.');

            var iterationContext = context;

            for (var i in elements) {
                var elem = elements[i];

                elem = elem.replace('(', '');
                elem = elem.replace(')', '');

                var elemExists = false;
                var iterContextObservable = ko.isObservable(iterationContext);

                if (iterContextObservable) {
                    if (iterationContext()[elem]) {
                        elemExists = true;
                    }
                } else {
                    if (iterationContext[elem]) {
                        elemExists = true;
                    }
                }

                if (!elemExists) {
                    if (elements.length > 1 && (elements.length - 1) != i ) {

                        if (iterContextObservable) {
                            if (!iterationContext()[elem]) {
                                iterationContext()[elem] = ko.observable({});
                            }

                            iterationContext = iterationContext()[elem];

                        } else {
                            if (!iterationContext[elem]) {
                                iterationContext[elem] = ko.observable({});
                            }

                            iterationContext = iterationContext[elem];
                        }

                    } else {
                        if (elements.length > 1) {
                            if (!iterationContext[elem]) {
                                iterationContext()[elem] = ko.observable();
                            }
                            result = iterationContext()[elem];
                        } else {
                            if (!iterationContext[elem]) {
                                iterationContext[elem] = ko.observable();
                            }
                            result = iterationContext()[elem];
                        }
                    }
                } else {

                    if (iterContextObservable) {
                        result = iterationContext()[elem]
                        iterationContext = iterationContext()[elem];
                    } else {
                        result = iterationContext[elem];
                        iterationContext = iterationContext[elem];
                    }
                }
            }
        } else {
            if (!context[value]) {
                context[value] = ko.observable();
            }

            result = context[value];
        }

        return result;
    };

    exports.cro = exports.createObservableIfNotExists;

}));