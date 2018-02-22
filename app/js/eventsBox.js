function initEventsBox() {
    if ($('.events').length > 0) {
        $('.event-location-link').click(openEventsBox);
        $('.close-map').click(closeEventsBox);
    }

    $('#map').width($('.event-item').innerWidth() * 1.72);
}

function openEventsBox() {
    var item = $(this).parents('.event-item'),
        map = $('#map'),
        x, y, zoom,
        mapContainer, height, width;
    closeEventsBox();
    $(this).parents('.events-coll').addClass('active-coll');
    $('.event-item', '.active-coll').hide();
    $('.events-slider').addClass('event-opened');
    item.addClass('opened');
    item.show();
    x = +item.attr('data-cordX');
    y = +item.attr('data-cordY');
    zoom = +item.attr('data-zoom');
    //bad fix
    eventsMap.removeAllMarkers();
    item.find('.map').append(map);
    if (getFullScreenWidth() < 700) {
        google.maps.event.trigger(eventsMap.map, 'resize');
    }
    eventsMap.setCenter(x, y);
    eventsMap.addMarker(x, y);
    eventsMap.map.setZoom(zoom);

    return false;
}

function closeEventsBox() {
    var map = $('#map');

    $('.events-slider').removeClass('event-opened');
    $('.opened').removeClass('opened');
    $('.event-item', '.active-coll').show();
    $('.active-coll').removeClass('active-coll');
    $('#map-widget').append(map);
    return false;
}