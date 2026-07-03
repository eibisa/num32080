function hasClass(el, cls) {
  return el.className && new RegExp('(\\s|^)' +    cls + '(\\s|$)').test(el.className);
}

function addClass(elem, className) {
  if (!hasClass(elem, className)) {
    elem.className += ' ' + className;
  }
}

function removeClass(elem, className) {
  var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, ' ') + ' ';
  if (hasClass(elem, className)) {
    while (newClass.indexOf(' ' + className + ' ') >= 0) {
      newClass = newClass.replace(' ' + className + ' ', ' ');
    }
    elem.className = newClass.replace(/^\s+|\s+$/g, '');
  }
}


class SearchLayer extends ol.control.Control {
  constructor(optOptions) {
    const options = optOptions || {};
    if (!options.layer) {
      throw new Error('Missing layer in options');
    }

    // 1. Detectar vector source
    let source;
    if (options.layer instanceof ol.layer.Image &&
        options.layer.getSource() instanceof ol.source.ImageVector) {
      source = options.layer.getSource().getSource();
    } else if (options.layer instanceof ol.layer.Vector) {
      source = options.layer.getSource();
    }
    if (source instanceof ol.source.Cluster) {
      source = source.getSource();
    }

    // 2. IMPORTANTE: Declaramos map y select al principio para que Horsey pueda usarlos
    const map = options.map;
    const select = new ol.interaction.Select({
      layers: [options.layer],
      condition: ol.events.condition.never,
			
			
			
			


// =========================================================================
      // SOLUCIÓN: Forzar el texto original enmarcado en un recuadro limpio
      // =========================================================================
style: function(feature, resolution) { // <-- CORREGIDO: Añadido resolution
        var labelText = ""; 
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

        var labelFont = "12px sans-serif"; // <-- CORREGIDO: Quitada la coma incorrecta
        var labelFill = "#000000";
        var circleFill = "#4fc3f7";
        var bufferColor = "#aaaaaa";

        if (valueTIPO == "00_N1") {
            circleFill = "#0d47a1";
        }

        if (valueESTCONS == "Bueno") {
            bufferColor = "#2ca02c";
            labelFill = "#ffffff";
        }
        if (valueESTCONS == "Regular") {
            bufferColor = "#ff7f00";
            labelFill = "#ffffff";
        }
        if (valueESTCONS == "Malo") {
            bufferColor = "#e31a1c";
            labelFill = "#ffffff";
        }
        if (valueESTCONS == "Ruina") {
            bufferColor = "#984ea3";
            labelFill = "#ffffff";
        }

        var bufferWidth = 7;
        var textAlign = "left";
        var offsetX = 0;
        var offsetY = 0;
        var placement = 'point';

        labelText = String(valueNUM + valueLETRA);


        // =========================================================================
        // CONSTRUCCIÓN DEL CUADRADO VÍA REGULARSHAPE (4 líneas externas, centro hueco)
        // =========================================================================
        var style = [ 
            new ol.style.Style({
                image: new ol.style.RegularShape({
                    stroke: new ol.style.Stroke({
                        color: circleFill, // <-- Puedes cambiar este Rojo por tu variable 'circleFill' si quieres conservar los colores por tipo
                        width: 3.5
                    }),
                    points: 4,          // 4 puntos = Cuadrado
                    radius: 16,         // Tamaño del recuadro
                    //angle: Math.PI / 4, // Rotación de 45 grados (indispensable para que quede plano como un cuadrado y no como un rombo)
                    displacement: [offsetX, offsetY] // Sigue fielmente el desplazamiento del número
                })
            }),
            // 2. EL TEXTO PERFECTAMENTE CENTRADO
            new ol.style.Style({
                text: new ol.style.Text({
                    text: labelText,
                    font: labelFont,
                    fill: new ol.style.Fill({
                        color: labelFill
                    }),
                    stroke: new ol.style.Stroke({
                        color: bufferColor,
                        width: bufferWidth
                    }),
                    
                    // =========================================================
                    // LAS 4 PROPIEDADES CLAVE PARA EL CENTRADO ABSOLUTO
                    // =========================================================
                    textAlign: 'center',     // Fuerza el centro horizontal del texto
                    textBaseline: 'middle',  // Fuerza el centro vertical del texto
                    offsetX: offsetX,        // Sigue al círculo en el eje X
                    offsetY: -offsetY,       // Sigue al círculo en el eje Y (OpenLayers invierte el signo Y en el texto respecto a displacement)
                    // =========================================================
                    
                    placement: placement
                })
            })
        ];;

        return style;
    }

      // =========================================================================



























			
			
			
			/*
			
			// =========================================================================
      // ESTILO DE ENCUADRE: Aro fino rojo sin relleno central
      // =========================================================================
      style: function() {
        return new ol.style.Style({
          image: new ol.style.Circle({
            radius: 12, // Tamaño del radio para dar margen al número en el centro
            stroke: new ol.style.Stroke({
              color: '#ff3333', // Rojo llamativo
              width: 2          // Grosor de línea fino
            }),
            fill: new ol.style.Fill({
              color: 'rgba(51, 136, 255, 0.25)' // Centro totalmente transparente
            })
          })
        });
      }  
      // =========================================================================
      */
      
    });
    if (map) {
      map.addInteraction(select);
    }
/*
    // Elementos del Control HTML
    const button = document.createElement('button');
    button.type = 'button';

    const form = document.createElement('form');
    form.setAttribute('id', 'ol-search-form');
    const defaultFormClass = ['search-layer-input-search'];
    if (optOptions.collapsed) {
      defaultFormClass.push('search-layer-collapsed');
    }
    form.setAttribute('class', defaultFormClass.join(' '));

    // Crear los 3 selectores
    const selParroquia = document.createElement('select');
    const selVia = document.createElement('select');
    const selNumero = document.createElement('select');

    selParroquia.innerHTML = '<option value="">Parroquia...</option>';
    selParroquia.add(new Option("TODAS LAS PARROQUIAS", "TODAS"));

    selVia.innerHTML = '<option value="">Vía...</option>';
    selNumero.innerHTML = '<option value="">Nº...</option>';

    form.appendChild(selParroquia);
    form.appendChild(selVia);
    form.appendChild(selNumero);
    
    // --- NUEVA BÚSQUEDA POR REFERENCIA CATASTRAL ---
    const inputRC = document.createElement('input');
    inputRC.type = 'text';
    inputRC.id = 'search-rc';
    inputRC.placeholder = 'Buscar Ref. Catastral...';
    inputRC.style.width = '100%';
    inputRC.style.marginTop = '6px';
    form.appendChild(inputRC);

    const element = document.createElement('div');
    element.className = 'search-layer ol-unselectable ol-control';
    element.appendChild(button);
    element.appendChild(form); */
    
    
    // Elementos del Control HTML
    const button = document.createElement('button');
    button.type = 'button';

    const form = document.createElement('form');
    form.setAttribute('id', 'ol-search-form');
    const defaultFormClass = ['search-layer-input-search'];
    if (optOptions.collapsed) {
      defaultFormClass.push('search-layer-collapsed');
    }
    form.setAttribute('class', defaultFormClass.join(' '));

    // Crear los 3 selectores
    const selParroquia = document.createElement('select');
    const selVia = document.createElement('select');
    const selNumero = document.createElement('select');

    selParroquia.innerHTML = '<option value="">Parroquia...</option>';
    selParroquia.add(new Option("TODAS LAS PARROQUIAS", "TODAS"));

    selVia.innerHTML = '<option value="">Vía...</option>';
    selNumero.innerHTML = '<option value="">Nº...</option>';

    // =========================================================================
    // UNIFICACIÓN DE FUENTES Y ESTILOS PARA LOS DESPLEGABLES
    // =========================================================================
    const elementosSelect = [selParroquia, selVia, selNumero];
    elementosSelect.forEach(sel => {
      sel.style.fontFamily = 'inherit'; // Hereda la fuente de la página (ej: Arial, Roboto, system-ui...)
      sel.style.fontSize = '14px';      // Tamaño unificado y legible
      sel.style.padding = '4px';        // Un poco de espacio interno para que no queden comprimidos
      sel.style.marginRight = '4px';    // Separación sutil entre ellos si se muestran en línea
    });
    // =========================================================================

    form.appendChild(selParroquia);
    form.appendChild(selVia);
    form.appendChild(selNumero);
    
    // --- NUEVA BÚSQUEDA POR REFERENCIA CATASTRAL ---
    const inputRC = document.createElement('input');
    inputRC.type = 'text';
    inputRC.id = 'search-rc';
    inputRC.placeholder = 'Buscar Ref. Catastral...';
    
    // =========================================================================
    // UNIFICACIÓN DE FUENTE PARA LA CAJA DE TEXTO (RC)
    // =========================================================================
    inputRC.style.fontFamily = 'inherit'; // Hereda la misma fuente de la página
    inputRC.style.fontSize = '14px';      // Mismo tamaño que los selectores
    inputRC.style.padding = '5px';        // Consistencia visual en el relleno
    inputRC.style.boxSizing = 'border-box'; // Evita que el 100% de ancho desborde el formulario
    inputRC.style.width = '100%';
    inputRC.style.marginTop = '6px';
    // =========================================================================
    
    form.appendChild(inputRC);

    const element = document.createElement('div');
    element.className = 'search-layer ol-unselectable ol-control';
    element.appendChild(button);
    element.appendChild(form);
    

    // Inicializar clase base de OpenLayers
    super({
      element: element,
      target: options.target
    });

    this.map = map;
    this.tree = {}; 
    this.currentSortedList = [];
    let isRestoring = false; // <-- NUEVA BANDERA DE CONTROL

    // --- MOTOR HORSEY PARA REFERENCIA CATASTRAL ---
    const inicializarHorseyRC = () => {
      // Auto-detección inteligente del nombre de columna (REFCAT, refcat, Refcat...)
      let columnaCatastro = 'REFCAT';
      const features = source.getFeatures();
      if (features.length > 0) {
        const props = features[0].getProperties();
        const claves = Object.keys(props);
        const claveEncontrada = claves.find(k => k.toLowerCase() === 'refcat' || k.toLowerCase() === 'rc');
        if (claveEncontrada) columnaCatastro = claveEncontrada;
      }

      horsey(inputRC, {
        source: [{
          list: source.getFeatures().map((el, i) => {
            if (el.getId() === undefined) el.setId(i);
            const val = el.get(columnaCatastro) || '';
            return {
              text: val.toString().trim(), 
              value: el.getId()
            };
          }).filter(item => item.text !== '') 
        }],
        getText: 'text',
        getValue: 'value',
        limit: 5, 
        filter: function (query, selection) {
          if (query.length < 4) return false; // Mínimo 4 caracteres para arrancar
          return selection.text.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        },
        predictNextSearch: function(info) {
          const feat = source.getFeatureById(info.selection.value);
          if (feat && map) {
          	
          	selParroquia.value = '';
              selVia.innerHTML = '<option value="">Vía...</option>';
              selNumero.innerHTML = '<option value="">Nº...</option>';
          	
            const view = map.getView();
            view.fit(feat.getGeometry().getExtent(), {
              size: map.getSize(),
              maxZoom: 19 
            });
            
            select.getFeatures().clear();
            select.getFeatures().push(feat);
          }
        }
      });
    };

    // Lanzar Horsey cuando la capa esté lista
    if (source.getState() === 'ready') inicializarHorseyRC();
    source.on('change', () => {
      if (source.getState() === 'ready') inicializarHorseyRC();
    });

    // Mostrar/Ocultar panel
    const toggleHideShowInput = () => {
      if (hasClass(form, 'search-layer-collapsed')) {
        removeClass(form, 'search-layer-collapsed');
      } else {
        addClass(form, 'search-layer-collapsed');
      }
    };
    button.addEventListener('click', toggleHideShowInput, false);

    // --- LÓGICA DEL ÁRBOL JERÁRQUICO (PARROQUIAS Y VÍAS) ---
    //******************************************** MODIFICADO 03/07/2026
/*    const buildTree = () => {
      const features = source.getFeatures();
      this.tree = {};

      features.forEach(f => {
        const props = f.getProperties();
        const parroquia = props.EibCcl_Callejero_eibEntAgp || "Otras";
        const via = (props.EibCcl_Callejero_eibTipVia || "") + "/ " + (props.EibCcl_Callejero_eibNomVia || "Sin nombre");
        const numero = (props.ENA_N1_00 || "") + (props.ENA_L1_00 || "");

        if (!this.tree[parroquia]) this.tree[parroquia] = {};
        if (!this.tree[parroquia][via]) this.tree[parroquia][via] = [];
        
        this.tree[parroquia][via].push({
          num: numero || "S/N",
          feature: f
        });
      });

      selParroquia.innerHTML = '<option value="">Parroquia...</option>';
      selParroquia.add(new Option("TODAS LAS PARROQUIAS", "TODAS"));
      Object.keys(this.tree).sort().forEach(p => {
        selParroquia.add(new Option(p, p));
      });
    };*/
    //******************************************** MODIFICADO 03/07/2026

const buildTree = () => {
  const features = source.getFeatures();
  
  // Guardamos los valores y los índices seleccionados antes de borrar nada
  const parroquiaSeleccionada = selParroquia.value;
  const viaSeleccionada = selVia.value;
  const numeroSeleccionadoIndex = selNumero.value; 

  this.tree = {};

  features.forEach(f => {
    const props = f.getProperties();
    const parroquia = props.EibCcl_Callejero_eibEntAgp || "Otras";
    const via = (props.EibCcl_Callejero_eibTipVia || "") + "/ " + (props.EibCcl_Callejero_eibNomVia || "Sin nombre");
    const numero = (props.ENA_N1_00 || "") + (props.ENA_L1_00 || "");

    if (!this.tree[parroquia]) this.tree[parroquia] = {};
    if (!this.tree[parroquia][via]) this.tree[parroquia][via] = [];
    
    this.tree[parroquia][via].push({
      num: numero || "S/N",
      feature: f
    });
  });

  // Reconstruir Parroquias
  selParroquia.innerHTML = '<option value="">Parroquia...</option>';
  selParroquia.add(new Option("TODAS LAS PARROQUIAS", "TODAS"));
  Object.keys(this.tree).sort().forEach(p => {
    selParroquia.add(new Option(p, p));
  });

  // RESTAURACIÓN CONTROLADA
  if (parroquiaSeleccionada) {
    isRestoring = true; // Activamos la bandera para evitar bucles
    
    selParroquia.value = parroquiaSeleccionada;
    selParroquia.dispatchEvent(new Event('change')); // Dispara la carga de vías de forma nativa
    
    if (viaSeleccionada) {
      selVia.value = viaSeleccionada;
      selVia.dispatchEvent(new Event('change')); // Dispara la carga de números
      
      if (numeroSeleccionadoIndex !== "") {
        selNumero.value = numeroSeleccionadoIndex;
        // ¡Ojo! NO disparamos el onchange de selNumero aquí para no volver a encuadrar
        // ni alterar la feature que OpenLayers ya está seleccionando.
      }
    }
    
    isRestoring = false; // Desactivamos la bandera al terminar
  }
};







    if (source.getState() === 'ready') buildTree();
    source.on('change', () => {
      if (source.getState() === 'ready') buildTree();
    });

    // Eventos de interacción de los selectores
/*    selParroquia.onchange = () => {
    	inputRC.value = '';
      selVia.innerHTML = '<option value="">Vía...</option>';
      selNumero.innerHTML = '<option value="">Nº...</option>';
      
      const p = selParroquia.value;
      if (!p) return;

      let viasDisponibles = [];
      if (p === "TODAS") {
        Object.keys(this.tree).forEach(parroquiaKey => {
          Object.keys(this.tree[parroquiaKey]).forEach(viaKey => {
            if (!viasDisponibles.includes(viaKey)) {
              viasDisponibles.push(viaKey);
            }
          });
        });
      } else if (this.tree[p]) {
        viasDisponibles = Object.keys(this.tree[p]);
      }

      viasDisponibles.sort().forEach(v => {
        selVia.add(new Option(v, v));
      });
    };

    selVia.onchange = () => {
      selNumero.innerHTML = '<option value="">Nº...</option>';
      const p = selParroquia.value;
      const v = selVia.value;
      
      if (!v) return;

      let numerosAcumulados = [];
      if (p === "TODAS") {
        Object.keys(this.tree).forEach(parroquiaKey => {
          if (this.tree[parroquiaKey][v]) {
            numerosAcumulados = numerosAcumulados.concat(this.tree[parroquiaKey][v]);
          }
        });
      } else if (p && this.tree[p] && this.tree[p][v]) {
        numerosAcumulados = this.tree[p][v];
      }

      if (numerosAcumulados.length > 0) {
        const sortedNums = numerosAcumulados.sort((a, b) => 
          a.num.toString().localeCompare(b.num.toString(), undefined, {numeric: true})
        );
        
        this.currentSortedList = sortedNums; 
        sortedNums.forEach((item, index) => {
          selNumero.add(new Option(item.num, index));
        });
      }
    };*/

selParroquia.onchange = () => {
  // Si estamos restaurando el árbol automáticamente, no reseteamos los inputs
  if (!isRestoring) {
    inputRC.value = '';
    selVia.innerHTML = '<option value="">Vía...</option>';
    selNumero.innerHTML = '<option value="">Nº...</option>';
  }
  
  const p = selParroquia.value;
  if (!p) return;

  let viasDisponibles = [];
  if (p === "TODAS") {
    Object.keys(this.tree).forEach(parroquiaKey => {
      Object.keys(this.tree[parroquiaKey]).forEach(viaKey => {
        if (!viasDisponibles.includes(viaKey)) viasDisponibles.push(viaKey);
      });
    });
  } else if (this.tree[p]) {
    viasDisponibles = Object.keys(this.tree[p]);
  }

  viasDisponibles.sort().forEach(v => {
    selVia.add(new Option(v, v));
  });
};

selVia.onchange = () => {
  if (!isRestoring) {
    selNumero.innerHTML = '<option value="">Nº...</option>';
  }
  
  const p = selParroquia.value;
  const v = selVia.value;
  if (!v) return;

  let numerosAcumulados = [];
  if (p === "TODAS") {
    Object.keys(this.tree).forEach(parroquiaKey => {
      if (this.tree[parroquiaKey][v]) {
        numerosAcumulados = numerosAcumulados.concat(this.tree[parroquiaKey][v]);
      }
    });
  } else if (p && this.tree[p] && this.tree[p][v]) {
    numerosAcumulados = this.tree[p][v];
  }

  if (numerosAcumulados.length > 0) {
    const sortedNums = numerosAcumulados.sort((a, b) => 
      a.num.toString().localeCompare(b.num.toString(), undefined, {numeric: true})
    );
    
    this.currentSortedList = sortedNums; 
    sortedNums.forEach((item, index) => {
      selNumero.add(new Option(item.num, index));
    });
  }
};


    selNumero.onchange = () => {
      const idx = selNumero.value;
      if (idx !== "" && this.map) {
        const feature = this.currentSortedList[idx].feature; 
        const geom = feature.getGeometry();
        
        if (geom.getType() === 'Point') {
          this.map.getView().animate({
            center: geom.getCoordinates(),
            zoom: 19, 
            duration: 2000
          });
        } else {
          this.map.getView().fit(geom.getExtent(), { duration: 1000 });
        }

        select.getFeatures().clear();
        select.getFeatures().push(feature);
      }
    };
  }
}