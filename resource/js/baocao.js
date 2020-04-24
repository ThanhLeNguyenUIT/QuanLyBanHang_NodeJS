$(function() {
    $("#reportContainer").dxDataGrid({
        dataSource: customers,
        showBorders: true,
        paging: {
            pageSize: 10
        },
        pager: {
            showPageSizeSelector: true,
            allowedPageSizes: [5, 10, 20],
            showInfo: true
        },

        columns: ["STT", "Agency", "so phieu xuat", "num", "Title"]

    });

});
$(function() {
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
        value: selections[0]
    }).dxRadioGroup("instance");
    // radioGroup.option("value", selections[0]);

})
var selections = ["Báo cáo", "Công nợ"];
var customers = [{
    "STT": 1,
    "Agency": "Premier Buy",
    "so phieu xuat": 14,
    "num": 10000000,
    "Title": 3.5
}];