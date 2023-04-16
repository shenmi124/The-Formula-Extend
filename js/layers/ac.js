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
    color: "#00FF00",
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
                {
                    desc: "到达特权阶级5",
                    descEN: "Reach Perk Tier 5",
                    req: 5,
                },
                {
                    desc: "到达特权阶级6",
                    descEN: "Reach Perk Tier 6",
                    req: 6,
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
                layerDataReset('co',['buyables'])
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
			effectDescriptionEN: ">————————————————————————————————————————————————————————————————————————<<br>Fully Reset Goals,A-Power,Alpha Energy<br><br>A's exponent+0.04<br><br>A-Power resets nothing<br>>————————————————————————————————————————————————————————————————————————<",
			done() {
				return tmp.ac.unlocks>=2
			},
            unlocked(){return tmp.ac.unlocks>=2}
		},
		3: {
			requirementDescription: "特权阶级3",
			requirementDescriptionEN: "Perk Tier 3",
			effectDescription: ">————————————————————————————————————————————————————————————————————————<<br>完全重置成就,A能量,阿尔法能量,B能量,转盘<br><br>转盘升级<br><br>你可以自动购买A能量<br>一次可以获得5级的进化<br>阿尔法能量不再消耗/重置A能量<br>>————————————————————————————————————————————————————————————————————————<",
			effectDescriptionEN: ">————————————————————————————————————————————————————————————————————————<<br>Fully Reset Goals,A-Power,Alpha Energy,B-Power,Wheel<br><br>Upgrade Wheel<br><br>Automate A-Power<br>Bulk buy 5 Avolve levels<br>Alpha Energy do not reset A-Power<br>>————————————————————————————————————————————————————————————————————————<",
			done() {
				return tmp.ac.unlocks>=3
			},
            unlocked(){return tmp.ac.unlocks>=3}
		},
		4: {
			requirementDescription: "特权阶级4",
			requirementDescriptionEN: "Perk Tier 4",
			effectDescription: ">————————————————————————————————————————————————————————————————————————<<br>完全重置成就,A能量,阿尔法能量,B能量,转盘<br><br>exp不再被β影响,持续β最大<br><br>一次可以获得50级的进化<br>自动购买进化<br>你可以最大购买B能量<br>>————————————————————————————————————————————————————————————————————————<",
			effectDescriptionEN: ">————————————————————————————————————————————————————————————————————————<<br>Fully Reset Goals,A-Power,Alpha Energy,B-Power,Wheel<br><br>Remove β from exp formula,β is always maxed<br><br>Bulk buy 50 Avolve levels<br>Automate Avolve Upgrade<br>You can buy max B-Power<br>>————————————————————————————————————————————————————————————————————————<",
			done() {
				return tmp.ac.unlocks>=4
			},
            unlocked(){return tmp.ac.unlocks>=4}
		},
		5: {
			requirementDescription: "特权阶级5",
			requirementDescriptionEN: "Perk Tier 5",
			effectDescription: ">————————————————————————————————————————————————————————————————————————<<br>完全重置成就,A能量,阿尔法能量,B能量,转盘,压缩点数(保留压缩点数解锁)<br><br>转盘能量获取可以超出上限,但是超出上限的部分将降低转盘能量获取<br>改善t<sub>2</sub>获取<br><br>一次可以获得100级的进化<br>自动购买阿尔法能量<br>B能量不再重置A能量以及进化<br>阿尔法能量不再重置任何<br>>————————————————————————————————————————————————————————————————————————<",
			effectDescriptionEN: ">————————————————————————————————————————————————————————————————————————<<br>Fully Reset Goals,A-Power,Alpha Energy,B-Power,Wheel,Compressed Point(keep it unlocked)<br><br>Wheel Energy can bypass its cap, while its gain decays post-cap<br>Improve t<sub>2</sub> gain<br>Bulk buy 100 Avolve levels<br>Automate Alpha Energy<br>B-Power no longer resets A-Power and Avolve<br>Alpha Energy resets nothing<br>>————————————————————————————————————————————————————————————————————————<",
			done() {
				return tmp.ac.unlocks>=5
			},
            unlocked(){return tmp.ac.unlocks>=5}
		},
		6: {
			requirementDescription: "特权阶级6",
			requirementDescriptionEN: "Perk Tier 6",
			effectDescription: ">————————————————————————————————————————————————————————————————————————<<br>快来了<br>>————————————————————————————————————————————————————————————————————————<",
			effectDescriptionEN: ">————————————————————————————————————————————————————————————————————————<<br>Coming soon<br>>————————————————————————————————————————————————————————————————————————<",
			done() {
				return tmp.ac.unlocks>=6
			},
            unlocked(){return tmp.ac.unlocks>=6}
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
        15: {
            name: "14",
            nameEN: "14",
            done() { return n(tmp.goals.achsCompleted).add(tmp.ac.achsCompleted).pow(0.7).floor().gte(14) },
            tooltip: "获得14个成就",
            tooltipEN: "Complete 14 Goals.",
            unlocked() { return tmp.ac.unlocks>=4 },
        },
        16: {
            name: "16",
            nameEN: "16",
            done() { return n(tmp.goals.achsCompleted).add(tmp.ac.achsCompleted).pow(0.7).floor().gte(16) },
            tooltip: "获得16个成就",
            tooltipEN: "Complete 16 Goals.",
            unlocked() { return tmp.ac.unlocks>=5 },
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