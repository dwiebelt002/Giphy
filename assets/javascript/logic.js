
$('button').on('click', function() {
        var p = $(this).data('cartoon');
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + p + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
                url: queryURL,
                method: 'GET'
            })
            .done(function(response) {
                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $('<div class="item">')

                    var rating = results[i].rating;

                    var p = $('<p>').text("Rating: " + rating);

                    var cartoonImage = $('<img>');
                    cartoonImage.attr('src', results[i].images.fixed_height.url);

                    gifDiv.append(p)
                    gifDiv.append(cartoonImage)

                    $('#playGif').prepend(gifDiv);
                }

                    function renderButtons(){

                        $('#playGif').empty();
                }


            });
    });


