/** @type {HTMLCanvasElement} **/
	const canvas = document.getElementById("canvas1");
	const context = canvas.getContext("2d");
	//canvas.width = window.innerWidth;
	//canvas.height = window.innerHeight;

	let keyUp = false;
	let keyPressed = '';

	const normal = new Image();
	normal.src = "img/pacManNorm.PNG";
	const up = new Image();
	up.src = "img/pacManUp.PNG";
	const right = new Image();
	right.src = "img/pacManR.PNG";
	const left = new Image();
	left.src = "img/pacManL.PNG";
	const down = new Image();
	down.src = "img/pacManDown.PNG";
	let currentImage = new Image();
	currentImage.src = "img/pacManNorm.PNG";

let frameTimer = 0;

class Player{
	constructor({position, velocity}){
		this.position = position;
		this.velocity = velocity;
		this.radius = 20;
	}
//0, 2 * Math.PI
/*ovde se this odnosi na sam objekat koji napravimo s konstruktorom ispod, i s new*/
draw(){
context.beginPath();
context.arc(this.position.x, this.position.y, this.radius, 2 * Math.PI, false);
context.fillStyle = 'yellow';
context.strokeStyle = 'yellow';
context.fill();

context.stroke();
context.closePath();
}

mouth(x_center, y_center, endX, endY, endX2, endY2){

context.beginPath();
 context.moveTo(x_center, y_center);
 context.lineTo(endX, endY);
 context.lineTo(endX2, endY2);
 context.fillStyle = 'black';
 context.lineTo(x_center, y_center);
 context.strokeStyle = 'black';
 context.fill();
 context.stroke();
 context.closePath();
}
//this.pacImages = [normal, up, right, left, down];
//this.pacManIndex = 0;
moveMouth(){
		if (frameTimer % 30 == 0  || frameTimer % 30 < 5){
			//console.log("frame timer je " + frameTimer);
				return;
			}
			else{
				switch(keyPressed){
		case 'w':
		
	player.mouth(this.position.x, this.position.y, this.position.x+20, 
		this.position.y-26, this.position.x-20, this.position.y-26);
	//currentImage.src = "img/pacManDown.PNG";
	//context.drawImage(currentImage,this.position.x,this.position.y);
	break;
	case 'd':
		player.mouth(this.position.x, this.position.y, this.position.x+26, 
		this.position.y+20, this.position.x+26, this.position.y-20);
	break;
	case 'a':
	player.mouth(this.position.x, this.position.y, this.position.x-26, 
		this.position.y+20, this.position.x-26, this.position.y-20);
	break;
	case 's':
	player.mouth(this.position.x, this.position.y, this.position.x+20, 
		this.position.y+26, this.position.x-20, this.position.y+26);
	break;
}
}
}

/*pacAnimation(){
	
	if (currentImage.src == "img/pacManNorm.png"){
	
	context.drawImage(currentImage,this.position.x,this.position.y);
	}
	else this.moveMouth();
}*/


//ako ne promenimo position kako se menja brzina nista se nece ni desiti
//ovde ce velocity ili position (jer je property objekta) ako se stavi bez this biti 
//undefined,zato mora, to je rad s objektima
//moramo obnoviti frame da bi se pokrenula inace se nista ne desava
update(){
	this.draw();
	this.position.x += this.velocity.x;
	this.position.y += this.velocity.y;
		
	}

}
//kraj klase


var pellets = new Array();
var pellet;
class Pellet {

	constructor(x,y, radius){
		this.x = x;
	this.y = y;
	this.radius =radius;
	}
}
//--KRAJ KLASE Pellet--

class Rect{

constructor(x, y, height){
	this.x = x;
	this.y = y;
	this.height = height;
}
}
//--KRAJ KLASE RECT--

//--MAPA--
var arrayWall = new Array();
var rect;
class TileMap{

