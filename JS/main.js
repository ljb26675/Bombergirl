document.body.style.overflow = 'hidden'
var	TIME_PER_FRAME  = 33;						//speed frame up
// 13 x 11
// 560 x 480
var m1 = new map();
var d = new drawer( document.getElementById("c") );
var pl1 = new player(0,0,0);
pl1.score = 0;
var pl2 = new player(1,12,10);
pl2.score = 0;
var menu = new menu(drawer.drawer);
var gameover = new gameover(drawer.drawer);

var endGame = false;

var m = true;

setInterval(function()
{
    if(m)
	{
        d.drawMenu();
        
        if(pressed[5]) m = false;
    }else if(pl1.dead || pl2.dead || endGame)
	{
        d.drawOver(pl1, pl2);
        
        updateFire();
        pl1.update();
        pl2.update();
        bombersUpdate();	
        
        if(pressed[5] && (pl1.dead || pl2.dead || endGame)){
            
            m1 = new map();
            pl1 = new player(0,0,0);
            pl1.score = 0;
            pl1.dead = false;
            pl2 = new player(1,12,10);
            pl2.score = 0;
            pl2.dead = false;
            d = new drawer( document.getElementById("c") );
            endGame = false;
        }
        
       
    }else
	{
       updateFire();
       pl1.update();
       pl2.update();
       bombersUpdate();	
       d.draw();
       endGame = m1.checkEmptyBoard();
        
    }
       
}, TIME_PER_FRAME)