
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.render('admin', { title: 'Admin' });
};
