var wms_layers = [];

var lyr_GoogleSatellite_0 = new ol.layer.Tile({
    'title': 'Google Satellite',
    'opacity': 0.700000,
    source: new ol.source.XYZ({
    attributions: ' ',
        url: 'http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}'
    })
});

var lyr_Ortoimagen_1 = new ol.layer.Tile({
    source: new ol.source.TileWMS(({
      url: "http://www.ign.es/wms-inspire/pnoa-ma?",
      attributions: ' ',
      params: {
        "LAYERS": "OI.OrthoimageCoverage",
        "TILED": "true",
        "VERSION": "1.3.0"},
    })),
    title: 'Ortoimagen',
    popuplayertitle: 'Ortoimagen',
    type: '',
    opacity: 0.700000,
});
wms_layers.push([lyr_Ortoimagen_1, 0]);

var lyr_Catastro_2 = new ol.layer.Image({
    source: new ol.source.ImageWMS(({
      url: "https://ovc.catastro.meh.es/Cartografia/WMS/ServidorWMS.aspx",
      attributions: ' ',
      params: {
        "LAYERS": "Catastro",
        "TILED": "true",
        "VERSION": "1.1.1"},
    })),
    title: 'Catastro',
    popuplayertitle: 'Catastro',
    type: '',
    opacity: 1.000000,
});
wms_layers.push([lyr_Catastro_2, 0]);


var format_Eib_Parroquias_0 = new ol.format.GeoJSON();
var features_Eib_Parroquias_0 = format_Eib_Parroquias_0.readFeatures(json_Eib_Parroquias_0, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Eib_Parroquias_0 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Eib_Parroquias_0.addFeatures(features_Eib_Parroquias_0);
var lyr_Eib_Parroquias_0 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Eib_Parroquias_0, 
                style: style_Eib_Parroquias_0,
                popuplayertitle: 'Parroquias',
                interactive: true,
                title: '<img src="styles/legend/Eib_Parroquias_0.png" /> Parroquias'
            });




// =========================================================================
// LECTURA DEL GEOJSON ORIGINAL (UNA SOLA VEZ)
// =========================================================================
var format_EibCcl_Numeracion_Catastro_3 = new ol.format.GeoJSON();
var features_EibCcl_Numeracion_Catastro_3 = format_EibCcl_Numeracion_Catastro_3.readFeatures(json_EibCcl_Numeracion_Catastro_3, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});

// =========================================================================
// GRUPO 1: ESTADO DE CONSERVACIÓN
// =========================================================================
var source_Bueno = new ol.source.Vector({ attributions: ' ' });
source_Bueno.addFeatures(features_EibCcl_Numeracion_Catastro_3.filter(function(f) {
    return f.get('ESTADOS_CONS_Estado_Conservacion') === 'Bueno';
}));

var source_Regular = new ol.source.Vector({ attributions: ' ' });
source_Regular.addFeatures(features_EibCcl_Numeracion_Catastro_3.filter(function(f) {
    return f.get('ESTADOS_CONS_Estado_Conservacion') === 'Regular';
}));

var source_Malo = new ol.source.Vector({ attributions: ' ' });
source_Malo.addFeatures(features_EibCcl_Numeracion_Catastro_3.filter(function(f) {
    return f.get('ESTADOS_CONS_Estado_Conservacion') === 'Malo';
}));

var source_Ruina = new ol.source.Vector({ attributions: ' ' });
source_Ruina.addFeatures(features_EibCcl_Numeracion_Catastro_3.filter(function(f) {
    return f.get('ESTADOS_CONS_Estado_Conservacion') === 'Ruina';
}));

var source_Vacio = new ol.source.Vector({ attributions: ' ' });
source_Vacio.addFeatures(features_EibCcl_Numeracion_Catastro_3.filter(function(f) {
    var val = f.get('ESTADOS_CONS_Estado_Conservacion');
    return val === null || val === undefined || String(val).trim() === '';
}));

var resoluciones = { maxResolution: 14.282277737653603, minResolution: 0.00028004466152261963 };

