

const word = (str)=>{
  let words = str.split(" ")
  for(let i=0; i<=words.length; i++){
    words[i]=word[i][0].toUpperCase();
    console.log(i);
    
  }
}


console.log(word("KYA HAAL EHY BHAILOG"));
