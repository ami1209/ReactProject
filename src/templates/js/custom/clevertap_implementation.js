function clevertapPageView(name,username,url,prlId,email,mobile,fname,lname,gender,dob,regState,regCity,pincode,emailV,mobileV,Ola,status,photo,cashBal,campaign,alias,clientType,device,deviceType,firstDepositDate,os,pageName,domainName,refer,regDate,regIP,OSVersion,lastLoginDate){

    // if((window.location.href!='/select-amount'))
    // {
    //     return;
    // }
    domainName = domainName.replace("https://", "");
    domainName = domainName.replace("http://", "");

    // var page=pageName.split(".com");

    // regDate = parseDateForMixpanel(regDate);


    //regDate = 2014-09-20 17:46:27.0;

    //var regDate = new Date(regDate);
    //    regDate1 = regDate.getTime();
    //    regDate = new Date(regDate1).toUTCString();


    // if(firstDepositDate=="")
    //     firstDepositDate="1901-01-01 00:00:00.0";

    var refer_source="";


    if(refer=='NONE')
        refer_source="Direct";
    else
        refer_source=refer;

    var profileStatus="MINI";


    if(status=="FULL"){
        profileStatus="FULL";
    }

    var clientTypeVal="Full-Web";
    // if(clientType=="Mobile Web")
        if(deviceType=="MOBILE_WEB")
        clientTypeVal="Mobile-Web";

    if(regState=="")
    {
        regState="NA";
    }

    // if(cashBal==0.0)
    //     cashBal="0.00";

    if(gender=="")
        gender="NA";

    if(mobile=="")
        mobile="NA";

    if(url==domainName+"/after-registration")
        mobile=mobile.replace('+','');

    if(refer_source=="PPC")
        mobile='+'+mobile;

    if(emailV=='Y')
        emailV="Yes";
    else if( emailV=='N')
        emailV="No";

    if(mobileV=='Y')
        mobileV="Yes";
    else if( mobileV=='N')
        mobileV="No";

    var a = {
        "Name" : name,
        "username" : username,
        "Current URL" : url,
        "Identity" : prlId,
        "Player ID":prlId,
        "Email" : email,
        "Phone" : mobile,
        "First Name" :fname,
        "Last Name" :lname,
        "Gender" : gender,
        "DOB" : parseCleverTapDOB(dob) ,
        "Reg State" : regState,
        "Reg City" : regCity,
        "Pin Code" : pincode,
        "Email Verified" : emailV,
        "Mobile Verified" : mobileV,
        "OLA_Player" : Ola,
        "Player Profile" : profileStatus,
        // "Photo" : photo,
        "Balance" : isNaN(Number(cashBal)) ? 0 : Number(Math.round(cashBal*100)/100),
        "Ad Campaign" :campaign,
        "Alias Name" : domainName,
        "Client Type" : clientTypeVal,
        "Device" : deviceType,
        "Device Type" : deviceType,
        "First Deposit Date" : parseCleverTapDates(firstDepositDate),
        "Operating System" : os,
        "Page Name" : pageName,
        "Domain Name" : domainName,
        "Source" : refer_source,
        "Reg Date" : parseCleverTapDates(regDate),
        "Reg IP" : regIP,
        "OS Version":OSVersion,
        "Last Login Date" : parseCleverTapDates(lastLoginDate),

    };
    checkNullForDate(a,"DOB",dob);
    checkNullForDate(a,"First Deposit Date",firstDepositDate);
    checkNullForDate(a,"Reg Date",regDate);
    checkNullForDate(a,"Last Login Date",lastLoginDate);


    // console.log(a);

    // clevertap.profile.push({"Site":a});
    // a.Phone.toString();
    // a.Phone = '+91'+a.Phone;

    setTimeout(function(){
        // if(mobile!="" && mobile!="NA" )
        // {
        //         a.Phone.toString();
        //         a.Phone = '+' + a.Phone;
        // }
        // else
        // {
        //     a.Phone.toString();
        //     a.Phone = '91'+a.Phone;
        // }
        delete a['Balance'];
        a['Cash Current Balance'] = isNaN(Number(cashBal)) ? 0 : Number(Math.round(cashBal * 100)/100);
        clevertap.event.push("PageView",a);
    },2000);
}

