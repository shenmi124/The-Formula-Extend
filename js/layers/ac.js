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
                layerDataReset('a2')
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
    },
    achievements: {
        11: {
            name: "免费!",
            done() { return tmp.goals.unlocks>=3 },
            tooltip: "解锁荣耀.",
            unlocked() { return true },
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