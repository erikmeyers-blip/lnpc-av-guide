/* ---------------------------------------------------------------
   LNPC Sanctuary AV Guide — all of the words live here.

   To change what the site says, edit this file only. You should not
   need to touch app.js or styles.css to fix a typo, add a step, or
   add a troubleshooting entry.

   Text supports four bits of formatting, and they can be nested
   (**bold with an *italic* inside** works):
     **bold**            -> bold
     *italic*            -> italic
     `code`              -> monospace (use for names like `Auri_LNPC`)
     [label](#/help/xyz) -> a link

   Block types you can use inside a `body` array:
     { t:'p',    x:'a paragraph' }
     { t:'h',    x:'A subheading' }
     { t:'ul',   x:['bullet', 'bullet'] }
     { t:'ol',   x:['step', 'step'] }
     { t:'rows', x:[['Label','Value'], ['Label','Value']] }
     { t:'note', label:'Good to know', x:'...' }   teal
     { t:'warn', label:'Heads up',     x:'...' }   amber
     { t:'stop', label:'Don’t',   x:'...' }   red
     { t:'open', label:'Still being confirmed', x:'...' }  purple
     { t:'jump', to:'#/help', icon:'🔧', x:'Label' }
     { t:'support' }   drops in the Audio Logic Systems contact block

   NEVER put the PC login PIN, the AV Net wi-fi password, or any other
   password in this file. Both were deliberately kept out of every
   printed and published piece. Point people at a person or a sticker.
   --------------------------------------------------------------- */

var LNPC = {};

/* ---------------------------------------------------------------
   Support contact — Audio Logic Systems
   --------------------------------------------------------------- */

LNPC.support = {
  name:  'Audio Logic Systems',
  phone: '(952) 400-2222',
  tel:   '+19524002222',
  email: 'admin@audiologicsystems.com'
};

/* ---------------------------------------------------------------
   Home screen
   --------------------------------------------------------------- */

LNPC.home = {
  logo: { src: 'assets/img/lnpc-logo.jpg', w: 781, h: 227 },
  heading: 'Lake Nokomis Presbyterian Church',
  sub: 'Sanctuary sound, streaming & hearing assistance',
  intro: 'Most Sundays this is one button and about five minutes. Pick the line below that sounds like you.',
  tiles: [
    {
      to: '#/operator',
      icon: '🎛️',
      title: 'I’m running sound & streaming',
      sub: 'Turn it all on, get the Zoom stream going, shut it down after.'
    },
    {
      to: '#/musician',
      icon: '🎵',
      title: 'I’m playing or singing',
      sub: 'Where to plug in, which mics to use, what you can safely ignore.'
    },
    {
      to: '#/listening',
      icon: '👂',
      title: 'I want to hear better',
      sub: 'Use your own hearing aids, or borrow a receiver from the entrance.'
    },
    {
      to: '#/help',
      icon: '🔧',
      title: 'Something’s not working',
      sub: 'Sorted by what you’re hearing. Phone number for real help at the bottom.',
      cls: 'tile-alert'
    },
    {
      to: '#/reference',
      icon: '📖',
      title: 'Full reference',
      sub: 'Everything in one page — mixer channels, scenes, wireless, open questions.',
      cls: 'tile-quiet'
    }
  ]
};

/* ---------------------------------------------------------------
   Operator walkthrough — the spine of the whole thing
   --------------------------------------------------------------- */

