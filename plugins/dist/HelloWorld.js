import { _ as _decorate, s, i, a as _taggedTemplateLiteral, e, y, b as e$1, c as _inherits, d as _createSuper, f as _createClass, g as _classCallCheck, h as _assertThisInitialized } from './query-assigned-elements-2251961b.js';

var _templateObject, _templateObject2;
var HelloWorld = _decorate([e$1('ntx-helloworld')], function (_initialize, _LitElement) {
  var HelloWorld = /*#__PURE__*/function (_LitElement2) {
    _inherits(HelloWorld, _LitElement2);
    var _super = _createSuper(HelloWorld);
    function HelloWorld() {
      var _this;
      _classCallCheck(this, HelloWorld);
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      _this = _super.call.apply(_super, [this].concat(args));
      _initialize(_assertThisInitialized(_this));
      return _this;
    }
    return _createClass(HelloWorld);
  }(_LitElement);
  return {
    F: HelloWorld,
    d: [{
      kind: "field",
      "static": true,
      key: "styles",
      value: function value() {
        return i(_templateObject || (_templateObject = _taggedTemplateLiteral(["p { color: blue }"])));
      }
    }, {
      kind: "field",
      decorators: [e()],
      key: "who",
      value: function value() {
        return 'Somebody';
      }
    }, {
      kind: "method",
      "static": true,
      key: "getMetaConfig",
      value: function getMetaConfig() {
        // plugin contract information
        return {
          controlName: 'Hello World',
          fallbackDisableSubmit: false,
          description: 'Hello World component',
          iconUrl: 'one-line-text',
          groupName: 'Controls ByC',
          version: '1.0',
          properties: {
            who: {
              type: 'string',
              title: 'Who',
              description: 'Who for greetings',
              defaultValue: 'world'
            }
          }
        };
      }
    }, {
      kind: "method",
      key: "render",
      value: function render() {
        return y(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["<p>Hello, ", "!</p>"])), this.who);
      }
    }]
  };
}, s);

export { HelloWorld };
