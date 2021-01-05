const { ccclass, property } = cc._decorator;

@ccclass
export default class Glows extends cc.Component{
    start(): void {
        this.toggleEnabled(false);
    }

    toggleEnabled(enabled:boolean): void{
        var children = this.node.children;
        for (let i = 0; i < children.length; i += 1){
            children[i].active = enabled;
        } 
    }

}