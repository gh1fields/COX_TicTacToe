/* Cox Tic-Tac-Toe Test - Tic-Tac-Toe - Core Javascript Functions - v1.0
 * Adam Fields - Interactive Technology Consultant, Senior UX Dev
 * Copyright (c) 2014 Adam Fields, http://www.adam-fields.com
 * Contact: adamUNDERSCOREfieldsATmacDOTcom
*/

// Initialize global variables
var sqr1 = $("img#sq1").data(),
    sqr2 = $("img#sq2").data(),
    sqr3 = $("img#sq3").data(),
    sqr4 = $("img#sq4").data(),
    sqr5 = $("img#sq5").data(),
    sqr6 = $("img#sq6").data(),
    sqr7 = $("img#sq7").data(),
    sqr8 = $("img#sq8").data(),
    sqr9 = $("img#sq9").data(),
    numX = 1,
    numO = 1,
    difficulty = 1,
    myWins = 0,
    compWins = 0,
    strikeItem = "";

// Initialize button functionality
$('#buttonRow a#easy').click(function() {
	difficulty = 1;
    $('#buttonRow a').removeClass('active');
    $(this).addClass('active');
});
$('#buttonRow a#hard').click(function() {
	difficulty = 2;
    $('#buttonRow a').removeClass('active');
    $(this).addClass('active');
});
$('#buttonRow a#reset').click(function() {
	reset();
});

// User turn with binding and click functionality
function chooseX() {
    $('#XandO img').bind("click");
    $('#XandO img').click(function() {
    	if($(this).data('state') == 'N') {
            $(this).attr('src','img/TTT_X'+numX+'.gif');
            $(this).data('state','X');
            $(this).css('cursor','default');
            $(this).attr('title','');
            numX++;
            $('#XandO img').unbind("click"); // Allow only one choice per turn
            setTimeout(function(){threeInARow('X')},1500);
    	}
    });
}
// Enable user's turn on page load
chooseX();

// Check for win, draw, and next turn
function threeInARow(XorO) {
    var winner = XorO + XorO + XorO;
    if( sqr1.state + sqr2.state + sqr3.state == winner ||
        sqr1.state + sqr4.state + sqr7.state == winner ||
        sqr1.state + sqr5.state + sqr9.state == winner ||
        sqr2.state + sqr5.state + sqr8.state == winner ||
        sqr3.state + sqr6.state + sqr9.state == winner ||
        sqr3.state + sqr5.state + sqr7.state == winner ||
        sqr4.state + sqr5.state + sqr6.state == winner ||
        sqr7.state + sqr8.state + sqr9.state == winner ) {
        if(XorO == "X") {
            striker("X");
            scoreKeeper("X");
            updateMessage('UserWins');
            return true;
        } else {
            striker("O");
            scoreKeeper("O");
            updateMessage('CompWins');
            return true;
        }
    }
    if(numX + numO == 11) {
        $("#strike_Draw").fadeIn();
        strikeItem = "Draw";
        updateMessage('NoWins');
        return true;
    }
    else if(XorO == "X") {
        updateMessage('CompTurn');
        computersTurn();
        return true;
    } else {
        updateMessage('UserTurn');
        chooseX();
        return true;
    }
}

