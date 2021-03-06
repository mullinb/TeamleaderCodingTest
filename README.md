# Coding Test: Order Management Application

### App for Teamleader, using React with Apollo Client and GraphQL.js served by Node.js/Express.js. Test database uses <a href="https://github.com/typicode/json-server">JSON Server</a>.

<div align="center" width="700px">
  <img src="https://s3.amazonaws.com/fluxlymoppings/pics/Screen+Shot+2018-04-30+at+18.25.38.png">
</div>

<p>This app allows the user to manage existing orders in a database. The user has the ability to add and remove items for each order, and adjust the quantity of items that have already been added. In the end, an order can be "placed." When the user clicks this button, the order is removed from the <code>"orders"</code> collection (and thus from the order list), and moved to a new collection titled <code>"dispatch"</code>. The successfully placed order is logged to the console on both the browser client and on the server.</p>

<div align="center" width="700px">
  <img src="https://s3.amazonaws.com/fluxlymoppings/pics/Screen+Shot+2018-04-30+at+18.25.49.png">
</div>

<p>All components responsively update with refreshed information after each user action on the database, exactly as we would want. Invalid inputs have not been extensively tested.</p>


<p>Database operations target API endpoints which are declared in the APIEndpoints.js file in the root directory. To test the program with a real REST API, update this file with the desired endpoints.</p>

<div align="center" width="700px">
  <img src="https://s3.amazonaws.com/fluxlymoppings/pics/Screen+Shot+2018-04-30+at+18.26.04.png">
</div>


#### To do:

<ul>
  <li>Test for bugs/error-handling.</li>
</ul>

### To try this app:
<ol>
  <li>Have node.js installed.</li>
  <li>Clone this repository.</li>
  <li>Open two terminal windows, navigating each to the local repository directory.</li>
  <li>Install dependencies with <code>npm install</code>.</li>
  <li>Globally install JSON server (<code>npm install -g json-server</code>).</li>
  <li>Run <code>npm run dev</code> in one window and <code>npm run db</code> in another.</li>
  <li>Navigate to http://localhost:4000. The database will automatically be served from http://localhost:3000</li>
  <li>If desired, update the API endpoints in the APIEndpoints.js file.</li>
</ol>

#### Technologies:
<ul>
  <li>React.js</li>
  <li>Express.js</li>
  <li>GraphQL.js</li>
  <li>Apollo Client</li>
  <li>Axios</li>
  <li>Materialize CSS</li>
  <li>lodash</li>
</ul>
This project was bootstrapped with <a href="https://github.com/facebookincubator/create-react-app">Create React App</a>.
