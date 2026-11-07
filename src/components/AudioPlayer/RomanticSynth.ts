// Procedural Romantic Web Audio Synthesizer (Music Box / Piano / Warm Chimes)
// Emulates the romantic melody of Ruth B's "Dandelions" with soft sine/triangle oscillators,
// warmth filters, gentle attack/decay, and stereo ambiance.

class RomanticSynth {
  private ctx: AudioContext | null = null;
  private isRunning: boolean = false;
  private isMuted: boolean = false;
  private timer: number | null = null;
  private volumeNode: GainNode | null = null;
  private currentVolume: number = 0.6;
  private audioElement: HTMLAudioElement | null = null;
  private usingAudioElement: boolean = false;

  constructor() {
    // Lazy initialize on first user gesture
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.volumeNode = this.ctx.createGain();
      this.volumeNode.gain.setValueAtTime(this.currentVolume, this.ctx.currentTime);
      this.volumeNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Romantic chord progression & melody notes (frequencies in Hz)
  // Dandelions inspired motif in F Major / D Minor:
  // F (349), C (261), Dm (293), Bb (233)
  private playNote(freq: number, time: number, duration: number, type: OscillatorType = 'sine', velocity: number = 0.3) {
    if (!this.ctx || !this.volumeNode || this.isMuted) return;

    try {
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();
      
      // Warm chime filter
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, time);
      filter.Q.setValueAtTime(2, time);

      osc.type = type;
      osc.frequency.setValueAtTime(freq, time);

      // Acoustic envelope (soft attack, slow lingering decay)
      noteGain.gain.setValueAtTime(0.0001, time);
      noteGain.gain.exponentialRampToValueAtTime(velocity, time + 0.05);
      noteGain.gain.exponentialRampToValueAtTime(velocity * 0.4, time + duration * 0.4);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

      osc.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(this.volumeNode);

      osc.start(time);
      osc.stop(time + duration + 0.1);
    } catch {
      // Audio node failure fallback
    }
  }

  public async start(customAudioUrl?: string) {
    this.initContext();

    // Check if custom audio asset is available and playable
    if (customAudioUrl && !this.audioElement) {
      try {
        const audio = new Audio(customAudioUrl);
        audio.loop = true;
        audio.volume = this.currentVolume;
        
        const canPlay = await audio.play().then(() => true).catch(() => false);
        if (canPlay) {
          this.audioElement = audio;
          this.usingAudioElement = true;
          this.isRunning = true;
          return;
        }
      } catch {
        // Fall back to synth
      }
    }

    if (this.audioElement && this.usingAudioElement) {
      this.audioElement.play().catch(() => {});
      this.isRunning = true;
      return;
    }

    if (this.isRunning) return;
    this.isRunning = true;

    // Procedural Romantic Arpeggio & Melody sequence
    const notes = [
      // Phrase 1: "Cause I'm in a field of dandelions"
      { f: 349.23, d: 0.6, bass: 174.61 }, // F4
      { f: 392.00, d: 0.5 },              // G4
      { f: 440.00, d: 0.8 },              // A4
      { f: 392.00, d: 0.5 },              // G4
      { f: 349.23, d: 0.6, bass: 130.81 }, // F4 / C bass
      { f: 329.63, d: 0.6 },              // E4
      { f: 293.66, d: 1.0, bass: 146.83 }, // D4 / Dm bass
      { f: 349.23, d: 0.5 },              // F4
      { f: 392.00, d: 0.6 },              // G4
      // Phrase 2: "Wishing on every one that you'd be mine"
      { f: 440.00, d: 0.7, bass: 116.54 }, // A4 / Bb bass
      { f: 523.25, d: 0.8 },              // C5
      { f: 440.00, d: 0.5 },              // A4
      { f: 392.00, d: 0.6 },              // G4
      { f: 349.23, d: 1.2, bass: 174.61 }, // F4
      { f: 261.63, d: 0.8 },              // C4
    ];

    let noteIndex = 0;
    const playLoop = () => {
      if (!this.isRunning || !this.ctx) return;

      const current = notes[noteIndex];
      const now = this.ctx.currentTime;

      // Melody note (chime/sine)
      this.playNote(current.f, now, current.d * 1.5, 'sine', 0.22);
      // Soft high harmonic overtone
      this.playNote(current.f * 2, now + 0.02, current.d * 0.8, 'sine', 0.06);

      // Bass note accompaniment if defined
      if (current.bass) {
        this.playNote(current.bass, now, 2.5, 'triangle', 0.18);
        this.playNote(current.bass * 1.5, now + 0.2, 1.8, 'sine', 0.10);
      }

      noteIndex = (noteIndex + 1) % notes.length;
      const nextDelay = current.d * 1000 * 0.95;
      this.timer = window.setTimeout(playLoop, nextDelay);
    };

    playLoop();
  }

  public stop() {
    this.isRunning = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.audioElement) {
      this.audioElement.pause();
    }
  }

  public toggle(customAudioUrl?: string) {
    if (this.isRunning) {
      this.stop();
      return false;
    } else {
      this.start(customAudioUrl);
      return true;
    }
  }

  public setVolume(vol: number) {
    this.currentVolume = Math.max(0, Math.min(1, vol));
    if (this.volumeNode && this.ctx) {
      this.volumeNode.gain.setValueAtTime(this.currentVolume, this.ctx.currentTime);
    }
    if (this.audioElement) {
      this.audioElement.volume = this.currentVolume;
    }
  }

  public mute(isMuted: boolean) {
    this.isMuted = isMuted;
    if (this.volumeNode && this.ctx) {
      this.volumeNode.gain.setValueAtTime(isMuted ? 0 : this.currentVolume, this.ctx.currentTime);
    }
    if (this.audioElement) {
      this.audioElement.muted = isMuted;
    }
  }

  public getState() {
    return {
      isPlaying: this.isRunning,
      isMuted: this.isMuted,
      volume: this.currentVolume,
    };
  }
}

export const romanticAudio = new RomanticSynth();

