addLayer("co", {
    name: "co",
    row: 3,
    symbol() {
        if(tmp.co.unlocks>=1 && player.value.gte(200)){return 'J = '+format(player.co.points)}
        return 'Co'
    },
    startData() { return {
        unlocked: true,
        points: n(1),
        value: n(0),
        effect: n(0),
    }},
    position: 3,
    color: "#fff",
    tabFormat: [
        "blank",
        "blank", "buyables",
        ["display-text", function() { return tmp.co.unlocks>=1 ? "<h3>n("+formatWhole(player.points)+") = "+format(player.value)+"</h3>" : '' }],
        ["display-text", function() { return tmp.co.unlocks>=1 ? "n(t) = "+displayFormula() : '' }],
        ["display-text", function() { return tmp.co.unlocks>=1 ? "n(t) = "+displayIntFormula() : '' }],
        "blank", "blank",
        ["display-text", function() { return tmp.co.unlocks>=1 ? "<h3>n("+formatWhole(player.value)+") = "+format(player.superValue)+"</h3>" : '' }],
        ["display-text", function() { return tmp.co.unlocks>=1 ? "n(t) = "+displayFormulaSuper() : '' }],
        ["display-text", function() { return tmp.co.unlocks>=1 ? "n(t) = "+displayIntFormulaSuper() : '' }],
        "blank", "blank", "blank", "blank",
        ["display-text", function() { return tmp.co.unlocks>=1 && player.superValue.lt(200) ? options.ch?"<h3>压缩能量开始于 n<sub>s</sub>(n) ≥ 200</h3>":"<h3>Compressed Energy Starts at n<sub>s</sub>(n) ≥ 200</h3>" : '' }],
        ["display-text", function() { return player.superValue.gte(200) ? (options.ch?"<h3 id='points'>压缩能量 ":"<h3 id='points'>Compressed Energy ")+format(player.co.points)+" J</h3>" : '' }],,
        "blank",
        ["display-text", function() {
            if(options.ch) return player.superValue.gte(200) ? '<i style="color:#aaa">压缩能量每</i> t <i style="color:#aaa">会以</i> x ( CoP + 1 ) <i style="color:#aaa">的速度增长</i>' : '' 
            return player.superValue.gte(200) ? '<i style="color:#aaa">Compressed Energy Multplies</i> ( CoP + 1 ) <i style="color:#aaa">for every </i> t <i style="color:#aaa">passed</i>' : '' 
        }],
        "blank",
        ["display-text", function() { return player.superValue.gte(200) ? "<h3>CoP("+format(player.superValue)+") = "+format(player.co.value)+"</h3>" : '' }],
        ["display-text", function() { return player.superValue.gte(200) ? "CoP(n<sub>s</sub>) = "+tmp.co.displayFormula[0] : '' }],
        "blank",
        ["display-text", function() { return player.superValue.gte(200) ? "<h3>CoE("+format(player.co.points)+") = "+format(player.co.effect,4)+"</h3>" : '' }],
        ["display-text", function() { return player.superValue.gte(200) ? "CoE(J) = "+tmp.co.displayFormula[1] : '' }],
        "blank",
    ],
    unlocks() { return player[this.layer].buyables[11].toNumber() },
    nodeStyle: { "min-width": "60px", height: "60px", "font-size": "30px", "padding-left": "15px", "padding-right": "15px" },
    achsCompleted() { return 0 },
    layerShown() { return tmp.goals.unlocks>=7 || tmp.co.unlocks>=1},
    tooltip() {
        return options.ch? "压缩点数":"Compressed Point"
    },
    displayFormula(){
        let f = 'Max( n<sub>s</sub> - 200, 0 ) × 50'

        let f2 = colorText('( ','#77bf5f')+colorText('lg( ','#bf8f8f')+'Max( J - 1e200, 10 )'+colorText(' )','#bf8f8f')+colorText(' )<sup>0.1</sup>','#77bf5f')

        return [f,f2]
    },
    calculateValue(val=player.superValue) {
        val = val.sub(200).max(0).mul(50)

        return val;
    },
    calculateValueEffect() {
        let val = player.co.points.sub(1e200).max(10).log(10).pow(0.1)

        return val;
    },
    update(diff) {
        player[this.layer].value = tmp[this.layer].calculateValue
        player[this.layer].effect = tmp[this.layer].calculateValueEffect

        if(player.value.gte(1e200)){
            player.co.points = player.co.points.max(1).mul(n(player.co.value).add(1).pow(diff))
        }
    },
    branches: ["b"],
    buyables: {
        rows: 1,
        cols: 1,
        11: {
            unlockData: [
                {
                    desc: "重置之前的一切并开始获得压缩点数!<br><small>(这也会重置你的成就以及荣耀,但这是值得的!)<br><s>(也许没那么值得,但你必须重置)</s></small>",
                    descEN: "Reset All Previous Features And Start Gaining Compressed Points!<br><small>(Also resets Goals and Glory,But it's worth it!)<br><s><i>(maybe not,but you must do so)</i></s></small>",
                    req: 0,
                },
            ],
            retrieveUnlockData() { return tmp[this.layer].buyables[11].unlockData[player[this.layer].buyables[11].toNumber()] },
            title() {
                let data = tmp[this.layer].buyables[11].retrieveUnlockData
                if (!data) return "???";
                else return data.desc;
            },
            titleEN() {
                let data = tmp[this.layer].buyables[11].retrieveUnlockData
                if (!data) return "???";
                else return data.descEN;
            },
            canAfford() { 
                let data = tmp[this.layer].buyables[11].retrieveUnlockData
                let real = tmp[this.layer].achsCompleted
                if (!data) return false;
                return real>=data.req
            },
            buy() {
                layerDataReset('ac')
                layerDataReset('goals')
                layerDataReset('b')
                layerDataReset('a2')
                layerDataReset('ro')
                layerDataReset('a')
                player.points = n(0)

                if (!tmp[this.layer].buyables[11].retrieveUnlockData) return;
                player[this.layer].buyables[11] = player[this.layer].buyables[11].plus(1)
            },
            unlocked(){
                return tmp.co.unlocks<=0
            },
        },
    },
    componentStyles: {
        buyable: {
            "min-width": "100px",
            height: "85px",
            "border-radius": "5%",
            width: "450px"
        },
    },
})