// Learning Processing
// Daniel Shiffman
// http://www.learningprocessing.com

// Example 16-14: Overall motion

import gab.opencv.*;
import processing.video.*;
import java.awt.*;
import processing.sound.*;

// Variable for capture device
Capture video;
OpenCV opencv;
OpenCV eyeDetection;
SoundFile soundfile;

// Previous Frame
PImage prevFrame;

// How different must a pixel be to be a "motion" pixel
float threshold = 50;


void setup() {
  size(320, 240);
  soundfile = new SoundFile(this, "emperor.aiff");
  
   soundfile.loop();
  // Using the default capture device
  video = new Capture(this, width, height);
  opencv = new OpenCV(this, width, height);
  opencv.loadCascade(OpenCV.CASCADE_EYE);  
  video.start();
  // Create an empty image the same size as the video
  prevFrame = createImage(video.width, video.height, RGB);
}

// New frame available from camera
void captureEvent(Capture video) {
  // Save previous frame for motion detection!!
  
  prevFrame.copy(video, 0, 0, video.width, video.height, 0, 0, video.width, video.height);
  prevFrame.updatePixels();
  video.read();
}

void draw() {
  background(0);
  opencv.loadImage(video);

  // You don't need to display it to analyze it!
  image(video, 0, 0);
  
  Rectangle[] eyes = opencv.detect();
  //println(eyes.length);

  for (int i = 0; i < eyes.length; i++) {
    //println(eyes[i].x + "," + eyes[i].y);
    noFill();
    stroke(255);
    rect(eyes[i].x, eyes[i].y, eyes[i].width, eyes[i].height);
  }

  video.loadPixels();
  prevFrame.loadPixels();

  // Begin loop to walk through every pixel
  // Start with a total of 0
  float totalMotion = 0;

  // Sum the brightness of each pixel
  for (int i = 0; i < video.pixels.length; i ++ ) {
    // Step 2, what is the current color
    color current = video.pixels[i];

    // Step 3, what is the previous color
    color previous = prevFrame.pixels[i];

    // Step 4, compare colors (previous vs. current)
    float r1 = red(current); 
    float g1 = green(current);
    float b1 = blue(current);
    float r2 = red(previous); 
    float g2 = green(previous);
    float b2 = blue(previous);

    // Motion for an individual pixel is the difference between the previous color and current color.
    float diff = dist(r1, g1, b1, r2, g2, b2);
    // totalMotion is the sum of all color differences. 
    totalMotion += diff;
  }

  // averageMotion is total motion divided by the number of pixels analyzed.
  float avgMotion = totalMotion / video.pixels.length; 
  
  //eye detect
 

  // Draw a circle based on average motion
  noStroke();
  fill(0);
  float r = avgMotion * 5;
  ellipse(width/2, height/2, r, r);
  
  println("itsr"+r);
  
  
  
    //soundfile.rate(map(r, 0, 100, 0.25, 4.0)); 
  
  // Map mouseY from 0.2 to 1.0 for amplitude  
  soundfile.amp(map(r, 10,80, 0.001, 3.0)); 
 
  //// Map mouseY from -1.0 to 1.0 for left to right 
  //soundfile.pan(map(mouseY, 0, width, -1.0, 1.0)); 
  
}