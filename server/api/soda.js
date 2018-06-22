const router = require('express').Router();
const soda = require('soda-js');
module.exports = router;

router.get('/', (req, res, next) => {
    console.log('hit the soda route')
    const { id, domain } = req.query;
    console.log('soda',id, domain);
    let consumer = new soda.Consumer(domain);
    consumer.query()
      .withDataset(id)
      .getRows()
        .on('success', function(rows) { console.log(rows); })
        .on('error', function(error) { console.error(error); });

})