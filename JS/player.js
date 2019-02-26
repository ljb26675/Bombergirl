function player(id,x,y)
{
	this.id = id;
	this.x = Math.floor(x)*10;
	this.y = Math.floor(y)*10;
	this.placedBomb = 0;
	this.carriedBomb = 1;
	this.bombFire = 1;
	this.dead = false;
    this.score = 0;
    this.total = 0;
    
    this.start = new Date();
}

player.prototype.getScore = function()
{
    
    var end = new Date();
    var diff = end - this.start;

    
    diff/=1000;
    
    var seconds = Math.round(diff);
    
    this.total+=seconds;
    
    if(this.total % 50 == 0) 
		this.score+= (10*this.bombFire); //score always increases, but increases more when
                                                              //theres more bomb fire
}

player.prototype.update = function(d)
{
	if( this.dead ) return;
    
	var rx = this.x/10;
	var ry = this.y/10;
    
    this.getScore();
    
	// check for bonuses
	var pxi = [ Math.floor( rx ), Math.ceil( rx ) ];
	var pyi = [ Math.floor( ry ), Math.ceil( ry ) ];
	for(var x=pxi[0]; x<=pxi[1]; x++)
	{
		if( x<0 ) continue;
		if( x>=m1.cells[0].length ) continue;
		for(var y=pyi[0]; y<=pyi[1]; y++)
		{
			if( y<0 ) 
				continue;
			if( y>=m1.cells.length ) 
				continue;
			if( m1.cells[y][x] < 0 ) //if empty space 
			{
				switch(m1.cells[y][x])
				{
					case -1: this.carriedBomb++; break; //power up that increases carried bombs
					case -2: this.bombFire++; break; //fire power up that increases bomb fire
				}
				m1.cells[y][x] = 0;
			}
			if( !firesCanPlace(x,y) )
				this.dead = true;
		}
	}
	this.dx =0;
	this.dy =0;
	
	var oldX = (this.x/10)+0.5;
	var oldY = (this.y/10)+0.5;
	
    
     //accounts for both players movements
    if( pressed[0 + (this.id*6)] ) 
	{ this.x-=1; this.dx=-1 }
	if( pressed[1 + (this.id*6)] ) 
	{ this.x+=1; this.dx=+1 }
	if( pressed[2 + (this.id*6)] ) 
	{ this.y-=1; this.dy=-1 }
	if( pressed[3 + (this.id*6)] ) 
	{ this.y+=1; this.dy=+1 }
    
	
	var newX = (this.x/10)+0.5;
	var newY = (this.y/10)+0.5;
	var r = m1.circleCollision(newX,newY,0.5); //find circle collision radius
	r = bombersPlayerCollision( r[0], r[1], r[0]-oldX, r[1]-oldY, 0.5, 1 );	
	this.x = Math.floor((r[0]-0.5)*10 + 0.5);
	this.y = Math.floor((r[1]-0.5)*10 + 0.5);
	
	if( pressed[4 + (this.id*6)] && this.placedBomb < this.carriedBomb ) //if pressed button to place bomb and placed less bombs than carried
	{
		canPlaceBomb = true;
		var bx = Math.floor(rx+0.5);
		var by = Math.floor(ry+0.5);
		if( bombersCanPlace(bx,by) );
		{
			this.placedBomb++;
			bombersAdd(bx,by,this.bombFire,function(p) 
				{ 
					p.placedBomb--; 
				},this);
            
		}
    
	}
    
}
