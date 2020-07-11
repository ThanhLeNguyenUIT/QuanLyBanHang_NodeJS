$(document).ready(() => {
    let i = 0;
    var date = new Date();
    document.getElementsByClassName('date').innerText = date;


       // thêm hoá đơn khi bấm +
       $('#billContainer').delegate('#addIcon','click', (e) =>{
        let lengthLoop = $('.bill_container').children().length;
        if (lengthLoop <= 5){
        i++
        var billTabTemplate = '<button class="tab_button" id=" \'tabButton'+i+' \'" onclick="openTab(event, \'tab'+i+'\')"> Hoá đơn '+ i
        + ' <i class="fas fa-times close-icon" id="closeIcon"></i>'
        + '</button>';

        var billInfoTemplate = '<table class="order_table" id="tab'+i+'">'
        + '<thead>'
        +   '<tr class="order_table-head">'
        +        '<th class="order_table-head-item order-id">Mã</th>'
        +        '<th class="order_table-head-item order-delete"></th>'
        +        '<th class="order_table-head-item order-name">Tên hàng</th>'
        +        '<th class="order_table-head-item order-kind">Loại</th>'
        +        '<th class="order_table-head-item order-amount">Số lượng</th>'
        +        '<th class="order_table-head-item order-price">Đơn giá</th>'
        +        '<th class="order_table-head-item order-totalPrice">Tổng tiền</th>'
        +    '</tr>'
        + '</thead>'
        + '<tbody class="order_table-body">'
        + '</tbody>'
        + '</table>';

        if(lengthLoop<=5){
            $(billTabTemplate).insertBefore('#addIcon');
            $('.container_order-list').append(billInfoTemplate);
            $('.order_table').css('display','none');
        }
        else{
            alert('Đã đạt tối đa hoá đơn');
        }
        }
    })

    // xoá tab hoá đơn khi click x
    $('#billContainer').delegate('.close-icon','click', function(e){
        let lengthLoop = $('.cart').children().length;
        if(lengthLoop>0){
                var answer = window.confirm('Delete bill ?')
                if(answer){
                $(this).parent().remove();
                $('.cart').parent('.order_table').remove();
                $('.finalPrice').text('0');
                $('.search_product-input').value = '';
            }
        }
        $(this).parent().remove();
        $('.cart').parent('.order_table').remove();
        $('.finalPrice').text('0');
        $('.search_product-input').value = '';
    })

    //tìm hàng hoá theo tên
    $('.search_product-input').keyup(() => {
       $.ajax({
           type: 'GET',
           url: '/order/search',
           success: function(data){
            $('.order-search-dropdown').html('');
            var searchValue = $('#searchProduct').val();
            var expression = RegExp(searchValue, 'i');
            $.each(data, function(key,value){
                var productTemplate = '<li class="search-dropdown-item"  data-id='+ value._id +'>'
                + '<div class="search-line-1">'
                + '<span class="search-product-name">' + value.name_product + '</span>'
                + '</div>'
                +'<div class="search-line-2">'
                + '<span> ' + value.id_product + '</span>'
                + '<span class="search-product-price"> Giá: '+ value.price + '</span>'
                + '</div>'
                + '<div class="search-line-3">'
                + '<span> Tồn kho: '+ value.exit + '</span>'
                + '</div>'
                + '</li> ';
                if( value.name_product.search(expression) != -1){
                    $('.order-search-dropdown').append(productTemplate);
                }
            })
           }
       })
    })

     // thêm hàng hoá  vào giỏ hàng khi click
    $('.order-search-dropdown').delegate('.search-dropdown-item','click',(e) =>{
        $.ajax({
            type: 'GET',
            url : '/order/search/' + $(e.currentTarget).attr('data-id'),
            success: function(data){
                let amount = 1;
                var dataId = data._id.toString();
                let productTemplate = '<tr class="order_table-row" id='+data._id+'>'
             +   '<td class="order_table-body-item">'+data.id_product+'</td>'
             +   '<td class="order_table-body-item"><i class="fas fa-trash-alt delete-icon order_item" data-id='+data._id+'></i></td>'
             +   '<td class="order_table-body-item">'+data.name_product+'</td>'
             +   '<td class="order_table-body-item">'+data.type_product+'</td>'
             +   '<td class="order_table-body-item">'+amount+'</td>'
             +   '<td class="order_table-body-item">'+data.price+'</td>'
             +   '<td class="order_table-body-item">'+data.price*amount+'</td>'
            + '</tr>'

            let lengthLoop = $('.cart').children().length;
            let firstPrice = 0;
            let existPrice = 0;
            if (lengthLoop == 0 )
            {
                $('.cart').append(productTemplate);
                // lấy giá trị của hàng hoá đầu tiên
                let getChild = document.getElementById(dataId);
                let getIdFromChild = getChild.childNodes;
                firstPrice = parseInt(getIdFromChild[6].innerText);
                $('.finalPrice').text(firstPrice);
            }
            else
            {
                let CheckExist = false;
                let pos = null;
                for(var i=0; i < lengthLoop ; i++){
                    let getCart = document.getElementById('tableId');
                    let getChildCart = getCart.childNodes;
                    if ($(e.currentTarget).attr('data-id') == getChildCart[i].id)
                    {
                        CheckExist = true;
                        pos = getChildCart[i].id;
                    }
                }
                if (CheckExist == true){
                    let cart = document.getElementById('tableId');
                    let cartChild = cart.childNodes;
                    for(var i = 0; i < lengthLoop; i++){
                        if ($(e.currentTarget).attr('data-id') == cartChild[i].id){
                            let cartItemChild = cartChild[i].childNodes;
                            // thay  đổi số lượng hàng tồn tại trong giỏ
                            let amountChange = parseInt(cartItemChild[4].innerText) + 1;
                            let amountChangeText = amountChange + "";
                            cartItemChild[4].innerText = amountChangeText;
                            //thay đổi giá của hàng tồn tại trong giỏ
                            let priceChange = amountChange *  parseInt(cartItemChild[5].innerText);
                            let priceChangeText = priceChange + "";
                            cartItemChild[6].innerText = priceChangeText;
                            // thay đổi tổng tiền
                            existPrice = parseInt(cartItemChild[5].innerText);
                            var money = document.getElementById('finalPrice').textContent;
                            var moneyInt = parseInt(money) + existPrice;
                            $('.finalPrice').text(moneyInt);
                        }
                    }
                }
                else{
                    $('.cart').append(productTemplate);
                    let getTableBody = document.getElementById('tableId');
                    let getTableRow = getTableBody.childNodes;
                    // lấy giá của sản phẩm cuối trong giỏ
                    let length = getTableRow.length - 1;
                    let getItemPrice = getTableRow[length].childNodes;
                    let itemPrice = parseInt(getItemPrice[6].innerText);
                    var money = document.getElementById('finalPrice').textContent;
                    var moneyInt = parseInt(money) + itemPrice;
                    $('.finalPrice').text(moneyInt);
                }
            }
        }
        })
    })
  
      // xoá hàng trong giỏ
      $('.container_order-list').delegate('.delete-icon','click',(e) =>{
        $.ajax({
            type: 'GET',
            url: '/order/search/' + $(e.currentTarget).attr('data-id'),
            success: function(data){
                var string = '#'+data._id;
                var item = document.getElementById(data._id);
                var itemChild = item.childNodes;
                var finalPrice = document.getElementById('finalPrice');
                var amount = parseInt(itemChild[4].innerText);
                $(string).remove();
                var minusPrice = parseInt(finalPrice.innerText) - parseInt(itemChild[6].innerText);
                var minusPrice = minusPrice + "";
                $('.finalPrice').text(minusPrice);
            }
        })
    })

    //tim đại lí theo tên
    $('.bill-agency-input').keyup(() => {
        $.ajax({
            type: 'GET',
            url: '/order/searchAgency',
            success: function(data){
            $('.agency-dropdown').html('');
            var searchValue = $('#searchAgency').val();
            var expression = RegExp(searchValue, 'i');
            $.each(data, function(key,value){
                var agencyTemplate = '<li class="agency-dropdown-item"  data-id='+ value._id +'>'
                + '<div class="agency-line-1">'
                + '<span class="agency-name">' + value.name_agency + '</span>'
                + '</div>'
                +'<div class="agency-line-2">'
                + '<span> ' + value.id_agency + '</span>'
                + '<span class="agency-group"> Nhóm '+ value.group_agency + '</span>'
                + '</div>'
                + '<div class="agency-line-3">'
                + '<span class="agency-area"> Khu vực: '+ value.area_agency + '</span>'
                + '</div>'
                + '</li> ';
                if( value.name_agency.search(expression) != -1){
                    $('.agency-dropdown').append(agencyTemplate);
                }
            })
            }
        })
    })

    // chọn đai lí
    $('.agency-dropdown').delegate('.agency-dropdown-item','click',(e) =>{
        $.ajax({
            type: 'GET',
            url: '/order/searchAgency/' + $(e.currentTarget).attr('data-id'),
            success: function(data){
                let agencyName = data.name_agency + ""
                $('.bill-agency-input').val(agencyName);
            }
        })
    })

    //Thanh toán Bill

    $('.bill_confirm').click(() => {
        var nameAccount = $('.accountName').text();
        var nameAgency = $('.bill-agency-input').val();
        var date = $('.date').text();
        var finalPrice = $('.finalPrice').text();
        let error = '';
        if(finalPrice == 0){
            error = 'Không thể thanh toán do lỗi hoặc chưa có hàng hoá';
        }
        if(nameAgency == null || nameAgency == ''){
            error = 'Không thể thanh toán do chưa chọn đại lý'
        }
        if(error != ''){
            window.alert(error);
        }
        else{
        $.ajax({
            url: '/order/addBill',
            data: {accountName: nameAccount, agencyName: nameAgency, dateCheckIn: date, finalPrice: finalPrice},
            method: 'POST',
            success: function(){
                $('.active').remove();
                $('.cart').parent('.order_table').remove();
                $('.finalPrice').text('0');
                $('.search_product-input').value = '';
                window.alert('Thanh toán hoá đơn thành công')
            },
            error: function(err){
                console.log(err);
            }
        })
    }
    })

    // di chuyển chuột vào drop down search
    $('.search_product-input').keyup(() =>{
        $('.order-search-dropdown').css('display','block');
    })
    $('.search_product-input').mousedown(() =>{
        $('.order-search-dropdown').css('display','block');
    })
    $('.order-search-dropdown').mouseleave(() =>{
        $('.order-search-dropdown').css('display','none');
    })

    // di chuyển chuột vào drop down agency

    $('.bill-agency-input').keyup(() =>{
        $('.agency-dropdown').css('display','block');
    })
    $('.bill-agency-input').mousedown(() =>{
        $('.agency-dropdown').css('display','block');
    })
    $('.agency-dropdown').mouseleave(() =>{
        $('.agency-dropdown').css('display','none');
    })
 }) ;

    // Chức năng chuyển hoá đơn khi bấm tab
    function openTab(event, tab) {
    var i, order_table, tab_button;
    order_table = document.getElementsByClassName('order_table');
    for (i = 0; i < order_table.length; i++) {
        order_table[i].style.display = "none";
        var table =  order_table[i].childNodes;
        table[1].className = table[1].className.replace("cart", "");
        table[1].id = table[1].id.replace("tableId", "");
    }
    tab_button = document.getElementsByClassName('tab_button');
    for (i = 0; i < tab_button.length; i++) {
        tab_button[i].className = tab_button[i].className.replace("active", "");
    }
    document.getElementById(tab).style.display = "table";
    var table = document.getElementById(tab);
    var tableChild = table.childNodes;
    tableChild[1].className = tableChild[1].className += " cart";
    tableChild[1].id = tableChild[1].id += "tableId"
    event.currentTarget.className += " active";

    //lấy giá của tổng hàng trong từng bill tab
    let lengthLoop = $('.cart').children().length;
    let cart = document.getElementById('tableId');
    let cartChild = cart.childNodes;
    let totalPrice = 0;
    for(var i=0; i< lengthLoop; i++){
        let cartItemChild = cartChild[i].childNodes;
        totalPrice = totalPrice + parseInt(cartItemChild[6].innerText);
    }
    let totalPriceText = totalPrice + "";
    $('.finalPrice').text(totalPriceText);
}