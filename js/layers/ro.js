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
    }},
    nodeStyle: { "min-width": "60px", height: "60px", "font-size": "30px", "padding-left": "15px", "padding-right": "15px" },
    color: "#888",
    resource: "轮盘能量", 
    baseResource: "n", 
    baseAmount() {return player.a.value}, 
    type: "none",
    tooltipLocked() { return "" },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return tmp.goals.unlocks>=5},
    update(diff) {

    },
	clickables: {
	},
    tabFormat: [
        "main-display",
        "blank",
        "blank",
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
