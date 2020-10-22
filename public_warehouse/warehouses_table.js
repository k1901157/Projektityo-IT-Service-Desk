$(document).ready(() => {


    let table = $("#warehouses_table").DataTable({
        ajax: {
            type: "GET",
            datatype: "json",
            url: "/api/warehouses",
            dataSrc: ""
        },
        rowId: "_id",
        columns: [{
                data: "_id",
                type: "readonly",
                visible: false
            },
            {
                data: "item_number",
                type: "text",
                required: true
            },
            {
                data: "item_type",
                type: "select",
                options: ['', 'Laptop XX' ,'Laptop XY', 'Desktop XX', 'Monitor XX 23', 'Monitor XY 27', 'Scanners XX', 'Printers XX', 'IP Phone XX' ],
                required: true
            },
            {
                data: "serial_number",
                type: "text",
                required: true
            },
            {
                data: "status",
                type: "select",
                options: ['', 'in Stock' ,'Deployed', 'Retired' ],
                required: true
            },
            {
                data: "assigned_to",
                type: "select",
                options: ['', 'IT-Team-Monitors' ,'IT-Team-Laptops', 'IT-Team-Desktops', 'IT-Team-Scanners and Printers', 'IT-Team-IP Phone' ],
                required: true
            },
            {
                data: "deployed_to",
                type: "text",
                required: false
            },
            {
                data: "description",
                type: "textarea",
                required: false
            },

            {
                data: "last_update",
                type: "date",
                required: true
            },
            {
                data: "updated_by",
                type: "text",
                required: true
            }
        ],
        dom: "Bfrtip",
        select: "single",
        responsive: true,
        altEditor: true,
        buttons: [
            "columnsToggle",
            {
                text: "Create",
                name: "add"
            },
            {
                text: "Edit",
                name: "edit"
            },
            {
                text: "Delete",
                name: "delete"
            },
            {
                text: "Refresh",
                name: "refresh"
            }
        ],
        onAddRow: (datatable, rowdata, success, error) => {
            $.ajax({
                url: "/api/warehouse",
                type: "POST",
                data: rowdata,
                success: success,
                error: error
            });
        },
        onDeleteRow: (datatable, rowdata, success, error) => {
            $.ajax({
                url: "/api/warehouse/" + rowdata._id,
                type: "DELETE",
                data: rowdata,
                success: success,
                error: error
            });
        },
        onEditRow: (datatable, rowdata, success, error) => {
            $.ajax({
                url: "/api/warehouse/" + rowdata._id,
                type: "PUT",
                data: rowdata,
                success: success,
                error: error
            });
        }


    });
});