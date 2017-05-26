var askQuestionFlow = ((getUrlVars()['lpt'] != undefined && getUrlVars()['lpt'] == "PS-CPP") ? 'PS-CPP_Ask' : 'Ask' );

var ASK_QUESTION_STATE = {
    API: {}
};

$(function(){

    $(document).ready(function(){
    	if(window.Lybrate.Utils.getURLParameter){
    		 var email = Lybrate.Utils.getURLParameter("email");
    	        if(email){
    	            $("#email-AskQuestion").val(email);
    	        };
    	};

        $(".free_ask_q").click(function(){
            $(".collapsed.schedule_video_call_ask_q").eq(0).hide();
            $('.make_q_payment.collapsed').hide();
        });

        $(".exclusive_ask_q").click(function(){
            $(".collapsed.schedule_video_call_ask_q").eq(0).show();
            $('.make_q_payment.collapsed').show();
        });
    });

    $(document).on('click', '.modifyQuestionBtn', function(e){
        e.preventDefault();
        var u = $('.profile-slug').val();
        $('#submitAskQuestionLoader').hide();
        if(u){
            $('.showRegistrationForm, .showUserLoginForm, .showUserResetPasswordForm, .showFBLoggedInForm').hide();
            //$('.top_doctors_helping').hide();
            if($('.showAskQuestion').length === 0){
               // $('#askQuestionBlock, .top_doctors_helping, #submitAskQuestionBtn').show();
                $('#askQuestionBlock, #submitAskQuestionBtn').show();
            } else {
                $('.showAskQuestion, #submitAskQuestionBtn').show();
            }
        } else{
            $('.showRegistrationForm, .showUserLoginForm, .showUserResetPasswordForm, .showFBLoggedInForm').hide();
            //$('.showAskQuestion,.top_doctors_helping,#submitAskQuestionBtn').show();
            $('.showAskQuestion, #submitAskQuestionBtn').show();
            $('#askQuestionBlock').show();
            $('.recent_q').addClass('screenWide');
        }
        $('.second_step_onwards').hide();
        ga('send', 'event', 'Ask a Question', 'Click', 'Modify Question');
    });



    $(document).on('click', '#submitAskQuestionBtn', function(e) {
        e.preventDefault();
        var emailInput = $('#email-AskQuestion');
        if($.trim($('#question-AskQuestion').val())){
            if(emailInput.length !=0 && emailInput.val() && Lybrate.Utils.isEmailValid(emailInput.val())){
                var slug = $('.profile-slug').attr('value');
                var sourceQL = $('#sourceQL-AskQuestion').val();
                var data = {question:$('#question-AskQuestion').val(),email:$('#email-AskQuestion').val()};
                if(slug){
                    data['username'] = slug;
                }
                if(sourceQL){
                    data['source'] = sourceQL;
                }

                $.ajax({
                    url: '/raven/log/q/',
                    type: "POST",
                    dataType: 'json',
                    data: data,
                    success: function(response){
                        if(response.status == 'success') {
                            //implies user is logged in
                            checkLoginAskQuestion();
                        }
                    }
                });

            } else if(emailInput.length !=0){
                $(".patientAskQuestionError").html('Please enter your question and your valid email').show();
                return false;
            }
        }
        if($('#makeItPublic').is(':checked')){
            ga('send', 'event', 'Ask a Question', askQuestionFlow, 'All other doctors');
        }

        ga('send', 'event', 'Ask a Question', askQuestionFlow, 'Submit');
        fbq('track', 'QuestionSubmit');
        $('.qna_conditions_form').append('<img height="1" width="1" style="border-style:none;" alt="" src="//www.googleadservices.com/pagead/conversion/942705448/?label=s-QBCNOx62AQqJbCwQM&amp;guid=ON&amp;script=0"/>');
        if(Lybrate.Utils.isMobileDeviceRequest()) {
            smoothScroll($('.header'));
            $('.qna_conditions_form').append('<img src="https://sp.analytics.yahoo.com/spp.pl?a=1000279334571&.yp=25310&js=no"/>');
        } else {
            $('.qna_conditions_form').append('<img src="https://sp.analytics.yahoo.com/spp.pl?a=1000279334571&.yp=25309&js=no"/>');
        }
    });

    function validateAdditionalDetailsForm(){
        // for every visible required field having :input run validations
        var returnFlag = true;

        // for every control-group marked as a-required
        $("#patient-vitals .a-required").each(function(){
            // check if it is not hidden. If hidden it means the user is not meant to see it, there is no point validating it.
            if( $(this).css("display") != 'none' ) {
                // for every control group there must be one form element (:input), if the value is empty, raise the flag.
                returnFlag &= !( _.isEmpty( $(this).find(":input").val() ) );
                // TESTING : console.log($(this).css("display") + "  " + $(this).find(":input").val() + "  " + _.isEmpty( $(this).find(":input").val()) + "  " + returnFlag);
            }
        });

        return returnFlag;
    }

    $(document).on('click','#submitAskQuestionForBtn',function(e){
        e.preventDefault();

        if(! validateAdditionalDetailsForm()){
            Lybrate.Utils.showAlert('error',"Please fill all the required fields (marked *).",'.patientAskQuestionForError');
            return;
        }


        var that = $(this);
        var qType = $(this).attr('q-type');
        var questionForPerson = $('input[name=askQuestionFor]:checked').attr('relativeId');
        var makeItPrivate = !($('#makeItPublic').is(':checked'));
        var slug = $('.profile-slug').attr('value')?$('.profile-slug').attr('value'):'';
        var slugTypeCode = $('#lybProfileType').attr('value')?(slug?$('#lybProfileType').attr('value'):''):'';
        var ajaxUrl = '/raven/ask';
        var data = {
            'source':$('#lybPageType').attr('value'),
            'question':$.trim($('#question-AskQuestion').val()),
            'makeItPrivate':makeItPrivate,'mobile':$('#loggedInUserInfo').attr('phoneNumber'),
            'relativePatientId':(questionForPerson != 'self')?questionForPerson:''
        };
        if(slug){
            data['slug']=slug;
            data['slugTypeCode']=slugTypeCode;
        }
        $("#patient-vitals :input").each(function(key,input){
            data[$(input).attr("name")] = $(input).val();
        });

        data['gender'] = $('#patient-vitals input[name="gender"]:checked').val()?$('#patient-vitals input[name="gender"]:checked').val():'male';
        data['ageType'] = 'YM';

        if(!data['weight']){
            delete data['weight'];
            delete data['weightUnit'];
        }
        if(!data['height']){
            delete data['height'];
            delete data['heightUnit'];
        }

        if(!data.gender || (!data.ageYears && !data.ageMonths)){
            Lybrate.Utils.showAlert('error',"Please specify age and gender",'.patientAskQuestionForError');
            $(that).show();
            return false;
        }

        $('#submitAskQuestionForLoader').show();
        if(questionForPerson) {
            if($('#loggedInUserInfo').data("v3-user")) {
                //V3
                if(qType === "STANDARD"){
                    ga('send', 'event', 'Ask a Question', askQuestionFlow, 'FreeV3_PersonalizedContinue');
                } else if(qType === "EXCLUSIVE"){
                    ga('send', 'event', 'Ask a Question', askQuestionFlow, 'PrePaidV3_PersonalizedContinue');
                }
            } else {
                //V2
                if(qType === "STANDARD"){
                    ga('send', 'event', 'Ask a Question', askQuestionFlow, 'FreeV2_PersonalizedContinue');
                } else if(qType === "EXCLUSIVE"){
                    ga('send', 'event', 'Ask a Question', askQuestionFlow, 'PaidV2_PersonalizedContinue');
                }
            }
            /*ga('send', 'event', 'Ask a Question', askQuestionFlow, 'SomeoneElse_Continue');*/
        } else {
            if($('#loggedInUserInfo').data("v3-user")) {
                //V3
                if(qType === "STANDARD"){
                    ga('send', 'event', 'Ask a Question', askQuestionFlow, 'FreeV2_SelfContinue');
                } else if(qType === "EXCLUSIVE"){
                    ga('send', 'event', 'Ask a Question', askQuestionFlow, 'PaidV2_SelfContinue');
                }
            } else {
                //V2
                if(qType === "STANDARD"){
                    ga('send', 'event', 'Ask a Question', askQuestionFlow, 'FreeV3_SelfContinue');
                } else if(qType === "EXCLUSIVE"){
                    ga('send', 'event', 'Ask a Question', askQuestionFlow, 'PrePaidV3_SelfContinue');
                }
            }
            /*ga('send', 'event', 'Ask a Question', askQuestionFlow, 'Self_Continue');*/
        }

        /*FIXME: manipulating data before submit to avoid extra code (assuming refactor is imminent)*/
        if(ASK_QUESTION_STATE.API.packages.currentChoice){
            data.packageType = ASK_QUESTION_STATE.API.packages.currentChoice.type || null;
            data.consultType = ASK_QUESTION_STATE.API.packages.currentChoice.consultationType || null;
            data.packageCode = ASK_QUESTION_STATE.API.packages.currentChoice.code || null;
        }

        if(ASK_QUESTION_STATE.API.doctors.currentChoice){
            data.slug = ASK_QUESTION_STATE.API.doctors.currentChoice.username;
        }

        //if (Lybrate.Utils.getURLParameter("pcd")){
        //    data["packageCode"] = Lybrate.Utils.getURLParameter("pcd");
        //    data["consultType"] = Lybrate.Utils.getURLParameter("ct");
        //}

        /********************************************************************************************/

        $.ajax({url: ajaxUrl,type: "POST",dataType: 'json',data: data,
            success: function(response) {
                $(that).show();
                if (response.status == 'success' || response.successful == true ) {

                    /* FIXME make page state
                     --------------------------------------------------------------------*/
                    ASK_QUESTION_STATE.API.ask = response;
                    /*------------------------------------------------------------------*/
                    console.log(response);

                    if(qType === "STANDARD"){
                        $('.schedule_video_call_ask_q.collapsed').hide();
                        /*ga('send', 'event', 'Ask a Question', askQuestionFlow, 'Success-Standard Question');*/
                    } else if(qType === "EXCLUSIVE" || ASK_QUESTION_STATE.API.question.type === "EXCLUSIVE"){
                        /*ga('send', 'event', 'Ask a Question', askQuestionFlow, 'Success-Exclusive Question');*/
                        if(response.items && response.items.paid){
                            $('.make_q_payment.collapsed').show();
                            data['payUrl'] = response.items.payUrl;
                            data['paid'] = response.items.paid;
                        }
                    }

                    if(questionForPerson) {
                        if($('#loggedInUserInfo').data("v3-user")) {
                            //V3
                            if(qType === "STANDARD"){
                                ga('send', 'event', 'Ask a Question', askQuestionFlow, 'FreeV3_PersonalizedContinue_Success');
                            } else if(qType === "EXCLUSIVE"){
                                ga('send', 'event', 'Ask a Question', askQuestionFlow, 'PrePaidV3_PersonalizedContinue_Success');
                            }
                        } else {
                            //V2
                            if(qType === "STANDARD"){
                                ga('send', 'event', 'Ask a Question', askQuestionFlow, 'FreeV2_PersonalizedContinue_Success');
                            } else if(qType === "EXCLUSIVE"){
                                ga('send', 'event', 'Ask a Question', askQuestionFlow, 'PaidV2_PersonalizedContinue_Success');
                            }
                        }
                        /*ga('send', 'event', 'Ask a Question', askQuestionFlow, 'SomeoneElse_Continue');*/
                    } else {
                        if($('#loggedInUserInfo').data("v3-user")) {
                            //V3
                            if(qType === "STANDARD"){
                                ga('send', 'event', 'Ask a Question', askQuestionFlow, 'FreeV3_SelfContinue_Success');
                            } else if(qType === "EXCLUSIVE"){
                                ga('send', 'event', 'Ask a Question', askQuestionFlow, 'PrePaidV3_SelfContinue_Success');
                            }
                        } else {
                            //V2
                            if(qType === "STANDARD"){
                                ga('send', 'event', 'Ask a Question', askQuestionFlow, 'FreeV2_SelfContinue_Success');
                            } else if(qType === "EXCLUSIVE"){
                                ga('send', 'event', 'Ask a Question', askQuestionFlow, 'PaidV2_SelfContinue_Success');
                            }
                        }
                        /*ga('send', 'event', 'Ask a Question', askQuestionFlow, 'Self_Continue');*/
                    }

                    //$('.hide_on_make_payment').hide();
                    //$('.showAskQuestionFor').hide();
                    //$(".showFillObservations").hide();
                    $('.questionRelativeId').attr('relativeId',data.relativePatientId);

                    if(response.items.healthStories && $('.showSimilarQuestions').length != 0 ){
                        if(response.items.healthStories.length>0){
                            $('.second_step_onwards').hide();
                            //$('.other_details').show();
                            similarQuestionsForm(response);
                        } else{
                            ObservationForm(data); //TODO trigger click on continue btn
                            //triggerClickOnContinueBtn(data);
                        }
                    } else {
                        ObservationForm(data); // TODO trigger click on continue btn
                        //triggerClickOnContinueBtn(data);
                    }

                    $('.qna_conditions_form').append('<img height="1" width="1" alt="" style="display:none" src="https://www.facebook.com/tr?ev=6021995267026&amp;cd[value]=0.01&amp;cd[currency]=INR&amp;noscript=1" />');
                    $('.qna_conditions_form').append('<img height="1" width="1" style="border-style:none;" alt="" src="//www.googleadservices.com/pagead/conversion/972037822/?label=OowiCOy8iVkQvr3AzwM&amp;guid=ON&amp;script=0"/>');
                    ga('send', 'event', 'Ask a Question', askQuestionFlow, 'Success');
                    if(Lybrate.Utils.isMobileDeviceRequest()) {
                        $('.qna_conditions_form').append('<img src="https://sp.analytics.yahoo.com/spp.pl?a=1000279334571&.yp=24738&js=no"/>');
                    } else {
                        $('.qna_conditions_form').append('<img src="https://sp.analytics.yahoo.com/spp.pl?a=1000279334571&.yp=24536&js=no"/>');
                    }

                    if(response.items['messageType'] === 'CH') {
                        fireEventConversionPixel('QnAPvt', response.items['messageCode']);
                        $('.qna_conditions_form').append('<img height="1" width="1" style="border-style:none;" alt="" src="//www.googleadservices.com/pagead/conversion/942705448/?label=Mh3kCPPuz18QqJbCwQM&amp;guid=ON&amp;script=0"/>');
                    } else {
                        fireEventConversionPixel('QnA', response.items['messageCode']);
                        $('.qna_conditions_form').append('<img height="1" width="1" style="border-style:none;" alt="" src="//www.googleadservices.com/pagead/conversion/942705448/?label=Ci8NCNTZ1F8QqJbCwQM&amp;guid=ON&amp;script=0"/>');
                    }
                    window.setTimeout(function(){
                        $('#submitAskQuestionForLoader').hide();
                        triggerClickOnContinueBtn(data);
                    }, 4000);


                } else{
                    $('#submitAskQuestionForLoader').hide();
                    Lybrate.Utils.showAlert('error',response.message,'.patientAskQuestionForError');
                }
            },
            error: function(response) {
                $('#submitAskQuestionForLoader').hide();
                Lybrate.Utils.showAlert('error','Something went wrong. Please try again.','.patientAskQuestionForError');
            }
        });
    });

    // changing button css and display or hide optional note block
    $(document).on('click', '.addNewObservation', function(e) {
        e.preventDefault();

        var sourceOBS = $(this).attr('sourceobs');

        $('.renderQuestions').hide();
        $('.' + sourceOBS + 'Observation').show();
        if(sourceOBS == 'medication'){
            $('.observations_form').find('.status[value="CRNT"]').text('Take this');
            $('.observations_form').find('.status[value="PAST"]').text('No longer take this');
        } else{
            $('.observations_form').find('.status[value="CRNT"]').text('Have this');
            $('.observations_form').find('.status[value="PAST"]').text('No longer have this');
        }
        $('.cancelObservation').attr('sourceobs',sourceOBS);
        $('.addObservationBtn').attr('sourceobs',sourceOBS);
        $('.addObservationBlock').attr('sourceobs',sourceOBS).show();

        //searchObservation();
    });

    $(document).on('click','.addObservationBtn',function(e){
        e.preventDefault();
        var form = $('.observations_form');
        var sourceOBS = $(this).attr('sourceobs');
        var observation = {
            'id': $(form).find('#' + sourceOBS + 'Id').val(),
            'name': $(form).find('#' + sourceOBS + 'Name').val(),
            'notes': $(form).find('.notes').val(),
            'status': $(form).find('[name="status"]:checked').val(),
            'relativeId': $('.questionRelativeId').attr('relativeId') || $(".askQuestionForName").eq(0).find("input[type='radio']:checked").attr("relativeid") || null
        };

        if (observation.id || observation.name){
            $('.addObservationQuestionForLoader').show();
            if(sourceOBS == 'condition'){
                var ajaxUrl = '/profile/medCon/info';
                var data = {'medicalConditionId': observation.id,'medicalConditionName':observation.name,'notes': observation.notes,'status': observation.status,'rfPatientRelativeId': observation.relativeId};
            } else if(sourceOBS == 'medication'){
                var ajaxUrl = '/profile/medcine/info';
                var data = {'medicineName': observation.name,'notes': observation.notes,'status': observation.status,'rfPatientRelativeId': observation.relativeId};
            } else if(sourceOBS == 'allergy'){
                var ajaxUrl = '/profile/allergy/info';
                var data = {'allergyId': observation.id,'allergyName': observation.name,'notes': observation.notes,'status': observation.status,'rfPatientRelativeId': observation.relativeId};
            }

            $.ajax({ url: ajaxUrl, type: "POST", dataType: 'json', data: data, success: function(response){
                $('.addObservationQuestionForLoader').hide();
                if (response.status == 'success'){
                    $('.' + sourceOBS + 'ObsList').append(_.template($('#renderObservationListElement').html(),
                        {'obsId':response.items.id,'obsName':observation.name,'sourceobs':sourceOBS}));

                    $('.'+ sourceOBS + 'Observation').val('').hide();
                    $('.'+ sourceOBS + 'Id').val('');
                    $('.addObservationBlock').hide();
                    $('.renderQuestions').show();
                    $('.notes').val('');
                } else{
                    $('.addObservationError').html('response.message');
                }
            },
                error: function(response) {
                    $('.addObservationQuestionForLoader').hide();
                    $('.addObservationError').html('Something went wrong. Please try again.');
                }
            });
        }
    });

    // Hiding condition add block
    $(document).on('click', '.cancelObservation', function(e) {
        e.preventDefault();
        var sourceOBS = $(this).attr('sourceobs');
        $('.addObservationBlock').hide();
        $('.'+ sourceOBS + 'Observation').val('').hide();
        $('.'+ sourceOBS + 'Id').val('');
        $('.renderQuestions').show();
        $('.notes').val('');
    });

    $(document).on('click', '.deleteObservation', function(e) {
        e.preventDefault();
        $(this).hide();

        var obsId = $(this).attr('observationId');
        var sourceOBS = $(this).attr('sourceobs');

        var ajaxUrl, data;
        if(sourceOBS == 'condition'){
            ajaxUrl = '/profile/medCon/remove';data = {'rfPatientMedicalConditionId': obsId};
        } else if(sourceOBS == 'medication'){
            ajaxUrl = '/profile/medicineInfo/remove';data = {'rfPatientMedicationId': obsId};
        } else if(sourceOBS == 'allergy'){
            ajaxUrl = '/profile/allergy/remove';data = {'rfPatientAllergyInfoId': obsId};
        }
        $.ajax({ url: ajaxUrl, type: "POST", dataType: 'json', data: data,
            success: function(response){
                if (response.status == 'success') {
                    $('[observationId="' + obsId + '"][sourceobs="' + sourceOBS + '"]').remove();
                } else {
                    Lybrate.Utils.showAlert(response.message,'.continue_qna_submit_error');
                }
            },
            error: function(response) {
                Lybrate.Utils.showAlert('Something went wrong. Please try again.','.continue_qna_submit_error');
            }
        });

    });
    $(document).on('click','#cancelAskQuestionForBtn',function(e){
        e.preventDefault();
        $('#relativeName').val("");

        $('.showAskQuestionFor').hide();
        $('.main_action_block .main-actions').show();
    });
    // On changing for question option
    $(document).on('change','.askQuestionFor',function(){
        var questionFor = $(this).val();

        if(questionFor == 'someOneElse'){
            $('.continueAQF').hide();
            $('.patient-vitals-form').hide();
            $('.addRelativeDetails').show();
            if($.trim($('.AddedRelatives .AddedRelativesList').html()).length == 0){
                $('.AddedRelatives').hide();
            } else {
                $('.AddedRelatives').show();
            }
            $('.conditionObsList').empty();
            $('.medicationObsList').empty();
            $('.allergyObsList').empty();
        } else{
            $('.addRelativeDetails').hide();
            $('.AddedRelatives').hide();
            $('.patient-vitals-form').show();
            $('.continueAQF').show();
            $('.relative-name').text(($(this).val()==="self")?"Your":($(this).val() + "'s"));

            $('#patient-vitals input[name="ageYears"]').val($(this).data("age-yrs"));
            $('#patient-vitals select[name="ageMonths"]').val($(this).data("age-mnths")?$(this).data("age-mnths"):"");
            $('#patient-vitals input[name="height"]').val($(this).data("height"));
            $('#patient-vitals select[name="heightUnit"]').val($(this).data("height-unit")?$(this).data("height-unit"):"FT");
            $('#patient-vitals input[name="height"]').unmask();
            if($(this).data("height-unit") == 'CM'){
                $('#patient-vitals input[name="height"]').mask("9?999");
            } else {
                $('#patient-vitals input[name="height"]').mask("9?.99");
            }
            $('#patient-vitals input[name="weight"]').val($(this).data("weight"));
            $('#patient-vitals select[name="weightUnit"]').val($(this).data("weight-unit")?$(this).data("weight-unit"):"KG");
//			$('#patient-vitals input[name="gender"]').removeAttr("checked");
            $('#patient-vitals input[name="gender"][value="'+($(this).data("gender")?$(this).data("gender"):'male')+'"]').trigger('click');

            $('#patient-vitals :input[name="city"]').val($(this).data("city"));
            $('#patient-vitals :input[name="occupation"]').val($(this).data("occupation"));
            $('#patient-vitals :input[name="line1"]').val($(this).data("line1"));
            var data = {'patientRelativeId':$(this).attr("relativeid")};

            getMedicalCondition(data);
        }



    });




    // Adding patient relative
    $(document).on('click','.addRelativeBtn',function(e){
        e.preventDefault();
        var name = $.trim($('.relativeName').val());
        var relation = $('.relation').val();

        if(name == ''){
            Lybrate.Utils.showAlert('error','Please Add Relative Name.','.addedrelativeError');
            return false;
        }

        var ajaxUrl = '/profile/relative/add';
        var data = {'name': name,'relation':relation,'source':'web'};

        $('.addRelativeBtn').hide();
        $('.submitAddrelativeLoader').show();


        ga('send', 'event', 'Ask a Question', askQuestionFlow, 'SomeoneElse_Add Relative');
        $.ajax({url: ajaxUrl,type: "POST",dataType: 'json',data: data,
            success: function(response) {
                if (response.status == 'success') {

                    $('.addRelativeBtn').show();
                    $('.submitAddrelativeLoader').hide();
                    $('.addRelativeDetails').slideUp();

                    getRelatives();

                    // to create new releative
                    if(response.items && response.items.relative){
                        $('input[name="askQuestionFor"]').removeProp('checked');
                        $('.askQuestionForName').append(_.template($('#addedRelativeTemplate').html(),{'id':response.items.relative.id,'name':response.items.relative.name,'ageYears':'','ageMonths':'','ageType':'','weightUnit':'','weight':'','height':'','heightUnit':'','gender':'male'}));

                        $('#patient-vitals .relative-name').text(response.items.relative.name);
                        $('#patient-vitals input[name="ageYears"]').val("");
                        $('#patient-vitals select[name="ageMonths"]').val("");
                        $('#patient-vitals input[name="height"]').val("");
                        $('#patient-vitals select[name="heightUnit"]').val("FT");
                        $('#patient-vitals input[name="height"]').unmask().mask("9?.99");
                        $('#patient-vitals input[name="weight"]').val("");
                        $('#patient-vitals select[name="weightUnit"]').val("KG");

                        $('#patient-vitals input[name="occupation"]').val("");
                        $('#patient-vitals input[name="line1"]').val("");
                        $('#patient-vitals input[name="city"]').val("");
                    }

                    $('.askQuestionForName').find(':last').prop('checked','true');
                    $('.askQuestionForName').find(':last').change();
                    $('#patient-vitals').show();

                    //$('#patient-vitals input[name="gender"]').removeAttr("checked");
                    //$('#patient-vitals input[name="gender"][value="male"]').attr("checked",true);
                    $('.continueAQF').show();

                } else {
                    $('.addRelativeBtn').show();
                    $('.submitAddrelativeLoader').hide();
                    Lybrate.Utils.showAlert('error',response.message,'.addedrelativeError');
                }
            },
            error: function() {
                $('.addRelativeBtn').show();
                $('.submitAddrelativeLoader').hide();
                Lybrate.Utils.showAlert('error','Something went wrong. Please try again.','.addedrelativeError');

            }
        });
    });


    $(document).on('click', '.continue_qna_submit_btn', function(e) {
        e.preventDefault();
        ga('send', 'event', 'Ask a Question', askQuestionFlow, 'Personalized_Continue');
        ga('send', 'event', 'Ask a Question', 'Ask', 'Personalized_Continue');
        var isV3User = $(this).data('v3-user');
        var payUrl = $(this).data('pay-url');

        var qType = $('#submitAskQuestionForBtn').attr('q-type');
        $('.continue_qna_submit_btn_loader').show();


        if($('#lybPageSource') && $('#lybPageSource').attr('value') == 'qna_checkout') {
            $(window).off('beforeunload');
            if(qType === 'EXCLUSIVE'){
                var schedulingRequired = ASK_QUESTION_STATE.API.ask.items.consultType === "A" || ASK_QUESTION_STATE.API.ask.items.consultType === "V";
                if(!schedulingRequired){
                    window.location.href = ASK_QUESTION_STATE.API.ask.items.payUrl || ("/conversation/" + ASK_QUESTION_STATE.API.ask.items.conversationCode);
                } else {
                    var username = $("input.profile-slug").attr('value');

                    var parentEl = $(".schedule_video_call_ask_q_schedule").find(".video-call-scheduler-container").eq(0);
                    Lybrate.Widgets.SchedulingWidget.init({
                        username: username,
                        autoGenerate: ! ASK_QUESTION_STATE.API.ask.items.scheduleEnabled,
                        tmplId: "createAppointmentTmpl",
                        parentEl: parentEl,
                        source: "askQuestion",

                        onServerSuccess: function(res){
                            if(res.successful || res.autoGenerated){
                                // stop loader
                                $('.continue_qna_submit_btn_loader').hide();
                                $('.additional_options_ask_q').slideUp().removeClass('expanded').addClass('collapsed');
                                $('.additional_options_ask_q_details').hide();
                                $('.additional_options_ask_q_details_filled').show();

                            }
                        },
                        onServerError: function(res){

                            Lybrate.Utils.showAlert('error','Something went wrong. Please try again.','.addedrelativeError');
                        },
                        onRender: function(firstRun){
                            if(firstRun){
                                $(".schedule_video_call_ask_q").removeClass('collapsed').addClass('expanded');
                                var schedulerHeading = $(_.template($("#appointment-scheduler-heading-tmpl").html(), {scheduleEnabled: ASK_QUESTION_STATE.API.ask.items.scheduleEnabled}));
                                schedulerHeading.prependTo($(".schedule_video_call_ask_q_schedule").find(".expanded_head").eq(0));
                                schedulerHeading.find(".skip-btn").eq(0).click(function(){

                                    window.location.href = payUrl;
                                });
                                $(".schedule_video_call_ask_q_schedule").show();
                            }


                        },
                        onSlotSelection: function (date, timeslot, username) {

                            // render confirmation modal
                            var modal = $("#appointment-confirmation-modal");
                            timeslot = timeslot.split("-");
                            var data = {
                                username: $('a.choosen_doctor_ask_q[username='+ username +']').eq(0).attr('name'),
                                date: moment(parseInt(date)).format("ddd MMM DD"),
                                timeslot: moment(timeslot[0], ["HH:mm"]).format("h:mm A") + " - " + moment(timeslot[1], ["HH:mm"]).format("h:mm A"),
                            };
                            var modalBody = _.template($('#appointment-confirmation-modal-body-tmpl').html(), data);
                            modal.find(".modal-body").eq(0).empty().html(modalBody);

                            // handle confirmation
                            modal.find(".ok-btn").eq(0).off().click(function(){
                                // maybe we don't need to do this as they are already inside the closure
                                // var date = $(this).parents().find("div.timeslot-data-slug").eq(0).data('date');
                                // var timeslot = $(this).parents().find("div.timeslot-data-slug").eq(0).data('timeslot').split("-");
                                modal.modal('hide');
                                var startTime = {
                                    hour: timeslot[0].split(":")[0],
                                    minute: timeslot[0].split(":")[1]
                                };
                                var endTime = {
                                    hour: timeslot[1].split(":")[0],
                                    minute: timeslot[1].split(":")[1],
                                };
                                startTime = moment(parseInt(date)).hour(startTime.hour).minute(startTime.minute).format("x");
                                endTime = moment(parseInt(date)).hour(endTime.hour).minute(endTime.minute).format("x");
                                var data = {
                                    messageCode: ASK_QUESTION_STATE.API.ask.items.messageCode ,
                                    startTime: startTime,
                                    endTime: endTime,
                                    slotSelected: true,
                                    withPUID: ASK_QUESTION_STATE.API.ask.items.doctorPUid,
                                    source: "AskQuestionCheckout"
                                };
                                var ajaxUrl;
                                if(ASK_QUESTION_STATE.API.ask.items.consultType === "A"){
                                    ajaxUrl = '/rapidFire/book/audio/appointment';
                                } else if(ASK_QUESTION_STATE.API.ask.consultType === "V") {
                                    ajaxUrl = '/rapidFire/book/video/appointment';
                                } else {
                                    ajaxUrl = '/rapidFire/book/video/appointment';
                                }

                                $.ajax({
                                    url: ajaxUrl,
                                    type: "POST",
                                    data: JSON.stringify(data),
                                    contentType: 'application/json',
                                    dataType: 'json',
                                    success: function(res){

                                        if(!res.successful){
                                            var data = {
                                                serverResponse: res.message
                                            };
                                            var modalBody = $(_.template($("#server-response-negative-modal-body-tmpl").html(), data));
                                            var modal = $("#server-response-negative-modal");
                                            modal.find(".modal-body").eq(0).empty().append(modalBody);
                                            modal.find("button.cancel-btn").eq(0).off().click(function (e) {
                                                modal.modal('hide');
                                            });
                                            modal.modal('show');
                                        } else {
                                            var noPaymentRequired = res.videoAppointmentDTO.paymentUrl === null;
                                            if(noPaymentRequired){
                                                window.location.href = res.videoAppointmentDTO.conversationUrl;
                                            } else {
                                                modal = $("#appointment-confirmed-modal");
                                                modalBody = _.template(
                                                    $("#appointment-confirmed-modal-body-tmpl").html(),
                                                    {
                                                        scheduleEnabled: ASK_QUESTION_STATE.API.ask.items.scheduleEnabled,

                                                    });

                                                modal.find('.modal-body').eq(0).empty().append(modalBody);
                                                modal.find('.ok-btn').eq(0).click(function(){
                                                    modal.modal("hide");
                                                    // in case of payment already made redirect to conversation
                                                    var redirectUrl = res.videoAppointmentDTO.paymentUrl;
                                                    window.location.href = redirectUrl;
                                                });
                                                modal.modal("show");
                                            }
                                        }
                                    },
                                    error: function(res){
                                        console.log(res.message);

                                    }
                                });
                            }); // end of ok-btn listener
                            modal.find(".cancel-btn").eq(0).off().click(function(){

                                modal.modal('hide');
                            });
                            modal.modal('show');
                        }
                    });

                }

            } else{
                window.location.href = '/healthFeed?sm=ps.qna.success';
            }
        }
    });

    $(document).on('click','.show-optional-details', function(e) {
        e.preventDefault();
        var questionForPerson = $('input[name=askQuestionFor]:checked').val();
        if(questionForPerson === "self"){
            ga('send', 'event', 'Ask a Question', askQuestionFlow, 'Self_Specify_Height_Weight');
        } else{
            ga('send', 'event', 'Ask a Question', askQuestionFlow, 'SomeoneElse_Specify_Height_Weight');
        }
        $(this).hide();
        $('.optional-details').show();
    });

    $(document).on('click','.s_show_answer', function(e){
        e.preventDefault();
        var storyCode=$(this).attr("code");
        $('.s_answer[code="'+storyCode+'"').slideToggle();
        if ($.trim($(this).text()) === 'Show Answer') {
            ga('send', 'event', 'Ask a Question', askQuestionFlow, 'Viewed_Answer_for_Similar_Q');
            $(this).text('Hide Answer');
        } else {
            $(this).text('Show Answer');
        }
    });

    $(document).on('click','.s_q_status', function(e){
        e.preventDefault();
        $('.s_q_status').hide();
        $('.s_q_form_loader').show();
        var status = $(this).attr("status");
        var relativePatientId = $(this).attr("relativePatientId");
        var data = {'messageCode':$(this).attr("message-code")};
        if(status==="s_q_sat"){
            data['satisfied'] = true;
            ga('send', 'event', 'Ask a Question', askQuestionFlow, 'Similar_Satisfied');
        } else if(status==="s_q_dsat"){
            data['satisfied'] = false;
            ga('send', 'event', 'Ask a Question', askQuestionFlow, 'Similar_Unsatisfied');
        }
        var ajaxUrl = '/raven/s/with/similar/qs';

        $.ajax({url: ajaxUrl,type: "POST",dataType: 'json', data:data,
            success: function(response) {
                if(data['satisfied'] && response.status=="success"){
                    window.location.href = "/healthFeed";
                } else{
                    $('.s_q_status').show();
                    $('.s_q_form_loader').hide();
                    $('.showSimilarQuestions').hide();
                    $('.other_details').hide();
                    $('.second_step_onwards,.qna_conditions_form').show();
                    ObservationForm({'relativePatientId':relativePatientId});
                }
            },
            error: function(response) {
                $('.s_q_status').show();
                $('.s_q_form_loader').hide();
                Lybrate.Utils.showAlert('error','Something went wrong. Please try again.','.s_q_error_message');
            }
        });
    });
});
//gets the list of relatives
function getRelatives(){
    //var ajaxUrl = '/raven/get/patient/all/relatives/medical/info';
    //$.ajax({url: ajaxUrl,type: "POST",dataType: 'json',
    //    success: function(res){
    //        console.log(res)
    //    },
    //    error: function(){
    //        console.log(res);
    //    }
    //});

    var ajaxUrl = '/raven/get/patient/relatives/';
    $.ajax({url: ajaxUrl,type: "POST",dataType: 'json',
        success: function(response) {
            console.log(response);
            if (response.successful) {
                $('.askQuestionForName .radio').not(':first').remove();
                if(response.patientRelatives.length){
                    $.each(response.patientRelatives,function(key,val){
                        console.log(key);
                        console.log(val);
                        val['ageYears']=getNonNaNValue(parseInt(val.ageYears,10));
                        val['ageMonths']=getNonNaNValue(parseInt(val.ageMonths,10));
                        val['weight']=getNonNaNValue(parseInt(val.weight,10));
                        val['height']=getNonNaNValue(val.heightUnit=="CM"?parseInt(val.height,10):Lybrate.Utils.getNotNullValue(val.height));

                        $('.askQuestionForName').append(_.template($('#addedRelativeTemplate').html(),val));
                    });
                }
                $('.AddedRelatives').hide();
            } else {
                $('.AddedRelatives').html(response.message).show();
            }
        },
        error: function(response) {
            $('.AddedRelatives').html("Something Went Wrong.").show();
        }
    });
}

