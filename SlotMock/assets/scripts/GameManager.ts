const { ccclass, property } = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {
  @property(cc.Node)
  machine = null;

  @property({ type: cc.AudioClip })
  audioClick = null;

  private block = false;

  private result = null;

  private resultGenerator = null;

  start(): void {
    this.machine.getComponent('Machine').createMachine();
    this.resultGenerator = this.getComponent('ResultGenerator');
  }

  update(): void {
    if (this.block && this.result != null) {
      this.informStop();
      this.result = null;
    }
  }

  click(): void {
    cc.audioEngine.playEffect(this.audioClick, false);

    if (this.machine.getComponent('Machine').spinning === false) {
      this.block = false;
      this.machine.getComponent('Machine').spin();
      this.requestResult();
    } else if (!this.block) {
      this.block = true;
      this.machine.getComponent('Machine').lock();
    }
  }

  async requestResult(): Promise<void> {
    this.result = null;
    this.result = await this.getAnswer();
  }

  getAnswer(): Promise<Array<Array<number>>> {    
    return new Promise<Array<Array<number>>>(resolve => {
        setTimeout(() => {
          var numberOfPossibleTiles = this.getNumberOfPossibleTiles();
          this.resultGenerator.NumberOfPossibleTiles = numberOfPossibleTiles;
          var slotResult = this.resultGenerator.generateSingleLine();
        resolve(slotResult);
      },
          1000 + 500 * Math.random());
    });
  }  

  getNumberOfPossibleTiles(): number {
    return this.machine.getComponent('Machine').getNumberOfPossibleTiles();
  }

  informStop(): void {
    var resultRelayed = this.result;
    this.machine.getComponent('Machine').stop(resultRelayed);
  }
}
