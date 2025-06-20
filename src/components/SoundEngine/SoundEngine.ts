import { SoundSourceType } from "./types";
import { OscillatorPlayer } from "./OscillatorPlayer";

// 聲音引擎管理器 - 只使用振盪器
export class SoundEngine {
  private oscillatorPlayer: OscillatorPlayer;

  constructor() {
    this.oscillatorPlayer = new OscillatorPlayer();

    // 預先初始化振盪器 (在首次用戶互動時)
    this.preInitialize();
  }

  private async preInitialize(): Promise<void> {
    // 延遲初始化，等待用戶首次互動
    if (typeof window !== "undefined") {
      const initOnInteraction = async () => {
        try {
          await this.oscillatorPlayer.initialize();
          // 移除事件監聽器，只初始化一次
          document.removeEventListener("click", initOnInteraction);
          document.removeEventListener("touchstart", initOnInteraction);
        } catch (error) {
          console.warn("Failed to pre-initialize oscillator:", error);
        }
      };

      document.addEventListener("click", initOnInteraction, { once: true });
      document.addEventListener("touchstart", initOnInteraction, {
        once: true,
      });
    }
  }

  async playNote(
    note: string,
    octave: number = 4,
    tuningStandard: number = 440
  ): Promise<void> {
    return this.oscillatorPlayer.playNote(note, octave, tuningStandard);
  }

  stop(): void {
    this.oscillatorPlayer.stop();
  }
}

// 全域聲音引擎實例
export const soundEngine = new SoundEngine();

// 為了向後兼容，保留原來的 audioPlayer 介面
export const audioPlayer = {
  playNote: (note: string, octave?: number, tuningStandard?: number) =>
    soundEngine.playNote(note, octave, tuningStandard),
  stop: () => soundEngine.stop(),
};
