// 聲音來源類型 - 只保留振盪器
export type SoundSourceType = "oscillator";

// 聲音引擎介面
export interface SoundEngineInterface {
  playNote(
    note: string,
    octave?: number,
    tuningStandard?: number
  ): Promise<void>;
  stop(): void;
}
