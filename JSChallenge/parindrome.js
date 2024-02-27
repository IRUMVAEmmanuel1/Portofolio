function isPalindrome(str) {
	str = str.toLowerCase();

	const alphanumericStr = str.replace(/[^a-z0-9]/g, "");

	const len = alphanumericStr.length;

	for (let i = 0; i < Math.floor(len / 2); i++) {
		if (alphanumericStr[i] !== alphanumericStr[len - 1 - i]) {
			return false;
		}
	}

	return true;
}

const str1 = "A man, a plan, a canal, Panama";
console.log(isPalindrome(str1)); // Output: true

const str2 = "racecar";
console.log(isPalindrome(str2)); // Output: true

const str3 = "hello";
console.log(isPalindrome(str3)); // Output: false
