$(document).ready(function() {
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
        $.ajax({
            type: "GET",
            url: '/hanghoa/updateCate/' + $(this).attr('data-id'),
            success: function(cate) {
                $('#nameCateUpdate').val(cate.name_category);
            },
            error: function() {
                alert('fail to take value value update');
            }

        })
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

    });
    $(".category-Product-item").click(function() {
        var temp = $(this).text();
        temp = temp.replace(/\s+/g, '');
        $(".auth-form_input-group-product").val(temp);
        $(".category-Product-list").slideUp();
    });
    $(".btn-product-cancel").click(function() {
        $(".modal_edit-product").css("display", "none");
        $(".auth-form").css("display", "none");
    });
    var category;
    $('.category-item-icon').click(function() {
        category = $(this).siblings().text();
        category = category.replace(/\s+/g, '');
        $('.edit-name-cate').val(category);
    });
    $(".edit-product-btn").click(function() {
        $(".modal_edit-product").css("display", "flex");
        $(".auth-form").css("display", "block");
        $.ajax({
            type: "GET",
            url: '/hanghoa/update/' + $(this).attr('data-id'),
            success: function(product) {
                console.log(product);
                $('#IDProUpdate').val(product.id_product)
                $('#nameProUpdate').val(product.name_product)
                $('#cateProUpdate').val(product.category)
                $('#typeProUpdate').val(product.type_product)
                $('#priceOProUpdate').val(product.ogn_price)
                $('#priceProUpdate').val(product.price)
                $('#exitProUpdate').val(product.exit)

            },
            error: function() {
                alert('fail to take value product update')
            }

        })
    });







})