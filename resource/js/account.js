$(document).ready(() => {
    //add account
    $(".btn-account-cancel").click(function() {
        $(".modal_add-account").css("display","none");
    });
    $(".btn-add").click(function() {
        $(".modal_add-account").css("display", "flex");
        $(".auth-form").css("display", "block");
    });

    // edit account
    $(".edit").click(function() {
        $(".modal_edit-account").css("display","flex");
        $(".auth-form").css("display", "block");
    })
    $(".btn-agency-cancel").click(() => {
        $(".modal_edit-account").css("display","none");
        $(".auth-form").css("display", "none");
    })
})
