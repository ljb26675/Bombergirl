Bombergirl README.txt

FILES REQUIRED TO RUN MY GAME:
img/ -
    | - mapnew.png
    | - bomb2.png
    | - bombergirl.png
    | - bombnew.png
    | - bombsexplode.png
    | - bonuses2.png
    | - firesnew.png
    | - gameover.png
    | - me.png
    | - p1.png
    | - p1wins.png
    | - p2.png
    | - p2wins.png
    | - player2.png
    | - smallerbomb.png
    
JS/ -
    | - map.js
    | - bomb.js
    | - fire.js
    | - gameover.js
    | - keyboard.js
    | - main.js
    | - menu.js
    | - player.js
    | - drawer.js
    
 main.html

 ----------------------------------------------------------------------
 
Notes:
	If game becomes buggy, just refresh to restart.

Screenshots of game:
	Included two screenshots of game in screenshots/ folder.
 
Game Objects:
	I used an object oriented approach, so every object has its own js file.
	
Animation of objects:
	Every object has its own draw function, providing its animation. I drew
	sprite sheets for the players, the powerups, the map, and the bombs.
	
Objective of game:
	Object of game is to clear map as fast as possible and collect most powerups, 
	while not killing yourself.
	
Description of game:
     My game is Bombergirl, my take on the classic game Bomberman. This game is two players,
     though it could be modified to be up to 4 players. The two players place bombs as time
     passes, and their score constantly increases as time goes on. Score increases ten times 
     the amount of fire that a certain player is capable of producing, so there is a great
     urgency to find powerups, which are (1) bombs: increase bomb capacity, and (2) fire: 
     increase range of fire. If one player dies, the other player wins. If the map is cleared,
     the player with the highest score wins. If both die with the same score, it's just
     game over. 
	 
Complexity:
	I ended up having 839 lines of code. For complexity, I feel like I achieved complexity for the amount of loc I had, and also 
	for the way I used a stack to update bombs, and circle point collision to detect if a player
	or object was colliding with something. I used http://cgp.wikidot.com/circle-to-circle-collision-detection
	for help with circle point collision.
     
Personal Twists:
    Self: I put myself as both players (in red and blue outfits), which was pretty fun to do.
    Extend: My game is called Bombergirl, and centers around two girl characters fighting to win,
            which is different than the Bomberman game. I also made a logo specifically for my
            game.
    Art: All assets were drawn by me on GIMP. I looked at some photos of retro bomberman for inspiration,
        but I drew the art itself.

Gallery link:
    http://cobweb.cs.uga.edu/~briley/

And link specifically to game:
    http://cobweb.cs.uga.edu/~briley/4070/P1/main.html

