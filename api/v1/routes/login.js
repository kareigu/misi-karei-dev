
module.exports = function(router) {
  router.post('/login', (req,res) => {

    const TEMP_PASS = process.env.TEMP_PASS;

    if(req.body.token === TEMP_PASS) {
      res.status(202);
      res.send({ 
        token: TEMP_PASS, 
        msg: 'Logged in',
        success: true
      });
    } else {
      res.status(200);
      res.send({ 
        token: '', 
        msg: 'Invalid password',
        success: false
      });
    }
  });

  return router;
}