function checkLoginAskQuestion(){
    var askedQuestion = $.trim($('#question-AskQuestion').val());
    if(askedQuestion){
        /*$('#submitAskQuestionBtn, .top_doctors_helping, .showAskQuestion').hide();*/

        $('#askQuestionBlock').hide();
        $('.recent_q').removeClass('screenWide');
        $('#submitAskQuestionLoader').show();
        $('.modifyQuestionDiv .question_body').find('span').remove();
        $('.second_step_onwards').show();

        if(askedQuestion.length>75)
            $('.modifyQuestionDiv').show().find('.question_body').prepend('<span>'+askedQuestion.slice(0,70)+'... </span>');
        else
            $('.modifyQuestionDiv').show().find('.question_body').prepend('<span>'+askedQuestion+'</span>');
        if(isLoggedIn()){
            var isV3User = $('#loggedInUserInfo').data("v3-user");
            //add for new checkout flow
            $('.sign_in_options_ask_q').hide();
            $('.signInOptionFilled').show();
            $('.signedin_user').html($('#loggedInUserInfo').attr('name'));

            // ab diff cases.
            ab_diffCases();

            if($('.prepaid-enabled').val() === "true" && $('#loggedInUserInfo').data("v3-user")){
                $('.u_non_prepaid_text').hide();
                $('.u_text').show();
            }

            if($('#lybPageSource').attr("value") === "qna_checkout"){
                //isTestSubject(isV3User);
                //if(isV3User){
                //    var v3LybPageType = $('#lybPageType').attr('v3-lyb-page-type');
                //    $('#lybPageType').attr('value',v3LybPageType).attr('original-lyb-page-type',v3LybPageType);
                //}
                showSuggestedDoctorsModal();
                $(".showAskQuestion").hide();
                if($(".profile-slug").val()){
                    $(".exclusive_ask_q").trigger("click");
                }

            } else{
                if($(".profile-slug").val()){
                    $(".exclusive_ask_q").trigger("click");
                }
                hideStepQuestionType();
                renderAdditionalDetails();
            }
            return false;
        } else {
            renderSignInOption({'countryCode':$('#countryCodeTemplate').html(),'source':'askQuestion','uclmCode':''});
            return false;
        }
    } else {
        $(".patientAskQuestionError").html('Please enter your question').show();
    }
}

