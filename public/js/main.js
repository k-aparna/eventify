function appendRow() {
    var row = $(document.createElement('div'));
    row.addClass('row top-buffer');
    $('.container').append(row);
    return row;
}

function createEvent(_event) {
    return $('<div class="col-md-4">')
            .append(
                $('<div class="event-card">')
                    .append($('<img class="img-responsive" src="' + _event.img + '">'))
                    .append(
                        $('<div class="event-details text-uppercase pull-center">')
                            .append($('<h5>' + _event.date + '</h5>'))
                            .append($('<h4 class="zero-top">' + _event.name + '</h4>'))
                            .append($('<hr/>'))
                            .append(
                                $('<h6 class="event-address">')
                                    .append(
                                        $('<a href="#">')
                                            .append($('<span class="pull-right glyphicon glyphicon-plus-sign">'))
                                            
                                    )
                                    .append(_event.address)
                            )
                            
                    )
            )
}

function addEvents(events) {
    var currentRow = null;
    for (var i = 0; i < events.length; i++) {
        if (i % 3 == 0) {
            currentRow = appendRow(i);
        }
        var _event = events[i];
        var eventHTML = createEvent(_event);
        currentRow.append(eventHTML);
    }
}

$(document).ready(function() {
    $.ajax('/events/all').done(function(data) {
        addEvents(data);
    });
});
