$(document).ready(function ()
{
	var x = document.getElementById('grid');
	score = 0;
	start = false;
	winner = false;
	loser = false;
	
	x.style.top =  "10px";
	
	document.getElementById("score").innerHTML = score;
	document.getElementById("16").innerHTML = 2;
	document.getElementById("11").innerHTML = 2;


	$(document).keydown(function(key)
	{	
	
		if(start == true)						//prevents game from starting without pressing the new game button
		{
			key.preventDefault();
			
			if(checkLeft() == false && checkRight() == false && checkUp() == false && checkDown() == false)
			{
				console.log("its over")
				loss();
		
			}
			else if(win() == false && loser == false)
			{
				var keycode = parseInt(key.which, 10);
				if(keycode == 37 && checkLeft() == true)
				{
					moveLeft();
					changeColor();
					createBox();
				}
				else if(keycode == 38 && checkUp() == true)
				{
					moveUp();
					changeColor();
					createBox();
				}
				else if(keycode == 39 && checkRight() == true)
				{
					moveRight();
					changeColor();
					createBox();
				}
				else if(keycode == 40 && checkDown() == true)
				{
					moveDown();
					changeColor();
					createBox();
				}
			}
		}	
	});
	
	
}); 


function moveLeft()
{
	for(var i = 1; i < 17; i++)
	{
		var current = document.getElementById(String(i));
		if(parseInt(current.innerHTML) %2 ==0)
		{
			var counter = i;
			
			while((counter-1) != 12 && (counter-1) != 8 && (counter-1) != 4 && (counter-1) != 0)
			{
				var prev = document.getElementById(String(counter-1));
				current = document.getElementById(String(counter));
				
				if(prev.innerHTML != current.innerHTML && prev.innerHTML != "")
				{
					break;
				}
				else if(prev.innerHTML == current.innerHTML)
				{
					current.innerHTML = parseInt(current.innerHTML)*2;
					prev.innerHTML = "";
					score += parseInt(current.innerHTML);
					document.getElementById("score").innerHTML = score;
				}
				var temp = prev.innerHTML;
				prev.innerHTML = current.innerHTML;
				current.innerHTML = temp;
				counter-=1;
				
			}
		}
	}			
}
	


function moveUp()
{

		for(var i = 5; i < 17; i++) //loops through all the boxes on the grid
		{
			var current = document.getElementById(String(i));
			var counter = i;										//counter to check if we can move number and not go outside
		
			if(parseInt(current.innerHTML) % 2 == 0)				//checks if the innerHTML of the box has a number 
			{
				while(counter > 4)
				{
					current = document.getElementById(String(counter));
					var top = document.getElementById(String(counter-4));
					
					if(current.innerHTML == top.innerHTML)
					{
						current.innerHTML = parseInt(current.innerHTML)*2;
						top.innerHTML = "";
						score += parseInt(current.innerHTML);
						document.getElementById("score").innerHTML = score;
					}
					else if(current.innerHTML != top.innerHTML && top.innerHTML != "")
					{
						break;
					}
					var temp = top.innerHTML;
					top.innerHTML = current.innerHTML;
					current.innerHTML = temp;
					counter -=4;
				}
			}
		}
}


function moveRight()
{
	

	for(var i = 15; i > 0; i--) //loops through all the boxes on the grid
	{
		var current = document.getElementById(String(i));
		var counter = i;

		if(parseInt(current.innerHTML)%2 == 0)
		{	

			while((counter+1) != 17 && (counter+1) != 13 && (counter+1) != 9 && (counter+1) !=5)
			{

				var next = document.getElementById(String(counter+1));
				current = document.getElementById(String(counter));
				
				if(current.innerHTML == next.innerHTML)
				{
					current.innerHTML = parseInt(current.innerHTML)*2;
					next.innerHTML = "";
					score += parseInt(current.innerHTML);
					document.getElementById("score").innerHTML = score;
				}
				else if(current.innerHTML != next.innerHTML && next.innerHTML != "")
				{
					break;
				}
				var temp = next.innerHTML;
				next.innerHTML = current.innerHTML;
				current.innerHTML = temp;
				counter+=1;
			}
			
		}
		
	}

}
function win()
{
	if(winner == 0)
	{
		for(var i = 1; i < 17; i++)
		{
			var box = document.getElementById(String(i));
			if(parseInt(box).innerHTML == 2048)
			{
				winner = true;
				return true;
			}
		}
	return false;
	}
}

function loss()
{
	if(loser == false)
	{
		loser= true;
		var elem = "<h2 id='gameOver'>Game Over</h2";
		$("#view").append(elem);
		setTimeout(function() { $("#gameOver").animate({"left" : "-=72%"},"slow"); }, 1000);
		setTimeout(function() {$("#gameOver").animate({"font-size" : "+=20pt"}, "slow")}, 3500);
		setTimeout(function() {$("#gameOver").animate({"font-size" : "-=20pt"}, "slow")}, 3500);
		setTimeout(function() {$("#gameOver").hide()}, 3500);
		
	}

}

