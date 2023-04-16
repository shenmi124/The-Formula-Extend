addLayer("a", {
    name: "A",
    symbol() { return player[this.layer].unlocked?("a = "+format(player[this.layer].value)):"A" },
    position: 0,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        value: new Decimal(0),
        valueA: new Decimal(0),
        avolve: new Decimal(0),
        avolve2: new Decimal(0),
    }},
    milestonePopups: false,
    nodeStyle: { "min-width": "60px", height: "60px", "font-size": "30px", "padding-left": "15px", "padding-right": "15px" },
    color: "#eb3434",
    resource: "A能量",
    resourceEN: "A-Power",
    baseResource: "n", 
    baseAmount() {return player.value}, 
    type: "custom",
    requires() { return new Decimal(player[this.layer].points.gte(1)?2:0) },
    gainMult() {
        let mult = new Decimal(1);
        return mult;
    },
    reqDiv() {
        let div = new Decimal(1);
        if (tmp.b.batteriesUnl) div = div.times(gridEffect("b", 101));
        return div;
    },
    base() { 
        let base = new Decimal(1.5);
        return base;
    },
    canBuyMax() { return false },
    resetsNothing() { return tmp.ac.unlocks>=2 },
    autoPrestige() { return tmp.ac.unlocks>=3 },
    tooltipLocked() { return "" },
    canReset() { return tmp[this.layer].getResetGain.gte(1) },
    getResetGain() { 
        let gain = tmp[this.layer].baseAmount.times(tmp[this.layer].reqDiv).sub(tmp[this.layer].requires).plus(1).max(1).log(tmp[this.layer].base).times(tmp[this.layer].gainMult).plus(1).floor().sub(player[this.layer].points).max(0)
        if (!tmp[this.layer].canBuyMax) gain = gain.min(1);
        return gain;
    },
    getNextAt(canBuyMax=false) {
        let amt = player[this.layer].points.plus((canBuyMax&&tmp[this.layer].baseAmount.gte(tmp[this.layer].nextAt))?tmp[this.layer].getResetGain:0)
        return Decimal.pow(tmp[this.layer].base, amt.div(tmp[this.layer].gainMult)).sub(1).plus(tmp[this.layer].requires).div(tmp[this.layer].reqDiv)
    },
    prestigeButtonText() {
        let text = (tmp[this.layer].resetsNothing?"获得 ":"重置以获得 ")+"<b>"+formatWhole(tmp[this.layer].resetGain)+"</b> A能量<br><br>";
        if (tmp[this.layer].canBuyMax) text += "下一个A能量需要: n(t) ≥ "+format(tmp[this.layer].nextAtDisp)
        else text += "需求: n(t) ≥ "+format(tmp[this.layer].getNextAt)
        text += "<br>需求底数: "+format(tmp[this.layer].base)
        return text;
    },
    prestigeButtonTextEN(){
        let text = (tmp[this.layer].resetsNothing?"Gain ":"Reset for ")+"<b>"+formatWhole(tmp[this.layer].resetGain)+"</b> A-Power<br><br>";
        if (tmp[this.layer].canBuyMax) text += "Next: n(t) ≥ "+format(tmp[this.layer].nextAtDisp)
        else text += "Req: n(t) ≥ "+format(tmp[this.layer].getNextAt)
        text += "<br>Req Base: "+format(tmp[this.layer].base)
        return text
    },
    row: 0,
    layerShown(){return options.ch !== undefined},
	doReset(resettingLayer) {
		if (layers[resettingLayer].row > layers[this.layer].row) {
			let keep = []
			if (resettingLayer=="a2" && tmp.ac.unlocks>=1) keep.push("buyables",'avolve','avolve2');
			if (resettingLayer=="a2" && tmp.ac.unlocks>=3) keep.push("points");
			if (resettingLayer=="b" && tmp.ac.unlocks>=5) keep.push("points",'avolve','avolve2');
			layerDataReset(this.layer, keep)
		}
		player.a.fire = new Decimal(100)
	},
    displayFormula() {
        let f = "A<sup>0.85<sup>";
        let po = ''
        if(tmp.ac.unlocks>=2){f = "A<sup>0.89</sup>"}
        if(player.ro.b.gt(0)){po = "<sup> + RB</sup>"}
        f += po

        let f2 = '进化等级 × 0.005'
        if(!options.ch)  f2 = 'level × 0.005'
        return [f,f2];
    }, 
    calculateValue(A=player[this.layer].points) {
        let val = A.pow(0.85);
        if(tmp.ac.unlocks>=2){val = A.pow(n(0.89).add(player.ro.valueB));}
        return val;
    },
    calculateValueA(A=player[this.layer].avolve.add(player[this.layer].avolve2)) {
        let val = A.mul(0.005);
        return val;
    },
    update(diff) {
        player[this.layer].value = tmp[this.layer].calculateValue
        player[this.layer].valueA = tmp[this.layer].calculateValueA

        if (tmp.goals.unlocks>=2) {
            if(tmp[this.layer].bars.Avolve.progress>=1){
                if(tmp.ac.unlocks>=5){
                    player[this.layer].avolve = player[this.layer].avolve.plus(50);
                }
                if(tmp.ac.unlocks>=4){
                    player[this.layer].avolve = player[this.layer].avolve.plus(45);
                }
                if(tmp.ac.unlocks>=3){
                    player[this.layer].avolve = player[this.layer].avolve.plus(4);
                }
                player[this.layer].avolve = player[this.layer].avolve.plus(1);
            }
        }

        if (tmp.goals.unlocks>=2 && tmp.co.unlocks>=1) {
            if(tmp[this.layer].bars.Avolve2.progress>=1){
                if(tmp.ac.unlocks>=5){
                    player[this.layer].avolve2 = player[this.layer].avolve2.plus(50);
                }
                if(tmp.ac.unlocks>=4){
                    player[this.layer].avolve2 = player[this.layer].avolve2.plus(45);
                }
                if(tmp.ac.unlocks>=3){
                    player[this.layer].avolve2 = player[this.layer].avolve2.plus(4);
                }
                player[this.layer].avolve2 = player[this.layer].avolve2.plus(1);
            }
        }
        
        if(tmp.ac.unlocks>=4 && tmp.a.buyables[11].canAfford){
            layers[this.layer].buyables[11].buy()
        }
    },
    bars: {
        Avolve: {
            direction: RIGHT,
            width: 400,
            height: 20,
            req(x=player.a.avolve){
                let pow2 = player.a.avolve.gte(500) ? x.sub(500).div(10000).add(1) : n(1)
                return x.mul(4).pow(1.7).pow(pow2).div(tmp.a.buyables[11].effect).floor()
            },
            progress() {
                if(player.a.avolve.eq(0)){return n(1)}
                return player.value.div(tmp[this.layer].bars.Avolve.req)
            },
            unlocked() { return tmp.goals.unlocks>=2 },
            display() { return "要求: n(t) ≥ "+formatWhole(tmp[this.layer].bars.Avolve.req)+" ("+format(100-tmp[this.layer].bars.Avolve.progress)+"%)" },
            displayEN() { return "Req: n(t) ≥ "+formatWhole(tmp[this.layer].bars.Avolve.req)+" ("+format(100-tmp[this.layer].bars.Avolve.progress)+"%)" },
            fillStyle: {"background-color": "#ba2323"},
        },
        Avolve2: {
            direction: RIGHT,
            width: 400,
            height: 20,
            req(x=player.a.avolve2){
                return x.mul(0.01).add(1).pow(x.sub(10).max(0).mul(0.075).add(1)).div(tmp.a.buyables[11].effect)
            },
            progress() {
                if(player.a.avolve2.eq(0)){return n(1)}
                return player.superValue.div(tmp[this.layer].bars.Avolve2.req)
            },
            unlocked() { return tmp.goals.unlocks>=2 && tmp.co.unlocks>=1 },
            display() { return "要求: n<sub>s</sub>(n) ≥ "+format(tmp[this.layer].bars.Avolve2.req)+" ("+format(100-tmp[this.layer].bars.Avolve2.progress)+"%)" },
            displayEN() { return "Req: n<sub>s</sub>(n) ≥ "+formatWhole(tmp[this.layer].bars.Avolve2.req)+" ("+format(100-tmp[this.layer].bars.Avolve2.progress)+"%)" },
            fillStyle: {"background-color": "#ba2323"},
        },
    },
    buyables: {
        rows: 1,
        cols: 1,
        11: {
            title() { return "进化要求<br>÷"+format(tmp[this.layer].buyables[this.id].effect) },
            titleEN() { return "Avolve Requirement<br>÷"+format(tmp[this.layer].buyables[this.id].effect) },
            effExp() {
                let exp = new Decimal(3);
                return exp;
            },
            effect() { 
                let eff = player[this.layer].buyables[this.id].plus(1).pow(tmp[this.layer].buyables[this.id].effExp);
                return eff;
            },
            cost(x=player[this.layer].buyables[this.id]) { return Decimal.pow(1.8, x).times(4).ceil() },
            target(r=player[this.layer].points) { return r.div(4).max(1).log(1.8).plus(1).floor() },
            display() { return "等级: "+formatWhole(player[this.layer].buyables[this.id])+"<br>价格: "+formatWhole(tmp[this.layer].buyables[this.id].cost)+" A能量" },
            displayEN() { return "level: "+formatWhole(player[this.layer].buyables[this.id])+"<br>Cost: "+formatWhole(tmp[this.layer].buyables[this.id].cost)+" A-Power" },
            canAfford() { return player[this.layer].points.gte(layers[this.layer].buyables[this.id].cost()) },
            buy() {
                if(tmp.ac.unlocks>=1){

                }else{
                    player[this.layer].points = player[this.layer].points.sub(tmp[this.layer].buyables[this.id].cost).max(0)
                }
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].plus(1);
            },
            buyMax() {
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(tmp[this.layer].buyables[this.id].target)
            },
            unlocked() { return tmp[this.layer].bars.Avolve.unlocked },
        },  
    },
    tabFormat: [
        "main-display",
        "prestige-button",
        "milestones",
        "blank",
        ["display-text", function() { return "<h3>a("+formatWhole(player[this.layer].points)+") = "+format(player[this.layer].value)+"</h3>" }],
        ["display-text", function() { return "a(A) = "+tmp[this.layer].displayFormula[0] }],
        "blank",
        ["display-text", function() { return tmp.goals.unlocks>=2 ? "<h3>Avolve("+formatWhole(player[this.layer].avolve.add(player[this.layer].avolve2))+") = "+format(player[this.layer].valueA)+"</h3>" : ''}],
        ["display-text", function() { return tmp.goals.unlocks>=2 ? (options.ch?"Avolve(进化等级) = ":"Avolve(level) = ")+tmp[this.layer].displayFormula[1] : ''}],
        "blank", "blank",
        ["display-text", function() { return tmp[this.layer].bars.Avolve.unlocked?((options.ch?"<h4>进化等级: ":"Avolve Level: ")+formatWhole(player[this.layer].avolve.add(player[this.layer].avolve2))+"</h4>")+(tmp.co.unlocks>=1 ? ' ( '+format(player.a.avolve)+' + '+format(player.a.avolve2)+' )' : ''):"" }],
        ["bar", "Avolve"], ["bar", "Avolve2"], "blank",
        ["buyable", 11],
    ],
    componentStyles: {
        buyable: {
            width: "140px",
            height: "100px",
            "border-radius": "5%",
            "z-index": "1",
        },
        bar: {
            "z-index": "0",
        },
    },
})