LNPC.operator = {
  title: 'Running sound & streaming',
  lede: 'Start to finish in about ten minutes. Tap a step to check it off — the checkmarks stay put if you get pulled away, and clear themselves out before next Sunday.',
  steps: [
    {
      id: 'rack',
      title: 'Turn on the equipment rack',
      body: [
        { t: 'p', x: 'Go to the rack in the back room and press the power button marked with a **green dot sticker**. That one press wakes up the mixer, the amplifier, and the rest of the rack together.' },
        { t: 'p', x: 'Then **wait 30 to 60 seconds** while it boots. Nothing will work until it finishes, and that’s normal.' },
        { t: 'note', label: 'The dots are the instructions', x: 'A green dot means *this one is yours*. Anything without one isn’t — the hand-lettered sign says the rest: all the levels are already set, and the marked buttons are the only ones you need.' },
        { t: 'note', label: 'You don’t turn on the mics', x: 'Every microphone comes up already live when the rack powers on. There are no individual mic switches to remember.' },
        { t: 'note', label: 'The wireless box stays on', x: 'The wireless access point on top of the rack is **not** on this button — it’s left powered all the time, because it’s slow to boot. Nothing to do with it on a normal Sunday.' }
      ]
    },
    {
      id: 'computer',
      title: 'Turn on the streaming computer',
      body: [
        { t: 'p', x: 'The small PC lives on the TV cart. Its power button is **just to the left of the USB port**, with a green dot on it.' },
        { t: 'p', x: 'Let it boot, then tap the keyboard or wiggle the mouse to bring up the login screen.' },
        { t: 'warn', label: 'Login PIN', x: 'Ask this week’s Hospitality team tech volunteer for the PIN. It is deliberately not printed here, on the station cards, or in the printed guide.' }
      ]
    },
    {
      id: 'tv',
      title: 'Turn on the TV',
      body: [
        { t: 'p', x: 'The TV does **not** come on with the computer. It’s its own step, and it’s the one people forget.' },
        { t: 'p', x: 'Use the remote, or the button on the TV itself — on the right-hand side if you’re facing the TV, on your left if you’re standing behind it.' },
        { t: 'warn', label: 'Prefer the remote', x: 'That button on the TV is a **Power *and* Input button**. It only turns the TV on when the TV is off — press it while the TV is already on and it changes the input instead. Holding it for 12 seconds factory-resets the TV, so don’t hold it down.' },
        { t: 'note', label: 'Put the remote back', x: 'There are storage compartments on the side of the cart. The remote is the easiest thing in the building to lose — give it a home and use it.' },
        { t: 'jump', to: '#/help/tv-blank', icon: '🔧', x: 'The TV isn’t showing anything' }
      ]
    },
    {
      id: 'zoom',
      title: 'Open Zoom and check the settings',
      body: [
        { t: 'p', x: 'This is the step most worth slowing down for. Everything else is a button; this one has six things to confirm.' },
        { t: 'ol', x: [
          'Open **Zoom Workplace**. It’s already signed in with the church’s account — no login needed.',
          'Click **New Meeting** for an ordinary Sunday, or open the meeting that’s already scheduled.',
          'Check the six settings below. Every time.'
        ]},
        { t: 'rows', x: [
          ['Camera', 'Logi Rally Bar Mini'],
          ['Microphone', 'iRig Pro'],
          ['Speaker', 'Rally Bar Mini'],
          ['Original sound for musicians', 'ON'],
          ['Echo cancellation', 'OFF'],
          ['Automatically adjust mic volume', 'OFF']
        ]},
        { t: 'note', label: 'Why bother every week', x: 'Zoom updates quietly reset these. And the sanctuary system hands Zoom a finished, balanced mix — Zoom’s helpful auto-adjusting and echo cancellation are built for a laptop mic and end up fighting the mix instead.' },
        { t: 'p', x: 'The little **green microphone indicator** in the corner of the Zoom window is your confirmation that sound is actually reaching Zoom. If you’re unsure, run Zoom’s own *Test Speaker & Microphone*.' },
        { t: 'jump', to: '#/help/stream-sound', icon: '🔧', x: 'If people online can’t hear anything' }
      ]
    },
    {
      id: 'camera',
      title: 'Point the camera',
      body: [
        { t: 'p', x: 'The camera is the **Rally Bar Mini** above the TV. The cart remote’s direction pad moves it.' },
        { t: 'p', x: 'Nudging it by hand takes it out of automatic tracking until the next time the system is powered off — which is usually exactly what you want on a Sunday.' },
        { t: 'open', x: 'Saved camera positions (a “home” preset you could jump back to) were discussed but haven’t been set up yet.' }
      ]
    },
    {
      id: 'admit',
      title: 'Let the online folks in',
      body: [
        { t: 'p', x: 'Whoever is logged in at the cart PC is the **host**. Admit people from the waiting room as they arrive.' },
        { t: 'stop', label: 'Leave the waiting room on', x: 'Admitting people is required on purpose. It was switched off once and the meeting got Zoom-bombed. Please don’t turn it off again.' },
        { t: 'h', x: 'Optional: admit people from your own phone' },
        { t: 'p', x: 'Latecomers turning up mid-service means walking to the cart every time, which can feel disruptive. You can avoid that by putting the controls in your pocket instead.' },
        { t: 'ol', x: [
          '**Before the service starts**, join the same Zoom meeting on your phone as well. You’ll be in twice — once at the cart, once on the phone.',
          'At the cart PC, find yourself in the participants list and make your phone a **co-host**.',
          'Now you can admit people from the waiting room on your phone, from wherever you’re sitting.'
        ]},
        { t: 'note', label: 'Entirely optional', x: 'Nothing breaks if you skip this and just walk up to the cart. Set it up before the service though — you can’t promote yourself to co-host once you’ve left the PC.' },
        { t: 'warn', label: 'Mute your phone', x: 'Your phone is now a second microphone and speaker in a room that already has both. Mute it and turn its volume right down as soon as you join, or you’ll get howling feedback.' }
      ]
    },
    {
      id: 'talkback',
      title: 'Talking to people on Zoom',
      body: [
        { t: 'p', x: 'The small microphone at the cart lets you speak directly to the people at home, separate from the sanctuary mix.' },
        { t: 'p', x: '**Rest your finger on the center of the button.** The light comes on while you’re holding it and goes off the moment you let go. It can’t be left on by accident, and a visitor who doesn’t know what it is can’t trigger it.' },
        { t: 'note', label: 'Don’t lean in', x: 'Speak from a normal, comfortable distance. Leaning right down into it is what makes it distort.' },
        { t: 'jump', to: '#/help/talkback', icon: '🔧', x: 'More on the push-to-talk mic' }
      ]
    },
    {
      id: 'shutdown',
      title: 'At the end of the service',
      body: [
        { t: 'ol', x: [
          'End the Zoom meeting.',
          'Shut the computer down **properly**, from the Start menu.',
          'Turn the TV off.',
          'Press the same green-dot button on the rack to power it back down.'
        ]},
        { t: 'note', label: 'The one rule', x: 'The computer and the TV can go in either order. What matters is that they get **powered off before anything is unplugged** — that’s what keeps them alive for years instead of months.' }
      ]
    }
  ],
  after: [
    { t: 'jump', to: '#/mixer',    icon: '🎛️', x: 'Mixer reference — channels, levels, scene recall' },
    { t: 'jump', to: '#/wireless', icon: '📶', x: 'Adjusting the mixer from an iPad' },
    { t: 'jump', to: '#/help',     icon: '🔧', x: 'Something’s not working' }
  ]
};

