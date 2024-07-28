/*=============================================================================
  Part4
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

lead3 = [2,9,8,7,6,2,5,7,6,2,9,8,7,6,2,5,7,8]
h3 = [-2,5,5,5,2,-1,0,2,1,-1,5,5,5,2,-1,0,2,4]
r3 = [1/4,1/4,1/4,1/4,1/2,1/2,1/2,1/2,1/2,
      3/4,1/4,1/4,1/4,1/2,1/2,1/2,1/2,1]

pad3 = Synth[10]()
      .connect(verb, .5)
      .connect(chorus, .6)
	.connect(delay , .25)
pad3.decay = .8
pad3.sustain = 1
pad3.release = 2.5
pad3.cutoff = .12
pad3.saturation = 5
pad3.note.seq(lead3,r3)

pad4 = Synth[10]()
      .connect(verb, .5)
      .connect(chorus, .6)
	.connect(delay , .25)
pad4.decay = .8
pad4.sustain = 1
pad4.release = 2.5
pad4.cutoff = .12
pad4.saturation = 5
pad4.loudness = .8
pad4.note.seq(h3,r3)

// harmony
h1 = [2,9,8,9,7,9,6,9,8,7,8,6,8,5,8,7,6,7,5,7,4,7,8,7,8,6,8,5,8]
r4 = [1/8,1/8,1/8,1/8,1/8,1/8,1/8,.25,1/8,1/8,1/8,1/8,1/8,1/8,.25,
      1/8,1/8,1/8,1/8,1/8,1/8,.25,1/8,1/8,1/8,1/8,1/8,1/8,1/8]

harmony = Synth()
     			.connect(verb, .5)
harmony.waveform = 'sine'
harmony.attack = .06
harmony.release = .08
harmony.cutoff = .9
harmony.filterMode = 0
harmony.Q = .5
harmony.saturation = 10 // controlled by pure data
harmony.note.seq(h1,r4)

// chords progression
chords = Synth[19]()
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
h2.loudness = 2


/*=============================================================================
 END
=============================================================================*/ 
// step 1
cl.stop()
pad3.stop()
pad4.stop()
harmony.stop()
chords.stop()

// step 2
chords.stop()

//step 3
kd.stop()

