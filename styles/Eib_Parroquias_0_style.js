var size = 0;
var placement = 'point';

var style_Eib_Parroquias_0 = function(feature, resolution){
    var context = {
        feature: feature,
        variables: {}
    };
    
    var labelText = ""; 
    var value = feature.get("");
    var labelFont = "bold 24.0px 'Arial', sans-serif";
    var labelFill = "#0000ff";
    var bufferColor = "#ffffff";
    var bufferWidth = 5;
    var textAlign = "left";
    var offsetX = 0;
    var offsetY = 0;
    var placement = 'point';
    if (feature.get("parroquia") !== null && resolution > 0 && resolution < 14) {
        labelText = String(feature.get("parroquia"));
    }
    var style = [ new ol.style.Style({
        stroke: new ol.style.Stroke({color: 'rgba(31,120,180,1.0)', lineDash: null, lineCap: 'square', lineJoin: 'bevel', width: 3.8}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth)
    })];

    return style;
};
