// src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.0.0/p5.js"
let batman;

function preload() {
  // Load model with normalise parameter set to true
  batman = loadModel('batman.obj', true);
}

var w = window.innerWidth;
var h = window.innerHeight;
let price;  
let slider;
let inp;


function setup() {
  fill(255,255,255,255);
  slider = createSlider(0, 25, 25, 5);

  slider.addClass("mySliders");
  fill(255,255,255,255);
  // inp = createInput('Enter Username');
  // inp.position(w-340, 50);
  // button = createButton('submit');
  // button.position(inp.x + inp.width, 50);
  // button.mousePressed(greet);
  // inp.input(myInputEvent);
  canvas=createCanvas(w-400, h, WEBGL);
}

function draw() {
  background(0);
  colorMode(HSB);
    slider.position(w-280, 130);
  let dirX = (mouseX / width - 0.5) * 2;
  let dirY = (mouseY / height - 0.5) * 2;
  let val = slider.value();
  // fill(255,255,255,255);
  // text('Scroll Through Past Bids:', w-200, 20);
  directionalLight(0, 0, (100-auction_nudge_loaded()*2) - val, -dirX, -dirY, -1);
  scale(3); // Scaled to make model fit into canvas
  // rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.005);
  //specularMaterial(10); // For effect
  noStroke();
  rotateX(600);
  translate(0, 0, -70);
  model(batman);
}

window.onresize = function() {
  // assigns new values for width and height variables
  w = window.innerWidth;
  h = window.innerHeight;  
  canvas.size(w-400,h);
}

function auction_nudge_loaded() {
  //Get the Your eBay Listings container
  var an_wrap = document.getElementById('auction-nudge-items');
          
  //Get all 'view' links
  var an_links = an_wrap.getElementsByClassName('price');
  
  //Loop over each link
  price = parseInt(an_links[0].innerHTML.substring(1));
  // price = 50;
  return(price);
  console.log(price);
  // s
}

window.onload = function() {
       //when the document is finished loading, replace everything
       //between the <a ...> </a> tags with the value of splitText
   document.getElementById("priceprint").innerHTML=price;
} 

