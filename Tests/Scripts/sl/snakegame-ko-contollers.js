// app specific knockout controllers
(function ($, global) {
    var konckoutControllers = {
        SnakeLadderGameController: function (boardSize, constraints, players) {
            var self = this;

            // DATA items
            // create bindable players.
            self.players = ko.observableArray(Exp.KonckoutUtilities.CreateKoPlayers(players));
            // create bindale squares on the board.
            self.sqaures = ko.observableArray(Exp.KonckoutUtilities.CreateKoSquares(boardSize, constraints));
            // set the current player to null.
            self.currentPlayer = ko.observable(null);
            // set the winner to null;
            self.winner = ko.observable(null);
            self.showWinner = ko.dependentObservable(function () {
                var pages = self.winner();
                return pages != null;
            });
            // PROCESSING items

            // this items queue is a ds which would give the next player in the queue.
            self.playersQueue = new Exp.AppModels.ItemsQueue(players);
            // this function triggers the game start event (clears current player and winner)
            self.startGame = function () {
                // clear indexes and sqaures.
                self.gameStarted(true);
                self.currentPlayer = ko.observable(null);
                self.winner = ko.observable(null);
                var activePlayer = self.playersQueue.next();

                self.currentPlayer(Exp.KonckoutUtilities.GetKoPlayer(self.players, activePlayer));

                //self.log("New game started", null);
                self.statusMessage(activePlayer.name + "- please roll the dice");
            };
            // this function tirggrs the roll dice event and moves the current player to next destination.
            // rules:
            // 1) if calculated destination is boardsize then current player is set as winner.
            // 2) if calculated destination is greater than boardsize then current player stays at the same place.
            // 3) if calculated destination is less than boardsize then current player is moved to new place and constrain is applied at that place.
            self.rollDice = function () {
                // roll the dice.
                var rolledNumber = Exp.Utilities.randomnumber(1, 6);
                self.lastDiceMessage(self.currentPlayer().name() + "- rolled - " + rolledNumber);
                //self.log(self.statusMessage(), ko.dataFor(self.currentPlayer));

                // calculate the new index.
                var playerNewIndex = self.currentPlayer().index() + rolledNumber;
                if (playerNewIndex == boardSize) { // if index == boardsize
                    self.setSquare(self.currentPlayer(), playerNewIndex);
                    self.statusMessage(self.currentPlayer().name() + "Congratulations");
                    self.winner(self.currentPlayer());
                    self.gameStarted(false);
                }
                else if (playerNewIndex > boardSize) { // if index == boardsize then no change in position.
                } else {
                    self.setSquare(self.currentPlayer(), playerNewIndex); // set the new place.
                    self.setSquareConstraint(self.currentPlayer(), playerNewIndex); // apply the constraint at the place.
                }

                if (self.winner() == null) {

                    // set the next player in the queue as current player.
                    var next = self.playersQueue.next();
                    self.currentPlayer(Exp.KonckoutUtilities.GetKoPlayer(self.players, next));

                    self.statusMessage(self.currentPlayer().name() + "- please roll the dice");
                }
            };
            // applies the squar constraint either a snaker or ladder logic is applied
            // rules:
            // 1) if snake is there at the current index, player is moved to new place based on the snake constraint
            // 2) if ladder is there at the current index, player is moved to new place based on the ladder constraint
            self.setSquareConstraint = function (player) {
                var currentSquare = Exp.KonckoutUtilities.GetKoSquare(self.sqaures, player.index());
                if (currentSquare.constraint() != null) {
                    var variance = currentSquare.constraint().variance();
                    var newIdex = player.index() + variance;
                    if (newIdex < player.index()) {
                        player.bites(player.bites() + 1);
                    } else {
                        player.jumps(player.jumps() + 1);
                    }
                    self.setSquare(player, newIdex);
                }
            };

            // adds the player to the square players list.
            self.setSquare = function (player, newindex) {
                if (player.index() > 0) {
                    var currentSquare = Exp.KonckoutUtilities.GetKoSquare(self.sqaures, player.index());
                    currentSquare.players.remove(self.currentPlayer());
                }

                var destinationSquare = Exp.KonckoutUtilities.GetKoSquare(self.sqaures, newindex);
                destinationSquare.players.push(self.currentPlayer());
                player.moves.push(new Exp.KonckoutModels.Move(player.index(), newindex));
                player.index(newindex);
                player.trials(player.trials() + 1);
            };

            // DISPLAY Items
            self.statusMessage = ko.observable('Click Start Game to Play');
            self.histroy = ko.observableArray([]);
            self.log = function (message, player) {
                var d = new Date();
                var n = d.getTime();
                self.histroy.push(new Exp.Types.Log(message, n, player));
            };
            self.lastDiceMessage = ko.observable('');
            self.gameStarted = ko.observable(false);
        }
    };

    $.extend(true, global, {
        Exp: {
            KonckoutControllers: konckoutControllers
        }
    });
})(jQuery, window);