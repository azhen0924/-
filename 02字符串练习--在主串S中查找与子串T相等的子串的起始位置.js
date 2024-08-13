class S {
	data = '';
	/**
	 * 在主串S中查找与子串T相等的子串的起始位置
	 * @param {string} s - 主串
	 * @param {string} t - 子串
	 * @returns {number} - 若找到子串T，则返回其在主串S中的起始位置；否则返回0
	 */
	index(s, t) {
		// 定义变量n, m, i分别用于存储主串长度，子串长度和循环索引
		let n, m, i;
		n = s.length;
		m = t.length;
		i = 0;
		// 循环条件：i加上子串长度m不能超过主串长度n
		while (i <= n - m) {
			// 获取主串中从当前位置i开始，长度为m的子串
			let sub = s.substring(i, i + m);
			// 比较获取的子串与目标子串t是否相等
			if (sub === t) {
				// 若相等，则返回当前子串在主串中的起始位置i
				return i;
			} else {
				// 若不相等，则将索引i后移一位，继续下一轮循环
				i++;
			}
		}
		// 若循环结束仍未找到匹配的子串，则返回0
		return 0;
	}
}
let s = new S();
let index = s.index('hello world', 'world');
console.log(`在hello world中，在第${index}位找到world`);
