$(function() {
    $("#reportContainer").dxDataGrid({
        dataSource: orders,
        showBorders: true,
        groupPanel: {
            visible: true
        },
        grouping: {
            autoExpandAll: true,
        },
        sortByGroupSummaryInfo: [{
            summaryItem: "count"
        }],
        columns: [{
                dataField: "Employee",
                groupIndex: 0,
            },
            {
                dataField: "OrderNumber",
                caption: "Invoice Number",
                width: 130,
            },
            {
                dataField: "OrderDate",
                dataType: "date",
                width: 160
            },
            {
                caption: "City",
                dataField: "CustomerStoreCity",
                groupIndex: 1
            },
            {
                caption: "State",
                dataField: "CustomerStoreState"
            },
            {
                dataField: "SaleAmount",
                alignment: "right",
                format: "currency",
                sortOrder: "desc"
            }
        ],
        summary: {
            groupItems: [{
                column: "OrderNumber",
                summaryType: "count",
                displayFormat: "{0} orders",
            }, {
                column: "SaleAmount",
                summaryType: "max",
                displayFormat: "Max: {0}",
                valueFormat: "currency",
                alignByColumn: true,
                showInGroupFooter: false
            }, {
                column: "SaleAmount",
                summaryType: "sum",
                displayFormat: "Sum: {0}",
                valueFormat: "currency",
                alignByColumn: true,
                showInGroupFooter: true
            }],

            totalItems: [{
                column: "SaleAmount",
                summaryType: "sum",
                displayFormat: "Total Sum: {0}",
                valueFormat: "currency"
            }]
        },

        onCellPrepared: function(e) {
            if (e.rowType === "data") {
                if (e.data.OrderDate < new Date(2014, 2, 3)) {
                    e.cellElement.css({ color: "#AAAAAA" });
                }
                if (e.data.SaleAmount > 15000) {
                    if (e.column.dataField === "OrderNumber") {
                        e.cellElement.css({ "font-weight": "bold" });
                    }
                    if (e.column.dataField === "SaleAmount") {
                        e.cellElement.css({ "background-color": "#FFBB00", "color": "#000" });
                    }
                }
            }

            if (e.rowType === "group") {
                if (e.row.groupIndex === 0) {
                    e.cellElement.css({ "background-color": "#BEDFE6", "color": "#000" });
                }
                if (e.row.groupIndex === 1) {
                    e.cellElement.css({ "background-color": "#C9ECD7", "color": "#000" });
                }
                e.cellElement.children().css({ "color": "#000" });
            }

            if (e.rowType === "groupFooter" && e.column.dataField === "SaleAmount") {
                e.cellElement.css({ "font-style": "italic" });
            }
        },
        export: {
            enabled: true,
            customizeExcelCell: function(options) {
                var gridCell = options.gridCell;
                if (!gridCell) {
                    return;
                }

                if (gridCell.rowType === "data") {
                    if (gridCell.data.OrderDate < new Date(2014, 2, 3)) {
                        options.font.color = "#AAAAAA";
                    }
                    if (gridCell.data.SaleAmount > 15000) {
                        if (gridCell.column.dataField === "OrderNumber") {
                            options.font.bold = true;
                        }
                        if (gridCell.column.dataField === "SaleAmount") {
                            options.backgroundColor = "#FFBB00";
                            options.font.color = "#000";
                        }
                    }
                }

                if (gridCell.rowType === "group") {
                    if (gridCell.groupIndex === 0) {
                        options.backgroundColor = "#BEDFE6";
                    }
                    if (gridCell.groupIndex === 1) {
                        options.backgroundColor = "#C9ECD7";
                    }
                    if (gridCell.column.dataField === "Employee") {
                        options.value = gridCell.value + " (" + gridCell.groupSummaryItems[0].value + " items)";
                        options.font.bold = false;
                    }
                    if (gridCell.column.dataField === "SaleAmount") {
                        options.value = gridCell.groupSummaryItems[0].value;
                        options.numberFormat = "&quot;Max: &quot;$0.00";
                    }
                }

                if (gridCell.rowType === "groupFooter" && gridCell.column.dataField === "SaleAmount") {
                    options.value = options.gridCell.value;
                    options.numberFormat = "&quot;Sum: &quot;$0.00";
                    options.font.italic = true;
                }

                if (gridCell.rowType === "totalFooter" && gridCell.column.dataField === "SaleAmount") {
                    options.value = options.gridCell.value;
                    options.numberFormat = "&quot;Total Sum: &quot;$0.00";
                }
            }
        }

    });
})
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
var orders = [{
    "ID": 1,
    "OrderNumber": 35703,
    "OrderDate": new Date(2014, 3, 10),
    "SaleAmount": 11800,
    "Terms": "15 Days",
    "TotalAmount": 12175,
    "CustomerStoreState": "California",
    "CustomerStoreCity": "Los Angeles",
    "Employee": "Harv Mudd"
}, {
    "ID": 4,
    "OrderNumber": 35711,
    "OrderDate": new Date(2014, 0, 12),
    "SaleAmount": 16050,
    "Terms": "15 Days",
    "TotalAmount": 16550,
    "CustomerStoreState": "California",
    "CustomerStoreCity": "San Jose",
    "Employee": "Jim Packard"
}, {
    "ID": 5,
    "OrderNumber": 35714,
    "OrderDate": new Date(2014, 0, 22),
    "SaleAmount": 14750,
    "Terms": "15 Days",
    "TotalAmount": 15250,
    "CustomerStoreState": "Nevada",
    "CustomerStoreCity": "Las Vegas",
    "Employee": "Harv Mudd"
}, {
    "ID": 7,
    "OrderNumber": 35983,
    "OrderDate": new Date(2014, 1, 7),
    "SaleAmount": 3725,
    "Terms": "15 Days",
    "TotalAmount": 3850,
    "CustomerStoreState": "Colorado",
    "CustomerStoreCity": "Denver",
    "Employee": "Todd Hoffman"
}, {
    "ID": 9,
    "OrderNumber": 36987,
    "OrderDate": new Date(2014, 2, 11),
    "SaleAmount": 14200,
    "Terms": "15 Days",
    "TotalAmount": 14800,
    "CustomerStoreState": "Utah",
    "CustomerStoreCity": "Salt Lake City",
    "Employee": "Clark Morgan"
}, {
    "ID": 11,
    "OrderNumber": 38466,
    "OrderDate": new Date(2014, 2, 1),
    "SaleAmount": 7800,
    "Terms": "15 Days",
    "TotalAmount": 8200,
    "CustomerStoreState": "California",
    "CustomerStoreCity": "Los Angeles",
    "Employee": "Harv Mudd"
}, {
    "ID": 14,
    "OrderNumber": 39420,
    "OrderDate": new Date(2014, 1, 15),
    "SaleAmount": 20500,
    "Terms": "15 Days",
    "TotalAmount": 9100,
    "CustomerStoreState": "California",
    "CustomerStoreCity": "San Jose",
    "Employee": "Jim Packard"
}, {
    "ID": 15,
    "OrderNumber": 39874,
    "OrderDate": new Date(2014, 1, 4),
    "SaleAmount": 9050,
    "Terms": "30 Days",
    "TotalAmount": 19100,
    "CustomerStoreState": "Nevada",
    "CustomerStoreCity": "Las Vegas",
    "Employee": "Harv Mudd"
}, {
    "ID": 18,
    "OrderNumber": 42847,
    "OrderDate": new Date(2014, 1, 15),
    "SaleAmount": 20400,
    "Terms": "30 Days",
    "TotalAmount": 20800,
    "CustomerStoreState": "Wyoming",
    "CustomerStoreCity": "Casper",
    "Employee": "Todd Hoffman"
}, {
    "ID": 19,
    "OrderNumber": 43982,
    "OrderDate": new Date(2014, 4, 29),
    "SaleAmount": 6050,
    "Terms": "30 Days",
    "TotalAmount": 6250,
    "CustomerStoreState": "Utah",
    "CustomerStoreCity": "Salt Lake City",
    "Employee": "Clark Morgan"
}, {
    "ID": 29,
    "OrderNumber": 56272,
    "OrderDate": new Date(2014, 1, 6),
    "SaleAmount": 15850,
    "Terms": "30 Days",
    "TotalAmount": 16350,
    "CustomerStoreState": "Utah",
    "CustomerStoreCity": "Salt Lake City",
    "Employee": "Clark Morgan"
}, {
    "ID": 30,
    "OrderNumber": 57429,
    "OrderDate": new Date(2013, 11, 31),
    "SaleAmount": 11050,
    "Terms": "30 Days",
    "TotalAmount": 11400,
    "CustomerStoreState": "Arizona",
    "CustomerStoreCity": "Phoenix",
    "Employee": "Clark Morgan"
}, {
    "ID": 32,
    "OrderNumber": 58292,
    "OrderDate": new Date(2014, 4, 13),
    "SaleAmount": 13500,
    "Terms": "15 Days",
    "TotalAmount": 13800,
    "CustomerStoreState": "California",
    "CustomerStoreCity": "Los Angeles",
    "Employee": "Harv Mudd"
}, {
    "ID": 36,
    "OrderNumber": 62427,
    "OrderDate": new Date(2014, 0, 27),
    "SaleAmount": 23500,
    "Terms": "15 Days",
    "TotalAmount": 24000,
    "CustomerStoreState": "Nevada",
    "CustomerStoreCity": "Las Vegas",
    "Employee": "Harv Mudd"
}, {
    "ID": 39,
    "OrderNumber": 65977,
    "OrderDate": new Date(2014, 1, 5),
    "SaleAmount": 2550,
    "Terms": "15 Days",
    "TotalAmount": 2625,
    "CustomerStoreState": "Wyoming",
    "CustomerStoreCity": "Casper",
    "Employee": "Todd Hoffman"
}, {
    "ID": 40,
    "OrderNumber": 66947,
    "OrderDate": new Date(2014, 2, 23),
    "SaleAmount": 3500,
    "Terms": "15 Days",
    "TotalAmount": 3600,
    "CustomerStoreState": "Utah",
    "CustomerStoreCity": "Salt Lake City",
    "Employee": "Clark Morgan"
}, {
    "ID": 42,
    "OrderNumber": 68428,
    "OrderDate": new Date(2014, 3, 10),
    "SaleAmount": 10500,
    "Terms": "15 Days",
    "TotalAmount": 10900,
    "CustomerStoreState": "California",
    "CustomerStoreCity": "Los Angeles",
    "Employee": "Harv Mudd"
}, {
    "ID": 43,
    "OrderNumber": 69477,
    "OrderDate": new Date(2014, 2, 9),
    "SaleAmount": 14200,
    "Terms": "15 Days",
    "TotalAmount": 14500,
    "CustomerStoreState": "California",
    "CustomerStoreCity": "Anaheim",
    "Employee": "Harv Mudd"
}, {
    "ID": 46,
    "OrderNumber": 72947,
    "OrderDate": new Date(2014, 0, 14),
    "SaleAmount": 13350,
    "Terms": "30 Days",
    "TotalAmount": 13650,
    "CustomerStoreState": "Nevada",
    "CustomerStoreCity": "Las Vegas",
    "Employee": "Harv Mudd"
}, {
    "ID": 47,
    "OrderNumber": 73088,
    "OrderDate": new Date(2014, 2, 25),
    "SaleAmount": 8600,
    "Terms": "30 Days",
    "TotalAmount": 8850,
    "CustomerStoreState": "Nevada",
    "CustomerStoreCity": "Reno",
    "Employee": "Clark Morgan"
}, {
    "ID": 50,
    "OrderNumber": 76927,
    "OrderDate": new Date(2014, 3, 27),
    "SaleAmount": 9800,
    "Terms": "30 Days",
    "TotalAmount": 10050,
    "CustomerStoreState": "Utah",
    "CustomerStoreCity": "Salt Lake City",
    "Employee": "Clark Morgan"
}, {
    "ID": 51,
    "OrderNumber": 77297,
    "OrderDate": new Date(2014, 3, 30),
    "SaleAmount": 10850,
    "Terms": "30 Days",
    "TotalAmount": 11100,
    "CustomerStoreState": "Arizona",
    "CustomerStoreCity": "Phoenix",
    "Employee": "Clark Morgan"
}, {
    "ID": 56,
    "OrderNumber": 84744,
    "OrderDate": new Date(2014, 1, 10),
    "SaleAmount": 4650,
    "Terms": "30 Days",
    "TotalAmount": 4750,
    "CustomerStoreState": "Nevada",
    "CustomerStoreCity": "Las Vegas",
    "Employee": "Harv Mudd"
}, {
    "ID": 57,
    "OrderNumber": 85028,
    "OrderDate": new Date(2014, 4, 17),
    "SaleAmount": 2575,
    "Terms": "30 Days",
    "TotalAmount": 2625,
    "CustomerStoreState": "Nevada",
    "CustomerStoreCity": "Reno",
    "Employee": "Clark Morgan"
}, {
    "ID": 59,
    "OrderNumber": 87297,
    "OrderDate": new Date(2014, 3, 21),
    "SaleAmount": 14200,
    "Terms": "30 Days",
    "TotalAmount": 0,
    "CustomerStoreState": "Wyoming",
    "CustomerStoreCity": "Casper",
    "Employee": "Todd Hoffman"
}, {
    "ID": 60,
    "OrderNumber": 88027,
    "OrderDate": new Date(2014, 1, 14),
    "SaleAmount": 13650,
    "Terms": "30 Days",
    "TotalAmount": 14050,
    "CustomerStoreState": "Utah",
    "CustomerStoreCity": "Salt Lake City",
    "Employee": "Clark Morgan"
}, {
    "ID": 65,
    "OrderNumber": 94726,
    "OrderDate": new Date(2014, 4, 22),
    "SaleAmount": 20500,
    "Terms": "15 Days",
    "TotalAmount": 20800,
    "CustomerStoreState": "California",
    "CustomerStoreCity": "San Jose",
    "Employee": "Jim Packard"
}, {
    "ID": 66,
    "OrderNumber": 95266,
    "OrderDate": new Date(2014, 2, 10),
    "SaleAmount": 9050,
    "Terms": "15 Days",
    "TotalAmount": 9250,
    "CustomerStoreState": "Nevada",
    "CustomerStoreCity": "Las Vegas",
    "Employee": "Harv Mudd"
}, {
    "ID": 69,
    "OrderNumber": 98477,
    "OrderDate": new Date(2014, 0, 1),
    "SaleAmount": 23500,
    "Terms": "15 Days",
    "TotalAmount": 23800,
    "CustomerStoreState": "Wyoming",
    "CustomerStoreCity": "Casper",
    "Employee": "Todd Hoffman"
}, {
    "ID": 70,
    "OrderNumber": 99247,
    "OrderDate": new Date(2014, 1, 8),
    "SaleAmount": 2100,
    "Terms": "15 Days",
    "TotalAmount": 2150,
    "CustomerStoreState": "Utah",
    "CustomerStoreCity": "Salt Lake City",
    "Employee": "Clark Morgan"
}, {
    "ID": 78,
    "OrderNumber": 174884,
    "OrderDate": new Date(2014, 3, 10),
    "SaleAmount": 7200,
    "Terms": "30 Days",
    "TotalAmount": 7350,
    "CustomerStoreState": "Colorado",
    "CustomerStoreCity": "Denver",
    "Employee": "Todd Hoffman"
}, {
    "ID": 81,
    "OrderNumber": 188877,
    "OrderDate": new Date(2014, 1, 11),
    "SaleAmount": 8750,
    "Terms": "30 Days",
    "TotalAmount": 8900,
    "CustomerStoreState": "Arizona",
    "CustomerStoreCity": "Phoenix",
    "Employee": "Clark Morgan"
}, {
    "ID": 82,
    "OrderNumber": 191883,
    "OrderDate": new Date(2014, 1, 5),
    "SaleAmount": 9900,
    "Terms": "30 Days",
    "TotalAmount": 10150,
    "CustomerStoreState": "California",
    "CustomerStoreCity": "Los Angeles",
    "Employee": "Harv Mudd"
}, {
    "ID": 83,
    "OrderNumber": 192474,
    "OrderDate": new Date(2014, 0, 21),
    "SaleAmount": 12800,
    "Terms": "30 Days",
    "TotalAmount": 13100,
    "CustomerStoreState": "California",
    "CustomerStoreCity": "Anaheim",
    "Employee": "Harv Mudd"
}, {
    "ID": 84,
    "OrderNumber": 193847,
    "OrderDate": new Date(2014, 2, 21),
    "SaleAmount": 14100,
    "Terms": "30 Days",
    "TotalAmount": 14350,
    "CustomerStoreState": "California",
    "CustomerStoreCity": "San Diego",
    "Employee": "Harv Mudd"
}, {
    "ID": 85,
    "OrderNumber": 194877,
    "OrderDate": new Date(2014, 2, 6),
    "SaleAmount": 4750,
    "Terms": "30 Days",
    "TotalAmount": 4950,
    "CustomerStoreState": "California",
    "CustomerStoreCity": "San Jose",
    "Employee": "Jim Packard"
}, {
    "ID": 86,
    "OrderNumber": 195746,
    "OrderDate": new Date(2014, 4, 26),
    "SaleAmount": 9050,
    "Terms": "30 Days",
    "TotalAmount": 9250,
    "CustomerStoreState": "Nevada",
    "CustomerStoreCity": "Las Vegas",
    "Employee": "Harv Mudd"
}, {
    "ID": 87,
    "OrderNumber": 197474,
    "OrderDate": new Date(2014, 2, 2),
    "SaleAmount": 6400,
    "Terms": "30 Days",
    "TotalAmount": 6600,
    "CustomerStoreState": "Nevada",
    "CustomerStoreCity": "Reno",
    "Employee": "Clark Morgan"
}, {
    "ID": 88,
    "OrderNumber": 198746,
    "OrderDate": new Date(2014, 4, 9),
    "SaleAmount": 15700,
    "Terms": "30 Days",
    "TotalAmount": 16050,
    "CustomerStoreState": "Colorado",
    "CustomerStoreCity": "Denver",
    "Employee": "Todd Hoffman"
}, {
    "ID": 91,
    "OrderNumber": 214222,
    "OrderDate": new Date(2014, 1, 8),
    "SaleAmount": 11050,
    "Terms": "30 Days",
    "TotalAmount": 11250,
    "CustomerStoreState": "Arizona",
    "CustomerStoreCity": "Phoenix",
    "Employee": "Clark Morgan"
}];