function cleverTapLogin(domainName,state,referSource,campaignName,status,lastLoginIp,regIp,userName,playerId,registrationDate,regDevice,emailId,emailVerified,mobileNo,phoneVerified,serverDate,firstDepositDate,firstLoginDate,firstName,lastName,gender,dateOfBirth,city,postalCode,cashBal,practiceBal,device,devType,clientType,affiliateId, osType,avatarPath,OLAStatus,name,FbLogin,OSVersion,LoginVia){

    // if((window.location.href!='/select-amount'))
    // {
    //     return;
    // }
    domainName = domainName.replace("https://", "");
    domainName = domainName.replace("http://", "");

    // var page=pageName.split(".com");

    // regDate = parseDateForMixpanel(regDate);


    //regDate = 2014-09-20 17:46:27.0;

    //var regDate = new Date(regDate);
    //    regDate1 = regDate.getTime();
    //    regDate = new Date(regDate1).toUTCString();




    var refer_source="";


    if(referSource=='NONE')
        refer_source="Direct";
    else
        refer_source=referSource;

    var profileStatus="MINI";


    if(status=="FULL"){
        profileStatus="FULL";
    }



    if(name=="")
        name="NA";

    if(firstName=="")
        firstName="NA";

    if(lastName=="")
        lastName="NA";

    if(gender=="")
        gender="NA";

    if(state=="")
        state="NA";

    if(city=="")
        city="NA";

    if(postalCode=="")
        postalCode="NA";

    // if(cashBal==0.0)
    //     cashBal="0.00";
    //
    // if(practiceBal==0.0)
    //     practiceBal="0.00";

    if(campaignName=="")
        campaignName="NA";

    var clientTypeVal="Full-Web";
    // if(clientType=="Mobile Web")
    if(devType=="MOBILE_WEB")
        clientTypeVal="Mobile-Web";

    if(FbLogin=="")
        FbLogin='No';

    if(LoginVia=="")
        LoginVia="Default";

    if(mobileNo=="")
        mobileNo="NA";

    // if(firstDepositDate=="")
    //     firstDepositDate="1901-01-01 00:00:00.0";

    // if(LoginVia=="FB")
    //     mobileNo="NA";

    if(cashBal=='')
        cashBal="NA";

    if(practiceBal=='')
        practiceBal="NA";

    if(emailVerified=='Y')
        emailVerified="Yes";
    else if( emailVerified=='N')
        emailVerified="No";

    if(phoneVerified=='Y')
        phoneVerified="Yes";
    else if( phoneVerified=='N')
        phoneVerified="No";

    var a = {
        "Name" : userName,
        "Domain Name" : domainName,
        "Ad Campaign" : campaignName,
        "Username" : userName,
        "Current URL" : window.location.href,
        "Identity" : parseInt(playerId),
        "Player ID" : parseInt(playerId),
        "Email" : emailId,
        "Phone" : mobileNo,
        "First Name" : firstName,
        "Last Name" : lastName,
        "Gender" : gender,
        "DOB" : parseCleverTapDOB(dateOfBirth),
        "Reg State" : state,
        "Reg City" : city,
        // "Pin Code" : postalCode,
        "Email Verified" : emailVerified,
        "Mobile Verified" : phoneVerified,
        // "OLA_Player" : OLAStatus,
        "Player Profile" : profileStatus,
        // "Photo" : avatarPath,
        "Promo Current Balance" : isNaN(Number(practiceBal)) ? 0 : Number(Math.round(practiceBal * 100)/100),
        "Balance" : isNaN(Number(cashBal)) ? 0 : Number(Math.round(cashBal * 100)/100),
        "Client Type" : clientTypeVal,
        "First Deposit Date" : parseCleverTapDates(firstDepositDate),
        "Operating System" : osType,
        "Reg Date" : parseCleverTapDates(registrationDate),
        "Reg Device" : regDevice,
        "Reg IP" : regIp,
        "Device" : device,
        "Device Type" : devType,
        "Source" : refer_source,
        "OS Version":OSVersion,
        "Login Via":LoginVia,
        "Browser" : getBrowser(),
        "Browser Version" : navigator.appVersion
    };
    checkNullForDate(a,"DOB",dateOfBirth);
    checkNullForDate(a,"First Deposit Date",firstDepositDate);
    checkNullForDate(a,"Reg Date",registrationDate);

    var p = {
        "Name" : userName,
        "Domain Name" : domainName,
        "Ad Campaign" : campaignName,
        "Username" : userName,
        "Current URL" : window.location.href,
        "Identity" : parseInt(playerId),
        "Player ID" : parseInt(playerId),
        "Email" : emailId,
        "Phone" : mobileNo,
        "First Name" : firstName,
        "Last Name" : lastName,
        "Gender" : gender,
        "DOB" : parseCleverTapDOB(dateOfBirth),
        "Registration State" : state,
        "Registration City" : city,
        // "Pin Code" : postalCode,
        "Email Verified" : emailVerified,
        "Mobile Verified" : phoneVerified,
        // "OLA_Player" : OLAStatus,
        "Player Profile" : profileStatus,
        // "Photo" : avatarPath,
        "Promo Current Balance" : isNaN(Number(practiceBal)) ? 0 : Number(Math.round(practiceBal * 100)/100),
        "Balance" : isNaN(Number(cashBal)) ? 0 : Number(Math.round(cashBal * 100)/100),
        "Client Type" : clientTypeVal,
        "First Deposit Date" : parseCleverTapDates(firstDepositDate),
        "Registration OS" : osType,
        "Registration_Date" : parseCleverTapDates(registrationDate),
        "Registration Device" : regDevice,
        "Registration_IP" : regIp,
        "Device" : device,
        "Device Type" : devType,
        "Source" : refer_source,
        "OS Version":OSVersion,
        "Login Via":LoginVia,
        "Browser" : getBrowser(),
        "Browser Version" : navigator.appVersion,
        "Last Login IP":lastLoginIp,
        "First Login Date" : parseCleverTapDates(firstLoginDate)

    };
    checkNullForDate(p,"DOB",dateOfBirth);
    checkNullForDate(p,"First Deposit Date",firstDepositDate);
    checkNullForDate(p,"Reg Date",registrationDate);
    checkNullForDate(p,"First Login Date",firstLoginDate);
    clevertap.onUserLogin.push({"Site": p });
    setTimeout(function(){
      /*  if(mobileNo!="" && mobileNo!="NA" )
        {
            a.Phone.toString();
            a.Phone = '+' + a.Phone;
        }*/
          if(dateOfBirth=="")
          {
              delete a['DOB'];
          }
            if(firstDepositDate=="")
            {
                delete a['First Deposit Date'];
            }

        delete a['Balance'];
        a['Cash Current Balance'] = isNaN(Number(cashBal)) ? 0 : Number(Math.round(cashBal * 100)/100);

        clevertap.event.push("Login",a);
    },2000);

}


