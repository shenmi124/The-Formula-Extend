addLayer("b", {
    name: "B",
    symbol() {
        return options.ch ? 'B能量' : 'B-Power'
    },
    position: 1,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        value: new Decimal(0),
        time2: new Decimal(0),
        power: new Decimal(0),
        powerValue: new Decimal(0),
        powerData: false,
    }},
    color: "#68a4f1",
    resource: "B能量", 
    resourceEN: "B-Power", 
    baseResource: "n", 
    baseAmount() {return player.value}, 
    type: "custom",
    requires() { return new Decimal(11000) },
    reqDiv() { 
        let div = new Decimal(1);
        return div;
    },
    base() {
        let base = new Decimal(115);
        return base;
    },
    exponent() {
        let exp = 1.15
        return new Decimal(exp);
    },
    costScalingStart: new Decimal(15),
    costScalingInc() { return new Decimal(0.0317).sub(player.meta.buyables[32].gte(10) ? player.meta.buyables[32].mul(0.001) : n(0)).max(0) },
    canBuyMax() { return tmp.ac.unlocks>=4 },
    autoPrestige() { return player.meta.buyables[23].gte(32) },
    resetsNothing() { return player.meta.buyables[23].gte(32) },
    tooltip(){
        return false
    },
    tooltipLocked() { return "要求: n(t) ≥ "+formatWhole(tmp[this.layer].requires) },
    tooltipLockedEN() { return "Req: n(t) ≥ "+formatWhole(tmp[this.layer].requires) },
    canReset() { return tmp[this.layer].getResetGain.gte(1) },
    getResetGain() { 
        let gain = tmp[this.layer].baseAmount.times(tmp[this.layer].reqDiv).div(tmp[this.layer].requires).max(1).log(tmp[this.layer].base).root(tmp[this.layer].exponent)
        if (gain.gte(tmp[this.layer].costScalingStart) && tmp[this.layer].costScalingInc.gt(0)) gain = gain.pow(tmp[this.layer].exponent).log(tmp[this.layer].costScalingStart).sub(tmp[this.layer].exponent).div(tmp[this.layer].costScalingInc).plus(tmp[this.layer].costScalingStart).plus(1).floor().sub(player[this.layer].points).max(0)
        else gain = gain.plus(1).floor().sub(player[this.layer].points).max(0)
        if (!tmp[this.layer].canBuyMax) gain = gain.min(1);
        if (tmp[this.layer].baseAmount.times(tmp[this.layer].reqDiv).lt(tmp[this.layer].requires)) return new Decimal(0);
        return gain;
    },
    getNextAt(canBuyMax=false) {
        let amt = player[this.layer].points.plus((canBuyMax&&tmp[this.layer].baseAmount.gte(tmp[this.layer].nextAt))?tmp[this.layer].getResetGain:0)
        if (amt.gte(tmp[this.layer].costScalingStart)) return Decimal.pow(tmp[this.layer].base, tmp[this.layer].costScalingStart.pow(tmp[this.layer].exponent.plus(amt.sub(tmp[this.layer].costScalingStart).times(tmp[this.layer].costScalingInc)))).times(tmp[this.layer].requires).div(tmp[this.layer].reqDiv)
        else return Decimal.pow(tmp[this.layer].base, amt.pow(tmp[this.layer].exponent)).times(tmp[this.layer].requires).div(tmp[this.layer].reqDiv)
    },
    prestigeButtonText() {
        let text = "重置以获得 <b>"+formatWhole(tmp[this.layer].resetGain)+"</b> B能量<br><br>";
        if (tmp[this.layer].canBuyMax) text += "下一个B能量需要: n(t) ≥ "+format(tmp[this.layer].nextAtDisp)
        else text += "要求: n(t) ≥ "+format(tmp[this.layer].getNextAt)
        text += "<br>要求底数: "+format(tmp[this.layer].base)
        text += "<br>要求指数: "+format(tmp[this.layer].exponent.plus(tmp[this.layer].costScalingInc.times(player[this.layer].points.sub(tmp[this.layer].costScalingStart)).max(0)))
        return text;
    },
    prestigeButtonTextEN() {
        let text = "Reset for <b>"+formatWhole(tmp[this.layer].resetGain)+"</b> B-Power<br><br>";
        if (tmp[this.layer].canBuyMax) text += "Next: n(t) ≥ "+format(tmp[this.layer].nextAtDisp)
        else text += "Req: n(t) ≥ "+format(tmp[this.layer].getNextAt)
        text += "<br>Req Base: "+format(tmp[this.layer].base)
        text += "<br>Req Exponent: "+format(tmp[this.layer].exponent.plus(tmp[this.layer].costScalingInc.times(player[this.layer].points.sub(tmp[this.layer].costScalingStart)).max(0)))
        return text;
    },
    row: 2,
    layerShown() { return tmp.goals.unlocks>=4 },
    tabFormat: [
        ["display-text", function() { return getPointsDisplay() }],
        "main-display",
        "prestige-button",
        ["display-text", function() {
            if(options.ch) return (player[this.layer].points.gte(tmp[this.layer].costScalingStart) && (tmp[this.layer].costScalingInc).gt(0))?("在 "+formatWhole(tmp[this.layer].costScalingStart)+" B能量之后,每一个B能量都会使它的需求指数升高"+format(tmp[this.layer].costScalingInc)):"" 
            return (player[this.layer].points.gte(tmp[this.layer].costScalingStart) && (tmp[this.layer].costScalingInc).gt(0))?("After "+formatWhole(tmp[this.layer].costScalingStart)+" B-Power, each B-Power increases its requirement exponent by "+format(tmp[this.layer].costScalingInc)):"" 
        }],
        "blank",
        ["display-text", function() { return "<h3>b("+formatWhole(player[this.layer].points)+") = "+format(player[this.layer].value)+"</h3>" }],
        ["display-text", function() { return "b(B) = "+tmp[this.layer].displayFormula }],
        "blank", "blank",
        ['row',[["clickable", 11], ["bar", "Power"], ]],
        "blank","blank",
        ["display-text", function() {
            let a = ''
            if(player.b.power.gt(0)){a += options.ch?'关闭电池以获得RoA,RoB,RoC而不是RoA<sub>p</sub>,RoB<sub>p</sub>,RoC<sub>p</sub><br>'
        :'Turn off to gain RoA,RoB,RoC instead of RoA<sub>p</sub>,RoB<sub>p</sub>,RoC<sub>p</sub><br>'}
            return '<i style="color:#aaa">'+a+'</i>'
        }],
    ],
    displayFormula() {
        let p = tmp.ac.unlocks>=6 ? '<sup>2</sup>' : ''
        let f = "B"+p+" - 0.5 + n<sub>s</sub><sup>0.35</sup>";
        return f;
    },
    displayFormulaData() {
        let f = '1'
        if(tmp.ac.unlocks>=5){
            f = '20'
        }

        let f2 = colorText('( ',1)+'( t<sub>2</sub> + RA<sub>p</sub> ) × RB<sub>p</sub> × b'+colorText(' )<sup>RC<sub>p</sub></sup>',1)
        return [f,f2];
    },
    calculateValue(B=player[this.layer].points) {
        let p = tmp.ac.unlocks>=6 ? n(2) : n(1)
        let val = B.pow(p).sub(0.5).add(player.superValue.pow(0.35))
        return val;
    },
    calculateValuePower() {
        let val = player.b.time2.add(player.ro.valueAPower).mul(player.ro.valueBPower).mul(player.b.value).pow(player.ro.valueCPower)
        return val;
    },
    update(diff) {
        player[this.layer].value = tmp[this.layer].calculateValue
        player[this.layer].powerValue = tmp[this.layer].calculateValuePower
        
        if(player.b.powerData){
            let t = n(1)
            if(tmp.ac.unlocks>=5){
                t = t.mul(20)
            }
            player.b.time2 = player.b.time2.add(n(t).mul(diff))
        }
        
        if (tmp.goals.unlocks>=6) {
            if(tmp[this.layer].bars.Power.progress>=1){
                player[this.layer].power = player[this.layer].power.plus(1);
            }
        }
    },
    bars: {
        Power: {
            direction: RIGHT,
            width: 450,
            height: 156,
            req(x=player.b.power){
                return n(100).mul(n(1.35).pow(x.mul(0.1))).pow(x.div(200).add(1))
            },
            lastReq(x=player.b.power.sub(1)){
                return x.gte(1) ? n(100).mul(n(1.35).pow(x.mul(0.1))).pow(x.div(200).add(1)) : n(0)
            },
            progress() {
                return player.b.powerValue.sub(tmp[this.layer].bars.Power.lastReq).div(n(tmp[this.layer].bars.Power.req).sub(tmp[this.layer].bars.Power.lastReq))
            },
            unlocked() { return tmp.goals.unlocks>=6 },
            display() {
                return "要求: power(t<sub>2</sub>) ≥ "+format(tmp[this.layer].bars.Power.req)+" ("+format(100-tmp[this.layer].bars.Power.progress)+"%)<br><br>"
                +"power("+format(player[this.layer].time2)+") = "+format(player[this.layer].powerValue)+"<br>"
                +"t<sub>2</sub>("+format(player[this.layer].time2)+") = "+format(player[this.layer].time2)+"<br><br>"
                +"power(t<sub>2</sub>) = "+tmp[this.layer].displayFormulaData[1]+"<br>"
                +'<i style="color:#aaa">t<sub>2</sub>\'(t) = '+tmp[this.layer].displayFormulaData[0]+ ' (如果打开电池)</i>'
            },
            displayEN() {
                return "Req: power(t<sub>2</sub>) ≥ "+format(tmp[this.layer].bars.Power.req)+" ("+format(100-tmp[this.layer].bars.Power.progress)+"%)<br><br>"
                +"power("+format(player[this.layer].time2)+") = "+format(player[this.layer].powerValue)+"<br>"
                +"t<sub>2</sub>("+format(player[this.layer].time2)+") = "+format(player[this.layer].time2)+"<br><br>"
                +"power(t<sub>2</sub>) = "+tmp[this.layer].displayFormulaData[1]+"<br>"
                +'<i style="color:#aaa">t<sub>2</sub>\'(t) = '+tmp[this.layer].displayFormulaData[0]+ ' (if on)</i>'
            },
            fillStyle: {"background-color": "#68a4f1"},
        },
    },
    clickables: {
        11: {
            display(){return '<big><big><big>B<sub>01</sub>: '+(player.b.powerData ? (options.ch?'开':"ON") : (options.ch?'关':"OFF"))+'</big></big><br>B<sub>01</sub> = '+formatWhole(player.b.power)+'</big><div style="height: 4px"></div>'},
            canClick(){return true},
            unlocked() { return tmp.goals.unlocks>=6 },
            onClick(){
                player.b.powerData ? player.b.powerData = false : player.b.powerData = true
            },
			style() {return {'width': "160px", "min-width": "160px", 'height': "160px", "border-radius": "5%", "margin-right": "20px",}},
        },  
    },
})