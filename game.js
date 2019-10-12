//DEFINES: CLASSES
//GAME OBJECTS
class Pop{
	constructor(myPopID, mySocialStratum,myPartyAffiliation,myAge,myJobIndustry,myRadicalism,myResistanceToChange,myIndividualism,myPoliticalPower,myAnger,myDemands,myModifiers,myIncome,myCash,mySpendings,myHomeDist,myTendencyToVote,mySex,myIssues){
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
		this.sex = mySex;
		this.issues = myIssues;
	}
	reportID(){
		var id = this.popID;
		return id;
	}
	reportHomeDist(){
		var home = this.homeDist;
		return home;
	}
	reportStratum(){
		var stratum = this.socialStratum;
		return stratum;
	}
	reportPartyAllegiance(){
		var partyAllegiance = this.partyAffiliation;
		return partyAllegiance;
	}
	reportSex(){
		var popsex = this.sex;
		return popsex;
	}
	reportAge(){
		var popage = this.age;
		return popage;
	}
	addCash(money){
		this.cash += money;
	}
	//How this works:
	//Each party has a list of platforms it can add. Each platform adds a certain +% attraction to pops that fall on a certain range of
	//the issues of concern. For example, "Build the Wall" platform will add, say, +20% attraction to pops that have +2 (far right) on Immigration.
	//While "Instantiate Full Communism" will give +50% attraction to pops that have -2 (far left) on inequality.

