import { Button as Button$1, Checkbox as Checkbox$1 } from '@material-ui/core';
export * from '@material-ui/core';
import { StylesProvider } from '@material-ui/core/styles';
import React from 'react';

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
    return (React.createElement(StylesProvider, { injectFirst: true },
        React.createElement(Button$1, __assign({}, props))));
};

var index$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Button
});

var Checkbox = function (props) {
    return (React.createElement(StylesProvider, { injectFirst: true },
        React.createElement(Checkbox$1, __assign({}, props))));
};

var index = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Checkbox
});

export { index$1 as Button, index as Checkbox };
