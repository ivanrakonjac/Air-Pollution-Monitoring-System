	//Firebase configuration
	var firebaseConfig = {
	apiKey: "",
	authDomain: "",
	databaseURL: "",
	projectId: "",
	storageBucket: "",
	messagingSenderId: "",
	appId: "",
	measurementId: ""
	};

	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);

	var database = firebase.database();
    var ref = database.ref('merenja');
    var keys;
   	var merenja;

    ref.on("value", function(snapshot) {
	    merenja = snapshot.val();
	    keys = Object.keys(merenja);
	 	
	 	initMap();
	    
   	}, function (error) {
	   console.log("Error: " + error.code);
	});

	function initMap() {

		if(keys==undefined) return;

		//Map options
		var options = {
			zoom:14,
			center:{lat:44.797250, lng:20.474228}
		};

		//New map
		var map = new google.maps.Map(document.getElementById("map"), options);

		for (var i = 0; i < keys.length; i++) {
		   	var k = keys[i];
		   	var id = merenja[k].id;
		   	var name = merenja[k].name;
		   	var lat = merenja[k].lat;
		   	var lng = merenja[k].lng;
		   	var pm10 = merenja[k].vrednostPM10;
		   	var pm2 = merenja[k].vrednostPM2;
		   	var so2 = merenja[k].vrednostSO2;
		   	var no2 = merenja[k].vrednostNO2;
		   	var co = merenja[k].vrednostCO;
		   	var o3 = merenja[k].vrednostO3;
		   	var vremeMerenja = merenja[k].vremeMerenja;


		   	//Za podesavanje boje <p> text u zavisnosti od vrednosti parametra

		   	var brPodataka = pm10.length - 1;

		   	var dobar="style=color:green;";
			var zagadjen="style=color:red;";

		   	var pm10Color=""; var pm2Color="";

		   	if(pm10[brPodataka]<60){pm10Color=dobar;}else{pm10Color=zagadjen;}
		   	if(pm2[brPodataka]<30){pm2Color=dobar;}else{pm2Color=zagadjen;} 
		   	if(so2[brPodataka]<350){so2Color=dobar;}else{so2Color=zagadjen;}
		   	if(no2[brPodataka]<150){no2Color=dobar;}else{no2Color=zagadjen;}
		   	if(co[brPodataka]<100){coColor=dobar;}else{coColor=zagadjen;}
		   	if(co[brPodataka]<100){coColor=dobar;}else{coColor=zagadjen;}
		   	if(o3[brPodataka]<180){o3Color=dobar;}else{o3Color=zagadjen;}


			addMarker({
				id: id,
				coords:{lat:lat, lng:lng},
				data:   "<h4 class=text-center>" + name + "</h4><b>" +
						"<h5 class=text-center> Vreme: " + vremeMerenja[brPodataka] + " h<h5>" + 
						"<p " + pm10Color + ">PM-10: " + pm10[brPodataka] +" μg/m3</p>" +
						"<p " + pm2Color + ">PM-2: " + pm2[brPodataka] + " μg/m3</p>" +
						"<p " + so2Color + ">SO2: " + so2[brPodataka] + " μg/m3</p>" +
						"<p " + no2Color + ">NO2: " + no2[brPodataka] + " μg/m3</p>" +
						"<p " + coColor + ">CO: " + co[brPodataka] + " μg/m3</p>" +
						"<p " + o3Color + ">O3: " + o3[brPodataka] + " μg/m3</p></b>",
				pm10: pm10,
				pm2: pm2,
				so2: so2,
				no2: no2,
				co: co,
				o3: o3,
				vremeMerenja: vremeMerenja
			});

			console.log(k + " " + id + " " + pm10[brPodataka] + " Gotov " + i);

		}  	
		

		//Add marker function
		function addMarker(props) {
			
			var marker = new google.maps.Marker({
				id: props.id,
				icon: {
			        path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
			        strokeColor: 'red',
			        scale: 5
			    },
				position: props.coords,
				map: map	
			});

			if(props.data){
				var infoWindow = new google.maps.InfoWindow({
					content: props.data 
				});

				marker.addListener('click',function(){
					infoWindow.open(map,marker);
					drawChart(props.pm10,props.pm2,props.vremeMerenja);
					drawLineChart(props.so2,props.no2,props.co,props.o3,props.vremeMerenja);
				});
			}
		}

	}