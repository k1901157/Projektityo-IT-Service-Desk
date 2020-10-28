const home_view = (data) => {
    let html = `
    
    <html>
    <head>
    <title>IT Service Desk</title>
    <meta http-equiv="Content-Type", content="text/html;charset=UTF-8">
    <link rel='stylesheet' href='/style/home.css' />
    </head>
    <body>
    <div id=home_all>
    <a class="nav" href= "/home">Home</a>
    <a class="nav" href= "/incidents">Incidents</a>
    <a class="nav" href= "/orders">Orders</a>
    <a class="nav" href= "/Warehouse_items">Warehouse</a>
    <hr align="left" width="75%">
    <h1>Welcome to IT Service Desk</h1>
    <div id=home>
    <p>
    Website built out to help IT Team to create, delete, update Tickets related to the customer issues.<br><br>
    This website designed to work as IT customer care centre services, and Database for all daily Tickets (Incident, Orders, etc..) to get them saved and documented.<br><br>
    This website will help the customers and IT department to get all Tickets documented, organized and updated.
    </p>
    <p>Below the types of Ticket to be created: </p> 
    <p>1- For any Hardware, Software, Network or any other issues, please choose>>>> <b><a class="nav" href= "/incidents"> Incidents </a> </b></p>
    <p>2- For any Request for Laptop, Desktop, Printer, Applicaton....etc. please choose>>>> <b><a class="nav" href= "/orders"> Orders </a></b></p>
    <p>Once the ticket has been created then IT Department will contact you as per the ticket’s priority to get your issues sorted out.</P>
    <p>*** To access IT Inventory Warehouse Database *** >>> <b><a class="nav" href= "/Warehouse_items"> Warehouse </a></b></p>
    </div> 
    

    

    <div id=log>
    Logged in as user: ${data.user_name}
    
    <form action="/logout" method="POST">
        <button type="submit" class="log_out_button">Log out</button>
    </form>
    </div>

    </div>

    <hr/>
    <footer>&copy; IT Service Desk Managment </footer>
    <hr/>

    </body>
    <html>
    `;

    return html;
}

module.exports.home_view = home_view;