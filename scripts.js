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
  });
}

app.init = () => {
  app.getNumber();
}

$.ready = () => {
  app.init();
}