	constructor(tileSize){
		this.tileSize = tileSize;
		this.whiteDot = new Image();
		this.whiteDot.src = "img/yellowDot.png";
	}

//ovo je zapravo array. 1=wall, 0=putanja
map = [
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,0,0,0,0,0,1,1,0,0,0,0,0,1],
	[1,0,1,1,1,0,1,1,0,1,1,1,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,1,0,1,1,0,1,1,0,1,1,0,1],
	[1,0,1,0,1,1,0,1,1,0,1,1,0,1],
	[1,0,1,0,0,1,0,1,1,0,1,1,0,1],
	[1,0,1,0,0,1,0,1,1,0,1,1,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

//looping over our map(array)
drawTiles(){
	for(let row = 0; row < this.map.length; row++){
		for(let column = 0; column < this.map[row].length; column++){
			let tile = this.map[row][column];	

				if(tile === 1){
				var i = 0;
				context.beginPath();
				context.rect(column*60, row*60, 60, 60);
				context.fillStyle = "red";
				context.strokeStyle = 'black';
				context.fill();
				context.stroke();
				context.closePath();
				i++; 
			}/*else  if(tile === 0){
			this.tiles(context, column, row, this.tileSize);
		}	*/

		}
		}
	}



/* ---> ovde stavi za koordinate pocetne
 x:Boundary.width + Boundary.width/2, za y height,
 Boundary je njivoa klasa, kad 
zavrsis s pozicijama nacrtanih zidova*/

drawTilesWithBoundaries(){

	for(let row = 0; row < this.map.length; row++){
		for(let column = 0; column < this.map[row].length; column++){
			let tile = this.map[row][column];
			if(tile === 1){
				rect = new Rect(column * 60, row *60, 60);
				arrayWall.push(rect);
				 
			}else if(tile === 0){
			this.tiles(context, column, row, this.tileSize);
			pellet = new Pellet((column * 60)+15, (row* 60)+15, 45);
			pellets.push(pellet);
		}
		}
	}
}

drawPellets(pellet){
	context.drawImage(this.whiteDot, pellet.x, pellet.y);
	//console.log("pellet x: "+pellet.x); ovo je stalno isto, 735, ovde je greska
}

tiles(context, column, row, tileSize){
	context.drawImage(this.whiteDot, (column * this.tileSize)+rect.height/4,
	 (row * this.tileSize)+rect.height/4);
}
canvasTileSize(canvas){
	canvas.width = (this.map[0].length * this.tileSize);
	canvas.height = (this.map.length * this.tileSize);
}
drawBlank(column, row, size){
	context.fillStyle ="black";
	context.fillRect(column * this.tileSize, row*this.tileSize, this.tileSize);
}
}
//--KRAJ MAPE--

//var ghost;
class Ghost{
	constructor({position, velocity}){
		//this.x = 720;
		//this.y = 480;
		this.position = position;
		this.velocity = velocity;
		this.width = 50;
		//this.radius = 20;
		this.ghostImg = new Image();
		this.ghostImg.src = "img/ghostP1.JPG";
		this.prevCollisions = [];
	}
	/*constructor(x, y, height, width, velocityX, velocityY){
		this.x = x;
		this.y = y;
		//this.position = position;
		this.velocityX = velocityX;
		this.velocityY = velocityY;
		this.height = height;
		this.width = width;
		this.ghostImg = new Image();
		this.ghostImg.src = "img/ghostP1.JPG";
		this.prevCollisions = [];
}*/
	drawGhost(){
	//context.drawImage(this.ghostImg, this.position.x, this.position.y);
	//kvadrat
	context.beginPath();
	context.lineWidth = "2";
	context.strokeStyle = "green";
	context.rect(this.position.x, this.position.y, 50, 50);
	context.stroke();
	context.closePath();

//krug
	/*context.beginPath();
context.arc(this.position.x, this.position.y, this.radius, 2 * Math.PI, false);
context.fillStyle = 'red';
context.strokeStyle = 'red';
context.fill();

context.stroke();
context.closePath();*/
}
moveGhost(){
		this.drawGhost();
		//this.x = Math.random() * canvas.width;
		this.x --;
		//this.y = Math.random() * canvas.height;
		//this.y --;
		//da mi direction bude random od 1 do 4, i onda imam caseove za to?
		//ili da menjam direction kada udarimu nes? Ili razlicite metode za razl directi
		//random  za direction ali drzi ganekih 30 frameova
	//this.x += this.velocity;
	//this.y += this.velocity;
}
updateGhost(){
	this.drawGhost();
	this.position.x += this.velocity.x;
	this.position.y += this.velocity.y;
		
	}



}
//kraj Ghost KLASE

	//const img = new Image();
	//img.src = "img/yellowDot.png";


function ceoNiz(){
	console.log("ceo niz: "+Object.values(rect));
}


//kao tiles() samo samo za pellets preko niza Pellets
//pellet ima x, y, i radius, propertije
// pellet.x , pellet.y , pellet.radius
//isproveravaj kako radi i i DOLE U FOREACH
//function drawPellets(context){
	//context.drawImage(img, pellet.x, pellet.y);
//}