var lyr_Bueno = new ol.layer.Vector({
    declutter: false, source: source_Bueno, style: estiloGrupoConservacion, interactive: true,
    maxResolution: resoluciones.maxResolution, minResolution: resoluciones.minResolution,
    popuplayertitle: 'Numeración Taboadela', title: '<img src="styles/legend/ECONS_BUENO.png" /> Bueno'
});

var lyr_Regular = new ol.layer.Vector({
    declutter: false, source: source_Regular, style: estiloGrupoConservacion, interactive: true,
    maxResolution: resoluciones.maxResolution, minResolution: resoluciones.minResolution,
    popuplayertitle: 'Numeración Taboadela', title: '<img src="styles/legend/ECONS_REGULAR.png" /> Regular'
});

var lyr_Malo = new ol.layer.Vector({
    declutter: false, source: source_Malo, style: estiloGrupoConservacion, interactive: true,
    maxResolution: resoluciones.maxResolution, minResolution: resoluciones.minResolution,
    popuplayertitle: 'Numeración Taboadela', title: '<img src="styles/legend/ECONS_MALO.png" /> Malo'
});

var lyr_Ruina = new ol.layer.Vector({
    declutter: false, source: source_Ruina, style: estiloGrupoConservacion, interactive: true,
    maxResolution: resoluciones.maxResolution, minResolution: resoluciones.minResolution,
    popuplayertitle: 'Numeración Taboadela', title: '<img src="styles/legend/ECONS_RUINA.png" /> Ruina'
});

var lyr_Vacio = new ol.layer.Vector({
    declutter: false, source: source_Vacio, style: estiloGrupoConservacion, interactive: true,
    maxResolution: resoluciones.maxResolution, minResolution: resoluciones.minResolution,
    popuplayertitle: 'Numeración Taboadela', title: '<img src="styles/legend/ECONS_VACIO.png" /> Sin definir'
});

var group_Eib_ECons = new ol.layer.Group({
    layers: [lyr_Bueno, lyr_Regular, lyr_Malo, lyr_Ruina, lyr_Vacio],
    fold: 'close',
    title: 'ESTADO DE CONSERVACIÓN'
});

var source_Tipo = new ol.source.Vector({ attributions: ' ' });
// Añadimos todos los elementos directamente sin pasar ningún .filter()
source_Tipo.addFeatures(features_EibCcl_Numeracion_Catastro_3);

var lyr_Tipo = new ol.layer.Vector({
    declutter: false, 
    source: source_Tipo, 
    style: estiloGrupoTipo, 
    interactive: true,
    maxResolution: resoluciones.maxResolution, 
    minResolution: resoluciones.minResolution,
    popuplayertitle: 'Numeración Taboadela', 
    title: '<img src="styles/legend/ECONS_VACIO.png" /> Numeración'
});

var group_Eib_Tipo = new ol.layer.Group({
    layers: [lyr_Tipo],
    fold: 'close',
    title: 'NUMERACIÓN'
});

/*
// =========================================================================
// GRUPO 2: TIPO DE EDIFICACIÓN (FILTRADO POR EN1_TIPO)
// =========================================================================
var source_Tipo_N1 = new ol.source.Vector({ attributions: ' ' });
source_Tipo_N1.addFeatures(features_EibCcl_Numeracion_Catastro_3.filter(function(f) {
    return f.get('EN1_TIPO') === '00_N1';
}));

var source_Tipo_N2 = new ol.source.Vector({ attributions: ' ' });
source_Tipo_N2.addFeatures(features_EibCcl_Numeracion_Catastro_3.filter(function(f) {
    return f.get('EN1_TIPO') === '00_N2';
}));

var lyr_Tipo_N1 = new ol.layer.Vector({
    declutter: false, source: source_Tipo_N1, style: estiloGrupoTipo, interactive: true,
    maxResolution: resoluciones.maxResolution, minResolution: resoluciones.minResolution,
    popuplayertitle: 'Numeración Esgos', title: '<img src="styles/legend/ECONS_VACIO.png" /> Tipo N1'
});

var lyr_Tipo_N2 = new ol.layer.Vector({
    declutter: false, source: source_Tipo_N2, style: estiloGrupoTipo, interactive: true,
    maxResolution: resoluciones.maxResolution, minResolution: resoluciones.minResolution,
    popuplayertitle: 'Numeración Esgos', title: '<img src="styles/legend/ECONS_VACIO.png" /> Tipo N2'
});

var group_Eib_Tipo = new ol.layer.Group({
    layers: [lyr_Tipo_N1, lyr_Tipo_N2],
    fold: 'close',
    title: 'NUMERACIÓN'
});*/

