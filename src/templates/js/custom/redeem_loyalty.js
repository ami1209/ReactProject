var $ = jQuery.noConflict();

$(document).ready(function () {
    $("[redeem-now]").on('click', function () {
        if($(this).parents(".redeem_box").find("[redeem-now-lps]").attr("redeem-now-lps") > current_loyalty_points) {
            $("#insuffi_loyalty_cash_popup div.modal-body strong").html($(this).parents(".redeem_box").find("[redeem-now-lps]").attr("redeem-now-lps"));
            $("#insuffi_loyalty_cash_popup").modal('show');
        }
        else {
            $("#redeem_cash_confirmation_popup div.modal-body img").attr('src', base_href+"/templates/shaper_helix3/images/my_account/loyalty/redeem_amount_"+$(this).attr("redeem-now")+"-1.png");
            $("#redeem_cash_confirmation_popup div.modal-body .text [redeem-now-modal-text]").html($(this).attr("redeem-now"));
            $("#redeem_cash_confirmation_popup div.modal-body .text [redeem-now-modal-text-lps]").html($(this).parents(".redeem_box").find("[redeem-now-lps]").attr("redeem-now-lps"));
            $("[redeem-cash-yes-button]").attr('redeem-amount', $(this).attr("redeem-now"));
            $("#redeem_cash_confirmation_popup").modal('show');
        }
    });

    $('[redeem-cash-yes-button="true"]').on('click', function () {
        clearSystemMessage();
        $("body").append("<form action='/component/weaver/?task=loyalty.getCashLoyalty' method='post' id='redeem-cash-form'><input type='hidden' name='amount' value='"+$(this).attr("redeem-amount")+"'/></form>");
        document.getElementById("redeem-cash-form").submit();
    });

    $(".redeem_box").find("select").on('change', function () {
        removeToolTipError('all');
        if($(this).val() == "select") {
            showToolTipError($(this).parents(".redeem_box").find(".redeem_item_quantity").find("select"), "Please select quantity.", "top", undefined);
            return false;
        }
    });

    $("[buy-now]").not("[disabled='disabled']").on('click', function () {
        removeToolTipError("all");
        var quantity = $(this).parents(".redeem_box").find(".redeem_item_quantity").find("select").val();
        if(quantity == "select") {
            showToolTipError($(this).parents(".redeem_box").find(".redeem_item_quantity").find("select"), "Please select quantity.", "top", undefined);
            return false;
        }
        quantity = parseInt(quantity);

        if($(this).attr("buy-now") > current_loyalty_points) {
            if(quantity == 1 )
                $("#insuffi_loyalty_merchandise_popup div.modal-body .text>p>strong").html($(this).attr("buy-now"));
            else
                $("#insuffi_loyalty_merchandise_popup div.modal-body .text>p>strong").html(quantity + "x"+$(this).attr("buy-now")+"=" +(quantity*parseInt($(this).attr("buy-now"))));
            $("#insuffi_loyalty_merchandise_popup").modal('show');
        }
        else {
            var item_name_on_modal = "";
            var item_price_on_modal = "";
            if(quantity == 1 ) {
                item_name_on_modal = $(this).parents(".redeem_box").find(".redeem_item_title").find(".item_name").html();
                item_price_on_modal = $(this).attr("buy-now");
            }
            else {
                item_name_on_modal = quantity + " x " +$(this).parents(".redeem_box").find(".redeem_item_title").find(".item_name").html();
                item_price_on_modal = (quantity*parseInt($(this).attr("buy-now")));
            }

            if(item_price_on_modal > current_loyalty_points) {
                $("#insuffi_loyalty_merchandise_popup div.modal-body .text>p>strong").html(quantity + "x"+$(this).attr("buy-now")+"=" +item_price_on_modal);
                $("#insuffi_loyalty_merchandise_popup").modal('show');
                return;
            }

            $("#redeem_merchandise_confirmation_popup [merchandise-modal-text='true']").html(item_name_on_modal);
            $("#redeem_merchandise_confirmation_popup [merchandise-modal-lp='true']").html(item_price_on_modal);

            $("#redeem_merchandise_confirmation_popup div.modal-body>.item>img").attr("src", $(this).parents(".redeem_box").find(".redeem_item_icon").find("img").attr("src"));
            $("#redeem_merchandise_confirmation_popup [redeem-merchandise-yes-button]").attr('redeem-merchandise-yes-button', $(this).parents(".redeem_box").attr("productId"));
            $("#redeem_merchandise_confirmation_popup [redeem-merchandise-yes-button]").attr('redeem-merchandise-quantity', quantity);
            $("#redeem_merchandise_confirmation_popup").modal('show');
        }
    });

    $("[redeem-merchandise-yes-button]").on('click', function () {
        clearSystemMessage();
        $("body").append("<form action='/component/weaver/?task=loyalty.buyMerchandise' method='post' id='buy-merchandise-form'><input type='hidden' name='productId' value='"+$(this).attr("redeem-merchandise-yes-button")+"'/><input type='hidden' name='quantity' value='"+$(this).attr("redeem-merchandise-quantity")+"'/></form>");
        document.getElementById("buy-merchandise-form").submit();
    });
});
