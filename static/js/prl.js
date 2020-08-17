function startGame() {
  $('.card-inst-prl').show();
  $("#dialogArea").hide();
  $("#endStroop").hide();
  $('.cards').hide();
  // $(".err").show();

  let s = new Stroop(80, 'game');
  // $("button").click(function() {
  //   var e = $(this).val();
  //   s.getResponse(e);
  // });
  $(".word1").click(function() {
    var e = 'l';
    console.log(e)
    s.getResponse(e);
  });
  $(".word2").click(function() {
    var e = 'r';
    console.log(e)
    s.getResponse(e);
  });
  s.start();
}
var path = '../static/img/';
var pathImg1 = path + "224.jpg"
var pathImg2 = path + "223.jpg"

class Stroop {
  constructor(maxCount, testType) {
    this.card1Loc = [0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0,  0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0];
    this.correct1 = [0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1,  0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0];
    this.card2Loc = [1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1,  1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1];
    this.correct2 = [1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0,  1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1];
    
    this.validKeys = ['l', 'r'];
    
    this.gameWords = [
      pathImg1,
      pathImg2
    ]

    this.cardNames = [1, 2];
    this.autoAdvance;

    this.count = 0;
    this.maxCount = maxCount;

    if (testType == 'game') {
      this.cards1 = this.gameWords;
      this.cards2 = this.gameWords;
    }

    this.currentCard1;
    this.currentCard2;

    this.acceptInput;
    this.displayTime;
    this.countCard1 = 0;
    this.countCard2 = 0;

    this.flag = 0;

    this.responses = [];
  }

  start() {
    self = this;
    console.log("PRL is starting");
    self.next();
    setTimeout(function () {
      $('.card-inst-prl').show();
      // $(".btn-keys").show();
      $('.card').show();
    }, 50);
  
  }

  next() {
    // $(".btn-keys").show();
    $('.resultdiv').hide();
   
    this.acceptInput = true;
    if (this.count == this.maxCount)
      this.end();
    self = this;

    this.cardValues1 = this.newCard1();
    this.currentCard1 = this.cardValues1[0];
    this.correctCard1 = this.cardValues1[1];

    this.cardValues2 = this.newCard2();
    this.currentCard2 = this.cardValues2[0];
    this.correctCard2 = this.cardValues2[1];

    this.displayWord();
  }

  getResponse(e) {
    let correct;
    self = this;
    var cardCurrent;
    var loc;

    if (this.validKeys.includes(e) && this.acceptInput) {
      self.flag += 1;
      if (self.flag == 40){
        console.log('Resetting!');
        self.countCard1 = 0;
        self.countCard2 = 0;
      }

      if(e=='l'){
        if(self.flag <= 40){
          if (this.validKeys.indexOf(e) == this.correctCard1) {
            loc = this.currentCard1;
            correct = true;
            cardCurrent = self.cards1[self.currentCard1];
            this.displayCorrect();
            setTimeout(function () {
              self.next();
            }, 800);
            this.newResponse(e, correct, loc, cardCurrent);
          
          }
          else {
            loc = this.currentCard1;
            correct = false;
            this.displayIncorrect();
            this.acceptInput = false;
            cardCurrent = self.cards1[self.currentCard1];
            setTimeout(function () {
              self.next();
            }, 800);
            this.newResponse(e, correct, loc, cardCurrent);
          }
        }
        if(self.flag > 40){
          if (this.validKeys.indexOf(e) == this.correctCard2) {
            correct = true;
            loc = this.currentCard1;
            cardCurrent = self.cards1[self.currentCard1]
            this.displayCorrect();
            setTimeout(function () {
              self.next();
            }, 800);
            this.newResponse(e, correct, loc, cardCurrent);
          }
          else {
            loc = this.currentCard1;
            correct = false;
            cardCurrent = self.cards1[self.currentCard1];
            this.displayIncorrect();
            this.acceptInput = false;
            setTimeout(function () {
              self.next();
            }, 800);
            this.newResponse(e, correct, loc, cardCurrent);
          }
        }
      }

      else if (e =='r'){
        if(self.flag <= 40){
          if (this.validKeys.indexOf(e) == this.correctCard1) {
            loc = this.currentCard1;
            correct = true;
            cardCurrent = self.cards2[this.currentCard2];
            this.displayCorrect();
            setTimeout(function () {
              self.next();
            }, 800);
            this.newResponse(e, correct, loc, cardCurrent);
          
          }
          else {
            loc = this.currentCard1;
            correct = false;
            this.displayIncorrect();
            this.acceptInput = false;
            cardCurrent = self.cards2[self.currentCard2];
            setTimeout(function () {
              self.next();
            }, 800);
            this.newResponse(e, correct, loc, cardCurrent);
          }
        }
        if(self.flag > 40){
          if (this.validKeys.indexOf(e) == this.correctCard2) {
            correct = true;
            loc = this.currentCard1;
            cardCurrent = self.cards2[self.currentCard2];
            this.displayCorrect();
            setTimeout(function () {
              self.next();
            }, 800);
            this.newResponse(e, correct, loc, cardCurrent);
          }
          else {
            loc = this.currentCard1;
            correct = false;
            cardCurrent = self.cards2[self.currentCard2];
            this.displayIncorrect();
            this.acceptInput = false;
            setTimeout(function () {
              self.next();
            }, 800);
            this.newResponse(e, correct, loc, cardCurrent);
          }
        }
      }
    }
  }

