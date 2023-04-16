let modInfo = {
	name: "公式树NG--",
	nameEN: "The Formula NG--",
	id: "formula_tree_game_NG--",
	author: "原版 Jacorb90  /  NG-- 辉影神秘  /  NG--英文翻译 QwQe308 ",
	authorEN: "Original by Jacorb90  /  NG-- by Shinwmyste  /  NG-- Translation by QwQe308",
	pointsName: "时间",
	modFiles: ["layers/a.js", "layers/a2.js", "layers/b.js", "layers/c.js", "layers/ro.js", "layers/goals.js", "layers/ac.js", "layers/co.js", "layers/integration.js", "layers/lag.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal(0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

function colorText(id,id2){
	return "<span style='color:"+id2+"'>"+id+"</span>"
}

function displayFormula() {
	let b = 't'
	let b2 = '1'

	let ro1 = '1'
	if(player.ro.valueA.gte(1)){
		ro1 = 'RA'
	}

	if(player.b.points.gte(1)){
		b = 't<sup>'+colorText('log<sub>3</sub>( ','#bf8f8f')+'b + '+ro1+' '+colorText( ') + 1','#bf8f8f')+'</sup>'
		b2 = 'b × 200'
	}

	let f = colorText('lg(','#77bf5f')+colorText(' Max( ','#bf8f8f')+b+" × a, "+b2+colorText(' ) ','#bf8f8f')+colorText(' )','#77bf5f')
	let m = ''
	let g3 = ''
	let f3 = ''

	let m2 = ''
	if(tmp.co.unlocks>=1){
		m2 = colorText(' × n<sub>s</sub><sup>0.5</sup>!','#77bf5f')
	}

	if(tmp.goals.unlocks>=1){
		f = colorText('lg(','#77bf5f')+colorText(' Max( ','#bf8f8f')+b+" × a, "+b2+colorText(' )<sup>exp</sup> ','#bf8f8f')+colorText(' ) ×','#77bf5f')
		m = colorText(' mul','#77bf5f')
	}

	if(player.a2.gamma.gte(1)){
		g3 = colorText('( ','#ffbf00')
		f3 = colorText(' )<sup>gamma</sup>','#ffbf00')
	}

	let co = ''
	
	if(player.value.gte(1e200)){
		co = colorText('<sup><sup>CoE</sup></sup>','#ffbf00')
	}

	f += m
	f += m2
	g3 += f
	f = g3
	f += f3
	f += co
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
		b = format(player.points.mul(tmp.timeSpeed))+'<sup>'+colorText('log<sub>'+format(n(3))+'</sub>( ', '#bf8f8f')+format(player.b.value)+' + '+format(ro1)+colorText(' ) + '+format(n(1)),'#bf8f8f')+'</sup>'
		b2 = format(player.b.value.mul(200))
	}

	let f = colorText('lg(','#77bf5f')+colorText(' Max( ','#bf8f8f')+b+" × "+format(player.a.value)+", "+format(b2)+colorText(') ','#bf8f8f')+colorText(' )','#77bf5f')
	let m = ''
	let g3 = ''
	let f3 = ''

	let m2 = ''
	if(tmp.co.unlocks>=1){
		m2 = colorText(' × '+format(player.superValue)+'<sup>'+format(n(0.5))+'</sup>!','#77bf5f')
	}

	if(tmp.goals.unlocks>=1){
		f = colorText('lg(','#77bf5f')+colorText(' Max( ','#bf8f8f')+b+" × "+format(player.a.value)+", "+format(b2)+colorText(' )<sup>'+format(player.a2.value)+'</sup> ','#bf8f8f')+colorText(' ) ×','#77bf5f')
		m = colorText(' '+format(player.a2.valueBeta),'#77bf5f')
	}

	if(player.a2.gamma.gte(1)){
		g3 = colorText('( ','#ffbf00')
		f3 = colorText(' )'+'<sup>'+format(player.a2.valueGamma)+'</sup>','#ffbf00')
	}
	
	let co = ''
	
	if(player.value.gte(1e200)){
		co = colorText('<sup><sup>'+format(player.co.effect)+'</sup></sup>','#ffbf00')
	}

	f += m
	f += m2
	g3 += f
	f = g3
	f += f3
	f += co
	return f;
}

function displayFormulaSuper() {
	let f = 'lg( <a id="points">n</a> + 10 )'
	return f;
}

function displayIntFormulaSuper() {
	let f = 'lg( <a id="points">'+format(player.value)+'</a> + '+format(n(10))+' )'
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
	return t.add(10).log(10)
}

function updateValue() {
	player.value = calculateValue(player.points.times(tmp.timeSpeed));
	player.superValue = calculateValueSuper(player.value);
}

// Set your version in num and name
let VERSION = {
	num: "0.2.5",
	name: "NG--!",
    nameEN: "NG--!"
}

let changelog = `<h1>更新日志:</h1><br>(<span style='color: red'>剧透警告</span>)<br><br>
	<h3>v0.2.5 - 新阶段!</h3><br>
		- 开发了“压缩点数”<br>
		- 平衡到53<sup>0.7</sup>成就<br>
		- 轻微加快了前期的速度<br>
		- 现在翻译会在开局时独立选择而不是使用弹窗询问<br>
		<br>
        - 翻译 - 现在在游戏内切换语言会更改页面标题了<br>
        - 翻译 - "i" 页面的翻译更好了(然后还是没多好)<br>
        - 翻译 - 添加了英文的更新日志(前边的翻译更新日志懒得补了)<br>
	<br><br>
	<h3>v0.2.4 - 电池?</h3><br>
		- 重新创建基础内容<br>
		- 完全重新制作了电池<br>
		- 平衡到40<sup>0.7</sup>成就<br>
	<br><br>
	<h3>v0.2.3 - 远离赌博!</h3><br>
		- 重新创建基础内容<br>
		- 开发了转盘<br>
		- 平衡到35<sup>0.7</sup>成就<br>
	<br><br>
	<h3>v0.2 - 跳跃即巅峰</h3><br>
		- 重新创建基础内容<br>
		- 开发了阿尔法能量<br>
		- 开发了荣耀<br>
		- 平衡到17<sup>0.7</sup>成就<br>
	<br><br>
	<h4 style='color: #00FFFF'>↑从这里开始皆为NG--的内容↑</h4>
	<br><br>
	<h3>v0.1.2 - 集合</h3><br>
		- 开发了“集合”<br>
		- 平衡到47成就<br>
	<br><br>
	<h3>v0.1.1 - 更多字母, 更有趣的游戏</h3><br>
		- 开发了C能量 & 钟<br>
		- 平衡到36成就<br>
	<br><br>
	<h3>v0.1 - 学习字母</h3><br>
		- 创建基础内容<br>
		- 开发了A能量 & 进化<br>
		- 开发了成就<br>
		- 开发了B能量和电池<br>
		- 平衡到19成就<br>`

let changelogEN = `<h1>Changelog:</h1><br>(<span style='color: red'>Spoilers Warning</span>)<br><br>
    <h3>v0.2.5 - New Stage!</h3><br>
        - Implemented Compressed Point.<br>
        - Slightly boosted early game<br>
		- Balanced up to 53<sup>0.7</sup> Goals completed.<br>
		- The language is selected only at the beginning now<br>
		<br>
        - Translation - Title translation now switches when language is changed ingame.<br>
        - Translation - Better "i" tab translation.<br>
        - Translation - English changelog is available now.<br>
        <br><br>
    <h3>v0.2.4 - Battery?</h3><br>
        - Redeveloped basic contents<br>
        - Redeveloped battery<br>
		- Balanced up to 40<sup>0.7</sup> Goals completed.<br>
    <br><br>
    <h3>v0.21 - No Gambling Please!</h3><br>
		- Redeveloped basic contents.<br>
		- Implemented "Wheel".<br>
		- Balanced up to 20<sup>0.7</sup> Goals completed.<br>
	<br><br>
	<h3>v0.2 - Sk-ipping is The Limit</h3><br>
		- Redeveloped basic contents.<br>
		- Implemented "Alpha Energy".<br>
		- Implemented "Glory".<br>
		- Balanced up to 17<sup>0.7</sup> Goals completed.<br>
	<br><br>
    <h4 style='color: #00FFFF'>↑NG-- Contents Here↑</h4>
    <br><br>
    <h3>v0.1.2 - Integrate and Weep</h3><br>
		- Implemented Integration<br>
		- Balanced up to 47 Goals completed<br>
	<br><br>
	<h3>v0.1.1 - More Letters, More Fun</h3><br>
		- Implemented C-Power & The Clock<br>
		- Balanced up to 36 Goals completed<br>
	<br><br>
	<h3>v0.1 - Learning Our Letters</h3><br>
		- Set up basic stuff.<br>
		- Implemented A-Power & Avolve<br>
		- Implemented Goals<br>
		- Implemented B-Power & Batteries<br>
		- Balanced up to 19 Goals completed<br>`

let winText = `恭喜! 你完成了这个游戏, 但是现在...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything", "fullClockUpdate", "buyMax"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return options.ch !== undefined
}

function getTimeSpeed() {
	let spd = n(0.67).mul(tmp.a2.timespeedBoost).max(0).add(player.a.valueA)
	if(tmp.ac.unlocks>=1){spd = spd.mul(2)}
	return spd;
}

function getTimeSpeedFormula() {
	let f = "0.67"
	let ad = ''
	let ac = ''
	let ac2 = ''
	if(tmp.goals.unlocks>=1){f = colorText('0.67 × Max( ','#bf8f8f')+'timewall, 0'+colorText(' )','#bf8f8f')}
	if(tmp.goals.unlocks>=2){ad = colorText(' + Avolve','#bf8f8f')}
	if(tmp.ac.unlocks>=1){
		ac = colorText('( ','#77bf5f')
		ac2 = colorText(' ) × 2','#77bf5f')
	}
	f += ad
	ac += f
	f = ac
	f += ac2
	return f;
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

// Display extra things at the top of the page
var displayThings = [
	function() {
		if(options.ch == undefined){return '<big><br>You should choose your language first<br>你需要先选择语言</big>'}
		let f = tmp.co.unlocks>=1 ? '<br><br>n<sub>s</sub>(n) = '+displayIntFormulaSuper()+' = '+format(player.superValue) : '<br><br>n(t) = '+displayIntFormula()+' = '+format(player.value)
		if(tmp.timeSpeed.eq(1)){
			return f
		}else{
			return "timespeed = "+getTimeSpeedFormula()+f
		}
	}
]

// Determines when the game "ends"
function isEndgame() {
	return tmp.ac.unlocks>=6
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
}