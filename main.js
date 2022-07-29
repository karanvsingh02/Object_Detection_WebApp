img = "";
status= "";
objects=[];
object_user = "";

function setup(){
    canvas = createCanvas(400, 375);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(400, 375);
    video.hide();
}

function draw(){
    image(video, 0, 0, 480, 400);
    if(status != ""){
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++ ){
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "% ", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);


            if(objects[i].label == object_user){
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("object_status").innerHTML = object_user + " is found.";
                document.getElementById("status").innerHTML = "Objects Detected";
                synth = window.speechSynthesis;
                speak_data = objects[i].label;
                utterThis = new SpeechSynthesisUtterance( object_user + "is found");
                synth.speak(utterThis);
            }
            else{
                document.getElementById("object_status").innerHTML = "Status - " + object_user + " not found";
            }
        }
    }
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status - Detecting Objects";
    object_user = document.getElementById("user_object").value;
    
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
}



function gotResult(error, results){

    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}