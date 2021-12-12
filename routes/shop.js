const express = require( 'express' );
const router = express.Router();

const get = async () => ( { success: true } );

router.get( '/', async ( req, res ) => res.send( await get() ) );

module.exports = router;