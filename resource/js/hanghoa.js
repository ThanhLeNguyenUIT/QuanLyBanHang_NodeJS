$(document).ready(function() {
    $(".btn-add").click(function() {
        $(".modal_add-product").css("display", "flex");
        $(".auth-form").css("display", "block");
        $('.auth-form_input:first').focus();
    });
    $(".btn-product-cancel").click(function() {
        $(".modal_add-product").css("display", "none");
        $(".auth-form").css("display", "none");
    });
    $(".add-category,.auth-form_plus-icon").click(function() {
        $(".modal-category").css("display", "flex");
        $(".auth-form_min-add").css("display", "block");
        $('#nameCateAdd').focus();
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
                var temp = '/hanghoa/edit-cate/' + cate._id;
                $('#edit-cate-form').attr('action', temp);
                var temp2 = '/hanghoa/deleteCate/' + cate._id;
                $('.btn--delete').attr('href', temp2);
            },
            error: function() {
                alert('fail to take value value update');
            }

        })
        $('#nameCateUpdate').focus();
    });

    $(".btn-edit-category-cancel").click(function() {
        $(".modal-category").css("display", "none");
        $(".auth-form_min-edit").css("display", "none");
    });
    $('btn_add-pro').click(function() {

    })

    $('.btn-edit-category').click(function() {
        // $.ajax({
        //     type: 'GET',
        //     url: '/getloi',
        //     success: function(a) {
        //         $('arlet_success').text(a);
        //     }

        // })
    })
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
        temp = temp.trim();
        $(".auth-form_input-group-product").val(temp);
        $(".category-Product-list").slideUp();
    });
    $(".btn-product-cancel").click(function() {
        $(".modal_edit-product").css("display", "none");
        $(".auth-form").css("display", "none");
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

    $('.auth-form_input').focus(function() {
        $(".category-Product-list").slideUp();
    })
    $('.alert_success,.alert_errors').click(function() {
        $(this).hide(400);
    })


})