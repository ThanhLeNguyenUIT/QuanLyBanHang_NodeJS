const { get } = require("jquery");

$(document).ready(() => {
    $(".header_user-container").mouseover(() => {
        $(".user_dropdown").show(1000);
    })

    $.ajax({
        type: 'GET',
        url: 'bieudo/chart'
    })
})