const { Transform } = require('stream');

class DOCXTemplate extends Transform {
  constructor(props, options) {
    super(options);
  }
}

module.exports = DOCXTemplate;
