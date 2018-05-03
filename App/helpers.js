var names=
[
	"Jale",
	"Ali",
	"Mahmut",
	"Mansur ",
	"Gamze",
	"Miraç",
	"Yücel",
	"Kubilay",
	"Hayati",
	"Bedriye ",
	"Birsen",
	"Serdal",
	"Bünyamin",
	"Özgür",
	"Ferdi",
	"Reyhan",
	"Ilhan",
	"Gülşah",
	"Nalan",
	"Semih",
	"Ergün",
	"Fatih",
	"Şenay",
	"Serkan",
	"Emre",
	"Bahattin",
	"Irazca",
	"Hatice",
	"Bariş",
	"Rezan",
	"Fatih",
	"Fuat",
	"Gökhan",
	"Orhan",
	"Mehmet",
	"Evren",
	"Oktay",
	"Harun",
	"Yavuz",
	"Pinar",
	"Mehmet",
	"Umut",
	"Mesude",
	"Hüseyin ",
	"Haşim ",
	"Eyyup ",
	"Mustafa",
	"Mustafa",
	"Ufuk",
	"Ahmet ",
	"Mediha",
	"Hasan",
	"Kamil",
	"Nebi",
	"Özcan",
	"Nagihan",
	"Ceren",
	"Serkan",
	"Hasan",
	"Yusuf ",
	"Çetin",
	"Tarkan",
	"Meral ",
	"Ergün",
	"Kenan ",
	"Ural",
	"Yahya",
	"Bengü",
	"Fatih ",
	"Dilek",
	"Mehmet",
	"Tufan ",
	"Mehmet",
	"Turgay ",
	"Güldehen",
	"Gökmen",
	"Bülent",
	"Erol",
	"Bahri",
	"Özen ",
	"Selma",
	"Tuğsem",
	"Teslime ",
	"Gülçin",
	"Ismail",
	"Murat",
	"Ebru",
	"Tümay",
	"Ahmet",
	"Ebru",
	"Hüseyin ",
	"Başak",
	"Ayşegül",
	"Evrim",
	"Yaser",
	"Ülkü",
	"Özhan",
	"Ufuk",
	"Aksel",
	"Fulya",
	"Burcu",
	"Taylan",
	"Yilmaz",
	"Zeynep",
	"Bayram",
	"Gülay",
	"Rabia",
	"Sevda",
	"Serhat",
	"Engin",
	"Asli",
	"Tuba",
	"Bariş",
	"Sevgi",
	"Kalender",
	"Halil",
	"Bilge",
	"Ferda",
	"Ezgi",
	"Aysun",
	"Seda",
	"Özlem",
	"Özden",
	"Koray",
	"Senem",
	"Zeynep",
	"Emel",
	"Baturay ",
	"Nuray",
	"Aydoğan",
	"Özlem",
	"Deniz",
	"Ilknur",
	"Tevfik ",
	"Hasan ",
	"Kürşat",
	"Seyfi",
	"Şeyma",
	"Özlem",
	"Ersagun",
	"Dilber",
	"Mesut",
	"Elif",
	"Muhammet ",
	"Özgür ",
	"Mehmet ",
	"Mahperi",
	"Onur",
	"Ibrahim",
	"Fatih",
	"Sevil",
	"Süheyla",
	"Volkan",
	"Ilkay",
	"Ilknur",
	"Zümrüt ",
	"Hale"
];

var users=
[
	
];

var filters=[0,0,0,0];



function addRandomUser()
{
	addUser(getRandomUser());
	
}


function addUser(user)
{	

	user.time=new Date();
	setGuid(user);
	getTimeText(user);
	users.push(user);
}

function getTimeText(user)
{
	user.timeText=
	(user.time.getDate()<10?"0"+user.time.getDate():user.time.getDate())
	+"."+
	(user.time.getMonth()<10?"0"+user.time.getMonth():user.time.getMonth())
	+"."+
	user.time.getFullYear()
	+" - "+
	(user.time.getHours()<10?"0"+user.time.getHours():user.time.getHours())
	+":"+
	(user.time.getMinutes()<10?"0"+user.time.getMinutes():user.time.getMinutes())
	+":"+
	(user.time.getSeconds()<10?"0"+user.time.getSeconds():user.time.getSeconds())
	+"."+
	(user.time.getMilliseconds()<10?"00"+user.time.getMilliseconds():
	(user.time.getMilliseconds()<100)?"0"+user.time.getMilliseconds():user.time.getMilliseconds());
}


function shuffleArray()
{
	users.sort(function(user1,user2){return 0.5 - Math.random()});
	filters=[0,0,0,0];
}

