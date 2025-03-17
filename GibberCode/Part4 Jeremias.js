/*=============================================================================
  Initialization
=============================================================================*/ 
// Web connection
socket = new WebSocket("ws://127.0.0.1:9080")
socket.addEventListener("open", (event) => {
  console.log("connected to websocket")
})
socket.addEventListener("close", (event) => {
  console.log("disconnectd from websocket")
})
socket.addEventListener("message", (event) => {
  console.log(event.data)
  tag = event.data.split(' ')[0]
  mg = parseFloat(event.data.split(' ')[1])
  intMg = parseInt(event.data.split(' ')[1])

  switch(tag){
    case "s1cutoff":
      	s1.cutoff = mg	
      	break
    case "voicePan":
      	voice.pan = mg
		    break
    case "TremoAm":
		      tremo.amount = mg
            break
    case "TremoFre":
            tremo.frequency = mg
            break
    case "FlanFB":
					flan.feedback = mg
         	break
    case "FlanFre":
					flan.frequency = mg
        	break
    case "padcutoff":
		pad.cutoff = mg
        	break
    case "bass1index":
		     bass1.index = intMg
        	break
    case "snloudness":
					sn.loudness = mg
        	break
    case "d1loudness":
	     		 d1.loudness = mg
			break 
    case "pluckecho":
		h2.note(intMg)     
  }
})

// Set bpm and mode
Clock.bpm = 100
Theory.root = 'c4'
Theory.mode = 'ionian'

// sound effects
chorus = Chorus('lush').bus()
verb  = Reverb( 'space' ).bus() 
delay = Delay( '1/6' ).bus()
tremo = Tremolo()
tremo.shape = 'square'
tremo.amount = .01 // 0.01-1 controlled by pure data
tremo.frequency = 2 // 1-20 controlled by pure data
tremo.bus()
flan = Flanger()
flan.feedback = .1 // 0-1 controlled by pure data
flan.frequency = 1 // 0.5 - 20 controlled by pure data
flan.bus()

// lead notes and rhythm
lead3 = [2,9,8,7,6,2,5,7,6,2,9,8,7,6,2,5,7,8]
h3 = [-2,5,5,5,2,-1,0,2,1,-1,5,5,5,2,-1,0,2,4]
r3 = [1/4,1/4,1/4,1/4,1/2,1/2,1/2,1/2,1/2,
      3/4,1/4,1/4,1/4,1/2,1/2,1/2,1/2,1]

// harmony
h1 = [2,9,8,9,7,9,6,9,8,7,8,6,8,5,8,7,6,7,5,7,4,7,8,7,8,6,8,5,8]
r4 = [1/8,1/8,1/8,1/8,1/8,1/8,1/8,.25,1/8,1/8,1/8,1/8,1/8,1/8,.25,
      1/8,1/8,1/8,1/8,1/8,1/8,.25,1/8,1/8,1/8,1/8,1/8,1/8,1/8]


/*=============================================================================
  Step 1 chords progression
=============================================================================*/ 

chords = Synth[5]()
      .connect(verb, .5)
      .connect(chorus, .6)
chords.cutoff = .1
chords.attack = .5
chords.decay = .8
chords.sustain =  5
chords.release = 2
chords.chord.seq([[-5,-2,0], [-6,-3,-1], [-7,-4,-2], [-6,-3,-1]], 1)
//keyboard playing S D F D
h2 = Monosynth('pluckEcho')
		.connect(chorus, .5)
		.connect(verb , .5)
h2.loudness = 2.4

/*=============================================================================
  Step 2 Percussion
=============================================================================*/ 

kd = Kick('long')
    .connect(chorus , .5)
    .connect(verb , .5)
kd.trigger.seq([1,0.75,0,0,0,0,0,0],1/8)
cl = Clap()
    .connect(verb, .7)
    .connect(delay, .25)
cl.attack = 2
cl.release = 2
cl.trigger.seq(0.6,1,0,.5)
kd.gain.fade(0,.6,4)
cl.gain.fade(0,.6,4)

/*=============================================================================
Step 3 Lead 
=============================================================================*/ 

pad3 = Synth[5]()
      .connect(verb, .5)
      .connect(chorus, .6)
	.connect(delay , .25)
pad3.decay = .8
pad3.sustain = 1
pad3.release = 2.5
pad3.cutoff = .12
pad3.saturation = 5
pad3.note.seq(lead3,r3)
pad3.gain.fade(0,.7,5)
pad4 = Synth[5]()
      .connect(verb, .5)
      .connect(chorus, .6)
	.connect(delay , .25)
pad4.decay = .8
pad4.sustain = 1
pad4.release = 2.5
pad4.cutoff = .12
pad4.saturation = 5
pad4.gain.fade(0,.5,5)
pad4.note.seq(h3,r3)
harmony = Synth().connect(verb, .5)
harmony.waveform = 'sine'
harmony.attack = .06
harmony.release = .08
harmony.cutoff = .9
harmony.filterMode = 0
harmony.Q = .5
harmony.note.seq(h1,r4)

/*=============================================================================
 END
=============================================================================*/ 
// step 1
cl.gain.fade(.5,0,2)
pad3.gain.fade(.5,0,2)
pad4.gain.fade(.5,0,2)
harmony.gain.fade(.5,0,2)

// step 2
chords.stop()

// step 3
kd.stop()

