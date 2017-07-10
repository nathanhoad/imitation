# Imitation

A few mocking helpers for testing.


# Usage

The most common use of Imitation is when you are testing React components that `require` css and/or images.

```javascript
const { mockDOM, unmockDOM, mockAssets, unmockAssets } = require('imitation');
const { test } = require('ava');
const { shallow } = require('enzyme');

var Thing;

test.beforeEach(t => {
    mockAssets();
    mockDOM();
    
    Thing = require('../components/thing'); // Thing uses require for images and css
});


test.afterEach(t => {
    unmockDOM();
    unmockAssets();
});


test("It renders", t => {
    let component = shallow(<Thing />);
    
    // Assert something
    // ...
});
```

You can also mock a Redux Store and URLs when testing Redux Actions:

```javascript
const { mockStore, mockURL, unmockURLs, mockDOM, mockAssets } = require('imitation');
const Immutable = require('immutable');
const { test } = require('ava');

var ThingActions;
var store;
var URL;

test.beforeEach(t => {
    URL = 'http://test.com';
    mockDOM(URL);
    
    ThingActions = require('../actions/thing-actions');
    store = mockStore(Immutable.fromJS({
        things: []
    }));
});


test.afterEach(t => {
    unmockURLs();
    unmockDOM();
});


test('It can create a thing', t => {
    mockURL(URL).post('/api/v1/things').reply(200, {});
    
    return store.dispatch(ThingActions.createThing({ name: 'Whatsit' })).then(() => {
        let actions = store.getActions();
        
        t.is(actions[0].type, ThingActions.CREATED_THING);
    });
});
```