function moveDown()
{
	for(var i = 12; i > 0; i--)
	{
		var current = document.getElementById(String(i));
		
		if(parseInt(current.innerHTML) %2== 0)
		{
			var counter = i;
			
			while((counter != 16) && (counter != 15) && (counter != 14) && (counter != 13))
			{
				current = document.getElementById(String(counter));
				var below = document.getElementById(String(counter+4));
				
				if(below.innerHTML == current.innerHTML)
				{
					current.innerHTML = parseInt(current.innerHTML)*2;
					below.innerHTML = "";
					score += parseInt(current.innerHTML);
					document.getElementById("score").innerHTML = score;
				}
				else if(below.innerHTML != current.innerHTML && below.innerHTML != "")
				{
					break;
				}
				var temp = below.innerHTML;
				below.innerHTML = current.innerHTML;
				current.innerHTML = temp;
				
				counter += 4;	
			}
			
		}
	}
}

function changeColor()
{
	for(var i = 1; i < 17; i++)										//updates the color of the numbers when they change or are created
	{
		var x = document.getElementById(String(i));
		var y = document.getElementById(String((i+16)));
		
		if(x.innerHTML == "4")
		{
			y.style.backgroundColor = "#d7c193";
			
		}
		else if(x.innerHTML == "8")
		{
			y.style.backgroundColor = "#ff9a00"
			x.style.color = "white"
		}
		else if(x.innerHTML == "16")
		{
			y.style.backgroundColor = "orange";
			x.style.color = "white";
		}
		else if(x.innerHTML == "32")
		{
			y.style.backgroundColor = "#ff4100";
			x.style.color = "white";
		}
		else if(x.innerHTML == "64")
		{
			y.style.backgroundColor = "#ff1f00";
			x.style.color = "white";
		}
		else if(x.innerHTML == "128")
		{
			y.style.backgroundColor = "#ffb300";
			x.style.color = "white";
		}
		else if(x.innerHTML == "256")
		{
			y.style.backgroundColor = "#cbce00";
			x.style.color = "white";
		}
		else if(x.innerHTML == "512")
		{
			y.style.backgroundColor = "#92e016"
			x.style.color = "white"
		}
		else if(x.innerHTML == "1024")
		{
			y.style.backgroundColor = "#d2e036";
			x.style.color = "white";
		}
		else 
		{
			y.style.backgroundColor = "#b9b9b9";
			x.style.color = "black";
		}
		
	}
}

function createBox()													//creates a new number in a box at each move
{
	var choices = new Array();
	for(var i = 1; i < 17; i++)
	{
		if(document.getElementById(String(i)).innerHTML == "")
		{
			choices.push(i);
		}
	}
	
	var rand = (Math.random()*choices.length);
	rand = Math.floor(rand);
	document.getElementById(String(choices[rand])).innerHTML = 2;

}

function newGame()
{
	console.log("Starting new Game");
	
	for(var i = 1; i < 17; i++)
	{
		var y = document.getElementById(String(i+16));
		document.getElementById(String(i)).innerHTML = "";
		document.getElementById(String(i)).style.color = "black"
		y.style.backgroundColor = "#b9b9b9";
	}
	if(loser == true)
	{
		$("#gameOver").remove();
	}
	loser = false;
	winner = false;
	start = true;
	score = 0;
	
	document.getElementById("16").innerHTML = 4;
	document.getElementById("11").innerHTML = 2;
	document.getElementById("score").innerHTML = score;
	
}

function checkLeft()														//checks if there is a possible move to the left
{
	for(var i=16; i > 0;i--)
	{
		var current = document.getElementById(String(i));
		var previous = document.getElementById(String(i-1));
		
		if(i == 1 || i == 5 || i == 9 || i == 13)
		{
			continue;
		}
		else
		{
			if((current.innerHTML == previous.innerHTML && current.innerHTML != "") || (current.innerHTML != "" && previous.innerHTML == ""))
			{
				return true;
			}
		}
	
	}
	return false;
}

function checkRight()
{
	for(var i= 1; i < 17; i++)
	{
		var current = document.getElementById(String(i));
		var next = document.getElementById(String(i+1));
		
		if(i == 4 || i == 8 || i == 12 || i == 16)
		{
			continue;
		}
		else
		{
			if((current.innerHTML == next.innerHTML && current.innerHTML != "") || (current.innerHTML != "" && next.innerHTML == ""))
			{
				return true;
			}
		}
	}
	return false;
}

function checkUp()
{
	for(var i = 16; i > 4; i--)
	{
		var current = document.getElementById(String(i));
		var top = document.getElementById(String(i-4));
		
		if((current.innerHTML == top.innerHTML && current.innerHTML != "") || (current.innerHTML != "" && top.innerHTML == ""))
		{
			return true;
		}
	
	}
	return false;
}

function checkDown()
{
	for(var i = 1; i < 13; i++)
	{
		var current = document.getElementById(String(i));
		var down = document.getElementById(String(i+4));
		
		if((current.innerHTML == down.innerHTML && current.innerHTML != "")||(current.innerHTML != "" && down.innerHTML == ""))
		{
			return true;
		}
	}
	return false;
}