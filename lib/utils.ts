const addSpaceEveryTwoDigits = (number: number) => {
    // Convert the number to a string
    const numberString = number.toString();
  
    // Split the string into an array of two-digit substrings
    const substringsArray = numberString.match(/.{1,2}/g);
  
    // Join the substrings with a space between each substring
    const numberWithSpaces = substringsArray.join(' ');
  
    return numberWithSpaces;
  }