function renderAdditionalDetails(data){
    //getMedicalCondition(data);
    var qType = $('.showSignInOption').attr('q-type');
    if(data && data.username){
        var name = data.namePrefix + ' ' + data.doctorName;
        if($('.profile-slug').val()){
            $('.profile-slug').val(data.username);
        } else{
            $('body').append('<input type="hidden" class="profile-slug" value="'+data.username+'" />');
        }
        $('.choose_doctor_filled .ask_q_type').text('PRIME CONSULTATION ('+name+')');
        $('.choose_doctor_ask_q.expanded').addClass('collapsed').removeClass('expanded');
        $('.choose_doctor_ask_q').not('.expanded').hide();
        $('.choose_doctor_filled').show();

    }
    $('.additional_options_ask_q').removeClass('collapsed').addClass('expanded');
    $('.additional_options_ask_q_details').show();
    $(".showFillObservations").show();




    var loggedInUserInfo = $('#loggedInUserInfo').data();

    $('.askQuestionFor[value="self"]')
        .data("age-yrs", getNonNaNValue(parseInt(loggedInUserInfo["ageYrs"],10)))
        .data("age-mnths", getNonNaNValue(parseInt(loggedInUserInfo["ageMnths"],10)))
        .data("height", getNonNaNValue(loggedInUserInfo["heightUnit"]=="CM"?parseInt(loggedInUserInfo["height"],10):Lybrate.Utils.getNotNullValue(loggedInUserInfo["height"],10)))
        .data("height-unit", loggedInUserInfo["heightUnit"])
        .data("weight", getNonNaNValue(parseInt(loggedInUserInfo["weight"],10)))
        .data("weight-unit", loggedInUserInfo["weightUnit"])
        .data("gender", $('#loggedInUserInfo').attr('gender'))
        .data("occupation", loggedInUserInfo["occupation"])
        .data("line1", loggedInUserInfo["line1"])
        .data("city", loggedInUserInfo["city"]);

    $('.showAskQuestion').hide();
    $('.showUserLoginForm').hide();
    getRelatives();
    $('.showAskQuestionFor').show();

    $('#patient-vitals input[name="ageYears"]').val($(".askQuestionFor:checked").data("age-yrs"));
    $('#patient-vitals select[name="ageMonths"]').val($(".askQuestionFor:checked").data("age-mnths")?$(".askQuestionFor:checked").data("age-mnths"):"");
    $('#patient-vitals input[name="height"]').val($(".askQuestionFor:checked").data("height"));
    $('#patient-vitals select[name="heightUnit"]').val($(".askQuestionFor:checked").data("height-unit")?$(".askQuestionFor:checked").data("height-unit"):"FT");
    $('#patient-vitals input[name="height"]').unmask();
    if($(".askQuestionFor:checked").data("height-unit") == 'CM'){
        $('#patient-vitals input[name="height"]').mask("9?999");
    } else {
        $('#patient-vitals input[name="height"]').mask("9?.99");
    }

    $('#patient-vitals :input[name="city"]').val($(".askQuestionFor:checked").data("city"));
    $('#patient-vitals :input[name="occupation"]').val($(".askQuestionFor:checked").data("occupation"));
    $('#patient-vitals :input[name="line1"]').val($(".askQuestionFor:checked").data("line1"));

    $('#patient-vitals input[name="weight"]').val($(".askQuestionFor:checked").data("weight"));
    $('#patient-vitals select[name="weightUnit"]').val($(".askQuestionFor:checked").data("weight-unit")?$(".askQuestionFor:checked").data("weight-unit"):"KG");
//	$('#patient-vitals input[name="gender"]').removeAttr("checked");
    $('#patient-vitals input[name="gender"][value="'+($(".askQuestionFor:checked").data("gender")?$(".askQuestionFor:checked").data("gender"):'male')+'"]').trigger('click');
    $('#email-AskQuestion').val($('#loggedInUserInfo').attr('email'));


    if(qType === "STANDARD"){
        ga('send', 'event', 'Ask a Question', 'Login', 'Success-Standard Question');
    } else if(qType === "EXCLUSIVE"){
        ga('send', 'event', 'Ask a Question', 'Login', 'Success-Exclusive Question');
    }

    smoothScroll($('.additional_options_ask_q_details'));
    getMedicalCondition({patientRelativeId: null});
}