	//This function will roll up some issues for the pop to care about and is run on game initialization. The issues the pop cares about
	//is weighted partially by its social stratum.
	issuesMaker(){
		var array = [];
		var choiceofissues = issuesOfConcern.length();
		var numberofissues = Math.floor(Math.random()*5); //how many issues the pop should be concerned about
		for(var n = 0; n < numberofissues; n++){
			var intensity = Math.floor(Math.random()*4);//how intensely they feel about the issue
		}
		this.issues = array;
	}
	//This function is how each pop decides on which party to vote for.
	howToVote(){
		var a = 0;
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
	reportSexes(){
		var localSexRegistry=[];
		for(var p=0;p<sexes.length;p++){
			//for every pop in district...
			var counter = 0;
			for (var d=0;d<this.popsInhabiting.length;d++){
				//...if pop reports sex 'x', look through list of sexes for 'x', then add 1 to tally for that sex
				//Poll the pop. If the pop's sex is the same as the x'th sex in the list of all sexes, add 1 to that count
				if(this.popsInhabiting[d][0].reportSex()==sexes[p]){
					counter++;
				}
			}
			localSexRegistry.push(counter);
		}
		return localSexRegistry;
	}
	reportPopPyramid(){
		//first five slots = women, last five slots = men
		var a = [0,0,0,0,0,0,0,0,0,0]
		//For every pop in this district, get the pop's age and sex. If the pop's age is between certain values, add 1 to count, then gather
		//all arrays and output one final array
		for (var n=0;n<this.popsInhabiting.length;n++){
			var age = this.popsInhabiting[n][0].reportAge();
			var sex = this.popsInhabiting[n][0].reportSex();
			if (age<18 && sex=="male"){
				a[5]++;
			}
			if (age>=18 && age<36 && sex=="male"){
				a[6]++;
			}
			if (age>=36 && age<56 && sex=="male"){
				a[7]++;
			}
			if (age>=56 && age<66 && sex=="male"){
				a[8]++;
			}
			if (age>=66 && sex=="male"){
				a[9]++;
			}
			if (age<18 && sex=="female"){
				a[0]--;
			}
			if (age>=18 && age<36 && sex=="female"){
				a[1]--;
			}
			if (age>=36 && age<56 && sex=="female"){
				a[2]--;
			}
			if (age>=56 && age<66 && sex=="female"){
				a[3]--;
			}
			if (age>=66 && sex=="female"){
				a[4]--;
			}
		}
		var popPyramidArray = [['Age', 'Male', 'Female'],['0-18 years',a[5],a[0]],['19-35 years',a[6],a[1]],['36-55 years',a[7],a[2]],['56-65 years',a[8],a[3]],['66+ years',a[9],a[4]]];
		return popPyramidArray;
	}
	reportStrata(s){
		var stratumreport = this.popsInhabiting;
		var tally=0;
		for (var v =0;v<stratumreport.length;v++){
			if(stratumreport[v][0].socialStratum==s){
				tally++;
			}
		}
		switch(s){
			case 0: return tally + " Upper-class ";
			case 1: return tally + " White-collar ";
			case 2: return tally + " Working-class ";
		}
	}
}
class Party{
	constructor(partyID){
		this.ID = partyID;
	}
}

//DEFINES: GLOBAL VARIABLES
var startingpoliticalpower = 100;
var distsDefaultColors = ["#eeccff","#8080ff","#80ffcc","#55a896","#6348f3","#9eb62c","#f7e02f"];
var playerCurrentParty = "noparty";
var partyMenuSelected = false;
var popMenuSelected = false;
//political issue arrays
//Economic issues
var inequality=[-2,-1,0,1,2];
var inflation=[-2,-1,0,1,2];
var globaltrade=[-2,-1,0,1,2];
var jobs=[-2,-1,0,1,2];
var costofliving=[-2,-1,0,1,2];
//Social issues
var welfare=[-2,-1,0,1,2];
var pensions=[-2,-1,0,1,2];
var healthcare=[-2,-1,0,1,2];
var education=[-2,-1,0,1,2];
var genderrelations=[-2,-1,0,1,2];
var racerelations=[-2,-1,0,1,2];
var immigration=[-2,-1,0,1,2];
//National Security
var crime=[-2,-1,0,1,2];
var terrorism=[-2,-1,0,1,2];
var foreignrelations=[-2,-1,0,1,2];
var military=[-2,-1,0,1,2];
//Environment
var environment=[-2,-1,0,1,2];
var climatechange=[-2,-1,0,1,2];
var transportation=[-2,-1,0,1,2];
//Misc Political
var votereform=[-2,-1,0,1,2];
var freedomofspeech=[-2,-1,0,1,2];
//Big list of them all
var issuesOfConcern = [inequality,inflation,globaltrade,jobs,costofliving,welfare,
						pensions,healthcare,education,genderrelations,racerelations,
						immigration,crime,terrorism,foreignrelations,military,
						environment,climatechange,transportation,votereform,freedomofspeech];

//issue weights for the classes. Each stratum has slightly different chances of weighting different issues
var issueWeightsForUpperClass = [0.05,0.10,0.10,0.05,0.05,0.01,0.01,0.01,0.01,0.01,0.05,0.05,0.05,0.04,0.05,0.06,0.10,0.10,0.10,0.05];
var issueWeightsForMiddleClass = [0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.0,0.05,];
var issueWeightsForLowerClass = [0.10,0.01,0.05,0.20,0.10,0.10,0.10,0.10,0.05,0.05,0.01,0.01,0.01,0.01,0.05,0.01,0.01,0.01,0.01,0.01];
//This has to be here
var startingParties = [new Party("Democratic"),new Party("Republican")];
//DEMOGRAPHICS
var districtclicked = 0;

//slot 1: upper class, slot 2: middle class, slot 3: lower-class
var pops = [25,45,15,24,38,36,77];
					//District 1
var dist = [[2,10,13],
			//District 2
			[4,14,27],
			//District 3
			[0,2,13],
			//District 4
			[1,13,10],
			//District 5
			[9,9,20],
			//District 6
			[6,21,9],
			//District 7
			[12,29,36]];
//arrays that contain the pops and districts
var globalPopulation = new Array();
var globalDistrictContainer = new Array();
//ages are 0-18, 19-35, 36-55, 56-66, 67+
var ageranges=["0-18", "19-35", "36-55", "56-66", "67+"];
var demographics = [0.15,0.25,0.30,0.20,0.10];
var sexRatio = [0.50,0.50]; //female 49%, male 51%
var sexes=["female","male"];

//POLITICAL STUFF
var partyAffiliation = ["Democratic","Republican"];
var partyColor = ['#1e60c9','#c91e1e'];
//soon to be deprecated
var partyWeightsForUpperClass = [0.3,0.7];
var partyWeightsForMiddleClass = [0.51,0.49];
var partyWeightsForLowerClass = [0.65,0.35];

//ECONOMIC STUFF
var jobIndustry = ["Agriculture", "Forestry", "Fishing", "Mining", "Construction", "Manufacturing", "Transportation", "Communications", "Electric", "Gas", "Sanitary" , "Wholesale Trade", "Retail Trade", "Finance", "Insurance", "Real Estate", "Services", "Public Administration"];
var basePopDemand =[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
var baseJobIndustryProportionOfProfitsToStratum = [[0.85, 0.1, 0.05],
							[0.7, 0.2, 0.1],
							[0.8, 0.15, 0.05],
							[0.8, 0.15, 0.05],
							[0.7, 0.15, 0.15],
							[0.6, 0.1, 0.3],
							[0.65, 0.15, 0.2],
							[0.55, 0.35, 0.1],
							[0.6, 0.2, 0.2],
							[0.5, 0.25, 0.25],
							[0.65, 0.05, 0.3],
							[0.55, 0.35, 0.1],
							[0.7, 0.15, 0.15],
							[0.8, 0.19, 0.01],
							[0.7, 0.29, 0.01],
							[0.6, 0.35, 0.15],
							[0.4, 0.3, 0.3,],
							[0.15, 0.55, 0.3]];

//GAME CODE
//INITIALIZATION
//Look through all districts. For each district, generate a new pop object for each social stratum
function generateInitialPops(){
	//Iterate through every district
	for (var i=0; i < dist.length;i++){
		//Iterate through each pop stratum in the n'th district
		//Iterate through every pop in that stratum
		for (var k=0;k<dist[i][0];k++){
			var stratum = 0;
			var uniqueid = Math.floor(Math.random()*100000)+""+(i+1) + "" + 0 + "" + k;
			var popObject = new Pop(uniqueid,stratum,randomizePartyAffiliation(stratum),randomizeAge(),randomizeJobIndustry(),randomizeGeneral(),randomizeGeneral(),randomizeGeneral(),0.01,1,1,0,0, randomizeStartingCash(stratum),0,i,randomizeGeneral(),randomizeSexes());
			globalPopulation.push(popObject);
		}
		for (var k=0;k<dist[i][1];k++){
			var stratum = 1;
			var uniqueid = Math.floor(Math.random()*100000)+""+(i+1) + "" + 1 + "" + k;
			var popObject = new Pop(uniqueid,stratum,randomizePartyAffiliation(stratum),randomizeAge(),randomizeJobIndustry(),randomizeGeneral(),randomizeGeneral(),randomizeGeneral(),0.01,1,1,0,0, randomizeStartingCash(stratum),0,i,randomizeGeneral(),randomizeSexes());
			globalPopulation.push(popObject);
		}
		for (var k=0;k<dist[i][2];k++){
			var stratum = 2;
			var uniqueid = Math.floor(Math.random()*100000)+""+(i+1) + "" + 2 + "" + k;
			var popObject = new Pop(uniqueid,stratum,randomizePartyAffiliation(stratum),randomizeAge(),randomizeJobIndustry(),randomizeGeneral(),randomizeGeneral(),randomizeGeneral(),0.01,1,1,0,0, randomizeStartingCash(stratum),0,i,randomizeGeneral(),randomizeSexes());
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
		n+=anArray[i];
		if(r<=n){
			breakout = true;
			return i;
		}
		else{
			i++;
		}
	}
}

//Randomly generate sexes
function randomizeSexes(){
	var gen = loopArray(sexRatio);
	return sexes[gen];
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
		return Math.floor(Math.random()*100+50);
	}
	if (stratum==1){
		return Math.floor(Math.random()*35+30);
	}
	if (stratum==2){
		return Math.floor(Math.random()*10+10);
	}
}
//POPUP WINDOW CONTROL
function popupwindow(n){
	closeanypopupwindow();
	var makeMyPopup = document.createElement("div");
	var makeMyPopupHeader = document.createElement("div");
	var makeCloseBox = document.createElement("div");
	var makeActionMenu = document.createElement("div");

	makeMyPopup.className = "popupwindow";
	makeMyPopup.setAttribute("id","dist"+n);
	makeMyPopup.innerHTML = "District " + n + "<br/>" + "Pops living here: " + pops[n-1] +
						"<br/>" + "<img src='oligarchpop.png' class='pop0' onclick='individualPopInfo(districtclicked-1,0)'/>" +
						 "Upper-class pops: " + dist[n-1][0] + "<br/>" + "<img src='whitecollarpop.png' class='pop1' onclick='individualPopInfo(districtclicked-1,1)'/>"
						 + "White collar pops: " + dist[n-1][1]  + "<br/>" + "<img src='workingclasspop.png' class='pop2'onclick='individualPopInfo(districtclicked-1,2)'/>"
						  + "Working class pops: " + dist[n-1][2];
	document.getElementById("main").appendChild(makeMyPopup);
	var subElement = document.createElement("div");
	subElement.setAttribute("id","piechart");
	var subElement2 = document.createElement("div");
	subElement2.setAttribute("id","popchart");

	makeMyPopupHeader.setAttribute("id","header");
	makeMyPopupHeader.onclick = dragElement(document.getElementById("dist"+n));
	makeCloseBox.setAttribute("id","xbutton");
	makeCloseBox.onclick = closeanypopupwindow;
	makeCloseBox.innerHTML = "X";

	makeActionMenu.setAttribute("id","popupwindow_actions");

	document.getElementById("dist"+n).appendChild(makeMyPopupHeader);
	document.getElementById("dist"+n).appendChild(subElement);
	document.getElementById("dist"+n).appendChild(subElement2);
	document.getElementById("dist"+n).appendChild(makeCloseBox);
	document.getElementById("dist"+n).appendChild(makeActionMenu);

	districtclicked = n;
	var datalabels = ['Party','Percentage of Vote'];
	drawChart(dataLoader(datalabels,n-1,0));
	popPyramid(globalDistrictContainer[n-1].reportPopPyramid());
}

//PARTY CONTROL MENU
function openPartyMenu(){
	if(partyMenuSelected==false){
		var makePartyMenu = document.createElement("div");
		var makeMyPopupHeader = document.createElement("div");
		var makeCloseBox = document.createElement("div");
		var makePartyMenuDesc = document.createElement("div");
		var makePartyMenuLeaders = document.createElement("div");
		var makePartyMenuPlatforms = document.createElement("div");
		var makePartyMenuModifiers = document.createElement("div");

		makePartyMenu.setAttribute("id","screen_partycontrol");
		makeMyPopupHeader.setAttribute("id","header");
		makeCloseBox.setAttribute("id","xbutton");
		makeCloseBox.innerHTML = "X";
		makePartyMenuDesc.setAttribute("id","screen_partycontrol_party_desc");
		makePartyMenuDesc.innerHTML = "Party Description";
		makePartyMenuLeaders.setAttribute("id","screen_partycontrol_party_leaders");
		makePartyMenuLeaders.innerHTML = "Party Leaders";
		makePartyMenuPlatforms.setAttribute("id","screen_partycontrol_party_platforms");
		makePartyMenuPlatforms.innerHTML = "Party Platforms";
		makePartyMenuModifiers.innerHTML = "Active Modifiers";
		makePartyMenuModifiers.setAttribute("id","screen_partycontrol_party_modifiers");

		document.getElementById("main").appendChild(makePartyMenu);
		document.getElementById("screen_partycontrol").innerHTML= playerCurrentParty + " Party" + "<br><br>" + "<img src=" + "party_" + playerCurrentParty + ".png>" + "<br>";
		document.getElementById("screen_partycontrol").appendChild(makeMyPopupHeader);

		makeMyPopupHeader.onclick = dragElement(document.getElementById("screen_partycontrol"));
		makeCloseBox.onclick = closepartywindow;

		document.getElementById("screen_partycontrol").appendChild(makeCloseBox);
		document.getElementById("screen_partycontrol").appendChild(makePartyMenuDesc);
		document.getElementById("screen_partycontrol").appendChild(makePartyMenuLeaders);
		document.getElementById("screen_partycontrol").appendChild(makePartyMenuModifiers);
		document.getElementById("screen_partycontrol").appendChild(makePartyMenuPlatforms);
		partyMenuSelected = true;
	}
}

//Menu that pops up when you click the pop icon
function individualPopInfo(n,s){
	if(popMenuSelected==false){
		var makePopMenu = document.createElement("div");
		makePopMenu.setAttribute("id","indiv_popinfo");
		makePopMenu.innerHTML = "<b>Pop info</b><br>There are " + globalDistrictContainer[n].reportStrata(s) + "pops living here.";
		var makeMyPopupHeader = document.createElement("div");
		var makeCloseBox = document.createElement("div");
		makeCloseBox.setAttribute("id","xbutton");
		makeCloseBox.innerHTML = "X";
		makeCloseBox.onclick = closepopmenu;

		document.getElementById("main").appendChild(makePopMenu);
		makeMyPopupHeader.setAttribute("id","header");
		document.getElementById("indiv_popinfo").appendChild(makeMyPopupHeader);
		makeMyPopupHeader.onclick = dragElement(document.getElementById("indiv_popinfo"));
		document.getElementById("indiv_popinfo").appendChild(makeCloseBox);
		popMenuSelected = true;
	}
}
//Popup window and menu control

function closeanypopupwindow(){
	document.querySelectorAll(".popupwindow").forEach(e => e.parentNode.removeChild(e));
}

function closepartywindow(){
	var e = document.getElementById("screen_partycontrol");
	e.parentNode.removeChild(e);
	partyMenuSelected=false;
}

function closepopmenu(){
	var e = document.getElementById("indiv_popinfo");
	e.parentNode.removeChild(e);
	popMenuSelected=false;
}


//DATA AND FORMATTING

function dataLoader(labels,n,x){
	var dataLabels=[labels];
	switch(x){
			//Counting votes
		case 0:
			var votePoller=globalDistrictContainer[n].reportVotes();
			for(var z=0;z<partyAffiliation.length;z++){
				dataLabels.push([partyAffiliation[z],votePoller[z]]);
			}
			break;
	}
	return dataLabels;
}
//Draws a pie chart of voters in the district
function drawChart(pushedArray) {
	var data = google.visualization.arrayToDataTable(pushedArray);
	var options = {
		height:220,
		pieSliceTextStyle:{fontSize:9,color:'black'},
	  pieHole: 0.4,

	  legend:{position:'none',
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

//Demographics: Population pyramid
function popPyramid(pushedArray){
	//var data = new google.visualization.DataTable();

	var dataArray = pushedArray;

	var data = google.visualization.arrayToDataTable(dataArray);
	var chart = new google.visualization.BarChart(document.getElementById('popchart'));
	var options = {
		chartArea:{
			left:90,
			top:20,
		},
		backgroundColor:'#f1f1f1',
		colors:['#fcba03','#80fc03'],
		title:'Age distribution',
		isStacked: true,
		hAxis: {
    	textPosition:'none'
		},
		vAxis: {
			  direction: -1
		},
		legend:{
			position: 'none'
		}
	};
	var formatter = new google.visualization.NumberFormat({
		pattern: ';'
	});
	formatter.format(data, 2)
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

//color the districts with the color of the party that has the highest proportion of voters
function politicalMapMode(){
	for(var i = 0; i<dist.length;i++){
		var poll = globalDistrictContainer[i].reportVotes();
		var addall = poll.reduce(sum);
		var container = [];
		for (var q=0;q<partyAffiliation.length;q++){
			container.push(poll[q]/addall);
		}
		document.getElementById(i).style.backgroundColor=partyColor[container.indexOf(Math.max(...container))];
		if(partyAffiliation[container.indexOf(Math.max(...container))]==playerCurrentParty){
				document.getElementById(i).style.outline="2px solid yellow";
		}
	}
}

function normalMapMode(){
	for(var i = 0; i<dist.length;i++){
		document.getElementById(i).style.backgroundColor=distsDefaultColors[i];
		document.getElementById(i).style.outline="";
	}
}

function sum(a,b){
	return a+b;
}

//DEBUG FUNCTIONS

function setDefaultParty(n){
	playerCurrentParty = partyAffiliation[n];
	var string = "party_"+partyAffiliation[n]+".png";
	document.getElementById("partyflag").style.backgroundImage='url('+string+')';
	console.log('party_'+partyAffiliation[n]+'.png');
}