/* ---------------------------------------------------------------
   Musician / performer path
   --------------------------------------------------------------- */

LNPC.musician = {
  title: 'Playing or singing',
  lede: 'Short version: plug in and play. The sound is already set, and none of the equipment is your job.',
  body: [
    { t: 'note', label: 'What you don’t have to touch', x: 'The mixer, the touchscreen, the rack, the scenes — none of it. If you can hear yourself and someone gave you a thumbs up, you’re done.' },

    { t: 'h', x: 'Where to plug in' },
    { t: 'p', x: 'There are labeled wall jacks near the pulpit and lectern — **Side Pulpit 1**, **Side Pulpit 2** — that take an ordinary XLR mic cable. More inputs (Plate 1 through 10) live in the rack for bigger setups.' },
    { t: 'p', x: 'They’re already wired through to the mixer and already set up. Plugging in is the whole job.' },
    { t: 'note', label: 'The labels lie a little', x: 'The jack labeled **Side Pulpit 1** is where the piano mic is plugged in, and **Side Pulpit 2** is the vocal mic. The printed labels stayed as they were during setup, so don’t be thrown by the names.' },

    { t: 'h', x: 'The piano' },
    { t: 'ul', x: [
      'The contact mic is **permanently mounted inside the piano**. It lives there — don’t take it out, don’t put it away, and don’t unplug it.',
      'The lid can stay closed. It rests on the cord and that’s fine.',
      'It goes into its own dedicated line input, not the wall plate meant for vocal mics. That’s already connected — nothing to plug in.'
    ]},
    { t: 'note', label: 'If the piano sounds wrong online', x: 'Where the mic sits changes the tone more than the volume — closer to the hammers is brighter, further back is softer. Now that it’s permanently mounted, moving it is a between-services job — not something to fiddle with on a Sunday.' },
    { t: 'note', label: 'Piano in the room vs. online', x: 'The piano is set to go to the live stream and the hearing assistance feed, and to sit low or off in the room speakers — the room already has a piano in it. That was a deliberate choice and it can be changed if you’d prefer it different. Just ask.' },

    { t: 'h', x: 'The instrument mics' },
    { t: 'ul', x: [
      'Two Shure small-diaphragm condenser mics live in a case. They’re very directional and they sound lovely on strings — cello, violin and the like.',
      'A **stereo mic bar** puts both of them on a single stand. That’s the setup for a small ensemble sitting in a half circle, so one mic isn’t favoring whoever happens to be closest.'
    ]},
    { t: 'warn', label: 'These two need a tech first', x: 'The instrument mics need **phantom power** (48V) switched on for their channel, and the church chose to leave phantom power **off** by default. Ask this week’s Hospitality team tech volunteer to switch it on before you play — it takes them a moment on the mixer.' },
    { t: 'stop', label: 'Never yank a live mic', x: 'Don’t unplug an instrument or piano mic while its channel is on. Phantom power plus an unplugged cable makes a loud pop that can damage the speakers. Turn the channel off first, then unplug.' },

    { t: 'h', x: 'The lectern mic' },
    { t: 'p', x: 'The gooseneck mic at the lectern is a good microphone and it is **fine to move**. Bend it so it points at your mouth. That’s what it’s for.' },

    { t: 'h', x: 'If two of you are on mics' },
    { t: 'p', x: 'The handheld, the lavalier and the lectern mic run through an automatic mixer. When two of them pick up the same voice, the system instantly keeps the one with the better signal and rests the other. You won’t hear it happen.' },
    { t: 'p', x: 'Two people reading different things at the same time both come through normally. If it looks like only one mic is working, that’s usually this doing its job — not a fault.' },

    { t: 'jump', to: '#/help', icon: '🔧', x: 'Something doesn’t sound right' }
  ]
};

/* ---------------------------------------------------------------
   Assistive listening — congregation facing
   --------------------------------------------------------------- */

LNPC.listening = {
  title: 'Hearing the service more clearly',
  lede: 'The sanctuary broadcasts the service straight to hearing aids and to small receivers you can borrow. There are two ways in — pick the one that matches what you’ve got.',
  fork: [
    {
      to: '#/listening/my-device',
      tag: 'Path A',
      title: 'My hearing aids or earbuds do Auracast',
      sub: 'Connect directly. Nothing to borrow, nothing to hand back.'
    },
    {
      to: '#/listening/receiver',
      tag: 'Path B',
      title: 'I’d like to borrow a receiver',
      sub: 'A small receiver with an earphone, or a neck loop for telecoil hearing aids.'
    }
  ],
  body: [
    { t: 'note', label: 'Not sure which one you are?', x: 'Bluetooth and Auracast are not the same thing. Plenty of Bluetooth hearing aids can’t do Auracast — it’s newer. If you don’t know, **borrow a receiver**. It takes ten seconds, it always works, and you can figure out the fancy version another Sunday. Ask a Hospitality team host.' },
    { t: 'p', x: 'Either way you’re hearing the same thing: the same full mix that goes out to the people watching online — the microphones, not the room.' },
    { t: 'jump', to: '#/help/hearing', icon: '🔧', x: 'It’s not working, or it’s too quiet' }
  ]
};

