function myFunction() {

    var dirIP = document.getElementsByName("adreesIP")[0].value;
    console.log(dirIP);

    ros = new ROSLIB.Ros({
        url : 'ws://'+dirIP+':9090'
      });



ros.on('connection', function() {
    
    document.getElementById("status").innerHTML = "Conectado";
    document.getElementById("CameraRobotic").src="http://"+dirIP+":8080/stream?topic=/usb_cam/image_raw";

    


  });

  ros.on('error', function(error) {
    document.getElementById("status").innerHTML = "Desconectado";
  });


  ros.on('close', function() {
    document.getElementById("status").innerHTML = "Desconectado";
  });


  cmd_vel_listener = new ROSLIB.Topic({
    ros : ros,
    name : "/Gpio",
    messageType : 'std_msgs/String.msg'
  });
}


  move = function(dato) {
    var twist = new ROSLIB.Message({dato});
    cmd_vel_listener.publish(twist);
  }
