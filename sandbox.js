let random = Math.floor(Math.random() * (Math.pow(10, 4)))
const random2 = Math.floor(Math.random() * 10000)
random = random.toString()
if (random.length === 3) {
  random = '0' + random;
} else if (random.length === 2) {
  random = '00' + random;
} else if (random.length === 1) {
  random = '000' + random;
}

let tes = '0' + random;
console.log(random.length, '<<');
console.log(random, random2, tes, 'tes');