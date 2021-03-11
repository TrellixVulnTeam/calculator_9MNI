// add
// subtract
// multiply
// divide
// equals button
// update screen with every button push showing the current number
// clear button clears the screen and current number

const app = {};
app.display = 0;

// cached selectors
app.$button = $('[class*="-button"]');
app.$display = $('.display');
app.$totalContainer = $('.total-container');

app.getNumber = () => {
  app.$button.on('click', function() {
    let display = app.$display.text();
    let number;
    console.log(this);
    if ($(this).hasClass( "number-button" )) {
      number = $(this).text();
      number = parseInt(number);
      if (display == 0) {
        display = number;
      } else {
        display += number;
      }
      app.$display.text(display);
    }
    app.checkDisplayLength();
  });
}

app.checkDisplayLength = () => {
  let displayText = app.$display.text();
  console.log(typeof displayText);
  let number = parseInt(displayText);
  let sequence;

  if (number > 99999999) {
    app.$totalContainer.addClass( 'display-size-4' );
  } else if (number > 9999999) {
    app.$totalContainer.addClass( 'display-size-3' );
  } else if (number > 999999) {
    app.$totalContainer.addClass( 'display-size-2' );
  }

  if (displayText.length > 1 && displayText.length % 3 === 1) {
    displayText = displayText.substring(0, 1) + ',' + displayText.substring(1, displayText.length);
    app.$display.text(displayText);
  }
  
}

app.init = () => {
  app.getNumber();
  app.checkDisplayLength();
}

$.ready = () => {
  app.init();
}