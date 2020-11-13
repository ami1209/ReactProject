import md5 from 'md5';

export function generateLoginToken(){
    var date = new Date();
    var time = date.getTime();
    var mili = date.getMilliseconds();
    var sec = date.getSeconds();
    var conc = time.toString() + mili.toString() + sec.toString();
    var loginToken = md5(conc);
    return loginToken;
}