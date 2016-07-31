'use strict'
requirejs.config({
  paths: {
    ramda: 'https://cdnjs.cloudflare.com/ajax/libs/ramda/0.13.0/ramda.min',
    jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min'
  },
});

require([
  'ramda',
  'jquery',
],
function(_, $) {
  var trace = _.curry(function(tag, x) {
    console.log(tag, x);
    return x;
  });

  var impure = {
    getJSON: _.curry(function(callback, url) {
      $.getJSON(url, callback);
    }),

    setHtml: _.curry(function(sel, html) {
      $(sel).html(html);
    })
  };
  var img = function(url) {
    return $('<img />', {
      src: url,
    });
  };
  
  var url = function(term) {
    return 'https://api.flickr.com/services/feeds/photos_public.gne?tags=' +
    term + '&format=json&jsoncallback=?';
  }

  let getUrl = _.compose( _.prop('m'), _.prop('media'))
  
  let mediaToImg = _.compose(img,getUrl)

  let images = _.compose(_.map(mediaToImg), _.prop('items'))

  let renderImages = _.compose(impure.setHtml('body'),images)

  let app = _.compose(impure.getJSON(renderImages), url);

  app('cats');

});
