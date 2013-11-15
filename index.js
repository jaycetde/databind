
var value = require('value');

/*
 * only handles one way binding to element.innerHTML or input.value
 */
module.exports = function (obj, prop, el, template) {
    
    var val = obj[prop]
      , tempSetter = obj.__lookupSetter__(prop)
      , tempGetter = obj.__lookupGetter__(prop)
    ;
    
    obj.__defineSetter__(prop, function (x) {
        
        val = x;
        
        setElVal(el, template ? template(x) : x);
        
        tempSetter && tempSetter.call(this, x);
        
    });
    
    obj.__defineGetter__(prop, function () {
        
        if (tempGetter)
            return tempGetter.call(this);
        
        return val;
        
    });
    
};

function setElVal(el, val) {

    if (isInput(el)) {
        return value(el, val);
    }
    
    switch (el.nodeType) {
        case 1:
            el.innerHTML = val;
            break;
        case 3:
            el.textContent = val;
            break;
        default:
            console.error('Unhandled databind');
    }

}

function isInput(el) {
    
    return el instanceof HTMLInputElement
        || el instanceof HTMLSelectElement
        || el instanceof HTMLOptionElement
        || el instanceof HTMLTextAreaElement
        || el instanceof HTMLButtonElement
    ;
    
}