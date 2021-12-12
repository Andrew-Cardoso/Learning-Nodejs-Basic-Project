const express = require( 'express' );
const router = express.Router();


const { existsSync, promises: fs } = require( 'fs' );

const path = 'fake-database/products.json';

const get = async () => {
	!existsSync( path ) && ( await fs.writeFile( path, JSON.stringify( [] ) ) );
	return JSON.parse( ( await fs.readFile( path ) ) );
};

const post = async products => {
	const savedProducts = await get();
	savedProducts.sort( ( a, b ) => b.id - a.id );
	const lastId = savedProducts[ 0 ]?.id ?? 0;
	const productsToAppend = ( Array.isArray( products ) ? products : [ products ] ).map( ( product, i ) => {
		product.id = lastId + i + 1;
		return product;
	} );
	fs.writeFile( path, JSON.stringify( [ ...savedProducts, ...productsToAppend ] ) );
	return productsToAppend;
};

router.get( '/products', async ( req, res ) => res.send( await get() ) );
router.post( '/products', async ( req, res ) => {
	
	return res.send( await post( req.body ) );
} );

module.exports = router;