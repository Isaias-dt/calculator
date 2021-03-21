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

  // Object of Objects of buttons operator.
  objBtnOperator['+'] = $operator[0];
  objBtnOperator['-'] = $operator[1];
  objBtnOperator['÷'] = $operator[2];
  objBtnOperator['×'] = $operator[3];
  objBtnOperator['='] = $operator[4];


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

  /* Buttons of numbers */
  arrOfObjBtnNumber[0].addEventListener('click', () => validInitialStr(arrOfObjBtnNumber[0]), false);

  arrOfObjBtnNumber[1].addEventListener('click', () => validInitialStr(arrOfObjBtnNumber[1]), false);

  arrOfObjBtnNumber[2].addEventListener('click', () => validInitialStr(arrOfObjBtnNumber[2]), false);

  arrOfObjBtnNumber[3].addEventListener('click', () => validInitialStr(arrOfObjBtnNumber[3]), false);

  arrOfObjBtnNumber[4].addEventListener('click', () => validInitialStr(arrOfObjBtnNumber[4]), false);

  arrOfObjBtnNumber[5].addEventListener('click', () => validInitialStr(arrOfObjBtnNumber[5]), false);

  arrOfObjBtnNumber[6].addEventListener('click', () => validInitialStr(arrOfObjBtnNumber[6]), false);

  arrOfObjBtnNumber[7].addEventListener('click', () => validInitialStr(arrOfObjBtnNumber[7]), false);

  arrOfObjBtnNumber[8].addEventListener('click', () => validInitialStr(arrOfObjBtnNumber[8]), false);

  arrOfObjBtnNumber[9].addEventListener('click', () => validInitialStr(arrOfObjBtnNumber[9]), false);

  /* Buttons of operatoration */

  objBtnOperator[arrSignal[0]].addEventListener('click', function() {
    setSignalDisplay(objBtnOperator[arrSignal[0]]);
  }, false);

  objBtnOperator[arrSignal[1]].addEventListener('click', function() {
    setSignalDisplay(objBtnOperator[arrSignal[1]]);
  }, false);

  objBtnOperator[arrSignal[2]].addEventListener('click', function() {
    setSignalDisplay(objBtnOperator[arrSignal[2]]);
  }, false);

  objBtnOperator[arrSignal[3]].addEventListener('click', function() {
    setSignalDisplay(objBtnOperator[arrSignal[3]]);
  }, false);

  objBtnOperator['='].addEventListener('click', function(evt) {
    if(!existSignalLastStr()) {


    //$display.value = win.eval($display.value);
    var str = $display.value;
    var regex = /\D|\d+(?:\.\d+)?/g;
    var arrStr = str.match(regex);
    var index = 0;
    var mult, div, sum, sub;
    var regexSignal;

    if(arrStr.indexOf(arrSignal[3]) !== -1) {
      index = arrStr.indexOf(arrSignal[3]);

      if(arrStr[0] !== arrSignal[1]) {
        mult = (+arrStr[index - 1]) * (+arrStr[index + 1]);
        console.log(mult);

      } else {
        mult = -(+arrStr[index - 1]) * (+arrStr[index + 1]);
        console.log(mult);
      }

      regexSignal = new RegExp('^[-+]?\\d+'+ arrSignal[3] +'\\d+$');
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

      regexSignal = new RegExp('(?:^[-+])?\\d+'+ arrSignal[2] +'\\d+');
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

      regexSignal = new RegExp('(?:^[-+])?\\d+\\'+ arrSignal[0] +'\\d+');
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
      setTimeout()
      regexSignal = new RegExp('(?:^[-+])?\\d+'+ arrSignal[1] +'\\d+');
      $display.value = $display.value.replace(regexSignal, sub);

      str = $display.value;
      arrStr = str.match(regex);
    }
  }

  }, false);

  /* Button CE */
  $func.addEventListener('click', function() {
    $display.value = 0;
  }, false);

})(window, document);
