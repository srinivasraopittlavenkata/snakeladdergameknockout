
// app specific knockout models and utilities.
(function ($, global) {
    var konckoutModels = {
        Square: function (index, constraint, boardSize) {
            this.index = ko.observable(index);
            this.players = ko.observableArray([]);
            this.constraint = ko.observable(null);
            this.constraintVariance = ko.observable(0);
            if (constraint != undefined) {
                this.constraint = ko.observable(new Exp.KonckoutModels.Constraint(constraint.source, constraint.destination, constraint.isSnake));
                this.constraintVariance = ko.observable(constraint.destination - constraint.source);
            }

            this.isStart = index == 1 ? ko.observable(true) : ko.observable(false);
            this.isEnd = index == boardSize ? ko.observable(true) : ko.observable(false);
        },
        Player: function (name, id, color) {
            this.name = ko.observable(name);
            this.index = ko.observable(0);
            this.id = ko.observable(id);
            this.trials = ko.observable(0);
            this.bites = ko.observable(0);
            this.jumps = ko.observable(0);
            this.moves = ko.observableArray([]);
            this.color = ko.observable(color);
        },
        Move: function (source, destination) {
            this.destination = ko.observable(destination);
            this.source = ko.observable(source);
        },
        Constraint: function (source, destination, snake) {
            this.destination = ko.observable(destination);
            this.snakeorladder = ko.observable(snake);
            this.source = ko.observable(source);
            this.variance = ko.observable(destination - source);
        }
    };

    var konckoutUtilities = {
        CreateKoPlayers: function (playerData) {
            var players = [];
            $.each(playerData, function (i, player) {
                players.push(new Exp.KonckoutModels.Player(player.name, player.id, player.color));
            });
            return players;
        },
        CreateKoSquares: function (boardSize, constraints) {
            var squares = [];
            for (var i = 1; i <= boardSize; i++) {
                squares.push(new Exp.KonckoutModels.Square(i, Exp.AppUtilities.GetConstraint(constraints, i), boardSize));
            }
            return squares;
        },
        GetKoPlayer: function (koplayers, player) {
            var koplayer = null;
            ko.utils.arrayForEach(koplayers(), function (item) {
                if (item.name() == player.name) {
                    koplayer = item;
                    return;
                }
            });
            return koplayer;
        },
        GetKoSquare: function (kosquares, squareIndex) {
            var kosqaure = null;
            ko.utils.arrayForEach(kosquares(), function (item) {
                if (item.index() == squareIndex) {
                    kosqaure = item;
                    return;
                }
            });
            return kosqaure;
        },
        ClearSquarePlayers: function (koSquares) {
            ko.utils.arrayForEach(koSquares(), function (item) {
                item.players = ko.observableArray([]);
            });
        },

        ClearPlayerIndices: function (koplayers) {
            ko.utils.arrayForEach(koplayers(), function (item) {
                item.index(0);
            });
        },
    };

    $.extend(true, global, {
        Exp: {
            KonckoutUtilities: konckoutUtilities,
            KonckoutModels: konckoutModels
        }
    });
})(jQuery, window);