export class PromptSystem {
  private prompt?: Phaser.GameObjects.Text

  constructor(private readonly scene: Phaser.Scene) {}

  show(message: string) {
    if (!this.prompt) {
      this.prompt = this.scene.add
        .text(this.scene.scale.width / 2, this.scene.scale.height - 36, message, {
          fontFamily: 'Arial, sans-serif',
          fontSize: '16px',
          color: '#ffffff',
          backgroundColor: '#1f2937',
          padding: { x: 12, y: 8 }
        })
        .setOrigin(0.5)
        .setScrollFactor(0)
        .setDepth(100001)
    }

    this.prompt.setText(message)
    this.prompt.setVisible(true)
  }

  hide() {
    this.prompt?.setVisible(false)
  }
}

