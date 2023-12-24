//自动轮盘间隔
function getAutoSpinInterval(){
    return n(0.05)//秒
}

addLayer("ro", {
    name: "۞",
    symbol() {
        return options.ch ? '轮盘' : 'Spin'
    },
    position: 2,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        value: new Decimal(0),
        a: new Decimal(0),
        aPower: new Decimal(0),
        valueA: new Decimal(0),
        valueAPower: new Decimal(0),
        b: new Decimal(0),
        bPower: new Decimal(0),
        valueB: new Decimal(0),
        valueBPower: new Decimal(0),
        c: new Decimal(0),
        cPower: new Decimal(0),
        valueC: new Decimal(0),
        valueCPower: new Decimal(0),

        last: '',

        autoSpinTimer:n(0),
    }},
    color: "#aaa",
    resource: "轮盘能量", 
    resourceEN: "Wheel Energy", 
    type: "none",
    tooltip() { return false },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return tmp.goals.unlocks>=5},
    energyGain(){
        return n(1)
    },
    displayFormula(){
        let f = 'b × 2'

        let f2 = 'RoA<sup>0.75</sup> + 1'

        let f3 = 'RoB / 50'

        let f4 = 'log<sub>100</sub><sup>0.3</sup>( RoC + 100 ) '

        return [f,f2,f3,f4]
    },
    calculateValue(val=player.b.value) {
        return val.mul(2);
    },
    calculateValueRo(){
        let f = player.ro.a.pow(0.75).add(1)
        
        let f2 = player.ro.b.div(50)
        
        let f3 = player.ro.c.add(100).log(100).pow(0.3)

        return [f,f2,f3];
    },
    calculateValueRoPower(){
        let f = player.ro.aPower.pow(0.75).add(1)
        
        let f2 = player.ro.bPower.div(50)
        
        let f3 = player.ro.cPower.add(100).log(100).pow(0.3)

        return [f,f2,f3];
    },
    roReq(){
        return n(100)
    },
    roLevel(){
        return tmp.ac.unlocks>=3 ? 2 : 1
    },
    roNum(){
        return tmp.ro.roLevel>=2 ? '0.1 ~ 100' : '0.1 ~ 10'
    },
    roRare(){
        return tmp.ro.roLevel>=2 ? 'RoA —— 70%<br>RoB —— 20%<br>RoC —— 10%' : 'RoA —— 90%<br>RoB —— 10%'
    },
    update(diff) {
        if(player.ro.last=='none'){
            player.ro.last = ''
        }

        player.ro.value = n(tmp.ro.calculateValue)

        player.ro.valueA = n(tmp.ro.calculateValueRo[0])
        player.ro.valueB = n(tmp.ro.calculateValueRo[1])
        player.ro.valueC = n(tmp.ro.calculateValueRo[2])
        
        player.ro.valueAPower = n(tmp.ro.calculateValueRoPower[0])
        player.ro.valueBPower = n(tmp.ro.calculateValueRoPower[1])
        player.ro.valueCPower = n(tmp.ro.calculateValueRoPower[2])

        //轮盘能量上限
        if(tmp.goals.unlocks>=5){
            if(tmp.ac.unlocks>=5){
                player.ro.points = player.ro.points.add(n(player.ro.value).mul(diff)).max(0)
            }else{
                player.ro.points = player.ro.points.add(n(player.ro.value).mul(diff)).min(n(tmp.ro.roReq).mul(5)).max(0)
            }
        }else{
            player.ro.points = n(0)
        }

        //神秘你会不会写注释啊(恼)  自动轮盘
        if(player.meta.buyables[21].gte(15)){
            player.ro.autoSpinTimer = player.ro.autoSpinTimer.add(diff)
            let amount = player.ro.autoSpinTimer.div(getAutoSpinInterval()).floor()//轮盘次数
            player.ro.autoSpinTimer = player.ro.autoSpinTimer.sub(amount.mul(getAutoSpinInterval()))//自动化时间消耗
            let bulk = n(1)//批量轮盘倍率
            if(amount.gte(10)){//最多10次,多余的转为批量倍率
                bulk = amount.div(10)
                amount = n(10)
            }
            while(amount.gte(1)){//循环点击
                tmp.ro.clickables[11].onClick(bulk)
                amount = amount.sub(1)
            }
        }
    },
	doReset(resettingLayer) {
		if (layers[resettingLayer].row > layers[this.layer].row) {
			let keep = []
			if(!(resettingLayer=="b" && tmp.ac.unlocks>=6)){layerDataReset(this.layer, keep)}
		}
	},
	clickables: {
		11: {
            display(){
                return options.ch?"<h1>轮盘!</h1><br>"+(tmp.ro.roLevel>=2 ? '等级: 2<br>' : '')+'<br><big><big>'+tmp.ro.roRare+'<br><br>数量:'+tmp.ro.roNum+'</big><br><br>上次:<br>'+tmp.ro.clickables[11].last+'</big>'
                :"<h1>Spin!</h1><br>"+(tmp.ro.roLevel>=2 ? 'Level: 2<br>' : '')+'<br><big><big>'+tmp.ro.roRare+'<br><br>Amount:'+tmp.ro.roNum+'</big><br><br>Last:<br> '+((tmp.ro.clickables[11].last==="无上次记录")?"No Result Yet":tmp.ro.clickables[11].last)+'</big>'
            },
            last(){return player.ro.last},
			canClick(){
				return player.ro.points.gte(tmp.ro.roReq)
			},
			onClick(bulk = n(1)){
                if(!(bulk instanceof Decimal)) bulk = n(1)//防止bug 万一有呢（？）
                let lastA = n(0)
                let lastB = n(0)
                let lastC = n(0)

                if((player.ro.points.gte(tmp.ro.roReq) && player.meta.buyables[21].gte(15)) || player.meta.buyables[21].lt(15)){
                    if(player.ro.points.lt(bulk)){bulk = player.ro.points.div(tmp.ro.roReq).sub(1).max(1)}
                    let pow = tmp.ro.roLevel>=2 ? n(Math.random() * 3 - 1) : n(Math.random() * 2 - 1)
                    let num = n(10).pow(pow)

                    let a = (Math.random() * 100)

                    num = num.mul(bulk)

                    if(tmp.ro.roLevel>=2){
                        if(a>=90){
                            if(player.meta.buyables[22].gte(6)){
                                player.ro.c = player.ro.c.add(num)
                                player.ro.cPower = player.ro.cPower.add(num)
                            }else if(player.b.powerData){
                                player.ro.cPower = player.ro.cPower.add(num)
                            }else{
                                player.ro.c = player.ro.c.add(num)
                            }

                            lastC = lastC.add(num)
                        }else if(a>=70){
                            if(player.meta.buyables[22].gte(6)){
                                player.ro.b = player.ro.b.add(num)
                                player.ro.bPower = player.ro.bPower.add(num)
                            }else if(player.b.powerData){
                                player.ro.bPower = player.ro.bPower.add(num)
                            }else{
                                player.ro.b = player.ro.b.add(num)
                            }

                            lastB = lastB.add(num)
                        }else{
                            if(player.meta.buyables[22].gte(6)){
                                player.ro.a = player.ro.a.add(num)
                                player.ro.aPower = player.ro.aPower.add(num)
                            }else if(player.b.powerData){
                                player.ro.aPower = player.ro.aPower.add(num)
                            }else{
                                player.ro.a = player.ro.a.add(num)
                            }

                            lastA = lastA.add(num)
                        }
                    }else{
                        if(a>=90){
                            if(player.meta.buyables[22].gte(6)){
                                player.ro.b = player.ro.b.add(num)
                                player.ro.bPower = player.ro.bPower.add(num)
                            }else if(player.b.powerData){
                                player.ro.bPower = player.ro.bPower.add(num)
                            }else{
                                player.ro.b = player.ro.b.add(num)
                            }
        
                            lastB = lastB.add(num)
                        }else{
                            if(player.meta.buyables[22].gte(6)){
                                player.ro.a = player.ro.a.add(num)
                                player.ro.aPower = player.ro.aPower.add(num)
                            }else if(player.b.powerData){
                                player.ro.aPower = player.ro.aPower.add(num)
                            }else{
                                player.ro.a = player.ro.a.add(num)
                            }

                            lastA = lastA.add(num)
                        }
                    }
                }
                player.ro.last = (lastA.gt(0) ? format(lastA)+' RoA ' : '') + (lastB.gt(0) ? format(lastB)+' RoB ' : '') + (lastC.gt(0) ? format(lastC)+' RoC ' : '')
                player.ro.points = player.ro.points.sub(tmp.ro.roReq.mul(bulk)).max(0)
			},
			style() {return {'height': "270px", 'min-height': "270px", 'width': '270px',"border-radius": "50%","border-color": tmp.ro.roLevel>=2 ? 'yellow' : ''}},
            onHold(){return this.onClick()},
		},
	},
    bars: {
        Ro1: {
            direction: RIGHT,
            width: 600,
            height: 20,
            req(){
                return n(tmp.ro.roReq)
            },
            progress() {
                return player.ro.points.div(tmp[this.layer].bars.Ro1.req)
            },
            display() { return "轮盘能量: "+format(player.ro.points.min(tmp[this.layer].bars.Ro1.req))+" / "+format(tmp[this.layer].bars.Ro1.req)+" ("+format(100-tmp[this.layer].bars.Ro1.progress)+"%)" },
            displayEN() { return "Wheel Energy: "+format(player.ro.points.min(tmp[this.layer].bars.Ro1.req))+" / "+format(tmp[this.layer].bars.Ro1.req)+" ("+format(100-tmp[this.layer].bars.Ro1.progress)+"%)" },
            fillStyle: {"background-color": "#888"},
        },
        Ro2: {
            direction: RIGHT,
            width: 600,
            height: 20,
            req(){
                return n(tmp.ro.roReq)
            },
            progress() {
                return player.ro.points.sub(100).max(0).div(tmp[this.layer].bars.Ro2.req)
            },
            display() { return "轮盘能量: "+format(player.ro.points.sub(100).max(0).min(tmp[this.layer].bars.Ro2.req))+" / "+format(tmp[this.layer].bars.Ro2.req)+" ("+format(100-tmp[this.layer].bars.Ro2.progress)+"%)" },
            displayEN() { return "Wheel Energy: "+format(player.ro.points.sub(100).max(0).min(tmp[this.layer].bars.Ro2.req))+" / "+format(tmp[this.layer].bars.Ro2.req)+" ("+format(100-tmp[this.layer].bars.Ro2.progress)+"%)" },
            fillStyle: {"background-color": "#888"},
        },
        Ro3: {
            direction: RIGHT,
            width: 600,
            height: 20,
            req(){
                return n(tmp.ro.roReq)
            },
            progress() {
                return player.ro.points.sub(200).max(0).div(tmp[this.layer].bars.Ro3.req)
            },
            display() { return "轮盘能量: "+format(player.ro.points.sub(200).max(0).min(tmp[this.layer].bars.Ro3.req))+" / "+format(tmp[this.layer].bars.Ro3.req)+" ("+format(100-tmp[this.layer].bars.Ro3.progress)+"%)" },
            displayEN() { return "Wheel Energy: "+format(player.ro.points.sub(200).max(0).min(tmp[this.layer].bars.Ro3.req))+" / "+format(tmp[this.layer].bars.Ro3.req)+" ("+format(100-tmp[this.layer].bars.Ro3.progress)+"%)" },
            fillStyle: {"background-color": "#888"},
        },
        Ro4: {
            direction: RIGHT,
            width: 600,
            height: 20,
            req(){
                return n(tmp.ro.roReq)
            },
            progress() {
                return player.ro.points.sub(300).max(0).div(tmp[this.layer].bars.Ro4.req)
            },
            display() { return "轮盘能量: "+format(player.ro.points.sub(300).max(0).min(tmp[this.layer].bars.Ro4.req))+" / "+format(tmp[this.layer].bars.Ro4.req)+" ("+format(100-tmp[this.layer].bars.Ro4.progress)+"%)" },
            displayEN() { return "Wheel Energy: "+format(player.ro.points.sub(300).max(0).min(tmp[this.layer].bars.Ro4.req))+" / "+format(tmp[this.layer].bars.Ro4.req)+" ("+format(100-tmp[this.layer].bars.Ro4.progress)+"%)" },
            fillStyle: {"background-color": "#888"},
        },
        Ro5: {
            direction: RIGHT,
            width: 600,
            height: 20,
            req(){
                return n(tmp.ro.roReq)
            },
            progress() {
                return player.ro.points.sub(400).max(0).div(tmp[this.layer].bars.Ro5.req)
            },
            display() { return "轮盘能量: "+format(player.ro.points.sub(400).max(0).min(tmp[this.layer].bars.Ro5.req))+" / "+format(tmp[this.layer].bars.Ro5.req)+" ("+format(100-tmp[this.layer].bars.Ro5.progress)+"%)" },
            displayEN() { return "Wheel Energy: "+format(player.ro.points.sub(400).max(0).min(tmp[this.layer].bars.Ro5.req))+" / "+format(tmp[this.layer].bars.Ro5.req)+" ("+format(100-tmp[this.layer].bars.Ro5.progress)+"%)" },
            fillStyle: {"background-color": "#888"},
        },
    },
    tabFormat: [
        ["display-text", function() { return getPointsDisplay() }],
        "main-display",
        ["display-text", function() { return `${(options.ch? "获取" : "Gain")} = baseRo = (${format(player.ro.value)}/s)`}],
        "blank",
        ["display-text", function() { return "<h3>baseRo("+format(player.b.value)+") = "+format(player[this.layer].value)+"</h3>" }],
        ["display-text", function() { return "baseRo(b) = "+tmp[this.layer].displayFormula[0] }],
        "blank",
        "blank",
        ["bar", "Ro1"],
        ["bar", "Ro2"],
        ["bar", "Ro3"],
        ["bar", "Ro4"],
        ["bar", "Ro5"],
        "blank",
        "blank",
        "blank",
        "blank",
        'clickables',
        "blank",
        "blank",
        ["display-text", function() {
            if(tmp.goals.unlocks>=6){
                return "<h3>RA("+format(player[this.layer].a)+") ‖ RA<sub>p</sub>("+format(player[this.layer].aPower)+") = "+format(player[this.layer].valueA)+" ‖ "+format(player[this.layer].valueAPower)+"</h3>"
            }
            return "<h3>RA("+format(player[this.layer].a)+") = "+format(player[this.layer].valueA)+"</h3>"
        }],
        ["display-text", function() { return (tmp.goals.unlocks>=6 ? 'RA‖RA<sub>p</sub>' : 'RA')+"(RoA) = "+tmp[this.layer].displayFormula[1] }],
        "blank",
        ["display-text", function() {
            if(tmp.goals.unlocks>=6){
                return "<h3>RB("+format(player[this.layer].b)+") ‖ RB<sub>p</sub>("+format(player[this.layer].bPower)+") = "+format(player[this.layer].valueB)+" ‖ "+format(player[this.layer].valueBPower)+"</h3>"
            }
            return "<h3>RB("+format(player[this.layer].b)+") = "+format(player[this.layer].valueB)+"</h3>"
        }],
        ["display-text", function() { return (tmp.goals.unlocks>=6 ? 'RB‖RB<sub>p</sub>' : 'RB')+"(RoB) = "+tmp[this.layer].displayFormula[2] }],
        "blank",
        ["display-text", function() {
            if(tmp.goals.unlocks>=6){
                return "<h3>RC("+format(player[this.layer].c)+") ‖ RC<sub>p</sub>("+format(player[this.layer].cPower)+") = "+format(player[this.layer].valueC)+" ‖ "+format(player[this.layer].valueCPower)+"</h3>"
            }
            return tmp.ro.roLevel>=2 ? "<h3>RC("+format(player[this.layer].c)+") = "+format(player[this.layer].valueC)+"</h3>" : ''
        }],
        ["display-text", function() { return tmp.ro.roLevel>=2 ? (tmp.goals.unlocks>=6 ? 'RC‖RC<sub>p</sub>' : 'RC')+"(RoC) = "+tmp[this.layer].displayFormula[3] : '' }],
        "blank",
        ["display-text", function() {
            if(options.ch){
                let a = '你可以长按去转动轮盘<br><br>'
                if(player.ro.a.gt(0)){a += 'RA 将会提升 n 中 t 因子的指数<br>'}
                if(player.ro.b.gt(0)){a += 'RB 将会提升 a 的指数<br>'}
                if(player.ro.c.gt(0)){a += 'RC 将会提升 n 中 的指数<br>'}
                if(player.ro.aPower.gt(0) || player.ro.bPower.gt(0) || player.ro.cPower.gt(0)){a += '所有加了 <sub>p</sub> 的轮盘资源都会以不同方式提升电池<br>'}
                return '<i style="color:#aaa">'+a+'</i>'
            };
            let a = 'Hold to spin rapidly<br><br>'
            if(player.ro.a.gt(0)){a += 'RA boosts t\'s exponent in n<br>'}
            if(player.ro.b.gt(0)){a += 'RB increases a exponent<br>'}
            if(player.ro.c.gt(0)){a += 'RC increases n\'s exponent<br>'}
            if(player.ro.aPower.gt(0) || player.ro.bPower.gt(0) || player.ro.cPower.gt(0)){a += 'All Ro resources with <sub>p</sub> boost battery in various ways<br>'}
            return '<i style="color:#aaa">'+a+'</i>'
        }],
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
