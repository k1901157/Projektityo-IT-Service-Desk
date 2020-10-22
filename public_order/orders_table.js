$(document).ready(() => {


    let table = $("#orders_table").DataTable({
        ajax: {
            type: "GET",
            datatype: "json",
            url: "/api/orders",
            dataSrc: ""
        },
        rowId: "_id",
        columns: [{
                data: "_id",
                type: "readonly",
                visible: false
            },
            {
                data: "ticket_number",
                type: "text",
                required: true
            },
            {
                data: "order_type",
                type: "select",
                options: ['', 'Laptop' ,'Desktop', 'Monitor', 'Printers or Scanners', 'IP Phone', 'Not Listed' ],
                required: true
            },
            {
                data: "customer_name",
                type: "text",
                required: true
            },
            {
                data: "customer_email",
                type: "text",
                required: true
            },
            {
                data: "customer_phone",
                type: "text",
                required: true
            },
            {
                data: "assigned_to",
                type: "text",
                required: true
            },
            {
                data: "priority",
                type: "select",
                options: ['', '1' ,'2', '3', '5' ],
                required: true
            },
            {
                data: "description",
                type: "textarea",
                required: false
            },
            {
                data: "status",
                type: "select",
                options: ['', 'Open' ,'Waiting for Approval', 'Delivered' ],
                required: true
            },
            {
                data: "opening_date",
                type: "date",
                required: true
            },
            {
                data: "delivery_date",
                type: "date",
                required: false
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
                url: "/api/order",
                type: "POST",
                data: rowdata,
                success: success,
                error: error
            });
        },
        onDeleteRow: (datatable, rowdata, success, error) => {
            $.ajax({
                url: "/api/order/" + rowdata._id,
                type: "DELETE",
                data: rowdata,
                success: success,
                error: error
            });
        },
        onEditRow: (datatable, rowdata, success, error) => {
            $.ajax({
                url: "/api/order/" + rowdata._id,
                type: "PUT",
                data: rowdata,
                success: success,
                error: error
            });
        }


    });
});