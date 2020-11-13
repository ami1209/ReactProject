/* PLEASE MAKE SURE JAVASCRIPT FILE SIZE DO NOT EXCEED MORE THAN 50KB OTHERWISE SCRIPT WILL NOT ALLOWED TO BE EXECUTED BY AMP */

/* #########################  APPSFLYER WORK STARTS HERE  ######################################## */

//Returns the value of a parameter existing in the page's URL or ' ' if not exists.
let allMobileCases = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    }
};

function isMobilecheck() {
    if(allMobileCases.Android())
        return true
    else if(allMobileCases.BlackBerry())
        return true;
    else if(allMobileCases.iOS())
        return true;
    else if(allMobileCases.Opera())
        return true;
    else if(allMobileCases.Windows())
        return true;
    else
        return false;
}



function getParameterFromURL(name, url) {
    var amp = 'undefined';
    if(document.getElementById('amp_base_url_with_utm_params')){
        amp=document.getElementById('amp_base_url_with_utm_params').textContent;
    }

    if(!url) url = window.location.href;
    if(amp) url = amp;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


function isMobileDevice() {
    return ( (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1) ||  isMobilecheck() );
}

function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (userAgent) {
        if (/android/i.test(userAgent)) {
            return "Android";
        }

        // iOS detection from: http://stackoverflow.com/a/9039885/177710
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            return "iOS";
        }
    }
    return "unknown";
}

function isAFLink() {
    return getParameterFromURL('af_redirect');
}

function isFacebook() {
    if (document.referrer && document.referrer != "") {
        return document.referrer.toLowerCase().includes('facebook');
    } else {
        return false;
    }
}

