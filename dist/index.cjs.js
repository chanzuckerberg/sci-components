'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@material-ui/core');
var styles = require('@material-ui/core/styles');
var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var Button = function (props) {
    return (React__default['default'].createElement(styles.StylesProvider, { injectFirst: true },
        React__default['default'].createElement(core.Button, __assign({}, props))));
};

var index$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Button
});

var Checkbox = function (props) {
    return (React__default['default'].createElement(styles.StylesProvider, { injectFirst: true },
        React__default['default'].createElement(core.Checkbox, __assign({}, props))));
};

var index = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Checkbox
});

exports.Button = index$1;
exports.Checkbox = index;
Object.keys(core).forEach(function (k) {
    if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
        enumerable: true,
        get: function () {
            return core[k];
        }
    });
});
