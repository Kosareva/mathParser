const MathParser = {
    rules: {
        number: /[0-9\.]*/,
        operator: /[\+,\-,\*,\/]/,
    },
    priority: ['*', '/', '+', '-'],
    operationsMap: (self) => new Map([
        ['*', self.multiply],
        ['/', self.divide],
        ['+', self.sum],
        ['-', self.subtract],
    ]),
    sum: (a, b) => +a + +b,
    multiply: (a, b) => +a * +b,
    divide: (a, b) => +a / +b,
    subtract: (a, b) => +a - +b,
    Token: function (type, val) {
        this.type = type.toString();
        this.value = val.toString();
    },
    tokenize: function (input) {
        const tokens = [];
        let inputCopy = input.slice().replace(/\s+/g, '');
        while (inputCopy.length) {

            let matchVal = null;
            let mathType = null;
            if (inputCopy.match(this.rules.number)[0].length) {
                matchVal = inputCopy.match(this.rules.number)[0];
                mathType = 'N'
            } else if (inputCopy.match(this.rules.operator)[0].length) {
                matchVal = inputCopy.match(this.rules.operator)[0];
                mathType = 'O'
            }

            tokens.push(new this.Token(mathType, matchVal));
            inputCopy = inputCopy.replace(matchVal, '');
        }
        return tokens;
    },
    evaluate: function (input) {
        const tokens = this.tokenize(input);
        const ast = this.buildAST(tokens);
        let res = 0;

        while (ast.length > 1) {
            const ind = ast.findIndex(val => val.toString().match(this.rules.operator));
            const firstN = ast[ind - 2];
            const lastN = ast[ind - 1];
            res = +this.operationsMap(this).get(ast[ind]).apply(this, [firstN, lastN]);
            ast.splice(ind - 2, 3, res);
        }

        return res;
    },
    buildAST: function (tokens) {
        let nStack: any[] = [];
        const oStack: any[] = [];

        tokens.forEach((token) => {
            if (token.type === 'N') {
                nStack.push(token.value);
            } else if (token.type === 'O') {
                if (oStack.length) {
                    const lastOPriorityIndex = this.priority.findIndex(o => o === oStack[oStack.length - 1]);
                    const oPriorityIndex = this.priority.findIndex(o => o === token.value);
                    if (oPriorityIndex > lastOPriorityIndex) {
                        nStack.push(oStack.pop());
                    }
                }
                oStack.push(token.value);
            }
        });

        oStack.reverse();
        nStack = [...nStack, ...oStack];

        return nStack;
    }
};

console.log(MathParser.evaluate('2 + 44 / 4 + 1')); // 14
console.log(MathParser.evaluate('2 + 44 / 4 + 1 + 2 * 4')); // 22
