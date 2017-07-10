const { test } = require('ava');

const Imitation = require('..');


test('it should mock and unmock `require`', t => {
    let image = null;
    
    try {
        image = require('./image.png');
    } catch (e) {}
    t.is(image, null);
    
    Imitation.mockAssets();
    image = null;
    try {
        image = require('./image.png');
    } catch (e) {}
    t.not(image, null);
    
    Imitation.unmockAssets();
    image = null;
    try {
        image = require('./image.png');
    } catch (e) {}
    t.is(image, null);
});


test('it should mock and unmock the dom', t => {
    t.true(typeof global.document === "undefined");
    
    Imitation.mockDom();
    
    t.true(typeof global.document !== "undefined");
    
    Imitation.unmockDom();
    
    t.true(typeof global.document === "undefined");
});


test('it should mock document.location', t => {
    Imitation.mockDom('http://localhost:5000');
    
    t.true(typeof global.document !== "undefined");
    t.true(typeof global.document.location !== "undefined");
    t.is(global.document.location.scheme, 'http:');
    t.is(global.document.location.hostname, 'localhost');
    t.is(global.document.location.port, '5000');
});
