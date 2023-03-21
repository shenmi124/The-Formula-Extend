let modInfo = {
	name: "The Formula NG--",
	id: "formula_tree_game_NG--",
	author: "Jacorb90 / NG-- by 辉影神秘(Shinwmyste)",
	pointsName: "time",
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

	if(player.b.points.gte(1)){
		b = 't<sup>'+colorText('log<sub>3</sub>( ','#bf8f8f')+'b + 1 '+colorText( ') + 1','#bf8f8f')+'</sup>'
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

	if(player.b.points.gte(1)){
		b = format(player.points.mul(tmp.timeSpeed))+'<sup>'+colorText('log<sub>'+format(n(3))+'</sub>( ', '#bf8f8f')+format(player.b.value)+' + '+format(n(1))+colorText(' ) + '+format(n(1)),'#bf8f8f')+'</sup>'
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
    b = b.max(1)
	let f = n(n(t).pow(player.b.value.add(1).log(3).add(1).max(1))).mul(player.a.value).max(b).log(10)
	let powG = n(1)
	if(player.a2.gamma.gte(1)){
		powG = n(player.a2.valueGamma)
	}
	if(tmp.goals.unlocks>=1){
		f = n(n(t).pow(player.b.value.add(1).log(3).add(1).max(1))).mul(player.a.value).max(b).pow(player.a2.value).log(10).mul(player.a2.valueBeta)
	}
	return f.pow(powG)
}

function updateValue() {
	player.value = calculateValue(player.points.times(tmp.timeSpeed));
}

// Set your version in num and name
let VERSION = {
	num: "0.21",
	name: "No Gambling Please!",
}

let changelog = `<h1>Changelog:</h1><br><br>
	<h3>v0.21 - No Gambling Please!</h3><br>
		- Redeveloped basic contents.<br>
		- Implemented "Wheel".<br>
		- Balanced up to 20<sup>0.7</sup> Goals completed.<br>
	<br><br>
	<h3>v0.2 - Skipping is The Peak</h3><br>
		- Redeveloped basic contents.<br>
		- Implemented "Alpha Energy".<br>
		- Implemented "Glory".<br>
		- Balanced up to 17<sup>0.7</sup> Goals completed.<br>
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

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

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
	return tmp.goals.unlocks>=5
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
