$(document).ready(() => {
    $(".btn-add").click(() => {
        $(".modal_add-account").css("display", "flex");
        $("#auth-add-account").show();
    })
    $(".btn-account-cancel").click(() => {
        $(".modal_add-account,.modal_edit-account").hide();
        $(".auth-form").hide();
    })
    $(".edit-account-btn").click(function() {
        $(".modal_edit-account").css("display", "flex");
        $("#auth-edit-account").css("display", "block");
        $.ajax({
            type: 'GET',
            url: '/taikhoan/sua-taikhoan/' + $(this).attr('data-id'),
            success: function(data) {
                console.log(data.category_account)
                $('#nameAccount').val(data.name);
                $('#emailAccount').val(data.email);
                $('#passAccount').val(data.password);
                $('#sexual').val(data.sexual);
                $('#addressAccount').val(data.address_account);
                $('#dateBegin').val(data.date);
                $('#salary').val(data.salary);
                $('#phoneNumber').val(data.phone_account);
                $('#cateAccount').val(data.category_account);
                var temp = '/taikhoan/sua-taikhoan/' + data._id;
                $('#form-edit-account').attr('action', temp);
            }
        })

    });
    $('.alert_success,.alert_errors').click(function() {
        $(this).hide(400);
    })
})