//Display observation form
function ObservationForm(data) {
    //$('.showAskQuestionFor').hide();
    //$('.showFillObservations').show();
    //$('.continue_qna_submit_btn').data('v3-user', data.paid).data('pay-url', data.payUrl);
    //smoothScroll($('.showFillObservations'));
    //getMedicalCondition(data); // TODO get medical condition data before hand
}


function triggerClickOnContinueBtn(data){
    if(data.paid !== null  && data.paid !== undefined && data.payUrl ){
        $('.continue_qna_submit_btn').data('v3-user',data.paid).data('pay-url',data.payUrl);
    }
    $('.continue_qna_submit_btn').trigger("click");
}

function similarQuestionsForm(data) {
    $('.s_q_status').attr("message-code",data.items.messageCode).data("relativePatientId",data.relativePatientId);
    $('.showVerifyMobile').hide();
    $('.showAskQuestion').hide();
    $('.showFillObservations').hide();
    $('.renderQuestionsTemplate').show();
    $('.showUserLoginForm').hide();
    $('.qna_completion_message').hide();
    $('.qna_conditions_form').hide();
    $('.modifyQuestionDiv').show();
    $('.modifyQuestionBtn').hide();
    $.each(data.items.healthStories,function(key,val){
        $(".showSimilarQuestions .similarQContainer").append(_.template($("#similarQItem").html(),val));
    });
    if($('.trimmer_read_less').length>0) {
        var slicePointVar;
        if($(this).attr('slicePoint') == undefined){
            slicePointVar = 80;
        } else {
            slicePointVar = $(this).attr('slicePoint');
        }
        var widowVar;
        if($(this).attr('widow') == undefined){
            widowVar = 4;
        } else {
            widowVar = $(this).attr('widow');
        }
        var expendTextVar;
        if($(this).attr('expandText') == undefined){
            expendTextVar = 'Read more';
        } else {
            expendTextVar = $(this).attr('expandText');
        }
        var userCollapseTextVar;
        if($(this).attr('userCollapseText') == undefined){
            userCollapseTextVar = 'Read less';
        } else {
            userCollapseTextVar = $(this).attr('userCollapseText');
        }
        $('.trimmer_read_less').expander({
            slicePoint : slicePointVar,
            widow : widowVar,
            expandEffect: 'slideDown',
            collapseEffect: 'slideUp',
            expandPrefix: ' ',
            expandText : expendTextVar,
            userCollapseText : userCollapseTextVar
        });
    }
    $('.showSimilarQuestions').show();
    smoothScroll($('.showSimilarQuestions'));
    ga('send', 'event', 'Ask a Question', askQuestionFlow, 'Similar_Visible');
}


