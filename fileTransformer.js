const path = require("path");

/**
 * (thuang): Inspired by https://github.com/cwmoo740/jest-svg-transformer/issues/3#issuecomment-1229928189
 * We export as { ReactComponent }, because we import svg that way
 * E.g., import { ReactComponent as IconBacteriaLarge }
 */
module.exports = {
  process(_, filePath) {
    if (path.extname(filePath) !== ".svg") {
      return {
        code: `module.exports = ${JSON.stringify(path.basename(filePath))};`,
      };
    }

    const name = `${path.basename(filePath, ".svg")}`
      .split(/\W+/)
      .map((x) => `${x.charAt(0).toUpperCase()}${x.slice(1)}`)
      .join("");

    return {
      code: `
        const React = require('react');
        function ${name}(props) {
          return React.createElement(
            'svg',
            Object.assign(
              {},
              props,
              {
                'data-file-name': ${name}.name,
                'data-testid': ${name}.name,
              }
            )
          );
        }
        module.exports = { ReactComponent: ${name} };
      `,
    };
  },
};
