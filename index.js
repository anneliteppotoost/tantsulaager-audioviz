
var input;
var fft;
var steps, energyStep;
var globalRotation = 0;

function touchStarted() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  steps = 36;
  energyStep = 15000/steps;
  
  input = new p5.AudioIn();
  input.start();
  fft = new p5.FFT();
  fft.setInput(input);
  fft.smooth();
  //strokeCap(SQUARE);
  rectMode(CENTER);
}

// arc

function draw() {
    blendMode(BLEND);
    background(0,0,0);
    var volume = input.getLevel();
    var spectrum = fft.analyze(); 
  
    blendMode(LIGHTEST); //EXCLUSION, DIFFERENCE, MULTIPLY, ADD*, LIGHTEST, SCREEN, HARD_LIGHT, DODGE, BURN, SUBTRACT
  // blendMode(LIGHTEST);
    noFill();
  
    var energy;
    
    translate(windowWidth/2, windowHeight/2);
      rotate(globalRotation-=0.006);
      translate(-windowWidth/2, -windowHeight/2);
    for(var i=0; i<steps; i++){
      energy = fft.getEnergy(i, i*energyStep);
      var size = map(energy, 0, 300, energy, windowWidth*3);
      var hue = 10+i*7;
      var brightness = map(energy, 0, 200, 50, 70);
      var opacity = map(size, 0, windowHeight, 0.05, 0.2);
      stroke('hsla('+hue+',100%,'+brightness+'%,'+opacity+')');
      //strokeWeight(size*0.05);
      
      strokeWeight(size*0.02);
     
        
      translate(windowWidth/2, windowHeight/2);
      rotate(i*0.0005);
      translate(-windowWidth/2, -windowHeight/2);

      //arc(windowWidth/2, windowHeight/2, size, size, 90, 180);
      square(windowWidth/2, windowHeight/2, i*60, size*0.5);
      
      // arc(windowWidth/2, windowHeight/2, i*20, 30+size*0.2, 0, 360/i+size*0.009);
      // arc(windowWidth/2, windowHeight/2, i*20, i+size, 360/i, 360/i+size*0.02);
    }
    //globalRotation+=0.0005;
  }



// ellipse


// function draw() {
//   blendMode(BLEND);
//   background(0,0,0);
//   var volume = input.getLevel();
//   var spectrum = fft.analyze(); 

//   blendMode(HARD_LIGHT); //EXCLUSION, DIFFERENCE, MULTIPLY, ADD*, LIGHTEST, SCREEN, HARD_LIGHT, DODGE, BURN, SUBTRACT
// // blendMode(LIGHTEST);
//   noFill();

//   var energy = 50;
//   for(var i=0; i<=steps; i++){
//     energy = fft.getEnergy(i, i*energyStep);
//     var size = map(energy, 0, 255, energy*0.3, windowWidth*1.5);
//     var hue = 90 + i*20;
//     var brightness = map(energy, 0, 200, 30, 70);
//     var opacity = map(size, 0, windowHeight, 0.02, 0.1);
//     stroke('hsla('+hue+',100%,'+brightness+'%,'+opacity+')');
//     //strokeWeight(size*0.05);
//     strokeWeight(size*0.05);
    
//     ellipse(windowWidth/2, windowHeight/2, size, size);
//     //arc(windowWidth/2, windowHeight/2, size, size, 0, 360);
//     // arc(windowWidth/2, windowHeight/2, i*20, 30+size*0.2, 0, 360/i+size*0.009);
//     // arc(windowWidth/2, windowHeight/2, i*20, i+size, 360/i, 360/i+size*0.02);
//   }
// }


function windowResized() {
  resizeCanvas(windowWidth, windowHeight, false);
  //background(0);
}