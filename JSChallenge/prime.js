function isPrime(num) {
  if (num <= 1) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false;
  for (let i = 3; i <= Math.sqrt(num); i += 2) {
      if (num % i === 0) return false;
  }
  return true;
}

function filterPrimes(numbers) {
  const primeNumbers = [];
  for (let i = 0; i < numbers.length; i++) {
      if (isPrime(numbers[i])) {
          primeNumbers.push(numbers[i]);
      }
  }
  return primeNumbers;
}


const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const primeNumbers = filterPrimes(numbers);
console.log(primeNumbers); 
