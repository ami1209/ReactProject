
$(function() {
    $(document).ready(function() {

        function setHeight() {
            windowHeight = $(window).innerHeight();
            $('.home_mobile').css('min-height', windowHeight);
        };
        setHeight();

        $(window).resize(function() {
            setHeight();

        });
    });
    $(document).ready(function() {
        function setHeight() {
            windowHeight = $(window).innerHeight();
            $('.cashier').css('min-height', windowHeight);
        };
        setHeight();

        $(window).resize(function() {
            setHeight();
        });
    });
    $(document).ready(function() {
        function setHeight() {
            windowHeight = $(window).innerHeight();
            $('.popup_content').css('max-height', windowHeight - "40");
        };
        setHeight();

        $(window).resize(function() {
            setHeight();
        });
    });

    $(".more_bonus").click(
        function() {
            $("#more_bonus").fadeIn('slow');
        }
    );

    $(".remove_card").click(
        function() {
            $("#remove_card").fadeIn('slow');
        }
    );

    $(".failed_transaction").click(
        function() {
            $("#failed_transaction").fadeIn('slow');
        }
    );

    $(".failed_transaction1").click(
        function() {
            $("#failed_transaction1").fadeIn('slow');
        }
    );

    $(".close_btn, .backdrop_popup").click(
        function() {
            $("#more_bonus, #remove_card, #failed_transaction, #failed_transaction1").fadeOut('fast');
        }
    );
    
    
});
