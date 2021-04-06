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
  var $btnEqual = doc.querySelector('button[data-js=btnEqual]');
  var $btnOperators = doc.querySelectorAll('button[data-js=btnOperator]');
  var $btnNumbers = doc.querySelectorAll('button[data-js=btnNumber]');

  var arrSignal = ['+', '-', '÷', '×'];
  var arrOperators = Array.prototype.map.call($btnOperators, function(btn){
    return btn;
  });

  $display.value = 0;
  $display.disabled = true;

  /******************
    Listener Event.
  *******************/

  /* Button of CE */
  $btnCE.addEventListener('click', handlerClickCE, false);

  /* Buttons of numbers */
  Array.prototype.forEach.call($btnNumbers, function(btn) {
    btn.addEventListener('click', setNumberDisplay, false);
  });

  /* Buttons of operatoration */
  Array.prototype.forEach.call($btnOperators, function(op){
    op.addEventListener('click', setSignalDisplay);
  });

  /* Button of equal */
  $btnEqual.addEventListener('click', equal, false);

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

    return arrOperators.some(function(op){
      return lastChar.charAt(lastChar.length - 1) === op.value;
    });
  }

  // Function what valid if exist only in display.
  function existOnlyZeroInStr() {
    return $display.value === '0';
  }

  // Function what verify if exist zero after of signal.
  function existZeroBefore() {
    var display = $display.value;
    return /[+÷×-]0$/.test(display);
  }

  // Function what set number in display.
  function setNumberDisplay() {
    if(existOnlyZeroInStr())
      $display.value = this.value;
    else if(existZeroBefore())
      $display.value = $display.value.slice(0, -1) + this.value;
    else
      $display.value += this.value;
  }

  // Function what set signal in display.
  function setSignalDisplay() {
    var op = this.value;
    var display = $display.value;

    if(existSignalLastStr())
      $display.value = display.replace(/\D$/, op);
    else
      $display.value += op;
  }

  // Funtion what calculate the operation.
  function equal() {

    if(!existSignalLastStr() && !existZeroInDisplay()) {

      var regex = /\D|\d+(?:\.\d+)?/g;  // Regex to separate each number e char of an string in a Array.
      var str = $display.value;         // Value str is input.
      var arrStr = str.match(regex);    // Array of char.
      var idSetTimeout;                 // Id of function setTimeout.

      calculus();

      function calculus() {

        var regex = /\D|\d+(?:\.\d+)?/g;
        var resultPartOfOperation = 0;
        var indexOfSignal;
        var startIndexSplice, qtsOfItemRemove;
        var signal = orderOfOperationOfSignals(arrStr)[0];
        var idSetTimeout;

        indexOfSignal = orderOfOperationOfSignals(arrStr)[1];

        if(signal === arrSignal[3]){
          if(arrStr[indexOfSignal-2] !== arrSignal[1]) {
            resultPartOfOperation = (+arrStr[indexOfSignal - 1]) * (+arrStr[indexOfSignal + 1]);
          } else {
            resultPartOfOperation = -(+arrStr[indexOfSignal - 1]) * (+arrStr[indexOfSignal + 1]);
          }
        }

        if(signal === arrSignal[2]) {
          if(existDivisionPerZero(arrStr))
            return;
          if(arrStr[indexOfSignal-2] !== arrSignal[1]) {
            resultPartOfOperation = (+arrStr[indexOfSignal - 1]) / (+arrStr[indexOfSignal + 1]);
          } else {
            resultPartOfOperation = -(+arrStr[indexOfSignal - 1]) / (+arrStr[indexOfSignal + 1]);
          }
        }

        if(signal === arrSignal[1]){
          if(arrStr[indexOfSignal-2] !== arrSignal[1]) {
            resultPartOfOperation = (+arrStr[indexOfSignal - 1]) - (+arrStr[indexOfSignal + 1]);
          } else {
            resultPartOfOperation = -(+arrStr[indexOfSignal - 1]) - (+arrStr[indexOfSignal + 1]);
          }
        }

        if(signal === arrSignal[0]){
          if(arrStr[indexOfSignal-2] !== arrSignal[1]) {
            resultPartOfOperation = (+arrStr[indexOfSignal - 1]) + (+arrStr[indexOfSignal + 1]);
          } else {
            resultPartOfOperation = -(+arrStr[indexOfSignal - 1]) + (+arrStr[indexOfSignal + 1]);
          }
        }

        if(arrStr[indexOfSignal - 2] === arrSignal[1]) {
          startIndexSplice = indexOfSignal - 2;
          qtsOfItemRemove = 4;
        } else {
          startIndexSplice = arrStr.indexOf(signal) - 1;
          qtsOfItemRemove = 3
        }

        var arrArg = [startIndexSplice, qtsOfItemRemove].concat(resultPartOfOperation.toString().match(regex));
        Array.prototype.splice.apply(arrStr, arrArg);

        idSetTimeout = win.setTimeout(calculus);

        // if length of arrStr go menor que 2 acabo a operation.
        if(arrStr.length <= 2) {
          $display.value = arrStr.join('');
          win.clearTimeout(idSetTimeout);
        }
      }
    }
  }
  // Function what verify if exist division per zero.
  function existDivisionPerZero(arrStr) {
    var signal = arrStr.indexOf('÷');

    if(signal !== -1) {
      if(arrStr[signal + 1] === '0' && arrStr[signal - 1] !== '0') {
        $display.value = 'Não é possível dividir por zero';
        return true;
      } else if(arrStr[signal + 1] === '0' && arrStr[signal - 1] === '0') {
        $display.value = 'Resultado indefinido';
        return true;
      }
    }
    return false;
  }

  function orderOfOperationOfSignals(arrStr) {
    var start = 0;
    var mult, sum, sub, div;

    if(arrStr[0] === '-') {
      start = 1;
    }

    sum = arrStr.indexOf('+', start);
    sub = arrStr.indexOf('-', start);
    mult = arrStr.indexOf('×');
    div = arrStr.indexOf('÷');

    if(div !== -1 && mult !== -1) {
      if(div < mult) {
        return [arrStr[div], div];
      } else {
        return [arrStr[mult], mult];
      }
    } else if(mult !== -1 && sum !== -1 && sub !== -1 && div === -1) {
      return [arrStr[mult], mult];
    } else if(div !== -1 && sum !== -1 && sub !== -1 && mult === -1) {
      return [arrStr[div], div];
    }
    else if(sum !== -1 && sub !== -1) {
      if(sum < sub) {
        return [arrStr[sum], sum];
      } else {
        return [arrStr[sub], sub];
      }
    } else {
      if(mult !== -1) {
        return [arrStr[mult], mult];
      }
      if(div !== -1) {
        return [arrStr[div], div];
      }
      if(sum !== -1) {
        return [arrStr[sum], sum];
      }
      if(sub !== -1) {
        return [arrStr[sub], sub];
      }
    }
  }

  function existZeroInDisplay() {
    return $display.value === '0';
  }
})(window, document);
