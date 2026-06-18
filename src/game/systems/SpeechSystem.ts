export class SpeechSystem {
  private text?: Phaser.GameObjects.Text
  private hideEvent?: Phaser.Time.TimerEvent

  constructor(private readonly scene: Phaser.Scene) {}

  show(target: Phaser.GameObjects.GameObject & { x: number; y: number }, message: string) {
    this.hideEvent?.remove(false)
    this.text?.destroy()

    this.text = this.scene.add
      .text(target.x, target.y - 72, message, {
        fontFamily: 'Arial, sans-serif',
        fontSize: '14px',
        color: '#111827',
        backgroundColor: '#ffffff',
        padding: { x: 10, y: 7 },
        wordWrap: { width: 280 }
      })
      .setOrigin(0.5, 1)
      .setDepth(100000)

    this.hideEvent = this.scene.time.delayedCall(3500, () => {
      this.text?.destroy()
      this.text = undefined
    })
  }
}

