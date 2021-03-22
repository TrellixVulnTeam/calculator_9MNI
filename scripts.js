const app = {};
app.currentNumber = '0';
app.totalNumber = '0';
app.expression = ``;
app.totalled = false;

// cached selectors
app.$button = $('[class*="-button"]');
app.$display = $('.display');
app.$totalContainer = $('.total-container');
app.$clearButton = $('.clear-container');

app.getButtonPush = () => {
  app.$button.on('click', function() {
    let number;
    let operator;

    if ($(this).hasClass( "number-button" )) {
      if (app.totalled === true) {
        app.currentNumber = '0';
      }
      switch($(this).attr('id')) {
        case "0" :
          number = '0';
          break;
        case "1" :
          number = '1';
          break;
        case "2" :
          number = '2';
          break;
        case "3" :
          number = '3';
          break;
        case "4" :
          number = '4';
          break;
        case "5" :
          number = '5';
          break;
        case "6" :
          number = '6';
          break;
        case "7" :
          number = '7';
          break;
        case "8" :
          number = '8';
          break;
        case "9" :
          number = '9';
          break;
        default :
          console.log('error: button id changed');
      }
      if (app.currentNumber == '0') {
        app.currentNumber = number;
      } else {
        app.currentNumber += number;
      }
      app.$display.text(app.currentNumber);
      console.log(app.expression);
      app.totalled = false;
    }

    if ($(this).hasClass( "operator-button" )) {
      switch($(this).attr('value')) {
        case '+' :
          operator = '+';
          break;
        case '-' :
          operator = '-';
          break;
        case '*' :
          operator = '*';
          break;
        case '/' :
          operator = '/';
          break;
        default :
          console.log('error: operator value changed');
      }
      app.expression += app.currentNumber + operator;
      console.log(app.expression);
      app.currentNumber = '0';

    }

    if ($(this).hasClass( "plus-minus-button" )) {
      if (app.currentNumber != '0') {
        app.currentNumber = eval(app.currentNumber * -1);
        app.$display.text(app.currentNumber);
      } else {
        app.currentNumber = `-`;
      }
    }

    if ($(this).hasClass( "percentage-button" )) {
      app.currentNumber /= 100;
      app.$display.text(app.currentNumber);
    }

    if ($(this).hasClass( "equals-button" )) {
      app.expression += app.currentNumber;
      console.log(app.expression);
      app.$display.text(app.equals());
    }

    if ($(this).hasClass( "decimal-button" )) {
      if (app.currentNumber.indexOf('.') == -1) {
        app.expression += '.';
        app.$display.text(app.currentNumber);
        }
    }
    app.checkDisplayLength();
  });
}

app.equals = () => {
  app.totalled = true;
  app.totalNumber = eval(app.expression);
  app.expression = ``;
  app.currentNumber = `${app.totalNumber}`;
  return app.totalNumber;
}

app.checkDisplayLength = () => {
  if (app.$display.text().length > 10) {
    app.$display.addClass( 'display-size-6' );
    app.$display.removeClass( 'display-size-5' )
  } else if (app.$display.text().length > 9) {
    app.$display.addClass( 'display-size-5' );
    app.$display.removeClass( 'display-size-4' )
  } else if (app.$display.text().length > 8) {
    app.$display.addClass( 'display-size-4' );
    app.$display.removeClass( 'display-size-3' )
  } else if (app.$display.text().length > 7) {
    app.$display.addClass( 'display-size-3' )
    app.$display.removeClass( 'display-size-2' );
  } else if (app.$display.text().length > 6) {
    app.$display.addClass( 'display-size-2' );
  } else {
    app.removeSizeClasses();
  }
}

app.removeSizeClasses = () => {
  app.$display.removeClass( 'display-size-2' );
  app.$display.removeClass( 'display-size-3' );
  app.$display.removeClass( 'display-size-4' );
  app.$display.removeClass( 'display-size-5' );
  app.$display.removeClass( 'display-size-6' );
}

app.clearScreen = () => {
  app.$clearButton.on('click', function() {
    if (app.currentNumber != '0') {
      app.currentNumber = '0';
      app.$display.text(app.currentNumber);
      app.checkDisplayLength();
    } else {
      app.expression = ``;
      app.currentNumber = '0';
      app.$display.text(app.currentNumber);
      app.removeSizeClasses();
    }
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