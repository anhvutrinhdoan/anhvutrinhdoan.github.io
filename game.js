var districtclicked = 0;
var pops = [25,45,15];
var dist = [[2,10,13],
			[4,14,27],
			[0,2,13]];

var partyAffiliation = ["Democrat","Republican"];
var partyWeightsForUpperClass = [0.3,0.7];
var partyWeightsForMiddleClass = [0.52,0.48];
var partyWeightsForLowerClass = [0.7,0.3];

var jobIndustry = ["Agriculture", "Forestry", "Fishing", "Mining", "Construction", "Manufacturing", "Transportation", "Communications", "Electric", "Gas", "Sanitary" , "Wholesale Trade", "Retail Trade", "Finance", "Insurance", "Real Estate", "Services", "Public Administration"];
var basePopDemand =[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
class Pop{
	constructor(myPopID, mySocialStratum,myPartyAffiliation,myAge,myJobIndustry,myRadicalism,myResistanceToChange,myIndividualism,myPoliticalPower,myAnger,myDemands[],myModifiers[]){
		this.popID = myPopID;
		this.socialStratum = mySocialStratum;
		this.partyAffiliation = myPartyAffiliation;
		this.age = myAge;
		this.jobIndustry = myJobIndustry;
		this.radicalism = myRadicalism;
		this.resistanceToChange = myResistanceToChange;
		this.individualism = myIndividualism;
		this.politicalPower = myPoliticalPower;
		this.anger = myAnger;
		this.demands = myDemands[];
		this.modifiers=myModifiers[];
	}
}

class Party{
	constructor(partyID){
		this.ID = partyID;
	}
}
//Look through all districts. For each district, generate a new pop object for each social stratum
function generateInitialPops(){
	//Iterate through every district
	for (var i=0; i < dist.length;i++){
		//Iterate through every stratum of the district
		for (var n=0;n<2;n++){
			var stratum = n;
			var newlymadePop = new Pop(i,stratum,randomizePartyAffiliation(stratum),);
		}		
	}
}


//Looping through a weighted random array. Given weights returns the i'th entry of the array

function loopArray(anArray){
	var i=0, breakout=false, n=0, r=Math.random();
	while (breakout==false){
		n+= anArray[i];
		if(r<=n){
			breakout = true;
			return i;
		}
		else{
			i++;
		}
	}
}

//Randomly generate party affiliations
function randomizePartyAffiliation(stratum){
	if(stratum ==0){
		var gen = Math.random();
		if (gen < partyWeightsForUpperClass[0]){
			return partyAffiliation[0];
		}
		else{
			return partyAffiliation[1];
		}		
	}
	if(stratum==1){
		var gen = Math.random();
		if (gen < partyWeightsForMiddleClass[0]){
			return partyAffiliation[0];
		}
		else{
			return partyAffiliation[1];
		}	
	}
	if(stratum==2){
		var gen = Math.random();
		if (gen < partyWeightsForLowerClass[0]){
			return partyAffiliation[0];
		}
		else{
			return partyAffiliation[1];
		}
	}
}



function popupwindow(n){
	if (districtclicked == 0){
		var makeMyPopup = document.createElement("div");
		makeMyPopup.className = "popupwindow";
		makeMyPopup.setAttribute("id",n);
		makeMyPopup.innerHTML = "District " + n + "<br/>" + "Pops living here: " + pops[n-1] + "<br/>" + "<img src='oligarchpop.png'/>" + "Upper-class pops: " + dist[n-1][0] + "<br/>" + "<img src='whitecollarpop.png'/>" + "White collar pops: " + dist[n-1][1]  + "<br/>" + "<img src='workingclasspop.png'/>" + "Working-class pops: " + dist[n-1][2] ;
		document.getElementById("main").appendChild(makeMyPopup);	
		districtclicked = n;
	}	
	else{
		closepopupwindow(districtclicked);
		var makeMyPopup = document.createElement("div");
		makeMyPopup.className = "popupwindow";
		makeMyPopup.setAttribute("id",n);
		makeMyPopup.innerHTML = "District " + n + "<br/>" + "Pops living here: " + pops[n-1] + "<br/>" + "<img src='oligarchpop.png'/>" + "Upper-class pops: " + dist[n-1][0] + "<br/>" + "<img src='whitecollarpop.png'/>" + "White collar pops: " + dist[n-1][1]  + "<br/>" + "<img src='workingclasspop.png'/>" + "Working-class pops: " + dist[n-1][2] ;
		document.getElementById("main").appendChild(makeMyPopup);	
		districtclicked = n;
	}
}

function closepopupwindow(x){	
	var removeMyElement = document.getElementById(x);
	document.getElementById(x).parentElement.removeChild(removeMyElement);	
}
function closepopupwindow_main(){	
	var removeMyElement = document.getElementById(districtclicked);
	document.getElementById(districtclicked).parentElement.removeChild(removeMyElement);	
	districtclicked =0;
}