function cleverTapRegister(domainName,referSource,regIP,userName,playerId,registrationDate,firstLoginDate,regDevice,emailId,mobileNo,cashBal,campaignName,device,devType,clientType,emailVerified,phoneVerified,olaPlayer,affiliateId, osType,FbReg,OSVersion,RegVia,practiceBal){

    domainName = domainName.replace("https://", "");
    domainName = domainName.replace("http://", "");
    var olaStatus="No";
    var refer_source="NA";
    if(referSource=='OLA' || affiliateId==1)
        olaStatus="Yes";

    if(referSource=='NONE')
        refer_source="Direct";
    else
        refer_source=referSource;

    var regClient="Full-Web";
    // if(clientType=="Mobile Web")
    if(devType=="MOBILE_WEB")
        regClient="Mobile-Web";


    if(campaignName=="")
        campaignName="NA";

    if(FbReg=="")
        FbReg='No';

    if(RegVia=="")
        RegVia="Default";

    // if(cashBal==0.0)
    //     cashBal="0.00";

    if(mobileNo=='')
        mobileNo="NA";

    if(cashBal=='')
        cashBal="NA";

    if(practiceBal=='')
        practiceBal="NA";


    if(emailVerified=='Y')
        emailVerified="Yes";
    else if( emailVerified=='N')
        emailVerified="No";

    if(phoneVerified=='Y')
        phoneVerified="Yes";
    else if( phoneVerified=='N')
        phoneVerified="No";


    var a = {
        "Name" : userName,
        "Domain Name" : domainName,
        "Alias Name" :domainName,
        "Ad Campaign" : campaignName,
        "Username" : userName,
        "Current URL" : window.location.href,
        "Identity" : playerId,
        "Player ID" : playerId,
        "Email" : emailId,
        "Phone" : mobileNo,
        // "Promo Current Balance" : isNaN(Number(practiceBal)) ? 0 : Number(Math.round(practiceBal * 100)/100),
        "Balance" : isNaN(Number(cashBal)) ? 0 : Number(Math.round(cashBal * 100)/100),
        "Client Type" : regClient,
        "Operating System" : osType,
        "Reg Date" : parseCleverTapDates(registrationDate),
        "Reg Device" : regDevice,
        "Reg IP" : regIP,
        "Device" : device,
        "Device Type" : devType,
        "Source" : refer_source,
        "Browser" : getBrowser(),
        "Browser Version" : navigator.appVersion,
        "Registration Via":RegVia,
        "OS Version":OSVersion

    };
    checkNullForDate(a,"Reg Date",registrationDate);

    var p = {
        "Name" : userName,
        "Domain Name" : domainName,
        "Alias Name" :domainName,
        "Ad Campaign" : campaignName,
        "Username" : userName,
        "Current URL" : window.location.href,
        "Identity" : playerId,
        "Player ID" : playerId,
        "Email" : emailId,
        "Phone" : mobileNo,
        // "Promo Current Balance" : isNaN(Number(practiceBal)) ? 0 : Number(Math.round(practiceBal * 100)/100),
        "Balance" : isNaN(Number(cashBal)) ? 0 : Number(Math.round(cashBal * 100)/100),
        "Client Type" : regClient,
        "Registration OS" : osType,
        "Registration_Date" : parseCleverTapDates(registrationDate),
        "Registration Device" : regDevice,
        "Registration_IP" : regIP,
        "Device" : device,
        "Device Type" : devType,
        "Source" : refer_source,
        "Browser" : getBrowser(),
        "Browser Version" : navigator.appVersion,
        "Registration Via":RegVia,
        "OS Version":OSVersion,
        "Last Login IP":regIP,
        "First Login Date" : parseCleverTapDates(firstLoginDate),
	"Player Status"  : "ACTIVE"

    };
    checkNullForDate(p,"Reg Date",registrationDate);
    checkNullForDate(p,"First Login Date",firstLoginDate);


    var b = a;
    b['Gender'] = 'NA';
    // dateOfBirth='';
    // b['DOB'] ='';
    b['Reg City'] = 'NA';
    // b['Pin Code'] = 'NA';
    // b["OLA_Player"] = olaPlayer;
    b["Player Profile"] = 'MINI';
    b["OS Version"] = OSVersion;

    // console.log(a);

    clevertap.onUserLogin.push({"Site":p});
    setTimeout(function () {

        // if(mobileNo!="" && mobileNo!="NA" )
        // {
        //     a.Phone.toString();
        //     a.Phone = '+'+a.Phone;
        // }
        delete a['Balance'];
        a['Cash Current Balance']= isNaN(Number(cashBal)) ? 0 : Number(Math.round(cashBal*100)/100);
        clevertap.event.push("Registration",a);

        delete a['Registration Via'];
        delete b['Registration Via'];

        b.Name = 'NA';
        b["Login Via"] = RegVia;
        b['First Name'] = 'NA';
        b['Last Name'] = 'NA';
        b["Email Verified"] = emailVerified;
        b["Mobile Verified"] = phoneVerified;
        b['Reg State'] = 'NA';
        // b['First Deposit Date'] ='';

        clevertap.event.push("Login",b);
    },2000);

}

