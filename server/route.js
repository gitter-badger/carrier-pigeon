(function () {
	"use strict";

	var handler = require("./handler.js");

	var serverRoutes =  function (router) {

		router.addRoute('/', function (req, res, match){
		  	handler.home(req, res);
		});

	/* -------------------------------*
	 *	   Authentication Routes
	 * -------------------------------*/

		// router.addRoute('/login', function (req, res, match){
		//   	handler.login(req, res);
		// });

	/* -------------------------------*
	 *	   Order Routes
	 * -------------------------------*/

		router.addRoute('/server/getorders', function (req, res, match){
		  	handler.getOrders(req, res);
		});

		router.addRoute('/server/getorder', function (req, res, match){
		  	handler.getOrder(req, res);
		});

		router.addRoute('/server/postorder', function (req, res, match){
		  	handler.createOrder(req, res);
		});

		router.addRoute('/server/removeorder', function (req, res, match){
		  	handler.removeOrder(req, res);
		});

		router.addRoute('/order/id', function (req, res, match){
		  	handler.viewOrder(req, res);
		});

		router.addRoute('/order/edit', function (req, res, match){
		  	handler.editOrder(req, res);
		});
	};

	module.exports = serverRoutes;
})();