// generateUrl returns the URL to use behind the iOS and Android "Download" buttons on a landing page, based on the source of the page visitor.
// By default these buttons should direct to the apps' pages on iTunes and Google Play.
// If these links should be kept with no change, generateUrl returns ' '.
// Otherwise, generateUrl returns the URL to be used under BOTH buttons (a single app download button could also be used in this case).
// Parameters: isDebug - if true, alerts are issued for each of the cases, otherwise not.
function generateUrl(isDebug) {
    var oneLinkURL = 'https://khelplayrummy.onelink.me/2977213167';   // **** Replace with your own basic OneLink URL ****
    var webFormURL = 'https://www.khelplayrummy.com/mobile-rummy-app';
    var finalURL = "";
    var partnerIDParam = '?pid=';
    var channelValue; // define a variable to capture channel value
    var channelParam = '&af_channel=' // variable to build appsflyer tracking link channel parameter
    var adsetValue;
    var adsetParam='&af_adset=';
    var adValue;
    var adParam='&af_ad=';
    var ad_idValue;
    var ad_idParam ='&af_ad_id=';
    var adpostionValue;
    var adpostionParam ='&af_sub1=';
    var adset_idValue;
    var adset_idParam ='&af_adset_id=';
    var c_idValue;
    var c_idParam ='&af_c_id=';
    var placementValue;
    var placementParam='&af_sub3=';



    var campaignValue;
    if (getParameterFromURL('af_c')) {
        campaignValue = getParameterFromURL('af_c');
    } else if (getParameterFromURL('utm_campaign')) {
        campaignValue = getParameterFromURL('utm_campaign');
    } else if (document.getElementsByTagName('title')[0]) {
        campaignValue = document.getElementsByTagName('title')[0].innerText;
    } else {
        campaignValue = 'unknown';
    }

    var campaignParam = '&c=';
    var gclidParam = '&af_sub2=';
    var gclidValue = getParameterFromURL('gclid');
    var kwParam = '&af_keywords=';
    var pidValue;
    var kwValue = getParameterFromURL('keyword');

    if (getParameterFromURL('af_pid')) {
        pidValue = getParameterFromURL('af_pid');
    } else if (getParameterFromURL('utm_source')) {
        pidValue = getParameterFromURL('utm_source');
    }

    if (getParameterFromURL('utm_medium')) {
        channelValue = getParameterFromURL('utm_medium');
        channelParam += channelValue;
    }

    if (getParameterFromURL('utm_term')) {
        adsetValue = getParameterFromURL('utm_term');
        adsetParam +=adsetValue;
    }

    if (getParameterFromURL('utm_content')) {
        adValue = getParameterFromURL('utm_content');
        adParam +=adValue;
    }

    if (getParameterFromURL('creativeid')) {
        ad_idValue = getParameterFromURL('creativeid');
        ad_idParam +=ad_idValue;
    }

    if (getParameterFromURL('adposition')) {
        adpostionValue = getParameterFromURL('adposition');
        adpostionParam +=adpostionValue;
    }

    if (getParameterFromURL('adgroupid_campid')) {
        adset_idValue = getParameterFromURL('adgroupid_campid').split('_');
        adset_idParam +=adset_idValue[0];

        c_idValue = adset_idValue[1];
        c_idParam +=c_idValue;
    }

    if(getParameterFromURL('adgroupid'))
    {
        adset_idValue = getParameterFromURL('adgroupid');
        adset_idParam +=adset_idValue;
    }

    if(getParameterFromURL('campid'))
    {
        c_idValue = getParameterFromURL('campid');;
        c_idParam +=c_idValue;
    }


    if (getParameterFromURL('placement')) {
        placementValue = getParameterFromURL('placement');
        placementParam +=placementValue;
    }

    // Prevent the use of real SRN names. Remove this part after you are done testing the script.
    var SRNs = [
        'twitter_int',
        'facebook_int',
        'snapchat_int',
        'doubleclick_int',
        'yahoogemini_int',
        'yahoojapan_int',
    ];

    if (SRNs.includes(pidValue)) {
        alert("DO NOT USE NAMES OF SRNS IN af_pid or utm_source - use the names listed in Other SRNs: Add Parameter section in the landing page article\nhttps://support.appsflyer.com/hc/en-us/articles/360000677217#other-srns-add-parameter");
        return;
    }
    // Desktop user


    if (!isMobileDevice()) {
        return webFormURL;
    }

    // User was redirected using af_r parameter on an AppsFlyer attribution link
    if (isAFLink()) {
        if (isDebug) {
            alert("This user comes from AppsFlyer by redirection and is ready to be attributed. \nKeep direct app store links.");
        }
        return; // in this case, the original store links in the install buttons stay the same

        /*
        If you want one install button in the landing page that serves both iOS and Android, uncomment the code below
        The code identifies the operating system and returns the relevant direct link to Google Play or iTunes

        if (getMobileOperatingSystem() === 'Android') {
          return 'direct link to Google Play';
        }

        if (getMobileOperatingSystem() === 'iOS') {
          return 'direct link to iTunes';
        }
        */
    }

    if(pidValue){pidValue.toLowerCase();}
    // Google Ads
    if (gclidValue || ( pidValue=== 'google')) {
        partnerIDParam += 'Google';
        campaignParam += campaignValue;
        gclidParam += gclidValue;
        if (!kwValue) {
            finalURL = oneLinkURL + partnerIDParam + campaignParam + gclidParam + channelParam + adsetParam + adParam + ad_idParam + adpostionParam + adset_idParam + c_idParam + placementParam;

            if (isDebug) {
                alert("This user comes from Google AdWords\n " + finalURL);
            }
            return finalURL;

        } else { // Google Ads with KW
            kwParam += kwValue;
            finalURL = oneLinkURL + partnerIDParam + campaignParam + gclidParam + kwParam +channelParam + adsetParam + adParam + ad_idParam + adpostionParam + adset_idParam + c_idParam + placementParam;
            if (isDebug) {
                alert("This user comes from Google AdWords - there is a keyword associated with the ad\n " + finalURL);
            }
            return finalURL;
        }

    } else if (isFacebook() || pidValue === 'facebook') {
        partnerIDParam += 'Facebook';
        campaignParam += campaignValue;
        gclidParam += gclidValue
        finalURL = oneLinkURL + partnerIDParam + campaignParam + gclidParam + channelParam + adsetParam + adParam + ad_idParam + adpostionParam + adset_idParam + c_idParam + placementParam;
        if (isDebug) {
            alert(finalURL);
        }
        return finalURL;

        // Other SRNs and custom networks
    } else if (pidValue) {
        campaignParam += campaignValue;
        partnerIDParam += pidValue;
        finalURL = oneLinkURL + partnerIDParam + campaignParam + channelParam + adsetParam + adParam + ad_idParam + adpostionParam + adset_idParam + c_idParam + placementParam;
        if (isDebug) {
            alert("This user comes the SRN or custom network " + pidValue + "\n" + finalURL);
        }
        return finalURL;

    } else { // organic mobile user
        campaignParam += campaignValue;
        partnerIDParam += 'website'; //**** Replace value if you wish organic users to be attributed to another media source than 'website' ****
        finalURL = oneLinkURL + partnerIDParam + campaignParam + channelParam + adsetParam + adParam + ad_idParam + adpostionParam + adset_idParam + c_idParam + placementParam;
        if (isDebug) {
            alert("This user comes from an unknown mobile source.\n The user would be attributed to media source 'website' and to the campaign " + campaignParam + "\n" + finalURL);
        }
        return finalURL;
    }
}

