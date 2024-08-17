// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];


// Add your functions below:
//added a check function that validate a credit card number according to Luhn Algorithm:
// This algorithm reads, from right to left, the numbers validating if it's multiple of 10 (10 - (s mod 10)). This function needs to skip reading the first readed value/digit, which will be the last one, and after that, read one, check if after multiply 2x is greater than 9, if yes it must be -9, and skip the next value and so on. 
function validateCred(cdNumber){
  let sumNumbers = 0;
  let isSecond = false;
  for (let i = cdNumber.length - 1; i >= 0; i--) {
    let number = cdNumber[i];
    if (isSecond) {
      number *= 2;
      if (number > 9) {
        number -= 9;
      }
    }
    sumNumbers += number;
    isSecond = !isSecond;
  }
   return sumNumbers % 10 === 0;
}

// This is my function to check if a card, or a batch of cards, are invalids. Simple using of filter with "!" reverse operator.
const findInvalidCards = (invalidCards) => invalidCards.filter(cards => !validateCred(cards));

// This one was pretty simple to do, just to return what company that had invalid cards. Note that can't have multiple companies name within the new array.
const idInvalidCardCompanies = (invalidCards) => {
  let invalids = [];
  for(const cards of invalidCards){
    if(cards[0] === 3 && !invalids.includes('Amex (American Express)')){
      invalids.push('Amex (American Express)');
    } else if(cards[0] === 4 && !invalids.includes('Visa')){
      invalids.push('Visa');
    } else if(cards[0] === 5 && !invalids.includes('Mastercard')){
      invalids.push('Mastercard');
    } else if(cards[0] === 6 && !invalids.includes('Discover')){
      invalids.push('Discover');
    } else {
      console.log('Company not found');
    }
  }
  return invalids;
}

// Calling to check, according to the check, the output must have 4 not company found cards and all companies having at least 1 invalid cards.
const allInvalidCards = findInvalidCards(batch);
const invalidCompanies = idInvalidCardCompanies(allInvalidCards);
console.log(invalidCompanies);








