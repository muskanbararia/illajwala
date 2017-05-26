$(document).ready(function() {

    $(document).on('click', '.email_subscribe', function(e) {
        e.preventDefault();
        var email = $('.email_to_subscribe').val();
        
        $('.email_subscription_error').html('');
        
        if($.trim(email).length == 0) {
            $('.email_subscription_error').html('Please enter a valid email address');
        }
        
        
        $.ajax({url:"/subscription/subscribe/email", type: "POST", 
              dataType: 'json', 
              data: { 
                      email: email, 
                    }, 
              success: function(response) {
                  $('.email_subscription_error').html(response.message);
                  ga('send', 'event', 'Registration', 'Subscribe', 'Email Subscription');
              },  
              error: function(response) {
                  showAlert('error', response.message);
                }
            });
    
    });
    
});