// Play offense, then defense, then if no jeopardy move based on Difficulty setting and opponents choices
function computersTurn() {
    var proceed = 1;
    for(var pass = 1; pass < 3; pass++) { // Offense first pass & defense second pass
        if(pass == 1) { checking = "OO"; }
        else { checking = "XX"; }
        if(     sqr1.state + sqr2.state == checking && sqr3.state == "N") { setO(3); proceed = 0; break; }
        else if(sqr1.state + sqr3.state == checking && sqr2.state == "N") { setO(2); proceed = 0; break; }
        else if(sqr1.state + sqr4.state == checking && sqr7.state == "N") { setO(7); proceed = 0; break; }
        else if(sqr1.state + sqr5.state == checking && sqr9.state == "N") { setO(9); proceed = 0; break; }
        else if(sqr1.state + sqr7.state == checking && sqr4.state == "N") { setO(4); proceed = 0; break; }
        else if(sqr1.state + sqr9.state == checking && sqr5.state == "N") { setO(5); proceed = 0; break; }
        else if(sqr2.state + sqr5.state == checking && sqr8.state == "N") { setO(8); proceed = 0; break; }
        else if(sqr2.state + sqr8.state == checking && sqr5.state == "N") { setO(5); proceed = 0; break; }
        else if(sqr3.state + sqr2.state == checking && sqr1.state == "N") { setO(1); proceed = 0; break; }
        else if(sqr3.state + sqr5.state == checking && sqr7.state == "N") { setO(7); proceed = 0; break; }
        else if(sqr3.state + sqr6.state == checking && sqr9.state == "N") { setO(9); proceed = 0; break; }
        else if(sqr3.state + sqr7.state == checking && sqr5.state == "N") { setO(5); proceed = 0; break; }
        else if(sqr3.state + sqr9.state == checking && sqr6.state == "N") { setO(6); proceed = 0; break; }
        else if(sqr4.state + sqr5.state == checking && sqr6.state == "N") { setO(6); proceed = 0; break; }
        else if(sqr4.state + sqr6.state == checking && sqr5.state == "N") { setO(5); proceed = 0; break; }
        else if(sqr4.state + sqr7.state == checking && sqr1.state == "N") { setO(1); proceed = 0; break; }
        else if(sqr5.state + sqr6.state == checking && sqr4.state == "N") { setO(4); proceed = 0; break; }
        else if(sqr5.state + sqr8.state == checking && sqr2.state == "N") { setO(2); proceed = 0; break; }
        else if(sqr5.state + sqr7.state == checking && sqr3.state == "N") { setO(3); proceed = 0; break; }
        else if(sqr5.state + sqr8.state == checking && sqr2.state == "N") { setO(2); proceed = 0; break; }
        else if(sqr5.state + sqr9.state == checking && sqr1.state == "N") { setO(1); proceed = 0; break; }
        else if(sqr6.state + sqr9.state == checking && sqr3.state == "N") { setO(3); proceed = 0; break; }
        else if(sqr7.state + sqr8.state == checking && sqr9.state == "N") { setO(9); proceed = 0; break; }
        else if(sqr7.state + sqr9.state == checking && sqr8.state == "N") { setO(8); proceed = 0; break; }
        else if(sqr8.state + sqr9.state == checking && sqr7.state == "N") { setO(7); proceed = 0; break; }
    }
    if(proceed && difficulty == 1) {
        if(     sqr5.state == "N") { setO(5); }
        else if(sqr6.state == "N") { setO(6); }
        else if(sqr4.state == "N") { setO(4); }
        else if(sqr2.state == "N") { setO(2); }
        else if(sqr8.state == "N") { setO(8); }
        else if(sqr1.state == "N") { setO(1); }
        else if(sqr9.state == "N") { setO(9); }
        else if(sqr3.state == "N") { setO(3); }
        else if(sqr7.state == "N") { setO(7); }
    }
    if(proceed && difficulty == 2) {
        if(     numX == 3 && sqr1.state == "X" && sqr8.state == "X") { setO(7); }
        else if(numX == 3 && sqr1.state == "X" && sqr6.state == "X") { setO(3); }
        else if(numX == 3 && sqr3.state == "X" && sqr4.state == "X") { setO(1); }
        else if(numX == 3 && sqr3.state == "X" && sqr8.state == "X") { setO(9); }
        else if(numX == 3 && sqr9.state == "X" && sqr4.state == "X") { setO(7); }
        else if(numX == 3 && sqr9.state == "X" && sqr2.state == "X") { setO(3); }
        else if(numX == 3 && sqr7.state == "X" && sqr2.state == "X") { setO(1); }
        else if(numX == 3 && sqr7.state == "X" && sqr6.state == "X") { setO(9); }
        else if(numX == 3 && sqr2.state == "X" && sqr4.state == "X") { setO(1); }
        else if(numX == 3 && sqr2.state == "X" && sqr6.state == "X") { setO(3); }
        else if(numX == 3 && sqr8.state == "X" && sqr4.state == "X") { setO(7); }
        else if(numX == 3 && sqr8.state == "X" && sqr6.state == "X") { setO(9);
        } else if(sqr5.state == "X") {
            if(     sqr1.state == "N") { setO(1); }
            else if(sqr9.state == "N") { setO(9); }
            else if(sqr3.state == "N") { setO(3); }
            else if(sqr7.state == "N") { setO(7); }
            else if(sqr6.state == "N") { setO(6); }
            else if(sqr4.state == "N") { setO(4); }
            else if(sqr2.state == "N") { setO(2); }
            else if(sqr8.state == "N") { setO(8); }
        } else if(sqr2.state == "X" || sqr4.state == "X" || sqr6.state == "X" || sqr8.state == "X") {
            if(     sqr5.state == "N") { setO(5); }
            else if(sqr1.state == "N") { setO(1); }
            else if(sqr9.state == "N") { setO(9); }
            else if(sqr3.state == "N") { setO(3); }
            else if(sqr7.state == "N") { setO(7); }
            else if(sqr6.state == "N") { setO(6); }
            else if(sqr4.state == "N") { setO(4); }
            else if(sqr2.state == "N") { setO(2); }
            else if(sqr8.state == "N") { setO(8); }
        } else {
            if(     sqr5.state == "N") { setO(5); }
            else if(sqr6.state == "N") { setO(6); }
            else if(sqr4.state == "N") { setO(4); }
            else if(sqr2.state == "N") { setO(2); }
            else if(sqr8.state == "N") { setO(8); }
            else if(sqr1.state == "N") { setO(1); }
            else if(sqr9.state == "N") { setO(9); }
            else if(sqr3.state == "N") { setO(3); }
            else if(sqr7.state == "N") { setO(7); }
        }
    }
}

