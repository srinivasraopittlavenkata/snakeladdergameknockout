// system models and utilities.
(function ($, global) {
    var utilities = {
        randomnumber: function (min, max) {
            return Math.floor((Math.random() * max) + min);
        }
    };

    var systemTypes = {
        Stack: function (dataset) {

            var data = (dataset != undefined) ? dataset : []; // data set internal to the stack.

            var self = this;

            self.count = function () {
                return data.length;
            };;

            self.clear = function () {
                data = [];
            };

            self.peek = function () {
                if (data.length != 0) {
                    return data[data.length - 1];
                }
                return null;
            };

            self.pop = function () {
                if (data.length != 0) {
                    return data.pop();
                }
                return null;
            };

            self.push = function (element) {
                data.push(element);
            };

            self.isempty = function () {
                if (data.length != 0) {
                    return false;
                }
                return true;
            };

            self.toarray = function () {
                return data;
            };
        },
        Circularlinkedlist: function (data) {
            var items = data;
            var self = this;
            var head = null;

            if (items != null) {
                var curr = null;
                $.each(items, function (i, obj) {
                    if (head == null) {
                        head = new node(obj, null);
                        curr = head;
                    } else {
                        curr.next = new node(obj, null);
                    }
                });
                if (curr.next != null) {
                    curr.next.next = head;
                } else {
                    curr.next = head;
                }
            };

            self.head = head;

            function node(value, next) {
                return {
                    value: value,
                    next: next
                };
            }
        }
    };

    $.extend(true, global, {
        Exp: {
            Utilities: utilities,
            Types: systemTypes,
        }
    });
})(jQuery, window);