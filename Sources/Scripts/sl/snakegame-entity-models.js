// game app models and utilities.
(function ($, global) {

    var appModels = {
        Player: function (name, id, color) {
            return {
                name: name,
                id: id,
                color: color
            };
        },
        Constraint: function (sourceIndex, destinationIndex, snake) {
            return {
                source: sourceIndex,
                destination: destinationIndex,
                snake: snake
            };
        },
        ItemsQueue: function (items) {
            var data = items;
            var circularll = new Exp.Types.Circularlinkedlist(data);
            var self = this;
            self.last = null;
            self.next = function () {
                if (self.last == null) {
                    self.last = circularll.head;
                } else {
                    self.last = self.last.next;
                }
                return self.last.value;
            };
        },
        Log: function (message, time, player) {
            return {
                player: player,
                message: message,
                time: time,
                toString: function () {
                    var str = "time: " + time;
                    if (player != undefined) {
                        str += "action by: " + player.name;
                    }
                    str += "log: " + message;
                    return str;
                }
            };
        }
    };

    var appUtilities = {
        GetConstraint: function (constraints, index) {
            var constraint = null;
            $.each(constraints, function (i, val) {
                if (val.source == index) {
                    constraint = val;
                    return;
                }
            });
            return constraint;
        }
    };

    $.extend(true, global, {
        Exp: {
            AppUtilities: appUtilities,
            AppModels: appModels
        }
    });
})(jQuery, window);