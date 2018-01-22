// m_dspNetwork is shared pointer to Resonant::DSPNetwork
// m_dspNetwork.get returns raw pointer to 

var dsp = $.app.dspNetwork();
var root = $.app.mainLayer();

//sider works, will work with it for unbinary parameters
var slider = new MultiWidgets.SliderWidget();
slider.setLocation(300,225);
slider.setMinVal(0);
slider.setMaxVal(5);
slider.setCurrentValue(1);
slider.setStep(1.0);
slider.setWidth(100);
slider.raiseToTop();
root.addChild(slider);

var loopPressed;
//plays one sound
var playElectricSweep = addLoop(100,100,100,100,"play.png","ElectricSweep.wav",loopPressed);
//plays another sound
var playPinkPanther = addBttn(300,100,100,100,"play.png","beep.wav");
//stop button for all signals
var stopButton = addStopBttn(500,100,100,100,"stop.png")

//creates a button
function addBttn(x, y, sizeX, sizeY, image,soundFile) {
	var w = new MultiWidgets.JavaScriptWidget();

	w.setLocation(x, y);
	w.setWidth(sizeX);
	w.setHeight(sizeY);
	w.img = new MultiWidgets.ImageWidget();

	if (w.img.load(image)) {
	    w.img.addOperator(new MultiWidgets.StayInsideParentOperator());
    	w.img.setLocation(x,y);
    	w.img.setWidth(sizeX);
	    w.img.setHeight(sizeY);
	    w.addChild(w.img);
    	w.img.raiseToTop();
    	w.setFixed();
    	w.img.setFixed();
	}

	w.onSingleTap(function(){
		console.log("SLIDER VALUE: "+slider.currentValue());
		//plays on both channels virtually simultaneously
		//playSample(char filename, float gain, float relpitch, int targetChannel, int sampleChannel, bool loop, Radient: TimeStamp)
		dsp.samplePlayer().stop();
		dsp.samplePlayer().playSample(soundFile, 1.0, slider.currentValue(), 0, 0, true);
		dsp.samplePlayer().playSample(soundFile, 1.0, slider.currentValue(), 1.0, 0, true);
	});

	root.addChild(w);
	w.raiseToTop();

}

//create button for loop toggle
function addLoop(x, y, sizeX, sizeY, image,soundFile,loopPressed) {
	loopPressed = false;
	var w = new MultiWidgets.JavaScriptWidget();

	w.setLocation(x, y);
	w.setWidth(sizeX);
	w.setHeight(sizeY);
	w.img = new MultiWidgets.ImageWidget();

	if (w.img.load(image)) {
	    w.img.addOperator(new MultiWidgets.StayInsideParentOperator());
    	w.img.setLocation(x,y);
    	w.img.setWidth(sizeX);
	    w.img.setHeight(sizeY);
	    w.addChild(w.img);
    	w.img.raiseToTop();
    	w.setFixed();
    	w.img.setFixed();
	}

	w.onSingleTap(function(){
		console.log("IN ON SINGLE TAP");
		console.log("Loops Pressed value: "+loopPressed);
		if (loopPressed == false) {
			console.log("loopPressed is: "+loopPressed);
			loopPressed = true;
			console.log("loopPressed changed to: "+loopPressed);
			w.img.setSource("playLoop.png");
			//loops audio by making the last parameter true
			dsp.samplePlayer().playSample(soundFile, 1.0, 1.0, 0, 0, true);
			dsp.samplePlayer().playSample(soundFile, 1.0, 1.0, 1.0, 0, true);
		}
		else if(loopPressed == true){
			console.log("loopPressed is: "+loopPressed);
			loopPressed = false;
			console.log("loopPressed changed to: "+loopPressed);
			w.img.setSource("play.png");
		}
	});

	root.addChild(w);
	w.raiseToTop();

}

//create button for stopping noise samples from being played
function addStopBttn(x, y, sizeX, sizeY, image) {
	var w = new MultiWidgets.JavaScriptWidget();

	w.setLocation(x, y);
	w.setWidth(sizeX);
	w.setHeight(sizeY);
	w.img = new MultiWidgets.ImageWidget();

	if (w.img.load(image)) {
	    w.img.addOperator(new MultiWidgets.StayInsideParentOperator());
    	w.img.setLocation(x,y);
    	w.img.setWidth(sizeX);
	    w.img.setHeight(sizeY);
	    w.addChild(w.img);
    	w.img.raiseToTop();
    	w.setFixed();
    	w.img.setFixed();
	}

	w.onSingleTap(function(){
		console.log("In on single tap for stop button");
		dsp.samplePlayer().stop();
	});

	root.addChild(w);
	w.raiseToTop();

}
