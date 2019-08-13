const reg1 = /[0-9\.]*/;
const reg2 = /[\+,\-,\*,\/]/;
const init = '2 + 33 / 4 + 1';
const priority = ['*', '/', '+', '-'];

let initCopy = init.slice();
const res: any = [];
while (initCopy.length) {
    if (initCopy.match(reg1)![0].length) {
        const matchNumber = initCopy.match(reg1);
        res.push({
            type: 'N',
            value: matchNumber![0]
        });
        initCopy = initCopy.replace(matchNumber![0], '').replace(/\s/g, '');
    } else if (initCopy.match(reg2)![0].length) {
        const matchOperator = initCopy.match(reg2);
        res.push({
            type: 'O',
            value: matchOperator![0]
        });
        initCopy = initCopy.replace(matchOperator![0], '').replace(/\s/g, '');
    } else {
        initCopy = initCopy.substring(1, initCopy.length);
    }
}
console.log(res);

// =====================================================================================================================

// function Token(type, value) {
//     this.type = type;
//     this.value = value
// }
//
// function tokenize(str) {
//     var result = [];
//     str.replace(/\s+/g, "");
//     str = str.split("");
//     str.forEach(function (char, idx) {
//         if (isDigit(char)) {
//             result.push(new Token("Literal", char));
//         } else if (isLetter(char)) {
//             result.push(new Token("Variable", char));
//         } else if (isOperator(char)) {
//             result.push(new Token("Operator", char));
//         } else if (isLeftParenthesis(char)) {
//             result.push(new Token("Left Parenthesis", char));
//         } else if (isRightParenthesis(char)) {
//             result.push(new Token("Right Parenthesis", char));
//         } else if (isComma(char)) {
//             result.push(new Token("Function Argument Separator", char));
//         }
//     });
//     return result;
// }
//
// function isComma(ch) {
//     return (ch === ",");
// }
//
// function isDigit(ch) {
//     return /\d/.test(ch);
// }
//
// function isLetter(ch) {
//     return /[a-z]/i.test(ch);
// }
//
// function isOperator(ch) {
//     return /\+|-|\*|\/|\^/.test(ch);
// }
//
// function isLeftParenthesis(ch) {
//     return (ch === "(");
// }
//
// function isRightParenthesis(ch) {
//     return (ch == ")");
// }
//
// console.log(tokenize('2 + 3, 4a + 1, 5x+ (2y), 11 + sin(20.4)'));
//
// var tokens = tokenize("89sin(45) + 2.2x/7");
// tokens.forEach(function (token, index) {
//     console.log(index + "=> " + token.type + "(" + token.value + ")"
// :
// });
