addLayer("ro", {
    name: "۞",
    symbol() {
        return "۞"
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

        last: '无上次记录',
    }},
    nodeStyle: { "min-width": "60px", height: "60px", "font-size": "30px", "padding-left": "15px", "padding-right": "15px" },
    color: "#888",
    resource: "轮盘能量", 
    resourceEN: "Wheel Energy", 
    type: "none",
    tooltipLocked() { return "" },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return tmp.goals.unlocks>=5},
    energyGain(){
        return n(1)
    },
    displayFormula(){
        let f = 'b / 2'

        let f2 = 'RoA<sup>0.75</sup> + 1'

        let f3 = 'RoB / 50'

        let f4 = colorText('( ','#77bf5f')+colorText('log<sub>100</sub>(','#bf8f8f')+' RoC + 100 '+colorText(' ) ','#bf8f8f')+colorText(')<sup>0.3</sup> ','#77bf5f')

        return [f,f2,f3,f4]
    },
    calculateValue(val=player.b.value) {
        val=val.div(2)

        return val;
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
        return tmp.ro.roLevel>=2 ? 'RoA —— 75%<br>RoB —— 20%<br>RoC —— 5%' : 'RoA —— 95%<br>RoB —— 5%'
    },
    update(diff) {
        player.ro.value = n(tmp.ro.calculateValue)

        player.ro.valueA = n(tmp.ro.calculateValueRo[0])
        player.ro.valueB = n(tmp.ro.calculateValueRo[1])
        player.ro.valueC = n(tmp.ro.calculateValueRo[2])
        
        player.ro.valueAPower = n(tmp.ro.calculateValueRoPower[0])
        player.ro.valueBPower = n(tmp.ro.calculateValueRoPower[1])
        player.ro.valueCPower = n(tmp.ro.calculateValueRoPower[2])

        if(tmp.goals.unlocks>=5){
            player.ro.points = player.ro.points.add(n(player.ro.value).mul(diff)).min(n(tmp.ro.roReq).mul(tmp.ac.unlocks>=4 ? 7 : 5)).max(0)
        }else{
            player.ro.points = n(0)
        }
    },
	clickables: {
		11: {
			title(){return "<big><big><big>轮盘!</big></big></big>"},
			titleEN:"<big><big><big>Spin Wheel!</big></big></big>",
            display(){
                return (tmp.ro.roLevel>=2 ? '等级: 2<br>' : '')+'<br><big><big>'+tmp.ro.roRare+'<br><br>数量:'+tmp.ro.roNum+'</big><br><br>上次: '+tmp.ro.clickables[11].last+'</big>'
            },
            displayEN(){
                return (tmp.ro.roLevel>=2 ? 'Level: 2<br>' : '')+'<br><big><big>'+tmp.ro.roRare+'<br><br>Amount:'+tmp.ro.roNum+'</big><br><br>上次: '+((tmp.ro.clickables[11].last==="无上次记录")?"No Result Yet":tmp.ro.clickables[11].last)+'</big>'
            },
            last(){return player.ro.last},
			canClick(){
				return player.ro.points.gte(tmp.ro.roReq)
			},
			onClick(){
                let pow = tmp.ro.roLevel>=2 ? n(Math.random() * 3 - 1) : n(Math.random() * 2 - 1)
                let num = n(10).pow(pow)

                let a = (Math.random() * 100)
                if(tmp.ro.roLevel>=2){
                    if(a>=95){
                        if(player.b.powerData){
                            player.ro.cPower = player.ro.cPower.add(num)
                        }else{
                            player.ro.c = player.ro.c.add(num)
                        }
    
                        player.ro.last = 'RoC '+format(num)
                    }else if(a>=75){
                        if(player.b.powerData){
                            player.ro.bPower = player.ro.bPower.add(num)
                        }else{
                            player.ro.b = player.ro.b.add(num)
                        }
    
                        player.ro.last = 'RoB '+format(num)
                    }else{
                        if(player.b.powerData){
                            player.ro.aPower = player.ro.aPower.add(num)
                        }else{
                            player.ro.a = player.ro.a.add(num)
                        }
    
                        player.ro.last = 'RoA '+format(num)
                    }
                }else{
                    if(a>=95){
                        player.ro.b = player.ro.b.add(num)

                        player.ro.last = 'RoB '+format(num)
                    }else{
                        player.ro.a = player.ro.a.add(num)

                        player.ro.last = 'RoA '+format(num)
                    }
                }

                player.ro.points = player.ro.points.sub(tmp.ro.roReq)
			},
			style() {return {'height': "250px", 'min-height': "250px", 'width': '250px',"border-radius": "50%","border-color": tmp.ro.roLevel>=2 ? 'yellow' : ''}},
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
            display() { return "转盘能量: "+format(player.ro.points.min(tmp[this.layer].bars.Ro1.req))+" / "+format(tmp[this.layer].bars.Ro1.req)+" ("+format(100-tmp[this.layer].bars.Ro1.progress)+"%)" },
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
            display() { return "转盘能量: "+format(player.ro.points.sub(100).max(0).min(tmp[this.layer].bars.Ro2.req))+" / "+format(tmp[this.layer].bars.Ro2.req)+" ("+format(100-tmp[this.layer].bars.Ro2.progress)+"%)" },
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
            display() { return "转盘能量: "+format(player.ro.points.sub(200).max(0).min(tmp[this.layer].bars.Ro3.req))+" / "+format(tmp[this.layer].bars.Ro3.req)+" ("+format(100-tmp[this.layer].bars.Ro3.progress)+"%)" },
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
            display() { return "转盘能量: "+format(player.ro.points.sub(300).max(0).min(tmp[this.layer].bars.Ro4.req))+" / "+format(tmp[this.layer].bars.Ro4.req)+" ("+format(100-tmp[this.layer].bars.Ro4.progress)+"%)" },
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
            display() { return "转盘能量: "+format(player.ro.points.sub(400).max(0).min(tmp[this.layer].bars.Ro5.req))+" / "+format(tmp[this.layer].bars.Ro5.req)+" ("+format(100-tmp[this.layer].bars.Ro5.progress)+"%)" },
            displayEN() { return "Wheel Energy: "+format(player.ro.points.sub(400).max(0).min(tmp[this.layer].bars.Ro5.req))+" / "+format(tmp[this.layer].bars.Ro5.req)+" ("+format(100-tmp[this.layer].bars.Ro5.progress)+"%)" },
            fillStyle: {"background-color": "#888"},
        },
        Ro6: {
            direction: RIGHT,
            width: 600,
            height: 20,
            req(){
                return n(tmp.ro.roReq)
            },
            idR(){return n(5)},
            unlocked(){return tmp.ac.unlocks>=4},
            progress() {
                return player.ro.points.sub(n(tmp[this.layer].bars.Ro6.req).mul(tmp[this.layer].bars.Ro6.idR)).max(0).div(tmp[this.layer].bars.Ro6.req)
            },
            display() { return "转盘能量: "+format(player.ro.points.sub(n(tmp[this.layer].bars.Ro6.req).mul(tmp[this.layer].bars.Ro6.idR)).max(0).min(tmp[this.layer].bars.Ro6.req))+" / "+format(tmp[this.layer].bars.Ro6.req)+" ("+format(100-tmp[this.layer].bars.Ro6.progress)+"%)" },
            displayEN() { return "Wheel Energy: "+format(player.ro.points.sub(n(tmp[this.layer].bars.Ro6.req).mul(tmp[this.layer].bars.Ro6.idR)).max(0).min(tmp[this.layer].bars.Ro6.req))+" / "+format(tmp[this.layer].bars.Ro6.req)+" ("+format(100-tmp[this.layer].bars.Ro6.progress)+"%)" },
            fillStyle: {"background-color": "#888"},
        },
        Ro7: {
            direction: RIGHT,
            width: 600,
            height: 20,
            req(){
                return n(tmp.ro.roReq)
            },
            idR(){return n(6)},
            unlocked(){return tmp.ac.unlocks>=4},
            progress() {
                return player.ro.points.sub(n(tmp[this.layer].bars.Ro7.req).mul(tmp[this.layer].bars.Ro7.idR)).max(0).div(tmp[this.layer].bars.Ro7.req)
            },
            display() { return "转盘能量: "+format(player.ro.points.sub(n(tmp[this.layer].bars.Ro7.req).mul(tmp[this.layer].bars.Ro7.idR)).max(0).min(tmp[this.layer].bars.Ro7.req))+" / "+format(tmp[this.layer].bars.Ro7.req)+" ("+format(100-tmp[this.layer].bars.Ro7.progress)+"%)" },
            displayEN() { return "Wheel Energy: "+format(player.ro.points.sub(n(tmp[this.layer].bars.Ro7.req).mul(tmp[this.layer].bars.Ro7.idR)).max(0).min(tmp[this.layer].bars.Ro7.req))+" / "+format(tmp[this.layer].bars.Ro7.req)+" ("+format(100-tmp[this.layer].bars.Ro7.progress)+"%)" },
            fillStyle: {"background-color": "#888"},
        },
    },
    tabFormat: [
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
        ["bar", "Ro6"],
        ["bar", "Ro7"],
        "blank",
        "blank",
        "blank",
        "blank",
        'clickables',
        "blank",
        "blank",
        ["display-text", function() {
            if(tmp.goals.unlocks>=6){
                return "<h3>RA("+format(player[this.layer].a)+") | RA<sub></sub>("+format(player[this.layer].aPower)+") = "+format(player[this.layer].valueA)+" | "+format(player[this.layer].valueAPower)+"</h3>"
            }
            return "<h3>RA("+format(player[this.layer].a)+") = "+format(player[this.layer].valueA)+"</h3>"
        }],
        ["display-text", function() { return (tmp.goals.unlocks>=6 ? 'RA | RA<sub>p</sub>' : 'RA')+"(RoA) = "+tmp[this.layer].displayFormula[1] }],
        "blank",
        ["display-text", function() {
            if(tmp.goals.unlocks>=6){
                return "<h3>RB("+format(player[this.layer].b)+") | RB<sub></sub>("+format(player[this.layer].bPower)+") = "+format(player[this.layer].valueB)+" | "+format(player[this.layer].valueBPower)+"</h3>"
            }
            return "<h3>RB("+format(player[this.layer].b)+") = "+format(player[this.layer].valueB)+"</h3>"
        }],
        ["display-text", function() { return (tmp.goals.unlocks>=6 ? 'RB | RB<sub>p</sub>' : 'RB')+"(RoB) = "+tmp[this.layer].displayFormula[2] }],
        "blank",
        ["display-text", function() {
            if(tmp.goals.unlocks>=6){
                return "<h3>RC("+format(player[this.layer].c)+") | RC<sub></sub>("+format(player[this.layer].cPower)+") = "+format(player[this.layer].valueC)+" | "+format(player[this.layer].valueCPower)+"</h3>"
            }
            return "<h3>RC("+format(player[this.layer].c)+") = "+format(player[this.layer].valueC)+"</h3>"
        }],
        ["display-text", function() { return tmp.ro.roLevel>=2 ? (tmp.goals.unlocks>=6 ? 'RC | RC<sub>p</sub>' : 'RC')+"(RoC) = "+tmp[this.layer].displayFormula[3] : '' }],
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
    branches: ["b"],
})
