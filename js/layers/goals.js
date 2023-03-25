addLayer("goals", {
    name: "goals",
    image: "resources/goal.png",
    row: "side",
    position: 1,
    startData() { return {
        unlocked: true,
        achievements: [],
    }},
    tooltip() {
        if(options.ch) return "您已经完成"+formatWhole(n(tmp[this.layer].achsCompleted).add(tmp.ac.achsCompleted))+"<sup>0.7</sup> = "+formatWhole(n(tmp[this.layer].achsCompleted).add(tmp.ac.achsCompleted).pow(0.7).floor())+"个成就"
        return formatWhole(n(tmp[this.layer].achsCompleted).add(tmp.ac.achsCompleted))+"<sup>0.7</sup> = "+formatWhole(n(tmp[this.layer].achsCompleted).add(tmp.ac.achsCompleted).pow(0.7).floor())+" Goals completed"
    },
    color: "#cbff3b",
    tabFormat: [
        "blank",
        ["display-text", function() {
            if(options.ch) return "<h3>您已经完成 <span style='color: "+tmp[this.layer].color+"; font-size: 25px;'>"+formatWhole(n(tmp[this.layer].achsCompleted).add(tmp.ac.achsCompleted))+"<sup>0.7</sup> = "+formatWhole(n(tmp[this.layer].achsCompleted).add(tmp.ac.achsCompleted).pow(0.7).floor())+"</span> 个成就</h3><br><small>(真实成就点:<span style='color: "+tmp[this.layer].color+";'>"+format(n(tmp[this.layer].achsCompleted).add(tmp.ac.achsCompleted).pow(0.7))+"</span>)<small>"
            return  "<h3>You have completed <span style='color: "+tmp[this.layer].color+"; font-size: 25px;'>"+formatWhole(n(tmp[this.layer].achsCompleted).add(tmp.ac.achsCompleted))+"<sup>0.7</sup> = "+formatWhole(n(tmp[this.layer].achsCompleted).add(tmp.ac.achsCompleted).pow(0.7).floor())+"</span> Goals</h3><br><small>(Real Goals Completed:<span style='color: "+tmp[this.layer].color+";'>"+format(n(tmp[this.layer].achsCompleted).add(tmp.ac.achsCompleted).pow(0.7))+"</span>)<small>"
        }],
        "blank", "buyables", 
        "blank", "blank", "blank",
        "achievements",
    ],
    goal36power() { 
        let power = new Decimal(1)
        return power;
    },
    goal36decayrate() {
        let rate = new Decimal(1);
        return rate
    },
    goal36eff() {
		return n(1)
    },
    achsCompleted() { return player[this.layer].achievements.length },
    unlocks() { return player[this.layer].buyables[11].toNumber() },
    buyables: {
        rows: 1,
        cols: 1,
        11: {
            unlockData: [
                {
                    desc: "解锁α.",
                    descEN: "Unlock α.",
                    req: 2,
                },
                {
                    desc: "解锁进化.",
                    descEN: "Unlock Avolve.",
                    req: 3,
                },
                {
                    desc: "解锁荣耀.",
                    descEN: "Unlock Glory.",
                    req: 5,
                },
                {
                    desc: "解锁B能量",
                    descEN: "Unlock B-Power",
                    req: 7,
                },
                {
                    desc: "解锁轮盘",
                    descEN: "Unlock Wheel",
                    req: 8,
                },
                {
                    desc: "解锁电池",
                    descEN: "Unlock Batteries",
                    req: 12,
                },
                {
                    desc: "解锁压缩点数",
                    descEN: "Unlock Batteries",
                    req: 13,
                },
                {
                    desc: "解锁C能量",
                    descEN: "Unlock C-Power",
                    req: 19,
                },
                {
                    desc: "解锁钟",
                    descEN: "Unlock The Clock",
                    req: 27,
                },
                {
                    desc: "解锁集合",
                    descEN: "Unlock Integration",
                    req: 37,
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
                else return "要求: "+formatWhole(data.req)+" 成就";
            },
            displayEN() { 
                let data = tmp[this.layer].buyables[11].retrieveUnlockData
                if (!data) return "???";
                else return "Req: "+formatWhole(data.req)+" Goals";
            },
            canAfford() { 
                let data = tmp[this.layer].buyables[11].retrieveUnlockData
                let real = n(tmp[this.layer].achsCompleted).add(tmp.ac.achsCompleted).pow(0.7)
                if (!data) return false;
                return real>=data.req
            },
            buy() {
                if (!tmp[this.layer].buyables[11].retrieveUnlockData) return;
                player[this.layer].buyables[11] = player[this.layer].buyables[11].plus(1)
            },
        },
    },
    achievements: {
        11: {
            name: "公式无用了!",
            nameEN: "The Formula is Useless Now!",
            done() { return player.a.points.gte(1) },
            tooltip: "获得1个A能量",
            tooltipEN: "Get 1 A-Power.",
            unlocked() { return true },
        },
        12: {
            name: "快去解锁下个阶段吧(笑)",
            nameEN: "Unlock Next Feature Now!(lol)",
            done() { return player.value.gte(1) },
            tooltip: "让 n(t) ≥ 1",
            tooltipEN: "Make n(t) ≥ 1.",
            unlocked() { return hasAchievement(this.layer, 11) }
        },
        13: {
            name: "?你为什么还不进入下一个阶段",
            nameEN: "Why Don't You Unlock Next Feature?",
            done() { return player.value.gte(1.2) },
            tooltip: "让 n(t) ≥ 1.2",
            tooltipEN: "Make n(t) ≥ 1.2.",
            unlocked() { return hasAchievement(this.layer, 12) }
        },
        14: {
            name: "新能源",
            nameEN: "New Energy",
            done() { return player.a.points.gte(2) },
            tooltip: "获得第二个A能量",
            tooltipEN: "Get 2 A-Power.",
            unlocked() { return hasAchievement(this.layer, 11) },
        },
        15: {
            name: "趋向极限值!",
            nameEN: "t To the Extreme!",
            done() { return n(getTimeSpeed()).eq(0) || (player.a2.points.gte(5) && tmp.ac.unlocks>=1) },
            tooltip(){return tmp.ac.unlocks>=1 ? '获得5阿尔法能量' : "使timespeed为0"},
            tooltipEN(){return tmp.ac.unlocks>=1 ? 'Get 5 Alpha Energy.' : "Reach x0 Timespeed."},
            unlocked() { return tmp.goals.unlocks>=1 },
        },
        16: {
            name: "点数在哪?",
            nameEN: "Where is even the point anymore?",
            done() { return (n(tmp.a2.timespeedBoost).lte(0) && player.value.gt(0)) || (n(tmp.a2.timespeedBoost).lte(0.02) && player.value.gt(0) && tmp.ac.unlocks>=1)},
            tooltip(){
                return tmp.ac.unlocks>=1 ? 'timewall≤0.02的情况下获得点数' : "timewall≤0的情况下获得点数"
            },
            tooltipEN(){
                return tmp.ac.unlocks>=1 ? 'Gain any n(t) while timewall≤0.02.' : "Gain any n(t) while timewall≤0."
            },
            unlocked() { return tmp.goals.unlocks>=1 },
        },
        21: {
            name: "达尔文是错误的",
            nameEN: "Darwin had it wrong",
            done() { return player.a.avolve.gte(2) },
            tooltip: "达到2级进化",
            tooltipEN: "Reach Avolve Level 2.",
            unlocked() { return tmp.goals.unlocks>=2 },
        },
        22: {
            name: "你应该发现了",
            nameEN: "You should have discovered it",
            done() { return player.a2.gamma.gte(1) },
            tooltip: "获得γ",
            tooltipEN: "Get any γ.",
            unlocked() { return player.a2.gamma.gte(1) || hasAchievement(this.layer, 22) }
        },
        23: {
            name: "达尔文又正确了",
            nameEN: "Darwin had it right(again)",
            done() { return player.a.avolve.gte(12) },
            tooltip: "达到12级进化",
            tooltipEN: "Reach Avolve Level 12.",
            unlocked() { return hasAchievement(this.layer, 21) },
        },
        24: {
            name: "突破极限",
            nameEN: "Break The Limit",
            done() { return player.a2.points.gte(6) },
            tooltip: "获得6阿尔法能量",
            tooltipEN: "Reach 6 Alpha Energy.",
            unlocked() { return tmp.goals.unlocks>=2 },
        },
        25: {
            name: "我赌你获得不了这个.",
            nameEN: "I bet you can't get this.",
            done() { return tmp.goals.unlocks>=3 && tmp.ac.unlocks>=1 },
            tooltip: "解锁并到达1荣耀",
            tooltipEN: "Unlock and reach 1 Glory.",
            unlocked() { return tmp.goals.unlocks>=3 },
        },
        26: {
            name: "欢迎回来",
            nameEN: "Welcome Back",
            done() { return tmp.goals.unlocks>=3 && tmp.ac.unlocks>=1 },
            tooltip: "重新解锁荣耀",
            tooltipEN: "Unlock Glory again.",
            unlocked() { return hasAchievement(this.layer, 25) },
        },
        31: {
            name: "再获加速",
            nameEN: "Accelerate again",
            done() { return player.a.points.gte(10) },
            tooltip: "达到 10 A能量.",
            tooltipEN: "Get 10 A-Power.",
            unlocked() { return tmp.goals.unlocks>=2 },
        },
        32: {
            name: "更远的存在",
            nameEN: "Further Existence",
            done() { return player.a.avolve.gte(30) },
            tooltip: "达到30级进化.",
            tooltipEN: "Reach Avolve Level 30.",
            unlocked() { return tmp.goals.unlocks>=2 },
        },
        33: {
            name: "更趋向极限值!",
            nameEN: "n(t) To the More Extreme!",
            done() { return player.value.gte(10000) },
            tooltip: "让 n(t) ≥ 10,000.",
            tooltipEN: "Make n(t) ≥ 10,000.",
            unlocked() { return tmp.ac.unlocks>=2 },
        },
        34: {
            name: "绝对是蜜蜂笑话",
            nameEN: "Definitely a Bee Joke",
            done() { return player.b.points.gte(1) },
            tooltip: "达到 1 B能量.",
            tooltipEN: "Reach 1 B-Power.",
            unlocked() { return tmp.goals.unlocks>=4 },
        },
        35: {
            name: "我强大么?",
            nameEN: "Am I Strong?",
            done() { return player.value.gte(333333) },
            tooltip: "让 n(t) ≥ 333,333",
            tooltipEN: "Make n(t) ≥ 333,333",
            unlocked() { return tmp.goals.unlocks>=4 }
        },
        36: {
            name: "参考那个蜜蜂电影",
            nameEN: "Cue That Bee Movie Reference",
            done() { return player.b.points.gte(2) },
            tooltip() { 
                return "达到 2 B能量."
            },
            tooltipEN() { 
                return "Reach 2 B-Power."
            },
            unlocked() { return tmp.goals.unlocks>=4 },
        },
        41: {
            name: "0次无限之和",
            nameEN: "The Halved-Infinite Sum",
            done() { return player.ro.points.gte(tmp.ro.roReq) },
            tooltip: "获得转动1次转盘的转盘能量",
            tooltipEN: "Gain enough Wheel Energy for your first spin.",
            unlocked() { return tmp.goals.unlocks>=5 }
        },
        42: {
            name: "这仍然没有哪怕半点作用",
            nameEN: "This is STILL USELESS",
            done() { return player.ro.b.gt(0) },
            tooltip: '获得RoB',
            tooltipEN: 'Get any RoB.',
            unlocked() { return tmp.goals.unlocks>=5 },
        },
        43: {
            name: "未充能",
            nameEN: "Chargeless",
            done() { return player.ro.points.gte(n(tmp.ro.roReq).mul(5)) || (player.ro.points.gte(n(tmp.ro.roReq)) && tmp.ac.unlocks>=3)},
            tooltip(){return tmp.ac.unlocks>=3 ? '获得转动1次转盘的转盘能量' : "转盘能量达到上限"},
            tooltipEN: "Get your Wheel Energy capped.",
            unlocked() { return tmp.goals.unlocks>=5 },
        },
        44: {
            name: "疯狂-B",
            nameEN: "Insani-B",
            done() { return player.b.points.gte(3) },
            tooltip: "第三个B能量",
            tooltipEN: "Reach 3 B-Power.",
            unlocked() { return tmp.goals.unlocks>=5 },
        },
        45: {
            name: "如果大数只是一个游戏内容...",
            nameEN: "If only Googology was a Feature...",
            done() { return player.value.gte(1e10) },
            tooltip: "让 n(t) ≥ 1e10",
            tooltipEN: "Make n(t) ≥ 1e10.",
            unlocked() { return tmp.goals.unlocks>=5 },
        },
        46: {
            name: "我感觉像是在赌博",
            nameEN: "I Feel Like Gambling",
            done() { return n(tmp.timeSpeed).gte(77.7) },
            tooltip: "使 timespeed ≥ 77.7",
            tooltipEN: "Make timespeed ≥ 77.7.",
            unlocked() { return tmp.goals.unlocks>=5 },
        },
        51: {
            name: "也许你还需要一个成就",
            nameEN: "You might need another goal",
            done() { return player.b.points.gte(4) },
            tooltip: "第四个B",
            tooltipEN: "Reach 4 B-Power.",
            unlocked() { return hasAchievement(this.layer, 46) },
        },
        52: {
            name: "哇那是成吨的伤害!",
            nameEN: "Woah that's a lotta Damage!",
            done() { return player.ro.c.gt(0) },
            tooltip: "获得RoC",
            tooltipEN: "Get any RoC.",
            unlocked() { return tmp.ac.unlocks>=3 }
        },
        53: {
            name: "到达极限值!",
            nameEN: "Alpha To the MAXIMAL Extreme!",
            done() { return player.a2.points.gte(300) },
            tooltip: '阿尔法能量达到上限',
            tooltipEN: 'Max out Alpha Energy.',
            unlocked() { return hasAchievement(this.layer, 54) || player.a2.points.gte(300) },
        },
        54: {
            name: "让我们再一次突破极限",
            nameEN: "Break The Limit(again)",
            done() { return player.b.points.gte(8) },
            tooltip() { return "获得8个B能量" },
            tooltipEN() { return "Reach 8 B-Power" },
            unlocked() { return hasAchievement(this.layer, 51) },
        },
        55: {
            name: "它甚至比原版游戏还快...",
            nameEN: "IT'S EVEN FASTER THAN THE ORIGINAL",
            done() { return player.value.gte(1e100) },
            tooltip: "让 n(t) ≥ 1e100",
            tooltipEN: "Make n(t) ≥ 1e100.",
            unlocked() { return tmp.ac.unlocks>=4 },
        },
        56: {
            name: "终于...",
            nameEN: "Finally...",
            done() { return player.b.points.gte(24) },
            tooltip: "获得24个B能量",
            tooltipEN: "Reach 24 B-Power",
            unlocked() { return hasAchievement(this.layer, 54) }
        },
        61: {
            name: "断货了?",
            nameEN: "Out of Order?",
            done() { return player.b.points.gte(26) },
            tooltip: '获得26个B能量',
            tooltipEN: "Reach 26 B-Power",
            unlocked() { return  hasAchievement(this.layer, 56) }
        },
        62: {
            name: "我猜那个不再是没用的了...",
            nameEN: "I guess this isn't useless now...",
            done() { return player.b.power.gte(1) },
            tooltip: "B<sub>01</sub> ≥ 1<br>提示: 关闭电池以获得RoA,RoB,RoC,而不是RoA<sub>p</sub>,RoB<sub>p</sub>,RoC<sub>p</sub>",
            tooltipEN: "B<sub>01</sub> ≥ 1<br>Tip: Turn off the battery to get RoA,RoB,RoC.Not RoA<sub>p</sub>,RoB<sub>p</sub>,RoC<sub>p</sub>",
            unlocked() { return tmp.goals.unlocks>=6 },
        },
        63: {
            name: "太阳系钟摆",
            nameEN: "Solar Clocks",
            done() { return player.b.power.gte(10) },
            tooltip: "B<sub>01</sub> ≥ 10",
            tooltipEN: "B<sub>01</sub> ≥ 10",
            unlocked() { return tmp.goals.unlocks>=6 },
        },
        64: {
            name: "你多nice(69)啊!",
            nameEN: "How Nice of You!",
            done() { return player.b.power.gte(69) },
            tooltip: "B<sub>01</sub> ≥ 69",
            tooltipEN: "B<sub>01</sub> ≥ 69",
            unlocked() { return tmp.goals.unlocks>=6 },
        },
        65: {
            name: "这是timewall吗?",
            nameEN: "Is this timewall?",
            done() { return player.b.time2.gte(1200) },
            tooltip: "t<sub>02</sub> ≥ 1200",
            tooltipEN: "t<sub>02</sub> ≥ 1200",
            unlocked() { return hasAchievement(this.layer, 62) },
        },
        66: {
            name: "很不幸你被卡住了,但是你获得了50%的宽恕",
            nameEN: "Stucked at 50% to Absolution",
            done() { return player.value.gte(n("1.797e308").pow(0.5)) },
            tooltip: "让 n(t) ≥ "+format(n("1.797e308").pow(0.5)),
            tooltipEN: "Make n(t) ≥ "+format(n("1.797e308").pow(0.5)),
            unlocked() { return hasAchievement(this.layer, 65) }
        },
        71: {
            name: "最leet的函数",
            done() { return false },
            tooltip: "让 n(t) ≥ "+format("1e1337")+'. 奖励: "绝对是蜜蜂笑话" 的奖励x3.6但衰减速度x2.',
            unlocked() { return false },
        },
        72: {
            name: "新社会",
            done() { return false },
            tooltip: "达到 8 IP. 奖励: IP 倍增时间速率.",
            unlocked() { return false },
        },
        73: {
            name: "没有半点用的QoL.",
            done() { return false },
            tooltip: "让进化的要求/1e100. 奖励: 降低进化要求的升级可以被自动并批量购买. 同时, 它的效果指数被IP加成.",
            unlocked() { return false },
        },
        74: {
            name: "强制赦免",
            done() { return false },
            tooltip: "获得 2 集合. 奖励: 你可以购买最大B能量, 同时B能量的折算减弱20%.",
            unlocked() { return false },
        },
        75: {
            name: "参考那个海洋电影",
            done() { return false },
            tooltip: "达到 15 C能量. 奖励: 天数可以批量获取, 一天的长度除以你的集合.",
            unlocked() { return false },
        }, 
        76: {
            name: "盐和电池",
            done() { return false },
            tooltip: "让 B<sub>102</sub> 的效果至少达到 4,795. 奖励: 你可以额外使用3个电池, 同时平方最左侧的电池效果.",
            unlocked() { return false },
        },
        81: {
            name: "你多nice(69)啊!",
            done() { return false },
            tooltip: "让 b(B) ≥ 69. 奖励: 进化级别的折算减弱50%, IP加算进B, 经过的每一天倍增自身效果0.25%.",
            unlocked() { return false },
        },
        82: {
            name: "断货了 II",
            done() { return false },
            tooltip: '让 n(t) ≥ 1e3000. 奖励: 每个该行的成就使C能量的折算延迟一个, 同时可以批量获得进化等级.',
            unlocked() { return false },
        },
        83: {
            name: "这是无穷吗?",
            done() { return false },
            tooltip: "达到 27.5 IP. 奖励: 集合倍增 b.",
            unlocked() { return false },
        },
        84: {
            name: "漂亮的成就 #420",
            done() { return false },
            tooltip: "让 n(t) ≥ 1e6969. 奖励: 加倍第二行电池效果.",
            unlocked() { return false },
        },
        85: {
            name: "我猜你是活得最充实的?",
            done() { return false },
            tooltip: "让钟至少显示 1e9:00:00. 奖励: 等下一次更新吧 ;)",
            unlocked() { return false },
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