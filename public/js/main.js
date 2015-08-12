var imgTargets = ["nature", "animals", "business", "sports", "technics", "transport"]

function randomImage() {
    var index = (Math.ceil(Math.random() * 100)) % (imgTargets.length);
    console.log(index);
    return "http://lorempixel.com/300/200/" + imgTargets[index];
}

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
                            .append(
                                $('<button class="btn btn-md attend pull-right">')
                                    .append($('<span class="glyphicon glyphicon-plus">'))
                                            
                            )
                            .append($('<h5>' + _event.date + '</h5>'))
                            .append($('<h4 class="zero-top">' + _event.name + '</h4>'))
                            .append($('<hr/>'))
                            .append(
                                $('<h6 class="event-address">')
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
    $.ajax('/events').done(function(data) {
        addEvents(data);
    });

    $('#signInForm').submit(function(e) {
        e.preventDefault();

        var formData = {
            'username': $('#username').val(),
            'password': $('#password').val()
        }

        $.ajax({
            beforeSend: function(xhrObj) {
                xhrObj.setRequestHeader("Content-Type","application/json");
            },
            type: 'POST',
            url: '/login',
            data: JSON.stringify(formData),
            dataType: 'json',
            success: function(data) {
                $('#navbarForm').removeClass('open');
                $('#registerBtn').hide();
                $('#signInBtn').hide();
                toastr.success('Welcome ' + $('#username').val() + '!', '', {timeOut: 1000, positionClass: 'toast-bottom-right'})
            },
            error: function(data) {
                toastr.error('Invalid login', '', {timeOut: 1000, positionClass: 'toast-bottom-right'})
                console.log("failed!");
            }
        });
    });

    $('#registrationForm').submit(function(e) {
        e.preventDefault();

        var formData = {
            'username': $('#ruser').val(),
            'password': $('#rpassword').val(),
            'email': $('#remail').val(),
        }

        $.ajax({
            beforeSend: function(xhrObj) {
                xhrObj.setRequestHeader("Content-Type", "application/json");
            },
            type: 'POST',
            url: '/register',
            data: JSON.stringify(formData),
            dataType: 'json',
            success: function(data) {
                $('#registerModal').removeClass('in');
                toastr.success('Success!', '', {timeOut: 1000, positionClass: 'toast-bottom-right'})
            }, 
            error: function(data) {
                toastr.error('Username already exists', '', {timeOut: 1000, positionClass: 'toast-bottom-right'})
                console.log("Failed!");
            }
        });
    });

    $('#createEventModal').submit(function(e) {
        e.preventDefault();

        var formData = {
            'img': randomImage(),
            'name': $('#eventName').val(),
            'date': $('#eventDate').val(),
            'address': $('#eventAddress').val()
        }

        $.ajax({
            beforeSend: function(xhrObj) {
                xhrObj.setRequestHeader("Content-Type", "application/json");
            },
            type: 'POST',
            url: '/event',
            data: JSON.stringify(formData),
            dataType: 'json',
            success: function(data) {
                $('#createEventModal').removeClass('in');
                toastr.success('Event Created!', '', {timeOut: 1000, positionClass: 'toast-bottom-right'});
            }, 
            error: function(data) {
                toastr.error('Unable to add event', '', {timeOut: 1000, positionClass: 'toast-bottom-right'});
                console.log("Failed!");
            }
        });

    });
});
