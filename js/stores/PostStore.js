var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');


var _posts = [ { "artwork" : "QmfCSdrAvg7ng1ETAqvYNGkhnGUNE89V2W2WSMoxVa6qAK",
      "author" : "ikeafurniture",
      "id" : "QmbeE7NX1oUShzSfMXxP3WYdnNJHNAPMjD8k8MdFHRC9TF",
      "name" : "08 Jo.mp3",
      "size" : 5476406,
      "type" : "audio/mp3"
    },
    { "author" : "ikeafurniture",
      "id" : "QmfGsRrBJqwbRDwmmzA58sVyJuXAu7nsnibWyPmsQRGges",
      "name" : "000wGOwWjx06UAlFMAzd01040100tS4x0k01.mp4",
      "size" : 7119369,
      "type" : "video/mp4"
    },
    { "author" : "ikeafurniture",
      "id" : "QmSpThVxDomSEGgCNUX4XaXUdawix4YvgBtB3KBYjynDEX",
      "name" : "11jteu0.jpg",
      "size" : 103425,
      "type" : "image/jpeg"
    },
    { "author" : "ikeafurniture",
      "id" : "QmV6RmkZWkRX8utdtyqPHPYk731Th3jCveu4CsCvEw8q7P",
      "name" : "asdf1.jpg",
      "size" : 48465,
      "type" : "image/jpeg"
    },
    { "author" : "ikeafurniture",
      "id" : "QmcwU5VKEtAticCnMFNBEgXFakmMYhjMzv41z13uBNK65N",
      "name" : "asdf2.jpg",
      "size" : 6473015,
      "type" : "image/jpeg"
    },
    { "author" : "ikeafurniture",
      "id" : "QmTTiEYuoWDUeSrTCrvaS8Gk4q5jghcAkSavZtK6MFJUTp",
      "name" : "asdf3.jpg",
      "size" : 350989,
      "type" : "image/jpeg"
    },
    { "author" : "ikeafurniture",
      "id" : "QmUCNPr7MRkY71VJkXbd32Bw2QEJgTocn2VNChDgfxhwSj",
      "name" : "View_of_Woolworth_Building_fixed_crop.jpg",
      "size" : 1112466,
      "type" : "image/jpeg"
    }
  ];

var PostStore = assign({}, EventEmitter.prototype, {

  init: function() {

  },

  getAll: function() {
    return _posts;
  },

  get: function(id) {
    return _posts[id];
  }

})

module.exports = PostStore;
