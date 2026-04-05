export interface SpeechRecognitionResult {
  transcript: string;
  confidence: number;
}

class SpeechService {
  private recognition: any = null;
  private synthesis: SpeechSynthesis;
  private listening = false;

  constructor() {
    this.synthesis = window.speechSynthesis;
  }

  isRecognitionSupported(): boolean {
    return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
  }

  startListening(lang = 'hi-IN'): Promise<SpeechRecognitionResult> {
    return new Promise((resolve, reject) => {
      if (!this.isRecognitionSupported()) {
        reject(new Error('Speech recognition not supported in this browser'));
        return;
      }

      const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      this.recognition = new SR();
      this.recognition.lang = lang;
      this.recognition.interimResults = false;
      this.recognition.maxAlternatives = 1;
      this.recognition.continuous = false;

      this.recognition.onresult = (event: any) => {
        const result = event.results[0][0];
        this.listening = false;
        resolve({
          transcript: result.transcript,
          confidence: result.confidence,
        });
      };

      this.recognition.onerror = (event: any) => {
        this.listening = false;
        reject(new Error(`Speech recognition error: ${event.error}`));
      };

      this.recognition.onend = () => {
        this.listening = false;
      };

      this.recognition.start();
      this.listening = true;
    });
  }

  stopListening() {
    if (this.recognition && this.listening) {
      this.recognition.stop();
      this.listening = false;
    }
  }

  speak(text: string, lang = 'hi-IN'): Promise<void> {
    return new Promise((resolve, reject) => {
      this.synthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.95;
      utterance.pitch = 1.1;

      const voices = this.synthesis.getVoices();
      const indianVoice = voices.find(
        (v) => v.lang.startsWith('hi') || v.lang.startsWith('en-IN')
      );
      if (indianVoice) {
        utterance.voice = indianVoice;
      }

      utterance.onend = () => resolve();
      utterance.onerror = (e) => reject(e);

      this.synthesis.speak(utterance);
    });
  }

  stopSpeaking() {
    this.synthesis.cancel();
  }

  getIsListening() {
    return this.listening;
  }
}

export const speechService = new SpeechService();
