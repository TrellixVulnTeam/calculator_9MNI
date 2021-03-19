

const app = {};
app.currentNumber = '0';
app.display = 0;

// cached selectors
app.$button = $('[class*="-button"]');
app.$display = $('.display');
app.$totalContainer = $('.total-container');
app.$clearButton = $('.clear-container');

app.getButtonPush = () => {
  app.$button.on('click', function() {
    let number;
    console.log(this);
    if ($(this).hasClass( "number-button" )) {
      number = parseInt($(this).text()).toString();
      if (app.currentNumber == 0) {
        app.currentNumber = number;
      } else {
        app.currentNumber += number;
      }
      app.$display.text(app.currentNumber);
    }
    app.checkDisplayLength();
  });
}

app.checkDisplayLength = () => {
  if (app.currentNumber.length > 8) {
    app.$display.addClass( 'display-size-4' );
  } else if (app.currentNumber.length > 7) {
    app.$display.addClass( 'display-size-3' );
  } else if (app.currentNumber.length > 6) {
    app.$display.addClass( 'display-size-2' );
  } else {
    app.removeSizeClasses();
  }
}

app.removeSizeClasses = () => {
  app.$display.removeClass( 'display-size-2' );
  app.$display.removeClass( 'display-size-3' );
  app.$display.removeClass( 'display-size-4' );
}

app.clearScreen = () => {
  app.$clearButton.on('click', function() {
    app.currentNumber = '0';
    app.$display.text(app.currentNumber);
    app.removeSizeClasses();
  })
}

app.init = () => {
  app.getButtonPush();
  app.checkDisplayLength();
  app.clearScreen();
}

$.ready = () => {
  app.init();
}