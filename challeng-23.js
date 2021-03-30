(function(win, doc) {

  'use strict';

  /*
  Vamos desenvolver mais um projeto. A ideia é fazer uma mini-calculadora.
  As regras são:
  - Deve ter somente 1 input, mas não deve ser possível entrar dados nesse input
  diretamente;
  - O input deve iniciar com valor zero;
  - Deve haver 10 botões para os números de 0 a 9. Cada botão deve ser um número;
  - Deve haver 4 botões para as operações principais: soma (+), subtração(-),
  multiplicação(x) e divisão(÷);
  - Deve haver um botão de "igual" (=) que irá calcular os valores e um botão "CE"
  que irá limpar o input, deixando-o com valor 0;
  - A cada número pressionado, o input deve atualizar concatenando cada valor
  digitado, como em uma calculadora real;
  - Ao pressionar um botão com uma das 4 operações, deve aparecer o símbolo da
  operação no input. Se o último caractere no input já for um símbolo de alguma
  operação, esse caractere deve ser substituído pelo último pressionado.
  Exemplo:
  - Se o input tem os valores: "1+2+", e for pressionado o botão de
  multiplicação (x), então no input deve aparecer "1+2x".
  - Ao pressionar o botão de igual, o resultado do cálculo deve ser mostrado no
  input;
  - Ao pressionar o botão "CE", o input deve ficar zerado.
  */

  var $display = doc.querySelector('[data-js=display]');
  var $btnCE = doc.querySelector('[data-js=btnCE]');
  var $btnOperators = doc.querySelectorAll('button[data-js=btnOperator]');
  var $btnNumbers = doc.querySelectorAll('button[data-js=btnNumber]');

  $display.value = 0;
  $display.disabled = true;

  var objBtnOperator = {};
  var arrSignal = ['+', '-', '÷', '×'];

  // Object of elements of operators buttons.
  objBtnOperator['+'] = $btnOperators[0];
  objBtnOperator['-'] = $btnOperators[1];
  objBtnOperator['÷'] = $btnOperators[2];
  objBtnOperator['×'] = $btnOperators[3];
  objBtnOperator['='] = $btnOperators[4];

  /******************
    Listener Event.
  *******************/

  /* Button CE */
  $btnCE.addEventListener('click', handlerClickCE, false);

  /* Buttons of numbers */
  Array.prototype.forEach.call($btnNumbers, function(btn) {
    btn.addEventListener('click', setNumberDisplay, false);
  });

  /* Buttons of operatoration */

  // Signal sum.
  objBtnOperator[arrSignal[0]].addEventListener('click', function() {
    setSignalDisplay(objBtnOperator[arrSignal[0]]);
  }, false);
  // Signal subtraction.
  objBtnOperator[arrSignal[1]].addEventListener('click', function() {
    setSignalDisplay(objBtnOperator[arrSignal[1]]);
  }, false);
  // Signal multiplication.
  objBtnOperator[arrSignal[2]].addEventListener('click', function() {
    setSignalDisplay(objBtnOperator[arrSignal[2]]);
  }, false);
  // Signal division.
  objBtnOperator[arrSignal[3]].addEventListener('click', function() {
    setSignalDisplay(objBtnOperator[arrSignal[3]]);
  }, false);

  // Signal equal.
  objBtnOperator['='].addEventListener('click', equal, false);

  /*******************
    List of Function
  ********************/

  // Function what restart the display.
  function handlerClickCE(evt) {
    $display.value = 0;
  }

  // Function what verific if exist signal in string end.
  function existSignalLastStr() {
    var lastChar = $display.value;

    for(var key in objBtnOperator) {
      if(lastChar.charAt(lastChar.length - 1) === key) {
        return true;
      }
    }
    return false;
  }

  // Function what valid if exist signal in start of string.
  function verifyFirstCharOfStr() {
    return $display.value === '0' || $display.value === arrSignal[2] || $display.value === arrSignal[3];
  }

  // Function what set number in display.
  function setNumberDisplay() {
    if(verifyFirstCharOfStr()) {
      $display.value = this.innerHTML;
    } else {
      $display.value += this.innerHTML;
    }
  }

  // Function what set signal in display.
  function setSignalDisplay(objBtnOperator) {
    var op = objBtnOperator.innerHTML;
    var display = $display.value;
    if(!existSignalLastStr()){
      if(display === '0')
        $display.value = op;
      else
        $display.value += op;
    } else {
      $display.value = display.replace(/\D$/, op);
    }
  }

  // Funtion what calculate the operation.
  function equal() {
    if(!existSignalLastStr()) {

      // Value str is input.
      var str = $display.value;

      var textOfDisplay;
      var idSetTimeout;

      // Regex for transform each char in index of an Array
      var regex = /\D|\d+(?:\.\d+)?/g;

      // Array of char.
      var arrStr = str.match(regex);

      var index = 0;
      var mult, div, sum, sub;
      var regexSignal;

      function calculus() {

        var start = 0;
        if(arrStr[0] === '-' || arrStr[0] === '+') {
          start = 1;
        }

        if(arrStr.indexOf(arrSignal[3]) !== -1) {
          index = arrStr.indexOf(arrSignal[3]);

          if(arrStr[0] !== arrSignal[1]) {
            mult = (+arrStr[index - 1]) * (+arrStr[index + 1]);

          } else {
            mult = -(+arrStr[index - 1]) * (+arrStr[index + 1]);
          }

          regexSignal = new RegExp('(?:^[-+])?\\d+(?:\\.\\d+)?\\'+ arrSignal[3] +'\\d+(?:\\.\\d+)?');
          //$display.value = $display.value.replace(regexSignal, mult);

          textOfDisplay = arrStr.join('').replace(regexSignal, mult);
          arrStr = textOfDisplay.match(regex);

          idSetTimeout = win.setTimeout(calculus);

          if(!regexSignal.test(textOfDisplay)) {
            $display.value = textOfDisplay;
            win.clearTimeout(idSetTimeout);
          }
        }

        if(arrStr.indexOf(arrSignal[2]) !== -1) {
          index = arrStr.indexOf(arrSignal[2]);

          if(arrStr[0] !== arrSignal[1]) {
            div = (+arrStr[index - 1]) / (+arrStr[index + 1]);

          } else {
            div = -(+arrStr[index - 1]) / (+arrStr[index + 1]);
          }

          regexSignal = new RegExp('(?:^[-+])?\\d+(?:\\.\\d+)?\\'+ arrSignal[2] +'\\d+(?:\\.\\d+)?');
          //$display.value = $display.value.replace(regexSignal, div);

          textOfDisplay = arrStr.join('').replace(regexSignal, div);
          arrStr = textOfDisplay.match(regex);

          idSetTimeout = win.setTimeout(calculus);

          if(!regexSignal.test(textOfDisplay)) {
            $display.value = textOfDisplay;
            win.clearTimeout(idSetTimeout);
          }

        }

        // if(str.indexOf(arrSignal[3]) === -1 && str.indexOf(arrSignal[2]) === -1) {

        // }

        if(arrStr.indexOf(arrSignal[0]) !== -1) {
          index = arrStr.indexOf(arrSignal[0], start);

          if(arrStr[0] !== arrSignal[1]) {
            sum = (+arrStr[index - 1]) + (+arrStr[index + 1]);

          } else {
            sum = -(+arrStr[index - 1]) + (+arrStr[index + 1]);
          }

          regexSignal = new RegExp('(?:^[-+])?\\d+(?:\\.\\d+)?\\'+ arrSignal[0] +'\\d+(?:\\.\\d+)?');
          //$display.value = $display.value.replace(regexSignal, sum);

          textOfDisplay = arrStr.join('').replace(regexSignal, sum);
          arrStr = textOfDisplay.match(regex);

          idSetTimeout = win.setTimeout(calculus);

          if(!regexSignal.test(textOfDisplay)) {
            $display.value = textOfDisplay;
            win.clearTimeout(idSetTimeout);
          }

          // str = $display.value;
          // arrStr = str.match(regex);
        }

        if(arrStr.indexOf(arrSignal[1]) !== -1) {
          index = arrStr.indexOf(arrSignal[1], start);

          if(arrStr[0] !== arrSignal[1]) {
            sub = (+arrStr[index - 1]) - (+arrStr[index + 1]);

          } else {
            sub = -(+arrStr[index - 1]) - (+arrStr[index + 1]);
          }

          regexSignal = new RegExp('(?:^[-+])?\\d+(?:\\.\\d+)?\\'+ arrSignal[1] +'\\d+(?:\\.\\d+)?');
          //$display.value = $display.value.replace(regexSignal, sub);

          textOfDisplay = arrStr.join('').replace(regexSignal, sub);
          arrStr = textOfDisplay.match(regex);

          idSetTimeout = win.setTimeout(calculus);

          if(!regexSignal.test(textOfDisplay)) {
            $display.value = textOfDisplay;
            win.clearTimeout(idSetTimeout);
          }

          // str = $display.value;
          // arrStr = str.match(regex);
        }
      }
      calculus();
    }
  }

  // Function what apply the rules of signal.(function inative)
  function rulesOfSignals() {
    var str = $display.value;
    var arrGroupedSignals = str.match(/(?:\+\-)|(?:\-\+)|(?:\-\-)|(?:\+\+)/);
    var groupedSignals = arrGroupedSignals ? arrGroupedSignals[0] : arrGroupedSignals;

    switch(groupedSignals) {
      case '+-':
        $display.value = $display.value.replace('+-', '-');
        return;
      case '-+':
        $display.value = $display.value.replace('-+', '-');
        return;
      case '--':
        $display.value = $display.value.replace('--', '+');
        return;
      case '++':
        $display.value = $display.value.replace('++', '+');
        return;
      default:
        return;
    }
  }

})(window, document);
