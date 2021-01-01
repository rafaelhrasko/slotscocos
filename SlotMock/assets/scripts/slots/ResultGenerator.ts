const { ccclass, property } = cc._decorator;

@ccclass
export default class ResultGenerator extends cc.Component{

    public NumberOfPossibleTiles = 0;

    getResultFromProbability():Array<Array<number>> {
        const roll = Math.random();
        var result = null;
        if (roll < 0.5){
            result = this.generateRandomTiles();
        }else if (roll < 0.83){
            result = this.generateSingleLine();
        }else if (roll < 0.93){
            result = this.generateDoubleLine();
        }else {
            result = this.generateAllEquals();
        }
        return this.transpose2DArray(result);
    }

    generateAllEquals(): Array<Array<number>> {
        var result = new Array();
        for (let i = 0; i < 3; i += 1){
            result.push(this.rollMatchingLine());
        }        
        return result;
    }

    generateRandomTiles(): Array<Array<number>> {
        var result = new Array();
        for (let i = 0; i < 3; i += 1){
            result.push(this.rollUnmatchLine());
        }        
        return result;
    }

    generateSingleLine(): Array<Array<number>> {
        var result = new Array();
        const premiumLine = Math.floor(Math.random() * 3);
        for (let i = 0; i < 3; i += 1){
            if (i != premiumLine){
                result.push(this.rollUnmatchLine());
            }else{
                result.push(this.rollMatchingLine());
            }
        }        
        return result;
    }

    generateDoubleLine(): Array<Array<number>> {
        var result = new Array();
        const premiumLine = Math.floor(Math.random() * 3);
        for (let i = 0; i < 3; i += 1){
            if (i != premiumLine){
                result.push(this.rollMatchingLine());
            }else{
                result.push(this.rollUnmatchLine());
            }
        }        
        return result;
    }

    transpose2DArray(array:Array<Array<number>>):  Array<Array<number>>{
        var newArray = new Array();
        var arrayLength = array[0].length;
        for(var i = 0; i < arrayLength; i++){
            newArray.push(new Array());
        };
    
        for(var i = 0; i < array.length; i++){
            for(var j = 0; j < arrayLength; j++){
                newArray[j].push(array[i][j]);
            };
        };
    
        return newArray;
    }

    shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }    

    createAllPossibleTilesIndexArray(): Array<number> {
        var result = new Array();
        for (let i = 0; i < this.NumberOfPossibleTiles; i += 1){
            result.push(i);
        }
        return result;
    }

    createPossibleTilesIndexArrayShuffled(): Array<number> {
        var result = this.createAllPossibleTilesIndexArray();
        this.shuffleArray(result);
        return result;
    }

    rollUnmatchLine(): Array<number> {
        var possibleTiles = this.createPossibleTilesIndexArrayShuffled();
        var result = new Array();
        for (let i = 0; i < 5; i += 1){
            result.push(possibleTiles.pop());
        }
        return result;
    }

    rollMatchingLine(): Array<number> {
        const randomIndex = Math.floor(Math.random() * this.NumberOfPossibleTiles);
        var result = new Array();
        for (let i = 0; i < 5; i += 1){
            result.push(randomIndex);
        }
        return result;
    }
}