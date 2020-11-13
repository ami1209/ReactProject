/**
 * Created by vijay on 08/05/17.
 */
console.log("Gateway Script loaded");
var qmodel = document.getElementById('quaggaModal');
const QUAGGA_BASE_URL = 'https://api.quagga.in';
const SUPPORTED_DEVICES = ['SHP20', 'MFS100', 'MSO1300', 'SHP20N'];

function isNullUndefinedOrEmpty(paramToCheck) {
    return typeof paramToCheck === 'undefined' || paramToCheck === null || paramToCheck.length === 0;
}

var AadhaarAPIGateway = function(gateway_transaction_id, gatewayOptions) {

    if(isNullUndefinedOrEmpty(gateway_transaction_id)) {
        throw new Error('Gateway Transaction Id is mandatory to initiate gateway.');
    }

    if(isNullUndefinedOrEmpty(gatewayOptions.company_display_name)) {
        throw new Error('Company Display Name is mandatory in gateway options.');
    }

    if(isNullUndefinedOrEmpty(gatewayOptions.consent_purpose)) {
        throw new Error('Consent Purpose is mandatory in gateway options.');
    }

    if(gatewayOptions.default_device && SUPPORTED_DEVICES.indexOf(gatewayOptions.default_device) === -1) {
        throw new Error('Invalid default device value. Please check documentation for valid values');
    }

    this.gateway_url = QUAGGA_BASE_URL + '/gateway/';
    this.gateway_transaction_id = gateway_transaction_id;
    this.company_display_name = gatewayOptions.company_display_name;
    this.consent_purpose = gatewayOptions.consent_purpose;
    this.color_bg = gatewayOptions.background_color || null;
    this.color_ft = gatewayOptions.front_text_color || null;
    this.mobile_email_required = gatewayOptions.mobile_email_required || 'n';
    this.logo_url = gatewayOptions.logo_url || null;
    this.otp_mode = gatewayOptions.otp_allowed || null;
    this.fp_mode = gatewayOptions.fingerprint_allowed || null;
    this.default_device = gatewayOptions.default_device || null;
    this.device_selection_allowed = gatewayOptions.device_selection_allowed || null;
};

function openAadhaarGateway(gateway) {

    //TODO: show loading icon

    var gatewayURI = '' + gateway.gateway_url
        + gateway.gateway_transaction_id + '?';

    if(gateway.company_display_name !== null){
        gatewayURI += '&company_display_name=' +gateway.company_display_name;
    }

    if(gateway.consent_purpose !== null){
        gatewayURI += '&consent_purpose=' + gateway.consent_purpose;
    }

    if(gateway.color_bg !== null) {
        gatewayURI += '&color_bg=' + gateway.color_bg;
    }

    if(gateway.color_ft !== null) {
        gatewayURI += '&color_ft=' + gateway.color_ft;
    }

    if(gateway.otp_mode !== null) {
        gatewayURI += '&otp_mode=' + gateway.otp_mode;
    }

    if(gateway.fp_mode !== null) {
        gatewayURI += '&fp_mode=' + gateway.fp_mode;
    }

    if(gateway.default_device !== null) {
        gatewayURI += '&device=' + gateway.default_device;
    }

    if(gateway.device_selection_allowed !== null) {
        gatewayURI += '&can_select_device=' + gateway.device_selection_allowed;
    }

    gatewayURI +='&mobile_email_req=' + gateway.mobile_email_required
        + '&logo_url=' + gateway.logo_url;

    //console.logencodeURI(gatewayURI));

    document.getElementById('quaggaModelContent').innerHTML
        = '<iframe id="quagga-gateway-iframe" height="100%" width="100%" src="'
        + encodeURI(gatewayURI)
        +'"></iframe>';
    //console.log'opening gateway');
    //TODO: show loading icon till the gateway is loaded.
    qmodel.style.display = "block";
}

//Listen to close gateway action
console.log('Adding message listener to parent window');
window.addEventListener('message', receiveMessage, false);

function receiveMessage(event) {
    if (event.origin !== QUAGGA_BASE_URL) {
        //console.log"Message is not from Quagga Gateway");
        return;
    }

    //Extracting message from event
    var message = event.data;

    //Do nothing if there is not message
    if (!message) {
        return;
    }

    //handle 'close'
    if (message.action === 'close') {
        qmodel.style.display = 'none';
        document.getElementById('quaggaModelContent').innerHTML = '';
        handleGatewayTermination();
    }

    //handle 'consent-denied'
    if (message.action === 'consent-denied') {
        qmodel.style.display = 'none';
        document.getElementById('quaggaModelContent').innerHTML = '';
        handleAadhaarConsentDenied();
    }

    //handle 'auth-result'
    if (message.action === 'auth-result') {
        qmodel.style.display = 'none';
        document.getElementById('quaggaModelContent').innerHTML = '';
        if (message.isError) {
            handleAadhaarAUTHFailure(message.payload);
        } else {
            handleAadhaarAUTHSuccess(message.payload);
        }
    }

    //handle 'ekyc-result'
    if (message.action === 'ekyc-result') {
        qmodel.style.display = 'none';
        document.getElementById('quaggaModelContent').innerHTML = '';
        if (message.isError) {
            handleAadhaarEKYCFailure(message.payload);
        } else {
            handleAadhaarEKYCSuccess(message.payload);
        }
    }

    //handle 'otp-error'
    if (message.action === 'otp-error') {
        qmodel.style.display = 'none';
        document.getElementById('quaggaModelContent').innerHTML = '';
        handleAadhaarOTPFailure(message.payload);
    }

    //handle 'gateway-error'
    if (message.action === 'gateway-error') {
        qmodel.style.display = 'none';
        document.getElementById('quaggaModelContent').innerHTML = '';
        handleGatewayError(message.payload);
    }
}

//When the user clicks anywhere outside of the qmodel, close it
// window.onclick = function(event) {
//    if (event.target === qmodel) {
//        qmodel.style.display = "none";
//    }
// };


