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
    rAF(updateStatus);
  }

  function disconnecthandler(e) {
    removegamepad(e.gamepad);
    
  }
  
  function updateStatus() {
   
    scangamepads();
      var controller = controllers[0];

      if (controller.axes[0] == -1){
        if (RosCoss == true){ move("Gl");}
      
      } else if (controller.axes[0] == 1){
        if (RosCoss == true){move("Gr");}
      
      } else if (controller.axes[1] == -1){
        if (RosCoss == true){move("Ad");}
      
      } else if (controller.axes[1] == 1){
        if (RosCoss == true){move("At");}
      
      } else {
        if (RosCoss == true){move("NN");}

      }

      if (controller.buttons[0].value == 1){
        if (RosCoss == true){move("Fa");}
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