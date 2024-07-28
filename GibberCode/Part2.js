/*=============================================================================
  Part2
=============================================================================*/ 
//step1
d = Drums('lpf').connect(verb,1)
d.tidal('kd kd kd ~ ~')
d.loudness = .7

pad = Synth[4]('rhodes', { decay:3, gain:.12 })
pad.fx[0].connect( Out, .125)
pad.fx[0].connect( verb, .5 )
pad.cutoff = .01
pad.pan = .5
pad.note.seq([5,9,8,9,12,9,8,9,5], [1/8,1/8,1/16,1/16,1/8,1/8,1/8,1/8,1/8])
pad.loudness = 1.5

//step2
pad.stop()
d.stop()