let modInfo = {
	name: "公式树 - 扩展",
	nameEN: "The Formula Extended",
	id: "formula_tree_game_NG--",
	author: "shinwmyste",
	pointsName: "time",
	modFiles: ["layers/layers.js", "layers/a.js", "layers/a2.js", "layers/b.js", "layers/ro.js", "layers/goals.js", "layers/ac.js", "layers/meta.js", "layers/co.js", "tree.js"],

	otherLanguageMod: true,// When on, it will ask the player to choose a language at the beginning of the game
	languageMod: true,// Use when otherLanguageMod is off, default are true -> English, false -> Chinese
	//It offers a portable way to translate, but it is not recommended

	forceOneTab: false,// Enable Single-Tab Mode ( This feature doen't work fluently as you'd imagine, it's made for expert, and if you open it, it will show 'tree-tab' page everytime you refresh the page ( ps: you can change that at save.js, line 234 ) )

	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

var colors = {
	button: {
		width: '253px',//UI Button
		height: '40px',//UI Button
		font: '30px',//UI Button
		border: '3px'//UI Button
	},
	default: {
		1: "#ffffff",//Branch color 1
		2: "#bfbfbf",//Branch color 2
		3: "#7f7f7f",//Branch color 3
		color: "#dfdfdf",
		points: "#ffffff",
		locked: "#bf8f8f",
		background: "#0f0f0f",
		background_tooltip: "rgba(0, 0, 0, 0.75)",
	},
}


function colorText(id,id2){
	let size = 16
	if(id2==0){id2 = '#dfdfdf';size = 16}
	if(id2==1){id2 = '#bf8f8f';size = 18}
	if(id2==2){id2 = '#77bf5f';size = 20}
	if(id2==3){id2 = '#ffbf00';size = 22}
	if(id2==4){id2 = '#68a4f1';size = 24}
	return "<span style='color:"+id2+"; font-size: "+size+"px;'>"+id+"</span>"
}

function maxText(id,id2,id3){
	let max = 1
	let maxID = 0
	if(id2=='max'){
		for(let i = 0;i<=max;i++){
			if(id[i+1]!==undefined){
				max++
				if(n(id[i]).gt(id[i+1])){
					maxID = i
				}else{
					maxID = (i+1)
				}
			}else{
				let a = ''
				for(let ii = 0;ii<=i;ii++){
					if(ii!==0){
						a += ', '
					}
					a += '<span style="'+(maxID==ii ? 'text-shadow: 2px 2px 2px #aaa;' : '')+'">'+id3[ii]+'</span>'
				}
				return a
			}
		}
	}
}

function getTimeSpeedFormula() {
	let f = "1.5"
	let ad = ''
	let ac = ''
	let ac2 = ''
	if(tmp.goals.unlocks>=1){
		f = '1.5 × Max( '+maxText([tmp.a2.timespeedBoost,n(0)],'max',['timewall','0'])+' )'
	}
	if(tmp.goals.unlocks>=2){ad = ' + Avolve'}
	if(tmp.ac.unlocks>=1){
		ac = colorText('( ', 1)
		ac2 = colorText(' ) × 2', 1)
	}
	f += ad
	ac += f
	f = ac
	f += ac2
	return f;
}

function displayFormula() {
	let b = 't'
	let b2 = '1'

	let ro1 = '1'
	if(player.ro.valueA.gte(1)){
		ro1 = 'RA'
	}

	if(player.b.points.gte(1)){
		b = 't<sup>'+colorText('log<sub>3</sub>('+colorText(' b + '+ro1,0) +' ) + 1', 1)+'</sup>'
		b2 = 'b × 200'
	}

	let f = colorText('lg(', 1)+' Max( '+maxText([player.points.mul(tmp.timeSpeed).pow(player.b.points.gte(1) ? (player.b.value.add(player.ro.valueA.gte(1) ? player.ro.valueA : n(1)).log(3).add(1)) : n(1)),player.b.points.gte(1) ? player.b.points.mul(200) : n(1)],'max',[b+" × a",b2])+' ) '+colorText(' )', 1)
	let m = ''
	let g3 = ''
	let f3 = ''

	let m2 = ''
	if(tmp.co.unlocks>=1){
		m2 = colorText(' × n<sub>s</sub><sup>0.5</sup>!', 1)
	}

	if(tmp.goals.unlocks>=1){
		f = colorText('lg(', 1)+' Max( '+maxText([player.points.mul(tmp.timeSpeed).pow(player.b.points.gte(1) ? (player.b.value.add(player.ro.valueA.gte(1) ? player.ro.valueA : n(1)).log(3).add(1)) : n(1)),player.b.points.gte(1) ? player.b.points.mul(200) : n(1)], 'max', [b+" × a",b2])+' )<sup>exp</sup>'+colorText(' × ', 1)
		m = colorText(' mul', 1)
	}

	if(player.a2.gamma.gte(1)){
		g3 = colorText('( ', 2)
		f3 = colorText(' )<sup>gamma</sup>', 2)
	}

	let co = ''
	let co2 = ''
	
	if(player.value.gte(1e200)){
		co = colorText('( ', 3)
		co2 = colorText(' )<sup>CoE</sup>', 3)
	}

	f += m
	f += m2
	g3 += f
	f = g3
	f += f3
	co += f
	f = co
	f += co2
	return f;
}

function displayIntFormula() {
	let b = format(player.points.mul(tmp.timeSpeed))
	let b2 = format(n(1))
	
	let ro1 = n(1)
	if(player.ro.valueA.gte(1)){
		ro1 = n(player.ro.valueA)
	}

	if(player.b.points.gte(1)){
		b = format(player.points.mul(tmp.timeSpeed))+'<sup>'+colorText('log<sub>'+format(n(3))+'</sub>('+colorText(' '+format(player.b.value)+' + '+format(ro1),0) +' ) + '+format(n(1)), 1)+'</sup>'
		b2 = format(player.b.value.mul(200))
	}

	let f = colorText('lg(',1)+' Max( '+maxText([player.points.mul(tmp.timeSpeed).pow(player.b.points.gte(1) ? (player.b.value.add(player.ro.valueA.gte(1) ? player.ro.valueA : n(1)).log(3).add(1)) : n(1)),player.b.points.gte(1) ? player.b.points.mul(200) : n(1)],'max',[b+" × "+format(player.a.value),format(b2)])+' ) '+colorText(' )',1)
	let m = ''
	let g3 = ''
	let f3 = ''

	let m2 = ''
	if(tmp.co.unlocks>=1){
		m2 = colorText(' × '+format(player.superValue)+'<sup>'+format(n(0.5))+'</sup>!',1)
	}

	if(tmp.goals.unlocks>=1){
		f = colorText('lg(',1)+' Max( '+maxText([player.points.mul(tmp.timeSpeed).pow(player.b.points.gte(1) ? (player.b.value.add(player.ro.valueA.gte(1) ? player.ro.valueA : n(1)).log(3).add(1)) : n(1)).mul(player.a.value),player.b.points.gte(1) ? player.b.points.mul(200) : n(1)], 'max', [b+" × "+format(player.a.value),format(b2)])+' )<sup>'+format(player.a2.value)+'</sup>'+colorText(' × ',1)
		m = colorText(' '+format(player.a2.valueBeta),1)
	}

	if(player.a2.gamma.gte(1)){
		g3 = colorText('( ',2)
		f3 = colorText(' )'+'<sup>'+format(player.a2.valueGamma)+'</sup>',2)
	}
	
	let co = ''
	let co2 = ''
	
	if(player.value.gte(1e200)){
		co = colorText('( ',3)
		co2 = colorText(' )<sup>'+format(player.co.effect)+'</sup>',3)
	}

	f += m
	f += m2
	g3 += f
	f = g3
	f += f3
	co += f
	f = co
	f += co2
	return f;
}

function displayFormulaSuper() {
	let f = 'lg( <a id="points">n</a> + 10 )'
	if(player.meta.buyables[31].gte(175)){
		f += ' × mul<sub>s</sub>'
	}
	return f;
}

function displayIntFormulaSuper() {
	let f = 'lg( <a id="points">'+format(player.value)+'</a> + '+format(n(10))+' )'
	if(player.meta.buyables[31].gte(175)){
		f += ' × '+format(tmp.meta.buyables[31].effectCount)
	}
	return f;
}

function n(n){
	return new Decimal(n)
}

function calculateValue(t) {
	let b = player.b.points.gte(1) ? player.b.value.mul(200) : n(1)
	let b2 = player.b.points.gte(1) ? n(t).pow(player.b.value.add(1).log(3).add(player.ro.valueA)) : n(t)
	b = b.max(1)
	let f = n(b2).mul(player.a.value).max(b).log(10)
	let powG = n(1)
	if(player.a2.gamma.gte(1)){
		powG = n(player.a2.valueGamma)
	}
	if(tmp.goals.unlocks>=1){
		f = n(b2).mul(player.a.value).max(b).pow(player.a2.value).log(10).mul(player.a2.valueBeta)
	}
	if(tmp.co.unlocks>=1){
		f = f.mul(player.superValue.pow(0.5).factorial())
	}
	return f.pow(powG).pow(player.co.effect)
}

function calculateValueSuper(t) {
	let mul = player.meta.buyables[31].gte(175) ? tmp.meta.buyables[31].effectCount : n(1)
	return t.add(10).log(10).mul(mul)
}

function updateValue() {
	player.value = calculateValue(player.points.times(tmp.timeSpeed));
	player.superValue = calculateValueSuper(player.value);
}

// Set your version in num and name
let VERSION = {
	num: "1.0",
	name: "Extend!",
    nameEN: "Extend!"
}

function changelog(){
	return (options.ch || modInfo.languageMod==false)?`
	<br><br><br><h1>更新日志:</h1><br>(不存在<span style='color: red'><s>剧透警告</s></span>)<br><br>
	<span style="font-size: 17px;">
		<h3>v1.0 - 史无前例的改动</h3><br>
			- 开发了 <spoiler>元</spoiler><br>
			- 残局现在是 <spoiler>63<sup>0.7</sup>目标</spoiler><br>
			- 修复了 <spoiler>n</spoiler> 公式显示错误的问题<br>
			- 修复了 <spoiler>荣耀</spoiler> 效果显示比实际少的问题<br>
			- 修复了 <spoiler>进化</spoiler> 可能会NaN的问题<br>
			- 修复了 <spoiler>b层级电池</spoiler> 公式错误的问题<br>
			- 修复了 <spoiler>轮盘</spoiler> 中含有中文而导致存档在 <spoiler>转动轮盘</spoiler> 前无法导出的问题<br>
			- 修复了 <spoiler>J</spoiler> 过早展示的问题<br>
			- 修复了 discord 链接文不对题的问题<br>
			- 修复了 中英文不完全或错误的问题<br>
			- 修复了 颜色不统一的问题<br>
			- 修改了 <spoiler>t</spoiler> 使其持续显示<br>
			- 修改了 <spoiler>目标</spoiler> 的UI, 并将其中文名从 <spoiler>成就</spoiler> 改为 <spoiler>目标</spoiler><br>
			- 修改了 <spoiler>荣耀</spoiler> 对于 <spoiler>轮盘</spoiler> 的奖励<br>
			- 修改了 <spoiler>b层级</spoiler> 以及 <spoiler>阿尔法能量</spoiler> 的颜色<br>
			- 修改了 <spoiler>轮盘</spoiler> 的一些细节, 并将其名字从 <spoiler>转盘</spoiler> 改为 <spoiler>轮盘</spoiler><br>
			- 修改了 后台运行机制使其后台效果更好<br>
			- 修改了 字体及其大小<br>
			- 修改了 残局页面<br>
			- 完全重置 UI,这使这棵树一点也不像树<br>
			- 完全重置 i 页面<br>
			- 完全重置 语言页面<br>
			- 完全重置 设置页面<br>
			- 添加了 <spoiler>spoiler</spoiler> , 它会挡住一些剧透的字, 比如这个 <spoiler>一些剧透的字</spoiler>, <spoiler>什么?你说这有点熟悉,反正和ducdat0507没有关系</spoiler><br>
			- 添加了 一些提示<br>
			- 添加了 Max/Min高亮显示<br>
			- 加快了前期的速度<br>
			- 游戏更名为“集合公式”<br>
			- <spoiler>我写那么多字实际上没有任何用只是为了让这次的更新看起来更加上档次内容多而已,但是这次更新的内容确实值得这么长的更新日志</spoiler>
		<br><br>
		<h4 style='color: #00FFFF'>↑从这里开始皆为集合公式的内容!↑</h4>
		<br><br>
		<h3>v0.2.5 - 新阶段!</h3><br>
			- 开发了 <spoiler>压缩点数</spoiler><br>
			- 平衡到 <spoiler>53<sup>0.7</sup>目标</spoiler><br>
			- 轻微加快了前期的速度<br>
			- 现在翻译会在开局时独立选择而不是使用弹窗询问<br>
			<br>
			- 翻译 - 现在在游戏内切换语言会更改页面标题了<br>
			- 翻译 - i 页面的翻译更好了(然后还是没多好)<br>
			- 翻译 - 添加了英文的更新日志<br>
		<br><br>
		<h3>v0.2.4 - 电池?</h3><br>
			- 重新创建基础内容<br>
			- 完全重新制作了 <spoiler>电池</spoiler><br>
			- 平衡到 <spoiler>40<sup>0.7</sup>目标</spoiler><br>
		<br><br>
		<h3>v0.2.3 - 远离赌博!</h3><br>
			- 重新创建基础内容<br>
			- 开发了<spoiler>轮盘</spoiler><br>
			- 平衡到 <spoiler>35<sup>0.7</sup>目标</spoiler><br>
		<br><br>
		<h3>v0.2 - 跳跃即巅峰</h3><br>
			- 重新创建基础内容<br>
			- 开发了 <spoiler>阿尔法能量</spoiler><br>
			- 开发了 <spoiler>荣耀</spoiler><br>
			- 平衡到 <spoiler>17<sup>0.7</sup>目标</spoiler><br>
		<br><br>
		<h4 style='color: #00FFFF'>↑从这里开始皆为NG--的内容↑</h4>
		<br><br>
		<h3>v0.1.2 - 集合</h3><br>
			- 开发了 <spoiler>集合</spoiler><br>
			- 平衡到 <spoiler>47目标</spoiler><br>
		<br><br>
		<h3>v0.1.1 - 更多字母, 更有趣的游戏</h3><br>
			- 开发了 <spoiler>C能量</spoiler> & <spoiler>钟</spoiler><br>
			- 平衡到 <spoiler>36目标</spoiler><br>
		<br><br>
		<h3>v0.1 - 学习字母</h3><br>
			- 创建基础内容<br>
			- 开发了 <spoiler>A能量</spoiler> & <spoiler>进化</spoiler><br>
			- 开发了 <spoiler>目标</spoiler><br>
			- 开发了 <spoiler>B能量</spoiler>和<spoiler>电池</spoiler><br>
			- 平衡到 <spoiler>19目标</spoiler><br>
	</span>
		`:
        //EN
		`<br><br><br><br><br><br><h1>Changelog:</h1><br>(No <span style='color: red'><s>Spoiler Warning</s></span> Anymore)<br><br>
        <h3>v1.0 - The Biggest Update Ever</h3><br>
			- Developed <spoiler>Meta</spoiler><br>
			- Endgame is now <spoiler>63<sup>0.7</sup>Goals</spoiler><br>
			- Fixed <spoiler>n</spoiler> formula issue<br>
			- Fixed <spoiler>Glory</spoiler> effect description showing less than actual<br>
			- Fixed <spoiler>Avolve</spoiler> might cause NaN<br>
			- Fixed <spoiler>battery</spoiler> formula issue<br>
			- Fixed an issue in <spoiler>Spin layer</spoiler> where cannot export before your first <spoiler>Spin</spoiler><br>
			- Fixed <spoiler>J</spoiler> displaying early<br>
			- Fixed discord link<br>
			- Fixed texts being wrong<br>
			- Fixed colors being different<br>
			- Fixed <spoiler>t</spoiler> to make it display forever<br>
			- Fixed <spoiler>Goal</spoiler>'s UI<br>
			- Fixed <spoiler>Glory</spoiler>'s bonus to <spoiler>Spin</spoiler><br>
			- Fixed <spoiler>b layer</spoiler>'s and <spoiler>Alpha Energy</spoiler>'s color<br>
			- Fixed <spoiler>Spin</spoiler> in some minor aspects, and changed its name from <spoiler>Wheel</spoiler> to <spoiler>Spin</spoiler><br>
			- Fixed Background processing and now it works better at background<br>
			- Fixed Font and font size<br>
			- Replaced Endgame Page<br>
			- Reworked UI, which makes this tree not a tree<br>
			- Reworked i Page<br>
			- Reworked Language Selecting page<br>
			- Reworked Settings page<br>
			- Added <spoiler>spoiler</spoiler>, Which covers something spoil the game, Such as <spoiler>*Spoiling Context*</spoiler>, <spoiler>What? Seems fimilar? It's from ducdat0507</spoiler>.<br>
			- Added some hints<br>
			- Added Max/Min highlight<br>
			- Speeded up early game<br>
			- Renamed Game as "The Set Formula"<br>
			- <spoiler>Those many changelogs do nothing but to make this update seems huge, but it does worth it</spoiler>
		<br><br>
		<h4 style='color: #00FFFF'>↑The Set Formula Contents Here↑</h4>
		<br><br>
        <h3>v0.2.5 - New Stage!</h3><br>
            - Implemented <spoiler>Compressed Point</spoiler>.<br>
            - Slightly boosted early game<br>
            - Balanced up to <spoiler>53<sup>0.7</sup> Goals</spoiler> completed.<br>
            - The language is selected only at the beginning now<br>
            <br>
            - Translation - Title translation now switches when language is changed ingame.<br>
            - Translation - Better "i" tab translation.<br>
            - Translation - English changelog is available now.<br>
            <br><br>
        <h3>v0.2.4 - Battery?</h3><br>
            - Redeveloped basic contents<br>
            - Redeveloped <spoiler>battery</spoiler><br>
            - Balanced up to <spoiler>40<sup>0.7</sup> Goals</spoiler> completed.<br>
        <br><br>
        <h3>v0.21 - No Gambling Please!</h3><br>
            - Redeveloped basic contents.<br>
            - Implemented <spoiler>"Wheel"</spoiler>.<br>
            - Balanced up to <spoiler>20<sup>0.7</sup> Goals</spoiler> completed.<br>
        <br><br>
        <h3>v0.2 - Leaping is The Limit</h3><br>
            - Redeveloped basic contents.<br>
            - Implemented <spoiler>"Alpha Energy"</spoiler>.<br>
            - Implemented <spoiler>"Glory"</spoiler>.<br>
            - Balanced up to <spoiler>17<sup>0.7</sup> Goals</spoiler> completed.<br>
        <br><br>
        <h4 style='color: #00FFFF'>↑NG-- Contents Here↑</h4>
        <br><br>
        <h3>v0.1.2 - Integrate and Weep</h3><br>
            - Implemented <spoiler>Integration</spoiler><br>
            - Balanced up to <spoiler>47 Goals</spoiler> completed<br>
        <br><br>
        <h3>v0.1.1 - More Letters, More Fun</h3><br>
            - Implemented <spoiler>C-Power & The Clock</spoiler><br>
            - Balanced up to <spoiler>36 Goals</spoiler> completed<br>
        <br><br>
        <h3>v0.1 - Learning Our Letters</h3><br>
            - Set up basic stuff.<br>
            - Implemented <spoiler>A-Power & Avolve</spoiler><br>
            - Implemented <spoiler>Goals</spoiler><br>
            - Implemented <spoiler>B-Power & Batteries</spoiler><br>
            - Balanced up to <spoiler>19 Goals</spoiler> completed<br>
        `
} 

function winText(){
	return (options.ch || modInfo.languageMod==false)?`你完成了游戏!`:`Congratulations! You have reached the end and beaten this game, but for now...`
}

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything", "fullClockUpdate", "buyMax"]

function getPointsDisplay(){
	let a = ''
	if(player.devSpeed && player.devSpeed != 1){
		a += options.ch ? '<br>时间加速: '+format(player.devSpeed)+'x' : '<br>Dev Speed: '+format(player.devSpeed)+'x'
	}
	if(player.offTime !== undefined){
		a += options.ch ? '<br>离线加速剩余时间: '+formatTime(player.offTime.remain) : '<br>Offline Time: '+formatTime(player.offTime.remain)
	}
	a += '<br>'
	if(tmp.co.unlocks<=0 && options.ch !== undefined){
		a += '<h2 class="overlayThing" id="points">n('+format(player.points)+''+(!tmp.timeSpeed.eq(1)?(" × "+format(tmp.timeSpeed)):"")+') = '+format(player.value)+'</h2><br>'
		a += '<span class="overlayThing" style="font-size: 20px;">n(t) = '+displayFormula()+'</span><br>'
	}
	if(tmp.co.unlocks>=1 && options.ch !== undefined){
		a += '<h2 class="overlayThing" id="points">n<sub>s</sub>('+format(player.value)+') = '+format(player.superValue)+'</h2>'
		a += '<h3 class="overlayThing" id="points"><br>n('+format(player.points)+''+(!tmp.timeSpeed.eq(1)?(" × "+format(tmp.timeSpeed)):"")+') = '+format(player.value)+'</h3><br><br>'
		a += '<span class="overlayThing" style="font-size: 20px;" v-if="tmp.co.unlocks>=1 && options.ch !== undefined">n<sub>s</sub>(n) = '+displayFormulaSuper()+'</span><br>'
	}
	a += tmp.displayThings
	a += '<br><br>'
	return a
}

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return options.ch !== undefined
}

