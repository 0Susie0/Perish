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

/*=============================================================================
  Step 1 Percussion and Lead
=============================================================================*/ 

d = Drums('lpf').connect(verb,1)
d.tidal('kd kd kd ~ ~')
d.loudness = 1
pad = Synth[4]('rhodes', { decay:3, gain:.12 })
pad.fx[0].connect( Out, .125)
pad.fx[0].connect( verb, .5 )
pad.cutoff = .01 // will be controlled by pure data
pad.pan = .5
pad.note.seq([5,9,8,9,12,9,8,9,5], [1/8,1/8,1/16,1/16,1/8,1/8,1/8,1/8,1/8])
pad.loudness = 2.5

/*=============================================================================
  Step 2 Music Ends
=============================================================================*/ 

pad.stop()
d.stop()
