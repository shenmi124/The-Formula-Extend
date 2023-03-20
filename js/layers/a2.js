addLayer("a2", {
    name: "α",
    symbol() {
        if(player.a2.gamma.gte(1)){
            return "α/β/γ = "+format(player[this.layer].points,0)+'/'+format(player[this.layer].beta,0)+'/'+format(player[this.layer].gamma,0)
        }
        if(player[this.layer].unlocked){
            return "α/β = "+format(player[this.layer].points,0)+'/'+format(player[this.layer].beta,0)
        }
        return "α"
    },
    position: 0,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        value: new Decimal(0),
        beta: new Decimal(0),
        valueBeta: new Decimal(0),
        gamma: n(0),
        valueGamma: new Decimal(0),
    }},
    nodeStyle: { "min-width": "60px", height: "60px", "font-size": "30px", "padding-left": "15px", "padding-right": "15px" },
    color: "#f8a9ba",
    resource: "阿尔法能量", 
    baseResource: "n", 
    baseAmount() {return player.a.value}, 
    type: "custom",
    tooltipLocked() { return "" },
    canReset() { return tmp[this.layer].getResetGain.gte(1) },
    getResetGain() {
        let amt = 0
        if(player.a.value.gte(player.a2.points.add(1))){amt = 1}

        return new Decimal(amt)
    },
    getNextAt() {
        return player.a2.points.add(1)
    },
    prestigeButtonText() {
        let text = "重置以获得 "+"<b>"+formatWhole(tmp[this.layer].resetGain)+"</b> 阿尔法能量<br><br>";
        text += "需求: a(A) ≥ "+format(tmp[this.layer].getNextAt)
        return text;
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return tmp.goals.unlocks>=1},
    displayFormula() {
        let f = "α - β + 1";

        let f2 = colorText('( ','#bf8f8f')+' β + 1 '+colorText(' )<sup>( α / 20 + 0.7 )</sup','#bf8f8f')

        let f3 = '1 - α × 0.24'
        if(tmp.ac.unlocks>=1){f3 = colorText('Max( ','#bf8f8f')+'1 - α × 0.24, 0.02'+colorText(' ) ','#bf8f8f')}

        let fg = colorText('γ × 0.2 × (','#77bf5f')+colorText(' Max( ','#bf8f8f')+'γ, 1'+colorText(' ) / ( ','#bf8f8f')+' 2 + γ '+colorText(' ) ','#bf8f8f')+' '+colorText(') + 1','#77bf5f')
        
        return [f, f2, f3, fg];
    },
    calculateValue(val=player[this.layer].points) {
        val=val.sub(player.a2.beta).add(1)

        return val;
    },
    calculateValueBeta(val=player[this.layer].points) {
        let a = player.a2.beta.add(1).pow(val.div(20).add(0.7))

        return a;
    },
    calculateValueGamma() {
        let a = player.a2.gamma.mul(0.2).mul(player.a2.gamma.max(1).div(n(2).add(player.a2.gamma))).add(1)

        return a;
    },
    update(diff) {
        player[this.layer].value = tmp[this.layer].calculateValue
        player[this.layer].valueBeta = tmp[this.layer].calculateValueBeta
        player[this.layer].valueGamma = tmp[this.layer].calculateValueGamma

        if(n(player.a.buyables[11]).gt(player.a2.gamma)){
            player.a2.gamma = player.a.buyables[11]
        }
    },
    timespeedBoost(){
        if(tmp.ac.unlocks>=1){return n(1).sub(player.a2.points.mul(0.24)).max(0.02)}
        return n(1).sub(player.a2.points.mul(0.24))
    },
	clickables: {
		11: {
			title:"-",
			canClick(){
				return player.a2.beta.gt(0)
			},
			onClick(){
                player.a2.beta = player.a2.beta.sub(1)
                player.points = n(0)
			},
			style() {return {'height': "50px", 'min-height': "50px", 'width': '50px',"border-radius": "5%",}},
		},
		12: {
			title:"+",
			canClick(){
				return player.a2.points.sub(player.a2.beta).gt(0)
			},
			onClick(){
                player.a2.beta = player.a2.beta.add(1)
                player.points = n(0)
			},
			style() {return {'height': "50px", 'min-height': "50px", 'width': '50px',"border-radius": "5%",}},
		},
	},
    tabFormat: [
        "main-display",
        "prestige-button",
        "blank",
        "blank",
        ["display-text", function() {
            if(player.a2.gamma.gte(1)){
                return "<h3>α/β/γ = "+format(player[this.layer].points,0)+'/'+format(player[this.layer].beta,0)+'/'+format(player[this.layer].gamma,0)+'</h3>'
            }
            if(player[this.layer].unlocked){
                return "<h3>α/β = "+format(player[this.layer].points,0)+'/'+format(player[this.layer].beta,0)+'</h3>'
            }
        }],,
        "blank",
        ["display-text", function() { return "<h3>exp("+formatWhole(player[this.layer].points)+") = "+format(player[this.layer].value)+"</h3>" }],
        ["display-text", function() { return "exp(α) = "+tmp[this.layer].displayFormula[0] }],
        "blank",
        ["display-text", function() { return "<h3>mul("+formatWhole(player[this.layer].beta)+") = "+format(player[this.layer].valueBeta)+"</h3>" }],
        ["display-text", function() { return "mul(β) = "+tmp[this.layer].displayFormula[1] }],
        "blank",
        ["display-text", function() { return player.a2.gamma.gte(1) ? "<h3>gamma("+formatWhole(player[this.layer].gamma)+") = "+format(player[this.layer].valueGamma)+"</h3>" : ''}],
        ["display-text", function() { return player.a2.gamma.gte(1) ? "gamma(γ) = "+tmp[this.layer].displayFormula[3] : ''}],
        "blank",
        ["display-text", function() { return "<h3>timewall("+formatWhole(player[this.layer].points)+") = "+format(tmp[this.layer].timespeedBoost)+"</h3>" }],
        ["display-text", function() { return "timewall(α) = "+tmp[this.layer].displayFormula[2] }],
        "blank",
        "blank",
        "blank",
        'clickables'
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
    branches: ["a"],
})
