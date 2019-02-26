// A, D, W, S, E, enter, left, rigt, up, down, 16
keys = [ 65, 68, 87, 83, 69, 13, 37, 39, 38, 40, 16 ]

//set all to false intially
pressed = [ false, false, false, false, false, false, false, false, false, false, false ]
document.onkeydown = function(event)
{
	for(var i=0;i<keys.length;i++) 
		if( event.keyCode == keys[i] ) 
			pressed[i] = true;
}
document.onkeyup = function(event)
{
	for(var i=0;i<keys.length;i++) 
		if( event.keyCode == keys[i] ) 
			pressed[i] = false;
}