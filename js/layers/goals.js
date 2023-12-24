let goalAchData = {
    11: {
        name: "公式无用了!",
        nameEN: "The Formula is Useless Now!",
        done() { return player.a.points.gte(1) },
        tooltip: "获得1个A能量",
        tooltipEN: "Get 1 A-Power.",
        unlocked() { return true },
    },
    12: {
        name(){return tmp.co.unlocks>=1 ? "<s>快去解锁下个阶段吧(笑)</s>,但这次你真的可以去了" : "快去解锁下个阶段吧(笑)"},
        nameEN: "Unlock Next Feature Now!(lol)",
        done() { return player.value.gte(1.2) },
        tooltip: "让 n(t) ≥ 1.2",
        tooltipEN: "Make n(t) ≥ 1.2",
        unlocked() { return hasAchievement(this.layer, 11) }
    },
    13: {
        name: "?你为什么还不进入下一个阶段",
        nameEN: "Why Don't You Unlock Next Feature?",
        done() { return player.value.gte(1.5) },
        tooltip: "让 n(t) ≥ 1.5",
        tooltipEN: "Make n(t) ≥ 1.5.",
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
        done() { return (n(tmp.a2.timespeedBoost).lte(0) && player.value.gt(0)) || (n(tmp.a2.timespeedBoost).lte(0.02) && player.value.gt(0) && tmp.ac.unlocks>=1) || tmp.ac.unlocks>=6},
        tooltip(){
            if(tmp.ac.unlocks>=6){return '免费!'}
            return tmp.ac.unlocks>=1 ? 'timewall≤0.02的情况下获得点数' : "timewall≤0的情况下获得点数"
        },
        tooltipEN(){
            if(tmp.ac.unlocks>=6){return 'Free!'}
            return tmp.ac.unlocks>=1 ? 'Gain any n(t) while timewall≤0.02.' : "Gain any n(t) while timewall≤0."
        },
        unlocked() { return tmp.goals.unlocks>=1 },
    },
    21: {
        name: "达尔文是错误的",
        nameEN: "Darwin had it wrong",
        done() { return player.a.avolve.add(player.a.avolve2).gte(2) },
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
        done() { return player.a.avolve.add(player.a.avolve2).gte(12) },
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
        tooltip: "达到 10 A能量",
        tooltipEN: "Get 10 A-Power.",
        unlocked() { return tmp.goals.unlocks>=2 },
    },
    32: {
        name: "更远的存在",
        nameEN: "Further Existence",
        done() { return player.a.avolve.add(player.a.avolve2).gte(30) },
        tooltip: "达到30级进化",
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
        tooltip: "达到 1 B能量",
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
            return "达到 2 B能量"
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
        tooltip: "获得转动1次轮盘的轮盘能量",
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
        tooltip(){return tmp.ac.unlocks>=3 ? '获得转动1次轮盘的轮盘能量' : "轮盘能量达到上限"},
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
        name: "也许你还需要一个目标",
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
        tooltip: "B<sub>01</sub> ≥ 1",
        tooltipEN: "B<sub>01</sub> ≥ 1",
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
        name(){return tmp.co.unlocks>=1 ? "这不是timewall" : "这是timewall吗?"},
        nameEN(){return tmp.co.unlocks>=1 ? "Isn't this timewall?" : "Is this timewall?"},
        done() { return tmp.co.unlocks>=1 ? player.b.time2.gte(90) : player.b.time2.gte(900) },
        tooltip(){return tmp.co.unlocks>=1 ? "t<sub>02</sub> ≥ 90" : "t<sub>02</sub> ≥ 900"},
        tooltipEN: "t<sub>02</sub> ≥ 900",
        unlocked() { return hasAchievement(this.layer, 62) },
    },
    66: {
        name: "很不幸你被卡住了,但是你获得了50%的宽恕",
        nameEN: "Stucked at 50% to Absolution",
        done() { return player.value.gte(n("1.797e308").pow(0.5)) },
        tooltip: "让 n(t) ≥ "+format(n("1.797e308").pow(0.5)),
        tooltipEN: "Make n(t) ≥ "+format(n("1.797e308").pow(0.5)),
        unlocked() { return hasAchievement(this.layer, 62) }
    },
    71: {
        name: "新社会",
        nameEN: "New Society",
        done() { return tmp.co.unlocks>=1 },
        tooltip: '到达压缩点数,一个全新的阶段!',
        tooltipEN: 'Get your points compressed, reach a new Stage!',
        unlocked() { return tmp.co.unlocks>=1 },
    },
    72: {
        name: "真实二阶段",
        nameEN: "Real Stage II",
        done() { return player.superValue.gte(1.2) },
        tooltip: "让 n<sub>s</sub>(n) ≥ 1.2",
        tooltipEN: "Make n<sub>s</sub>(n) ≥ 1.2",
        unlocked() { return tmp.co.unlocks>=1 },
    },
    73: {
        name: "欢迎回来",
        nameEN: "WWelcome Backk",
        done() { return n(tmp[this.layer].achsCompleted).add(n(tmp.ac.achsCompleted)).gte(42) },
        tooltip: "获得42<sup>0.7</sup>个目标",
        tooltipEN: "Get 42<sup>0.7</sup> Goals",
        unlocked() { return n(tmp[this.layer].achsCompleted).add(n(tmp.ac.achsCompleted)).gte(42) },
    },
    74: {
        name: "宽恕-10%",
        nameEN: "Absolution -10%",
        done() { return player.value.gte(n("1.797e308").pow(0.6)) },
        tooltip: "让 n(t) ≥ "+format(n("1.797e308").pow(0.6)),
        tooltipEN: "Make n(t) ≥ "+format(n("1.797e308").pow(0.6)),
        unlocked() { return tmp.co.unlocks>=1 },
    },
    75: {
        name: "这是第几次了?",
        nameEN: "What round is it?",
        done() { return tmp.ac.unlocks>=5 },
        tooltip: "获得特权阶级5",
        tooltipEN: "Reach Perk Tier 5",
        unlocked() { return tmp.ac.unlocks>=5 },
    }, 
    76: {
        name: "让我们再再一次突破极限",
        nameEN: "Break The li <i>mi</i> t (wait,already broken?)",
        done() { return player.ro.points.gt(700) },
        tooltip: "使轮盘能量超过700",
        tooltipEN: "Get <s>OVER-9000</s> over 700 Wheel Energy",
        unlocked() { return tmp.ac.unlocks>=5 },
    },
    81: {
        name: "盐与电池",
        nameEN: "Salt and Battery",
        done() { return player.b.power.gte(135) },
        tooltip: "让 B<sub>01</sub> ≥ 135",
        tooltipEN: "Make B<sub>01</sub> ≥ 135",
        unlocked() { return hasAchievement(this.layer, 64) },
    },
    82: {
        name: "你又丢失了5%的宽恕",
        nameEN: "Way to Absolution -5%",
        done() { return player.value.gte(n("1.797e308").pow(0.65)) },
        tooltip: "让 n(t) ≥ "+format(n("1.797e308").pow(0.65)),
        tooltipEN: "Make n(t) ≥ "+format(n("1.797e308").pow(0.65)),
        unlocked() { return hasAchievement(this.layer, 74) },
    },
    83: {
        name: "这是无穷吗?",
        nameEN: "Is this Infinity?",
        done() { return player.value.gte(n("1.797e308")) },
        tooltip: "让 n(t) ≥ "+format(n("1.797e308")),
        tooltipEN: "Make n(t) ≥ "+format(n("1.797e308")),
        unlocked() { return hasAchievement(this.layer, 82) },
    },
    84: {
        name: "双重无限",
        nameEN: "Infinity Infinities",
        done() { return player.value.gte(n("1.797e308").pow(2)) },
        tooltip: "让 n(t) ≥ "+format(n("1.797e308").pow(2)),
        tooltipEN: "Make n(t) ≥ "+format(n("1.797e308").pow(2)),
        unlocked() { return hasAchievement(this.layer, 83) },
    },
    85: {
        name: "这是最后一个吗?",
        nameEN: "Is this the last one?",
        done() { return player.value.gte(n(69).pow(69).pow(6.9)) },
        tooltip: "让 n(t) ≥ 69<sup>69<sup>6.9</sup></sup> = "+format(n(69).pow(69).pow(6.9))+'<br>你知道吗:这是原版游戏最后一个目标',
        tooltipEN: "Make n(t) ≥ 69<sup>69<sup>6.9</sup></sup> = "+format(n(69).pow(69).pow(6.9))+"<br>Do you know: It's the last goal in the original game!",
        unlocked() { return hasAchievement(this.layer, 84) },
    },
    86: {
        name: "显然不是!",
        nameEN: "Obviously NOT!",
        done() { return n(tmp[this.layer].achsCompleted).add(tmp.ac.achsCompleted).gte(52) },
        tooltip: "完成52<sup>0.7</sup>个目标!",
        tooltipEN: "Complete 52<sup>0.7</sup> Goals!",
        unlocked() { return n(tmp[this.layer].achsCompleted).add(tmp.ac.achsCompleted).gte(52) },
    },
    91: {
        name: "这是一个充满科技的目标",
        nameEN: "A cyber achevement (maybe)",
        done() { return player.value.gte('1e2077') },
        tooltip: "让 n(t) ≥ "+format(n("1e2077")),
        tooltipEN: "Make n(t) ≥ "+format(n("1e2077")),
        unlocked() { return tmp.ac.unlocks>=6 },
    },
    92: {
        name: "无极限",
        nameEN: "Limitless",
        done() { return player.value.gte('1e3333') },
        tooltip: "让 n(t) ≥ "+format(n("1e3333")),
        tooltipEN: "Make n(t) ≥ "+format(n("1e3333")),
        unlocked() { return hasAchievement(this.layer, 91) },
    },
    93: {
        name: "指数膨胀",
        nameEN: "Exponential Inflation",
        done() { return player.value.gte('1.23e4567') },
        tooltip: "让 n(t) ≥ "+format(n("1.23e4567")),
        tooltipEN: "Make n(t) ≥ "+format(n("1.23e4567")),
        unlocked() { return hasAchievement(this.layer, 92) },
    },
    94: {
        name: "何为极限值?",
        nameEN: "Where's limit?",
        done() { return player.a2.points.gte(300) },
        tooltip: "获得500阿尔法能量",
        tooltipEN: "Get 500 Alpha Energy",
        unlocked() { return hasAchievement(this.layer, 91) },
    },
    95: {
        name: "更趋向极限值...?",
        nameEN: "To the limits...?",
        done() { return player.superValue.gte(10000) },
        tooltip: "让 n<sub>s</sub>(n) ≥ "+format(n("10000")),
        tooltipEN: "... n<sub>s</sub>(n) ≥ "+format(n("10000")),
        unlocked() { return hasAchievement(this.layer, 94) },
    },
    96: {
        name: "能量溢出",
        nameEN: "Energy overflow",
        done() { return player.co.points.gte('1e150000') },
        tooltip: "获得1e250,000J",
        tooltipEN: "Produce more than 1e250,000J",
        unlocked() { return hasAchievement(this.layer, 91) },
    },
    101: {
        name: "这是有用的!",
        nameEN: "Useful one!",
        done() { return player.ro.c.gte('7500') },
        tooltip: "获得7,500RoC",
        tooltipEN: "Get 7,500 Roc",
        unlocked() { return hasAchievement(this.layer, 96) },
    },
    102: {
        name: "这也是有用的...吗?",
        nameEN: "Useful one...maybe?",
        done() { return player.ro.cPower.gte('5000') },
        tooltip: "获得5,000RoC<sub>p</sub>",
        tooltipEN: "Get 5,000 RoC<sub>p</sub>",
        unlocked() { return hasAchievement(this.layer, 96) },
    },
    103: {
        name: "这是最后一个吗?",
        nameEN: "Is this the last one?",
        done() { return player.ro.value.gte('3333') },
        tooltip: "轮盘能量生产超过3333/s",
        tooltipEN: "Have Wheel Energy Production over 3333/s",
        unlocked() { return hasAchievement(this.layer, 101) && hasAchievement(this.layer, 102)},
    },
}

