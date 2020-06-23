//jQuery(document)

// "_id": "5e87764c63e79a85ecf73e49",
// "name": "Steel_3",
// "min_density": 685849,
// "max_density": 1,
// "min_strength": 333,
// "max_strength": 4,
// "min_strength_density": 333,
// "max_strength_density": 0.00000583218755148728,

$(document).ready(() => {

    //let testi = $("#testi");

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
                data: "type",
                type: "text",
                required: true
            },
            {
                data: "customer_name",
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
                type: "float",
                required: true
            },
            {
                data: "description",
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