LNPC.listeningDevice = {
  title: 'Using your own hearing aids',
  lede: 'Path A — for hearing aids or earbuds that support Auracast broadcast audio.',
  body: [
    { t: 'ol', x: [
      'Open your hearing aid app, or your phone’s Bluetooth / Auracast settings — whichever is how you normally switch your hearing aids between things.',
      'Look for a broadcast named `Auri_LNPC` and connect to it.',
      'Set the volume with your usual hearing aid controls.'
    ]},
    { t: 'open', label: 'Name still being confirmed', x: 'We expect the broadcast to be called `Auri_LNPC`. If you see something close but not identical, that’s almost certainly it — and this week’s Hospitality team tech volunteer can confirm the exact name.' },
    { t: 'note', label: 'You may have to let go of your phone first', x: 'At the training, one person’s hearing aids wouldn’t pick up the broadcast until they stopped the audio their phone was already sending. If nothing shows up, try pausing whatever your phone is playing.' },
    { t: 'note', label: 'A passcode shouldn’t be needed', x: 'Hearing assistance broadcasts are normally left open so anyone can join. If your device asks you for one, don’t guess — ask a Hospitality team host.' },
    { t: 'p', x: 'There’s no limit on how many personal devices can listen at once, so you’re never taking a spot from someone else.' },
    { t: 'warn', label: 'If your device needs someone else to switch it on', x: 'Some phones and hearing aids need a person to start the connection for you. A Hospitality team host can help, and a borrowed receiver is always an option instead.' },
    { t: 'jump', to: '#/listening/receiver', icon: '📻', x: 'It’s not connecting — borrow a receiver instead' },
    { t: 'jump', to: '#/help/hearing', icon: '🔧', x: 'Hearing assistance troubleshooting' }
  ]
};

LNPC.listeningReceiver = {
  title: 'Borrowing a receiver',
  lede: 'Path B — a small receiver with either an earphone or a neck loop. The church has four of each.',
  steps: [
    {
      id: 'pickup',
      title: 'Pick one up',
      body: [
        { t: 'p', x: 'The receivers live in a charging dock, most likely **near the sanctuary entrance**. If you can’t see it, ask a **Hospitality team host** — they’ll know where it is and they’re happy to help you get set up.' },
        { t: 'open', x: 'The dock’s permanent home isn’t settled yet — it depends on where there’s a power outlet near the entrance. Until it’s fixed in one place, asking a Hospitality team host is the reliable way to find it.' }
      ]
    },
    {
      id: 'accessory',
      title: 'Choose how you want to listen',
      body: [
        { t: 'ul', x: [
          '**Earset** — a small earphone that plugs into the headphone jack. This is the one most people want.',
          '**T-coil neck loop** — plugs into the lanyard jack and sends the sound straight into a telecoil-compatible hearing aid. Nothing goes in your ear at all.'
        ]},
        { t: 'note', label: 'Which is which', x: 'If your hearing aids have a telecoil setting, the neck loop is usually the nicer experience. If you’re not sure, take the earset.' }
      ]
    },
    {
      id: 'poweron',
      title: 'Switch it on',
      body: [
        { t: 'p', x: 'Lifting the receiver off the charging dock turns it on by itself.' },
        { t: 'p', x: 'If it’s already off, **press and hold the black power button on the side** for about a second. The screen lights up.' }
      ]
    },
    {
      id: 'connect',
      title: 'Let it find the service',
      body: [
        { t: 'p', x: 'It searches on its own and connects — you don’t have to do anything. The screen shows the name of what it’s listening to, which should read `Auri_LNPC`.' },
        { t: 'p', x: 'If the screen has gone dark, that’s just the battery saver. A quick press of any button wakes it up.' },
        { t: 'note', label: 'Wrong name, or no connection?', x: 'Press the **scan / select** button (front right) to search again. Scroll the list with the front left button or the volume buttons, then press scan / select again to join the one you want.' }
      ]
    },
    {
      id: 'volume',
      title: 'Set your volume',
      body: [
        { t: 'p', x: 'The **up and down buttons on the other side** are the volume. Start low and bring it up until it’s comfortable — these can get loud.' }
      ]
    },
    {
      id: 'return',
      title: 'When the service is over',
      body: [
        { t: 'p', x: 'Hold the power button for **3 seconds** to switch it off, then put it back in the charging dock so it’s ready for whoever needs it next week.' },
        { t: 'note', label: 'It won’t run out on you', x: 'A full charge lasts more than twenty hours, and a flat one is full again in under four.' }
      ]
    }
  ],
  after: [
    { t: 'jump', to: '#/help/hearing', icon: '🔧', x: 'It won’t connect, or it’s too quiet' },
    { t: 'jump', to: '#/listening/my-device', icon: '📱', x: 'Using your own Auracast hearing aids instead' }
  ]
};