	const player = new Player({position:{x:90, y:90}, velocity: {x:0, y:0}});
	const tileSize = 60;
	const tileMap = new TileMap(tileSize);
	//x, y, height, width, velocityX, velocityY)
	//const ghost = new Ghost(725, 485, 50, 50, -2, 0);
	//const ghost = new Ghost({position: {x:210, y:390}, velocity: {x:0, y:0}});
	//const ghost = new Ghost({position: {x:725, y:485}, velocity: {x:-2, y:0}});
	//console.log("ghost: "+(ghost.position.x) +", "+(ghost.position.y));
	const ghost = new Ghost({position: {x:725, y:485}, velocity: {x:-2, y:0}});
	const ghosts =[];
	ghosts.push(ghost);
	tileMap.canvasTileSize(canvas);
	tileMap.drawTilesWithBoundaries();
	//pellets.forEach(pellet => console.log("pellets niz: "+Object.values(pellet)));
	//ghost.forEach(ghost => console.log("ghost: "+Object.values(ghost)));
	//ghost nije defined
	//console.log("arrayWall " +Object.values(arrayWall[15]));
	//console.log("array length tj. br slika : " +arrayWall.length);
	arrayWall.forEach(rect => console.log("ceo niz wall: "+Object.values(rect)));
	console.log("player y: "+player.position.y +" radius: "+player.radius);
	console.log("y-radius: "+(player.position.y - player.radius));
	console.log("pacman uslov: "+(player.position.x + player.radius + player.velocity.x));
	let ghostDirection =  '';

//on je stavio da se namestaju velocity x i y u zavisnosto od directioja koji je
//niz, koji se namesta preko boundaries, ako se sudari s granicom, stavi direction u niz
/*function ghostPath(){
	if(ghost.velocity.x == 5 && ghost.velocity.y == 0)
	{
		ghostDirection = 'right';
	}
	if(ghost.velocity.x == -5 && ghost.velocity.y == 0){
		ghostDirection = 'left';
	}
	if(ghost.velocity.x == 0 && ghost.velocity.y == -5){
		ghostDirection = 'up';
	}
	if(ghost.velocity.x == 0 && ghost.velocity.y == 5){
		ghostDirection = 'down';
	}
}*/

//napravi ovu funkciju na svoj nacin, znaci moze da return, ali da bude bez {} samo x, y
function ghostColisionWall({circle, wall}){
			return(
		/*circle.position.y - circle.radius + circle.velocity.y <= wall.y + wall.height &&
		circle.position.x + circle.radius + circle.velocity.x >= wall.x &&
		circle.position.y + circle.radius + circle.velocity.y >= wall.y &&
		circle.position.x - circle.radius + circle.velocity.x <= wall.x + wall.height);
	
	//za circle collision
		ghost.position.y - ghost.radius + ghost.velocity.y <= rect.y + rect.height &&
		ghost.position.x + ghost.radius + ghost.velocity.x >= rect.x &&
		ghost.position.y + ghost.radius + ghost.velocity.y >= rect.y &&
		ghost.position.x - ghost.radius + ghost.velocity.x <= rect.x + rect.height)
		
				/*ghost.y + ghost.velocityY + 10 <= rect.y + rect.height &&
		ghost.y + ghost.height + ghost.velocityY +10 >= rect.y &&
		ghost.x + ghost.width + ghost.velocityX +10>= rect.x &&
		ghost.x + ghost.velocityX +10<= rect.x + rect.height)
		*/
		// da satvim ovo +10 samo u height i width da je 60, a ne 50?
		//OBRACUNAJ
		ghost.position.y + ghost.velocity.y  +10<= rect.y + rect.height &&
		ghost.position.y + ghost.width + ghost.velocity.y +10 >= rect.y &&
		ghost.position.x + ghost.width + ghost.velocity.x +10>= rect.x &&
		ghost.position.x + ghost.velocity.x +10<= rect.x + rect.height)

}

function changeDirection(dir){
			switch(dir){
			case "down":
				ghost.velocity.x = 0;
				ghost.velocity.y = 2;
				break;
			case "up":
				ghost.velocity.x = 0;
				ghost.velocity.y = -2;
				break;
			case "right":
			ghost.velocity.x = 2;
				ghost.velocity.y = 0;
				break;
			case "left":
			ghost.velocity.x = -2;
				ghost.velocity.y = 0;
				break;
		}
}

//const padding = 9;
const paddingWH = -9;
//const padding = rect.height/2 - ghost.radius-1;
const padding = 4;
console.log("padding je: "+padding);
console.log("rect height: "+rect.height);
//console.log("ghost rad: "+ ghost.radius );
const velos = 3;
const pathways = ["up", "down", "left", "right"];
//const openPathways = [];
function animate(){
	requestAnimationFrame(animate);
	
	context.clearRect(0, 0, canvas.width, canvas.height);
	tileMap.drawTiles();
	
	pellets.forEach((pellet,i) => {
		tileMap.drawPellets(pellet); 
		//(pellet.radius + player.radius)
	if(
		Math.hypot(
	(pellet.x - player.position.x), (pellet.y - player.position.y))
		< player.radius +10){
		//nek ti izracunava rezultat ovoga  < pa ces videti zasto je tako - mozda jer je
	//meni veci radius za pellet, kod njega  je samo mali krug. Verovatno je to.
		pellets.splice(i, 1);
	//console.log("if je true, hipotenuza");
	//console.log("peleti length: "+pellets.length);
		}
	});

	arrayWall.forEach(rect => 
		{if(
		player.position.y - player.radius + player.velocity.y <= rect.y + rect.height &&
		player.position.x + player.radius + player.velocity.x>= rect.x &&
		player.position.y + player.radius + player.velocity.y >= rect.y &&
		player.position.x - player.radius + player.velocity.x <= rect.x + rect.height)
		{
			player.velocity.x = 0;
		player.velocity.y = 0;
		}
	});

	ghosts.forEach((ghost) => {
		//console.log("ghost: "+Object.values(ghost));
	ghost.drawGhost();
	ghost.updateGhost();
	//console.log("ghost x: "+ghost.position.x);
	//console.log("ghost y: "+ghost.position.y);

	const collisions = [];
	//ghostPath();
		arrayWall.forEach(rect => 

		{// console.log("rez: "+(ghost.y + ghost.velocityY));
		//console.log("rez rect: "+(rect.y + rect.height));
			//da li mi treba ovde velocity, on nije stavio
						/*ghost.velocityX==2 && ghost.velocityY==0 &&
		ghost.y + ghost.velocityY + 10 <= rect.y + rect.height &&
		ghost.y + ghost.height + ghost.velocityY +10 >= rect.y &&
		ghost.x + ghost.width + ghost.velocityX +10>= rect.x &&
		ghost.x + ghost.velocityX +10<= rect.x + rect.height)*/
		//posledmnja varijanta:
		/* 	ghost.position.y + velos<= rect.y + rect.height + padding &&
		ghost.position.y + ghost.width + velos>= rect.y  + paddingWH &&
		ghost.position.x + ghost.width >= rect.x  + paddingWH &&
		ghost.position.x <= rect.x + rect.height + padding */

		if(
			//ghost.velocity.x==2 && ghost.velocity.y==0 &&
			
			!collisions.includes("right") && 
	ghost.position.y <= rect.y + rect.height + padding &&
		ghost.position.y + ghost.width >= rect.y - padding  &&
		ghost.position.x + ghost.width + velos>= rect.x - padding &&
		ghost.position.x  + velos<= rect.x + rect.height + padding)
		

			/*if(
			!collisions.includes("right") && 
				ghostColisionWall({circle: {...ghost, velocity: {x:2, y:0}},
		wall:rect}))*/
		//ovaj deo ne kapiram jer daje 0 i 0
		{
			
		//console.log("ghost: "+(ghost.x) +", "+(ghost.y)+", rect: "+
			//rect.x+", "+rect.y);
			collisions.push("right");
			//console.log("right");
			
		}

		if(//ghost.velocity.x==-2 && ghost.velocity.y==0 &&
			!collisions.includes("left") && 
		ghost.position.y <= rect.y + rect.height + padding &&
		ghost.position.y + ghost.width >= rect.y  - padding  &&
		ghost.position.x + ghost.width - velos >= rect.x  - padding  &&
		ghost.position.x- velos<= rect.x + rect.height  + padding)

		/*if(!collisions.includes("left") && 
		ghostColisionWall({circle: {...ghost, velocity: {x:-2, y:0}},
		 wall:rect}))*/
		{
			collisions.push("left");
			//console.log("ghost: "+(ghost.x) +", "+(ghost.y)+", rect: "+
			//rect.x+", "+rect.y);
		
		}
		//{x:0, y:-2}
		if(
			!collisions.includes("up") && 
			ghost.position.y - velos<= rect.y + rect.height + padding &&
		ghost.position.y + ghost.width - velos>= rect.y  - padding &&
		ghost.position.x + ghost.width >= rect.x  - padding  &&
		ghost.position.x <= rect.x + rect.height  + padding)

		/*if(!collisions.includes("up") && 
		ghostColisionWall({circle: {...ghost, velocity: {x:0, y:-2}},
		 wall:rect}))*/
		{
			collisions.push("up");
			//console.log("up");
			
		}
		//{x:0, y:2}
		if(!collisions.includes("down") && 
ghost.position.y +velos<= rect.y + rect.height + padding &&
		ghost.position.y + ghost.width +velos >= rect.y - padding &&
		ghost.position.x + ghost.width >= rect.x - padding &&
		ghost.position.x <= rect.x + rect.height + padding)

		/*if(!collisions.includes("down") && 
		ghostColisionWall({circle: {...ghost, velocity: {x:0, y:2}},
		 wall:rect}))*/
		{
			collisions.push("down");
			//console.log("down");
		
		}

		//zatvorene komande u drugom forEachu
	}
	//zatvoren drugi forEach
	);

//---ODAVDE PATHWAYS LOGIKA---

		if(collisions.length > ghost.prevCollisions.length){
		ghost.prevCollisions = collisions;
		//console.log("length uslov: "+ collisions);
	}


	//ovo menja array u string
	//console.log("posle length uslov: "+ collisions);
	if(JSON.stringify(collisions) !== JSON.stringify(ghost.prevCollisions)){
		//console.log("gogo");
		//console.log("unutra uslov: "+ collisions); //zasto je ovde coll prazan?
		//console.log("prev coll:" +ghost.prevCollisions);
		if(ghost.velocity.x < 0)
		 ghost.prevCollisions.push("left");
		else if(ghost.velocity.x > 0)
			ghost.prevCollisions.push("right");
		else if(ghost.velocity.y < 0)
			ghost.prevCollisions.push("up");
		else if(ghost.velocity.y > 0)
			ghost.prevCollisions.push("down");

		//ovo => mora da bude u ravni, a ne da se preb u sl red, inace ga ne prepoznaje
		const pathways = ghost.prevCollisions.filter((collision) => {
				return !collisions.includes(collision);
			})
		console.log({pathways});
		const direction = pathways[Math.floor(Math.random() * pathways.length)];
		console.log({direction});

		switch(direction){
			case "down":
				ghost.velocity.x = 0;
				ghost.velocity.y = 2;
				break;
			case "up":
				ghost.velocity.x = 0;
				ghost.velocity.y = -2;
				break;
			case "right":
			ghost.velocity.x = 2;
				ghost.velocity.y = 0;
				break;
			case "left":
			ghost.velocity.x = -2;
				ghost.velocity.y = 0;
				break;
		}
		ghost.prevCollisions = [];
	}
		//ghost.prevCollisions = [];
	//}
			console.log(collisions);
		//zatvoren prvi forEach
	});

	player.update();
	player.moveMouth();
	frameTimer++;
}

animate();

//var setTimer0 = setInterval(player.draw,1000);
//var setTimer0 = setInterval(player.moveMouth,1000);

/* -listener za kretanje Pacmana
-ne mora window object da se pise
key je u viticastim zagradama da se ne pise preko event-a (event.key), (deconstruct 
the object), da nam ne bi vracalo bukvalno sve podatke o elementu, cleaner code
*/

window.addEventListener('keydown', ({key}) => {
	switch(key){
	case 'w':
	player.velocity.y = -5;
	keyPressed = 'w';
	keyUp = false;
	console.log('w pritisnuto');
	break;
	case 'a':
	player.velocity.x = -5;
	keyPressed = 'a';
	keyUp = false;
	console.log('a pritisnuto');
	break;
	case 'd':
	player.velocity.x = 5;
	keyPressed = 'd';
	keyUp = false;
	console.log('d pritisnuto');
	break;
	case 's':
	player.velocity.y = 5;
	keyPressed = 's';
	keyUp = false;
	console.log('s pritisnuto');
	break;
}

});

window.addEventListener('keyup', ({key}) => {
	switch(key){
	case 'w':
	keyUp = true;
	player.velocity.y = 0;
	console.log('w pritisnuto');
	break;
	case 'a':
	keyUp = true;
	player.velocity.x = 0;
	console.log('a pritisnuto');
	break;
	case 'd':
	keyUp = true;
	player.velocity.x = 0;
	console.log('d pritisnuto');
	break;
	case 's':
	keyUp = true;
	player.velocity.y = 0;
	console.log('s pritisnuto');
	break;
}

});



//player.update();

function background(){

	context.save();
	context.strokeStyle = "blue"
	context.lineWidth = "35";
	context.lineCap = "round";


/*leva*/
	context.beginPath();
	context.moveTo(30, 30);
	context.lineTo(30, ((canvas.height) - 30));
	context.stroke();


/*desna*/
	context.beginPath();
	context.moveTo((canvas.width) - 30, 30);
	context.lineTo((canvas.width) - 30, ((canvas.height) - 30));
	context.stroke();

/*gornja*/
	context.beginPath();
	context.moveTo(30, 30);
	context.lineTo((canvas.width) - 30, 30);
	context.stroke();

/*donja leva*/
	context.beginPath();
	context.moveTo(30, (canvas.height) - 30);
	context.lineTo((canvas.width/4), (canvas.height) - 30);
	context.stroke();

/*donja desna*/
	context.beginPath();
	context.moveTo((canvas.width) -30, (canvas.height) - 30);
	context.lineTo((canvas.width) -(canvas.width/4), (canvas.height) - 30);
	context.stroke();

/*donja sama*/
	context.beginPath();
	context.moveTo((canvas.width/2) -(canvas.width/9), (canvas.height) - 30);
	context.lineTo((canvas.width/2) +(canvas.width/9), (canvas.height) - 30);
	context.stroke();

/*SREDNJE LINIJE*/
context.beginPath();
/*u sredini*/
	context.moveTo((canvas.width/2), 30);
	context.lineTo((canvas.width/2), (canvas.height/5));
	context.stroke();

/*leva srednja*/
	context.beginPath();
	context.moveTo((canvas.width/7), (canvas.height/5));
	context.lineTo((canvas.width/7) +(canvas.width/4), (canvas.height/5));
	context.stroke();

/*desna srednja*/
	context.beginPath();
	context.moveTo(canvas.width -(canvas.width/7), (canvas.height/5));
	context.lineTo((canvas.width/2) +(canvas.width/9), (canvas.height/5));
	context.stroke();

/*1980*/
	context.beginPath();
	context.moveTo((canvas.width/7), (canvas.height/2)-80);
	context.lineTo((canvas.width/7), (canvas.height/2)+160);
	context.stroke();

/*9 - - gornja horizontalna*/
	context.beginPath();
	context.moveTo((canvas.width/7) +(canvas.width/8), (canvas.height/2)-80);
	context.lineTo((canvas.width/7) +(canvas.width/4), (canvas.height/2)-80);
	context.stroke();
/*9 - |*/
	context.beginPath();
	context.moveTo((canvas.width/7) +(canvas.width/4), (canvas.height/2)-80);
	context.lineTo((canvas.width/7) +(canvas.width/4), (canvas.height/2)+160);
	context.stroke();

/*9 - | manja vertikalna*/
	context.beginPath();
	context.moveTo((canvas.width/7) +(canvas.width/8), (canvas.height/2)-80);
	context.lineTo((canvas.width/7) +(canvas.width/8), (canvas.height/2)+40);
	context.stroke();
/*9 - _ donja horizontalna*/
	context.beginPath();
	context.moveTo((canvas.width/7) +(canvas.width/8), (canvas.height/2)+40);
	context.lineTo((canvas.width/7) +(canvas.width/4), (canvas.height/2)+40);
	context.stroke();

/*8 - - gornja horizontalna
canvas.width -(canvas.width/7), (canvas.height/5));
	context.lineTo((canvas.width/2) +(canvas.width/9), (canvas.height/5)) */
	context.beginPath();
	context.moveTo(canvas.width - (canvas.width/3), (canvas.height/2)-80);
	context.lineTo((canvas.width/2) + (canvas.width/26), (canvas.height/2)-80);
	context.stroke();
/*8 - | leva vertikalna*/
	context.beginPath();
	context.moveTo((canvas.width/2) + (canvas.width/26), (canvas.height/2)-80);
	context.lineTo((canvas.width/2) +(canvas.width/26), (canvas.height/2)+160);
	context.stroke();

/* za sredisnje, (canvas.height/2)-80);
	context.lineTo(canvas.width - 430, (canvas.height/2)+40);
*/
	context.beginPath();
	context.moveTo(canvas.width - (canvas.width/3), (canvas.height/2)+40);
	context.lineTo((canvas.width/2) + (canvas.width/26), (canvas.height/2)+40);
	context.stroke();


/*8 - | desna vertikalna*/
	context.beginPath();
	context.moveTo(canvas.width - (canvas.width/3), (canvas.height/2)-80);
	context.lineTo(canvas.width - (canvas.width/3), (canvas.height/2)+160);
	context.stroke();
/*8 - _ donja horizontalna*/
	context.beginPath();
	context.moveTo(canvas.width - (canvas.width/3), (canvas.height/2)+160);
	context.lineTo((canvas.width/2) + (canvas.width/26), (canvas.height/2)+160);
	context.stroke();


/*0*/
/*0 - - gornja horizontalna
	context.moveTo(canvas.width -(canvas.width/7), (canvas.height/5));
	context.lineTo((canvas.width/2) +(canvas.width/9), (canvas.height/5)); */
	context.beginPath();
	context.moveTo(canvas.width -(canvas.width/9), (canvas.height/2)-80);
	context.lineTo((canvas.width) - (canvas.width/4), (canvas.height/2)-80);
	context.stroke();
/*0 - | leva vertikalna*/
	context.beginPath();
	context.moveTo((canvas.width/2) + (canvas.width/4), (canvas.height/2)-80);
	context.lineTo((canvas.width/2) + (canvas.width/4), (canvas.height/2)+160);
	context.stroke();


/*0 - | desna vertikalna*/
	context.beginPath();
	context.moveTo(canvas.width -(canvas.width/9), (canvas.height/2)-80);
	context.lineTo(canvas.width -(canvas.width/9), (canvas.height/2)+160);
	context.stroke();
/*0 - _ donja horizontalna*/
	context.beginPath();
	context.moveTo(canvas.width -(canvas.width/9), (canvas.height/2)+160);
	context.lineTo((canvas.width/2) + (canvas.width/4), (canvas.height/2)+160);
	context.stroke();




	context.restore();

/*CRNE LINIJE*/
	context.save();

	context.strokeStyle = "black"
	context.lineWidth = "20";
	context.lineCap = "round";

/*leva*/
	context.beginPath();
	context.moveTo(30, 30);
	context.lineTo(30, ((canvas.height) - 30));
	context.stroke();


/*desna*/
	context.beginPath();
	context.moveTo((canvas.width) - 30, 30);
	context.lineTo((canvas.width) - 30, ((canvas.height) - 30));
	context.stroke();

/*gornja*/
	context.beginPath();
	context.moveTo(30, 30);
	context.lineTo((canvas.width) - 30, 30);
	context.stroke();

/*donja leva*/
	context.beginPath();
	context.moveTo(30, (canvas.height) - 30);
	context.lineTo((canvas.width/4), (canvas.height) - 30);
	context.stroke();

/*donja desna*/
	context.beginPath();
	context.moveTo((canvas.width) -30, (canvas.height) - 30);
	context.lineTo((canvas.width) -(canvas.width/4), (canvas.height) - 30);
	context.stroke();

/*donja sama*/
	context.beginPath();
	context.moveTo((canvas.width/2) -(canvas.width/9), (canvas.height) - 30);
	context.lineTo((canvas.width/2) +(canvas.width/9), (canvas.height) - 30);
	context.stroke();

/*SREDNJE LINIJE*/

context.beginPath();
	context.moveTo((canvas.width/2), 30);
	context.lineTo((canvas.width/2), (canvas.height/5));
	context.stroke();

/*leva srednja*/
	context.beginPath();
	context.moveTo((canvas.width/7), (canvas.height/5));
	context.lineTo((canvas.width/7) +(canvas.width/4), (canvas.height/5));
	context.stroke();

/*desna srednja*/
	context.beginPath();
	context.moveTo(canvas.width -(canvas.width/7), (canvas.height/5));
	context.lineTo((canvas.width/2) +(canvas.width/9), (canvas.height/5));
	context.stroke();

/*1980*/
	context.beginPath();
	context.moveTo((canvas.width/7), (canvas.height/2)-80);
	context.lineTo((canvas.width/7), (canvas.height/2)+160);
	context.stroke();

/*9 - - gornja horizontalna*/
	context.beginPath();
	context.moveTo((canvas.width/7) +(canvas.width/8), (canvas.height/2)-80);
	context.lineTo((canvas.width/7) +(canvas.width/4), (canvas.height/2)-80);
	context.stroke();
/*9 - |*/
	context.beginPath();
	context.moveTo((canvas.width/7) +(canvas.width/4), (canvas.height/2)-80);
	context.lineTo((canvas.width/7) +(canvas.width/4), (canvas.height/2)+160);
	context.stroke();

/*9 - | manja vertikalna*/
	context.beginPath();
	context.moveTo((canvas.width/7) +(canvas.width/8), (canvas.height/2)-80);
	context.lineTo((canvas.width/7) +(canvas.width/8), (canvas.height/2)+40);
	context.stroke();
/*9 - _ donja horizontalna*/
	context.beginPath();
	context.moveTo((canvas.width/7) +(canvas.width/8), (canvas.height/2)+40);
	context.lineTo((canvas.width/7) +(canvas.width/4), (canvas.height/2)+40);
	context.stroke();

/*8 - - gornja horizontalna
canvas.width -(canvas.width/7), (canvas.height/5));
	context.lineTo((canvas.width/2) +(canvas.width/9), (canvas.height/5)) */
	context.beginPath();
	context.moveTo(canvas.width - (canvas.width/3), (canvas.height/2)-80);
	context.lineTo((canvas.width/2) + (canvas.width/26), (canvas.height/2)-80);
	context.stroke();
/*8 - | leva vertikalna*/
	context.beginPath();
	context.moveTo((canvas.width/2) + (canvas.width/26), (canvas.height/2)-80);
	context.lineTo((canvas.width/2) +(canvas.width/26), (canvas.height/2)+160);
	context.stroke();

/* za sredisnje, (canvas.height/2)-80);
	context.lineTo(canvas.width - 430, (canvas.height/2)+40);
*/
	context.beginPath();
	context.moveTo(canvas.width - (canvas.width/3), (canvas.height/2)+40);
	context.lineTo((canvas.width/2) + (canvas.width/26), (canvas.height/2)+40);
	context.stroke();


/*8 - | desna vertikalna*/
	context.beginPath();
	context.moveTo(canvas.width - (canvas.width/3), (canvas.height/2)-80);
	context.lineTo(canvas.width - (canvas.width/3), (canvas.height/2)+160);
	context.stroke();
/*8 - _ donja horizontalna*/
	context.beginPath();
	context.moveTo(canvas.width - (canvas.width/3), (canvas.height/2)+160);
	context.lineTo((canvas.width/2) + (canvas.width/26), (canvas.height/2)+160);
	context.stroke();


/*0*/
/*0 - - gornja horizontalna
	context.moveTo(canvas.width -(canvas.width/7), (canvas.height/5));
	context.lineTo((canvas.width/2) +(canvas.width/9), (canvas.height/5)); */
	context.beginPath();
	context.moveTo(canvas.width -(canvas.width/9), (canvas.height/2)-80);
	context.lineTo((canvas.width) - (canvas.width/4), (canvas.height/2)-80);
	context.stroke();
/*0 - | leva vertikalna*/
	context.beginPath();
	context.moveTo((canvas.width/2) + (canvas.width/4), (canvas.height/2)-80);
	context.lineTo((canvas.width/2) + (canvas.width/4), (canvas.height/2)+160);
	context.stroke();


/*0 - | desna vertikalna*/
	context.beginPath();
	context.moveTo(canvas.width -(canvas.width/9), (canvas.height/2)-80);
	context.lineTo(canvas.width -(canvas.width/9), (canvas.height/2)+160);
	context.stroke();
/*0 - _ donja horizontalna*/
	context.beginPath();
	context.moveTo(canvas.width -(canvas.width/9), (canvas.height/2)+160);
	context.lineTo((canvas.width/2) + (canvas.width/4), (canvas.height/2)+160);
	context.stroke();

	context.restore();
}
//window.addEventListener("load", background);