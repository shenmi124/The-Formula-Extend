addLayer("goals", {
    name: "goals",
    image: "resources/goal.png",
    row: "side",
    position: 1,
    startData() { return {
        unlocked: true,
        achievements: [],
    }},
    tooltip() { return "您已经完成 "+formatWhole(n(tmp[this.layer].achsCompleted).add(tmp.ac.achsCompleted))+"<sup>0.7</sup> = "+formatWhole(n(tmp[this.layer].achsCompleted).add(tmp.ac.achsCompleted).pow(0.7).floor())+" 个成就"},
    color: "#cbff3b",
    tabFormat: [
        "blank",
        ["display-text", function() { return "<h3>您已经完成 <span style='color: "+tmp[this.layer].color+"; font-size: 25px;'>"+formatWhole(n(tmp[this.layer].achsCompleted).add(tmp.ac.achsCompleted))+"<sup>0.7</sup> = "+formatWhole(n(tmp[this.layer].achsCompleted).add(tmp.ac.achsCompleted).pow(0.7).floor())+"</span> 个成就</h3><br><small>(真实成就点:<span style='color: "+tmp[this.layer].color+";'>"+format(n(tmp[this.layer].achsCompleted).add(tmp.ac.achsCompleted).pow(0.7))+"</span>)<small>" }],
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
                    req: 2,
                },
                {
                    desc: "解锁进化.",
                    req: 3,
                },
                {
                    desc: "解锁荣耀.",
                    req: 5,
                },
                {
                    desc: "解锁B能量",
                    req: 7,
                },
                {
                    desc: "解锁电池",
                    req: 12,
                },
                {
                    desc: "解锁C能量",
                    req: 19,
                },
                {
                    desc: "解锁钟",
                    req: 27,
                },
                {
                    desc: "解锁集合",
                    req: 37,
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
                else return "要求: "+formatWhole(data.req)+" 成就";
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
            done() { return player.a.points.gte(1) },
            tooltip: "获得1个A能量",
            unlocked() { return true },
        },
        12: {
            name: "快去解锁下个阶段吧(笑)",
            done() { return player.value.gte(1) },
            tooltip: "让 n(t) ≥ 1",
            unlocked() { return hasAchievement(this.layer, 11) }
        },
        13: {
            name: "?你为什么还不进入下一个阶段",
            done() { return player.value.gte(1.2) },
            tooltip: "让 n(t) ≥ 1.2",
            unlocked() { return hasAchievement(this.layer, 12) }
        },
        14: {
            name: "新能源",
            done() { return player.a.points.gte(2) },
            tooltip: "获得第二个A能量",
            unlocked() { return hasAchievement(this.layer, 11) },
        },
        15: {
            name: "趋向极限值!",
            done() { return n(getTimeSpeed()).eq(0) || (player.a2.points.gte(5) && tmp.ac.unlocks>=1) },
            tooltip(){return tmp.ac.unlocks>=1 ? '获得5阿尔法能量' : "使timespeed为0"},
            unlocked() { return tmp.goals.unlocks>=1 },
        },
        16: {
            name: "点数在哪?",
            done() { return (n(tmp.a2.timespeedBoost).lte(0) && player.value.gt(0)) || (n(tmp.a2.timespeedBoost).lte(0.02) && player.value.gt(0) && tmp.ac.unlocks>=1)},
            tooltip(){
                return tmp.ac.unlocks>=1 ? 'timewall≤0.02的情况下获得点数' : "timewall≤0的情况下获得点数"
            },
            unlocked() { return tmp.goals.unlocks>=1 },
        },
        21: {
            name: "达尔文是错误的",
            done() { return player.a.avolve.gte(2) },
            tooltip: "达到2级进化",
            unlocked() { return tmp.goals.unlocks>=2 },
        },
        22: {
            name: "你应该发现了",
            done() { return player.a2.gamma.gte(1) },
            tooltip: "获得γ",
            unlocked() { return player.a2.gamma.gte(1) || hasAchievement(this.layer, 22) }
        },
        23: {
            name: "达尔文又正确了",
            done() { return player.a.avolve.gte(12) },
            tooltip: "达到12级进化",
            unlocked() { return hasAchievement(this.layer, 21) },
        },
        24: {
            name: "突破极限",
            done() { return player.a2.points.gte(6) },
            tooltip: "获得6阿尔法能量",
            unlocked() { return tmp.goals.unlocks>=2 },
        },
        25: {
            name: "我赌你获得不了这个.",
            done() { return tmp.goals.unlocks>=3 && tmp.ac.unlocks>=1 },
            tooltip: "解锁并到达1荣耀",
            unlocked() { return tmp.goals.unlocks>=3 },
        },
        26: {
            name: "欢迎回来",
            done() { return tmp.goals.unlocks>=3 && tmp.ac.unlocks>=1 },
            tooltip: "重新解锁荣耀",
            unlocked() { return hasAchievement(this.layer, 25) },
        },
        31: {
            name: "再获加速",
            done() { return player.a.points.gte(10) },
            tooltip: "达到 10 A能量.",
            unlocked() { return tmp.goals.unlocks>=2 },
        },
        32: {
            name: "更远的存在",
            done() { return player.a.avolve.gte(30) },
            tooltip: "达到30级进化.",
            unlocked() { return tmp.goals.unlocks>=2 },
        },
        33: {
            name: "更趋向极限值!",
            done() { return player.value.gte(10000) },
            tooltip: "让 n(t) ≥ 10,000.",
            unlocked() { return tmp.ac.unlocks>=2 },
        },
        34: {
            name: "亿的六次方? 亿的七次方? 记不清了...",
            done() { return false },
            tooltip: "让 n(t) ≥ 1e27. 奖励: 解锁一些新的电池，你可以同时使用两个电池.",
            unlocked() { return false },
        },
        35: {
            name: "我强大么?",
            done() { return false },
            tooltip: "达到 300 A能量. 奖励: B能量的底数/2.",
            unlocked() { return false }
        },
        36: {
            name: "绝对是蜜蜂笑话",
            done() { return false },
            tooltip() { 
                return "达到 10 B能量. 奖励: 时间快 "+format(tmp.goals.goal36power.times(5))+"x , 但在大于 "+format(Decimal.div(10, tmp.goals.goal36decayrate))+" 秒时变慢.<br>当前: "+format(tmp.goals.goal36eff)+"x" 
            },
            unlocked() { return false },
        },
        41: {
            name: "次无限之和",
            done() { return false },
            tooltip: "让 n(t) ≥ 1e40 & a(A) ≥ 698,000,000. 奖励: A能量底数-0.05.",
            unlocked() { return false }
        },
        42: {
            name: "参考那个蜜蜂电影",
            done() { return false },
            tooltip: '达到 15 B能量. 奖励: "绝对是蜜蜂笑话" 的效果x2 & 效果减弱速率/4.',
            unlocked() { return false },
        },
        43: {
            name: "未充能",
            done() { return false },
            tooltip: "在不使用任何电池的情况下让 n(t) ≥ 1e75. 奖励: 你可以额外激活一个电池.",
            unlocked() { return false },
        },
        44: {
            name: "我感觉像是在赌博",
            done() { return false },
            tooltip: "达到 888 A能量. 奖励: B能量对A能量效果的加成改完乘以而不是相加.",
            unlocked() { return false },
        },
        45: {
            name: "如果大数只是一个游戏内容...",
            done() { return false },
            tooltip: "让 n(t) ≥ 1e100. 奖励: 第二行电池有自己独特的效果.",
            unlocked() { return false },
        },
        46: {
            name: "啊我明白了",
            done() { return false },
            tooltip: "达到 4 C能量. 奖励: 三倍化 <span style='font-size: 17.5px;'>c</span> 在 n(t) 里的效果.",
            unlocked() { return false },
        },
        51: {
            name: "这仍然没有哪怕半点作用",
            done() { return false },
            tooltip: "让进化要求/300,000. 奖励: 该升级的效果指数加上已完成的成就数.",
            unlocked() { return false },
        },
        52: {
            name: "哇那是成吨的伤害!",
            done() { return false },
            tooltip: "达到 2,000 A能量. 奖励: 你可以自动获取 A能量, 同时它的获取底数-0.05.",
            unlocked() { return false }
        },
        53: {
            name: "20%的宽恕(注:要求是1.80e308^(1-20%))",
            done() { return false },
            tooltip() { return "让 n(t) ≥ "+format(Math.pow(Number.MAX_VALUE, 0.8))+". 奖励: 你可以额外开启一个电池, 同时第三排电池也有自己独特的效果了." },
            unlocked() { return false },
        },
        54: {
            name: "疯狂-B",
            done() { return false },
            tooltip: '让 a(A) ≥ 1.5e17. 奖励: 进化的折算延迟25级, 同时 "绝对是蜜蜂笑话" 的效果x3,削减速度/10.',
            unlocked() { return false },
        },
        55: {
            name: "巴斯光年是一个远见者",
            done() { return false },
            tooltip: "让 n(t) ≥ "+format(Number.MAX_VALUE)+".",
            unlocked() { return false },
        },
        56: {
            name: "真正的一日",
            done() { return false },
            tooltip: "让钟表显示24:00:00及以上. 奖励: 一天的长度/2.",
            unlocked() { return false }
        },
        61: {
            name: "断货了?",
            done() { return false },
            tooltip: '达到 30 B能量 & 7 C能量. 奖励: 每个钟中的一天会使其自身效果+0.1 (不随时间削减).',
            unlocked() { return false }
        },
        62: {
            name: "回来拿这个成就了?",
            done() { return false },
            tooltip: "达到进化等级 308. 奖励: 时间速率x2, 同时 <span style='font-size: 17.5px;'>a</span> 的对数加算到 n(t) 中的 <span style='font-size: 17.5px;'>t</span> 的指数里.",
            unlocked() { return false },
        },
        63: {
            name: "太阳系钟摆",
            done() { return layers.c.clockRatio().times(tmp.c.hoursPerDay).gte(2) && tmp.b.usedBatteries==0 },
            tooltip: "在不激活电池的情况下让钟显示2:00:00. 奖励: 一天的长度/2, 天数不再衰减, 当一天过去时, 钟不会重置.",
            unlocked() { return hasAchievement("goals", 56) },
        },
        64: {
            name: "额，加拿大人?",
            done() { return player.a.points.gte(105e3) },
            tooltip: "达到 105,000 A能量. 奖励: <span style='font-size: 17.5px;'>c</span> 加算到 b(B).",
            unlocked() { return hasAchievement("goals", 62) && tmp.goals.unlocks>=4 },
        },
        65: {
            name: "我猜那个不再是没用的了...",
            done() { return false },
            tooltip: "让进化的需求/1e55. 奖励: 这个升级的等级加算到这个升级的指数中, A能量以更强的公式加成a(A), 双倍化时间速率.",
            unlocked() { return hasAchievement("goals", 56) && hasAchievement("goals", 62) },
        },
        66: {
            name: "真正的一年",
            done() { return tmp.c.clockRatio.times(tmp.c.hoursPerDay).gte(8765.76) },
            tooltip: "让钟至少显示 8,765:45:36. 奖励: 成就倍增时间速率, 但时间速率/4. 同时, 一天的长度又又被减半了.",
            unlocked() { return hasAchievement("goals", 56)}
        },
        71: {
            name: "最leet的函数(注:leet是黑客语言,对应1337)",
            done() { return player.value.gte("1e1337") },
            tooltip: "让 n(t) ≥ "+format("1e1337")+'. 奖励: "绝对是蜜蜂笑话" 的奖励x3.6但衰减速度x2.',
            unlocked() { return hasAchievement("goals", 55) && hasAchievement("goals", 64) },
        },
        72: {
            name: "新社会",
            done() { return player.int.value.gte(8) },
            tooltip: "达到 8 IP. 奖励: IP 倍增时间速率.",
            unlocked() { return hasAchievement("goals", 61) && player.int.unlocked },
        },
        73: {
            name: "没有半点用的QoL.",
            done() { return false },
            tooltip: "让进化的要求/1e100. 奖励: 降低进化要求的升级可以被自动并批量购买. 同时, 它的效果指数被IP加成.",
            unlocked() { return hasAchievement("goals", 65) && player.int.unlocked },
        },
        74: {
            name: "强制赦免",
            done() { return player.int.points.gte(2) },
            tooltip: "获得 2 集合. 奖励: 你可以购买最大B能量, 同时B能量的折算减弱20%.",
            unlocked() { return hasAchievement("goals", 71) && player.int.unlocked },
        },
        75: {
            name: "参考那个海洋电影",
            done() { return player.c.points.gte(15) },
            tooltip: "达到 15 C能量. 奖励: 天数可以批量获取, 一天的长度除以你的集合.",
            unlocked() { return hasAchievement("goals", 66) && player.int.unlocked },
        }, 
        76: {
            name: "盐和电池",
            done() { return gridEffect("b", 102).gte(4795) },
            tooltip: "让 B<sub>102</sub> 的效果至少达到 4,795. 奖励: 你可以额外使用3个电池, 同时平方最左侧的电池效果.",
            unlocked() { return hasAchievement("goals", 72) },
        },
        81: {
            name: "你多nice(69)啊!",
            done() { return player.b.value.gte(69) },
            tooltip: "让 b(B) ≥ 69. 奖励: 进化级别的折算减弱50%, IP加算进B, 经过的每一天倍增自身效果0.25%.",
            unlocked() { return hasAchievement("goals", 73) },
        },
        82: {
            name: "断货了 II",
            done() { return player.value.gte("1e3000") },
            tooltip: '让 n(t) ≥ 1e3000. 奖励: 每个该行的成就使C能量的折算延迟一个, 同时可以批量获得进化等级.',
            unlocked() { return hasAchievement("goals", 55) && hasAchievement("goals", 64) },
        },
        83: {
            name: "这是无穷吗?",
            done() { return player.int.value.gte(27.5) },
            tooltip: "达到 27.5 IP. 奖励: 集合倍增 b.",
            unlocked() { return hasAchievement("goals", 72) },
        },
        84: {
            name: "漂亮的成就 #420",
            done() { return player.value.gte("1e6969") },
            tooltip: "让 n(t) ≥ 1e6969. 奖励: 加倍第二行电池效果.",
            unlocked() { return hasAchievement("goals", 76) },
        },
        85: {
            name: "我猜你是活得最充实的?",
            done() { return tmp.c.clockRatio.times(tmp.c.hoursPerDay).gte(1e9) },
            tooltip: "让钟至少显示 1e9:00:00. 奖励: 等下一次更新吧 ;)",
            unlocked() { return hasAchievement("goals", 81) },
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