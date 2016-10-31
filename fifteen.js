window.onload = function(){
	var solvedleft = new Array();//array to store the solved x positions
	var solvedtop = new Array();//array to store the solved y positions

	var blankx = "300px";//x position of blank block
	var blanky = "300px";//y position of blank block

	var puzzArea = $$("div#puzzlearea div");//capture the array of divs in the puzzle area
	var shuffButton = $("shufflebutton");//capture the shuffle button
	var header = document.body.children[0];//capture header element

//################## S E T - U P - G R I D - A N D - E V E N T - L I S T E N E R S ##################//

	var j=0;//column counter
	var k=0;//row counter
	var i=0;//loop iterator
		
	for(i=0;i<puzzArea.length;i++){
		puzzArea[i].addClassName("puzzlepiece");//add puzzle piece class to each div element in the puzzle area
			
		puzzArea[i].style.backgroundPosition = "" + (j*100*-1) + "px " + (k*100*-1) + "px";//shift background image relative to x and y axis position
			
		puzzArea[i].style.left="" + (j*100) + "px";//set x axis position
		solvedleft.push(puzzArea[i].style.left);//populate the x axis array for checking if solved
		puzzArea[i].style.top="" + (k*100) + "px";//set y axis position
		solvedtop.push(puzzArea[i].style.top);//populate the y axis array for checking if solved
			
		j++;//increment x axis position
		if(j>3){
			k+=1;//incrememnt y axis position when x get to the end of row
			j=0;//reset x axis counter in new row
		}

		(function(){
			var pos = i;
			//add on click event listener for moving a block
			puzzArea[i].addEventListener("click",function(){move(pos);},false);
			//add on mouse over event listener for movable blocks
			puzzArea[i].addEventListener("mouseover",function(){isMovable(pos);},false);
		}());
	}

	//add on click event listener for shuffle button
	shuffButton.addEventListener("click",function(){shuffle();},false);
	
//#################################### S E T - U P - E N D E D ####################################//

	function isMovable(pos){
		if(puzzArea[pos].style.left == blankx || puzzArea[pos].style.top == blanky){//check if block is in same row or column as blank space in the grid
			//check if the current block is in direct proximity to the blank space
			if(Math.abs(blankx.substring(0,blankx.length-2) - (puzzArea[pos].style.left.substring(0,puzzArea[pos].style.left.length-2)))==100 ||
		   	   Math.abs(blanky.substring(0,blanky.length-2) - (puzzArea[pos].style.top.substring(0,puzzArea[pos].style.top.length-2)))==100)
			{
				puzzArea[pos].addClassName('movablepiece');//assign class to blocks with a valid move
				return true;
			}
		}
	}

	function move(pos){
		//swap the blank space position and the current block position
		if(isMovable(pos)){
			var tempx = blankx;
			var tempy = blanky;
			blankx = puzzArea[pos].style.left;
			blanky = puzzArea[pos].style.top;
			puzzArea[pos].style.left = tempx;
			puzzArea[pos].style.top = tempy;
			for(var i=0;i<puzzArea.length;i++){
				puzzArea[i].removeClassName('movablepiece');
			}
		}
		//check if the puzzle has been solved
		if(isSolved()){
			for(i=0;i<puzzArea.length;i++)
			{
				puzzArea[i].style.backgroundImage = "url('background2.png')";//set image for solved puzzle
				puzzArea[i].style.backgroundSize = "400px 400px";//set image size to size of grid
				puzzArea[i].style.borderColor = "#009933";//set border color to green
			}
			header.innerHTML =  "<h1>YOU SOLVED IT!</h1>";//change header element to display victory message
			header.style.fontSize = "14pt";//reset original message font size
			header.style.color = "#009933";//change header element font color
			header.style.fontFamily = "cursive";//change header element font color
		}
	}

	var options = new Array();//array for blocks with valid moves
	var opt=0;//option randomly generated

	function shuffle(){
		for(var j=0;j<1000;j++){
			for(var i=0;i<puzzArea.length;i++){
				if(isMovable(i)){
					options.push(i);//store the current valid block position in array		
				}
			}
			opt=options[Math.floor((Math.random()*options.length)+0)];//randomly select a block from the valid array
			move(opt);//move random valid block
		}
		for(var i=0;i<puzzArea.length;i++)
		{
			puzzArea[i].style.backgroundImage = "url('background.jpg')";//reset image for unsolved puzzle
			puzzArea[i].style.borderColor = "black";//set border color to black
			puzzArea[i].style.backgroundSize = "400px 400px";//set image size to size of grid
		}
		document.body.children[0].innerHTML =  "<h1>CSE 190 M Fifteen Puzzle</h1>";//reset original message
		header.style.fontSize = "14pt";//reset original message font size
		header.style.color = "black";//reset original message colour
		header.style.fontFamily = "cursive";//change header element font color
	}

	function isSolved(){
		for(var i=0;i<puzzArea.length;i++){
			if(puzzArea[i].style.left!=solvedleft[i] || puzzArea[i].style.top!=solvedtop[i]){
				return false;
			}
		}
		return true;
	}
	shuffle();//shuffle puzzle at start
};