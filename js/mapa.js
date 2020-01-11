var map;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();

function initialize() {	
	directionsDisplay = new google.maps.DirectionsRenderer();
	var ponto01 = new google.maps.LatLng(-21.766263, -43.348350);
	var ponto02 = new google.maps.LatLng(-21.785623, -43.378693);
	var ponto03 = new google.maps.LatLng(-21.781296, -43.364583);
	var ponto04 = new google.maps.LatLng(-21.766125, -43.366797);
	var ponto05 = new google.maps.LatLng(-21.772641, -43.346625);
    
	var mapOptions = {
		zoom: 14,
		center: ponto01,
		panControl: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	

  
	
	
	// Exibir o mapa na div #mapa;
  var map = new google.maps.Map(document.getElementById("mapa"), mapOptions);
  
  // Marcador personalizado;
  
  var marcadorPersonalizado = new google.maps.Marker({
      position: ponto01,
      map: map,
      icon: 'img/marcador.png',
      title: 'Marco Zero',
      animation: google.maps.Animation.DROP
  });

  var marcadorPersonalizado = new google.maps.Marker({
	position: ponto02,
	map: map,
	icon: 'img/marcador.png',
	title: 'Marco Zero',
	animation: google.maps.Animation.DROP
});
var marcadorPersonalizado = new google.maps.Marker({
	position: ponto03,
	map: map,
	icon: 'img/marcador.png',
	title: 'Marco Zero',
	animation: google.maps.Animation.DROP
});
var marcadorPersonalizado = new google.maps.Marker({
	position: ponto04,
	map: map,
	icon: 'img/marcador.png',
	title: 'Marco Zero',
	animation: google.maps.Animation.DROP
});
var marcadorPersonalizado = new google.maps.Marker({
	position: ponto05,
	map: map,
	icon: 'img/marcador.png',
	title: 'Marco Zero',
	animation: google.maps.Animation.DROP
});


		// Exibir texto ao clicar no ícone;
		google.maps.event.addListener(marcadorPersonalizado, 'click', function() {
		infowindow.open(map,marcadorPersonalizado);
  });
  

	directionsDisplay.setMap(map);
	directionsDisplay.setPanel(document.getElementById("trajeto-texto"));
	
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function (position) {

			pontoPadrao = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			map.setCenter(pontoPadrao);
			
			var geocoder = new google.maps.Geocoder();
			var marker = new google.maps.Marker({ 
				position: pontoPadrao,
				map: map
				
				});
			geocoder.geocode({
				"location": new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
            },
            function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
			
					$("#txtEnderecoPartida").val(results[1].formatted_address);
				}
            });
		});
	}
}

initialize();

$("form").submit(function(event) {
	event.preventDefault();
	
	var enderecoPartida = $("#txtEnderecoPartida").val();
	var enderecoChegada = $("#txtEnderecoChegada").val();
	
	var request = {
		origin: enderecoPartida,
		destination: enderecoChegada,
		travelMode: google.maps.TravelMode.DRIVING
	};
	
	directionsService.route(request, function(result, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			directionsDisplay.setDirections(result);
		}
	});
});