function cleverTapDepositeInitiate(domainName,userName,amt,payType,paySubType,bonusCodeAppl,plrId,email,mobile,fname,lname,gender,dob,state,city,country,pincode,regIp,regDevice,regDate,cashBal,practiceBal,source,campaignName,firstDepositDate,deviceType,appType,clientType,status,osType,OSVersion,ct,st,cntry,emailVerified,phoneVerified){

    domainName = domainName.replace("https://", "");
    domainName = domainName.replace("http://", "");

    if(amt=='')
        amt="NA";

    if(mobile=='')
        mobile="NA";

    if(emailVerified=='Y')
        emailVerified="Yes";
    else if( emailVerified=='N')
        emailVerified="No";

    if(phoneVerified=='Y')
        phoneVerified="Yes";
    else if( phoneVerified=='N')
        phoneVerified="No";

    var clientTypeVal="Full-Web";
    // if(clientType=="Mobile Web")
    if(deviceType=="MOBILE_WEB")
        clientTypeVal="Mobile-Web";


    var a ={
        "Domain Name" : domainName,
        "Username" : userName,
        "Amount":isNaN(Number(amt)) ? 0 : Number(Math.round(amt*100)/100),
        "Current URL": window.location.href,
        "Identity" :plrId,
        "Player ID" :plrId,
        "Email" : email,
        "Phone" : mobile,
        "Browser" : getBrowser(),
        // "First Name" : fname,
        // "Last Name" : lname,
        "Gender" : gender,
        "DOB" : parseCleverTapDOB(dob),
        "State" : st,
        "City" : ct,
        "Country" : cntry,
        "Pincode" : pincode,
        "Operating System" : osType,
        "Client Type" : clientTypeVal,
        "Device Type" :deviceType,
        "Alias Name":domainName,
        "Reg Date" : parseCleverTapDates(regDate),
        "OS Version":OSVersion,
        "Email Verified" : emailVerified,
        "Mobile Verified" : phoneVerified
    };
    checkNullForDate(a,"DOB",dob);
    checkNullForDate(a,"Reg Date",regDate);

    clevertap.event.push("Deposit Initiate",a);
}

