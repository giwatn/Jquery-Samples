/* BASIC JQUERY SAMPLE */
// (em) Section in (li#one) adding seasonal class,and attached image calender.
$('li em').addClass('seasonal');

// JQUERY EVENTS
$(function() {
    var iDs = '';
    var $listItems = $('li');

    $listItems.on('mouseover click', function() {
        iDs = this.id;
        $listItems.children('span').remove();
        $(this).append(' <span class="priority">' + iDs + '</span>');
    });

    $listItems.on('mouseout', function() {
        $(this).children('span').remove();
    });
});

// EVENT DELEGATION(.ON())
$(function() {
    var listItem, itemStatus, eventType;
    $('ul').on(
        'click mouseover',
        ':not(#four)', {
            status: 'important',
        },
        function(e) {
            listItem = 'Item: ' + e.target.textContent + '<br/>';
            itemStatus = 'Status: ' + e.data.status + '<br/>';
            eventType = 'Event: ' + e.type;
            $('#notes').html(listItem + itemStatus + eventType);
        }
    );
});

/* BASIC EFFECTS */
$(function() {
    $('h2').hide().slideDown();
    var $li = $('li');
    $li.hide().each(function(index) {
        $(this)
            .delay(700 * index)
            .fadeIn(700);
    });
    $li.on('click', function() {
        $(this).fadeOut(700);
    });
});

// USING ANIMATE EFFECT
$(function() {
    $('li').on('click', function() {
        $(this).animate({
                opacity: 0.0,
                paddingLeft: '+=80',
            },
            500,
            function() {
                $(this).remove();
            }
        );
    });
});

/* TOGGLE(HIDE & SHOW) */
$(function() {
    var $show = $('#show');
    var $hide = $('#hide');
    var $h2 = $('h2');

    $show.hide();
    $hide.show();

    $h2.on('click', function() {
        $show.toggle();
        $hide.toggle();
    });

    $hide.on('click', function() {
        $('#main-content').toggle();
        $('#counter').hide();
        $('#slideAd').hide();
    });

    $show.on('click', function() {
        $('#main-content').toggle();
        $('#counter').show();
        $('#slideAd').show();
    });
});

/* FORM METHODS & EVENTS */
// WORKING WITH FORMS
$(function() {
    // ITEM COUNTER
    function updateCount() {
        // Declare Function
        var items = $('li[class!=complete]').length; // Number of items in list
        $('#counter').text(items); // Added into counter circle
    }
    updateCount(); // Call the function

    // SETUP
    var $listItem, $newItemForm, $newItemButton;
    var item = ''; // Item is an empty string
    $listItem = $('ul'); // Cache the unordered list
    $newItemForm = $('#newItemForm'); // Cache form to add new
    $newItemButton = $('#newItemButton'); // Cache button to show form

    // Hide & Fade of item
    $('li')
        .hide()
        .each(function(index) {
            // Hide list items
            $(this)
                .delay(450 * index)
                .fadeIn(1600); // Then fade them in
        });

    // SETUP FORM FOR NEW ITEMS
    $newItemButton.show(); // Show the button
    $newItemForm.hide(); // Hide the form
    $('#showForm').on('click', function() {
        // When new item clicked
        $newItemButton.hide(); // Hide the button
        $newItemForm.show(); // Show the form
    });

    // ADDING A NEW LIST ITEM
    $newItemForm.on('submit', function(e) {
        // When a new item is submitted
        e.preventDefault(); // Prevent form being submitted
        var text = $('input:text').val(); // Get value of text input
        $listItem.append(
            '<li class="normal delete"><a href="#">' + text + '</a></li>'
        ); // Add item to end of thelist
        $('input:text').val(''); // Empty the text input
        updateCount(); // Update the count
    });

    // CLICK HANDLING - USES DELEGATION ON <ul> Element
    $listItem.on('click', 'li', function() {
        var $this = $(this); // Cache the element in jquery object
        var normal = $this.hasClass('normal'); // Is item complete

        if (normal === true) {
            // Check if item is complete
            $(this).animate({
                    // If so, animate opacity + padding
                    opacity: 0.0,
                    paddingLeft: '+=180',
                },
                500,
                'swing',
                function() {
                    // Use callback when animation completes
                    $(this).remove(); // Then completely remove this item
                }
            );
        } else {
            // Otherwise indicate it is complete
            item = $this.text(); // Get the text from the list
            $this.remove(); // Remove the list item
            $listItem // Add back end of list as complete
                .append('<li class="normal">' + item + '</li>')
                .hide()
                .fadeIn(300); // Hide it so it can be faded in
            updateCount(); // Update the counter
        } //End of else option
    }); // End of event handler
});

/* DETERMINING POSITION ITEMS ON THE PAGE */
$(function() {
    var $window = $(window);
    var $slideAd = $('#slideAd');
    var endZone = $('#footer').offset().top - $window.height() - 500;

    $window.on('scroll', function() {
        if (endZone < $window.scrollTop()) {
            $slideAd.animate({
                    right: '0px',
                },
                1500
            );
        } else {
            $slideAd.stop(true).animate({
                    right: '-560px',
                },
                1500
            );
        }
    });
});