// m_dspNetwork is shared pointer to Resonant::DSPNetwork
// m_dspNetwork.get returns raw pointer to 

var dsp = $.app.dspNetwork();
var root = $.app.mainLayer();

//slider not working, ask Lauren later
var slider = new MultiWidgets.SliderWidget();
slider.setLocation(0,0);
slider.setMinVal(0);
slider.setMaxVal(10);
slider.setCurrentValue(5);
slider.setStep(1.0);
slider.setWidth(100);
slider.raiseToTop();
root.addChild(slider);

//plays one sound
var playElectricSweep = addBttn(100,100,100,100,"play.png","ElectricSweep.wav");
var playPinkPanther = addBttn(300,100,100,100,"play.png","PinkPanther30.wav");

//plays another sound
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
	}

	w.onSingleTap(function(){
		dsp.samplePlayer().playSample(soundFile, 1.0, 1.0, 0, 0);
	});

	root.addChild(w);
	w.raiseToTop();
}