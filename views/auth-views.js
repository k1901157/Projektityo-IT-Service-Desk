const login_view = () => {
    let html = `
    
    <html>
    <head>
    <title>IT Service Desk</title>
    <meta http-equiv="Content-Type", content="text/html;charset=UTF-8">
    <link rel='stylesheet' href='/style/style.css' />
    </head>
    <body>
    <div id=login>

    <h1>Welcome to IT Service Desk</h1>
    <img class="image" src="https://s27389.pcdn.co/wp-content/uploads/2017/06/AdobeStock_111727438-1024x512.jpeg" alt="Trulli" width="660" height="433"></br>
        <form action="/login" method="POST">
            <label for="user_name">User Name:</label>
            <input type="text" name="user_name">
            <label for="password">Password:</label>
            <input type="password" name="password">
            <button type="submit">Log in</button>
        </form>
        </br>

        <form action="/register" method="POST">
            <label for="password">Put User Name, we will provide the password soon:</label>
            <input type="text" name="user_name">
            <button type="submit">Register</button>
        </form>

    </div>
    </body>
    <html>
    `;

    return html;
}

module.exports.login_view = login_view;