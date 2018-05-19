Array.matrix = function (m, n, initial)
{
    var a, i, j, mat = [];
    for (i = 0; i < m; i += 1) {
        a = [];
        for (j = 0; j < n; j += 1) {
            a[j] = 0;
        }
        mat[i] = a;
    }
    return mat;
};
function isColored(color) {
    var colorArr = Array.prototype.slice.call(color);
    if(colorArr[0] != 255 || colorArr[1] != 255 || colorArr[2] != 255) {
        return true;
    }
    return false;
}
 $(document).ready(function () {
    $("img").eq(1).attr("id", "myImage");
    var img = document.getElementById('myImage');
    var canvas = document.createElement('canvas');
    var result = "";
    canvas.width = img.width;
    canvas.height = img.height;
    canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
    var imgMatrix = Array.matrix(img.width, img.height, false);
    for(var x = 0; x < img.width; x++) {
        for(var y = 0; y < img.height; y++) {
            // Set imgMatrix at x/y true if color found
            var curColor = canvas.getContext('2d').getImageData(x, y, 1, 1).data;
            imgMatrix[x][y] = isColored(curColor);
        }
    }
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = "#ffffff";
    ctx.fillRect( 0, 0, img.width, img.height );
    var squares = 0;
    var circles = 0;
    for(var y = 0; y < img.height; y++) {
        for(var x = 0; x < img.width; x++) {
            if(imgMatrix[x][y] === true) {
                var minLeft = x;
                var maxLeft = x;
                for(var checkY = y; checkY < img.height; checkY++) {
                    if(!imgMatrix[x][checkY]) {
                        break;
                    }
                    for(var checkX = x; checkX > 0; checkX--) {
                        if(imgMatrix[checkX][checkY]) {
                            ctx.fillStyle = "#ff0000";
                            ctx.fillRect( checkX, checkY, 1, 1 );
                            imgMatrix[checkX][checkY] = false;
                            if(checkX < minLeft) {
                                minLeft = checkX;
                            }
                            if(checkX > maxLeft) {
                                maxLeft = checkX;
                            }
                        } else {
                            break;
                        }
                    }
                    for(var checkX = x + 1; checkX < img.width; checkX++) {
                        if(imgMatrix[checkX][checkY]) {
                            imgMatrix[checkX][checkY] = false;
                            ctx.fillStyle = "#ff0000";
                            ctx.fillRect( checkX, checkY, 1, 1 );
                        } else {
                            break;
                        }
                    }
                }
                ctx.fillStyle = "#000000";
                ctx.font="12px Verdana";
                if(minLeft != maxLeft) {
                    circles++;
                    ctx.fillText("o",x ,y);
                } else {
                    squares++;
                    ctx.fillText("x",x,y);
                }
            }
        }
    }
    img.src = canvas.toDataURL();
    console.log(circles + " circles found");
    $("#pw").val(circles);
    if (typeof checkPW == 'function') {
        checkPW();
    }
});
