const app = {};
app.previousNumber = '0';
app.currentNumber = '0';
app.totalNumber = '0';
app.previousOperator;
app.currentOperator;
app.operators = ['divide', 'multiply', 'subtract', 'plus'];
app.operating = false;
app.display = 0;

// cached selectors
app.$button = $('[class*="-button"]');
app.$display = $('.display');
app.$totalContainer = $('.total-container');
app.$clearButton = $('.clear-container');

app.getButtonPush = () => {
  app.$button.on('click', function() {
    let number;
    if ($(this).hasClass( "number-button" )) {
      number = parseFloat($(this).text()).toString();
      if (app.operating === false) {
        app.totalNumber = '0';
        app.previousNumber = '0';
        app.previousOperator = 'none';
        app.currentOperator = 'none';
      }
      if (app.currentNumber == '0') {
        app.currentNumber = number;
      } else {
        app.currentNumber += number;
      }
      app.$display.text(app.currentNumber);
      console.log('number', app.totalNumber, app.previousNumber, app.currentNumber);
    }
    if ($(this).hasClass( "operator-button" )) {
      if (app.operating === true) {
        app.previousOperator = app.currentOperator;
        app.previousNumber = app.equals(app.previousOperator);
        app.currentOperator = app.operators[$(this).attr('value')];
        app.currentNumber = '0';
      } else {
        app.previousNumber = app.currentNumber;
        app.currentNumber = '0';
        app.currentOperator = app.operators[$(this).attr('value')];
      }  
      app.operating = true;
      console.log('operating', app.totalNumber, app.previousNumber, app.currentNumber);
    }
    if ($(this).hasClass( "equals-button" )) {
      app.operating = false;
      app.totalNumber = app.equals(app.currentOperator);
      app.currentNumber = '0';
      app.$display.text(app.totalNumber);
      console.log('equal', app.totalNumber, app.previousNumber, app.currentNumber);
    }
    if ($(this).hasClass( "decimal-button" )) {
      if (app.currentNumber.indexOf('.') == -1) {
        app.currentNumber += '.';
        app.$display.text(app.currentNumber);
      }
    }
    app.checkDisplayLength();
  });
}

app.equals = (operator) => {
  let baseNumber;
  let secondNumber;
  if (app.operating === true) {
    baseNumber = parseFloat(app.previousNumber);
    secondNumber = parseFloat(app.currentNumber);
  } else if (app.totalNumber !== '0') {
    baseNumber = parseFloat(app.totalNumber);
    if (app.currentNumber == '0') {
      secondNumber = parseFloat(app.previousNumber);
    } else {
      secondNumber = parseFloat(app.currentNumber);
      app.previousNumber = app.currentNumber;
    }
  } else {
    baseNumber = parseFloat(app.previousNumber);
    secondNumber = parseFloat(app.currentNumber);
    app.previousNumber = app.currentNumber;
  }
  switch(operator) {
    case 'divide' :
      return (baseNumber / secondNumber).toString();
    case 'multiply' :
      return (baseNumber * secondNumber).toString();
    case 'subtract' :
      return (baseNumber - secondNumber).toString();
    case 'plus' : 
      return (baseNumber + secondNumber).toString();
    default :
      console.log('error');
  }
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
    if (app.currentNumber === '0') {
      app.previousNumber = '0';
      app.totalNumber = '0';
      app.previousOperator = 'none';
      app.currentOperator = 'none';
    } else {
      app.currentNumber = '0';
    }
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