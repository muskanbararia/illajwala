<script type="text/x-underscore" id="patientDropdownTemplate">
        <div class="btn-group patient_dropdown" style="font-size: inherit;white-space:inherit;vertical-align: inherit;">
            <a class="header-right-link not-first dropdown-toggle" data-toggle="dropdown" href="#">
                <@=name@> <b class="caret"></b>
            </a>
            <ul class="dropdown-menu" style="left:auto;right:0">
                <li>
                    <a class="c_red" href="/myQuestions">My Questions</a>
                </li>
                <li>
                    <a class="c_red" href="index.html">Logout</a>
                </li>
            </ul>
        </div>
    </script>

    <div id="loggedInUserInfoOuter">

    </div>
<div style="position:fixed;bottom: 0;background-color: #f8f8f8;width: 100%;border-bottom: 1px solid #f0f0f0;color: #27415A;
 display: none;z-index:1060;" class="patient_app_promo_header">
        <div class="container">
            <div class="row-fluid">
                <div class="span12">
                    <div class="left_content" style="margin: 0 75px 0 0px;padding: 10px 0px 10px;">
                        <div style="font-size: 12px;line-height: 16px;margin: 0;padding: 0;font-weight:bold;">
                            <div id="mobileAppLinkHead">

                                Lybrate for <span class="platform_name"></span>

                            </div>
                            <div id="mobileAppLinkSubHead" style="font-size: 12px;font-weight: normal;margin: 0;">

                                Available free in the <span class="platform_store_name"></span>

                            </div>
                        </div>
                    </div>
                    <div class="right-content" style="width: 65px;right: 0;margin-top: -40px;float: right;top: 0;">
                        <a class="btn btn-danger platform_url" variant="'On mobile">Install</a>
                    </div>
                </div>
            </div>
        </div>
        <input type="hidden" class="iphone_url" url="http://app.appsflyer.com/id960716567?pid=LybrateMobile" />
        <input type="hidden" class="android_url" url="http://app.appsflyer.com/com.lybrate.phoenix?pid=LybrateMobile" />
    </div>