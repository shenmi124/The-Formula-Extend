function layerDisplay(id){
    if(tmp[id].layerShown===undefined){
        return true
    }
    return tmp[id].layerShown
}

function layerDisplayTotal(id){
    for(i in id){
        let a = layerDisplay(id[i])
        if(a==true){
            return true
        }
    }
}

addLayer("0Layer small", {
    name: "AllLayer",
    position: -1,
    row: 0,
    symbol() {
        return options.ch ? '↓ 层级 0 ↓' : '↓ Layer 0 ↓'
    },
    nodeStyle: {"font-size": "15px", "text-center": "center", "height": "30px"},
    startData() { return {
        unlocked: true,
        small: true,
        points: n(0),
    }},
    color: "#fefefe",
    type: "none",
    tooltip(){return false},
    layerShown(){return layerDisplayTotal(['a'])},
    tabFormat: [
        ["display-text", function() { return getPointsDisplay() }],
    ],
})

addLayer("1Layer small", {
    name: "AllLayer",
    position: -1,
    row: 1,
    symbol() {
        return options.ch ? '↓ 层级 1 ↓' : '↓ Layer 1 ↓'
    },
    nodeStyle: {"font-size": "15px", "text-center": "center", "height": "30px"},
    startData() { return {
        unlocked: true,
        small: true,
        points: n(0),
    }},
    color: "#fefefe",
    type: "none",
    tooltip(){return false},
    layerShown(){return layerDisplayTotal(['a2','ro'])},
    tabFormat: [
        ["display-text", function() { return getPointsDisplay() }],
    ],
})

addLayer("2Layer small", {
    name: "AllLayer",
    position: -1,
    row: 2,
    symbol() {
        return options.ch ? '↓ 层级 2 ↓' : '↓ Layer 2 ↓'
    },
    nodeStyle: {"font-size": "15px", "text-center": "center", "height": "30px"},
    startData() { return {
        unlocked: true,
        small: true,
        points: n(0),
    }},
    color: "#fefefe",
    type: "none",
    tooltip(){return false},
    layerShown(){return layerDisplayTotal(['b'])},
    tabFormat: [
        ["display-text", function() { return getPointsDisplay() }],
    ],
})

addLayer("3Layer small", {
    name: "AllLayer",
    position: -1,
    row: 3,
    symbol() {
        return options.ch ? '↓ 层级 3 ↓' : '↓ Layer 3 ↓'
    },
    nodeStyle: {"font-size": "15px", "text-center": "center", "height": "30px"},
    startData() { return {
        unlocked: true,
        small: true,
        points: n(0),
    }},
    color: "#fefefe",
    type: "none",
    tooltip(){return false},
    layerShown(){return layerDisplayTotal(['co'])},
    tabFormat: [
        ["display-text", function() { return getPointsDisplay() }],
    ],
})

addLayer("SideLayer small", {
    name: "AllLayer",
    position: -1,
    row: 99,
    symbol() {
        return options.ch ? '↓ 侧边层级 ↓' : '↓ Side Layer ↓'
    },
    nodeStyle: {"font-size": "15px", "text-center": "center", "height": "30px"},
    startData() { return {
        unlocked: true,
        small: true,
        points: n(0),
    }},
    color: "#fefefe",
    type: "none",
    tooltip(){return false},
    layerShown(){return layerDisplayTotal(['goals','ac','meta'])},
    tabFormat: [
        ["display-text", function() { return getPointsDisplay() }],
    ],
})

addLayer("OtherTab small", {
    name: "AllLayer",
    position: -1,
    row: 999,
    symbol() {
        return options.ch ? '↓ 其他页面 ↓' : '↓ Other Tab ↓'
    },
    nodeStyle: {"font-size": "15px", "text-center": "center", "height": "30px"},
    startData() { return {
        unlocked: true,
        small: true,
        points: n(0),
    }},
    color: "#fefefe",
    type: "none",
    tooltip(){return false},
    layerShown(){return layerDisplayTotal(['Setting','Statistics','Information','Changelog'])},
    tabFormat: [
    ],
})

addLayer("Setting", {
    name: "Setting",
    position: 0,
    row: 999,
    symbol() {
        return options.ch ? '设置' : 'Setting'
    },
    startData() { return {
        unlocked: true,
        small: true,
        points: n(0),
    }},
    color: "rgb(230, 230, 236)",
    type: "none",
    tooltip(){return false},
    tabFormat: [
    ],
})

addLayer("Information", {
    name: "Information",
    position: 2,
    row: 999,
    symbol() {
        return options.ch ? '信息' : 'Information'
    },
    startData() { return {
        unlocked: true,
        small: true,
        points: n(0),
    }},
    color: "rgb(230, 230, 236)",
    type: "none",
    tooltip(){return false},
    tabFormat: [
    ],
})

addLayer("Changelog", {
    name: "Changelog",
    position: 3,
    row: 999,
    symbol() {
        return options.ch ? '更新日志' : 'Changelog'
    },
    startData() { return {
        unlocked: true,
        small: true,
        points: n(0),
    }},
    color: "rgb(230, 230, 236)",
    type: "none",
    tooltip(){return false},
    tabFormat: [
    ],
})
