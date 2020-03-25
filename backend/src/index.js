const express = require('express');
// routes.js is a file not a pack, so you need './'
const routes = require('./routes');

const cors = require('cors');

const app = express();

//Express converts the jason for node to interpretate.
//Must be before everything else.
app.use(express.json());
app.use(cors());

app.use(routes);

app.listen(3333);

/**
 * Métodos HTTP:
 * GET: Get/list info from Backend **BROWSER ENTRY POINT**
 * POST: Set info to backend
 * PUT: Update
 * DELETE:
 */

 /**
  * Parameter type:
  * 
  * Query PARMS: Named parameters in the url to filter, paginate, etc
  *        EG: http://localhost:3333/users?page=2&name=diego&age=25
  * Route Pars: Identify resource (Users in this case)
  *        EG: http://localhost:3333/users?page=2&name=diego&age=25
  */

  /**
   *  Driver: Select * from users
   * Query Builder: table(users).select(*).where(age=36)
   */