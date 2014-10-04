/*
unit tests for the snake game using Qunit library.
unit tests test the javascript ko mvvm scripts.
*/
(function ($, global) {
	QUnit.test("snakegame basics", function (assert) {
		var controller = new Exp.KonckoutControllers.SnakeLadderGameController(100,
			 [new Exp.AppModels.Constraint(5, 30, false),
				 Exp.AppModels.Constraint(35, 6, false)],
			 [new Exp.AppModels.Player('srini', 1),
				 new Exp.AppModels.Player('srini2', 2)]);

		assert.equal(controller.players().length, 2);
		assert.equal(controller.sqaures().length, 100);

		// start the game.
		controller.startGame();
		// check the current player.
		var currPlayer = controller.currentPlayer();
		assert.equal(currPlayer.name() == 'srini', true);

		// check old index.
		var oldIndex = currPlayer.index();

		// roll the dice.
		controller.rollDice();

		// check the rolled player index after dice rolling.
		var koPlayer = Exp.KonckoutUtilities.GetKoPlayer(controller.players, ko.toJS(currPlayer));

		// check new index.
		var newIndex = koPlayer.index();

		assert.notEqual(newIndex, oldIndex);

		// after dice check the index.
		currPlayer = controller.currentPlayer();
		assert.equal(currPlayer.name() == 'srini2', true);
	});
	QUnit.test("snakegame full game with three players two ladders one snake", function (assert) {
		var controller = new Exp.KonckoutControllers.SnakeLadderGameController(100,
			[new Exp.AppModels.Constraint(5, 30, false),
				Exp.AppModels.Constraint(35, 96, false),
				Exp.AppModels.Constraint(39, 1, true)],
			[new Exp.AppModels.Player('srini', 1, 'red'),
				new Exp.AppModels.Player('srini2', 2, 'green'),
			new Exp.AppModels.Player('srini3', 3)]);

		assert.equal(controller.players().length, 3);
		assert.equal(controller.sqaures().length, 100);

		// start the game.
		controller.startGame();
		while (controller.winner() == null) {
			// roll the dice.
			controller.rollDice();
		};

		// display results.
		var str = ("winner name:" + controller.winner().name() + "\n");
		str += ("winner trails:" + controller.winner().trials() + "\n");
		str += ("winner bites:" + controller.winner().bites() + "\n");
		str += ("winner jumps:" + controller.winner().jumps() + "\n");
		str += "moves: [";
		$.each(controller.winner().moves(), function (i, val) {
			str += val().source() + "-" + val().destination();
		});
		str += "]";
		assert.equal(controller.winner() != null, true, str);
	});
})(jQuery, window);