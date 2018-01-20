// deck of all cards
const deck = document.getElementById("card-deck");

// array named card to hold cards
let card = document.getElementsByClassName("card");
let cards = [...card]
console.log(cards);

// modal
let modal = document.getElementById("popup1")

// variables for star icons
const stars = document.querySelectorAll(".fa-star");

// move variable
let moves = 0;
let counter = document.querySelector(".moves");

 // list of stars
 let starsList = document.querySelectorAll(".stars li");

 // variable for cards matched
 let cardmatched = document.getElementsByClassName("match");

 // array for opened cards
var cardopened = [];

//  function for shuffling cards
function shuffle(array) {
    var current = array.length, temp, random;

    while (current !== 0) {
        random = Math.floor(Math.random() * current);
        current -= 1;
        temp = array[current];
        array[current] = array[random];
        array[random] = temp;
    }

    return array;
};

//  shuffles cards when page is refreshed / loads
document.body.onload =
swal({
		closeOnEsc: false,
	  closeOnClickOutside: false,
		title: 'Ready to play ?',
		text: "click OK to Play",
		button: true,
		confirmButtonText: 'Yes,Play Game!'
	}).then(function (isConfirm) {
		if (isConfirm) {
      gamestart();
		}
	});


//  function to start a new game
function gamestart(){
    // shuffle deck
    cards = shuffle(cards);
    // remove all exisiting classes from each card
    for (var i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
    // reset moves
    moves = 0;
    counter.innerHTML = moves;
    // reset rating
    for (var i= 0; i < stars.length; i++){
        stars[i].style.color = "#FFD700";
        stars[i].style.visibility = "visible";
    }
    //reset timer
    sec = 0;
    min = 0;
    hr = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
}


//  toggles open and show class to display cards
var displayCard = function (){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};


//  add opened cards to cardopened list and check if cards are match or not
function cardopen() {
    cardopened.push(this);
    var len = cardopened.length;
    if(len === 2){
        moveCounter();
        if(cardopened[0].type === cardopened[1].type){
            matched();
        } else {
            unmatched();
        }
    }
};


//  when cards match
function matched(){
    cardopened[0].classList.add("match", "disabled");
    cardopened[1].classList.add("match", "disabled");
    cardopened[0].classList.remove("show", "open", "no-event");
    cardopened[1].classList.remove("show", "open", "no-event");
    cardopened = [];
}


// description when cards don't match
function unmatched(){
    cardopened[0].classList.add("unmatched");
    cardopened[1].classList.add("unmatched");
    disable();
    setTimeout(function(){
        cardopened[0].classList.remove("show", "open", "no-event","unmatched");
        cardopened[1].classList.remove("show", "open", "no-event","unmatched");
        enable();
        cardopened = [];
    },1100);
}


//  disable cards temporarily
function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}


//  enable cards and disable matched cards
function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(var i = 0; i < cardmatched.length; i++){
            cardmatched[i].classList.add("disabled");
        }
    });
}


//  count player's moves
function moveCounter(){
    moves++;
    counter.innerHTML = moves;
    //start timer on first click
    if(moves == 1){
        sec = 0;
        min = 0;
        hr = 0;
        startTimer();
    }
    // setting rates based on moves
    if (moves > 8 && moves < 12){
        for( i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 13){
        for( i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "collapse";
            }
        }
    }
}


// timer
var sec = 0, min = 0; hr = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = min+"mins "+sec+"secs";
        sec++;
        if(sec == 60){
            min++;
            sec=0;
        }
        if(min == 60){
            hr++;
            min = 0;
        }
    },1000);
}


// modal when all cards are matched
function congratulations(){
    if (cardmatched.length == 16){
        clearInterval(interval);
        finalTime = timer.innerHTML;

        // show modal
        modal.classList.add("show");

        // rating variable
        var rating = document.querySelector(".stars").innerHTML;

        //display move, rating, time on modal
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("rating").innerHTML = rating;
        document.getElementById("totalTime").innerHTML = finalTime;
      };
}


// play Again
function playAgain(){
    modal.classList.remove("show");
    gamestart();
}


// loop to add event listeners to each card
for (var i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardopen);
    card.addEventListener("click",congratulations);
};