/* ---------------------------------------------------------------
   Mixer reference
   --------------------------------------------------------------- */

LNPC.mixer = {
  title: 'The mixer',
  lede: 'Most Sundays need none of this. It’s here for whoever ends up doing the fine-tuning, and for the moment when something needs putting back.',
  body: [
    { t: 'note', label: 'The one thing worth knowing', x: 'If everything sounds wrong, you can put every setting back to normal in four taps. It’s the **scene recall**, further down this page, and it is the safety net for the whole system.' },

    { t: 'h', x: 'What’s on each channel' },
    { t: 'rows', x: [
      ['CH1 · HH', 'Handheld wireless mic'],
      ['CH2 · Lav', 'Lavalier wireless mic'],
      ['CH3 · S.Pulpit1', 'Piano mic (yes, really)'],
      ['CH4 · S.Pulpit2', 'Vocal mic at the pulpit'],
      ['CH5 · S.Lctern', 'Lectern gooseneck mic'],
      ['CH6 · S.Lctern2', 'Second lectern input'],
      ['CH7 · Plate1', 'Wall plate input 1'],
      ['CH8 · Plate2', 'Wall plate input 2'],
      ['Ambient', 'Room mic above the door — stream only']
    ]},
    { t: 'note', label: 'Mind the labels', x: 'The channel labeled **S.Pulpit1** is the piano. The labels were left as printed during setup rather than renamed, so read them as “which jack” rather than “what’s plugged into it.” They can be renamed on the touchscreen if that ever gets confusing.' },
    { t: 'p', x: 'Scrolling further gets you the rest of the plate inputs (through Plate 8), a spare channel, and the ambient mic. The ambient mic is the one above the sanctuary door — it gives people watching online a sense of a room with people in it, and it never goes to the room speakers.' },

    { t: 'h', x: 'Three destinations, one channel' },
    { t: 'p', x: 'Every input can be sent to three places, at three different levels:' },
    { t: 'rows', x: [
      ['A', 'The room speakers'],
      ['B', 'The live stream (Zoom)'],
      ['C', 'Hearing assistance (Auracast)']
    ]},
    { t: 'p', x: 'That’s how the piano reaches people online and people with hearing aids without also filling a room that already has a piano in it.' },
    { t: 'p', x: 'To change just one of them: **select the channel**, then turn the knob for A, B or C. Left is quieter, right is louder, and the other two destinations don’t move.' },
    { t: 'note', label: 'The common request', x: 'If people online say the piano is too loud and the room is fine, that’s **B on the piano channel** — not the channel fader.' },

    { t: 'h', x: 'Finding your way around' },
    { t: 'ul', x: [
      'The **Home** key always brings you back to the main view. If you’re lost in a menu, press it. Press it again to land on the faders.',
      'Touch a channel to select it — it glows — then use the **Touch and Turn** knob to change its level.',
      'The **Cue** button sends one channel to headphones on its own, which is how you work out which mic is making a weird noise.'
    ]},

    { t: 'h', x: 'Putting everything back — scene recall' },
    { t: 'p', x: 'All the working settings are saved as a **scene** (it’s the starting file listed in the scenes menu). Recalling it restores every channel at once.' },
    { t: 'ol', x: [
      'Press **Home** if you’re somewhere else.',
      'Open the **Scenes** list, in the top corner.',
      'Touch the starting scene so it’s highlighted.',
      'Touch **Recall**, and confirm.'
    ]},
    { t: 'note', label: 'Look before you recall', x: 'First glance around for something obviously bumped — a fader pulled down, a channel switched off. Often it’s one thing, and putting that one thing back is quicker and less alarming than a full recall.' },

    { t: 'h', x: 'Scenes for special Sundays' },
    { t: 'p', x: 'You can save extra named scenes — a Christmas setup with extra players, say — without touching the everyday one. Individual channels can be saved as presets too.' },
    { t: 'open', x: 'No extra scenes exist yet beyond the starting one. The vendor was clear that real settings come from a few services’ worth of feedback, so this is worth revisiting once the system has some Sundays behind it.' },

    { t: 'h', x: 'Phantom power' },
    { t: 'p', x: 'The instrument mics, the piano mic and the lectern gooseneck all need **48V phantom power**. It’s deliberately left switched off on the general-purpose channels.' },
    { t: 'stop', label: 'Why it matters', x: 'Unplugging a live phantom-powered mic makes a loud pop that can damage the speakers. Turn the channel off before unplugging anything, every time.' },
    { t: 'p', x: 'If a channel gets dedicated to a mic that always needs phantom power, it’s safe to leave it on for that channel — as long as nothing else ever gets plugged in there.' },

    { t: 'h', x: 'Locking the touchscreen' },
    { t: 'note', label: 'There’s no password on it', x: 'The touchscreen *can* be locked so only certain people can change things, but the church decided against it for now. Anyone can walk up and adjust it — which is exactly why the scene recall above matters.' },

    { t: 'jump', to: '#/wireless', icon: '📶', x: 'Doing all this from an iPad instead' },
    { t: 'jump', to: '#/help/mixer-changed', icon: '🔧', x: 'Someone changed something and now it sounds wrong' }
  ]
};

