class S {
	data = '';
	// 使用双循环匹配
	index(s, t) {
		// 检查空字符串
		if (t.length === 0) {
			return 0;
		}

		// 外层循环遍历字符串s，内层循环用于逐字符比较
		for (let i = 0; i <= s.length - t.length; i++) {
			let match = true;
			// 内层循环，用于逐字符比较
			for (let j = 0; j < t.length; j++) {
				if (s[i + j] !== t[j]) {
					match = false;
					break;
				}
			}
			if (match) {
				return i;
			}
		}
		return -1; // 没有找到匹配项
	}
	/**
	 * 在字符串s中查找子字符串t的索引位置
	 *
	 * 该函数使用了一种简单的模式匹配算法，逐个字符比较s和t中的字符
	 * 当所有字符匹配成功时，返回起始索引；若未找到，则返回-1
	 *
	 * @param {string} s - 主字符串
	 * @param {string} t - 子字符串
	 * @returns {number} - 子字符串t在主字符串s中的索引位置，如果未找到返回-1
	 */
	index2(s, t) {
		// 初始化主字符串s的索引i和子字符串t的索引j
		let i = 0;
		let j = 0;

		// 当两个索引都在其各自的字符串范围内时，进行循环
		while (i < s.length && j < t.length) {
			// 如果当前比较的字符相同，则移动两个索引
			if (s[i] === t[j]) {
				i++;
				j++;
			} else {
				// 如果当前比较的字符不同，调整索引i并重置索引j
				// 这里解释了“为什么”需要进行这样的调整：为了尝试下一种可能的匹配位置
				i = i - j + 1;
				j = 0;
			}
		}
		// 检查是否找到了完整的子字符串t
		// 如果找到了，返回调整后的索引i；否则返回-1
		return j === t.length ? i - j : -1;
	}
}
let s = new S();
let index = s.index('goodgoogle', 'google');
console.log(index);
let index2 = s.index2('goodgoogle', 'google');
console.log(index2);
