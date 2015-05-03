// # Partial Helper
// Usage: `{{partial "people" varPath="content/variables/people"}}`

var fs              = require('fs'),
    _               = require('lodash'),
    partial;

partial = function(name, options) {
    var fn = options.fn,
        varPath,
        context,
        i = 0,
        j = 0,
        key,
        data,
        ret = '';

    if (_.isUndefined(options.hash) || _.isUndefined(options.hash.varPath)) {
        varPath = 'content/variables/' + name + '.json';
    } else {
        varPath = options.hash.varPath.replace(/\.json$/, '') + '.json';
    }

    context = JSON.parse( fs.readFileSync(varPath, 'utf8') );

    if (context && typeof context === 'object') {
        if (context instanceof Array) {
            for (j = context.length; i < j; i += 1) {
                ret = ret + fn(context[i], {data: data});
            }
        } else {
            for (key in context) {
                if (context.hasOwnProperty(key)) {
                    ret = ret + fn(context[key], {data: data});
                }
            }
        }
    }
    
    return ret;
};

module.exports = partial;