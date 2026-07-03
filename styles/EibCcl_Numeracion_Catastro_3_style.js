
function obtenerColorTextoDesdeRGBA(colorStr) {
    // Esta expresi�n regular captura los 3 primeros grupos de n�meros ignorando los espacios y el Alpha
    const coincidencias = colorStr.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
    
    if (!coincidencias) {
        return '#000000'; // Color de seguridad por si el string viene corrupto
    }

    // Convertimos las capturas a n�meros enteros
    const r = parseInt(coincidencias[1], 10);
    const g = parseInt(coincidencias[2], 10);
    const b = parseInt(coincidencias[3], 10);

    // Aplicamos la f�rmula YIQ
    const luminosidad = (r * 299 + g * 587 + b * 114) / 1000;

    // Si la puntuaci�n es alta (borde claro) -> texto negro. Si es baja (borde oscuro) -> texto blanco.
    return luminosidad >= 128 ? '#000000' : '#FFFFFF';
}

// =========================================================================
// ESTILO 1: PARA EL GRUPO DE ESTADO DE CONSERVACI�N
// =========================================================================
function estiloGrupoConservacion(feature, resolution) {
    var valueNUM = feature.get('ENA_N1_00') || '';
        var valueLETRA = feature.get("ENA_L1_00") || '';
    var estado = feature.get('ESTADOS_CONS_Estado_Conservacion');
    var numero = valueNUM + valueLETRA;
/*    if (valueNUM == null) { 
       valueNUM = ""; 
    }
    if (valueLETRA == null) { 
       valueLETRA = ""; 
    }    */
    // Asignamos un color de reborde seg�n el estado de conservaci�n
    var colorBorde = "rgba(0,0,0,1.000)"; // Por defecto negro
    if (estado === 'Bueno')   colorBorde = "rgba(44, 160, 44,1.000)";  
    if (estado === 'Regular') colorBorde = "rgba(255, 127, 0,1.000)";  
    if (estado === 'Malo')    colorBorde = "rgba(227, 26, 28,1.000)";  
    if (estado === 'Ruina')   colorBorde = "rgba(152, 78, 163,1.000)"; 

    // Calculamos el color del interior (blanco o negro) seg�n la claridad del borde
    var colorInterior = obtenerColorTextoDesdeRGBA(colorBorde); 

    return [new ol.style.Style({
        text: new ol.style.Text({
            text: String(numero),
            font: "bold 13px sans-serif",
            fill: new ol.style.Fill({ color: colorInterior }),
            stroke: new ol.style.Stroke({ color: colorBorde, width: 3 })
        })
    })];
}

// =========================================================================
// ESTILO 2: PARA EL GRUPO DE TIPO DE NUMERACI�N
// =========================================================================
function estiloGrupoTipo(feature, resolution) {
    var valueNUM = feature.get('ENA_N1_00') || '';
    var valueLETRA = feature.get("ENA_L1_00") || '';
    var valueCODVIA = feature.get('ENA_CV_00');
    var numero = valueNUM + valueLETRA;

    // Aquí usamos otra paleta de colores completamente distinta para el reborde

    var colorBorde = obtenerColorPorVia(valueCODVIA);
    var colorInterior = obtenerColorTextoDesdeRGBA(colorBorde);

    return [new ol.style.Style({
        text: new ol.style.Text({
            text: String(numero),
            font: "bold 13px sans-serif",
            fill: new ol.style.Fill({ color: colorInterior }),
            stroke: new ol.style.Stroke({ color: colorBorde, width: 3 })
        })
    })];
}



