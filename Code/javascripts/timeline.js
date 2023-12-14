/*
 * globalmigration
 * https://github.com/null2/globalmigration
 *
 * Copyright (c) 2013 null2 GmbH Berlin
 * Licensed under the MIT license.
 */

// Timeline: year selector
(function(scope) {
  scope.timeline = function(diagram, config) {

    config = config || {};
    config.element = config.element || 'body';
    config.now = config.now || False;
    config.incr = config.incr || 5; // year span for buttons
    config.prefix = config.prefix || "";

    var years = Object.keys(diagram.data.matrix)
        .filter(function(y) {
            return (y.indexOf(config.prefix) > -1)
        })
        .map(function(y) { 
            return parseInt(
               y.substr(config.prefix.length)
            );
        })
        .reverse();

    var form = d3.select(config.element).append('form');

    var year = form.selectAll('.year')
      .data(years);

    var span = year.enter().append('span')
      .classed('year', true);
    span.append('input')
      .attr({
        name: function(d) { return config.prefix + 'year'; },
        type: 'radio',
        id: function(d) { return config.prefix + "year-" + d; },
        "class": function(d) { return "year-" + d; },
        /*"class": config.prefix,*/
        value: function(d) { return d; },
        checked: function(d) { return d === config.now || null; }
      })
      .on('change', function(d) {
          
        var y = d;
        year.selectAll('input').attr('checked', function(d) {
          return y === d || null;
        });
        diagram.draw(config.prefix + d);

      });

    span.append('label')
      .attr('for', function(d) { return config.prefix + 'year-' + d; })
      .text(function(d) { 
        if( config.incr == 4.9 ) {
           return ""+ (d == 1990 ? d+1 : d ) + (config.incr === 1 ? "" : "-" + (d + 4));
        }
        if( config.incr == 4.5 ) {
           return ""+ d + (config.incr === 1 ? "" : "-" + (d + 4));
        }
          return ""+ d + (config.incr === 1 ? "" : "-" + (d + config.incr)); 
        });

    // keyboard control
    d3.select(document.body).on('keypress', function() {
      var idx = d3.event.which - 49;
      var y = years[idx];
      if (y) {
        year.selectAll('input').each(function(d) {
          if (d === y) {
            d3.select(this).on('click')(d);
          }
        });
      }
    });
  };
})(window.Globalmigration || (window.Globalmigration = {}));
