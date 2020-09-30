$(document).ready(() => {


    let table = $("#incidents_table").DataTable({
        ajax: {
            type: "GET",
            datatype: "json",
            url: "/api/incidents",
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
                data: "type",
                type: "select",
                options: ['Software' ,'Hardware', 'Network', 'Printers & Scanners', 'Not Listed' ],
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
                options: ['1' ,'2', '3', '5' ],
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
                options: ['Open' ,'Closed' ],
                required: true
            },
            {
                data: "opening_date",
                type: "date",
                required: true
            },
            {
                data: "closing_date",
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
                url: "/api/incident",
                type: "POST",
                data: rowdata,
                success: success,
                error: error
            });
        },
        onDeleteRow: (datatable, rowdata, success, error) => {
            $.ajax({
                url: "/api/incident/" + rowdata._id,
                type: "DELETE",
                data: rowdata,
                success: success,
                error: error
            });
        },
        onEditRow: (datatable, rowdata, success, error) => {
            $.ajax({
                url: "/api/incident/" + rowdata._id,
                type: "PUT",
                data: rowdata,
                success: success,
                error: error
            });
        }


    });
});