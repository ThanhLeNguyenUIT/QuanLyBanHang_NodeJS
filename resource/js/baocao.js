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