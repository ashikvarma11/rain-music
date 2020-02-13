const express = require('express');
const app = express();
const path = require('path');
var cors = require('cors')
const router = express.Router();
router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});
app.use(cors())

app.use(express.static(__dirname ));
app.use('/', router);

app.listen(process.env.port || 3000);