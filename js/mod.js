let modInfo = {
	name: "公式树NG--",
	id: "formula_tree_game_NG--",
	author: "Jacorb90 汉化by QwQe308 NG-- by 辉影神秘(Shinwmyste)",
	pointsName: "时间",
	modFiles: ["layers/a.js", "layers/a2.js", "layers/b.js", "layers/c.js", "layers/ro.js", "layers/goals.js", "layers/ac.js", "layers/integration.js", "tree.js"],

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
	if(player.ro.a.gte(1)){
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


	if(tmp.goals.unlocks>=1){
		f = colorText('lg(','#77bf5f')+colorText(' Max( ','#bf8f8f')+b+" × a, "+b2+colorText(' )<sup>exp</sup> ','#bf8f8f')+colorText(' ) ×','#77bf5f')
		m = colorText(' mul','#77bf5f')
	}
	if(player.a2.gamma.gte(1)){
		g3 = colorText('( ','#ffbf00')
		f3 = colorText(' )<sup>gamma</sup>','#ffbf00')
	}

	f += m
	g3 += f
	f = g3
	f += f3
	return f;
}

function displayIntFormula() {
	let b = format(player.points.mul(tmp.timeSpeed))
	let b2 = format(n(1))
	
	let ro1 = n(1)
	if(player.ro.a.gte(1)){
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

	if(tmp.goals.unlocks>=1){
		f = colorText('lg(','#77bf5f')+colorText(' Max( ','#bf8f8f')+b+" × "+format(player.a.value)+", "+format(b2)+colorText(' )<sup>'+format(player.a2.value)+'</sup> ','#bf8f8f')+colorText(' ) ×','#77bf5f')
		m = colorText(' '+format(player.a2.valueBeta),'#77bf5f')
	}
	if(player.a2.gamma.gte(1)){
		g3 = colorText('( ','#ffbf00')
		f3 = colorText(' )'+'<sup>'+format(player.a2.valueGamma)+'</sup>','#ffbf00')
	}
	
	f += m
	g3 += f
	f = g3
	f += f3
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
	return f.pow(powG)
}

function updateValue() {
	player.value = calculateValue(player.points.times(tmp.timeSpeed));
}

// Set your version in num and name
let VERSION = {
	num: "0.22",
	name: "远离赌博!",
}

let changelog = `<h1>Changelog:</h1><br><br>
	<h3>v0.22 - 远离赌博!</h3><br>
		- 重新创建基础内容<br>
		- 开发了转盘<br>
		- 平衡到29<sup>0.7</sup>成就<br>
	<br><br>
	<h3>v0.2 - 跳跃即巅峰</h3><br>
		- 重新创建基础内容<br>
		- 开发了阿尔法能量<br>
		- 开发了荣耀<br>
		- 平衡到17<sup>0.7</sup>成就<br>
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

let winText = `恭喜! 你完成了这个游戏, 但是现在...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything", "fullClockUpdate", "buyMax"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

function getTimeSpeed() {
	let spd = n(0.5).mul(tmp.a2.timespeedBoost).max(0).add(player.a.valueA)
	if(tmp.ac.unlocks>=1){spd = spd.mul(2)}
	return spd;
}

function getTimeSpeedFormula() {
	let f = "0.5"
	let ad = ''
	let ac = ''
	let ac2 = ''
	if(tmp.goals.unlocks>=1){f = colorText('0.5 × Max( ','#bf8f8f')+'timewall, 0'+colorText(' )','#bf8f8f')}
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
}}

// Display extra things at the top of the page
var displayThings = [
	function() {
		if (tmp.timeSpeed.eq(1)) return '<br><br>n(t) = '+displayIntFormula()+' = '+format(player.value);
		else return "timespeed = "+getTimeSpeedFormula()+'<br><br>n(t) = '+displayIntFormula()+' = '+format(player.value);
	}
]

// Determines when the game "ends"
function isEndgame() {
	return tmp.goals.unlocks>=5 && tmp.ac.unlocks>=3
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