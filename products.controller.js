const { existsSync, promises: fs } = require( 'fs' );

const path = 'fake-database/products.json';

const createDatabaseIfNotExists = async () => !existsSync( path ) && fs.writeFile( path, JSON.stringify( [] ) );

const controller = {
	get: async () => {
		await createDatabaseIfNotExists();
		return JSON.parse( ( await fs.readFile( path ) ) );
	},
	post: async products => {

		const savedProducts = await controller.get();

		savedProducts.sort( ( a, b ) => b.id - a.id );

		const lastId = savedProducts[ 0 ]?.id ?? 0;

		const productsToAppend = ( Array.isArray( products ) ? products : [ products ] ).map( ( product, i ) => {
			product.id = lastId + i + 1;
			return product;
		} );

		await fs.writeFile( path, JSON.stringify( [ ...savedProducts, ...productsToAppend ] ) );

		return productsToAppend;
	}
};

module.exports = controller;