import { SoundEngineInterface } from "./types";

// Web Audio API 振盪器音源
export class OscillatorPlayer implements SoundEngineInterface {
  private audioContext: AudioContext | null = null;
  private currentOscillator: OscillatorNode | null = null;
  private isContextReady = false;

  private async getAudioContext(): Promise<AudioContext> {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
    }

    // 只在第一次需要時啟動上下文
    if (!this.isContextReady && this.audioContext.state === "suspended") {
      try {
        await this.audioContext.resume();
        this.isContextReady = true;
      } catch (error) {
        console.warn("Failed to resume audio context:", error);
      }
    }

    return this.audioContext;
  }

  // 預先初始化 AudioContext (可在首次用戶互動時調用)
  async initialize(): Promise<void> {
    await this.getAudioContext();
  }

  async playNote(
    note: string,
    octave: number = 4,
    tuningStandard: number = 440
  ): Promise<void> {
    try {
      // 如果 AudioContext 還沒準備好，快速初始化
      if (!this.isContextReady) {
        await this.getAudioContext();
      }

      const audioContext = this.audioContext!;
      const frequency = this.calculateFrequency(note, octave, tuningStandard);

      // 停止之前的音符
      this.stop();

      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = "triangle";

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 1
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 1);

      this.currentOscillator = oscillator;

      // 設定清理邏輯，但不等待
      oscillator.onended = () => {
        this.currentOscillator = null;
      };

      // 立即返回，不等待音符結束
      return Promise.resolve();
    } catch (error) {
      console.error("Failed to play note:", error);
      return Promise.resolve();
    }
  }

  private calculateFrequency(
    note: string,
    octave: number,
    tuningStandard: number
  ): number {
    const noteValues = {
      C: -9,
      "C#": -8,
      D: -7,
      "D#": -6,
      E: -5,
      F: -4,
      "F#": -3,
      G: -2,
      "G#": -1,
      A: 0,
      "A#": 1,
      B: 2,
    };
    const semitones =
      noteValues[note as keyof typeof noteValues] + (octave - 4) * 12;
    return tuningStandard * Math.pow(2, semitones / 12);
  }

  stop(): void {
    if (this.currentOscillator) {
      try {
        this.currentOscillator.stop();
      } catch (error) {
        // 忽略已經停止的錯誤
      }
      this.currentOscillator = null;
    }
  }
}
