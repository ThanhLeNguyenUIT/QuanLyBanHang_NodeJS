$(document).ready(() => {
    //add agency
    $(".btn-agency-cancel").click(function() {
        $(".modal_edit-agency").css("display", "none");
    });
    $(".btn-add").click(function() {
        $(".modal_edit-agency").css("display", "flex");
        $("#auth-form_add_agency").css("display", "block");
    });

    // edit agency
    $(".edit-agency-btn").click(function() {
        $(".modal_edit-agency").css("display", "flex");
        $("#auth-form_edit-agency").css("display", "block");
        $.ajax({
            type: 'GET',
            url: '/daily/sua-daily/' + $(this).attr('data-id'),
            success: function(data) {
                console.log(data)
                $('#auth_agency_code').val(data.id_agency);
                $('#auth_agency-name').val(data.name_agency);
                $('#auth_group').val(data.group_agency);
                $('#area_agency').val(data.area_agency);
                $('#auth_agency_number').val(data.phone_agency);
                $('#auth_agency_address').val(data.address_agency);
                $('#auth_date').val(data.date_agency);
                var temp = '/daily/sua-daily/' + data._id;
                $('#form-edit-agency').attr('action', temp);
            }
        })
    })
    $(".btn-agency-cancel").click(() => {
        $(".modal_edit-agency").css("display", "none");
        $(".auth-form").css("display", "none");
    })
    $('.alert_success,.alert_errors').click(function() {
        $(this).hide(400);
    })

    $(".add-group-agency,.edit-group-agency,.add-area-agency,.edit-area-agency").click(function() {
        $(".modal_edit-group").css("display", "flex");
    });
    $(".btn-min-cancel").click(() => {
        $(".modal_edit-group").css("display", "none");
        $("#auth-form_edit-group-agency,#auth-form_add-group-agency,#auth-form_add-area-agency,#auth-form_edit-area-agency").css("display", "none");
    })

    $('.add-group-agency').click(function() {
        $("#auth-form_add-group-agency").css("display", "block");
        $('#nameGroupAdd').focus();
    })
    $('.add-area-agency').click(function() {
        $("#auth-form_add-area-agency").css("display", "block");
        $('#nameAreaAdd').focus();
    })
    $('.edit-group-agency').click(function() {
        $("#auth-form_edit-group-agency").css("display", "block");
        $('#nameGroupEdit').focus();
        $.ajax({
            type: 'GET',
            url: '/daily/sua-group/' + $(this).attr('data-id'),
            success: function(data) {
                $('#nameGroupEdit').val(data.name_groupAgency);
                var temp = '/daily/sua-group/' + data._id;
                $('#edit-group-form').attr('action', temp);
                temp = '/daily/xoa-group/' + data._id;
                $('.btn--delete').attr('href', temp);
            }
        })
    })
    $('.edit-area-agency').click(function() {
        $("#auth-form_edit-area-agency").css("display", "block");
        $('#nameAreaEdit').focus();
        $.ajax({
            type: 'GET',
            url: '/daily/sua-area/' + $(this).attr('data-id'),
            success: function(data) {
                $('#nameAreaEdit').val(data.name_areaAgency);
                var temp = '/daily/sua-area/' + data._id;
                $('#edit-area-form').attr('action', temp);
                temp = '/daily/xoa-area/' + data._id;
                $('.btn--delete').attr('href', temp);
            }
        })
    })
})