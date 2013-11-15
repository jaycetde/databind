# databind

  Bind an object's property to an element's innerHTML or input's value
  
## Installation

    $ component install JayceTDE/databind
    
## API

```javascript
databind(obj, 'prop', document.body, function (v) { return 'template containing ' + v; });
```
  
## License

  MIT