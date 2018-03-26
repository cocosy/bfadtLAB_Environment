import gab.opencv.*;
import java.awt.Rectangle;

OpenCV opencv;
Rectangle[] eyes;

void setup() {
  opencv = new OpenCV(this, "test.jpg");
  size(1080, 720);

  opencv.loadCascade(OpenCV.CASCADE_EYE);  
  eyes = opencv.detect();
}

void draw() {
  image(opencv.getInput(), 0, 0);

  noFill();
  stroke(0, 255, 0);
  strokeWeight(3);
  for (int i = 0; i <eyes.length; i++) {
    rect(eyes[i].x, eyes[i].y, eyes[i].width, eyes[i].height);
  }
}