
bombers = [] //stack for bombs, uses push and shift

function bomb(x,y,bf,cb,cbp)
{
	this.x = x; //Math.floor(x)
	this.y = y; //Math.floor(y)
	this.timeToExplode = 100; 
	this.fire = bf; //fire
	this.cb = cb; //callback
	this.cbp = cbp; //callbackparam
    
    
    this.currX = 0;
    this.CHAR_WIDTH = 26, 
	this.CHAR_HEIGHT = 32; 
    this.SPRITE_WIDTH = 6*26;
}

function bombersAdd(x,y,fire,callback,callbackParam)
{
	var nb =  new bomb(x,y,fire,callback,callbackParam); //create bomb to push
	bombers.push(nb);
	return nb;
}

function bombersUpdate() //updates bombs
{
	for(var i in bombers)
	{
		bombers[i].timeToExplode-=1; //counts down on time to explode
	}
	while((bombers.length>0) && 
			(bombers[0].timeToExplode == 0))
	{
		bombers[0].explode();   //makes them explode
		bombers.shift();
	}
    
}
function bombersCanPlace(x,y) //returns if can place bombs
{
	for(var i in bombers)
	{
		if( bombers[i].x == x &&
			bombers[i].y == y)
		{
			return false;
		}
	}
	return true;
}

function bombersPlayerCollision( x, y, vx, vy, r1, r2 ) //detects collision again with circle point
{
	var retValue = [x,y];
	var r12 = r1*r1;
	var r22 = r2*r2;
	for(var i=0;i<bombers.length; i++)
	{
		var dx = ( bombers[i].x + 0.5 - x );
		var dy = ( bombers[i].y + 0.5 - y );
		var d2 = dx*dx+dy*dy;
		if( d2>r12 && d2<r22 )
		{
			if( dx * vx > 0 ) retValue[0] = x-vx;
			if( dy * vy > 0 ) retValue[1] = y-vy;
		}
	}
	return retValue;
}

function bombersFire(x,y) 
{
	for(var i=0;i<bombers.length; i++)
	{
		if( bombers[i].x == x && //explodes bombs fire
			bombers[i].y == y)
		{
			bombers[i].explode();
			bombers.splice(i,1);
			i--;
		}
	}
}

bomb.prototype.explode = function() //adds explosion stuff
{
	if( this.cb != undefined)  //if callback undefined, use callbackparam
		this.cb(this.cbp)
	addFire(this.x,this.y,this.fire); //add fire
}