  newResponse(key, correct, loc, cardCurrent) {
    var choiceLoc;
    var reward;
    var cardChosen;
    if (key == 'l'){
      choiceLoc = 1
    }
    else{
      choiceLoc = 2
    }
    loc = loc + 1;
    if (correct){
       reward = 1;
    }
    else{
      reward = -1;
    }
    if (cardCurrent === pathImg1){
      cardChosen = 1;
    }
    else if (cardCurrent === pathImg2){
      cardChosen = 2;
    }

    let r = {
      choice: cardChosen,
      outcome: reward,
      reactionTime: new Date().getTime() - this.displayTime,
      keyPressed: key,
      loc: loc,
      choiceLoc: choiceLoc
    }
    this.responses.push(r);
  }

  newCard1() {
    let newCard1 = this.card1Loc[this.countCard1];
    let correctC1 = this.correct1[this.countCard1];
    this.countCard1++;
    return [newCard1,correctC1];
  }

  newCard2() {
    let newCard2 = this.card2Loc[this.countCard2];
    let correctC2 = this.correct2[this.countCard2];
    this.countCard2++;
    return [newCard2,correctC2];
  }

  displayIncorrect() {
    $('.resultdiv').show();
    // $('.err').hide();
    let word = jQuery('.resText');
    word.text('Incorrect').css({ 'color': 'red' });
    // $(".btn-keys").hide();
    $('.cards').hide();
  }

  displayCorrect(){
    $('.resultdiv').show();
    // $('.err').hide();
    let word = jQuery('.resText');
    word.text('Correct').css({ 'color': 'green' });
    // $(".btn-keys").hide();
    $('.cards').hide();
    
  }

  displayWord() {
    this.count++;
    this.displayTime = new Date().getTime();
    let self = this;
    let word1 = $('#Card1');
    let word2 = $('#Card2');
    setTimeout(function () {
      $('#Card1').attr("src",self.cards1[self.currentCard1]);     
      $('#Card2').attr("src",self.cards2[self.currentCard2]);
      $('.cards').show();
      // $('.err').show();
      
    }, 100);
    
  }

  end() {
    let results = JSON.stringify(this.responses);
    $("#prl").hide();
    // $('.btn-keys').hide();
    // $(".err").hide();
    $("#endStroop").show();
    $('.card-inst-prl').hide();
    setValues(results);
    console.log(results);
  }
}
var result_out;

function setValues(res) {
  result_out = res;
}

function con() {
  $.ajax({
    url: "/insert_prl",
    data: result_out,
    type: 'POST',
    contentType: 'application/json;charset=UTF-8',
    dataType: 'jsonp',
    cache: false,
    async:false,
    headers:{
        'cache-control':'no-cache',
        "Access-Control-Allow-Origin":"*"
    },
    success: function (response) {
      var dbData = response.result;
      console.log("Success" + dbData)
    },
    error: function (error) {
      console.log(error);
    }
  });
}
