addLayer("ac", {
    name: "ac",
    image: "resources/ac.png",
    row: "side",
    startData() { return {
        unlocked: true,
        achievements: [],
    }},
    tooltip() { return "您已经完成 "+formatWhole(tmp[this.layer].achsCompleted)+" 荣耀"},
    position: 3,
    color: "#cbff3b",
    tabFormat: [
        "blank",
        ["display-text", function() { return "<h3>您已经完成 <span style='color: "+tmp[this.layer].color+"; font-size: 25px;'>"+formatWhole(tmp[this.layer].achsCompleted)+"</span> 荣耀</h3>" }],
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
                    desc: "获得特权阶级1",
                    req: 1,
                },
                {
                    desc: "获得特权阶级2",
                    req: 2,
                },
                {
                    desc: "获得特权阶级3",
                    req: 3,
                },
            ],
            retrieveUnlockData() { return tmp[this.layer].buyables[11].unlockData[player[this.layer].buyables[11].toNumber()] },
            title() {
                let data = tmp[this.layer].buyables[11].retrieveUnlockData
                if (!data) return "???";
                else return data.desc;
            },
            display() { 
                let data = tmp[this.layer].buyables[11].retrieveUnlockData
                if (!data) return "???";
                else return "要求: "+formatWhole(data.req)+" 荣耀成就";
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
			effectDescription: ">————————————————————————————————————————————————————————————————————————<<br>完全重置成就,A能量,阿尔法能量<br><br>timespeed × 2<br>timewall最小为0.02<br><br>重置阿尔法能量时保留进化<br>进化购买项不再消耗A能量<br>>————————————————————————————————————————————————————————————————————————<",
			done() {
				return tmp.ac.unlocks>=1
			},
            unlocked(){return tmp.ac.unlocks>=1}
		},
		2: {
			requirementDescription: "特权阶级2",
			effectDescription: ">————————————————————————————————————————————————————————————————————————<<br>完全重置成就,A能量,阿尔法能量<br><br>a效果公式A指数+0.04<br><br>A能量不再重置任何<br>你可以最大购买阿尔法能量<br>>————————————————————————————————————————————————————————————————————————<",
			done() {
				return tmp.ac.unlocks>=2
			},
            unlocked(){return tmp.ac.unlocks>=2}
		},
		3: {
			requirementDescription: "特权阶级3",
			effectDescription: ">————————————————————————————————————————————————————————————————————————<<br>完全重置成就,A能量,阿尔法能量,B能量,转盘<br><br>转盘升级<br><br>你可以自动购买A能量<br>一次可以获得5级的进化<br>阿尔法能量不再消耗/重置A能量<br>>————————————————————————————————————————————————————————————————————————<",
			done() {
				return tmp.ac.unlocks>=3
			},
            unlocked(){return tmp.ac.unlocks>=3}
		},
    },
    achievements: {
        11: {
            name: "5",
            done() { return n(tmp.goals.achsCompleted).add(tmp.ac.achsCompleted).pow(0.7).floor().gte(5) },
            tooltip: "获得5个成就",
            unlocked() { return true },
        },
        12: {
            name: "6",
            done() { return n(tmp.goals.achsCompleted).add(tmp.ac.achsCompleted).pow(0.7).floor().gte(6) },
            tooltip: "获得6个成就",
            unlocked() { return tmp.ac.unlocks>=1 },
        },
        13: {
            name: "10",
            done() { return n(tmp.goals.achsCompleted).add(tmp.ac.achsCompleted).pow(0.7).floor().gte(10) },
            tooltip: "获得10个成就",
            unlocked() { return tmp.ac.unlocks>=2 },
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