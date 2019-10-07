//DEFINES

var startingpoliticalpower = 100;



//DEMOGRAPHICS
var districtclicked = 0;

//slot 1: upper class, slot 2: middle class, slot 3: lower-class
var pops = [25,45,15,24,38,36,77];
var dist = [[2,10,13],
			[4,14,27],
			[0,2,13],
			[1,13,10],
			[9,9,20],
			[6,21,9],
			[12,29,36]];
//arrays that contain the pops and districts			
var globalPopulation = new Array();
var globalDistrictContainer = new Array();
//ages are 0-18, 19-35, 36-55, 56-66, 67+
var demographics = [0.15,0.25,0.30,0.20,0.10];

//POLITICAL STUFF
var partyAffiliation = ["Democrat","Republican"];
var partyColor = ["blue","red"];
var partyWeightsForUpperClass = [0.3,0.7];
var partyWeightsForMiddleClass = [0.51,0.49];
var partyWeightsForLowerClass = [0.65,0.35];

//ECONOMIC STUFF
var jobIndustry = ["Agriculture", "Forestry", "Fishing", "Mining", "Construction", "Manufacturing", "Transportation", "Communications", "Electric", "Gas", "Sanitary" , "Wholesale Trade", "Retail Trade", "Finance", "Insurance", "Real Estate", "Services", "Public Administration"];
var basePopDemand =[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
var baseJobIndustryProportionOfProfitsToStratum = [[0.05,0.1,0.85],[0.1,0.2,0.7],[0.05,0.15,0.8],[0.05,0.15,0.8],[0.15,0.15,0.70],[0.30,0.10,0.60],[0.20,0.15,0.65],[0.10,0.35,0.55],[0.20,0.20,0.60],[0.25,0.25,0.50],[0.30,0.05,0.65],[0.10,0.35,0.55],[0.15,0.15,0.70],[0.01,0.19,0.80],[0.01,0.29,0.70],[0.15,0.35,0.60],[0.30,0.30,0.40],[0.30,0.55,0.15]]

//GAME CODE
class Pop{
	constructor(myPopID, mySocialStratum,myPartyAffiliation,myAge,myJobIndustry,myRadicalism,myResistanceToChange,myIndividualism,myPoliticalPower,myAnger,myDemands,myModifiers,myIncome,myCash,mySpendings,myHomeDist,myTendencyToVote){
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
		this.demands = myDemands;
		this.modifiers=myModifiers;
		this.cash=myCash;
		this.income=myIncome;
		this.spending=mySpendings;
		this.homeDist = myHomeDist;
		this.tendencyToVote = myTendencyToVote;
	}
	reportID(){
		var id = this.popID;
		return id;
	}
	reportHomeDist(){
		var home = this.homeDist;
		return home;
	}
	reportPartyAllegiance(){
		var partyAllegiance = this.partyAffiliation;
		return partyAllegiance;
	}
	addCash(money){
		this.cash += money;
	}
}

class District{
	constructor(myDistID,myPops){
		this.districtID = myDistID;
		this.popsInhabiting = myPops;
	}
	reportID(){
		var id = this.districtID;
		return id;
	}
	reportPops(){
		var pops = this.popsInhabiting;
		return pops;
	}
	reportVotes(){
		var localPartyRegistry=[];
		for(var p=0;p<partyAffiliation.length;p++){
			//for every pop in district...
			var counter = 0;
			for (var d=0;d<this.popsInhabiting.length;d++){
				//...if pop reports party affiliation 'x', look through list of parties for 'x', then add 1 to tally for that party
				//Poll the pop. If the pop's party is the same as the x'th party in the list of all parties, add 1 to that count				
				if(this.popsInhabiting[d][0].reportPartyAllegiance()==partyAffiliation[p]){
					counter++;					
				}	
			}
			localPartyRegistry.push(counter);			
		}
		return localPartyRegistry;
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
		//Iterate through each pop stratum in the n'th district
		//Iterate through every pop in that stratum
		for (var k=0;k<dist[i][0];k++){			
			var stratum = 0;
			var uniqueid = Math.floor(Math.random()*100000)+""+(i+1) + "" + 0 + "" + k;
			var popObject = new Pop(uniqueid,stratum,randomizePartyAffiliation(stratum),randomizeAge(),randomizeJobIndustry(),randomizeGeneral(),randomizeGeneral(),randomizeGeneral(),0.01,1,1,0,0, randomizeStartingCash(stratum),0,i,randomizeGeneral());
			globalPopulation.push(popObject);
		}
		for (var k=0;k<dist[i][1];k++){			
			var stratum = 1;
			var uniqueid = Math.floor(Math.random()*100000)+""+(i+1) + "" + 1 + "" + k;
			var popObject = new Pop(uniqueid,stratum,randomizePartyAffiliation(stratum),randomizeAge(),randomizeJobIndustry(),randomizeGeneral(),randomizeGeneral(),randomizeGeneral(),0.01,1,1,0,0, randomizeStartingCash(stratum),0,i,randomizeGeneral());
			globalPopulation.push(popObject);
		}	
		for (var k=0;k<dist[i][2];k++){			
			var stratum = 2;
			var uniqueid = Math.floor(Math.random()*100000)+""+(i+1) + "" + 2 + "" + k;
			var popObject = new Pop(uniqueid,stratum,randomizePartyAffiliation(stratum),randomizeAge(),randomizeJobIndustry(),randomizeGeneral(),randomizeGeneral(),randomizeGeneral(),0.01,1,1,0,0, randomizeStartingCash(stratum),0,i,randomizeGeneral());
			globalPopulation.push(popObject);
		}						
	}
	populateDistricts();
}		
//Initialize game state with all districts assigned pops
function populateDistricts(){
	for (var n=0;n<dist.length;n++){
		//find all pops with home id equal to the district number
		var copier = [];
		for(var x=0;x<globalPopulation.length;x++){
			if (n==globalPopulation[x].reportHomeDist()){
				copier.push(globalPopulation.slice(x,x+1));
			}
		}
		var newDistrict = new District(n,copier);
		globalDistrictContainer.push(newDistrict);		
	}
	//clear it out now that the districts are populated
	globalPopulation = [];
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

//Randomly generate party affiliations for an individual pop
function randomizePartyAffiliation(stratum){
	if(stratum ==0){
		var gen = loopArray(partyWeightsForUpperClass);		
		return partyAffiliation[gen];
	}
	if(stratum ==1){
		var gen = loopArray(partyWeightsForMiddleClass);		
		return partyAffiliation[gen];
	}
	if(stratum ==2){
		var gen = loopArray(partyWeightsForLowerClass);		
		return partyAffiliation[gen];
	}
}

//Randomly generate ages for an individual pop
function randomizeAge(){
  var randomAge = loopArray(demographics);
  if (randomAge==0){
	  var thisPopsAge = Math.floor(Math.random() * Math.floor(18));
	  return thisPopsAge;
  }
  if (randomAge==1){
	  return Math.floor(Math.random() * 16) + 19;
  }
  if (randomAge==2){
	  return Math.floor(Math.random() * 19)+ 36;
  }
  if (randomAge==3){
	  return Math.floor(Math.random() * 10) + 56;
  }
  if (randomAge==4){
	  return Math.floor(Math.random() * 100) + 67;
  }
}

//Randomly generate job industry for each individual pop
function randomizeJobIndustry(){
	var x = Math.floor(Math.random()*17);
	return jobIndustry[x];	
}

//Random math
function randomizeGeneral(){
	return Math.random();
}

//Randomize cash
function randomizeStartingCash(stratum){
	if (stratum==0){
		return Math.floor(Math.random()*100);
	}
	if (stratum==1){
		return Math.floor(Math.random()*35);
	}
	if (stratum==2){
		return Math.floor(Math.random()*10);
	}
}
//POPUP WINDOW CONTROL
function popupwindow(n){
	if (districtclicked == 0){
		var makeMyPopup = document.createElement("div");
		var makeMyPopupHeader = document.createElement("div");
		var makeCloseBox = document.createElement("div");
		
		makeMyPopup.className = "popupwindow";
		makeMyPopup.setAttribute("id",n);
		makeMyPopup.innerHTML = "District " + n + "<br/>" + "Pops living here: " + pops[n-1] + "<br/>" + "<img src='oligarchpop.png'/>" + "Upper-class pops: " + dist[n-1][0] + "<br/>" + "<img src='whitecollarpop.png'/>" + "White collar pops: " + dist[n-1][1]  + "<br/>" + "<img src='workingclasspop.png'/>" + "Working-class pops: " + dist[n-1][2] ;
		document.getElementById("main").appendChild(makeMyPopup);	
		var subElement = document.createElement("div");
		subElement.setAttribute("id","piechart");
		
		makeMyPopupHeader.setAttribute("id","header");
		makeMyPopupHeader.onclick = dragElement(document.getElementById(n));
		makeCloseBox.setAttribute("id","xbutton");
		makeCloseBox.onclick = closeanypopupwindow;
		makeCloseBox.innerHTML = "X";
		document.getElementById(n).appendChild(makeMyPopupHeader);	
		document.getElementById(n).appendChild(subElement);	
		document.getElementById(n).appendChild(makeCloseBox);
		
		districtclicked = n;
		drawChart(dataLoader(n-1));
	}	
	else{
		closeanypopupwindow();
		var makeMyPopup = document.createElement("div");
		var makeMyPopupHeader = document.createElement("div");
		var makeCloseBox = document.createElement("div");
		
		makeMyPopup.className = "popupwindow";
		makeMyPopup.setAttribute("id",n);
		makeMyPopup.innerHTML = "District " + n + "<br/>" + "Pops living here: " + pops[n-1] + "<br/>" + "<img src='oligarchpop.png'/>" + "Upper-class pops: " + dist[n-1][0] + "<br/>" + "<img src='whitecollarpop.png'/>" + "White collar pops: " + dist[n-1][1]  + "<br/>" + "<img src='workingclasspop.png'/>" + "Working-class pops: " + dist[n-1][2] ;
		document.getElementById("main").appendChild(makeMyPopup);	
		var subElement = document.createElement("div");
		subElement.setAttribute("id","piechart");
		
		makeMyPopupHeader.setAttribute("id","header");
		makeMyPopupHeader.onclick = dragElement(document.getElementById(n));
		makeCloseBox.setAttribute("id","xbutton");
		makeCloseBox.onclick = closeanypopupwindow;
		makeCloseBox.innerHTML = "X";
		document.getElementById(n).appendChild(makeMyPopupHeader);	
		document.getElementById(n).appendChild(subElement);	
		document.getElementById(n).appendChild(makeCloseBox);
		
		districtclicked = n;
		drawChart(dataLoader(n-1));
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
function closeanypopupwindow(){
	document.querySelectorAll(".popupwindow").forEach(e => e.parentNode.removeChild(e));
}
//DATA AND FORMATTING

function dataLoader(n){	
	var dataLabels=[['Party','Percentage of Vote']];
	var votePoller=globalDistrictContainer[n].reportVotes();
	for(var z=0;z<partyAffiliation.length;z++){
		dataLabels.push([partyAffiliation[z],votePoller[z]]);
	}
	return dataLabels;
}

function drawChart(pushedArray) {
	var data = google.visualization.arrayToDataTable(pushedArray);
	var options = {
	  pieHole: 0.4,
	  fontsize:6,
	   pieSliceTextStyle: {
            color: 'black'
        },
	  legend:{position:'bottom',
		textstyle:{ color: '#000000',
		  fontSize: 8,
		  bold: true,
		  italic: false }
	  },
	  backgroundColor:'#f1f1f1',
	  chartArea:{
			left:30,
			top: 20,
			width: '100%'
		},	  
	};
	var chart = new google.visualization.PieChart(document.getElementById('piechart'));
	chart.draw(data, options);
}

// Make the DIV element draggable:


function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function politicalMapMode(){
	for(var i = 0; i<dist.length;i++){	
		var poll = globalDistrictContainer[n].reportVotes();
		var sum = 
		for(var x=0;x<poll.length-1;x++){
			percentages.push();
		}
		
		document.getElementByID(i).style.backgroundColor=colorpalette;
	}
}