function replaceOneLink() {
    let url = generateUrl(false);
    let isAppsflyerOn=document.getElementById('store_link').getAttribute('data-appsflyer');
    let defaultLink=document.getElementById('store_link').getAttribute('href');
    if(document.querySelector('#store_link') && (isAppsflyerOn == true || isAppsflyerOn == "true"))
        document.querySelector('#store_link').setAttribute('href', url);
    else
        document.querySelector('#store_link').setAttribute('href', defaultLink);

}

(function() {
    //for AMP pages which has this field
    if(document.getElementById('amp_base_url_with_utm_params') && document.getElementById('store_link')) {
        replaceOneLink();
    }
})();



/* #########################  APPSFLYER WORK ENDS HERE  ######################################## */


/* #########################  LOGIN WIDGET WORK STARTS HERE  ######################################## */

var allSubmitButtonsButtons = document.querySelectorAll('.amp-mandatory-submit-btn-class');

var allUserNames = document.querySelectorAll('.amp-mandatory-username-class');
var allPasswordNames = document.querySelectorAll('.amp-mandatory-password-class');


function validateUserNameAndPasswordValue(aObj){

    if(typeof aObj.form_number !== 'undefined')
    {
        let iFormNumber = aObj.form_number;
        let iLoginFormCount = allSubmitButtonsButtons[iFormNumber].getAttribute('data-login_form_count');

        document.querySelector('.less-or-more-username-character-error-msg-'+iLoginFormCount).innerHTML = '';
        document.querySelector('.less-or-more-password-character-error-msg-'+iLoginFormCount).innerHTML = '';

        let sUserNameValue = document.getElementById('userName_email-'+iLoginFormCount).value;
        let sPasswordValue = document.getElementById('password-'+iLoginFormCount).value;

        if(sUserNameValue != '' && (sUserNameValue.length < 5 || sUserNameValue.length > 50) && /^[a-zA-Z0-9@._-]*$/.test(sUserNameValue))
        {
            document.querySelector('.less-or-more-username-character-error-msg-'+iLoginFormCount).innerHTML = '<span class="visible">5 to 50 characters are allowed for this field.</span>';
        }
        else if(sPasswordValue != '' && (sPasswordValue.length < 6 || sPasswordValue.length > 30) && /^([\S]+(\s?)+[\S]+)+$|^((\s?)+[\S]+(\s?)+)+$/.test(sPasswordValue))
        {
            document.querySelector('.less-or-more-password-character-error-msg-'+iLoginFormCount).innerHTML = '<span class="visible">6 to 30 characters are allowed for password</span>';
        }

    }

}

(function() {
    for (let i = 0; i < allSubmitButtonsButtons.length; i++)
    {
        allSubmitButtonsButtons[i].addEventListener("click",function(e){
            let aObj = {form_number : i};
            validateUserNameAndPasswordValue(aObj);

        },false);
    }

    for (let i = 0; i < allUserNames.length; i++)
    {
        allUserNames[i].addEventListener("input",function(e){
            let aObj = {form_number : i};
            validateUserNameAndPasswordValue(aObj);

        },false);
    }

    for (let i = 0; i < allPasswordNames.length; i++)
    {
        allPasswordNames[i].addEventListener("input",function(e){
            let aObj = {form_number : i};
            validateUserNameAndPasswordValue(aObj);

        },false);
    }


})();



/* #########################  LOGIN WIDGET WORK ENDS HERE  ######################################## */



/* #########################  REGISTRATON WIDGET WORK STARTS HERE  ######################################## */