function sortArray(type,key)
{
	for(i=0;i<filters.length;i++)
	{
		if(filters[i]!=0)
		{
			if(filters[i]==1) type="desc";
			if(filters[i]==2) type="asc";
		}
	}

	if(key=="age")
	{
		if(type=="desc")
		{
			users.sort(function(user1,user2){return user2.age-user1.age});
			filters=[0,0,2,0];

		} 
		else 
		{
			users.sort(function(user1,user2){return user1.age-user2.age});
			filters=[0,0,1,0];
		}
	}
	else if(key=="name")
	{
		if(type=="desc")
		{ 
			//users.sort(function(user1,user2){return user2.name.toLowerCase()>user1.name.toLowerCase()});
			users.sort((user1, user2) => user2.name.localeCompare(user1.name));
			filters=[0,2,0,0];
		}
		else 
		{
			//users.sort(function(user1,user2){return user1.name.toLowerCase()>user2.name.toLowerCase()});
			users.sort((user1, user2) => user1.name.localeCompare(user2.name));
			filters=[0,1,0,0];
		}
		
	}
	else if(key=="guid")
	{
		if(type=="desc") 
		{
			users.sort(function(user1,user2){return user2.guid.toLowerCase()>user1.guid.toLowerCase()});
			filters=[2,0,0,0];
		}
		else
		{
			 users.sort(function(user1,user2){return user1.guid.toLowerCase()>user2.guid.toLowerCase()});
			 filters=[1,0,0,0];
		}
	}
	else if(key=="time")
	{
		if(type=="desc")
		{
			users.sort(function(user1,user2){return user2.time-user1.time});
			filters=[0,0,0,2];

		} 
		else 
		{
			users.sort(function(user1,user2){return user1.time-user2.time});
			filters=[0,0,0,1];
		}
	}
}

function getRandomUser()
{
	var user={};
	user.name=names[Math.floor(Math.random() * (names.length))];
	user.age=Math.floor(Math.random()*(51-18)+18);
	return user;
}

function setGuid(user)
{
	var guid=shuffleString(user.name)+user.age+""+
	user.time.getDate()+""+
	user.time.getMonth()+""+
	user.time.getHours()+""+
	(user.time.getFullYear()-2000)+""+
	user.time.getMinutes()+""+
	user.time.getSeconds()+""+
	user.time.getMilliseconds()+"";

	guid=guid.toLowerCase();
	guid = removeDuplitaces(guid);
	guid=normalizeChars(guid);
	if(guid.length>16) guid=guid.substring(0,15);
	var adder=16-guid.length;
	for(i=0;i<adder;i++)
	{
		guid+=String.fromCharCode(Math.floor(Math.random()*(123-97)+97));
		guid=shuffleString(guid);		
	}
	user.guid = guid;
}

function shuffleString(string)
{
	return string.split('').sort(function(){return 0.5-Math.random()}).join('');
}

function removeDuplitaces(string)
{
	return string.split('').filter(function(item,i,allitems){return i==allitems.indexOf(item);}).join('');
}

function normalizeChars(guid)
{
	var erChar="çğıöşüÇĞİÖŞÜ";
	var nwChar="cgiosuCGIOSU";
	guid=guid.split('').map(function(char)
	{
		if(char==' ') return '';
		for(i=0;i<erChar.length;i++)
		{
			if(char==erChar[i]) return nwChar[i];	
		}
		return char;
	}
	).join('');
	return guid;
}

function printUsers()
{
	var thead = document.getElementById('thead');
	thead.innerHTML="";
	
	var tr_ ="<tr>"+
	"<th>" + "Number" + "</th>" +
	"<th>" + "<a onclick='sortArray(\"asc\",\"guid\");printUsers();'"+">"+"Guid" + "</th>" +
	"<th>" + "<a onclick='sortArray(\"asc\",\"name\");printUsers();'"+">"+"Name" + "</th>" +
	"<th>" + "<a onclick='sortArray(\"asc\",\"age\");printUsers();'"+">"+"Age" + "</th>" +
	"<th>" + "<a onclick='sortArray(\"asc\",\"time\");printUsers();'"+">"+"Time" + "</th>" +
	"</tr>";
	thead.innerHTML=tr_;

	var tbody = document.getElementById('tbody');
	tbody.innerHTML="";
	for (var i = 0; i < users.length; i++) 
	{
		var tr = "<tr>";
		tr += "<td>" + (i+1) + "</td>" +
		"<td>" + users[i].guid + 
		"</td>" + "<td>" + users[i].name+
		"</td>" + "<td>" + users[i].age+ 
		"</td>" + "<td>" + users[i].timeText+ 
		"</td></tr>";
	
		tbody.innerHTML += tr;
	}
}

addRandomUser();


// function removeOddNumbers()
// {
// 	alert(numbers.includes(0));
// 	numbers=numbers.filter(function(number)
// 	{
// 		if(number%2==0 ) return number;
// 	});
// }

// function removeEvenNumbers()
// {
// 	numbers=numbers.filter(function(number)
// 	{
// 		if(number%2!=0) return number;
// 	});
// }



