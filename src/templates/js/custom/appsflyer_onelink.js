//Returns the value of a parameter existing in the page's URL or ' ' if not exists.
var $=jQuery.noConflict();
function getParameterFromURL(name, url) {
    if(!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
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
    var sCurrentUrl = window.location.pathname;
    if(sCurrentUrl && sCurrentUrl === '/multi-table-app')
         oneLinkURL = "https://khelplayrummy.onelink.me/ixAw";
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
        gclidParam += gclidValue
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

$(document).ready(function () {
    let url = generateUrl(false);
    document.getElementById('store_link').setAttribute('href', url);

});