function cleverTapWithdrawalReq(domainName,userName,amt,withType,withdrawSubType,plrId,email,mobile,fname,lname,gender,dob,state,city,country,pincode,regIp,regDevice,regDate,cashBal,practiceBal,source,campaignName,firstDepositDate,firstLoginDate,lastLoginDate,deviceType,appType,clientType,status, osType,OSVersion,ct,st,cntry){

    domainName = domainName.replace("https://", "");
    domainName = domainName.replace("http://", "");

    var refer_source="";
    var profileStatus="MINI";

    if(source=='NONE')
        refer_source="Direct";
    else
        refer_source=source;


    if( withdrawSubType == "" )
        withdrawSubType = "NA";

    if(status=="FULL"){
        profileStatus="FULL";
    }

    // if(cashBal==0.0)
    //     cashBal="0.00";
    //
    // if(practiceBal==0.0)
    //     practiceBal="0.00";

    if(campaignName=="")
        campaignName="NA";



    var clientTypeVal="Full-Web";
    // if(clientType=="Mobile Web")
    if(deviceType=="MOBILE_WEB")
        clientTypeVal="Mobile-Web";

    // if(firstDepositDate=="")
    //     firstDepositDate="1901-01-01 00:00:00.0";

    if(cashBal=='')
        cashBal="NA";

    if(practiceBal=='')
        practiceBal="NA";

    if(amt=='')
        amt="NA";

    if(mobile=='')
        mobile="NA";

    var b = {
        "Ad Campaign" : campaignName,
        "Cash Current Balance" : isNaN(Number(cashBal)) ? 0 : Number(Math.round(cashBal*100)/100),
        "Promo Current Balance" : isNaN(Number(practiceBal)) ? 0 : Number(Math.round(practiceBal*100)/100),
        "City" : ct,
        "Client Type" : clientTypeVal,
        "Country" : cntry,
        "Device Type" : deviceType,
        "DOB" : parseCleverTapDOB(dob),
        "Domain Name" : domainName,
        "Alias Name" : domainName,
        "Email" : email,
        "First Deposit Date" : parseCleverTapDates(firstDepositDate),
        "Gender" : gender,
        "Operating System" : osType,
        "Phone" : mobile,
        "Identity" : parseInt(plrId),
        "Player ID" : parseInt(plrId),
        "Player Profile" : profileStatus,
        "Reg Date" : parseCleverTapDates(regDate),
        "Reg Device" : regDevice,
        "Reg State" : state,
        "Reg City" : city,
        "Source"     :refer_source,
        "State" : st,
        "Username" : userName,
        "Withdrawal Amount" : isNaN(Number(amt)) ? 0 : Number(Math.round(amt*100)/100),
        "Withdrawal Payment Subtype" : withdrawSubType,
        "Withdrawal Payment Type" : withType,
        "Withdrawal Status" : "Pending",
        "First Login Date" : parseCleverTapDates(firstLoginDate),
        "Last Login Date" : parseCleverTapDates(lastLoginDate),
        "OS Version":OSVersion

    };
    checkNullForDate(b,"DOB",dob);
    checkNullForDate(b,"First Deposit Date",firstDepositDate);
    checkNullForDate(b,"Reg Date",regDate);
    checkNullForDate(b,"First Login Date",firstLoginDate);
    checkNullForDate(b,"Last Login Date",lastLoginDate);
    // console.log('withdraw');
    clevertap.event.push("Withdrawal Initiate",b);
}