function getTimeSpeed() {
	let spd = n(1.5).mul(tmp.a2.timespeedBoost).max(0).add(player.a.valueA)
	if(tmp.ac.unlocks>=1){spd = spd.mul(2)}
	return spd;
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	return gain
}

function gainPoints(diff) {
	player.points = player.points.add(tmp.pointGen.times(diff)).max(0)
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
	value: new Decimal(0),
	superValue: new Decimal(0),
	superPoints: new Decimal(0),
}}

function displayThingsRes(){
	let lf = ''
	if(true){lf += (options.ch? 'n(t) ' : 'n(t) ')+format(player.value)+' | '}
	if(tmp.co.unlocks>=1){lf += (options.ch? 'n<small>s</small>(n) ' : 'n<small>s</small>(n) ')+format(player.superValue)+' | '}
	if(true){lf += '<br>'}
	let l0 = ''
	if(layerDisplay('a')){l0 += (options.ch? 'A能量 ' : 'A-Power ')+format(player.a.points)+' | '}
	if(layerDisplay('a')){l0 += (options.ch? 'a ' : 'a ')+format(player.a.value)+' | '}
	if(layerDisplayTotal(['a'])){l0 += '<br>'}
	let l1 = ''
	if(layerDisplay('a2')){l1 += (options.ch? '阿尔法能量 ' : 'Alpha Energy ')+format(player.a2.points)+' | '}
	if(layerDisplay('ro')){l1 += (options.ch? '轮盘能量 ' : 'Wheel Energy ')+format(player.ro.points.max(0))+' | '}
	if(layerDisplayTotal(['a2','ro'])){l1 += '<br>'}
	let l2 = ''
	if(layerDisplay('b')){l2 += (options.ch? 'B能量 ' : 'B-Power ')+format(player.b.points)+' | '}
	if(layerDisplay('b') && tmp.goals.unlocks>=6){l2 += (options.ch? 'B<small>01</small> ' : 'B<small>01</small> ')+format(player.b.power)+' | '}
	if(layerDisplayTotal(['b'])){l2 += '<br>'}
	let l3 = ''
	if(tmp.co.unlocks>=1 && player.co.points.gt(1)){l3 += (options.ch? '压缩能量 ' : 'Compressed Energy ')+format(player.co.points)+' | '}
	if(tmp.co.unlocks>=1 && player.co.pointsO.gt(1)){l3 += (options.ch? '欧米茄能量 ' : 'Omega Energy ')+format(player.co.pointsO)+' | '}
	if(tmp.co.unlocks>=1 && (player.co.points.gt(1) || player.co.pointsO.gt(1))){l3 += '<br>'}
	let ls = ''
	if(layerDisplay('goals')){ls += (options.ch? '目标 ' : 'Goals ')+formatWhole(n(tmp.goals.achsCompleted).add(tmp.ac.achsCompleted))+"<small style='margin-top: 2px;vertical-align: top;'>0.7</small> = "+formatWhole(n(tmp.goals.achsCompleted).add(tmp.ac.achsCompleted).pow(0.7).floor())+' ('+format(n(tmp.goals.achsCompleted).add(tmp.ac.achsCompleted).pow(0.7))+') | '}
	if(layerDisplay('ac')){ls += (options.ch? '荣耀 ' : 'Glory ')+formatWhole(tmp.ac.achsCompleted)+' | '}
	if(layerDisplayTotal(['goals','ac'])){ls += '<br>'}
	return lf+l0+l1+l2+l3+ls
}

// Display extra things at the top of the page
var displayThings = [
	function() {
		if(options.ch == undefined){return '<big><br>You should choose your language first<br>你需要先选择语言</big>'}
		let f = tmp.co.unlocks>=1 ? '<br><br>n<sub>s</sub>(n) = '+displayIntFormulaSuper()+' = '+format(player.superValue) : '<br><br>n(t) = '+displayIntFormula()+' = '+format(player.value)
		return '<div class="res">'+displayThingsRes()+'</div>timespeed = '+getTimeSpeedFormula()+f+'<br><br><div class="vl2"></div></span>'
	}
]

// Determines when the game "ends"
function isEndgame() {
	return player.meta.mirrorGain.gte(100)
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
	if(oldVersion!=VERSION.num){
		options.hqTree = false
		options.ch = undefined
	}
}