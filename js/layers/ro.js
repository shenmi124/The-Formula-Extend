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
        valueA: new Decimal(0),
        b: new Decimal(0),
        valueB: new Decimal(0),

        last: '无上次记录',
    }},
    nodeStyle: { "min-width": "60px", height: "60px", "font-size": "30px", "padding-left": "15px", "padding-right": "15px" },
    color: "#888",
    resource: "轮盘能量", 
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

        return [f,f2,f3]
    },
    calculateValue(val=player.b.value) {
        val=val.div(2)

        return val;
    },
    calculateValueRo(){
        let f = player.ro.a.pow(0.75).add(1)
        
        let f2 = player.ro.b.div(50)

        return [f,f2];
    },
    roReq(){
        return n(100)
    },
    update(diff) {
        player.ro.value = n(tmp.ro.calculateValue)

        player.ro.valueA = n(tmp.ro.calculateValueRo[0])
        player.ro.valueB = n(tmp.ro.calculateValueRo[1])

        player.ro.points = player.ro.points.add(n(player.ro.value).mul(diff)).min(n(tmp.ro.roReq).mul(5))
    },
	clickables: {
		11: {
			title:"<big><big><big>轮盘!</big></big></big><br>",
            display(){
                return '<big><big>RoA —— 95%<br>RoB —— 5%<br><br>数量:0.1 ~ 10</big><br><br>上次: '+tmp.ro.clickables[11].last+'</big>'
            },
            last(){return player.ro.last},
			canClick(){
				return player.ro.points.gte(tmp.ro.roReq)
			},
			onClick(){
                let pow = n(Math.random() * 2 - 1)
                let num = n(10).pow(pow)

                let a = (Math.random() * 100)
                if(a>=95){
                    player.ro.b = player.ro.b.add(num)

                    player.ro.last = 'RoB '+format(num)
                }else{
                    player.ro.a = player.ro.a.add(num)

                    player.ro.last = 'RoA '+format(num)
                }

                player.ro.points = player.ro.points.sub(tmp.ro.roReq)
			},
			style() {return {'height': "250px", 'min-height': "250px", 'width': '250px',"border-radius": "50%",}},
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
            fillStyle: {"background-color": "#888"},
        },
    },
    tabFormat: [
        "main-display",
        ["display-text", function() { return "获取 = baseRo = (+"+format(player.ro.value)+"/s)"}],
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
        ["display-text", function() { return "<h3>RA("+format(player[this.layer].a)+") = "+format(player[this.layer].valueA)+"</h3>" }],
        ["display-text", function() { return "RA(RoA) = "+tmp[this.layer].displayFormula[1] }],
        "blank",
        ["display-text", function() { return "<h3>RB("+format(player[this.layer].b)+") = "+format(player[this.layer].valueB)+"</h3>" }],
        ["display-text", function() { return "RB(RoB) = "+tmp[this.layer].displayFormula[2] }],
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
