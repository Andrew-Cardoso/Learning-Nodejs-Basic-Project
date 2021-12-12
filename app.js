// import http, { Server } from 'http';
// const http = require( 'http' );

// const server = http.createServer( ( request, response ) => {
//	console.log( request );
// 	console.log( process );
// 	response.setHeader( 'Content-Type', 'text/html' );
// 	response.write( `
// 		<html>
// 		<head><title>Html from nodejsApp</title></head>
// 		<body>
// 			<h1>Hello World!</h1>
// 		</body>
// 		</html>
// 	`);
// 	response.end();
// } );

// const server = http.createServer( ( request, response ) => {
// 	response.statusCode = 302;
// 	response.setHeader( 'Location', '/' );

// 	if ( request.method !== 'POST' ) return response.end();

// 	const body = [];

// 	request.on( 'data', data => {
// 		console.log( { data } );
// 		body.push( data );
// 	} );

// 	request.on( 'end', () => {
// 		console.log( { body } );
// 		const parsedBody = Buffer.concat( body ).toString();
// 		fs.writeFileSync( 'teste.txt', parsedBody );
// 	} );
// 	return response.end();
// } );

// const server = http.createServer( ( request, response ) => {
// 	response.statusCode = 302;
// 	response.setHeader( 'Location', '/' );

// 	if ( request.method !== 'POST' ) return response.end();

// 	const body = [];

// 	request.on( 'data', chunk => {
// 		console.log( { chunk } );
// 		body.push( chunk );
// 	} );

// 	request.on( 'end', () => {
// 		console.log( { body } );
// 		const parsedBody = Buffer.concat( body ).toString();
// 		fs.writeFile( 'teste.txt', parsedBody, error => {
// 			console.log( error ?? 'success' );
// 			return response.end();
// 		} );
// 	} );
// } );

const express = require( 'express' );
const parser = require( 'body-parser' );
const path = require( 'path' );



const adminRoutes = require( './routes/admin' );
const shopRoutes = require( './routes/shop' );


const app = express();



/* Basic Middlewares */

// app.use( ( req, res, next ) => {
// 	console.log( 'express middleware' );
// 	next();
// } );

// app.use( ( req, res, next ) => {
// 	console.log( 'second middleware' );
// 	next();
// } );

// app.use( ( req, res ) => {
// 	console.log( 'execution after the middlewares' );
// 	res.send( '<h1>Hello World!</h1>' );
// } );

/* Parsing Body */

app.use( parser.json() );

app.use( express.static( path.join( __dirname, 'public' ) ) );
/* Routing */

// app.use( '/products', async ( req, res ) => {
// 	const method = req.method?.toLowerCase();
// 	if ( !( method in productsController ) ) return res.sendStatus( 404 );
// 	const body = req.body;
// 	return res.send( await productsController[ method ]( req.body ) );
// } );

// app.use( '/', ( req, res ) => res.sendStatus( 404 ) );


/* Cleaner Router Alternative */

// app.get( '/products', async ( req, res ) => res.send( await productsController[ 'get' ]() ) );
// app.post( '/products', async ( req, res ) => res.send( await productsController[ 'post' ]( req.body ) ) );
// app.put ...

/* Better and Cleaner Router Alternative */

app.use( '/admin', adminRoutes );
app.use( shopRoutes );

app.use( ( req, res ) => res.sendStatus( 404 ));

//app.use('/') is generic, will enter the route if begins with '/'
//app.get('/') is not generic, will NOT enter route unless path is exactly '/'

app.listen( 3030 );