/* ---------------------------------------------------------------
   Wireless control
   --------------------------------------------------------------- */

LNPC.wireless = {
  title: 'Controlling the mixer wirelessly',
  lede: 'You can adjust the mixer from an iPad anywhere in the room, instead of standing in the back.',
  body: [
    { t: 'ol', x: [
      'Install **TF StageMix** — search the App Store for *Yamaha TF*. The icon is green.',
      'Join the wi-fi network named **AV Net**. It’s the mixer’s own network, not the church wi-fi.',
      'Open the app. It finds the mixer by itself — tap **Connect**.'
    ]},
    { t: 'warn', label: 'The AV Net password', x: 'It’s on a **sticker on the router**, sitting on top of the rack. It isn’t printed here or on any of the cards, on purpose.' },
    { t: 'note', label: 'iPad, not iPhone', x: 'TF StageMix is an iPad-only app, and it isn’t on Android at all. There’s a second Yamaha app called **Monitor Mix** that does show up on phones — that one is for performers adjusting their own monitors and won’t do what you want here. Don’t mix them up.' },
    { t: 'p', x: 'Several devices can be connected at once, and anything you change is saved on the mixer itself — so a change made from an iPad is there on the touchscreen too, and the other way around.' },
    { t: 'p', x: 'The mixer is a **Yamaha TF5**.' }
  ]
};

/* ---------------------------------------------------------------
   Troubleshooting — symptom first
   --------------------------------------------------------------- */

