function drawer(canvas)
{
	this.cellSize = 40;
	// w-h globals
	canvas.width = w = 14 * this.cellSize;
	canvas.height = h = 12 * this.cellSize;
	this.drawer = canvas.getContext('2d');
	this.drawer.fillStyle = 'lightgrey';
	this.drawer.fillRect(0,0,w,h);
    
	
}


map.prototype.draw = function(d,cs)
{
	if( this.tiles == undefined) 
	{
		this.tiles = new Image();
		this.tiles.src = "img/mapnew.png";
		this.bonuses = new Image();
		this.bonuses.src = "img/bonuses2.png";
	}
	
	d.fillStyle = 'rgba(255,255,255,255)';
	d.fillRect(cs/2,cs/2,w-cs,h-cs);
	d.fillStyle = 'lightgrey';
	var cc = this.cells;
	for(var i =0; i<cc.length;i++)
		for(var j=0; j< cc[i].length;j++)
		{
			var v = cc[i][j];
			if( v>=0 )
			{
				d.drawImage(
					this.tiles, //image
					v*40,0, //sprite pos
					40,40, //size of sprite
					cs/2+j*cs,cs/2+i*cs, //canvas pos
					cs,cs); //sprite size (cell size)

			}
			if( v<0 )
			{
				d.fillStyle = 'lightgrey';
				d.drawImage(
					this.bonuses, //image
					(-v-1)*40,0,  //sprite pos
					40,40, //size of sprite
					cs/2+j*cs,cs/2+i*cs, //canvas pos
					cs,cs); //sprite size (cell size)
			
			}
		}
}


player.prototype.drawScore = function(d, cs)
{
    
    if (this.id == 0 )
	{
        d.font = "20px Courier";
        d.fillStyle = "red";
        d.fillText("P1 Score: "+ this.score , 20, 16); //+ " Fire: " + this.bombFire + " Bombs: " + this.carriedBomb, 50, 20);
        
        d.fillText("Fire: " + this.bombFire + " Bombs: " + this.carriedBomb, 20, 475);
    }else
	{
        d.font = "20px Courier";
        d.fillStyle = "royalblue";
        d.fillText("P2 Score: "+ this.score , 380, 16);//+ " Fire: " + this.bombFire + " Bombs: " + this.carriedBomb, 290, 20);
        d.fillText("Fire: " + this.bombFire + " Bombs: " + this.carriedBomb, 350, 475);
    }
}

player.prototype.draw = function(d,cs)
{
	if( this.sprites == undefined) 
	{
		this.sprites = new Image();
        
        if(this.id ==0) this.sprites.src = "img/me.png";
        else this.sprites.src = "img/player2.png";
		this.lastDirex = 0;
		this.frame = 0;
		this.animTime = 0;
	}
	if( this.dx > 0 ) 
		this.lastDirex = 1;
	else if( this.dx < 0 ) 
		this.lastDirex = 3; 
	else if( this.dy > 0 ) 
		this.lastDirex = 0; 
	else if( this.dy < 0 ) 
		this.lastDirex = 2;
	
	if( this.dead )
	{
		this.frame = 5;
		this.lastDirex = 0;
	} else
	{
		if( this.dx != 0 || this.dy != 0)
		{
			this.animTime+= 0.5;
			var frames = [2,3,4,3,2,1,0,1];
			if( this.animTime >= frames.length )
				this.animTime -= frames.length;
			this.frame = frames[ Math.floor(this.animTime) ];		
		} else
		{
			this.frame = 2;
			this.animTime = 0;
		}
	}
		
	d.drawImage(
		this.sprites, //image
		this.frame*20,this.lastDirex*40, //sprite position
		20,40, //size pf sprite
		cs/2+this.x*cs/10, cs/2+this.y*cs/10 -cs,  //canvas position
		cs,cs*2); //size scale (to make bigger)
}

bomb.prototype.draw = function(d,cs)
{
	if( this.image == undefined) 
	{
		this.image = new Image();
        this.image.src = "img/smallerbomb.png";
	}
	
	d.fillStyle = 'lightgrey';
    
        
     d.drawImage(this.image, //adding animated bomb
                        this.currX,0,            		// sprite upper left positino	
                        this.CHAR_WIDTH,this.CHAR_HEIGHT, 		// size of a sprite 72 x 96
                        cs/2+this.x*cs,cs/2+this.y*cs,  	// canvas position
                        cs,cs      // sprite size scale
                        );				

     this.currX += this.CHAR_WIDTH;
     if (this.currX >= this.SPRITE_WIDTH)
        this.currX = 0;
    
    
}

fire.prototype.draw = function(d,cs)
{
	if( allFires.image == undefined) 
	{
		allFires.image = new Image();
		allFires.image.src = "img/firesnew.png";
	}
	var lasts = [-1,-1,-1,-1];
	for(var i=0;i<this.cellFired.length;i++)
	{
		if( this.cellFired[i][2] != -1 )	
			lasts[this.cellFired[i][2]] = i;
	}
	
	for(var i=0;i<this.cellFired.length;i++)
	{
		var px=0,py=0;
		if( this.cellFired[i][2] != -1 )
		{
			if( i != lasts[this.cellFired[i][2]] )
			{
				px = (Math.floor(this.cellFired[i][2]/2)+1) * 40;
			} else
			{
				px = this.cellFired[i][2]*40;
				py = 40;
			}
		}
		d.drawImage(
			allFires.image, //draw fire
			px,py, //currx, and curry
			40,40, //size of fire
			cs/2+this.cellFired[i][0]*cs,cs/2+this.cellFired[i][1]*cs, //canvas position
			cs,cs); //cell size
		
	}
}

menu.prototype.draw = function(d,cs)
{
    
    d.fillStyle = 'lightgrey';
	d.fillRect(0,0,w,h);
    
    d.drawImage(this.background,0,0);  //title

    
    
}

gameover.prototype.draw = function(d,cs, p1, p2)
{  
    d.fillStyle = 'lightgrey';
	d.fillRect(0,0,w,h);
    
    if((p1.dead && !p2.dead) || (endGame && (p2.score > p1.score)) ){ //if p1 dead but p2 isnt, or p2 has greater score than p1
        gameover.background.src = "img/p2wins.png";
    }else if(!p1.dead && p2.dead  || (endGame && (p1.score > p2.score))){
        gameover.background.src = "img/p1wins.png";
    }else {//if both dead at same time with same score 
        gameover.background.src = "img/gameover.png";
    }
    d.drawImage(this.background,0,0);  //title
}

drawer.prototype.drawOver = function (pl1, pl2){
    
    gameover.draw(this.drawer, this.cellSize, pl1, pl2);
    
}

drawer.prototype.drawMenu = function (){
    
    this.drawer.fillStyle = 'lightgrey';
    this.drawer.fillRect(0,0,w,h);
    
    menu.draw(this.drawer, this.cellSize);
    
    
}

drawer.prototype.draw = function()
{
    this.drawer.fillStyle = 'lightgrey';
    this.drawer.fillRect(0,0,w,h);
	
        m1.draw( this.drawer, this.cellSize )
        for(var i in bombers)
        {
            bombers[i].draw( this.drawer, this.cellSize );
        }
        for(var i=0;i<allFires.length;i++)
        {
            allFires[i].draw( this.drawer, this.cellSize );
        }
		
        pl1.drawScore(this.drawer, this.cellSize)
        pl2.drawScore(this.drawer, this.cellSize)
        pl1.draw( this.drawer, this.cellSize )
        pl2.draw(this.drawer, this.cellSize)
}