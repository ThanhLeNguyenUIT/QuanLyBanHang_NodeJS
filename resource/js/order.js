$(document).ready(() => {
    let i = 0;
    $('#addIcon').click(() =>{
        i++;
        if(i<=5){
            $('<button class="tab_button" id="tabButton">Hoá đơn <i class="fas fa-times close-icon" id="closeIcon"></i></button>').appendTo('#billContainer')
        }
        else{
            alert('Đã đạt tối đa hoá đơn');
        }
    })
    $('#closeIcon').click(() => {
        $('#tabButton').remove();
    })

    // $('.search_product-input').mousedown(() =>{
    //     $('.order-search-dropdown').show();
    // })
    // $('.order-search-dropdown').mouseleave(() =>{
    //     $('.order-search-dropdown').hide();
    // })
 }) ;
    function openTab(event, tab) {
    var i, order_table, tab_button;
    order_table = document.getElementsByClassName('order_table');
    for (i = 0; i < order_table.length; i++) {
        order_table[i].style.display = "none";
    }
    tab_button = document.getElementsByClassName('tab_button');
    for (i = 0; i < tab_button.length; i++) {
        tab_button[i].className = tab_button[i].className.replace("active", "");
    }
    document.getElementById(tab).style.display = "table";
    event.currentTarget.className += " active";
    }