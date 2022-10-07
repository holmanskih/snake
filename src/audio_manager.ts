export class AudioManager {
    private static instance: AudioManager
    private volume: number = 0.5

    private constructor() {}

    public static getInstance(): AudioManager {
        if(!AudioManager.instance) {
            AudioManager.instance = new AudioManager()
        }

        return AudioManager.instance
    }

    public play(src: string): void {
        const audio = new Audio(src)
        audio.volume = this.volume
        audio.play()
    }

    public setVolume(value: number): void {
        this.volume = value
    }
}