// =========================================================================
// OTROS GRUPOS DEL MAPA ORIGINAL
// =========================================================================


var group_Varios = new ol.layer.Group({
    layers: [lyr_GoogleSatellite_0, lyr_Ortoimagen_1, lyr_Catastro_2, lyr_Eib_Parroquias_0],
    fold: 'open',
    title: 'AUXILIARES'
});

var bloqueandoBase = false;
var mapasBase = [lyr_GoogleSatellite_0, lyr_Ortoimagen_1];

mapasBase.forEach(function(capaActual) {
    capaActual.on('change:visible', function() {
        // Si ya estamos en proceso de apagar una capa, salimos para evitar bucles
        if (bloqueandoBase) return;
        
        // Si el usuario acaba de encender esta capa...
        if (capaActual.getVisible()) {
            bloqueandoBase = true;
            
            // Recorremos la otra capa base y la apagamos
            mapasBase.forEach(function(otraCapa) {
                if (otraCapa !== capaActual) {
                    otraCapa.setVisible(false);
                }
            });
            
            bloqueandoBase = false;
        }
    });
});




var format_Eib_Ejes_0 = new ol.format.GeoJSON();
var features_Eib_Ejes_0 = format_Eib_Ejes_0.readFeatures(json_Eib_Ejes_0, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Eib_Ejes_0 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Eib_Ejes_0.addFeatures(features_Eib_Ejes_0);
var lyr_Eib_Ejes_0 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Eib_Ejes_0, 
                style: style_Eib_Ejes_0,
                popuplayertitle: ' Eib_Ejes',
                interactive: true,
    title: 'Ejes de vía<br />'
    });

lyr_Eib_Ejes_0.setVisible(true);

