var playerData;
var playerStats;
var playerStats2;
var playerStats3;
var api = "https://www.balldontlie.io/api/v1/players?search=";
var api2 = "https://www.balldontlie.io/api/v1/season_averages?season=2018&player_ids[]=";
// var input;
var playerDataPic;
var playerData2;
var apipic = "https://nba-players.herokuapp.com/players/";
var buttonpic;
var inputpic;
let img;
let img2;
var playerId;
var playerSeason;
let s;
let s2;
let s3;
let datap;
let keys;
let values;
let randomNum;
var urlpic;
var apiPlayers ="https://www.balldontlie.io/api/v1/players/";
function setup() {
    input2 = createInput('last name');
    firstname = createInput('first name');
    button2 = createButton('submit');
    button2.mousePressed(getNewPic);
    button3 = createButton('random player');
    button3.mousePressed(getRandomPic);
    createCanvas(1424, 712);
}

function gotDataPic(data) {
    playerDataPic = data;
}

function gotData(data2) {
    playerData = data2;
}

function gotPlayerData(data) {
	console.log(data)
    playerData2 = data;
    console.log(playerData2);
    var playerLastName = playerData2.last_name;
    var playerFirstName = playerData2.first_name;
    urlpic = apipic + playerLastName + '/' + playerFirstName;
    playerId = playerData2.id;
    var statUrl = "https://www.balldontlie.io/api/v1/season_averages?season=2018&player_ids[]=" + playerId
    loadJSON(statUrl, gotDataStats,'json')
    var statUrl2 = "https://www.balldontlie.io/api/v1/season_averages?season=2019&player_ids[]=" + playerId
    loadJSON(statUrl2, gotDataStats2,'json')
    var statUrl3 = "https://www.balldontlie.io/api/v1/season_averages?season=2020&player_ids[]=" + playerId
    loadJSON(statUrl3, gotDataStats3,'json')
    img = loadImage(urlpic,handle);
    img2 = loadImage(urlpic,handle2);
    img3 = loadImage(urlpic,handle3);
    fill(255, 255, 255);
    console.log(playerData2.last_name);
}

function gotDataID(data3) {
  for(var x = 0; x<data3.data.length; x++){
    if(data3.data[x].first_name.toLowerCase() == firstname.value()){
      playerId = parseInt(data3.data[x].id);
      // playerSeason = 2018;
      var statUrl = "https://www.balldontlie.io/api/v1/season_averages?season=2018&player_ids[]=" + playerId
      loadJSON(statUrl, gotDataStats,'json')
      var statUrl2 = "https://www.balldontlie.io/api/v1/season_averages?season=2019&player_ids[]=" + playerId
      loadJSON(statUrl2, gotDataStats2,'json')
      var statUrl3 = "https://www.balldontlie.io/api/v1/season_averages?season=2020&player_ids[]=" + playerId
      loadJSON(statUrl3, gotDataStats3,'json')
    }
  }
}

// function gotDataName(data3) {
//   for(var x = 0; x<data3.data.length; x++){
//     if(data3.data[x].id == randomNum){
//     	var randomFirst = data3.data[x].first_name.toLowerCase();
//     	var randomLast = data3.data[x].last_name.toLowerCase();
// 		var urlpic = apipic + randomLast + '/' + randomFirst;
// 		img = loadImage(urlpic,handle);
//     	img2 = loadImage(urlpic,handle2);
//    		img3 = loadImage(urlpic,handle3);

//     }
//   }
// }

function gotDataStats(data) {
  console.log(data)
  playerStats = data
}

function gotDataStats2(data) {
  console.log(data)
  playerStats2 = data
}

function gotDataStats3(data) {
  console.log(data)
  playerStats3 = data
}

function getNewPic() {
	var url = api + input2.value();
    loadJSON(url, gotData, 'json');
    var urlpic = apipic + input2.value() + '/' + firstname.value();
    img = loadImage(urlpic,handle);
    img2 = loadImage(urlpic,handle2);
    img3 = loadImage(urlpic,handle3);
    var pageUrl = "https://www.balldontlie.io/api/v1/players?search="+input2.value()+"&page=";
  var pageMax = 5;
	// var pageMax = playerData.meta.total_pages
  playerId = null;
	var currentPage;
	for(j = 1; j<pageMax; j++){
		currentPage = pageUrl + j;
    loadJSON(currentPage, gotDataID, 'json');
	}
}

function getRandomPic() {
	randomNum = Math.floor(Math.random() * 501);
	var idUrl = apiPlayers + randomNum;
	if (idUrl){
    	loadJSON(idUrl, gotPlayerData, 'json');
	}
	else{
		fill(255, 255, 255);
		text('not available', 30, 400);
	}
    console.log(idUrl);

}


// function preload() {
//   gif_createImg = createImg("ballshootingsped.gif");
// }

