// 0	empty
// 1	indestructible wall
// 2	destructible wall
// <-1	bonuses
// -1 +bomb
// -2 +fire
function map()
{

    this.cells = [];
	with(this)
	{
		//destructable
		for(var i=0;i<11;i++)
		{
			cells.push([]); //set to nothing for default
			for(j=0;j<13;j++)
				cells[i].push(2); //push descructable wall
		}
		//indestructible
		for(var i=1;i<11;i+=2)
			for(var j=1;j<13;j+=2)
				cells[i][j] = 1; //set ro indestructible
		
        // 4 spawn areas
		cells[0][0] = 0;
		cells[0][1] = 0;
		cells[1][0] = 0;
		cells[10][12] = 0;
		cells[10][11] = 0;
		cells[9][12] = 0;
		cells[0][12] = 0;
		cells[0][11] = 0;
		cells[1][12] = 0;
		cells[10][0 ] = 0;
		cells[10][1] = 0;
		cells[9][0] = 0;
        
		// remove a random area, so map changes on every new start
		for(var i = 0; i<20;i++) 
		{
			x = Math.floor( Math.random() * 12 );
			y = Math.floor( Math.random() * 11 );
			if( cells[y][x] == 2 ) //check make sure destructable wall that we're moving
				cells[y][x] = 0;
		}
	}
}


function circlePointCollision(nx,ny,x,y,r,r2) //http://cgp.wikidot.com/circle-to-circle-collision-detection
{
	var dx = (x-nx); //point position comparing two x and ys
	var dy = (y-ny);
	var d2 = dx*dx+dy*dy; 
	if( d2 < r2 )  // distance between the 2 points and then compare it to the combined radii
    {
		var f = r/Math.sqrt(d2);
		dx*= f;
		dy*= f;
		nx = x-dx;
		ny = y-dy;
	}
	return [nx,ny];
}


map.prototype.circleCollision = function(px,py,r) //point x, y, rad
{
	var pxi = [ Math.floor( px-r ), Math.ceil( px+r ) ];
	var pyi = [ Math.floor( py-r ), Math.ceil( py+r ) ];
	var nx = px;
	var ny = py;
	var r2 = r*r;
	for(var x=pxi[0]; x<=pxi[1]; x++)
	{
		for(var y=pyi[0]; y<=pyi[1]; y++)
		{
			var w = 0;
			if( x>=0 && x<this.cells[0].length &&
				y>=0 && y<this.cells.length)
				{
					w = this.cells[y][x];
				}
				else
					w = 1;
			if( w > 0 )
			{
				//edge collision
				if( ny>=y && ny<=(y+1)) 
				{
					if( (nx+r)>x && (nx<x) ) nx = x-r;
					if( (nx-r)<(x+1) && (nx>(x+1)) ) nx = x+1+r;
				}
				if( nx>=x && nx<=(x+1)) 
				{
					if( (ny+r)>y && (ny<y) ) ny = y-r;
					if( (ny-r)<(y+1) && (ny>(y+1)) ) ny = y+1+r;
				}
				//corner collision
				if( nx<x && ny<y)
				{
					var ret = circlePointCollision(nx,ny,x,y,r,r2);
					nx = ret[0];
					ny = ret[1];
				}
				if( nx>x+1 && ny<y)
				{
					var ret = circlePointCollision(nx,ny,x+1,y,r,r2);
					nx = ret[0];
					ny = ret[1];
				}
				if( nx<x && ny>y+1)
				{
					var ret = circlePointCollision(nx,ny,x,y+1,r,r2);
					nx = ret[0];
					ny = ret[1];
				}
				if( nx>x+1 && ny>y+1)
				{
					var ret = circlePointCollision(nx,ny,x+1,y+1,r,r2);
					nx = ret[0];
					ny = ret[1];
				}
			}
						
		}
	}	
	return [nx,ny];
}

map.prototype.checkWallCollision = function(px,py)
{
	var pxi = [ Math.floor( px ), 
				Math.ceil( px ) ]; //round down, round up
	var pyi = [ Math.floor( py ),
				Math.ceil( py ) ]; //round down, round up
	for(var x=pxi[0]; x<=pxi[1]; x++)
	{
		if( x<0 )
			return true; //if reached left wall
		if( x>=this.cells[0].length )
			return true; //if reached right wall
		for(var y=pyi[0]; y<=pyi[1]; y++)
		{
			if( y<0 )
				return true; //if reached top 
			if( y>=this.cells.length )
				return true; //if reached bottom
			
			if( this.cells[y][x] > 0 ) //if not an empty space
				return true;
		}
	}
	return false;
}

map.prototype.checkEmptyBoard = function()
{ //function checks if board is empty
    
    for(var i=0; i<this.cells.length; i++)
	{
        for(var j=0; j<this.cells[i].length; j++)
		{
            if(this.cells[i][j] != 0)
				return false;
        }
    }
    
    return true;
}

map.prototype.FireCell = function(x,y) 
{
	if(this.cells[y][x] == 2) //if destructable wall
	{
        
        player.score++;
		var v = Math.random();
		if( v<0.5 )
			this.cells[y][x] = 0; //set to empty space
		else if( v<0.75 )
			this.cells[y][x] = -1; //set to bomb
		else 
			this.cells[y][x] = -2; //set to fire 
	} else
	if(this.cells[y][x] <0) //get rid of fire and bomb, set to empty
	{
        
		this.cells[y][x] = 0;
	}
}