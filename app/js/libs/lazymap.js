"use strict";

function lazyMap(settings) {

    //need settings.mapID
    //need settings.markerIconURL

    this.$map = $('#' + settings.mapId);

    if (this.$map.length > 0) {

        this.markers = [];
        this.markersObjList = [];

        this.theme = [{
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#d2d2d2"
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [{
                "visibility": "on"
            }, {
                "color": "#b3b3b3"
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#ffffff"
            }]
        }, {
            "featureType": "road.local",
            "elementType": "geometry.fill",
            "stylers": [{
                "visibility": "on"
            }, {
                "color": "#ffffff"
            }, {
                "weight": 1.8
            }]
        }, {
            "featureType": "road.local",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#d7d7d7"
            }]
        }, {
            "featureType": "poi",
            "elementType": "geometry.fill",
            "stylers": [{
                "visibility": "on"
            }, {
                "color": "#ebebeb"
            }]
        }, {
            "featureType": "administrative",
            "elementType": "geometry",
            "stylers": [{
                "color": "#a7a7a7"
            }]
        }, {
            "featureType": "road.arterial",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#ffffff"
            }]
        }, {
            "featureType": "road.arterial",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#ffffff"
            }]
        }, {
            "featureType": "landscape",
            "elementType": "geometry.fill",
            "stylers": [{
                "visibility": "on"
            }, {
                "color": "#f2f2f2"
            }]
        }, {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#696969"
            }]
        }, {
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [{
                "visibility": "on"
            }, {
                "color": "#333333"
            }]
        }, {
            "featureType": "poi",
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "poi",
            "elementType": "labels",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "road.arterial",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#d6d6d6"
            }]
        }, {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "off"
            }]
        }, {}, {
            "featureType": "poi",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#dadada"
            }]
        }]

        this.infoBoxSettings = {
            //content: '<div class="phoneytext">1111</div>',
            shadowStyle: 0,
            padding: 0,
            backgroundColor: 'rgba(0,0,0,0)',
            borderRadius: 0,
            maxWidth: 340,
            minWidth: 340,
            minHeight: 275,
            arrowSize: 0,
            borderWidth: 0,
            borderColor: 'rgba(0,0,0,0)',
            disableAutoPan: true,
            hideCloseButton: true,
            arrowPosition: 8,
            closeSrc: 'images/black-cross.png'
        }

        if (getFullScreenWidth() < 600) {
            this.infoBoxSettings.maxWidth = 240;
            this.infoBoxSettings.minWidth = 240;
            this.infoBoxSettings.minHeight = 250;
            this.infoBoxSettings.arrowPosition = 12;
        }

        this.mapSettings = {
            zoom: 12,
            center: {
                lat: 40.720,
                lng: -73.996
            },
            disableDefaultUI: true,
            styles: this.theme,
            markerIcon: settings.markerIconURL,
            googleLogoDisable: true,
            zoomControl: true
        };

        if (settings.theme) {
            this.theme = settings.theme;
        }


        this.parseCord = function(str) {
            var cords = str.split(',');

            return {
                lat: +cords[0],
                lng: +cords[1]
            };
        };



        this.initMapDataFromHtml = function() {
            if (settings.getDataFromHtml) {

                var $dataMap = $('.data-map')[0],
                    $dataMarkers = $('.data-pointmarker'),
                    mapCords = $($dataMap).attr('data-cord'),
                    mapZoom = +$($dataMap).attr('data-zoom'); // str to number
                //console.log(mapZoom, mapCords);

                if (!isNaN(mapZoom)) {
                    this.mapSettings.zoom = mapZoom;
                }

                this.mapSettings.center = this.parseCord(mapCords);


                for (var i = 0; i < $dataMarkers.length; i++) {
                    var marker = {
                        cord: this.parseCord($($dataMarkers[i]).attr('data-cord')),
                        infoboxSelector: $($dataMarkers[i]).attr('data-ifobox-selector')
                    }

                    //marker.obj = addMarker(marker.cord);
                    this.markers.push(marker);
                }
            }

        }

        this.initInfoboxes = function() {

            this.infoBoxSettings.map = this.map;

            for (var i = this.markers.length - 1; i >= 0; i--) {
                this.createInfobox(this.markers[i]);
            }

            this.$map.click(this.closeAllInfoboxes.bind(this));
        }

        this.closeAllInfoboxes = function(marker) {
            console.log('1212');
            for (var i = this.markers.length - 1; i >= 0; i--) {
                this.markers[i].infobox.close();
            }
        }

        this.createInfobox = function(marker) {

            if (marker.infoboxSelector) {

                this.infoBoxSettings.content = $(marker.infoboxSelector).html();
                this.infoBoxSettings.position = new google.maps.LatLng(marker.cord.lat, marker.cord.lng);

                var infoBox = new InfoBubble(this.infoBoxSettings);

                marker.infobox = infoBox; //position

                google.maps.event.addListener(marker.obj, 'click', function() {
                    if (marker.infobox.isOpen()) {
                        marker.infobox.close();
                    } else {
                        marker.infobox.open();
                    }
                }); //infoBox.close();
            }
        }


        this._addMarkerToMap = function(x, y) {
            var pos = {};

            if (y !== undefined) {
                pos = {
                    lat: x,
                    lng: y
                }
            } else {
                pos = x;
            }

            var marker = new google.maps.Marker({
                position: pos,
                icon: this.mapSettings.markerIcon,
                map: this.map
            });

            return marker;
        }
        this.addMarker = function(x, y) {

            var marker = {};

            marker.obj = this._addMarkerToMap(x, y);

            this.markers.push(marker);

        }

        this.addAllMarkersFromData = function() {
            for (var i = this.markers.length - 1; i >= 0; i--) {
                this.markers[i].obj = this._addMarkerToMap(this.markers[i].cord);
            }
        }

        this.removeAllMarkers = function() {
            for (var i = this.markers.length - 1; i >= 0; i--) {
                this.markers[i].obj.setMap(null);
            }
            delete this.markers;
            this.markers = [];
        }

        this.setCenter = function(x, y) {;
            this.map.setCenter({
                lat: x,
                lng: y
            });
        }

        this.mapDiv = document.getElementById(settings.mapId);

        this.initMapDataFromHtml();
        this.map = new google.maps.Map(this.mapDiv, this.mapSettings);
        this.addAllMarkersFromData();
        this.initInfoboxes();
    };
}