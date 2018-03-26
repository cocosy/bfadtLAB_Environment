import gab.opencv.*;
import processing.video.*;
import java.awt.Rectangle;

OpenCV opencv;
Movie video;
//SoundFile soundfile;
Rectangle[] eyes;

void setup() {
  video = new Movie(this, "eye.mp4");
   size(1280, 360);
  opencv = new OpenCV(this, 640, 360);
  opencv.loadCascade(OpenCV.CASCADE_EYE);  
  video.loop();
  video.play();  
eyes = opencv.detect();
}

void draw() {
  background(0);
  opencv.loadImage(video);
  image(video, 0, 0);
    translate(video.width,0);
    image(opencv.getInput(), 0, 0);
      Rectangle[] eyes = opencv.detect();
    for (int i = 0; i < eyes.length; i++) {
    //println(eyes[i].x + "," + eyes[i].y);
   noFill();
  stroke(0, 255, 0);
  strokeWeight(3);
    rect(eyes[i].x, eyes[i].y,eyes[i].width, eyes[i].height);
  }

  
}

void movieEvent(Movie video) {
  video.read();
}