addLayer("co", {
    name: "co",
    row: 3,
    symbol() {
        return options.ch ? '压缩能量' : 'Compressed'
    },
    startData() { return {
        unlocked: true,
        points: n(1),
        pointsO: n(1),
        value: n(0),
        valueO: n(0),
        effect: n(0),
        effectO: n(0),
    }},
    position: 3,
    color: "#efefef",
    tabFormat: [
        ["display-text", function() { return getPointsDisplay() }],
        'buyables',
        ["display-text", function() { return tmp.co.unlocks>=1 ? "<h3>n("+formatWhole(player.points)+") = "+format(player.value)+"</h3>" : '' }],
        ["display-text", function() { return tmp.co.unlocks>=1 ? "n(t) = "+displayFormula() : '' }],
        ["display-text", function() { return tmp.co.unlocks>=1 ? "n(t) = "+displayIntFormula() : '' }],
        "blank", "blank",
        ["display-text", function() { return tmp.co.unlocks>=1 ? "<h3>n("+formatWhole(player.value)+") = "+format(player.superValue)+"</h3>" : '' }],
        ["display-text", function() { return tmp.co.unlocks>=1 ? "n(t) = "+displayFormulaSuper() : '' }],
        ["display-text", function() { return tmp.co.unlocks>=1 ? "n(t) = "+displayIntFormulaSuper() : '' }],
        "blank", "blank", "blank", "blank",

        ["display-text", function() { return tmp.co.unlocks>=1 && player.superValue.lt(200) ? options.ch?"<h3>压缩能量开始于 n<sub>s</sub>(n) ≥ 200</h3>":"<h3>Compressed Energy Starts at n<sub>s</sub>(n) ≥ 200</h3>" : '' }],
        ["display-text", function() { return tmp.co.unlocks>=1 && player.superValue.gte(200) ? (options.ch?"<h3 id='points'>压缩能量 ":"<h3 id='points'>Compressed Energy ")+format(player.co.points)+" J</h3>" : '' }],,
        "blank",
        ["display-text", function() {
            if(options.ch) return player.superValue.gte(200) ? '<i style="color:#aaa">压缩能量每</i> t <i style="color:#aaa">会以</i> x ( CoP + 1 ) <i style="color:#aaa">的速度增长</i>' : '' 
            return player.superValue.gte(200) ? '<i style="color:#aaa">Compressed Energy Multplies</i> ( CoP + 1 ) <i style="color:#aaa">for every </i> t <i style="color:#aaa">passed</i>' : '' 
        }],
        "blank",
        ["display-text", function() { return tmp.co.unlocks>=1 && player.superValue.gte(200) ? "<h3>CoP("+format(player.superValue)+") = "+format(player.co.value)+"</h3>" : '' }],
        ["display-text", function() { return tmp.co.unlocks>=1 && player.superValue.gte(200) ? "CoP(n<sub>s</sub>) = "+tmp.co.displayFormula[0] : '' }],
        "blank",
        ["display-text", function() { return tmp.co.unlocks>=1 && player.superValue.gte(200) ? "<h3>CoE("+format(player.co.points)+") = "+format(player.co.effect,4)+"</h3>" : '' }],
        ["display-text", function() { return tmp.co.unlocks>=1 && player.superValue.gte(200) ? "CoE(J) = "+tmp.co.displayFormula[1] : '' }],

        "blank","blank","blank","blank",

        ["display-text", function() { return tmp.co.unlocks>=1 && player.a2.points.lt(400) ? options.ch?"<h3>欧米茄能量开始于 α ≥ 400</h3>":"<h3>Omega Energy Starts at n<sub>s</sub>(n) ≥ 200</h3>" : '' }],
        ["display-text", function() { return tmp.co.unlocks>=1 && player.a2.points.gte(400) ? (options.ch?"<h3 id='points'>欧米茄能量 ":"<h3 id='points'>Omega Energy ")+format(player.co.pointsO)+" J<sub>o</sub></h3>" : '' }],,
        "blank",
        ["display-text", function() {
            if(options.ch) return tmp.co.unlocks>=1 && tmp.ac.unlocks>=6 && player.a2.points.gte(400) ? '<i style="color:#aaa">欧米茄能量</i> t <i style="color:#aaa">会以</i> x ( OmP + 1 ) <i style="color:#aaa">的速度增长<br><br></i> OmE <i style="color:#aaa">以指数的方式降低300之后的阿尔法需求<br></i>' : '' 
            return tmp.co.unlocks>=1 && player.a2.points.gte(400) ? '<i style="color:#aaa">Omega Energy Multplies</i> ( OoP + 1 ) <i style="color:#aaa">for every </i> t <i style="color:#aaa">passed</i>' : '' 
        }],
        "blank",
        ["display-text", function() { return tmp.co.unlocks>=1 && tmp.ac.unlocks>=6 && player.a2.points.gte(400) ? "<h3>OmP("+format(player.a2.points)+") = "+format(player.co.valueO)+"</h3>" : '' }],
        ["display-text", function() { return tmp.co.unlocks>=1 && tmp.ac.unlocks>=6 && player.a2.points.gte(400) ? "OmP(a) = "+tmp.co.displayFormula[2] : '' }],
        "blank",
        ["display-text", function() { return tmp.co.unlocks>=1 && tmp.ac.unlocks>=6 && player.a2.points.gte(400) ? "<h3>OmE("+format(player.co.pointsO)+") = "+format(player.co.effectO,4)+"</h3>" : '' }],
        ["display-text", function() { return tmp.co.unlocks>=1 && tmp.ac.unlocks>=6 && player.a2.points.gte(400) ? "OmE(J<sub>o</sub>) = "+tmp.co.displayFormula[3] : '' }],
        "blank",
    ],
    unlocks() { return player[this.layer].buyables[11].toNumber() },
    achsCompleted() { return 0 },
    layerShown() { return tmp.goals.unlocks>=7 || tmp.co.unlocks>=1},
    tooltip() {
        return false
    },
    displayFormula(){
        let f = 'Max( '+maxText([player.superValue.sub(200),n(0)],'max',['n<sub>s</sub> - 200', '0'])+' ) × 50'
        if(tmp.ac.unlocks>=6){f = 'Max( '+maxText([player.superValue.sub(200),n(0)],'max',['n<sub>s</sub> - 200', '0'])+' )<sup>50'+(player.meta.buyables[41].gte(150) ? ' + lg<sup>0.75</sup>( CoP + 10 )' : '')+'</sup>'}

        let f2 = colorText('( ',2)+colorText('lg( ',1)+'Max( '+maxText([player.co.points.sub(1e200),n(200)],'max',['J - 1e200','10'])+' )'+colorText(' )',1)+colorText(' )<sup>0.1</sup>',2)

        let o = '( 10 + α<sup>0.3</sup> / 5 )<sup>α</sup>'

        let o2 = colorText('1 / slog<sub>10</sub>( ',1)+' lg( J<sub>o</sub> ) + 10 '+colorText(' )',1)

        return [f,f2,o,o2]
    },
    calculateValue(val=player.superValue) {
        if(tmp.ac.unlocks>=6){
            val = val.sub(200).max(0).pow(n(50).add(player.meta.buyables[41].gte(150) ? n(player[this.layer].value.add(10).log(10).pow(0.75)) : n(0)))
        }else{
            val = val.sub(200).max(0).mul(50)
        }

        let val2 = n(10).add(player.a2.points.pow(0.3).div(5)).pow(player.a2.points)

        return [val,val2];
    },
    calculateValueEffect() {
        let val = player.co.points.sub(1e200).max(10).log(10).pow(0.1)

        let val2 = n(1).div(player.co.pointsO.log(10).add(10).slog(10))

        return [val,val2];
    },
    update(diff) {
        player[this.layer].value = tmp[this.layer].calculateValue[0]
        player[this.layer].effect = tmp[this.layer].calculateValueEffect[0]

        player[this.layer].valueO = tmp[this.layer].calculateValue[1]
        player[this.layer].effectO = tmp[this.layer].calculateValueEffect[1]

        if(player.value.gte(1e200)){
            player.co.points = player.co.points.max(1).mul(n(player.co.value).add(1).pow(diff))
        }
        if(player.a2.points.gte(400)){
            player.co.pointsO = player.co.pointsO.max(1).mul(n(player.co.valueO).add(1).pow(diff))
        }
    },
    buyables: {
        rows: 1,
        cols: 1,
        11: {
            unlockData: [
                {
                    desc: "重置之前的一切并开始获得压缩点数!<br><small>(这也会重置你的目标以及荣耀,但这是值得的!)<br><s>(也许没那么值得,但你必须重置)</s></small>",
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