function handle(img){
	// playerSeason = 2018;
	// console.log(playerStats);
	// console.log(playerId);
	fill(0, 0, 0);
	rect(0, 0, 400, 600);
	s = (playerStats.data[0].pts)+(1.2*(playerStats.data[0].reb))+(1.5*(playerStats.data[0].ast))+(3*(playerStats.data[0].stl))+(3*(playerStats.data[0].blk))-(playerStats.data[0].turnover);
	datap = playerStats.data[0];
  	img.resize(float(s)*5, 0);
  	// gif_createImg.position(0, 0);
  	// img.resize(float(playerStats.data[0].pts)*3, 0);
  	console.log('s=' + s);
  	makeDithered(img,1)
  	image(img, 0, 0);
  	filter(THRESHOLD, 0.4);
  	textSize(12);
  	fill(255, 255, 255);
  	var i =0
  	for (const [key, value] of Object.entries(datap)) {
  		i++;
  		values = `${key}: ${value}`;
  		text(values, 0, 300 + i*13);
	}
	textSize(30);
	text(Math.round( s * 100 + Number.EPSILON ) / 100, 160, 350);
	console.log(playerData2.last_name);
	textSize(12);
	text(playerData2.first_name + ' ' + playerData2.last_name, 0, 12);
}

function handle2(img2){
	// console.log(playerStats);
	// console.log(playerId);
	fill(0, 0, 0);
	rect(400, 0, 400, 600);
	s2 = (playerStats2.data[0].pts)+(1.2*(playerStats2.data[0].reb))+(1.5*(playerStats2.data[0].ast))+(3*(playerStats2.data[0].stl))+(3*(playerStats2.data[0].blk))-(playerStats2.data[0].turnover);
	var datap2 = playerStats2.data[0];
  	img2.resize(float(s2)*5, 0);
  	console.log('s2=' +s2);
  	makeDithered(img2,1)
  	image(img2, 400, 0);
  	filter(THRESHOLD, 0.4);
  	textSize(12);
  	fill(255, 255, 255);
  	var i2 =0
  	for (const [key, value] of Object.entries(datap2)) {
  		i2++;
  		values = `${key}: ${value}`;
  		text(values, 400, 300 + i2*13);
	}
	textSize(30);
	text(Math.round( s2 * 100 + Number.EPSILON ) / 100, 560, 350);
	// textSize(12);
	// text(playerData2.first_name + ' ' + playerData2.last_name, 560, 312);
}


function handle3(img3){
	fill(0, 0, 0);
	rect(800, 0, 400, 600);
	s3 = (playerStats3.data[0].pts)+(1.2*(playerStats3.data[0].reb))+(1.5*(playerStats3.data[0].ast))+(3*(playerStats3.data[0].stl))+(3*(playerStats3.data[0].blk))-(playerStats3.data[0].turnover);
	var datap3 = playerStats3.data[0];
  	img3.resize(float(s3)*5, 0);
  	console.log('s3=' +s3);
  	makeDithered(img3,1)
  	image(img3, 800, 0);
  	filter(THRESHOLD, 0.4);
  	textSize(12);
  	fill(255, 255, 255);
  	var i3 =0
  	for (const [key, value] of Object.entries(datap3)) {
  		i3++;
  		values = `${key}: ${value}`;
  		text(values, 800, 300 + i3*13);
	}
	textSize(30);
	text(Math.round( s3 * 100 + Number.EPSILON ) / 100, 960, 350);
	textSize(12);
	// if (playerData2){
	// text(playerData2.first_name + ' ' + playerData2.last_name, 960, 312);
	// }
}


//p5 filter

function makeDithered(img,steps) {
	   console.log(img);
  img.loadPixels();

  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      let clr = getColorAtindex(img, x, y);
      let oldR = red(clr);
      let oldG = green(clr);
      let oldB = blue(clr);
      let newR = closestStep(255, steps, oldR);
      let newG = closestStep(255, steps, oldG);
      let newB = closestStep(255, steps, oldB);

      let newClr = color(newR, newG, newB);
      setColorAtIndex(img, x, y, newClr);

      let errR = oldR - newR;
      let errG = oldG - newG;
      let errB = oldB - newB;

      distributeError(img, x, y, errR, errG, errB);
    }
  }

  img.updatePixels();
  img.resize(400,0);
}

function imageIndex(img, x, y) {
  return 4 * (x + y * img.width);
}

function getColorAtindex(img, x, y) {
  let idx = imageIndex(img, x, y);
  let pix = img.pixels;
  let red = pix[idx];
  let green = pix[idx + 1];
  let blue = pix[idx + 2];
  let alpha = pix[idx + 3];
  return color(red, green, blue, alpha);
}

function setColorAtIndex(img, x, y, clr) {
  let idx = imageIndex(img, x, y);

  let pix = img.pixels;
  pix[idx] = red(clr);
  pix[idx + 1] = green(clr);
  pix[idx + 2] = blue(clr);
  pix[idx + 3] = alpha(clr);
}

// Finds the closest step for a given value
// The step 0 is always included, so the number of steps
// is actually steps + 1
function closestStep(max, steps, value) {
  return round(steps * value / 255) * floor(255 / steps);
}



function distributeError(img, x, y, errR, errG, errB) {
  addError(img, 7 / 16.0, x + 1, y, errR, errG, errB);
  addError(img, 3 / 16.0, x - 1, y + 1, errR, errG, errB);
  addError(img, 5 / 16.0, x, y + 1, errR, errG, errB);
  addError(img, 1 / 16.0, x + 1, y + 1, errR, errG, errB);
}

function addError(img, factor, x, y, errR, errG, errB) {
  if (x < 0 || x >= img.width || y < 0 || y >= img.height) return;
  let clr = getColorAtindex(img, x, y);
  let r = red(clr);
  let g = green(clr);
  let b = blue(clr);
  clr.setRed(r + errR * factor);
  clr.setGreen(g + errG * factor);
  clr.setBlue(b + errB * factor);

  setColorAtIndex(img, x, y, clr);
}