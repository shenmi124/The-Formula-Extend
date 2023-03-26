addLayer("co", {
    name: "co",
    row: 3,
    symbol() {
        if(tmp.co.unlocks>=1){return 'n(t) = '+format(player.value)}
        return 'Co'
    },
    startData() { return {
        unlocked: true,
    }},
    position: 3,
    color: "#fff",
    tabFormat: [
        "blank",
        "blank", "buyables",
        ["display-text", function() { return tmp.co.unlocks>=1? "<h3>n("+formatWhole(player.points)+") = "+format(player.value)+"</h3>" : '' }],
        ["display-text", function() { return tmp.co.unlocks>=1? "n(t) = "+displayFormula() : '' }],
        ["display-text", function() { return tmp.co.unlocks>=1? "n(t) = "+displayIntFormula() : '' }],
    ],
    unlocks() { return player[this.layer].buyables[11].toNumber() },
    nodeStyle: { "min-width": "60px", height: "60px", "font-size": "30px", "padding-left": "15px", "padding-right": "15px" },
    achsCompleted() { return 0 },
    layerShown() { return tmp.goals.unlocks>=7 || tmp.co.unlocks>=1},
    tooltip() {
        return "压缩点数"
    },
    branches: ["b"],
    buyables: {
        rows: 1,
        cols: 1,
        11: {
            unlockData: [
                {
                    desc: "重置之前的一切并开始获得压缩点数!<br><small>(这也会重置你的成就以及荣耀,但这是值得的!)<br><s>(也许没那么值得,但你必须重置)</s></small>",
                    descEN: "Reach Perk Tier 1",
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
                return false
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