var format_Eib_Lugares_0 = new ol.format.GeoJSON();
var features_Eib_Lugares_0 = format_Eib_Lugares_0.readFeatures(json_Eib_Lugares_0, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Eib_Lugares_0 = new ol.source.Vector({ attributions: ' ' });
jsonSource_Eib_Lugares_0.addFeatures(features_Eib_Lugares_0);

var lyr_Eib_Lugares_0 = new ol.layer.Vector({
    declutter: false,
    source: jsonSource_Eib_Lugares_0, 
    style: style_Eib_Lugares_0,
    popuplayertitle: 'Vías/Lugares Taboadela',
    interactive: true,
    opacity: 0.50000,
    title: 'Núcleos<br />'
});

var group_Nucleos_y_Ejes = new ol.layer.Group({
    layers: [lyr_Eib_Lugares_0,lyr_Eib_Ejes_0],
    fold: 'open',
    title: 'NUCLEOS y EJES VIA'
});







// Visibilidades iniciales de arranque (Por defecto arrancamos mostrando Estado de Conservación)
lyr_GoogleSatellite_0.setVisible(false);
lyr_Ortoimagen_1.setVisible(true);
lyr_Catastro_2.setVisible(false);

lyr_Bueno.setVisible(false); lyr_Regular.setVisible(false); lyr_Malo.setVisible(false); lyr_Ruina.setVisible(false); lyr_Vacio.setVisible(false);
//lyr_Tipo_N1.setVisible(false); lyr_Tipo_N2.setVisible(false); // Tipo arranca apagado para ser excluyente
lyr_Tipo.setVisible(true);
group_Eib_ECons.setVisible(false); group_Eib_Tipo.setVisible(true); // Tipo arranca apagado para ser excluyente


//var layersList = [group_Varios, group_Eib_ECons, group_Eib_Tipo, group_Nucleos_y_Ejes];
// =========================================================================
// GRUPO MAESTRO DEL MUNICIPIO (SIN CHECKBOX TOTAL)
// =========================================================================
var group_Municipio_Taboadela = new ol.layer.Group({
    layers: [group_Varios, group_Eib_ECons, group_Eib_Tipo, group_Nucleos_y_Ejes],
    fold: 'open', // 'open' para que arranque abierto, 'close' para que arranque cerrado
    title: '<span class="titulo-municipio-cabecera">MUNICIPIO DE TABOADELA</span>'
});

// Pasamos únicamente el grupo maestro a la lista oficial de capas
var layersList = [group_Municipio_Taboadela];

// Inyectamos dinámicamente el estilo CSS para hacer desaparecer el checkbox
var estiloMenu = document.createElement('style');
estiloMenu.innerHTML = `
    /* Busca el elemento de la lista que contiene nuestro título y oculta su checkbox */
    li:has(.titulo-municipio-cabecera) > input[type="checkbox"] {
        display: none !important;
    }
    
    /* Estilizamos el texto para que actúe como un verdadero encabezado de menú */
    li:has(.titulo-municipio-cabecera) > label {
        font-weight: bold !important;
        font-size: 1.15em !important;
        color: #2c3e50 !important;
        cursor: default !important;
        pointer-events: none; /* Evita que hacer clic en el texto intente alternar visibilidad */
    }
`;
document.head.appendChild(estiloMenu);
// =========================================================================


//var layersList = [group_Varios, group_Eib_Tipo, group_Eib_ECons, group_Nucleos_y_Ejes];
// =========================================================================
// CAPA GLOBAL INVISIBLE PARA EL BUSCADOR DE QGIS2WEB
// =========================================================================
var source_Completo = new ol.source.Vector({ attributions: ' ' });
source_Completo.addFeatures(features_EibCcl_Numeracion_Catastro_3);
var lyr_EibCcl_Numeracion_Catastro_3 = new ol.layer.Vector({ source: source_Completo });

// Asignación en bloque de metadatos, alias, labels e interacción
var subCapas = [lyr_Bueno, lyr_Regular, lyr_Malo, lyr_Ruina, lyr_Vacio, lyr_Tipo];
subCapas.forEach(function(lyr) {
    lyr.set('fieldAliases', {'fid': 'fid', 'REFCAT': 'REF. CATASTRAL', 'EibCcl_Callejero_eibEntAgp': 'PARROQUIA', 'EibCcl_Callejero_eibTipVia': 'SIGLA', 'EibCcl_Callejero_eibNomVia': 'VIA/LUGAR', 'ENH_CV_00': 'ENH_CV_00', 'ENH_N1_00': 'ENH_N1_00', 'ENH_L1_00': 'ENH_L1_00', 'ENH_MARCA': 'ENH_MARCA', 'ENC_CV_00': 'ENC_CV_00', 'ENC_N1_00': 'ENC_N1_00', 'ENC_L1_00': 'ENC_L1_00', 'ENC_MARCA': 'ENC_MARCA', 'ENA_CV_00': 'ENA_CV_00', 'ENA_N1_00': 'ENA_N1_00', 'ENA_L1_00': 'ENA_L1_00', 'ENA_MARCA': 'ENA_MARCA', 'ENP_CV_00': 'ENP_CV_00', 'ENP_N1_00': 'ENP_N1_00', 'ENP_L1_00': 'ENP_L1_00', 'ENP_MARCA': 'ENP_MARCA', 'END_CV_00': 'END_CV_00', 'END_N1_00': 'NUMERO', 'END_L1_00': 'LETRA', 'END_MARCA': 'END_MARCA', 'EN1_TIPO': 'EN1_TIPO', 'NOMVIA': 'EN1_NOMVIA', 'EN1_PRQ': 'EN1_PRQ', 'EN1_SGVIA': 'EN1_SGVIA', 'Copia_5': 'Copia_5', 'Copia_6': 'Copia_6', 'Copia_7': 'Copia_7', 'Copia_8': 'Copia_8', 'DUPLICADOS': 'DUPLICADOS', 'rotation': 'rotation', 'CV_NUM': 'CV_NUM', 'ID_CV_NA': 'ID_CV_NA', 'ID_CV_NP': 'ID_CV_NP', 'ID_MODIF': 'MODIFICACION', 'ID_CV_ND': 'ID_CV_ND', 'DIRECCION': 'DIRECCION', 'FOTOS_codmun': 'FOTOS_codmun', 'FOTOS_foto_01': 'Foto_01', 'FOTOS_foto_02': 'Foto_02', 'FOTOS_foto_03': 'Foto_03', 'FOTOS_foto_04': 'Foto_04', 'FOTOS_foto_05': 'Foto_05', 'FOTOS_foto_06': 'Foto_06', 'FOTOS_foto_07': 'Foto_07', 'FOTOS_foto_08': 'Foto_08', 'FOTOS_foto_09': 'Foto_09', 'ESTADOS_CONS_Estado_Conservacion': 'Est. Conserv.', });
    lyr.set('fieldImages', {'fid': 'TextEdit', 'REFCAT': 'TextEdit', 'EibCcl_Callejero_eibEntAgp': 'TextEdit', 'EibCcl_Callejero_eibTipVia': 'TextEdit', 'ENH_CV_00': 'Range', 'ENH_N1_00': 'Range', 'ENH_L1_00': 'TextEdit', 'ENH_MARCA': 'TextEdit', 'ENC_CV_00': 'Range', 'ENC_N1_00': 'Range', 'ENC_L1_00': 'TextEdit', 'ENC_MARCA': 'TextEdit', 'ENA_CV_00': 'Range', 'ENA_N1_00': 'Range', 'ENA_L1_00': 'TextEdit', 'ENA_MARCA': 'TextEdit', 'ENP_CV_00': 'Range', 'ENP_N1_00': 'Range', 'ENP_L1_00': 'TextEdit', 'ENP_MARCA': 'TextEdit', 'END_CV_00': 'Range', 'END_N1_00': 'Range', 'END_L1_00': 'TextEdit', 'END_MARCA': 'TextEdit', 'EN1_TIPO': 'TextEdit', 'EN1_NOMVIA': 'TextEdit', 'EN1_PRQ': 'TextEdit', 'EN1_SGVIA': 'TextEdit', 'Copia_5': 'TextEdit', 'Copia_6': 'TextEdit', 'Copia_7': 'TextEdit', 'Copia_8': 'TextEdit', 'DUPLICADOS': 'TextEdit', 'rotation': 'TextEdit', 'EibCcl_Callejero_eibNomVia': 'TextEdit', 'CV_NUM': 'TextEdit', 'ID_CV_NA': 'Range', 'ID_CV_NP': 'Range', 'ID_MODIF': 'TextEdit', 'ID_CV_ND': 'Range', 'DIRECCION': 'TextEdit', 'FOTOS_codmun': 'TextEdit', 'FOTOS_foto_01': 'TextEdit', 'FOTOS_foto_02': 'TextEdit', 'FOTOS_foto_03': 'TextEdit', 'FOTOS_foto_04': 'TextEdit', 'FOTOS_foto_05': 'TextEdit', 'FOTOS_foto_06': 'TextEdit', 'FOTOS_foto_07': 'TextEdit', 'FOTOS_foto_08': 'TextEdit', 'FOTOS_foto_09': 'TextEdit', 'ESTADOS_CONS_Estado_Conservacion': '', });
    lyr.set('fieldLabels', {'fid': 'hidden field', 'REFCAT': 'inline label - always visible', 'EibCcl_Callejero_eibEntAgp': 'inline label - always visible', 'EibCcl_Callejero_eibTipVia': 'hidden field', 'ENH_CV_00': 'hidden field', 'ENH_N1_00': 'hidden field', 'ENH_L1_00': 'hidden field', 'ENH_MARCA': 'hidden field', 'ENC_CV_00': 'hidden field', 'ENC_N1_00': 'hidden field', 'ENC_L1_00': 'hidden field', 'ENC_MARCA': 'hidden field', 'ENA_CV_00': 'hidden field', 'ENA_N1_00': 'hidden field', 'ENA_L1_00': 'hidden field', 'ENA_MARCA': 'hidden field', 'ENP_CV_00': 'hidden field', 'ENP_N1_00': 'hidden field', 'ENP_L1_00': 'hidden field', 'ENP_MARCA': 'hidden field', 'END_CV_00': 'hidden field', 'END_N1_00': 'hidden field', 'END_L1_00': 'hidden field', 'END_MARCA': 'hidden field', 'EN1_TIPO': 'hidden field', 'EN1_NOMVIA': 'hidden field', 'EN1_PRQ': 'hidden field', 'EN1_SGVIA': 'hidden field', 'Copia_5': 'hidden field', 'Copia_6': 'hidden field', 'Copia_7': 'hidden field', 'Copia_8': 'hidden field', 'DUPLICADOS': 'hidden field', 'rotation': 'hidden field', 'EibCcl_Callejero_eibNomVia': 'hidden field', 'CV_NUM': 'hidden field', 'ID_CV_NA': 'hidden field', 'ID_CV_NP': 'hidden field', 'ID_MODIF': 'hidden field', 'ID_CV_ND': 'hidden field', 'DIRECCION': 'inline label - always visible', 'FOTOS_codmun': 'hidden field', 'FOTOS_foto_01': 'inline label - visible with data', 'FOTOS_foto_02': 'inline label - visible with data', 'FOTOS_foto_03': 'inline label - visible with data', 'FOTOS_foto_04': 'inline label - visible with data', 'FOTOS_foto_05': 'inline label - visible with data', 'FOTOS_foto_06': 'inline label - visible with data', 'FOTOS_foto_07': 'inline label - visible with data', 'FOTOS_foto_08': 'inline label - visible with data', 'FOTOS_foto_09': 'inline label - visible with data', 'ESTADOS_CONS_Estado_Conservacion': 'inline label - visible with data', });
    
    lyr.on('precompose', function(evt) {
        evt.context.globalCompositeOperation = 'normal';
    });
});

lyr_Eib_Lugares_0.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});

