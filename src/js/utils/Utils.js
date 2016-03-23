module.exports = {

  blobToBase64 : function(blob, cb) {
    var reader = new FileReader();
    reader.onload = function() {
      var dataUrl = reader.result;
      var base64 = dataUrl.split(',')[1];
      cb(base64);
    }
    reader.readAsDataURL(blob);
  }

}
