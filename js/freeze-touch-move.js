// depend on jquery
var touch = window.navigator.msPointerEnabled ? "MSPointerDown" : "touchmove";
$(document).bind(touch, function(event) {
	if(event && event.preventDefault){
		event.preventDefault();
	}else{
		window.event.returnValue = false;
	}
});