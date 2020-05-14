var haveEvents = 'GamepadEvent' in window;
var haveWebkitEvents = 'WebKitGamepadEvent' in window;
var controllers = {};
var rAF = window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.requestAnimationFrame;

  function connecthandler(e) {
    addgamepad(e.gamepad);
  }


  function addgamepad(gamepad) {
    controllers[gamepad.index] = gamepad; 
    console.log("camilo");
    rAF(updateStatus);
  }

  function disconnecthandler(e) {
    removegamepad(e.gamepad);
    
  }
  
  function updateStatus() {
   
   
      var controller = controllers[0];
    
      var val = controller.buttons[0];
      

      ap = controller.axes[1];
  
      
      if (ap == -1){
        console.log("adelante");
      }


      if (ap == 1){
        console.log("atras");
      }


      if (val.value == 1){
        console.log("hola care bola");
      }


      rAF(updateStatus);
    
  }



  function scangamepads() {
    var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
    for (var i = 0; i < gamepads.length; i++) {
      if (gamepads[i]) {
        if (!(gamepads[i].index in controllers)) {
          addgamepad(gamepads[i]);
        } else {
          controllers[gamepads[i].index] = gamepads[i];
        }
      }
    }
  }
  
  if (haveEvents) {
    window.addEventListener("gamepadconnected", connecthandler);
    window.addEventListener("gamepaddisconnected", disconnecthandler);
  } else if (haveWebkitEvents) {
    window.addEventListener("webkitgamepadconnected", connecthandler);
    window.addEventListener("webkitgamepaddisconnected", disconnecthandler);
  } else {
    setInterval(scangamepads, 500);
  }








  if (haveEvents) {
    window.addEventListener("gamepadconnected", connecthandler);
  }  else {
    setInterval(scangamepads, 500);
  }