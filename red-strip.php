<script>
            $(document).ready(function() {

                $(".modClose").click(function() {
                    $('#heartBreaker iframe').attr("src", jQuery("#heartBreaker iframe").attr("src"));
                });
                var url = window.location.href;
                if (url.indexOf('utm_content=video&utm_campaign=welcome_email') > -1) {
                    $('#heartBreaker').modal('show');
                }
            });

            $(document).ready(function() {
                $('.ly-home-red-strip').eq(0).click(function() {
                    ga('send', 'event', 'Lybrate Home', 'Click', 'Red_Strip');
                    window.setTimeout(function() {
                        window.location.assign("#");
                    }, 2000);

                })
            });
        </script>
        <div class="myriadpro-light" id="reasons_block">
            <div class="container">
                <div class="row-fluid">
                    <div class="span12 h_center ly-home-red-strip"><!--Don't edit this part. It is just fine -->
                        <!-- <a  target="_blank" data-toggle="modal" onClick="ga('send', 'event', 'Lybrate Home', 'Click', 'Red_Strip');" data-target="#heartBreaker">
             Book diagnostic tests with top labs, get doorstep sample pickup, share reports online &rarr;
             </a>  -->
                        <span>Illajwala</span><a>Transparent - Professional - Without Hassles!</a>
                        <!-- <a  target="_blank" data-toggle="modal" onClick="ga('send', 'event', 'Video Clicks', 'Click', 'Video Link');" data-target="#heartBreaker">Don't Let Appointments Ruin Your Plans - Check Out Our Latest Video &rarr; </a> -->
                    </div>
                </div>
            </div>
        </div>