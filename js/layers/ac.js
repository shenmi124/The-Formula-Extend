addLayer("ac", {
    name: "ac",
    image: "resources/ac.png",
    row: "side",
    startData() { return {
        unlocked: true,
        achievements: [],
    }},
    tooltip() {
        if(options.ch) return "您已经完成 "+formatWhole(tmp[this.layer].achsCompleted)+" 荣耀"
        return formatWhole(tmp[this.layer].achsCompleted)+" Glories completed"
    },
    position: 3,
    color: "#cbff3b",
    tabFormat: [
        "blank",
        ["display-text", function() {
            if(options.ch) return "<h3>您已经完成 <span style='color: "+tmp[this.layer].color+"; font-size: 25px;'>"+formatWhole(tmp[this.layer].achsCompleted)+"</span> 荣耀</h3>" 
            else return "<h3>You have completed <span style='color: "+tmp[this.layer].color+"; font-size: 25px;'>"+formatWhole(tmp[this.layer].achsCompleted)+"</span> Glories</h3>"
        }],
        "blank", "buyables", 
        "blank", "blank", "blank",
        "achievements", "blank", "blank", "blank", "blank",
        'milestones'
    ],
    unlocks() { return player[this.layer].buyables[11].toNumber() },
    achsCompleted() { return player[this.layer].achievements.length },
    layerShown() { return n(tmp[this.layer].achsCompleted).gte(1) || tmp.goals.unlocks>=3 },
    buyables: {
        rows: 1,
        cols: 1,
        11: {
            unlockData: [
                {
                    desc: "到达特权阶级1",
                    descEN: "Reach Perk Tier 1",
                    req: 1,
                },
                {
                    desc: "到达特权阶级2",
                    descEN: "Reach Perk Tier 2",
                    req: 2,
                },
                {
                    desc: "到达特权阶级3",
                    descEN: "Reach Perk Tier 3",
                    req: 3,
                },
                {
                    desc: "到达特权阶级4",
                    descEN: "Reach Perk Tier 4",
                    req: 4,
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
            display() { 
                let data = tmp[this.layer].buyables[11].retrieveUnlockData
                if (!data) return "???";
                else return "要求: "+formatWhole(data.req)+" 荣耀成就";
            },
            displayEN() { 
                let data = tmp[this.layer].buyables[11].retrieveUnlockData
                if (!data) return "???";
                else return "Req: "+formatWhole(data.req)+" Glories";
            },
            canAfford() { 
                let data = tmp[this.layer].buyables[11].retrieveUnlockData
                let real = tmp[this.layer].achsCompleted
                if (!data) return false;
                return real>=data.req
            },
            buy() {
                layerDataReset('goals')
                layerDataReset('b')
                layerDataReset('a2')
                layerDataReset('ro')
                layerDataReset('a')
                player.points = n(0)

                if (!tmp[this.layer].buyables[11].retrieveUnlockData) return;
                player[this.layer].buyables[11] = player[this.layer].buyables[11].plus(1)
            },
        },
    },
	milestones: {
		1: {
			requirementDescription: "特权阶级1",
			requirementDescriptionEN: "Perk Tier 1",
			effectDescription: ">————————————————————————————————————————————————————————————————————————<<br>完全重置成就,A能量,阿尔法能量<br><br>timespeed × 2<br>timewall最小为0.02<br><br>重置阿尔法能量时保留进化<br>进化购买项不再消耗A能量<br>>————————————————————————————————————————————————————————————————————————<",
			effectDescriptionEN: ">————————————————————————————————————————————————————————————————————————<<br>Fully Reset Goals,A-Power,Alpha Energy<br><br>timespeed × 2<br>timewall is at least 0.02<br><br>Keep Avolve on Alpha Energy reset<br>Buying the Avolve buyable cost nothing.<br>>————————————————————————————————————————————————————————————————————————<",
			done() {
				return tmp.ac.unlocks>=1
			},
            unlocked(){return tmp.ac.unlocks>=1}
		},
		2: {
			requirementDescription: "特权阶级2",
			requirementDescriptionEN: "Perk Tier 2",
			effectDescription: ">————————————————————————————————————————————————————————————————————————<<br>完全重置成就,A能量,阿尔法能量<br><br>a效果公式A指数+0.04<br><br>A能量不再重置任何<br>你可以最大购买阿尔法能量<br>>————————————————————————————————————————————————————————————————————————<",
			effectDescriptionEN: ">————————————————————————————————————————————————————————————————————————<<br>>Fully Reset Goals,A-Power,Alpha Energy<br><br>A's exponent+0.04<br><br>A-Power resets nothing<br>>————————————————————————————————————————————————————————————————————————<",
			done() {
				return tmp.ac.unlocks>=2
			},
            unlocked(){return tmp.ac.unlocks>=2}
		},
		3: {
			requirementDescription: "特权阶级3",
			requirementDescriptionEN: "Perk Tier 3",
			effectDescription: ">————————————————————————————————————————————————————————————————————————<<br>完全重置成就,A能量,阿尔法能量,B能量,转盘<br><br>转盘升级<br><br>你可以自动购买A能量<br>一次可以获得5级的进化<br>阿尔法能量不再消耗/重置A能量<br>>————————————————————————————————————————————————————————————————————————<",
			effectDescriptionEN: ">————————————————————————————————————————————————————————————————————————<<br>>Fully Reset Goals,A-Power,Alpha Energy,B-Power,Wheel<br><br>Wheel Upgrade<br><br>Automate A-Power<br>Bulk buy 5 Avolve levels<br>Alpha Energy do not reset A-Power<br>>————————————————————————————————————————————————————————————————————————<",
			done() {
				return tmp.ac.unlocks>=3
			},
            unlocked(){return tmp.ac.unlocks>=3}
		},
		4: {
			requirementDescription: "特权阶级4",
			requirementDescriptionEN: "Perk Tier 4",
			effectDescription: ">————————————————————————————————————————————————————————————————————————<<br>完全重置成就,A能量,阿尔法能量,B能量,转盘<br><br>exp不再被β影响,持续β最大<br><br>一次可以获得50级的进化<br>自动购买进化<br>你可以最大购买B能量<br>>————————————————————————————————————————————————————————————————————————<",
			effectDescriptionEN: ">————————————————————————————————————————————————————————————————————————<<br>>Fully Reset Goals,A-Power,Alpha Energy,B-Power,Wheel<br><br>Wheel Upgrade<br><br>Automate A-Power<br>Bulk buy 5 Avolve levels<br>Alpha Energy do not reset A-Power<br>>————————————————————————————————————————————————————————————————————————<",
			done() {
				return tmp.ac.unlocks>=4
			},
            unlocked(){return tmp.ac.unlocks>=4}
		},
    },
    achievements: {
        11: {
            name: "5",
            nameEN: "5",
            done() { return n(tmp.goals.achsCompleted).add(tmp.ac.achsCompleted).pow(0.7).floor().gte(5) },
            tooltip: "获得5个成就",
            tooltipEN: "Complete 5 Goals.",
            unlocked() { return true },
        },
        12: {
            name: "6",
            nameEN: "6",
            done() { return n(tmp.goals.achsCompleted).add(tmp.ac.achsCompleted).pow(0.7).floor().gte(6) },
            tooltip: "获得6个成就",
            tooltipEN: "Complete 6 Goals.",
            unlocked() { return tmp.ac.unlocks>=1 },
        },
        13: {
            name: "10",
            nameEN: "10",
            done() { return n(tmp.goals.achsCompleted).add(tmp.ac.achsCompleted).pow(0.7).floor().gte(10) },
            tooltip: "获得10个成就",
            tooltipEN: "Complete 10 Goals.",
            unlocked() { return tmp.ac.unlocks>=2 },
        },
        14: {
            name: "11",
            nameEN: "11",
            done() { return n(tmp.goals.achsCompleted).add(tmp.ac.achsCompleted).pow(0.7).floor().gte(11) },
            tooltip: "获得11个成就",
            tooltipEN: "Complete 11 Goals.",
            unlocked() { return tmp.ac.unlocks>=3 },
        },
    },
    nodeStyle: { width: "50px", height: "50px", "min-width": "50px" },
    componentStyles: {
        achievement: {
            "border-radius": "5%",
        },
        buyable: {
            "min-width": "100px",
            height: "75px",
            "border-radius": "5%",
        },
    },
})