function cleverTapDeposite(domainName,userName,amt,payType,paySubType,depositStatus,bonusApplied,bonusType,bonusAmt,playerId,email,mobile,firstName,lastName,gender,dob,state,city,country,pincode,regIP,regDevice,regDate,status,cashBal,practiceBal,source,campaignName,firstDepositDate,deviceType,clientType, osType,OSVersion,bonusCode,gatewayName,lastLoginDate,lastDepositDate) {

    domainName = domainName.replace("https://", "");
    domainName = domainName.replace("http://", "");

    //var regDate = new Date(regDate);
    //regDate1 = regDate.getTime();
    //regDate = new Date(regDate1).toUTCString();

    var refer_source = "";
    var profileStatus = "MINI";
    // var isbonusApplied = true;

    if (source == 'NONE')
        refer_source = "Direct";
    else
        refer_source = source;

    if (status == "FULL") {
        profileStatus = "FULL";
    }

    if (bonusType == "") {
        bonusType = "NA";
        bonusAmt = "0.00";
    }

    // if (cashBal == 0.0)
    //     cashBal = "0.00";
    //
    // if (practiceBal == 0.0)
    //     practiceBal = "0.00";

    if(cashBal=='')
        cashBal="NA";

    if(practiceBal=='')
        practiceBal="NA";

    if (amt == "")
        amt = "NA";

    if (payType == "")
        payType = "NA";

    if (paySubType == "")
        paySubType = "NA";

    // if (bonusApplied == "")
    // {
    //     bonusApplied = "NA";
    //     isbonusApplied = false;
    // }
    // if (bonusType == "")
    //     bonusType = "NA";

    if (bonusAmt == "")
        bonusAmt = "NA";

    if (campaignName == "")
        campaignName = "NA";

    var clientTypeVal = "Full-Web";
    // if(clientType=="Mobile Web")
    if(deviceType=="MOBILE_WEB")
        clientTypeVal = "Mobile-Web";



    if (payType == "PREPAID_WALLET") {
        payType = "Cash Card";
    } else if (payType == "CASH_CARD") {
        payType = "KPR Card";
        gatewayName = "KPR Card";
    } else if (payType == "WIRE_TRANS") {
        payType = "Wire Transfer";
        paySubType = "HDFC";
    } else if (payType == "CHEQUE_TRANS") {
        payType = "Cheque";
    } else if (payType == "NET_BANKING") {
        payType = "Netbanking";
    } else if (payType == "DEBIT_CARD") {
        payType = "Debit Card";
        if (paySubType.indexOf(" ") != -1)
            paySubType = paySubType.split(" ")[0];
    } else if (payType == "CREDIT_CARD") {
        payType = "Credit Card";
        if (paySubType.indexOf(" ") != -1)
            paySubType = paySubType.split(" ")[0];
    }

    if(depositStatus !== 'SUCCESS')
        depositStatus = 'FAILED';


    if (bonusCode == "")
        bonusCode = "NA";

    if(mobile=='')
        mobile="NA";

    if(bonusApplied == "")
        bonusApplied ="NA";

    if(gatewayName == "")
        gatewayName ="NA";


    // if(firstDepositDate=="")
    //     firstDepositDate="1901-01-01 00:00:00.0";

    var obj = {
        "Ad Campaign" : campaignName,
        "Amount" : isNaN(Number(amt)) ? 0 : Number(amt),
        "Bonus Amount" : isNaN(Number(bonusAmt)) ? 0 : Number(Math.round(bonusAmt*100)/100),
        "Bonus Code" : bonusCode,
        "Bonus Type" : bonusType,
        "Browser" : getBrowser(),
        "Browser Version" : navigator.appVersion,
        "Cash Current Balance" : isNaN(Number(cashBal)) ? 0 : Number(Math.round(cashBal*100)/100),
        // "City" : city,
        "Client Type" : clientTypeVal,
        // "Country" :  country,
        "Current URL" : window.location.href,
        "Deposit Status" : depositStatus,
        "Device Type" : deviceType,
        "Device" : deviceType,
        "DOB" : parseCleverTapDOB(dob),
        "Domain Name" : domainName,
        "Email" : email,
        "First Deposit Date" : parseCleverTapDates(firstDepositDate),
        // "First Login Date" : ,
        "Gender" : gender,
        "Source" : refer_source,
        "Is Bonus Code Applied" : bonusApplied,
        // "Last Bonus Date" :,
        // "Last Login Date" : ,
        "Operating System" : osType,
        "Payment Subtype" : paySubType,
        "Payment Type" : payType,
        "Phone" : mobile,
        "Identity" : parseInt(playerId),
        "Player ID" : parseInt(playerId),
        "Player Profile" : profileStatus,
        "Reg City" : city,
        "Reg Date" : parseCleverTapDates(regDate),
        "Reg device" : regDevice,
        "Reg IP" : regIP,
        "Reg State": state,
        // "Last Deposit Date" : ,
        "State" : state,
        "Username" : userName,
        "OS Version":OSVersion,
        "Gateway Name":gatewayName,
        "Last Login Date" : parseCleverTapDates(lastLoginDate),
        "Alias Name"     : domainName
    };
    checkNullForDate(obj,"DOB",dob);
    checkNullForDate(obj,"First Deposit Date",firstDepositDate);
    checkNullForDate(obj,"Reg Date",regDate);
    checkNullForDate(obj,"Last Login Date",lastLoginDate);
    // console.log(obj);

    clevertap.event.push('Deposit', obj);
    var b = {
        "Balance" : isNaN(Number(cashBal)) ? 0 : Number(Math.round(cashBal*100)/100),
        "First Deposit Date" : parseCleverTapDates(firstDepositDate),
        "Bonus Code":bonusCode,
        "Gateway Name":gatewayName,
        "Last Deposit Status" : depositStatus,
        "Last Deposit Date" : parseCleverTapDates(lastDepositDate)

    };
    checkNullForDate(b,"First Deposit Date",firstDepositDate);
    checkNullForDate(b,"Last Login Date",lastLoginDate);
    // console.log(b);
    clevertap.profile.push({"Site":b});


}

