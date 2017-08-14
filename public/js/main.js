onload = function() {
  var main = document.getElementById("main");
  var mask = document.getElementById("mask");
  var ctxMain = main.getContext("2d");
  var ctxMask = mask.getContext("2d");
  var imgMain = new Image();
  imgMain.src = "images/octocat.png";
  imgMain.onload = function() {
    ctxMain.drawImage(imgMain, 0, 0);
  }
  var imgMask = new Image();
  imgMask.src = "images/octocat.png";
  var px = pixels(imgMask.width);
  imgMask.onload = function() {
    ctxMask.drawImage(imgMask, 0, 0);
    var imageData = ctxMask.getImageData(0, 0, imgMask.width, imgMask.height);
    var originalData = imageData.data;
    var silhouetteData = new Uint8ClampedArray(originalData.length);
    var red = 255;
    var green = 100;
    var blue = 0;
    var alpha = 150;
    var alpha_index = 0;
    for(var i = 0; i < originalData.length; i += 4) {
      silhouetteData[i + 0] = red;
      silhouetteData[i + 1] = green;
      silhouetteData[i + 2] = blue;
      alpha_index = i + 3;
      if (i - px.top_left > 0 &&
          i - px.top_left < originalData.length &&
          originalData[i - px.top_left] > 0) {
        silhouetteData[alpha_index] = alpha;
        continue;
      }
      if (i - px.top_center > 0 &&
          i - px.top_center < originalData.length &&
          originalData[i - px.top_center] > 0) {
        silhouetteData[alpha_index] = alpha;
        continue;
      }
      if (i - px.top_right > 0 &&
          i - px.top_right < originalData.length &&
          originalData[i - px.top_right] > 0) {
        silhouetteData[alpha_index] = alpha;
        continue;
      }
      if (i - px.left > 0 &&
          i - px.left < originalData.length &&
          originalData[i - px.left] > 0) {
        silhouetteData[alpha_index] = alpha;
        continue;
      }
      if (originalData[alpha_index] > 0) {
        silhouetteData[alpha_index] = alpha;
        continue;
      }
      if (i + px.right > 0 &&
          i + px.right < originalData.length &&
          originalData[i + px.right] > 0) {
        silhouetteData[alpha_index] = alpha;
        continue;
      }
      if (i + px.bottom_left > 0 &&
          i + px.bottom_left < originalData.length &&
          originalData[i + px.bottom_left] > 0) {
        silhouetteData[alpha_index] = alpha;
        continue;
      }
      if (i + px.bottom_center > 0 &&
          i + px.bottom_center < originalData.length &&
          originalData[i + px.bottom_center] > 0) {
        silhouetteData[alpha_index] = alpha;
        continue;
      }
      if (i + px.bottom_right > 0 &&
          i + px.bottom_right < originalData.length &&
          originalData[i + px.bottom_right] > 0) {
        silhouetteData[alpha_index] = alpha;
        continue;
      }
    }
    imageData.data.set(silhouetteData);
    ctxMask.putImageData(imageData, 0, 0);
  };
};

var pixels = function(width) {
  return {
    top_left: ((width + 2) * 4) + 3,
    top_center: ((width + 1) * 4) + 3,
    top_right: width + 3,
    left: 7,
    ceter: 3,
    right: 7,
    bottom_left: width * 4 + 3,
    bottom_center: ((width + 1) * 4) + 3,
    bottom_right: ((width + 2) * 4) + 3 
  };
}