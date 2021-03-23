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
  $display.value = 0;
  var objBtnOperator = {};
  var $func = doc.querySelector('[data-js=btnCE]');
  var $operator = doc.querySelectorAll('#fieldOperator button[data-js-op]');
  var $number = doc.querySelectorAll('#fieldNumber button[data-js]');
  var arrSignal = ['+', '-', '÷', '×'];

  // Object of elements of operators buttons.
  objBtnOperator['+'] = $operator[0];
  objBtnOperator['-'] = $operator[1];
  objBtnOperator['÷'] = $operator[2];
  objBtnOperator['×'] = $operator[3];
  objBtnOperator['='] = $operator[4];

  // Array of Objects of numbers buttons.
  var arrOfObjBtnNumber = Array.prototype.map.call($number, function(item) {
    return item;
  }).reverse();

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
  function validInitialStr(objBtnOfDOM) {
    if($display.value === '0' || $display.value === arrSignal[2] || $display.value === arrSignal[3]) {
      $display.value = objBtnOfDOM.innerHTML;
    } else {
      $display.value += objBtnOfDOM.innerHTML;
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
  // Function what apply the rules of signal.
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
  rulesOfSignals();

  /* Buttons of numbers */

  // Number 0.
  arrOfObjBtnNumber[0].addEventListener('click', () => validInitialStr(arrOfObjBtnNumber[0]), false);
  // Number 1.
  arrOfObjBtnNumber[1].addEventListener('click', () => validInitialStr(arrOfObjBtnNumber[1]), false);
  // Number 2.
  arrOfObjBtnNumber[2].addEventListener('click', () => validInitialStr(arrOfObjBtnNumber[2]), false);
  // Number 3.
  arrOfObjBtnNumber[3].addEventListener('click', () => validInitialStr(arrOfObjBtnNumber[3]), false);
  // Number 4.
  arrOfObjBtnNumber[4].addEventListener('click', () => validInitialStr(arrOfObjBtnNumber[4]), false);
  // Number 5.
  arrOfObjBtnNumber[5].addEventListener('click', () => validInitialStr(arrOfObjBtnNumber[5]), false);
  // Number 6.
  arrOfObjBtnNumber[6].addEventListener('click', () => validInitialStr(arrOfObjBtnNumber[6]), false);
  // Number 7.
  arrOfObjBtnNumber[7].addEventListener('click', () => validInitialStr(arrOfObjBtnNumber[7]), false);
  // Number 8.
  arrOfObjBtnNumber[8].addEventListener('click', () => validInitialStr(arrOfObjBtnNumber[8]), false);
  // Number 9.
  arrOfObjBtnNumber[9].addEventListener('click', () => validInitialStr(arrOfObjBtnNumber[9]), false);

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
  objBtnOperator['='].addEventListener('click', function equal() {

    if(!existSignalLastStr()) {

      // Value str is input.
      var str = $display.value;

      // Regex for transform each char in index of an Array
      var regex = /\D|\d+(?:\.\d+)?/g;

      // Array de char.
      var arrStr = str.match(regex);

      var index = 0;
      var mult, div, sum, sub;
      var regexSignal;

      function calculus() {
        if(arrStr.indexOf(arrSignal[3]) !== -1) {
          index = arrStr.indexOf(arrSignal[3]);

          if(arrStr[0] !== arrSignal[1]) {
            mult = (+arrStr[index - 1]) * (+arrStr[index + 1]);
            console.log(mult);

          } else {
            mult = -(+arrStr[index - 1]) * (+arrStr[index + 1]);
            console.log(mult);
          }

          regexSignal = new RegExp('(?:^[-+])?\\d+(?:\\.\\d+)?\\'+ arrSignal[3] +'\\d+(?:\\.\\d+)?');
          $display.value = $display.value.replace(regexSignal, mult);

          str = $display.value;
          arrStr = str.match(regex);

        }

        if(arrStr.indexOf(arrSignal[2]) !== -1) {
          index = arrStr.indexOf(arrSignal[2]);

          if(arrStr[0] !== arrSignal[1]) {
            div = (+arrStr[index - 1]) / (+arrStr[index + 1]);
            console.log(div);

          } else {
            div = -(+arrStr[index - 1]) / (+arrStr[index + 1]);
            console.log(div);
          }

          regexSignal = new RegExp('(?:^[-+])?\\d+(?:\\.\\d+)?\\'+ arrSignal[2] +'\\d+(?:\\.\\d+)?');
          $display.value = $display.value.replace(regexSignal, div);

          str = $display.value;
          arrStr = str.match(regex);

        }

        if(arrStr.indexOf(arrSignal[0]) !== -1) {
          index = arrStr.indexOf(arrSignal[0]);

          if(arrStr[0] !== arrSignal[1]) {
            sum = (+arrStr[index - 1]) + (+arrStr[index + 1]);
            console.log(sum);

          } else {
            sum = -(+arrStr[index - 1]) + (+arrStr[index + 1]);
            console.log(sum);
          }

          regexSignal = new RegExp('(?:^[-+])?\\d+(?:\\.\\d+)?\\'+ arrSignal[0] +'\\d+(?:\\.\\d+)?');
          $display.value = $display.value.replace(regexSignal, sum);

          str = $display.value;
          arrStr = str.match(regex);

        }

        if(arrStr.indexOf(arrSignal[1]) !== -1) {
          index = arrStr.indexOf(arrSignal[1]);

          if(arrStr[0] !== arrSignal[1]) {
            sub = (+arrStr[index - 1]) - (+arrStr[index + 1]);
            console.log(sub);

          } else {
            sub = -(+arrStr[index - 1]) - (+arrStr[index + 1]);
            console.log(sub);
          }
          regexSignal = new RegExp('(?:^[-+])?\\d+(?:\\.\\d+)?\\'+ arrSignal[1] +'\\d+(?:\\.\\d+)?');
          $display.value = $display.value.replace(regexSignal, sub);

          str = $display.value;
          arrStr = str.match(regex);
        }
      }
      calculus();
    }
  }, false);

  /* Button CE */
  $func.addEventListener('click', function() {
    $display.value = 0;
  }, false);

})(window, document);