var allRegistrationForms = document.querySelectorAll('.amp-mandatory-registration-form-class');
var allRegistrationSubmitBtn = document.querySelectorAll('.amp-mandatory-registration-submit-btn-class');
var allRegistrationOtpEnabledOrNot = document.querySelectorAll('.otp-enable-field');
var allWidgetTypeFlagFields = document.querySelectorAll('.widgetTypeFlag');
var allRegistrationUserNames = document.querySelectorAll('.amp-mandatory-registration-username-class');
var allRegistrationUserInfos = document.querySelectorAll('.amp-mandatory-registration-userinfo-class');
var allRegistrationEmails = document.querySelectorAll('.amp-mandatory-registration-email-class');
var allRegistrationPasswords = document.querySelectorAll('.amp-mandatory-registration-password-class');
var allRegistrationMobiles = document.querySelectorAll('.amp-mandatory-registration-mobile-class');
var allRegistrationRefererCodes = document.querySelectorAll('.amp-mandatory-registration-referercode-class');
var allRegistrationStates = document.querySelectorAll('.amp-mandatory-registration-state-class');


if(allRegistrationUserInfos.length && allRegistrationUserInfos.length != 0)
{
    for (let i = 0; i < allRegistrationForms.length; i++)
    {
        allRegistrationUserInfos[i].addEventListener("input",function(e){
            let aObj = {form_number : i};
            validateRegistrationForm(aObj);

        },false);
    }

}


if(allRegistrationSubmitBtn.length && allRegistrationSubmitBtn.length != 0)
{
    for (let i = 0; i < allRegistrationForms.length; i++)
    {
        allRegistrationSubmitBtn[i].addEventListener("click",function(e){
            let aObj = {form_number : i};
            validateRegistrationForm(aObj);

        },false);
    }

}

if(allRegistrationEmails.length && allRegistrationEmails.length != 0)
{
    for (let i = 0; i < allRegistrationForms.length; i++)
    {

        allRegistrationEmails[i].addEventListener("input",function(e){
            let aObj = {form_number : i};
            validateRegistrationForm(aObj);

        },false);
    }

}

if(allRegistrationPasswords.length && allRegistrationPasswords.length != 0)
{
    for (let i = 0; i < allRegistrationForms.length; i++)
    {
        allRegistrationPasswords[i].addEventListener("input",function(e){
            let aObj = {form_number : i};
            validateRegistrationForm(aObj);

        },false);
    }
}

if(allRegistrationMobiles.length && allRegistrationMobiles.length != 0)
{
    for (let i = 0; i < allRegistrationForms.length; i++)
    {
        allRegistrationMobiles[i].addEventListener("input",function(e){
            let aObj = {form_number : i};
            validateRegistrationForm(aObj);

        },false);
    }
}


if(allRegistrationUserNames.length && allRegistrationUserNames.length != 0)
{
    for (let i = 0; i < allRegistrationForms.length; i++)
    {
        allRegistrationUserNames[i].addEventListener("input",function(e){
            let aObj = {form_number : i};
            validateRegistrationForm(aObj);

        },false);
    }
}



function validateRegistrationForm(aObj)
{
    if(typeof aObj.form_number !== 'undefined')
    {

        let iFormNumber = aObj.form_number;
        if(typeof allWidgetTypeFlagFields[iFormNumber] !== 'undefined')
        {
            if(typeof allRegistrationUserNames[iFormNumber] !== 'undefined')
                validateRegistrationUserName(aObj);
            if(typeof allRegistrationPasswords[iFormNumber] !== 'undefined')
                validateRegistrationPassword(aObj);
            if(typeof allRegistrationUserInfos[iFormNumber] !== 'undefined')
                validateRegistrationUserInfo(aObj);
            if(typeof allRegistrationEmails[iFormNumber] !== 'undefined')
                validateRegistrationEmail(aObj);
            if(typeof allRegistrationMobiles[iFormNumber] !== 'undefined')
                validateRegistrationMobile(aObj);
        }


    }
}


function validateRegistrationUserInfo(aObj)
{
    let isValidUserInfo = false;
    if(typeof aObj.form_number !== 'undefined')
    {
        isValidUserInfo = true;
        let iFormNumber = aObj.form_number;
        let reg_form_count = allRegistrationSubmitBtn[iFormNumber].getAttribute('data-reg_form_count');
        document.getElementById('error_userInfo-'+reg_form_count).innerHTML = '';

        if(typeof allRegistrationUserInfos[iFormNumber] !== 'undefined')
        {
            let sPassword = allRegistrationUserInfos[iFormNumber].value;
           if(sPassword != '' && !/^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+){0,5})@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+){0,1})\.([A-Za-z]{2,})$|([5-9]{1}[0-9]{9})+$/.test(sPassword))
            {
                isValidUserInfo = false;
                document.getElementById('error_userInfo-'+reg_form_count).innerHTML = '<span class="visible">Please enter valid Email/Mobile.</span>';
            }
	    else if(sPassword != '' && (sPassword.length > 10 && !/^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+){0,5})@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+){0,1})\.([A-Za-z]{2,})$/.test(sPassword)))
            {
                isValidUserInfo = false;
                document.getElementById('error_userInfo-'+reg_form_count).innerHTML = '<span class="visible">Please enter valid Email/Mobile.</span>';

            }
        }

    }

    return isValidUserInfo;

}