function cleverTapProfileUpdate(username,url,prlId,email,mobile,fname,lname,gender,dob,regState,regCity,pincode,emailV,mobileV,Ola,status,photo,cashBal,campaign,alias,clientType,device,deviceType,firstDepositDate,os,domainName,refer,regDate,regIP,OSVersion,lastLoginDate,currency,lastLoginIP)
{

    // if((window.location.href!='/select-amount'))
    // {
    //     return;
    // }
    domainName = domainName.replace("https://", "");
    domainName = domainName.replace("http://", "");

    // var page=pageName.split(".com");

    // regDate = parseDateForMixpanel(regDate);


    //regDate = 2014-09-20 17:46:27.0;

    //var regDate = new Date(regDate);
    //    regDate1 = regDate.getTime();
    //    regDate = new Date(regDate1).toUTCString();


    // if(firstDepositDate=="")
    //     firstDepositDate="1901-01-01 00:00:00.0";

    var refer_source="";


    if(refer=='NONE')
        refer_source="Direct";
    else
        refer_source=refer;

    var profileStatus="MINI";


    if(status=="FULL"){
        profileStatus="FULL";
    }

    var clientTypeVal="Full-Web";
    // if(clientType=="Mobile Web")
    if(deviceType=="MOBILE_WEB")
        clientTypeVal="Mobile-Web";

    if(regState=="")
    {
        regState="NA";
    }

    // if(cashBal==0.0)
    //     cashBal="0.00";

    if(gender=="")
        gender="NA";

    if(mobile=="")
        mobile="NA";

    if(url==domainName+"/after-registration")
        mobile=mobile.replace('+','');

    if(refer_source=="PPC")
        mobile='+'+mobile;

    if(emailV=='Y')
        emailV="Yes";
    else if( emailV=='N')
        emailV="No";

    if(mobileV=='Y')
        mobileV="Yes";
    else if( mobileV=='N')
        mobileV="No";

    if(currency=="")
        currency="INR";

    if(lastLoginIP=="")
        lastLoginIP="NA";

    var a = {
        "Username" : username,
        "Current URL" : url,
        "Identity" : prlId,
        "Player ID":prlId,
        "Email" : email,
        "Phone" : mobile,
        "First Name" :fname,
        "Last Name" :lname,
        "Gender" : gender,
        "DOB" : parseCleverTapDOB(dob) ,
        "Registration State" : regState,
        "Registration City" : regCity,
        "Pin Code" : pincode,
        "Email Verified" : emailV,
        "Mobile Verified" : mobileV,
        "OLA_Player" : Ola,
        "Player Profile" : profileStatus,
        // "Photo" : photo,
        "Balance" : isNaN(Number(cashBal)) ? 0 : Number(Math.round(cashBal*100)/100),
        "Ad Campaign" :campaign,
        "Alias Name" : domainName,
        "Client Type" : clientTypeVal,
        "Device" : deviceType,
        "Device Type" : deviceType,
        "First Deposit Date" : parseCleverTapDates(firstDepositDate),
        "Registration OS" : os,
        // "Page Name" : pageName,
        "Domain Name" : domainName,
        "Source" : refer_source,
        "Registration_Date" : parseCleverTapDates(regDate),
        "Registration_IP" : regIP,
        "OS Version":OSVersion,
        "Last Login Date" : parseCleverTapDates(lastLoginDate),
        "Currency":currency,
        "Last Login IP":lastLoginIP

    };

    checkNullForDate(a,"DOB",dob);
    checkNullForDate(a,"First Deposit Date",firstDepositDate);
    checkNullForDate(a,"Reg Date",regDate);
    checkNullForDate(a,"Last Login Date",lastLoginDate);

    // console.log(a);

    setTimeout(function(){
        // delete a['Balance'];
        // a['Cash Current Balance'] = isNaN(Number(cashBal)) ? 0 : Number(Math.round(cashBal * 100) /100);
        clevertap.profile.push({"Site":a});
    },2000);
}

