var websiteWindow, cashierpopup, rummypopup,referFriedPopup;$ = jQuery.noConflict();
function clearSystemMessage() {
    $("#system-message-container").empty()
}
function error_message(e, o) {
    $("#system-message-container").html("<div id='system-message'><div class='alert alert-danger'><a class='close' data-dismiss='alert'>×</a><h4 class='alert-heading'>Error</h4><div><p>" + e + "</p></div></div></div>"),
        $("#" + o).focus(),
        window.scrollTo(0, 0)
}
function warning_message(e) {
    $("#system-message-container").html("<div id='system-message'><div class='alert alert-warning'><a class='close' data-dismiss='alert'>×</a><h4 class='alert-heading'>Warning</h4><div><p>" + e + "</p></div></div></div>"),
        window.scrollTo(0, 0)
}
function info_message(e) {
    $("#system-message-container").html("<div id='system-message'><div class='alert alert-info'><a class='close' data-dismiss='alert'>×</a><h4 class='alert-heading'>Warning</h4><div><p>" + e + "</p></div></div></div>"),
        window.scrollTo(0, 0)
}
function success_message(e) {
    $("#system-message-container").html("<div id='system-message'><div class='alert alert-success'><a class='close' data-dismiss='alert'>×</a><h4>Success</h4><div><p>" + e + "</p></div></div></div>"),
        window.scrollTo(0, 0)
}
function startAjax(e, o, a, t, n) {
    return -1 == e.search(/khelplayrummy/gi) && (e = base_href + e),
        removeToolTipError("all"),
        removeToolTipErrorManual("all"),
    "null" != t && $(t).submit(function(e) {
        e.preventDefault()
    }),
    "nottoshow" != t && ($("#loadingImage").remove(),
        $("body").append('<div id="loadingImage"><img src="https://d7hf0c5vwwy8u.cloudfront.net/images/kpr/loading3.gif" /></div>'),
        $("#loadingImage").css("display", "block"),
        $("#loadingImage").focus()),
        $.ajax({
            type: "POST",
            async: !0,
            url: e,
            data: o + "&isAjax=true",
            encode: !0
        }).done(function(e) {
            "nottoshow" != t && $("#loadingImage").remove(),
                "cashier-check" == t ? n() : a(e)
        }).fail(function(e) {
            return "nottoshow" != t && $("#loadingImage").remove(),
                !1
        }),
        ""
}
function startAjaxFileUpload(e, o, a, t, n, r) {
    return -1 == e.search(/khelplayrummy/gi) && (e = base_href + e),
        removeToolTipError("all"),
        removeToolTipErrorManual("all"),
    "null" != t && $(t).submit(function(e) {
        e.preventDefault()
    }),
    null != n && $(document).ajaxStart(n),
    null != r && $(document).ajaxStop(r),
        $.ajax({
            type: "POST",
            async: !0,
            url: e,
            data: o,
            processData: !1,
            contentType: !1
        }).done(function(e) {
            a(e)
        }).fail(function(e) {
            return !1
        }),
        ""
}
function validateSession(e) {
    var o = $.parseJSON(e);
    return "undefined" == o.flag || ("EXPIRE" == o.flag || "ALREADY" == o.flag || "RELOAD" == o.flag ? (location.href = o.path,
        !1) : void 0)
}
function showToolTipError(e, o, a, t) {
    null == a && (a = "bottom");
    var n = e;
    "string" == typeof e && (n = "#" + e),
        $(n).addClass("error"),
        $(n).tooltip("destroy"),
        $(n).attr("data-toggle", "tooltip"),
        $(n).attr("data-placement", a),
        $(n).attr("title", o),
        $(n).tooltip({
            show: !0,
            trigger: "manual",
            animation: !1
        }),
        $(n).tooltip("show"),
    "" != t && null != t && window[t](a, $("#" + e), "error")
}
function showToolTipErrorManual(e, o, a, t, n) {
    null == a && (a = "bottom"),
        $("#" + e).addClass("error"),
        $("#" + e).parent().find("#error_" + t.attr("id")).html(o),
        $("#" + e).parent().find("#error_" + t.attr("id")).css("display", "block"),
    "" != n && null != n && window[n](a, $("#" + e), "error")
}
function removeToolTipError(e) {
    "all" == e ? ($("[data-toggle='tooltip']").tooltip("destroy"),
        $("[data-toggle='tooltip']").removeClass("error"),
        $("[data-toggle='tooltip']").removeAttr("data-placement"),
        $("[data-toggle='tooltip']").removeAttr("title"),
        $("[data-toggle='tooltip']").removeAttr("data-toggle"),
        $("[data-toggle='tooltip']").removeAttr("data-original-title"),
        $("[data-original-title]").removeClass("error"),
        $("[aria-describedby]").removeAttr("aria-describedby"),
        $("div.tooltip").remove()) : ($("#" + e).removeClass("error"),
        $("#" + e).tooltip("destroy"),
        $("#" + e).removeAttr("data-toggle"),
        $("#" + e).removeAttr("data-placement"),
        $("#" + e).removeAttr("title"),
        $("#" + e).removeAttr("data-original-title"),
        $("#" + e).removeAttr("aria-describedby"))
}
function removeToolTipErrorManual(e, o) {
    "all" == e ? $($(".manual_tooltip_error")).each(function() {
        $(this).css("display", "none"),
            $(this).html(""),
            o = $(this).attr("id").trim().replace("error_", ""),
            $(this).parent().find("#" + o).removeClass("error")
    }) : (o.removeClass("error"),
        o.parent().find("#error_" + o.attr("id")).css("display", "none"),
        o.parent().find("#error_" + o.attr("id")).html(""))
}
function displayToolTip(e, o, a, t, n) {
    null == t && (t = "bottom"),
        $.each(e.validElements(), function(e, o) {
            $(o).data("title", "").removeClass("error").tooltip("destroy")
        }),
        $.each(a, function(e, o) {
            var a = $(o.element);
            a.tooltip("destroy").data({
                title: o.message,
                placement: t
            }).addClass("error").tooltip({
                show: !0,
                trigger: "manual",
                animation: !1
            }),
                $(a).tooltip("show"),
            "" != n && null != n && window[n](t, $(a), "error")
        })
}
function displayToolTipManual(e, o, a, t, n) {
    null == t && (t = "bottom"),
        $.each(e.validElements(), function(e, o) {
            var a = $(o);
            if (a.data("title", "").removeClass("error"),
                a.parent().find("#error_" + a.attr("id")).css("display", "none"),
            "" != n && null != n)
                try {
                    window[n](t, $(a), "success")
                } catch (e) {}
        }),
        $.each(a, function(e, o) {
            var a = $(o.element);
            if (a.addClass("error"),
                a.parent().find("#error_" + a.attr("id")).html(o.message),
                a.parent().find("#error_" + a.attr("id")).css("display", "block"),
            "" != n && null != n)
                try {
                    window[n](t, $(a), "error")
                } catch (e) {}
        })
}
function updateBalance(e) {
    $(".cash-balance").length > 0 && $(".cash-balance").html(e)
}
function updatePracticeBalance(e) {
    $(".practice-balance").length > 0 && $(".practice-balance").html(e)
}
function updateWithdrawBalance(e) {
    $(".withdraw-balance").length > 0 && $(".withdraw-balance").html("Withdrawable Balance :<strong> <span class='rupees-symbol'>` </span>" + e + " </strong>"),
    $(".withdrawl_amount").length > 0 && $($(".withdrawl_amount strong")).each(function() {
        $(this).html(e)
    })
}
function openReferAFriendPage() {
    window.location.href = "/refer-a-friend"
}
function openCashierWindow() {
    try {
        var e = screen.width / 2 - 420;
        screen.height,
        cashierpopup && cashierpopup.close(),
            cashierpopup = window.open(base_href + "/cashier-initiate", "cashierWindow", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=1, resizable=no, copyhistory=no, width=840, height=665, top=0, left=" + e)
    } catch (e) {
        $("#loadingImage").css("display", "none")

    }
}
function openMobRummyWindow() {
    try {
        var e = screen.width / 2 - 500;
        screen.height,
        rummypopup && rummypopup.close(),
            rummypopup = window.open(base_href + "/play-mobile-rummy", "rummyWindow", "height=650,width=850,location=no,menubar=no,resizable=yes,scrollbars=yes,status=no,toolbar=no, left=" + e)
    } catch (e) {
        $("#loadingImage").css("display", "none")
    }
}
function openRummyWindow() {
    try {
        var e = screen.width / 2 - 500;
        screen.height,
        rummypopup && rummypopup.close(),
            rummypopup = window.open(base_href + "/rummy", "rummyWindow", "height=650,width=1000,location=no,menubar=no,resizable=yes,scrollbars=yes,status=no,toolbar=no, left=" + e)
    } catch (e) {
        $("#loadingImage").css("display", "none")
    }
}

    base_href = "",
    cnt = 0,
    document.onkeypress = function() {
        clearSystemMessage()
    }
    ,

    $(document).ready(function() {
        $(document).on("hidden.bs.modal", function(e) {
            removeToolTipError("all"),
                removeToolTipErrorManual("all"),
                $("#" + $(e.target).attr("id")).find("form").trigger("reset"),
                $("#home_login form").removeAttr("from-title"),
                $("#home_login form").removeAttr("modal-id")
        }),
            $(document).on("show.bs.modal", function(e) {
                $("#" + $(e.target).attr("id")).find("form").trigger("reset"),
                    removeToolTipError("all"),
                    removeToolTipErrorManual("all")
            }),
            $(document).on("shown.bs.modal", function(e) {
                0 == $("body").hasClass("modal-open") && $("body").addClass("modal-open"),
                    $("a.close-offcanvas").trigger("click")
            }),
            $("li>a.log-out-menu-item, li.log-out-menu-item>a").on("click", function(e) {
                e.preventDefault(),
                    e.stopPropagation(),
                    e.stopImmediatePropagation(),
                    $("a.close-offcanvas").trigger("click"),
                    $("#notification").modal("show")
            }),
        $("input").length > 0 && $(":input").not('[type="file"]').change(function() {
            $(this).val($(this).val().trim())
        }),
        $("textarea").length > 0 && $("textarea").change(function() {
            $(this).val($(this).val().trim())
        }),
            $(document).on("click", '[role="tooltip"]', function() {
                removeToolTipError($("[aria-describedby='" + $(this).attr("id") + "']").attr("id"))
            }),
            $(document).on("click", ".manual_tooltip_error", function() {
                removeToolTipErrorManual("all")
            }),
            $(document).on("keypress", function() {
                $($('input[aria-invalid="false"]')).each(function() {
                    removeToolTipError($(this).attr("id"))
                })
            }),
        navigator.userAgent.match(/iPhone/i) && $("*").on("click", "a.close", function(e) {
            clearSystemMessage()
        }),
            $(".update_balance").on("click", function() {
                updatePlayerBalance(!1)
            }),
            $(".update_practice_balance").on("click", function() {
                updatePlayerBalance(!0)
            }),
            $("[menu-toggler='true']").click(function() {
                $("#offcanvas-toggler").trigger("click"),
                    $("body").addClass("stopScroll")
            }),
            $(".close-offcanvas").on("click", function() {
                $("body").removeClass("stopScroll")
            }),
            $("a.downarrow").on("click", function() {
                bookmarkscroll.scrollTo("sp-geting-started")
            }),
            $("[open_raf='true']").attr("href", "javascript:void(0);"),
            $("[open_raf='true']").on("click", function(e) {
                e.preventDefault(),
                    1 == $("body").hasClass("post-login") ? openReferAFriendPage() : $("#home_login").length > 0 && ($("#home_login form").attr("from-title", "open_raf"),
                        $("#home_login form").attr("modal-id", "#home_login"),
                        $("#home_login").modal("show"))
            }),
            $("[title=play_mob_rummy]").attr("href", "/play-mobile-rummy"),
            $("[title=play_mob_rummy],[href='/play-mobile-rummy']").on("click", function(e) {
                e.preventDefault(),
                    1 == $("body").hasClass("post-login") ? openMobRummyWindow() : $("#home_login").length > 0 && ($("#home_login form").attr("from-title", "play_mob_rummy"),
                        $("#home_login form").attr("modal-id", "#home_login"),
                        $("#home_login").modal("show"))
            }),
            $("[add_cash='true']").attr("href", "/cashier-initiate"),
            $("[add_cash='true']").on("click", function(e) {
                e.preventDefault(),
                    1 == $("body").hasClass("post-login") ? openCashierWindow() : $("#home_login").length > 0 && ($("#home_login form").attr("from-title", "add_cash"),
                        $("#home_login form").attr("modal-id", "#home_login"),
                        $("#home_login").modal("show"))
            }),
            $("[play_rummy='true']").attr("href", "/rummy"),
            $("[play_rummy='true'], [href='/rummy']").on("click", function(e) {
                e.preventDefault(),
                    1 == $("body").hasClass("post-login") ? openRummyWindow() : $("#home_login").length > 0 && ($("#home_login form").attr("from-title", "play_rummy"),
                        $("#home_login form").attr("modal-id", "#home_login"),
                        $("#home_login").modal("show"))
            }),
            $("div.deep-menu li.deeper.parent>a, div.offcanvas-menu li.deeper.parent>a").on("click", function(e) {
                e.preventDefault(),
                    e.stopPropagation(),
                    e.stopImmediatePropagation(),
                    $ul = $(this).closest("ul"),
                    $ul.children("li.deeper.parent").children("a").removeClass("clicked_a"),
                    $ul.children("li.deeper.parent").children("ul").removeClass("clicked_ul"),
                    $(this).addClass("clicked_a"),
                    $(this).next().addClass("clicked_ul"),
                    $($ul.children("li.deeper.parent").children("a")).each(function() {
                        0 == $(this).hasClass("clicked_a") && $(this).removeClass("opened-menu")
                    }),
                    $($ul.children("li.deeper.parent").children("ul")).not(this).each(function() {
                        0 == $(this).hasClass("clicked_ul") && $(this).css("display", "none")
                    }),
                    $(this).hasClass("opened-menu") ? $(this).removeClass("opened-menu") : $(this).addClass("opened-menu"),
                    $(this).parent().hasClass("open") ? $(this).parent().removeClass("open") : $(this).parent().addClass("open"),
                    $(this).next().slideToggle()
            }),
            $($(".main_menu li.sp-menu-item.active").parents("li.sp-menu-item.sp-has-child").not(".active")).each(function() {
                $(this).addClass("active")
            }),
            $($("a")).each(function() {
                "#" == $(this).attr("href") && $(this).attr("href", "javascript:void(0);")
            }),
            $("[sendAppLink='true']").on("click", function() {
                var e = $(this).attr("input-id");
                if (0 == validateMobile(e, $("#" + e).val(), "manual"))
                    return !1;
                removeToolTipErrorManual("", $("#" + e)),
                    startAjax("/component/weaver/?task=account.sendAppLink", "mobileNo=" + $("#" + e).val().trim(), sendAppLinkResponse, "null")
            }),
            $("[class*='open_modal_']").on("click", function(e) {
                e.preventDefault(),
                    e.stopPropagation(),
                    e.stopImmediatePropagation();
                var o = $(this).attr("class").split(/\s+/)
                    , a = $(this).attr("href");
                $.each(o, function(e, o) {
                    if (-1 != o.search("open_modal_"))
                        return $("#" + o.replace("open_modal_", "")).length > 0 ? $("#" + o.replace("open_modal_", "")).modal("show") : window.location = a,
                            !0
                })
            }),
            $(document).on("keypress", ".allow_only_nums", function(e) {
                var o = e.which ? e.which : e.keyCode
                    , a = String.fromCharCode(o);
                if (8 != o && 0 != o && !(a >= 0 && a <= 9))
                    return !1
            }),
            $(document).on("keypress", ".dont_allow_nums", function(e) {
                var o = e.which ? e.which : e.keyCode;
                if (o >= 48 && o <= 57)
                    return !1
            }),
        "/rummy" == location.pathname && $(".body-innerwrapper").click(function() {
            hideNav()
        }),
            "PC" !== myDeviceType ? ($(".myaccount_topsection .user_ac_details .tab_act_btn .play_now").css("display", "block"),
                $('[download_app_btn="true"]').css("display", "block")) : "PC" == myDeviceType && "1024" == screen.width && "768" == screen.height && ($(".myaccount_topsection .user_details .user_details").css("display", "none"),
                $('[download_app_btn="true"]').css("display", "none"),
                $(".myaccount_topsection .user_ac_details .tab_act_btn .play_now").css("display", "block"))
    });
var update_both_balances = !1;
function updatePlayerBalance(e, o) {
    "nottoshow" == !o && (o = "null"),
    "both" == e && (update_both_balances = !0),
        startAjax("/component/weaver/?task=account.getPlayerBalance", 1 == e ? "refill=true" : "", getBalance, "nottoshow")
}
function refillPracticeBalance(e) {
    updatePlayerBalance(!0, e)
}
function noFunction(e) {
    return !1
}
function getBalance(e) {
    if (0 == validateSession(e))
        return !1;
    var o = JSON.parse(e);
    0 == o.errorCode && (1 == update_both_balances ? (update_both_balances = !1,
        updateBalance(parseInt(o.wallet.cashBalance)),
        updatePracticeBalance(parseInt(o.wallet.practiceBalance)),
        updateWithdrawBalance(o.wallet.withdrawableBal)) : 0 == o.refill || "false" == o.refill ? (updateBalance(parseInt(o.wallet.cashBalance)),
        updateWithdrawBalance(o.wallet.withdrawableBal)) : updatePracticeBalance(parseInt(o.wallet.practiceBalance)))
}
function logout() {
    window.location.href = base_href + "/log-out"
}
function updateMessageCount(e) {
    $("span.mail_count").html(e),
        0 == e ? $("#mail_count_view").html("") : $("#mail_count_view").html("(" + e + ")")
}
function validateMobile(e, o, a) {
    return 0 == o.length ? ("manual" == a ? showToolTipErrorManual(e, "Enter Mobile no.", "bottom", $("#" + e), void 0) : showToolTipError(e, "Enter Mobile no.", "bottom", void 0),
        !1) : 10 != o.length ? ("manual" == a ? showToolTipErrorManual(e, "Mobile no. should be of 10 digits", "bottom", $("#" + e), void 0) : showToolTipError(e, "Mobile no. should be of 10 digits", "bottom", void 0),
        !1) : /^[5-9]{1}[0-9]{9}$/.test(o) ? (removeToolTipErrorManual("", $("#" + e)),
        !0) : ("manual" == a ? showToolTipErrorManual(e, "Invalid mobile no.", "bottom", $("#" + e), void 0) : showToolTipError(e, "Invalid mobile no.", "bottom", void 0),
        !1)
}
function sendAppLinkResponse(e) {
    if (0 == validateSession(e))
        return !1;
    var o = $.parseJSON(e);
    $.each($(".success-msg"), function(e, a) {
        if ($(a).parent(":visible").length > 0)
            return "msgAlreadySent" == o.respMsg && $(a).find("span").html("You have already requested the download link, please check SMS on your mobile. If not received try again after 48 hours."),
                $(".download_app_mobile").css("display", "none"),
                $(a).css("display", "block"),
                !1
    })
}
function openLiveChat() {
    $zopim.livechat.window.openPopout()
}
function togglePwd() {
    "password" == $("#login-form-2  #password").attr("type") ? ($("#login-form-2  #password").attr("type", "text"),
        $("#login-form-2  #showPwd").attr("class", "hide_pa")) : ($("#login-form-2  #password").attr("type", "password"),
        $("#login-form-2  #showPwd").attr("class", "show_pa"))
}
function startAjaxCallForLotame(e, o) {
    return $.ajax({
        type: "POST",
        url: o,
        data: e,
        cache: !1,
        crossDomain: !0,
        processData: !1,
        async: !0,
        xhrFields: {
            withCredentials: !0
        },
        success: function(e) {
            $("body").append(e)
        }
    }),
        !1
}
function openInPopuop(e) {
    try {
        var o = screen.width / 2 - 420
            , a = screen.height / 2 - 225;
        referFriedPopup=window.open(e, "RaferaFriendWindow", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=1, resizable=no, copyhistory=no, width=840, height=450, top=" + a + ", left=" + o)
    } catch (e) {
        $("#loadingImage").css("display", "none")
    }
}
function triggerModal(e, o, a) {
    "login_widget" == e && "pc" == o ? ($("#fb-alert-modal-log").find(".alert-danger").html(a),
        $("#fb-alert-modal-log").modal("show")) : "login_widget" == e && "mobile" == o ? ($("#fb-alert-modal-log-mob").find(".alert-danger").html(a),
        $("#fb-alert-modal-log-mob").modal("show")) : "register_widget" == e && "pc" == o ? ($("#fb-alert-modal").find(".alert-danger").html(a),
        $("#fb-alert-modal").modal("show")) : ($("#fb-alert-modal-mob").find(".alert-danger").html(a),
        $("#fb-alert-modal-mob").modal("show"))
}
function utmPrepareCampaignTracking(e) {
    var o;
    (o = e.split("?")[1]) && startAjax("/component/weaver/?task=account.campaignTracking", o, noFunction, "nottoshow")
}
function openNav() {
    $("body").addClass("offcanvas"),
        $("#offcanvas_rummy").css("display", "block")
}
function hideNav() {
    $("body").removeClass("offcanvas"),
        $("#offcanvas_rummy").css("display", "none")
}
function openwebsite() {
    try {
        websiteWindow && websiteWindow.close(),
            websiteWindow = window.open("/", "parent")
    } catch (e) {
        $("#loadingImage").css("display", "none")
    }
}


function appEvent(e, o) {
    if ("updateprofile" == e) {
        var a = []
            , t = $("#updateProfileAmount").val()
            , n = $("#updateProfileBonus").val();
        a.status = e,
        "" != t && (a.amount = t),
        "" != n && (a.bonus = n);
        var r = Object.assign({}, a)
    } else
        r = {
            status: e
        };
    var i = $("#loginFrom").val();
    "Android" == o && "app" == i ? window.appWebCommunication.handleEvents(JSON.stringify(r)) : "iOS" == o && "app" == i ? window.webkit.messageHandlers.handleEvents.postMessage(r) : "playrummy" == e || "success" == e ? (openRummyWindow(),
        null == window.opener ? location.href = "/rummy" : window.close()) : "addcash" == e ? location.reload() : "close" == e ? window.close() : (openRummyWindow(),
        null == window.opener ? location.href = "/rummy" : window.close())
}
String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1)
}
    ,
    Date.prototype.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    Date.prototype.getMonthName = function() {
        return this.monthNames[this.getMonth()]
    }
    ,
    $(document).ready(function() {
        for (var e = document.cookie.split(";"), o = !1, a = !1, t = !1, n = 0; n < e.length; n++) {
            var r = e[n].split("=");
            try {
                "launchCashierAfterLogin" == r[0].trim() && (o = r[1]),
                "launchRummyAfterLogin" == r[0].trim() && (a = r[1]),
                "launchReferAFriendAfterLogin" == r[0].trim() && (t = r[1])
            } catch (e) {}
        }
        1 != o && "true" != o || (document.cookie = "launchCashierAfterLogin=",
            openCashierWindow()),
        1 != a && "true" != a || (document.cookie = "launchRummyAfterLogin=",
            openRummyWindow()),
        1 != t && "true" != t || (document.cookie = "launchReferAFriendAfterLogin=",
            openReferAFriendPage())
    }),
    $(window).load(function() {
        null != window.opener && $(".zopim").hide()
    }),
    window.appWebCommunication = function() {}
;