lyr_Eib_Lugares_0.setZIndex(10);
lyr_Eib_Ejes_0.setZIndex(10);
lyr_Bueno.setZIndex(100); lyr_Regular.setZIndex(100); lyr_Malo.setZIndex(100); lyr_Ruina.setZIndex(100); lyr_Vacio.setZIndex(100);
lyr_Tipo.setZIndex(100);

// =========================================================================
// SCRIPT DE EXCLUSIVIDAD MUTUA EN LEYENDA (AUTOMÁTICO)
// =========================================================================
var bloqueandoEventos = false;

var capasConservacion = [lyr_Bueno, lyr_Regular, lyr_Malo, lyr_Ruina, lyr_Vacio];
var capasTipo = [lyr_Tipo];

// Evento: Al activar algo en Conservación, se apaga Tipo
capasConservacion.forEach(function(capa) {
    capa.on('change:visible', function() {
        if (bloqueandoEventos) return;
        if (capa.getVisible()) {
            bloqueandoEventos = true;
            capasTipo.forEach(function(c) { c.setVisible(false); });
            bloqueandoEventos = false;
        }
    });
});

// Evento: Al activar algo en Tipo, se apaga Conservación
capasTipo.forEach(function(capa) {
    capa.on('change:visible', function() {
        if (bloqueandoEventos) return;
        if (capa.getVisible()) {
            bloqueandoEventos = true;
            capasConservacion.forEach(function(c) { c.setVisible(false); });
            bloqueandoEventos = false;
        }
    });
});
