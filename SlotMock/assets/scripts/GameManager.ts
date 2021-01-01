const { ccclass, property } = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {
  @property(cc.Node)
  machine = null;

  @property({ type: cc.AudioClip })
  audioClick = null;

  private block = false;

  private result = null;

  start(): void {
    this.machine.getComponent('Machine').createMachine();    
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
          var _resultGenerator = new ResultGenerator(this.getNumberOfPossibleTiles());
          var slotResult = _resultGenerator.generateAllEquals();
        resolve(slotResult);
      },
          1000 + 500 * Math.random());
    });
  }

  generateResult(): Array<Array<number>> {
    var random = Math.random();
    if (random < 0.5){
      return 
    }
  }

  generateRandomTiles(): Array<Array<number>> {
    var random = Math.random();
    if (random < 0.5){
      return 
    }
  }

  generateSingleLine(): Array<Array<number>> {
    const randomIndex = Math.floor(Math.random() * this.getNumberOfPossibleTiles());
    const randomLine = Math.floor(Math.random() * 3);
    var result = new Array();
    for (let i = 0; i < 5; i += 1){
      var reelResult = new Array();
      for (let i = 0; i < 3; i += 1){

        reelResult.push(randomIndex);
      }
      result.push(reelResult);
    }
    return result;
  }

  generateDoubleLine(): Array<Array<number>> {
    const randomIndex = Math.floor(Math.random() * this.getNumberOfPossibleTiles());
    var result = new Array();
    for (let i = 0; i < 5; i += 1){
      var reelResult = new Array();
      for (let i = 0; i < 5; i += 1){
        reelResult.push(randomIndex);
      }
      result.push(reelResult);
    }
    return result;
  }  

  getNumberOfPossibleTiles(): number {
    return this.machine.getComponent('Machine').getNumberOfPossibleTiles();
  }

  informStop(): void {
    var resultRelayed = this.result;
    this.machine.getComponent('Machine').stop(resultRelayed);
  }
}