function obtenerColorPorVia(valueCODVIA) {
    // Diccionario de colores (más rápido y limpio que un switch gigante)
    const mapaColores = {

'11': 'rgba(197,215,57,0.494)',
'12': 'rgba(118,124,240,0.494)',
'13': 'rgba(33,237,67,0.494)',
'14': 'rgba(202,197,55,0.494)',
'15': 'rgba(159,235,101,0.494)',
'17': 'rgba(166,51,215,0.494)',
'18': 'rgba(110,238,60,0.494)',
'19': 'rgba(210,115,110,0.494)',
'2': 'rgba(133,214,19,0.494)',
'20': 'rgba(182,58,204,0.494)',
'21': 'rgba(184,120,236,0.494)',
'23': 'rgba(92,51,215,0.494)',
'24': 'rgba(186,235,51,0.494)',
'25': 'rgba(61,209,175,0.494)',
'26': 'rgba(238,48,95,0.494)',
'27': 'rgba(72,210,157,0.494)',
'28': 'rgba(63,121,228,0.494)',
'29': 'rgba(148,103,215,0.494)',
'3': 'rgba(203,115,203,0.494)',
'31': 'rgba(112,200,193,0.494)',
'32': 'rgba(210,74,149,0.494)',
'33': 'rgba(50,153,213,0.494)',
'34': 'rgba(40,207,14,0.494)',
'36': 'rgba(231,78,56,0.494)',
'37': 'rgba(232,75,35,0.494)',
'38': 'rgba(74,101,209,0.494)',
'39': 'rgba(72,236,124,0.494)',
'4': 'rgba(230,211,128,0.494)',
'40': 'rgba(204,87,186,0.494)',
'42': 'rgba(98,86,205,0.494)',
'44': 'rgba(32,216,35,0.494)',
'45': 'rgba(208,115,152,0.494)',
'46': 'rgba(28,202,214,0.494)',
'47': 'rgba(82,158,240,0.494)',
'5': 'rgba(27,235,124,0.494)',
'5008': 'rgba(218,156,89,0.494)',
'6': 'rgba(224,61,175,0.494)',
'7': 'rgba(238,77,94,0.494)',
'9': 'rgba(204,134,93,0.494)',


'102': 'rgba(131,54,203,1.0)',
'105': 'rgba(122,57,220,1.0)',
'118': 'rgba(86,239,43,1.0)',
'121': 'rgba(238,225,130,1.0)',
'122': 'rgba(58,26,201,1.0)',
'124': 'rgba(239,178,55,1.0)',
'131': 'rgba(54,117,210,1.0)',
'5001': 'rgba(175,94,222,1.0)',
'5002': 'rgba(127,218,139,1.0)',
'5003': 'rgba(235,97,33,1.0)',
'5004': 'rgba(41,219,103,1.0)',
'5005': 'rgba(122,152,227,1.0)',
'5006': 'rgba(226,135,23,1.0)',
'5007': 'rgba(196,207,113,1.0)',
'5009': 'rgba(207,83,211,1.0)',
'5010': 'rgba(190,123,202,1.0)',
'5011': 'rgba(25,203,150,1.0)',
'5012': 'rgba(216,127,209,1.0)',
'5013': 'rgba(227,127,51,1.0)',
'5014': 'rgba(195,125,218,1.0)',
'5015': 'rgba(145,222,50,1.0)',
'5016': 'rgba(206,103,104,1.0)',
'5017': 'rgba(97,87,237,1.0)',
'5018': 'rgba(227,116,181,1.0)',
'5019': 'rgba(189,210,121,1.0)',
'5020': 'rgba(210,52,89,1.0)',
'5021': 'rgba(87,109,209,1.0)',
'5022': 'rgba(205,90,171,1.0)',
'5023': 'rgba(235,126,141,1.0)',
'5024': 'rgba(99,108,234,1.0)',
'5025': 'rgba(115,203,116,1.0)',
'5026': 'rgba(220,194,102,1.0)',
'5027': 'rgba(49,214,145,1.0)',
'5028': 'rgba(71,209,56,1.0)',
'5029': 'rgba(108,211,60,1.0)',
'5030': 'rgba(201,106,95,1.0)',
'5031': 'rgba(221,66,23,1.0)',
'5032': 'rgba(165,239,109,1.0)',
'5034': 'rgba(225,225,77,1.0)',
'5035': 'rgba(34,175,226,1.0)',
'5036': 'rgba(101,205,196,1.0)',
'5037': 'rgba(33,133,226,1.0)',
'5038': 'rgba(238,40,109,1.0)',
'5039': 'rgba(132,232,235,1.0)',
'5040': 'rgba(202,33,168,1.0)',
'5041': 'rgba(39,212,177,1.0)',
'5042': 'rgba(185,223,108,1.0)',
'5043': 'rgba(101,212,153,1.0)',
'5044': 'rgba(231,14,115,1.0)',
'5045': 'rgba(115,230,144,1.0)',
'5046': 'rgba(67,175,237,1.0)',
'5047': 'rgba(107,194,209,1.0)'


    };

    // Forzamos conversión a String para asegurar coincidencia exacta de la propiedad
    const clave = String(valueCODVIA);

    // Retorna el color del mapa. Si no se encuentra, aplica el default (negro)
    return mapaColores[clave] || 'rgba(255,255,255,1.000)';
}




var size = 0;
var placement = 'point';

