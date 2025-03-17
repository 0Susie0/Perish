/*=============================================================================
 Initialization

 D:\XinyueHu\Programs\websocat.i686-pc-windows-gnu.exe  -t -E ws-l:127.0.0.1:9080 tcp-l:127.0.0.1:9081
=============================================================================*/ 

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


/*=============================================================================
  Wake up by nightmare 
=============================================================================*/ 
//step 1
b2 = Synth( 'bass.hollow' )
			.connect(verb , .85)
b2.note(5)
b2.trigger.seq([.8,.7,0,0],[1/8,1/8,1/2,1/2])
b2.decay = 1.2
b2.release = 1
b2.loudness = .5


/*=============================================================================
  Evil's whispers 1
=============================================================================*/
//step 1
b2.stop()
bass = Monosynth( 'bassPad', { decay:3 })
  .connect( verb, 1 )
  .note.seq( [5,5,5,5,-2,-2,-2,-2], [1/8,1/8,1/8,3/8,1/4,1/4,1/4,3/4] )
bass.Q = gen( 0.2 + cycle(0.1) * 0.39 )
bass.loudness = 1

//step 2
s1 = Synth( 'cry', { gain:.1, octave:.8 })
  .connect( verb, .2 )
	.connect(tremo, .7)
  .note.seq( -14, [1/2] )
s1.attack = .56
s1.sustian = 1
s1.release = 1.2
s1.cutoff = .01 // will be controlled by pure data
s1.gain.fade(0,.7,4)

// step 3
s1.stop()

/*=============================================================================
  Evil's whispers 2
=============================================================================*/
// step 1
voice = FM('perc')
			.connect(chorus, .2)
			.connect(verb , .6)
			.connect(flan , .7)
			.connect(tremo , .7)
voice.waveform = 'sine'
voice.attack = .7
voice.decay = 2
voice.release = 2
voice.cutoff = .1
voice.pan = .5 // will be controlled by pure data
voice.note.seq([0,-1],[2.2,2.2])
voice.loudness = 1.7

// step 2
voice.stop()
bass.stop()

/*=============================================================================
  Part 4 Bass
=============================================================================*/
//keyboard playing S D F D
h2 = Monosynth('pluckEcho')
		.connect(chorus, .5)
		.connect(verb , .5)
h2.loudness = 2