// Place "O" in pre-selected area
function setO(num) {
    $("img#sq"+num).attr('src','img/TTT_O'+numO+'.gif');
    $("img#sq"+num).data('state','O');
    $("img#sq"+num).css('cursor','default');
    $("img#sq"+num).attr('title','');
    numO++;
    setTimeout(function(){threeInARow('O')},1500);
}

// Place blinking strike-through to indicate win and where
function striker(XorO) {
    var winner = XorO + XorO + XorO;
    if(     sqr1.state + sqr2.state + sqr3.state == winner) { $("#strike_Top").fadeIn().css('display','inline'); strikeItem = "Top"; }
    else if(sqr1.state + sqr4.state + sqr7.state == winner) { $("#strike_Left").fadeIn().css('display','inline'); strikeItem = "Left"; }
    else if(sqr1.state + sqr5.state + sqr9.state == winner) { $("#strike_Diag1").fadeIn().css('display','inline'); strikeItem = "Diag1"; }
    else if(sqr2.state + sqr5.state + sqr8.state == winner) { $("#strike_Center").fadeIn().css('display','inline'); strikeItem = "Center"; }
    else if(sqr3.state + sqr6.state + sqr9.state == winner) { $("#strike_Right").fadeIn().css('display','inline'); strikeItem = "Right"; }
    else if(sqr3.state + sqr5.state + sqr7.state == winner) { $("#strike_Diag2").fadeIn().css('display','inline'); strikeItem = "Diag2"; }
    else if(sqr4.state + sqr5.state + sqr6.state == winner) { $("#strike_Middle").fadeIn().css('display','inline'); strikeItem = "Middle"; }
    else if(sqr7.state + sqr8.state + sqr9.state == winner) { $("#strike_Bottom").fadeIn().css('display','inline'); strikeItem = "Bottom"; }
}

// Maintain scoreboard stats
function scoreKeeper(winner) {
    if(winner == "X") {
        myWins++;
        $('#scoreBoard span#myScore').html(myWins);
    }
    else {
        compWins++;
        $('#scoreBoard span#compScore').html(compWins);
    }
}

// Reset all parameters except the score and difficulty setting
function reset() {
    $('#XandO img').attr('src','img/TTT_N.gif');
    $('#XandO img').data('state','N');
    $('#XandO img').css('cursor','pointer');
    $('#XandO img').attr('title','Click here to place your X');
    numX = 1;
    numO = 1;
    $("#strike_"+strikeItem).hide();
    updateMessage('NewGame');
    chooseX();
}

// User feedback in message area based on game play
function updateMessage(keywords) {
    switch(keywords) {
        case "UserTurn":
            $('#messageArea span#title').html("It's Your Turn!");
            $('#messageArea span#body').html("Look sharp and make a<br />good choice. Good Luck!");
            break;
        case "CompTurn":
            $('#messageArea span#title').html("It's My Turn!");
            $('#messageArea span#body').html("Let me see what you've<br />done here. I see a move!");
            break;
        case "UserWins":
            $('#messageArea span#title').html("You're the Winner!");
            $('#messageArea span#body').html("You're score has been updated.<br />Select \"New Game\" button.");
            break;
        case "CompWins":
            $('#messageArea span#title').html("The Computer Wins!");
            $('#messageArea span#body').html("My score has been updated.<br />Select \"New Game\" button.");
            break;
        case "NoWins":
            $('#messageArea span#title').html("Nobody Won This Round!");
            $('#messageArea span#body').html("Good luck next time.<br />Select \"New Game\" button.");
            break;
        case "NewGame":
            $('#messageArea span#title').html("Let's Play Again!");
            $('#messageArea span#body').html("Good luck beating me<br />this time. Choose Wisely!");
            break;
        default:
            break;
   }
}