function getMedicalCondition(data){
    // render display text based on relative name
    var relativeName = $('input[name=askQuestionFor]:checked').val();
    if (relativeName === "self"){
        relativeName = null;
    }
    $('.showFillObservations').empty().append(_.template($('#renderAskObservationTemplate').html(),{
        'spinnerPath': $('#spinnerPath').attr('spinnerPath'),
        relativeName: relativeName
    }));
    $("#submitAskQuestionForBtn").attr("q-type", ASK_QUESTION_STATE.API.question.type); // re establich this attribute

    if ($('.showFillObservations .addObservationBlock').length === 0){
        $('.showFillObservations').append(_.template($('#renderAddObservationTemplate').html(),{'spinnerPath':$('#spinnerPath').attr('spinnerPath')}));
    }

    var ajaxUrl = '/raven/get/patient/relative/medical/info';
    //var data = {'patientRelativeId':data.relativePatientId};

    $.ajax({url: ajaxUrl,type: "POST",dataType: 'json',data: data,
        success: function(response) {

            if (response.successful) {
                // for medicalconditions
                $('.conditionObsList').empty();
                $('.medicationObsList').empty();
                $('.allergyObsList').empty();
                if(response.medicalConditions.length > 0){
                    $.each(response.medicalConditions,function(key,val){
                        $('.conditionObsList').append(_.template($('#renderObservationListElement').html(),
                            {'obsId':val.id,'obsName':val.medicalConditionName,'sourceobs':'condition'}));
                    });
                }
                //for medicines
                if(response.medications.length > 0){
                    $.each(response.medications,function(key,val){
                        $('.medicationObsList').append(_.template($('#renderObservationListElement').html(),
                            {'obsId':val.id,'obsName':val.medicineMasterName,'sourceobs':'medication'}));
                    });
                }
                //for alergy
                if(response.allergies.length > 0){
                    $.each(response.allergies,function(key,val){
                        $('.allergyObsList').append(_.template($('#renderObservationListElement').html(),
                            {'obsId':val.id,'obsName':val.allergyName,'sourceobs':'allergy'}));
                    });
                }

            } else {
                console.log(response);
            }
            searchObservation();
        },
        error: function(response) {
            console.log(response)
        }
    });
}
//Initializing Search conditions
function searchObservation(){
    console.log("calling search Observation");
    var conditionEngine = new Bloodhound({
        name: 'conditions',
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        remote : {
            url : '/profile/medCon/search?keyword=%QUERY',
            cache : true,
            filter : function(response) {
                var datumArray = [];
                if(response.searchDTOs.length){
                    for ( var i = 0; i < response.searchDTOs.length; i++) {
                        var datum = {
                            'name' : response.searchDTOs[i].name,
                            'value' : response.searchDTOs[i].termForDisplay,
                            'id' : response.searchDTOs[i].id
                        };
                        datumArray.push(datum);
                    }
                } else {
                    $('#conditionId').val('');
                }

                return datumArray;
            }
        }
    });

    conditionEngine.initialize();
    $('#conditionName').typeahead({
            hint: false,
            highlight: true,
            minLength: 2
        },
        {
            name: 'conditions',
            displayKey: 'value',
            source: conditionEngine.ttAdapter(),
            templates: {
                suggestion: function(data){
                    return '<p><strong>' + data.value + '</strong></p>';
                }
            }
        }).on("typeahead:selected", function($e, datum) { //What to do on select
            if (datum['id'] !== undefined) {
                $('#conditionId').val(datum['id']);
            } else {
                $('#conditionId').val('');
            }
        });



    var medicineEngine = new Bloodhound({
        name: 'medicines',
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        remote : {
            url : '/profile/medicine/search?keyword=%QUERY',
            cache : true,
            filter : function(response) {
                var datumArray = [];
                if(response.searchDTOs.length){
                    for ( var i = 0; i < response.searchDTOs.length; i++) {
                        var datum = {
                            'name' : response.searchDTOs[i].name,
                            'value' : response.searchDTOs[i].termForDisplay,
                            'id' : response.searchDTOs[i].name
                        };
                        datumArray.push(datum);
                    }
                } else {
                    $('#medicationId').val('');
                }

                return datumArray;
            }
        }
    });

    medicineEngine.initialize();
    $('#medicationName').typeahead({
            hint: false,
            highlight: true,
            minLength: 2
        },
        {
            name: 'medications',
            displayKey: 'value',
            source: medicineEngine.ttAdapter(),
            templates: {
                suggestion: function(data){
                    return '<p><strong>' + data.value + '</strong></p>';
                }
            }
        }).on("typeahead:selected", function($e, datum) { //What to do on select
            if (datum['id'] !== undefined) {
                $('#medicationId').val(datum['id']);
            } else {
                $('#medicationId').val('');
            }
        });



    var allergyEngine = new Bloodhound({
        name: 'allergies',
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        remote : {
            url : '/profile/allergy/search?keyword=%QUERY',
            cache : true,
            filter : function(response) {
                var datumArray = [];
                if(response.searchDTOs.length){
                    for ( var i = 0; i < response.searchDTOs.length; i++) {
                        var datum = {
                            'name' : response.searchDTOs[i].name,
                            'value' : response.searchDTOs[i].termForDisplay,
                            'id' : response.searchDTOs[i].id
                        };
                        datumArray.push(datum);
                    }
                } else {
                    $('#allergyId').val('');
                }

                return datumArray;
            }
        }
    });

    allergyEngine.initialize();
    $('#allergyName').typeahead({
            hint: false,
            highlight: true,
            minLength: 2
        },
        {
            name: 'allergies',
            displayKey: 'value',
            source: allergyEngine.ttAdapter(),
            templates: {
                suggestion: function(data){
                    return '<p><strong>' + data.value + '</strong></p>';
                }
            }
        }).on("typeahead:selected", function($e, datum) { //What to do on select
            if (datum['id'] !== undefined) {
                $('#allergyId').val(datum['id']);
            } else {
                $('#allergyId').val('');
            }
        });
}