var style_EibCcl_Numeracion_Catastro_3 = function(feature, resolution){
    var context = {
        feature: feature,
        variables: {}
    };
    
    var labelText = ""; 
    var valueCODVIA = feature.get("ENA_CV_00");
    var valueSGVIA = feature.get("EibCcl_Callejero_eibTipVia");
    var valueNOMVIA = feature.get("EibCcl_Callejero_eibNomVia");
    var nombreNUCLEO = String(valueCODVIA + " - " + valueSGVIA + " / " + valueNOMVIA)
    var valueNUM = feature.get("ENA_N1_00");
    var valueLETRA = feature.get("ENA_L1_00");
    var valueTIPO = feature.get("EN1_TIPO");
    var valueESTCONS = feature.get("ESTADOS_CONS_Estado_Conservacion");
    if (valueNUM == null) { 
       valueNUM = ""; 
    }
    if (valueLETRA == null) { 
       valueLETRA = ""; 
    }
/*    var labelFont = "bold 13px sans-serif";
    var labelFill = "#000000";
    var circleFill = "#4fc3f7";
    var bufferColor = "#aaaaaa";
    if (valueTIPO == "00_N1") {
    	circleFill = "#0d47a1";
    }
    if (valueESTCONS == "Bueno") {
    	bufferColor = "#2ca02c";
    	labelFill = "#ffffff"
    }
    if (valueESTCONS == "Regular") {
    bufferColor = "#ff7f00";
    labelFill = "#ffffff"
    }
    if (valueESTCONS == "Malo") {
    	bufferColor = "#e31a1c";
    	labelFill = "#ffffff"
    }
    if (valueESTCONS == "Ruina") {
    	bufferColor = "#984ea3";
    	labelFill = "#ffffff"
    }
*/
    
    var bufferWidth = 7;
    var textAlign = "left";
    var offsetX = 0;
    var offsetY = 0;
    var placement = 'point';
    if ("" !== null) {
        labelText = String(valueNUM + valueLETRA);
    }
    var radioCirculo = 12;
    
   
    
/*        var style = [ 
        new ol.style.Style({
        image: new ol.style.Circle({
            radius: 10,
            displacement: [offsetX, offsetY],
            stroke: new ol.style.Stroke({
            color: circleFill,
            width: 3.5
        })
        })
    }),
    new ol.style.Style({
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor, bufferWidth)
    })];;
*/


/*
switch(String(valueCODVIA)) {

case '60': circleFill = 'rgba(255,96,17,1.0)'; break;
case '85': circleFill = 'rgba(221,237,127,1.0)'; break;
case '94': circleFill = 'rgba(136,111,225,1.0)'; break;
case '95': circleFill = 'rgba(203,199,80,1.0)'; break;
case '98': circleFill = 'rgba(109,230,48,1.0)'; break;
case '101': circleFill = 'rgba(135,211,55,1.0)'; break;
case '103': circleFill = 'rgba(236,178,79,1.0)'; break;
case '105': circleFill = 'rgba(215,62,41,1.0)'; break;
case '107': circleFill = 'rgba(224,25,171,1.0)'; break;
case '108': circleFill = 'rgba(71,153,200,1.0)'; break;
case '109': circleFill = 'rgba(182,114,207,1.0)'; break;
case '111': circleFill = 'rgba(77,123,239,1.0)'; break;
case '112': circleFill = 'rgba(205,171,35,1.0)'; break;
case '114': circleFill = 'rgba(102,213,79,1.0)'; break;
case '115': circleFill = 'rgba(18,200,18,1.0)'; break;
case '120': circleFill = 'rgba(102,202,227,1.0)'; break;
case '121': circleFill = 'rgba(18,116,228,1.0)'; break;
case '5002': circleFill = 'rgba(240,125,80,1.0)'; break;
case '5003': circleFill = 'rgba(231,121,24,1.0)'; break;
case '5004': circleFill = 'rgba(78,70,214,1.0)'; break;
case '5005': circleFill = 'rgba(237,122,225,1.0)'; break;
case '5006': circleFill = 'rgba(14,223,87,1.0)'; break;
case '5007': circleFill = 'rgba(33,220,161,1.0)'; break;
case '5008': circleFill = 'rgba(208,118,123,1.0)'; break;
case '5009': circleFill = 'rgba(129,141,233,1.0)'; break;
case '5010': circleFill = 'rgba(125,72,203,1.0)'; break;
case '5011': circleFill = 'rgba(216,81,135,1.0)'; break;
case '5016': circleFill = 'rgba(107,234,173,1.0)'; break;
case '5017': circleFill = 'rgba(134,18,222,1.0)'; break;
case '5018': circleFill = 'rgba(233,92,172,1.0)'; break;
case '5019': circleFill = 'rgba(156,215,28,1.0)'; break;
case '5020': circleFill = 'rgba(67,237,95,1.0)'; break;
case '5021': circleFill = 'rgba(212,44,227,1.0)'; break;
case '5022': circleFill = 'rgba(87,200,204,1.0)'; break;

    case '123': circleFill = 'rgba(179,48,240,1.000)'; break;
    case '24': circleFill = 'rgba(239,81,94,1.000)'; break;
    case '26': circleFill = 'rgba(168,237,31,1.000)'; break;
    case '49': circleFill = 'rgba(37,40,211,1.000)'; break;
    case '50': circleFill = 'rgba(61,204,166,1.000)'; break;
    case '5001': circleFill = 'rgba(127,200,54,1.000)'; break;
    case '5021': circleFill = 'rgba(93,234,222,1.000)'; break;
    case '51': circleFill = 'rgba(191,216,51,1.000)'; break;
    case '53': circleFill = 'rgba(38,226,145,1.000)'; break;
    case '55': circleFill = 'rgba(121,232,145,1.000)'; break;
    case '57': circleFill = 'rgba(219,29,143,1.000)'; break;
    case '58': circleFill = 'rgba(96,27,234,1.000)'; break;
    case '59': circleFill = 'rgba(110,175,229,1.000)'; break;
    case '60': circleFill = 'rgba(198,72,217,1.000)'; break;
    case '62': circleFill = 'rgba(133,119,202,1.000)'; break;
    case '64': circleFill = 'rgba(106,215,87,1.000)'; break;
    case '65': circleFill = 'rgba(232,68,197,1.000)'; break;
    case '67': circleFill = 'rgba(210,65,128,1.000)'; break;
    case '69': circleFill = 'rgba(201,109,75,1.000)'; break;
    case '7': circleFill = 'rgba(115,229,159,1.000)'; break;
    case '71': circleFill = 'rgba(202,84,71,1.000)'; break;
    case '76': circleFill = 'rgba(224,222,79,1.000)'; break;
    case '78': circleFill = 'rgba(25,152,202,1.000)'; break;
    case '79': circleFill = 'rgba(122,159,223,1.000)'; break;
    case '80': circleFill = 'rgba(236,200,58,1.000)'; break;
    case '83': circleFill = 'rgba(45,199,216,1.000)'; break;
    case '85': circleFill = 'rgba(212,23,70,1.000)'; break;
    case '86': circleFill = 'rgba(227,160,53,1.000)'; break;
    case '87': circleFill = 'rgba(231,129,228,1.000)'; break;
    case '88': circleFill = 'rgba(154,95,209,1.000)'; break;
    case '89': circleFill = 'rgba(51,234,57,1.000)'; break;
    case '90': circleFill = 'rgba(83,106,207,1.000)'; break;
    case '91': circleFill = 'rgba(88,233,20,1.000)'; break;
    default: circleFill = 'rgba(0,0,0,1.000)'; break;
}
*/


var style = [ 

/*
            // 1. EL C�RCULO
            new ol.style.Style({
                image: new ol.style.Circle({
                    radius: radioCirculo,
                    displacement: [offsetX, offsetY], // Tu desplazamiento original del c�rculo
                    stroke: new ol.style.Stroke({
                        color: circleFill,
                        width: 3.5
                    }),
                    fill: new ol.style.Fill({
                        color: 'rgba(0, 0, 0, 0)' // Centro totalmente transparente para ver el texto
                    })
                })
            }),
*/
            
            // 2. EL TEXTO PERFECTAMENTE CENTRADO
            new ol.style.Style({
                text: new ol.style.Text({
                    text: labelText,
                    font: labelFont,
                    fill: new ol.style.Fill({
                        color: obtenerColorTextoDesdeRGBA(circleFill)
                    }),
                    stroke: new ol.style.Stroke({
                        color: circleFill,
                        width: bufferWidth
                    }),
                    
                    // =========================================================
                    // LAS 4 PROPIEDADES CLAVE PARA EL CENTRADO ABSOLUTO
                    // =========================================================
                    textAlign: 'center',     // Fuerza el centro horizontal del texto
                    textBaseline: 'middle',  // Fuerza el centro vertical del texto
                    offsetX: offsetX,        // Sigue al c�rculo en el eje X
                    offsetY: -offsetY,       // Sigue al c�rculo en el eje Y (OpenLayers invierte el signo Y en el texto respecto a displacement)
                    // =========================================================
                    
                    placement: placement
                })
            })
        ];
    

    return style;
};