LNPC.help = {
  title: 'Something’s not working',
  lede: 'Find the line that matches what you’re hearing. If none of it helps, the phone number at the bottom is a real one and they answer.',
  symptoms: [
    {
      id: 'room-sound',
      q: 'No sound in the room',
      body: [
        { t: 'ol', x: [
          'Check the rack is on — the green-dot button — and that you gave it 30 to 60 seconds to boot.',
          'Check the microphone itself is switched on and not muted at the mic. Wireless handhelds and lavaliers have their own switches.',
          'Look at the mixer for something obviously bumped — a fader pulled down, a channel switched off.',
          'Check the amplifier’s power light in the rack.',
          'If several things look wrong at once, [recall the starting scene](#/mixer).'
        ]},
        { t: 'note', label: 'Worth knowing', x: 'All the mics come up live on their own when the rack powers up — so “someone forgot to switch the mic on at the mixer” isn’t usually the answer. Look at the mic in someone’s hand first.' }
      ]
    },
    {
      id: 'stream-sound',
      q: 'The room is fine, but there’s no sound on the stream',
      body: [
        { t: 'ol', x: [
          'Check Zoom isn’t muted. Muting Zoom cuts off the whole sanctuary feed, not just the little mic at the cart.',
          'Re-check Zoom’s **Microphone** is set to **iRig Pro** and **Speaker** to **Rally Bar Mini**. Zoom updates reset these silently.',
          'Check **Original sound for musicians** is still ON and **echo cancellation** is OFF.',
          'Run Zoom’s *Test Speaker & Microphone* to work out whether the problem is in Zoom or upstream of it.',
          'On the mixer, check the channel is actually being sent to **output B** (the stream), not just A (the room).'
        ]},
        { t: 'jump', to: '#/operator', icon: '🎛️', x: 'The full Zoom settings checklist' }
      ]
    },
    {
      id: 'distorted',
      q: 'It sounds distorted, too loud, or too quiet',
      body: [
        { t: 'p', x: '**Distorted** almost always means a signal is too hot going *into* something. Bring the source down a little rather than turning the destination up.' },
        { t: 'p', x: '**Too quiet on one feed only** — fine in the room but thin online, say — is that channel’s A/B/C output level, not its main fader. A is the room, B is the stream, C is hearing assistance.' },
        { t: 'note', label: 'The level knob at the cart', x: 'There’s a small level meter and control on the iRig at the cart, set in the middle. If everything on the stream is distorted but the balance sounds right, easing that down slightly is the fix. Note where it was before you move it, and move it a little at a time.' },
        { t: 'jump', to: '#/mixer', icon: '🎛️', x: 'How the A / B / C levels work' }
      ]
    },
    {
      id: 'mixer-changed',
      q: 'Someone’s been at the mixer and everything sounds wrong',
      body: [
        { t: 'p', x: 'First, have a look for one obvious thing — a fader pulled down, a channel switched off. Often that’s all it is.' },
        { t: 'p', x: 'Otherwise, put it all back at once:' },
        { t: 'ol', x: [
          'Press **Home**.',
          'Open the **Scenes** list, top corner.',
          'Touch the starting scene.',
          'Touch **Recall** and confirm.'
        ]},
        { t: 'p', x: 'That restores every channel to the settings that were saved as known-good. Nothing is lost that you’d miss.' }
      ]
    },
    {
      id: 'talkback',
      q: 'People on Zoom say the push-to-talk mic sounds bad',
      body: [
        { t: 'ul', x: [
          'Speak from a normal distance rather than leaning down into it. Leaning in is what makes it distort.',
          'Hold your finger steady on the center of the button — the light should stay lit the whole time you’re talking.'
        ]},
        { t: 'note', label: 'This was fixed', x: 'This microphone did sound rough to people online at the August 19 training, and Audio Logic Systems has since sorted it out. So if it starts misbehaving again, that’s something new rather than the old problem — worth a phone call.' }
      ]
    },
    {
      id: 'hearing',
      q: 'A hearing assistance receiver won’t connect, or it’s too quiet',
      body: [
        { t: 'ol', x: [
          'Check it’s on — hold the black power button on the side; the screen should light. A dark screen may just be the battery saver, so press any button first.',
          'Check the volume with the up and down buttons on the other side. Quiet is far more often this than anything else.',
          'Check the earphone or neck loop is pushed all the way into its jack.',
          'Look at the name on the screen — it should say `Auri_LNPC`. If it’s showing something else or nothing, press the **scan / select** button to search again.',
          'Still nothing? Switch it off (hold 3 seconds), take a different receiver from the dock, and try that.'
        ]},
        { t: 'note', label: 'If it’s a personal device, not a receiver', x: 'Check the hearing aids or earbuds genuinely do **Auracast**, not just Bluetooth — they’re not the same thing, and plenty of good Bluetooth hearing aids can’t do it. Borrowing a receiver always works.' },
        { t: 'jump', to: '#/listening', icon: '👂', x: 'Full hearing assistance guide' }
      ]
    },
    {
      id: 'tv-blank',
      q: 'The TV isn’t showing anything',
      body: [
        { t: 'p', x: 'Two things cause this, and from a few feet away they look identical. Check them in this order.' },

        { t: 'h', x: '1. The TV has switched itself off' },
        { t: 'p', x: 'If the computer is on but **Zoom isn’t running yet**, the PC goes to sleep — and the TV, seeing no signal, switches itself off about ten minutes later. Nothing is broken.' },
        { t: 'p', x: 'Turn it back on with the power button on the **remote**, or with the button on the TV itself — on the right-hand side if you’re facing the TV, on your left if you’re standing behind it.' },
        { t: 'note', label: 'This one can be switched off for good', x: 'The ten-minute shutoff is an energy-saving setting that VIZIO turns on by default, and it can simply be disabled: **Menu → System → Timers → Auto Power Off → Off**. Worth doing once on a quiet weekday, and then it stops happening at all.' },

        { t: 'h', x: '2. The TV is on the wrong input' },
        { t: 'p', x: 'If the screen is clearly lit — a menu, a blue screen, a “no signal” message — the TV is awake but watching the wrong socket.' },
        { t: 'p', x: 'Press the **INPUT** button on the remote, then step through the list (`HDMI-1`, `HDMI-2`, `HDMI-3`) until the computer’s desktop appears. Leave it there.' },
        { t: 'warn', label: 'How the input gets changed', x: 'The button on the TV itself is a **Power *and* Input button**. While the TV is already on, a quick press doesn’t switch it off — it jumps to the next input. Somebody trying to turn the TV off with it will change the input instead. Use the remote when you can.' },
        { t: 'stop', label: 'Never hold that button down', x: 'Holding it for 3 seconds turns the TV off, which is fine. Holding it for **12 seconds resets the TV to factory settings** and wipes everything. If a press doesn’t do what you expected, let go and reach for the remote.' },

        { t: 'note', label: 'Once the meeting is running', x: 'With the Zoom meeting going the computer stays awake, so the sleep version of this doesn’t happen. It’s really a between-times thing — if you switch everything on well before the service, expect it and don’t panic.' },
        { t: 'open', x: 'Which HDMI input the computer is plugged into hasn’t been written down anywhere. Once somebody confirms it, naming it here — and on the TV cart card — turns this from a hunt into one press.' },
        { t: 'p', x: 'The TV is a **VIZIO V-Series V505-J09**, if you need to look up a setting or mention it on a support call.' }
      ]
    },
    {
      id: 'camera',
      q: 'The camera is stuck or pointing at the wrong thing',
      body: [
        { t: 'p', x: 'Use the direction pad on the cart remote to move it where you want. Doing that also takes the camera out of automatic tracking until the next time the system is powered down, which is usually what you want anyway.' },
        { t: 'p', x: 'If the remote has gone missing, check the storage compartments on the side of the cart.' }
      ]
    },
    {
      id: 'two-mics',
      q: 'Two mics are open but only one seems to be working',
      body: [
        { t: 'p', x: 'That’s almost certainly the automatic mixer doing its job. The handheld, lavalier and lectern mics are set so that when two of them pick up the same voice, the system keeps the better one and rests the other. It switches instantly and you shouldn’t hear it.' },
        { t: 'p', x: 'Two people saying different things at the same time will both come through normally. If you genuinely think it’s misbehaving, that’s a phone call — it can be switched off, but not by guesswork.' }
      ]
    },
    {
      id: 'no-avnet',
      q: 'The iPad can’t find the mixer, or AV Net has disappeared',
      body: [
        { t: 'p', x: 'The mixer has its own little wireless box — the **access point** sitting on top of the rack. It broadcasts the `AV Net` network. If that network isn’t showing up, start there.' },
        { t: 'ol', x: [
          'Check the access point on top of the rack has power and its lights are on.',
          'Remember it is **not** on the rack’s green-dot button — it stays powered all the time, so turning the rack off and on again won’t restart it.',
          'If it has lost power, it takes a few minutes to boot back up. Give it time before deciding it’s broken.',
          'Check the iPad is joined to `AV Net` and not the church’s ordinary wi-fi. They’re different networks.',
          'Still nothing? The everyday system doesn’t need the iPad at all — the mixer touchscreen does everything. Carry on with the service and sort this out afterwards.'
        ]},
        { t: 'note', label: 'This isn’t a Sunday emergency', x: 'The wireless control is a convenience, not a requirement. Nothing about the service depends on it.' }
      ]
    },
    {
      id: 'lost',
      q: 'I’m lost on the mixer screen',
      body: [
        { t: 'p', x: 'Press **Home**. It always takes you back to the main view, from anywhere, and pressing it again lands you on the faders. Nothing you tapped on the way in has broken anything.' }
      ]
    }
  ]
};

