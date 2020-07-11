$(document).ready(() => {
    let i = 0;
    var dropdownItemTemplate = $('#dropdown-item-template'); 
    
    $.ajax({
        type: 'GET',
        url: '/order',
        success: function(data){
            console.log('success', data);
        }
    })
    // function addProduct(product){
    //     $('.order-search-dropdown').append(Mustache.render(dropdownItemTemplate,product));
    // }
    // Tìm hàng hoá
//    $('#searchProduct').click(() => {
//        $('#searchProduct').html('');
//        var searchField = $('#searchProduct').val();
//        var expression = new RegExp(searchField, 'i');
//        $.getJSON('product.json', (data) => {
//            console.log(data);
//            $.each(data, (key,value) => {
//                if(value.id.search(expression) != 1 || value.name.search(expression)){
//                    $('.order-search-dropdown').append('<li class="search-dropdown-item"> <div class="search-line-1"> <span class="search-product-name">+ value.name  + </span>  </div>   </li>')
//                }
//            })
//        })
//    })
    // thêm hoá đơn
    $('#addIcon').click(() =>{
        i++;
        console.log($('.order-search-dropdown').length);
        if(i<=5){
            $('<button class="tab_button" id="tabButton">Hoá đơn '+ i +' <i class="fas fa-times close-icon" id="closeIcon"></i></button>').insertBefore('#addIcon')
        }
        else{
            alert('Đã đạt tối đa hoá đơn');
        }
    })
    $('#billContainer').delegate('.close-icon','click', function(){
        var $button = $(this).closet('button');
        $button.remove();
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