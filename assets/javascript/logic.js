$(document).ready(function () {
    
    var gifs = ['bugs bunny', 'stitch', 'mickey mouse', 'fred flintstone', "garfield", "popeye", 'road runner', 'donald duck', 'tweety bird'];

    function renderButtons(){ 

        
        $('#cartoonButtons').empty();

        
        for (var i = 0; i < gifs.length; i++){

            
            var a = $('<button>') 
            a.addClass('gif'); 
            a.attr('data-name', gifs[i]);
            a.addClass('cartoonBtn');
            a.text(gifs[i]); 
            $('#cartoonButtons').append(a); 
        } 
    }
    renderButtons();
    

    $('#addCartoon').on('click', function(){

        
        var newGif = $('#cartoon-input').val().trim();

        
        gifs.push(newGif);
        
        
        renderButtons();

        
        return false;
    })

    $('#cartoonButtons').on('click', '.cartoonBtn', function() {
        var cartoon = $(this).data('name');
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + cartoon + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
                url: queryURL,
                method: 'GET'
            })
            .done(function(response) {
               
                console.log(response)

                
                var results = response.data;

                for (var i = 0; i < results.length; i++) {

                   
                    var cartoonDiv = $('<div>');
                    var p = $('<p>').text("Rating: " + results[i].rating);
                    var cartoonImage = $('<img>').attr('src', results[i].images.fixed_height_still.url);
                    cartoonImage.attr('data-still', results[i].images.fixed_height_still.url);
                    cartoonImage.attr('data-animate', results[i].images.fixed_height.url);
                    cartoonImage.attr('data-state', 'still');
                    cartoonImage.addClass('cartoonGif');

                    cartoonDiv.append(p);
                    cartoonDiv.append(cartoonImage);
                    $('#cartoons').prepend(cartoonDiv);
                    
                }

            });
    });
      $('#cartoons').on('click', '.cartoonGif', function(){
           

            var state = $(this).attr('data-state');
            var animate = $(this).attr('data-animate');
            var still = $(this).attr('data-still');
            console.log(animate);
            

            if (state == 'still') {
                $(this).attr('src', animate);
                $(this).attr('data-state', 'animate');
            } else {
                $(this).attr('src', still);
                $(this).attr('data-state', 'still');
            }
            
        });
});