function renderAskQuestionFor()
{
    $('.showAskQuestion').hide();
    $('.showVerifyMobile').hide();
    $('.showUserLoginForm').hide();
    $('.showAskQuestionFor').show();
    $('.askQuestionFor[value="self"]').prop('checked','true');
    $('.patientAskQuestionForError').html();
    $('.addRelativeDetails, .AddedRelatives, .patientAskQuestionForError').hide();
}

function renderAskQuestionTemplate(source){
    var quesType = $('.profile-slug').val();
    if($('.showAskQuestion .renderAskQuestionItem').length === 0){
        if($('#lybPageSource') && $('#lybPageSource').attr('value') == 'qna_checkout') {
            //do nothing
            // ask Q form is hardcoded on checkout page but render for other locations
        } else {
            var data = {};
            _.defaults(data, {'textareaHeading':'What is your question?','submitAskQuestionBtn':'Submit','spinnerPath': $('spinnerPath').attr('spinnerPath'),'questionType': quesType});
            if(source){
                data.textareaHeading = "Enter Your Question";
                data.submitAskQuestionBtn = "Ask Now";
            }
            $('.showAskQuestion').append(_.template($('#renderAskQuestionTemplate').html(),data));
        }
    }
    if($('.showAskQuestionFor .renderAskQuestionFor').length === 0){
        $('.showAskQuestionFor').append(_.template($('#renderAskQuestionForTemplate').html(),
            {'spinnerPath': $('spinnerPath').attr('spinnerPath')}));

        // $('#patient-vitals input[type="text"]').not('input[name="height"]').mask("9?999");
        $('#patient-vitals input[name="ageYears"], #patient-vitals input[name="weight"]')
            .mask("9?999");

        $('#patient-vitals input[name="height"]').mask("9?.99");
        $('#patient-vitals select[name="heightUnit"]').on('change',function(){
            var value = $(this).val();
            if(value == "FT"){
                $('#patient-vitals input[name="height"]').unmask().mask("9?.99");
            } else if(value == "CM") {
                $('#patient-vitals input[name="height"]').unmask().mask("9?999");
            }
        });

        // configure the city typeahead. function defined in login.js
        configureCity();
    }
    if ($('.showFillObservations .renderQuestions').length === 0){
        var relativeName = $('input[name=askQuestionFor]:checked').val();
        if (relativeName === "self"){
            relativeName = null;
        }
        $('.showFillObservations').empty().append(_.template($('#renderAskObservationTemplate').html(),{
            'spinnerPath': $('#spinnerPath').attr('spinnerPath'),
            relativeName: relativeName
        }));
        //$("#submitAskQuestionForBtn").attr("q-type", ASK_QUESTION_STATE.API.question.type); //re establish this attribute

    }
    if ($('.showSimilarQuestions .similarQContainer').length === 0){
        $('.showSimilarQuestions').append(_.template($('#similarQContainer').html()));
        if ($('.showSimilarQuestions .similarQContainer').length != 0){
            if(!Lybrate.Utils.isMobileDeviceRequest()){
                $(window).scroll(function () {
                    if( $(window).scrollTop() < ($('.footer').offset().top - 350)){
                        $('.similar_q_bar').addClass('sticky-sidebar');
                    } else if ($(window).scrollTop() > ($('.footer').offset().top - 350)){
                        $('.similar_q_bar').removeClass('sticky-sidebar');
                    }
                });
            }else{
                $('.similar_q_bar').css('max-width','');
            }
        }
    }
    if ($('.showFillObservations .addObservationBlock').length === 0){
        $('.showFillObservations').append(_.template($('#renderAddObservationTemplate').html(),{'spinnerPath':$('#spinnerPath').attr('spinnerPath')}));
    }
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function getNonNaNValue(value){
    return (value == undefined || value == null || $.trim(value) == '' || value == 'null' || _.isNaN(value)) ? '':value;
}

function smoothScroll(target) {
    var l_offset = target.offset().top;
    $('html,body').animate({
        scrollTop: l_offset
    }, 700);

}

function fireEventConversionPixel(event, eventId) {
    var data = {'event': event, 'eventId': eventId};
    $.ajax({url: "/get/event/conversion/pixel", type: "POST",dataType: 'json',data: data,
        success: function(response) {
            if (response.status == 'success' || response.successful == true ) {
                if(response.items && response.items['cp']) {
                    $('#eventConversionPixelId').html(response.items['cp'])
                }
            } else{
                //donothing
            }
        }
    });
}


function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
        function(m,key,value) {
            vars[key] = value;
        });
    return vars;
}


