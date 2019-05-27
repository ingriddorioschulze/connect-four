(function() {
    var currentPlayer = "player1";

    $(".column").on("click", function(e) {
        function switchPlayers() {
            if (currentPlayer == "player1") {
                $(document.body)
                    .removeClass("body-player-1")
                    .addClass("body-player-2");

                currentPlayer = "player2";
            } else {
                $(document.body)
                    .addClass("body-player-1")
                    .removeClass("body-player-2");

                currentPlayer = "player1";
            }
        }
        var slotsInColumn = $(e.currentTarget).find(".slot");
        for (var i = 5; i >= 0; i--) {
            if (
                !slotsInColumn.eq(i).hasClass("player1") &&
                !slotsInColumn.eq(i).hasClass("player2")
            ) {
                slotsInColumn.eq(i).addClass(currentPlayer);
                if (checkForVictory(slotsInColumn)) {
                    return showVictoryMessage();
                } else if (checkForVictory($(".row" + (i + 1)))) {
                    return showVictoryMessage();
                } else {
                    var classList = slotsInColumn.get(i).classList;
                    for (var i = 0; i < classList.length; i++) {
                        if (classList[i].indexOf("diag") === 0) {
                            if (checkForVictory($("." + classList[i]))) {
                                showVictoryMessage();
                                break;
                            }
                        }
                    }
                }
                switchPlayers();
                break;
            }
        }
    });

    function checkForVictory(slots) {
        var string = "";
        for (var i = 0; i < slots.length; i++) {
            if (slots.eq(i).hasClass(currentPlayer)) {
                string += "v";
            } else {
                string += "l";
            }
        }
        if (string.indexOf("vvvv") > -1) {
            return true;
        }
    }

    function showVictoryMessage() {
        $(".victory").css("visibility", "visible");
        $(".victory-message")
            .addClass("victory-message-final")
            .addClass(currentPlayer);
        offGame();
    }

    function offGame() {
        $(".column").off();
    }

    $(".play-again-button").on("click", function() {
        location.reload();
    });
})();