function getBrowser() {
    if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 )
    {
        return 'Opera';
    }
    else if(navigator.userAgent.indexOf("Chrome") != -1 )
    {
        return 'Chrome';
    }
    else if(navigator.userAgent.indexOf("Safari") != -1)
    {
        return 'Safari';
    }
    else if(navigator.userAgent.indexOf("Firefox") != -1 )
    {
        return 'Firefox';
    }
    else if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) //IF IE > 10
    {
        return 'IE';
    }
    else
    {
        return 'NA';
    }
}
function parseCleverTapDOB(dt) {

    if (dt != "" ) {

        var d = dt.split("/");
        var date = new Date(d[2], d[1] - 1, d[0]);

    var _year = (date.getFullYear() > 9 ? date.getFullYear() : ("0" + date.getFullYear()));
    var _month = ((date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : ("0" + (date.getMonth() + 1)));
    var _dates = (date.getDate() > 9 ? date.getDate() : ("0" + date.getDate()));

    var _mins = (date.getMinutes() > 9 ? date.getMinutes() : ("0" + date.getMinutes()));
    var _sec = (date.getSeconds() > 9 ? date.getSeconds() : ("0" + date.getSeconds()));

    var _ampm = (date.getHours() >= 12) ? "PM" : "AM";
    var hours = (date.getHours() > 12) ? date.getHours()-12 : date.getHours();
    var _hours = (hours > 9 ? hours : ("0" + hours));

    var shortMonthName = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
    var shortName = shortMonthName[date.getMonth()]; // "Jul"

    var _date = _dates + " " + shortName + " " + _year + " " + _hours + ":" + _mins + ":" + _sec + " " + _ampm;
    var new_dformat=new Date(_date);
    return new_dformat;
    }

}

function parseCleverTapDates(dt)
{
    if (dt != "" ) {
        var date = new Date(dt);
    var _year = (date.getFullYear() > 9 ? date.getFullYear() : ("0" + date.getFullYear()));
    var _month = ((date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : ("0" + (date.getMonth() + 1)));
    var _dates = (date.getDate() > 9 ? date.getDate() : ("0" + date.getDate()));

    var _mins = (date.getMinutes() > 9 ? date.getMinutes() : ("0" + date.getMinutes()));
    var _sec = (date.getSeconds() > 9 ? date.getSeconds() : ("0" + date.getSeconds()));

    var _ampm = (date.getHours() >= 12) ? "PM" : "AM";
    var hours = (date.getHours() > 12) ? date.getHours()-12 : date.getHours();
    var _hours = (hours > 9 ? hours : ("0" + hours));

    var shortMonthName = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
    var shortName = shortMonthName[date.getMonth()]; // "Jul"

    var _date = _dates + " " + shortName + " " + _year + " " + _hours + ":" + _mins + ":" + _sec + " " + _ampm;

    var new_dformat=new Date(_date);
    return new_dformat;
    }
}

function cleverTapCampaignParams()
{
    var campaign_keywords = 'utm_source utm_medium utm_campaign utm_content utm_term'.split(' '), kw = '', params = {}, first_params = {};

    var index;
    for (index = 0; index < campaign_keywords.length; ++index) {
        kw = cleverTapGetQueryParam(document.URL, campaign_keywords[index]);
        if (kw.length) {
            params[campaign_keywords[index] + ' [last touch]'] = kw;
        }
    }
    for (index = 0; index < campaign_keywords.length; ++index) {
        kw = cleverTapGetQueryParam(document.URL, campaign_keywords[index]);
        if (kw.length) {
            first_params[campaign_keywords[index] + ' [first touch]'] = kw;
        }
    }

    // mixpanel.people.set(params);
    // mixpanel.people.set_once(first_params);
    // mixpanel.register(params);

    if( Object.keys(params).length !== 0 )
    {
        clevertap.onUserLogin.push({"Site":params});
    }

}

function cleverTapGetQueryParam(url, param)
{
    param = param.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + param + "=([^&#]*)",
        regex = new RegExp( regexS ),
        results = regex.exec(url);
    if (results === null || (results && typeof(results[1]) !== 'string' && results[1].length)) {
        return '';
    } else {
        return decodeURIComponent(results[1]).replace(/\+/g, ' ');
    }
}


function cleverTapWebPushNotifications()
{

    clevertap.notifications.push({
        "titleText":'Would you like to receive Push Notifications?',
        "bodyText":'We promise to only send you relevant content and give you updates on your transactions',
        "okButtonText":'Allow!',
        "rejectButtonText":'No thanks',
        "okButtonColor":'#f28046',
	"askAgainTimeInSeconds":3600,
        "okCallback":function () {
             console.log("User clicked on ok on popup");
             clevertap.event.push("Notification Allowed");
        },
        "rejectCallback":function () {
             console.log("User clicked on reject on popup");
        },
        "subscriptionCallback":function () {
             console.log("User subscribed for web push notifications");
        }
    });

}


function checkNullForDate(jsonObj,key,val) {
    if(val==null || val == undefined || val == "")
    delete jsonObj[key];
}
