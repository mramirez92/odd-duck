// ***** GLOBAL VARIABLES *****

let voteCount = 5; 
let productArray = []; 

// ***** DOM REF *****
let imgContainer = document.getElementById('img-container');
let resultsContainer = document.getElementById('results-container');
let resultsBtn = document.getElementById('show-results-btn');
let viewBtn =document.getElementById('view');
//js sees src as property
let imgOne = document.getElementById('imgOne');
let imgTwo = document.getElementById('imgTwo');
let imgThree = document.getElementById('imgThree');


// ****** CONSTRUCTOR ******
function Product (name, fileExtension = 'jpg'){
  this.name = name;
  //building our file path passing property'name' and using parameter file extension as argument 
  this.img = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.clicks = 0;

  productArray.push(this);
}


// ******* HELPER FUNC / UTILITIES *****

function randomIndex(){
  return Math.floor(Math.random()*productArray.length);
}

function renderImg(){

  let imgOneIndex = randomIndex();
  let imgTwoIndex = randomIndex();
  let imgThreeIndex = randomIndex();

  //imgone === imgtwo, make sure indexes are unique
// loops until images are unique, indexes are not the same. 
//mutiple conditions to check for three images
//containers to store your indexes and do your validation on that, array? array methods

  while (imgOneIndex === imgTwoIndex || imgOneIndex === imgThreeIndex || imgTwoIndex === imgThreeIndex){
    imgOneIndex = randomIndex();
    imgTwoIndex = randomIndex();
    imgThreeIndex = randomIndex();
  }

  imgOne.src = productArray[imgOneIndex].img;
  imgTwo.src = productArray[imgTwoIndex].img;
  imgThree.src = productArray[imgThreeIndex].img;

  productArray[imgOneIndex].views++;
  productArray[imgTwoIndex].views++;
  productArray[imgThreeIndex].views++;


  imgOne.alt= productArray[imgOneIndex].name;
  imgTwo.alt = productArray[imgTwoIndex].name;
  imgThree.alt = productArray[imgThreeIndex].name;

}

// ***** EVENT HANDLER *****

function handleClick(event){
  //target is the html element the event happened to. the click happened to. 
  console.dir(event.target);
  let imgClicked = event.target.alt;
  console.log('img clicked>>', imgClicked); 
  //add clicks to img that was clicked
for (let i= 0; i <productArray.length; i++){
  if (productArray[i].name === imgClicked){
    //if that name in alt strictly equals product in array increment clicks
    productArray[i].clicks++;
  }
}
  //decrement vote count
  voteCount--;
  //call render img to reload new images
  renderImg();
  //stop votecount after 0, end clicks
  if (voteCount === 0){
    imgContainer.removeEventListener('click', handleClick);
  
}
}

function handleShowResults(event){
  //display results when votes === 0 ;
  if (voteCount === 0){
    for (i=0; i<productArray.length; i++){
      let liElem = document.createElement('li');
      liElem.textContent= `${productArray[i].name} - Number of views: ${productArray[i].views}. Number of clicks: ${productArray[i].clicks}`;
      resultsContainer.appendChild(liElem);
    }
    
    viewBtn.removeEventListener('click', handleShowResults);
  }
}

// OBJECT CREATION //
new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('sweep', 'png');
new Product('tauntaun');
new Product('unicorn');
new Product('water-can');
new Product('wine-glass');



renderImg();

// event, event callback;
imgContainer.addEventListener('click', handleClick);
viewBtn.addEventListener('click', handleShowResults);
