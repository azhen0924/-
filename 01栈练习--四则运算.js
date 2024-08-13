let str = '9+(3-1)*3+12/2';
// 中缀表达式转后缀表达式
function getPostfix(str) {
	// 定义运算符优先级
	const precedence = { '+': 1, '-': 1, '*': 2, '/': 2, '^': 3 };
	let stack = []; // 用于存放运算符
	let postfix = []; // 用于存放后缀表达式
	let numBuffer = ''; // 用于存储连续的数字字符
	let i = 0; // 表达式字符索引

	// 遍历表达式字符
	while (i < str.length) {
		const char = str[i];

		// 处理数字字符
		if (/\d/.test(char)) {
			numBuffer += char; // 收集连续的数字字符
			i++; // 增加索引，以便继续检查下一个字符
		} else if (char === ' ') {
			// 忽略空格
			i++; // 增加索引
		} else {
			// 非数字字符处理
			if (numBuffer) {
				// 如果之前有数字字符，先将它们作为一个整体加入后缀表达式
				postfix.push(numBuffer);
				numBuffer = ''; // 重置数字字符缓冲区
			}

			// 处理左括号
			if (char === '(') {
				stack.push(char);
			} else if (char === ')') {
				// 处理右括号，弹出栈中的运算符直到左括号
				while (stack.length && stack[stack.length - 1] !== '(') {
					postfix.push(stack.pop());
				}
				if (stack.length && stack[stack.length - 1] === '(') {
					stack.pop(); // 弹出左括号
				} else {
					throw new Error('Mismatched parentheses'); // 括号不匹配错误
				}
			} else {
				// 处理其他运算符
				while (stack.length && precedence[char] <= precedence[stack[stack.length - 1]]) {
					postfix.push(stack.pop()); // 弹出优先级高于当前运算符的运算符
				}
				stack.push(char); // 将当前运算符入栈
			}
			i++; // 增加索引
		}
	}

	// 处理最后可能遗留的数字字符
	if (numBuffer) {
		postfix.push(numBuffer);
	}

	// 将栈中剩余的运算符加入后缀表达式
	while (stack.length) {
		const top = stack.pop();
		if (top === '(') {
			throw new Error('括号输入异常'); // 栈中仍有左括号，输入异常
		}
		postfix.push(top);
	}

	return postfix; // 返回后缀表达式
}
/**
 * 将中缀表达式字符串转换为后缀表达式
 * @param {string} str - 中缀表达式字符串
 * @returns {string[]} - 后缀表达式数组
 */
function getPostfix2(str) {
	// 定义运算符优先级
	const precedence = { '+': 1, '-': 1, '*': 2, '/': 2, '^': 3 };
	// 空栈，用来对符号进出栈使用
	let stack = [];
	// 后缀表达式数组
	let postfix = [];
	// 用于临时存储数字字符
	let numBuffer = '';
	// 遍历输入字符串
	for (let i = 0; i < str.length; i++) {
		const char = str[i];
		// 如果是数字字符，则收集起来
		if (/\d/.test(char)) {
			numBuffer += `${char}`;
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
				// 为右括号，则弹出栈内所有运算符，直到遇到左括号
				while (stack.length && stack[stack.length - 1] !== '(') {
					postfix.push(stack.pop());
				}
				// 弹出左括号
				if (stack.length && stack[stack.length - 1] === '(') {
					stack.pop();
				} else {
					throw new Error('括号不匹配');
				}
			} else {
				// 为运算符，则弹出栈内所有优先级大于等于当前运算符的运算符
				while (stack.length && precedence[char] <= precedence[stack[stack.length - 1]]) {
					postfix.push(stack.pop());
				}
				// 当前运算符入栈
				stack.push(char);
			}
		}
	}
	// 处理最后可能遗留的数字字符
	if (numBuffer) {
		postfix.push(numBuffer);
	}
	// 将栈内剩余的运算符弹出
	while (stack.length) {
		postfix.push(stack.pop());
	}
	return postfix;
}
/**
 * 计算给定的后缀表达式。
 * 后缀表达式（或逆波兰表达式）是一种不需要括号的表达式，其中运算符位于操作数之后。
 * 例如，“2 2 +”表示“2 + 2”。该函数通过使用栈来计算表达式的结果。
 *
 * @param {string[]} postFix 后缀表达式数组，其中每个元素可以是数字或运算符（+、-、*、/）。
 * @returns {number} 表达式的计算结果。
 * @throws {Error} 如果表达式无效或尝试用零作为除数进行除法操作。
 */
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
						throw new Error('除数不能为0');
					}
					result = a / b;
					break;
			}
			stack.push(result);
		}
	}
	return stack.pop();
}
let postFix = getPostfix(str);
let postFix2 = getPostfix2(str);

let result = calc(postFix);
let result2 = calc(postFix2);
console.log(`运算内容：${str}`);
console.log(`运算结果：${result}`);
console.log(`运算结果2：${result2}`);
