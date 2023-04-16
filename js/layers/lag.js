addLayer("lag", {
    name: "lag",
    position: 0,
    row: 2,
    tooltip() { return "Choose this!" },
    startData() { return {
        unlocked: true,
    }},
    color: "#fff",
    type: "none",
    layerShown(){return options.ch == undefined},
    tabFormat: [
        "blank",
        ["display-text", function() { return "选择语言(英文版可能会有一些bug)<br>Choose your language(there may be some bugs in English mode)<br><br>选择是:中文  否:英文<br>select yes:Chinese  no:English<br><br>你可以在设置中改变语言<br>You can change the language in the settings<br><br><a href='https://afdian.net/@Mysterious124' target='_blank'>点我捐助</a><br><a href='https://afdian.net/@Mysterious124' target='_blank'>Click me to donate</a><br><br><a href='https://discord.gg/DdWRz6cJ' target='_blank'>Shinwmyste Game Discord</a>" }],
        "blank", "blank",
        'clickables',
    ],
    clickables: {
        11: {
            title(){return '中文(Chinese)'},
            titleEN(){return '中文(Chinese)'},
            canClick(){return true},
			style() {return {'width': "160px", "min-width": "160px", 'height': "160px", "border-radius": "5%", "margin-right": "20px",}},
            onClick(){options.ch=true;showTab('a')}
        },  
        12: {
            title(){return 'English(英文)'},
            titleEN(){return 'English(英文)'},
            canClick(){return true},
			style() {return {'width': "160px", "min-width": "160px", 'height': "160px", "border-radius": "5%", "margin-right": "20px",}},
            onClick(){options.ch=false;showTab('a')}
        },  
    },
})