/* ---------------------------------------------------------------
   Support page
   --------------------------------------------------------------- */

LNPC.supportPage = {
  title: 'Getting help',
  lede: 'The system was installed by Audio Logic Systems, and they expect these calls. Nobody minds.',
  body: [
    { t: 'support' },
    { t: 'note', label: 'Ask for a video call', x: 'The team specifically suggested a **FaceTime or video call** for anything physical — pointing a phone camera at the rack and letting them look sorts out most things in a few minutes.' },
    { t: 'p', x: 'Their main office line is answered around the clock, including holidays. There’s an option for urgent problems that routes to whoever can actually help, and they call back.' },
    { t: 'h', x: 'Worth having ready when you call' },
    { t: 'ul', x: [
      'What you’re hearing, and where — in the room, on the stream, or on a hearing assistance receiver.',
      'When it started, and anything that changed just before.',
      'Whether you’ve tried recalling the starting scene on the mixer.'
    ]},
    { t: 'h', x: 'Inside the church' },
    { t: 'p', x: 'For the PC login PIN, the AV Net wi-fi password, or anything to do with switching on phantom power for an instrument mic, ask this week’s Hospitality team tech volunteer. Those are all deliberately kept off the printed cards and off this site.' }
  ]
};

/* ---------------------------------------------------------------
   Open items — carried through from the outline, still unresolved
   --------------------------------------------------------------- */

LNPC.openItems = {
  title: 'Still being confirmed',
  lede: 'A short list of things still to pin down. Nothing here has been guessed at — if you know the answer, it’s worth telling whoever maintains this guide.',
  body: [
    { t: 'ul', x: [
      'Where the hearing assistance charging dock permanently lives — it wants to be near the sanctuary entrance, but that depends on finding a power outlet there.',
      'A visual confirmation of the exact Auracast broadcast name against a live receiver screen — we expect `Auri_LNPC`.',
      'Saved camera positions for the Rally Bar Mini — discussed, not yet set up.',
      'Which input on the TV the streaming computer is plugged into, so it can be named in the troubleshooting steps instead of hunting for it.'
    ]},

    { t: 'h', x: 'Settled since the August 19 training' },
    { t: 'ul', x: [
      '**Piano mic** — permanently mounted inside the piano. Nothing to rig, nothing to put away.',
      '**Mixer lock** — no password on the touchscreen for now. Anyone can adjust it, so the scene recall is the safety net.',
      '**Wireless access point** — stays powered all the time, separate from the rack’s green-dot button.',
      '**PC login PIN** — never printed anywhere. Ask this week’s Hospitality team tech volunteer.',
      '**Auri Manager** — the admin software is Audio Logic’s tool, not something LNPC uses. Deliberately left out of this guide.'
    ]},
    { t: 'note', label: 'Deliberately not published', x: 'The PC login PIN and the AV Net wi-fi password are not on this site, on the station cards, or in the printed guide. That was a decision, not an oversight — ask this week’s Hospitality team tech volunteer, or read the sticker on the router.' }
  ]
};

/* ---------------------------------------------------------------
   Full reference — assembled from everything above, in reading order
   --------------------------------------------------------------- */

LNPC.reference = {
  title: 'Full reference',
  lede: 'Everything on one page, in order. For whoever is doing the fine-tuning, and for anyone who’d rather read the whole thing than tap through it.',
  sections: [
    { id: 'startup',   heading: 'Starting up and shutting down', from: 'operator'  },
    { id: 'mixer',     heading: 'The mixer',                     from: 'mixer'     },
    { id: 'wireless',  heading: 'Controlling the mixer wirelessly', from: 'wireless' },
    { id: 'musician',  heading: 'Musicians and performers',      from: 'musician'  },
    { id: 'listening', heading: 'Hearing assistance',            from: 'listening' },
    { id: 'symptoms',  heading: 'Troubleshooting by symptom',    from: 'help'      },
    { id: 'open',      heading: 'Still being confirmed',         from: 'openItems' },
    { id: 'support',   heading: 'Getting help',                  from: 'supportPage' }
  ]
};
