$(document).ready(function() {
    var selectedDateFrom = $("#selected-date-from").dxDateBox({
        value: new Date(),
        width: "100%",
        onValueChanged: function(data) {
            calendar.option("value", data.value);
        }
    }).dxDateBox("instance");
    var selectedDateTo = $("#selected-date-to").dxDateBox({
        value: new Date(),
        width: "100%",
        onValueChanged: function(data) {
            calendar.option("value", data.value);
        }
    }).dxDateBox("instance");
    var radioGroup = $("#radio-group-with-selection").dxRadioGroup({
        items: selections,
        onOptionChanged: function(e) {
            $.each(task, function(i, item) {
                if (item.selection === e.value) {
                    $('#report_CN_DT').show();
                    $('#report_HD').hide();
                    $(".report-table_header-title").text(task[i].title);
                    $("#column_2-header").text(task[i].column_2);
                    $("#column_3-header").text(task[i].column_3);
                    $("#column_4-header").text(task[i].column_4);
                }
            })
            if (e.value == "Hoá đơn") {
                $('#report_HD').show();
                $('#report_CN_DT').hide();

            }
        }

    }).dxRadioGroup("instance");
    radioGroup.option("value", selections[0]);

    $(".view-bill-btn").click(function() {
        $(".modal_bill-details").css("display", "flex");
        $(".auth-form").css("display", "block");
    })
    $(".btn-cancel").click(() => {
        $(".modal_bill-details").css("display", "none");
        $(".auth-form").css("display", "none");
    })
})
var selections = ["Báo cáo", "Công nợ", "Hoá đơn"];
var task = [{
    title: "Báo Cáo Doanh Số",
    column_2: "Số Phiếu Xuất",
    column_3: "Tổng Trị Giá",
    column_4: "Tỷ Lệ",
    selection: "Báo cáo"
}, {
    title: "Báo Cáo Công Nợ Đại Lý",
    column_2: "Nợ Đầu",
    column_3: "Phát Sinh",
    column_4: "Nợ cuối",
    selection: "Công nợ"
}]