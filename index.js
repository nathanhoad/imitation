const Module = require('module');

const configureStore = require('redux-mock-store').default;
const Thunk = require('redux-thunk').default;
const mockStore = configureStore([Thunk]);
const { JSDOM } = require('jsdom');
const Nock = require('nock');


// Mock out `require()` to fake CSS and images
var originalLoader = Module._load;
function mockedLoader (path, parent, is_main) {
    if (path.match(/\.(png|jpg|jpeg|gif|svg|mp4|m4v|flv|mp3|wav|m4a|ogg|ogv|ogm|webm)$/)) {
        return {};
    }
    
    if (path.match(/\.css$/)) {
        return new Proxy({}, {
            get: (styles, method) => {
                return method;
            }
        });
    }
    
    return originalLoader(path, parent, is_main);
}
    
    
const Imitation = {
    _mockedAssets: false,
    _mockedDom: false,
    
    
    mockStore (state) {
        return mockStore(state);
    },
    
    
    mockDom (url) {
        if (Imitation._mockedDom) return;
        
        url = url || 'http://example.com';
        
        const dom = new JSDOM('', { url });
        const { window } = dom;
        const { document}  = window;
        
        // The scheme is not set by default
        var url_bits = url.match(/^(https?\:)\/\/([^\:\/])+(\:\d+)?/);
        document.location.scheme = url_bits[1];
        
        global.document = document;
        global.window = window;
        global.navigator = {
            userAgent: 'node.js'
        };
        
        Imitation._mockedDom = true;
    },
    
    
    unmockDom () {
        if (!Imitation._mockedDom) return;
        
        delete global['document'];
        delete global['window'];
        
        Imitation._mockedDom = false;
    },
    
    
    mockAssets () {
        if (Imitation._mockedAssets) return;
        
        Module._load = mockedLoader;
        Imitation._mockedAssets = true;
    },
    
    
    unmockAssets () {
        if (!Imitation._mockedAssets) return;
        
        Module._load = originalLoader;
        Imitation._mockedAssets = false;
    },
    
    
    mockURL (url) {
        return Nock(url);
    },
    
    
    unmockURLs () {
        Nock.cleanAll();
    }
}


module.exports = Imitation;
