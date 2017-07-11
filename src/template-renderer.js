'use strict';

const htmlRenderer = require('./html-renderer');
const requireTemplate = require('./utils/require-template');

module.exports = function(){
  return function(template, model, options, callback){

    let type = options.templateType;
    if (type === 'jade') { type = 'oc-template-jade'; }
    if (type === 'handlebars') { type = 'oc-template-handlebars'; }

    try {
      const ocTemplate = requireTemplate(type);
      ocTemplate.render({ template, model }, (err, html) => {
        options.html = html;
        return callback(err, htmlRenderer.renderedComponent(options));
      });
    } catch (err) {
      return callback(err);
    }
  };
};