function formatRows(data,AmountPerRow){
    let result = ["column",[["row",[]]]];
    let a = 0
    let currentRow = 0
    for(i in data){
        result[1][currentRow][1].push(["achievement",i])
        if(a ++ >= AmountPerRow){
            currentRow ++
            result[1].push(["row",[]])
            a = 0
        }
    }
    return result
}

addLayer("goals", {
    name: "goals",
    row: 99,
    position: 1,
    startData() { return {
        unlocked: true,
        achievements: [],
    }},
    symbol() { return options.ch ? '目标' : 'Goal' },
    tooltip() {
        return false
    },
    color: "#ddff44",
    tabFormat: [
        ["display-text", function() { return getPointsDisplay() }],
        ["display-text", function() {
            if(options.ch) return "<h3>您已经完成 <span style='color: "+tmp[this.layer].color+"; font-size: 25px;'>"+formatWhole(n(tmp[this.layer].achsCompleted).add(tmp.ac.achsCompleted))+"<sup>0.7</sup> = "+formatWhole(n(tmp[this.layer].achsCompleted).add(tmp.ac.achsCompleted).pow(0.7).floor())+"</span> 个目标</h3><br><small>(真实目标点:<span style='color: "+tmp[this.layer].color+";'>"+format(n(tmp[this.layer].achsCompleted).add(tmp.ac.achsCompleted).pow(0.7))+"</span>)<small>"
            return  "<h3>You have completed <span style='color: "+tmp[this.layer].color+"; font-size: 25px;'>"+formatWhole(n(tmp[this.layer].achsCompleted).add(tmp.ac.achsCompleted))+"<sup>0.7</sup> = "+formatWhole(n(tmp[this.layer].achsCompleted).add(tmp.ac.achsCompleted).pow(0.7).floor())+"</span> Goals</h3><br><small>(Real Goals Completed:<span style='color: "+tmp[this.layer].color+";'>"+format(n(tmp[this.layer].achsCompleted).add(tmp.ac.achsCompleted).pow(0.7))+"</span>)<small>"
        }],
        "blank", "buyables", 
        "blank", "blank", "blank",
        formatRows(goalAchData,10),
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
    layerShown(){return options.ch !== undefined},
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
                    descEN: "Unlock Spin",
                    req: 8,
                },
                {
                    desc: "解锁电池",
                    descEN: "Unlock Batteries",
                    req: 12,
                },
                {
                    desc: "解锁压缩点数",
                    descEN: "Unlock Compressed Point",
                    req: 13,
                },
                {
                    desc: "解锁元",
                    descEN: "Unlock Meta",
                    req: 18,
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
                else return "要求: "+formatWhole(data.req)+" 目标";
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
    achievements: goalAchData,
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