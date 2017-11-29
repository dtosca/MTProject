// m_dspNetwork is shared pointer to Resonant::DSPNetwork
// m_dspNetwork.get returns raw pointer to 

var dsp = $.app.dspNetwork();

if (dsp.isRunning()) {
	console.log("I will playback the track now. You should hear sound from left speaker");
	dsp.samplePlayer().playSample("ElectricSweep.wav", 1.0, 1.0, 0, 0);

	console.log("playing second sample too...");
	dsp.samplePlayer().playSample("PinkPanther30.wav", 1.0, 1.0, 0, 0);
} else {
	console.log("Error");
}
