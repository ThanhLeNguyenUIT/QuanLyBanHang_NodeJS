$(document).ready(function() {
    var category_val;
    $(".btn-add").click(function() {
        $(".modal_add-product").css("display", "flex");
        $(".auth-form").css("display", "block");
    });

    $(".btn-product-cancel").click(function() {
        $(".modal_add-product").css("display", "none");
        $(".auth-form").css("display", "none");
    });
    $(".add-category,.auth-form_plus-icon").click(function() {
        $(".modal-category").css("display", "flex");
        $(".auth-form_min-add").css("display", "block");
    });
    $(".btn-add-category-cancel").click(function() {
        $(".modal-category").css("display", "none");
        $(".auth-form_min-add").css("display", "none");
    });
    $(".category-item-icon").click(function() {
        $(".modal-category").css("display", "flex");
        $(".auth-form_min-edit").css("display", "block");
    });
    $(".btn-edit-category-cancel").click(function() {
        $(".modal-category").css("display", "none");
        $(".auth-form_min-edit").css("display", "none");
    });
    var sel = 0;
    $(".auth-form_input-group-product,.auth-form_arrow-icon").click(function() {
        if (sel == 0) {
            $(".category-Product-list").slideDown();
            sel++;
        } else {
            $(".category-Product-list").slideUp();
            sel = 0;
        }

    })
    $(".category-Product-item  ").click(function() {
        var temp = $(this).text();
        $(".auth-form_input-group-product").val(temp);
        $(".category-Product-list").slideUp();
    })
    $(".editPro.edit-product").click(function() {
        $(".modal_edit-product").css("display", "flex");
        $(".auth-form").css("display", "block");
    })
    $(".btn-product-cancel").click(function() {
        $(".modal_edit-product").css("display", "none");
        $(".auth-form").css("display", "none");
    })

})