function fire(x,y,maxExtension)
{
	this.x = x;
	this.y = y;
	this.maxExtension = maxExtension; //make extension fire can go
	this.currExtension = 0;
	// positionX,positionY,type: -1 center, 0 up, 1 down, 2 right, 3 left
	this.cellFired = [[x,y,-1]];
	this.validDirex = [ true,true,true,true ];
	this.timeToNextStep = 2;
	m1.FireCell(x,y);
}

fire.prototype.update = function() //checks if need to update
{
	this.timeToNextStep--;
	if( this.timeToNextStep>0 ) return false;
	this.timeToNextStep	= 2;
	if( this.currExtension < this.maxExtension ) //if not reached max amount of length a fire can be
	{
		this.currExtension++;
		var directions = [[0,-1],[0,1],[1,0],[-1,0]]; //directions to check
		var nInvalid = 0;
		for(var i=0;i<4;i++) //checks all 4 squares around the place it was put
		{
			if( this.validDirex[i] )
			{ 
				var ny = this.y+directions[i][1]*this.currExtension;
				var nx = this.x+directions[i][0]*this.currExtension;
				var nearCell = 1;
				if( ny>=0 && ny<m1.cells.length &&
					nx>=0 && nx<m1.cells[0].length)
						nearCell = m1.cells[ny][nx];
				if( nearCell != 0 ||  //if not an empty cell
					!bombersCanPlace(nx,ny) || //if can't place
					!firesCanPlace(nx,ny)) //if fires can't be placed, direction we checked is not valid
					this.validDirex[i] = false;
				if( nearCell != 1 )
				{
                    
					this.cellFired.push([nx,ny,i]);
					// check content of cell: bomb, wall (with bonus?), player
					bombersFire(nx,ny);
					m1.FireCell(nx,ny);
				}
			} else
				nInvalid++;
		}
		if(nInvalid == 4 ) 
			this.currExtension = this.maxExtension;
		return false;
	}
	return true;
}

allFires = []; //stack of fires
function addFire(x,y,maxExtension)
{
	allFires.push( new fire(x,y,maxExtension) ); //push new fire onto all fires
}

function updateFire() //update allFires
{
	for(var i=0;i<allFires.length;i++)
	{
		if( allFires[i].update() )
		{
			allFires.splice(i,1);
			i--;
		}
	}
}

function firesCanPlace(x,y) //checks if can place fire
{
	for(var i=0;i<allFires.length;i++)
	{
		for(var j=0;j<allFires[i].cellFired.length;j++)
		{
			if( allFires[i].cellFired[j][0] == x &&
				allFires[i].cellFired[j][1] == y)
			{
				return false;
			}
		}
	}
	return true;
}