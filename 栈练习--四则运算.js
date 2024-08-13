let str = '9+(3-1)*3+12/2';
// 中缀表达式转后缀表达式
function getPostfix(str) {
    const precedence = { '+': 1, '-': 1, '*': 2, '/': 2, '^': 3 };
    let stack = [];
    let postfix = [];
    let numBuffer = ''; // 用于存储连续的数字字符
    let i = 0;

    while (i < str.length) {
        const char = str[i];

        if (/\d/.test(char)) {
            // 如果是数字，先收集所有连续的数字字符
            numBuffer += char;
            i++; // 增加索引，以便继续检查下一个字符
        } else if (char === ' ') {
            // 忽略空格
            i++; // 增加索引
        } else {
            // 非数字字符处理
            if (numBuffer) {
                // 如果之前有数字字符，先将它们作为一个整体加入后缀表达式
                postfix.push(numBuffer);
                numBuffer = '';
            }

            if (char === '(') {
                stack.push(char);
            } else if (char === ')') {
                while (stack.length && stack[stack.length - 1] !== '(') {
                    postfix.push(stack.pop());
                }
                if (stack.length && stack[stack.length - 1] === '(') {
                    stack.pop();
                } else {
                    throw new Error('Mismatched parentheses');
                }
            } else {
                while (stack.length && precedence[char] <= precedence[stack[stack.length - 1]]) {
                    postfix.push(stack.pop());
                }
                stack.push(char);
            }
            i++; // 增加索引
        }
    }

    if (numBuffer) {
        // 处理最后可能遗留的数字字符
        postfix.push(numBuffer);
    }

    while (stack.length) {
        const top = stack.pop();
        if (top === '(') {
            throw new Error('Mismatched parentheses');
        }
        postfix.push(top);
    }

    return postfix;
}
function getPostfix2(str) {
	const precedence = { '+': 1, '-': 1, '*': 2, '/': 2, '^': 3 }; //处理优先级
	let stack = []; // 空栈，用来对符号进出栈使用
	let postfix = []; // 后缀表达式
  let numBuffer = '';
	for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (/\d/.test(char)) {
      // 如果是数字，则先收集起来
      numBuffer += `${char}`
    } else if (char === ' ') {
      // 忽略空格
      continue;
    } else {
      // 非数字字符处理
      if (numBuffer) {
        // 如果之前有数字字符，先将它们作为一个整体加入后缀表达式
        postfix.push(numBuffer);
        numBuffer = '';
      }
      if (char === '(') {
        // 为左括号，则入栈
        stack.push(char);
      } else if (char === ')') {
        // 为右括号，则弹出栈内所有运算符
        while (stack.length && stack[stack.length - 1] !== '(') {
          postfix.push(stack.pop());
        }
        // 弹出左括号
        if (stack.length && stack[stack.length - 1] === '(') {
          stack.pop()
        } else {
          throw new Error('括号不匹配');
        }
      } else {
        // 为运算符，则弹出栈内所有优先级大于等于当前运算符的运算符
        while (stack.length && precedence[char] <= precedence[stack[stack.length - 1]]) {
          postfix.push(stack.pop());
        }
        stack.push(char);
      }
    }
  }
  if (numBuffer) {
    // 处理最后可能遗留的数字字符
    postfix.push(numBuffer);
  }
  // 将栈内剩余的运算符弹出
	while (stack.length) {
		postfix.push(stack.pop());
	}
	return postfix;
}
// 通过后缀表达式计算
function calc(postFix) {
	let stack = [];
	for (let i = 0; i < postFix.length; i++) {
		const item = postFix[i];
		if (typeof item === 'number' || !isNaN(Number(item))) {
			// 确保item是数字
			stack.push(Number(item)); // 显式转换为数字
		} else {
			// 防止空栈操作
			if (stack.length < 2) {
				throw new Error('Invalid expression');
			}
			let b = stack.pop(); // 第一个操作数
			let a = stack.pop(); // 第二个操作数
			let result;
			switch (item) {
				case '+':
					result = a + b;
					break;
				case '-':
					result = a - b;
					break;
				case '*':
					result = a * b;
					break;
				case '/':
					if (b === 0) {
						throw new Error('Division by zero');
					}
					result = a / b;
					break;
			}
			stack.push(result);
		}
	}
  return stack.pop()
}
let postFix = getPostfix(str)
console.log(postFix);
let postFix2 = getPostfix2(str)
console.log(postFix2);

let result = calc(postFix);
let result2 = calc(postFix2);
console.log(`运算内容：${str}`);
console.log(`运算结果：${result}`);
console.log(`运算结果2：${result2}`);