function getDoctorwithSpeciality(){
	var speciality = $('#recent-q-speciality').val();
	if(speciality=='false'){
		speciality = ""
	}
    $.ajax({url: "/raven/get/top/doctors?maxResults=4&speciality="+speciality, type: "GET",dataType: 'json',
        success: function(response) {
        	if(response.specility && response.ggDoctors.length > 0){
        		$('.top_doctors_helping').html(doctorTempl(response)).show();
        	}else{
        		$('.top_doctors_helping').hide();
        	}
        }
    });
}

function doctorTempl(data){
	var html = "";
	html+="<div class='row-fluid'><div class='span12 h_center'>Top "+data.specility+" Helping Patients</div></div><div class='row-fluid feature'>";
	$.each(data.ggDoctors,function(key,val){
	    html+="<div class='span3'><span class='fleft'>";

	    if(val.profilePicPath){
	    	html+="<a href='/"+val.preSlugUrl+"/doctor/"+val.username+"' class='small_pic'><img class='photo small_pic' src='"+val.profilePicPath+"' alt='"+val.doctorName+"'></a>";
	    }else{
	    	html+="<div class='empty_pic'><a href='/"+val.preSlugUrl+"/doctor/"+val.username+"' class='c_red'>"+val.nameInitials+"</a></div>";
	    }

	    html+="</span><div class='name_block_small_img'>" +
	    		"<a href='/questions/ask?u="+val.username+"&amp;lpt=PS-AQP'>"+val.namePrefix+"&nbsp;"+val.doctorName+"</a><div>"+val.speciality+"</div>";
	    if(val.experience && val.experience > 0){
	    	html+="<div>"+val.experience+"&nbsp;"+(val.experience > 1 ? 'Years':'Year')+"</div>";
	    }
	    html+="</div></div>";
	});
	html+="</div>";

	return html;
}