function validateRegistrationPassword(aObj)
{
    let isValidPassword = false;
    if(typeof aObj.form_number !== 'undefined')
    {
        isValidPassword = true;
        let iFormNumber = aObj.form_number;
        let reg_form_count = allRegistrationSubmitBtn[iFormNumber].getAttribute('data-reg_form_count');
        document.getElementById('error_reg_password-'+reg_form_count).innerHTML = '';
        if(typeof allRegistrationPasswords[iFormNumber] !== 'undefined')
        {
            let sPassword = allRegistrationPasswords[iFormNumber].value;
            if(sPassword !== '' && (sPassword.length < 6 || sPassword.length > 50) && /^([\S]+(\s?)+[\S]+)+$|^((\s?)+[\S]+(\s?)+)+$/.test(sPassword))
            {
                isValidPassword = false;
                document.getElementById('error_reg_password-'+reg_form_count).innerHTML = '<span class="visible">This field can only contain 6 to 30 characters!</span>';
            }
        }

    }

    return isValidPassword;

}

function validateRegistrationMobile(aObj)
{
    let isValidMobile = false;
    if(typeof aObj.form_number !== 'undefined')
    {
        isValidMobile = true;
        let iFormNumber = aObj.form_number;
        let reg_form_count = allRegistrationSubmitBtn[iFormNumber].getAttribute('data-reg_form_count');
        document.getElementById('error_mobile-'+reg_form_count).innerHTML = '';
        if(typeof allRegistrationEmails[iFormNumber] !== 'undefined')
        {
            let sMobile = allRegistrationMobiles[iFormNumber].value;
            if(sMobile !== '' && (sMobile.length < 10 || sMobile.length > 10) && /^[5-9]{1}[0-9]{9}$/.test(sMobile))
            {
                isValidMobile = false;
                document.getElementById('error_mobile-'+reg_form_count).innerHTML = '<span class="visible">Mobile number can only 10 characters!</span>';
            }
        }


    }

    return isValidMobile;

}

function validateRegistrationEmail(aObj)
{

    let isValidEmail = false;
    if(typeof aObj.form_number !== 'undefined')
    {
        isValidEmail = true;
        let iFormNumber = aObj.form_number;
        let reg_form_count = allRegistrationSubmitBtn[iFormNumber].getAttribute('data-reg_form_count');
        document.getElementById('email_error-'+reg_form_count).innerHTML = '';
        if(typeof allRegistrationEmails[iFormNumber] !== 'undefined')
        {
            let sEmail = allRegistrationEmails[iFormNumber].value;
           if(sEmail !== '' && (sEmail.length < 3 || sEmail.length > 50) && /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+){0,5})@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+){0,1})\.([A-Za-z]{2,})$/.test(sEmail))
            {
                isValidEmail = false;
                document.getElementById('email_error-'+reg_form_count).innerHTML = '<span class="visible">This field can only contain 5 to 30 characters!</span>';
            }
        }
    }
   return isValidEmail;
}


function validateRegistrationUserName(aObj)
{
    let isValidUserName = false;
    if(typeof aObj.form_number !== 'undefined')
    {
        isValidUserName = true;
        let iFormNumber = aObj.form_number;
        let reg_form_count = allRegistrationSubmitBtn[iFormNumber].getAttribute('data-reg_form_count');
        document.getElementById('error_userName-'+reg_form_count).innerHTML = '';
        if(typeof allRegistrationUserNames[iFormNumber] !== 'undefined')
        {
            let sUserName = allRegistrationUserNames[iFormNumber].value;
            if(sUserName !== '' && (sUserName.length < 5 || sUserName.length > 21) && /^[A-Za-z0-9](([_\\.\\-]?[a-zA-Z0-9]+)*)$/.test(sUserName))
            {
                isValidUserName = false;
                document.getElementById('error_userName-'+reg_form_count).innerHTML = '<span class="visible">Username can only contain 5 to 21 characters!</span>';
            }
        }

    }
    return isValidUserName;

}






/* #########################  REGISTRATON WIDGET WORK ENDS HERE  ######################################## */

