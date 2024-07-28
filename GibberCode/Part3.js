/*=============================================================================
  Part3 
=============================================================================*/ 

kd1 = Kick().connect(verb/* 0 */ , .2)
kd1.attack = .15
kd1.decay = .9
kd1.release = 1.5
kd1.tone = .7 
kd1.trigger.seq([.75,0,0,0],[1/4])

sn = Snare().connect(verb , .15) 
sn.tune = -.02
sn.attack = .08
sn.cutoff = .08
sn.decay = .45
sn.release = .7
sn.gain = .5
sn.loudness = 0.01 // will be controlled by pure data
sn.trigger.seq([0,0,.75,0],[1/4])

d1 = Hat().connect(verb, .2)
d1.loudness = .001 // will be controlled by pure data
d1.trigger.seq([0,.8,.8,.8,.8],[3/4,1/16,1/16,1/16,1/16])

m1 = [-2,5,9,5,-1,6,9,6,0,7,9,7,1,8,9,8]
r1 = [1/4]
p1 = [-2,2,5,6,-2,2,5,6,-2,2,5,6,-2,2,5,6,-1,2,5,6,-1,2,5,6,-1,2,5,6,-1,2,5,6,
      0,2,5,7,0,2,5,7,0,2,5,7,0,2,5,7,1,2,5,8,1,2,5,8,1,2,5,8,1,2,5,8]
r2 = [1/16]

lead1 = Pluck[10]({ decay:8, gain:.15})
			.connect(chorus , .5)
      .connect(verb , .7)
			.connect(delay , .25)
lead1.useADSR = true
lead1.attack = 4
lead1.sustian = .4
lead1.release = 2
lead1.cutoff = .1 
lead1.filterMode = 0
lead1.filterMult = 2
lead1.loudness = 1.2
lead1.pan.tidal('.1 .5. 95 .75') 

lead1.note.seq(m1,r1)

pad1 = Synth[5]()
pad1.waveform = 'triangle'
pad1.useADSR = true
pad1.sustain = .7
pad1.loudness = .65
pad1.index = 8
pad1.Q = gen( 0.4 + cycle(0.1) * 0.45 )
pad1.cutoff = gen( 0.3 + cycle(0.07) * 0.25 ) 
 
pad1.note.seq(p1,r2)

//keyboard playing 1 2 3 4 5 
bass1 = FM('bass')
	.connect(verb , .6)
      .connect(tremo , .8)
bass1.Q = .7 
bass1.saturation = 2
bass1.index = 1
bass1.loudness = .65
bass1.attack = .105
bass1.release = .01
bass1.note.seq([-9,-2,-2,-2,-2,-2,-8,-1,-1,-1,-1,-1,-7,0,0,0,0,0,-6,1,1,1,1,2],[.1665])

/*=============================================================================
  END
=============================================================================*/ 

kd1.stop()
sn.stop()
d1.stop()
lead1.stop()
pad1.stop()
bass1.stop()
