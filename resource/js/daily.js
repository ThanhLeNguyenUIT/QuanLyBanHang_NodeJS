$(document).ready(() => {
    //add agency
    $(".btn-agency-cancel").click(function() {
        $(".modal_add-agency").css("display","none");
    });
    $(".btn-add").click(function() {
        $(".modal_add-agency").css("display", "flex");
        $(".auth-form").css("display", "block");
    });

    // edit agency
    $(".edit").click(function() {
        $(".modal_edit-agency").css("display","flex");
        $(".auth-form").css("display", "block");
    })
    $(".btn-agency-cancel").click(() => {
        $(".modal_edit-agency").css("display","none");
        $(".auth-form").css("display", "none");
    })
})