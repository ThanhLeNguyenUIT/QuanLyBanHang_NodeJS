$(document).ready(function() {
    var category_val;
    $(".btn-add_product").click(function() {
        $(".modal_add-product").css("display", "flex");
    });

    $(".btn-add-product-cancel").click(function() {
        $(".modal_add-product").css("display", "none");
    });
    $(".add-category_form").click(function() {
        $(".modal_category-modify").css("display", "flex");
        $(".modify-category_form-add").css("display", "block");
    });
    $(".btn-add-category-cancel").click(function() {
        $(".modal_category-modify").css("display", "none");
        $(".modify-category_form-add").css("display", "none");
    });
    $(".category-item-icon").click(function() {
        $(".modal_category-modify").css("display", "flex");
        $(".modify-category_form-edit").css("display", "block");
        $(".auth-form_input-edit").text(category_val);
    });
    $(".btn-edit-category-cancel").click(function() {
        $(".modal_category-modify").css("display", "none");
        $(".modify-category_form-edit").css("display", "none");
    });
    $(".auth-form_wrap .auth-form_input-group-product,.auth-form_wrap .auth-form_arrow-icon").click(function() {
        $(".category-Product-list").slideDown();
    })
    $(".auth-form_wrap .category-Product-item").click(function() {
        var temp = $(this).text();
        $(".auth-form_input-group-product").val(temp);
        $(".category-Product-list").slideUp();
    })

})