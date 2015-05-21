'use strict';

var test = require('tape');
var db = require('../../../server/db-config.js');
var falsify = require('../falsify/order.js');
var mocks = require('../mocks/orders-units.js');

var tests = function () {

	test("post function posts to orders and units tables", function(t) {
		var callback =  function (result){
			t.equals(result,null, "post request to units and orders table worked")
		};
		try {
			db.post('orders', mocks.ordersUnits, callback);
		} catch(e) {
			t.notOk(true, "post request to orders table did not work");
		}

	    t.end();
	});

	test("clear table", function(t) {
		falsify.clearTable();
		t.ok(true, "table cleared");
	    t.end();
	});
}

falsify.createOrder(tests)
