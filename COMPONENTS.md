# 可重用組件清單

## 📋 文件目的

**讓 AI 開發時直接使用現有組件，避免重複開發**

## 📝 文件更新原則

- 只保留核心要求
- 移除詳細實作說明
- 刪除代碼範例
- 避免重複性規則

## 導航組件

### BackButton

- **路徑**: `src/components/Navigation/BackButton`
- **用途**: 返回按鈕
- **用法**: `<BackButton to="/path">文字</BackButton>`

## 基礎組件

### Button

- **路徑**: `src/components/Button/Button`
- **用途**: 通用按鈕
- **用法**: `<Button onClick={fn}>文字</Button>`

### NoteButton

- **路徑**: `src/components/NoteButton/NoteButton`
- **用途**: 音符按鈕，顯示音名並播放聲音
- **特點**: 支援調音標準、標籤顯示、播放狀態指示
- **用法**: `<NoteButton note="C" octave={4} tuningStandard={440} label="A=440" />`

### SoundSourceSelector

- **路徑**: `src/components/SoundSourceSelector/SoundSourceSelector`
- **用途**: 聲音源顯示器，顯示當前音源
- **特點**: 簡潔的信息顯示，固定顯示振盪器音源
- **用法**: `<SoundSourceSelector />`

### DemoList

- **路徑**: `src/components/DemoList/DemoList`
- **用途**: Demo 列表頁面
- **用法**: `<DemoList />`

### RandomNote

- **路徑**: `src/components/RandomNote/RandomNote`
- **用途**: 隨機音符 Demo
- **用法**: `<RandomNote />`

## 系統組件

### AppRouter

- **路徑**: `src/components/Router/AppRouter`
- **用途**: 應用程式路由管理
- **用法**: `<AppRouter />`

## 聲音引擎系統

### SoundEngine

- **路徑**: `src/components/SoundEngine/`
- **用途**: 模組化聲音引擎管理器
- **特點**:
  - 管理多種音源類型
  - 支援音源切換
  - 統一的播放介面
  - 模組化組件架構

### 音源模組

#### OscillatorPlayer (振盪器音源)

- **路徑**: `src/components/SoundEngine/OscillatorPlayer.ts`
- **技術**: Web Audio API `createOscillator`
- **特點**:
  - 純三角波音色，比正弦波更溫暖
  - 完整支援調音標準 (A=440Hz / A=442Hz)
  - 輕量級，無需載入外部資源
  - 即時響應，無延遲

### API 介面

```typescript
// 基本使用
import { soundEngine, audioPlayer } from "SoundEngine";

soundEngine.playNote("C", 4, 440);

// 向後兼容
audioPlayer.playNote("C", 4, 440);

// 進階使用 - 直接使用振盪器
import { OscillatorPlayer } from "SoundEngine";
```

---
