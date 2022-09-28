// ***** GLOBAL VARIABLES *****

let voteCount = 25;
let productArray = [];
let indexArray= [];


// ***** DOM REF *****
const ctx = document.getElementById('myChart').getContext('2d');
let imgContainer = document.getElementById('img-container');
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

  while (indexArray.length < 6){

    let imgRandom = randomIndex();
    if (!indexArray.includes(imgRandom)){
      indexArray.push(imgRandom);

    }
  }

  let imgOneIndex = indexArray.shift();
  let imgTwoIndex = indexArray.shift();
  let imgThreeIndex = indexArray.shift();

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

// ***** chart function *****

function renderChart (){

  let productNames = [];
  let productVotes = [];
  let productViews = [];

  for (let i = 0; i <productArray.length; i++){
    productNames.push(productArray[i].name);
    productVotes.push(productArray[i].clicks);
    productViews.push(productArray[i].views);

  }
  Chart.defaults.font.size = 16;
  let chartObj = {
    type: 'bar',
    data: {
      //labels name of products//
      labels: productNames,
      //aray of objects that are going to render on my chart//
      datasets: [{
        label: '# of Votes',
        data: productVotes,
        backgroundColor: [
          'rgba(242, 242, 48)',
          'rgba(194, 242, 97)',
          'rgba(145, 242, 145)',
          'rgba(97, 242, 194)',
          'rgba(48, 242, 242)',
        ],
        borderColor: [
          'rgba(231, 231, 13, 1)',
          'rgba(183, 240, 70, 1)',
          'rgba(118, 239, 118, 1)',
          'rgba(70, 240, 183, 1)',
          'rgba(27, 240, 240, 1)',
        ],
        borderWidth: 1
      },
      {
        label: '# of Views',
        data: productViews,
        backgroundColor: [
          'rgba(246, 246, 101, 0.5)',
          'rgba(194, 242, 97, 0.5)',
          'rgba(145, 242, 145, 0.5)',
          'rgba(97, 242, 194, 0.5)',
          'rgba(48, 242, 242, 0.5)',
        ],
        borderColor: [
          'rgba(231, 231, 13, 1)',
          'rgba(183, 240, 70, 1)',
          'rgba(118, 239, 118, 1)',
          'rgba(70, 240, 183, 1)',
          'rgba(27, 240, 240, 1)',

        ],
        borderWidth: 3,
        barPercentage: 1.0
      }
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        },
      }
    }
  };
  new Chart(ctx, chartObj);
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
  voteCount--;
  renderImg();
  if (voteCount === 0){
    imgContainer.removeEventListener('click', handleClick);
    renderChart();
    //JSON makes data into string
    let stringifiedProducts = JSON.stringify(productArray);

    //ADD TO LOCAL STORAGE >> still string, but locally stored
    localStorage.setItem('products', stringifiedProducts);
  }
}

//local storage code :
//pull data out of local storage. persist data; using stringifyed item as key
let retrivedProducts =localStorage.getItem('products');

//parse data into code app can use, breaks down string by looking for groupings >>  reusable code
let parsedProducts = JSON.parse(retrivedProducts);

// if site visited before, render locally stored Products else if this is the first time on page, new product instances are run.

if (retrivedProducts){
  productArray= parsedProducts;
}else{
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
}

renderImg();

// event, event callback;
imgContainer.addEventListener('click', handleClick);

