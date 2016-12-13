window.onload = init;
var numeroOrden, numeroFolio, fechaRecepcionOrden, fechaEntregaOrden, nombreClienteOrden,
    telefonoClienteOrden, vehiculoOrden, productosUsadosString, serviciosUsadosInput, descripcionOrden,
    observacionesOrden, totalOrdenNueva, adelantoOrdenNueva, restanteOrdenNueva;
var table1Full, table2Full, table3Full, table4Full, table5Full, table6Full;
var inlineMediaStyle = null;
var todasLasOrdenes;
var editarOrdenTrabajo = false;

function init() {
    nombreTab = null;
    oldnombre = null;
    visibe_modal = null;
    mainTable = null;
    table1Full = false;
    table2Full = false;
    table3Full = false;
    table4Full = false;
    table5Full = false;
    table6Full = false;
    phpStrings = new Array();
    ulLista = document.getElementById("navbartop");
    //Datos modal ORDEN
    numeroOrden = document.getElementById("ordenNumeroOrden");
    numeroFolio = document.getElementById("ordenFolio");
    fechaRecepcionOrden = document.getElementById("fechaRecepcionOrden");
    fechaEntregaOrden = document.getElementById("fechaEntregaOrden");
    nombreClienteOrden = document.getElementById("ordenNombreCliente");
    telefonoClienteOrden = document.getElementById("ordenTelefonoCliente");
    vehiculoOrden = document.getElementById("ordenVehiculo");
    productosUsadosString = document.getElementById("productos_usados_input");
    serviciosUsadosInput = document.getElementById("servicios_usados_input");
    descripcionOrden = document.getElementById("ordenDescripcion");
    observacionesOrden = document.getElementById("ordenObservaciones");
    adelantoOrdenNueva = document.getElementById("adelantoOrdenNueva");
    restanteOrdenNueva = document.getElementById("restanteOrdenNueva");
    totalOrdenNueva = document.getElementById("totalOrdenNueva");
    totalOrdenNueva.onchange = function() {
        updateRestante();
    };
    adelantoOrdenNueva.onchange = function() {
        updateRestante();
    };
    productosUsadosString.onclick = function() {
        insertTableData(2);
    };
    serviciosUsadosInput.onclick = function() {
        insertTableData(3);
    };
    onClickLoad();
    image1 = document.getElementById("image1");
    document.getElementById("btnAceptarAgregar").onclick = function() {
        agregarProductoClick();
    };
    btnInventario = document.getElementById("btnInventarioNavBarTop");
    btnOrdenTrabajo = document.getElementById("btnOrdenNavBarTop");
    btnNotaGarantia = document.getElementById("btnNotaGNavBarTop");
    btnNotaVenta = document.getElementById("btnNotaVNavBarTop");
    document.getElementById("btnAceptarRemover").onclick = removerProductoClick;
    btnInventario.onclick = function() {
        openCity("manejoInventario");
    };
    btnOrdenTrabajo.onclick = function() {
        openCity("OrdenTrabajo");
    };
    btnNotaGarantia.onclick = function() {
        openCity("NotaGarantia");
    };
    btnNotaVenta.onclick = function() {
        openCity("NotaVenta");
    };
    btnAceptarEditar = document.getElementById("btnAceptarEditar");
    btnAceptarEditar.onclick = function() {
        editarProductoClick(i);
    };
    document.getElementById("btnCrearOrden").onclick = crearOrden;
    document.getElementById("btnAgregar").onclick = agregarBtnAgregarClick;
    document.getElementById("btnBorrarOrden").onclick = borrarOrden;
    document.getElementById("printBtn1").onclick = function() {
        print1();
    };
    document.getElementById("printBtn2").onclick = function() {
        print2();
    };
}
// Print Nota de Garantia
function print1() {
    var head = document.getElementsByTagName('head')[0];
    var newStyle = document.createElement('style');
    newStyle.setAttribute('type', 'text/css');
    newStyle.setAttribute('media', 'print');
    newStyle.appendChild(document.createTextNode('@page { margin-top: 0; }#header, #myFooter, #topNav,#printOrdenTrabajo,#NotaGarantia{display: none !important; } #printDiv{ display: block !important;}'));
    if (inlineMediaStyle != null) {
        head.replaceChild(newStyle, inlineMediaStyle)
    } else {
        head.appendChild(newStyle);
    }
    inlineMediaStyle = newStyle;
    window.print();


}
//Print Orden de trabajo
function print2() {
    var head = document.getElementsByTagName('head')[0];
    var newStyle = document.createElement('style');
    newStyle.setAttribute('type', 'text/css');
    newStyle.setAttribute('media', 'print');
    newStyle.appendChild(document.createTextNode('@page { margin-top: 0; }#header, #myFooter, #topNav,#printNotaGarantia,#OrdenTrabajo{display: none !important; } #printDiv{ display: block !important;}'));
    if (inlineMediaStyle != null) {
        head.replaceChild(newStyle, inlineMediaStyle)
    } else {
        head.appendChild(newStyle);
    }
    inlineMediaStyle = newStyle;
    window.print();
}

function crearOrden() {
    arregloServicios = new Array();
    arregloProductos = new Array();
    indexServicios = 0;
    indexProductos = 0;
    visibe_modal = document.getElementById("crearOrdenTrabajo");
    visibe_modal.style.display = "block";
    fechaRecepcionOrden.valueAsDate = new Date();
    numeroOrden.value = "";
    numeroFolio.value = "";
    fechaEntregaOrden.value = "";
    nombreClienteOrden.value = "";
    telefonoClienteOrden.value = "";
    vehiculoOrden.value = "";
    productosUsadosString.value = "";
    serviciosUsadosInput.value = "";
    descripcionOrden.value = "";
    observacionesOrden.value = "";
    adelantoOrdenNueva.value = "";
    restanteOrdenNueva.value = "";
    totalOrdenNueva.value = "";
    document.getElementById("btnBorrarOrden").style.display = "none";
    document.getElementById("btnGuardarOrden").onclick = function() {
        agregarOrdenClick();
        // guardarOrden();
    };

}

function insertTableData(index) {
    var request = new XMLHttpRequest();
    phpStrings = ["readProductos.php", "readProductos.php", "readServicios.php", "readOrdenes.php", "readOrdenes.php", "readOrdenes.php"];
    if (index == 1) {
        mainTable = document.getElementById("mytable");

    }
    if (index == 2) {
        document.getElementById("productos_usar_modal").style.display = "block";
        //document.getElementById("search2").value = "";
        //myFunction(2);
        mainTable = document.getElementById("mytable2");
    }
    if (index == 3) {
        document.getElementById("servicios_usar_modal").style.display = "block";
        //document.getElementById("search3").value = "";
        //myFunction(3);
        mainTable = document.getElementById("mytable3");
    }
    if (index == 4) {
        document.getElementById("search4").value = "";
        myFunction(4);
        mainTable = document.getElementById("mytable4");
    }
    if (index == 5) {
        // NOTA DE VENTA
        document.getElementById("search5").value = "";
        myFunction(5);
        mainTable = document.getElementById("mytable5");
    }
    if (index == 6) {
        // NOTA DE GARANTIA
        document.getElementById("search6").value = "";
        myFunction(6);
        mainTable = document.getElementById("mytable6");
    }
    request.open("GET", "http://is2016.atwebpages.com/moflesyradiadores/" + phpStrings[index - 1]);
    request.onload = function() {
        if (index == 1 && (!table1Full)) {
            llenarTable(request.responseText, index);
            table1Full = true;
        }
        if (index == 2 && (!table2Full)) {
            llenarTable(request.responseText, index);
            table2Full = true;
        }
        if (index == 3 && (!table3Full)) {
            llenarTable(request.responseText, index);
            table3Full = true;
        }
        if (index == 4 && (!table4Full)) {
            llenarTable(request.responseText, index);
            table4Full = true;
        }
        if (index == 5 && (!table5Full)) {
            //NOTA VENTA
            llenarTable(request.responseText, index);
            table5Full = true;
        }
        if (index == 6 && (!table6Full)) {
            //NOTA GARANTIA
            llenarTable(request.responseText, index);
            table6Full = true;
        }
    };
    request.send(null);
}

function fillServicios() {

    document.getElementById("servicios_usados_input").value = arregloServicios.toString();
    document.getElementById('servicios_usar_modal').style.display = 'none';
}

function fillProductos() {

    document.getElementById("productos_usados_input").value = arregloProductos.toString();
    document.getElementById('productos_usar_modal').style.display = 'none';
}

function llenarTable(request, index) {
    var productos = JSON.parse(request);
    for (var i = productos.data.length - 1; i >= 0; i--) {

        if (index == 1) {
            //INVENTARIO
            var row = mainTable.insertRow(-1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            var cell5 = row.insertCell(4);

            cell1.innerHTML = productos.data[i].Nombre;
            cell2.innerHTML = productos.data[i].Cantidad;
            cell3.innerHTML = productos.data[i].Fecha;
            cell4.innerHTML = "<a href='javascript:handleClick(2," + request + "," + i + ")'><img class='removerIcon'src='resources/imgs/iconoRemover.png'></a>";
            cell5.innerHTML = "<a href='javascript:handleClick(3," + request + "," + i + ")'><img class='removerIcon'src='resources/imgs/iconoEditar.png'></a>";

        }
        if (index == 2) {
            //PRODUCTOS
            document.getElementById("btn_aceptar_productos_usar").onclick = function() {
                fillProductos();
            };
            var row = mainTable.insertRow(-1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            cell1.innerHTML = "<input type='checkbox' name='producto' value='usar' onclick = 'productoEscojido(" + request + "," + i + ")'>";
            cell2.innerHTML = productos.data[i].Nombre;
            cell3.innerHTML = productos.data[i].Cantidad;
            cell4.innerHTML = "<input id='cantidadProductoAgregar' type='number' class='w3-input table2Input' min='1' onchange = ' ' >";

        }
        if (index == 3) {
            //SERVICIOS
            document.getElementById("btn_aceptar_servicios_usar").onclick = function() {
                fillServicios();
            };
            var row = mainTable.insertRow(-1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            cell1.innerHTML = "<input type='checkbox' name='servicio' value='usar' onclick = 'servicioEscojido(" + request + "," + i + ")' >";
            cell2.innerHTML = productos.data[i].nombre;
            cell3.innerHTML = productos.data[i].meses;
        }
        if (index == 4) {
            //ORDEN DE TRABAJO
            var row = mainTable.insertRow(-1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            var cell5 = row.insertCell(4);
            cell1.innerHTML = productos.data[i].NombreCliente;
            cell2.innerHTML = productos.data[i].FechaRecepcion;
            cell3.innerHTML = productos.data[i].FechaEntrega;
            cell4.innerHTML = "<a href='javascript:handleClick(4," + request + "," + i + ")'><span class='glyphicon glyphicon-edit' aria-hidden='true'></span></a>";
            cell5.innerHTML = "<a href='javascript:handleClick(5," + request + "," + i + ")'><span class='glyphicon glyphicon-print' aria-hidden='true'></span></a>";
        }
        //NOTA DE VENTA
        if (index == 5) {
            var row = mainTable.insertRow(-1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            cell1.innerHTML = "<input type='checkbox' onclick= ''>";
            cell2.innerHTML = productos.data[i].NombreCliente;
            cell3.innerHTML = productos.data[i].FechaRecepcion;
            cell4.innerHTML = productos.data[i].FechaEntrega;
        }
        //NOTA DE GARANTIA
        if (index == 6) {
            var row = mainTable.insertRow(-1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            cell1.innerHTML = productos.data[i].NombreCliente;
            cell2.innerHTML = productos.data[i].FechaRecepcion;
            cell3.innerHTML = productos.data[i].FechaEntrega;
            // TODO: Check handleClick, send diff num than 4
            cell4.innerHTML = "<a href='javascript:handleClick(6," + request + "," + i + ")'><span class='glyphicon glyphicon-print' aria-hidden='true'></span></a>";
        }
    }
}
function myFunction(index) {
    var input,
        filter,
        table,
        tr,
        td,
        i,
        x; //conlum to search in
    if (index == 1) {

        input = document.getElementById("search1");
        table = document.getElementById("mytable");
        x = 0;
    }
    if (index == 2) {
        //input = document.getElementById("search2"); //2
        table = document.getElementById("mytable2");
        x = 1;
    }
    if (index == 3) {
        //input = document.getElementById("search3"); //3
        table = document.getElementById("mytable3");
        x = 1;
    }
    if (index == 4) {
        input = document.getElementById("search4"); //4
        table = document.getElementById("mytable4");
        x = 0;
    }
    if (index == 5) {
        //NOTA DE VENTA
        input = document.getElementById("search5");
        table = document.getElementById("mytable5");
        x = 1;
    }
    if (index == 6) {
        //NOTA GARANTIA
        input = document.getElementById("search6");
        table = document.getElementById("mytable6");
        x = 0;
    }

    filter = input.value.toUpperCase();

    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[x];
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}


function servicioEscojido(servicios, i) {
    var flag = false;

    for (var x = 0; x < arregloServicios.length; x++) {
        if (arregloServicios[x] == servicios.data[i].nombre) {
            arregloServicios.splice(x, 1);
            var nArray = new Array();
            flag = true;
            indexServicios--;
        }
    }
    if (!flag) {
        arregloServicios[indexServicios++] = servicios.data[i].nombre;
    }
}

function productoEscojido(productos, i) {

    var flag = false;
    for (var x = 0; x < arregloProductos.length; x++) {
        if (arregloProductos[x] == productos.data[i].Nombre) {
            arregloProductos.splice(x, 1);
            flag = true;
            indexProductos--;
        }
    }
    if (!flag) {
        arregloProductos[indexProductos++] = productos.data[i].Nombre;
    }
}

function updateRestante() {
    var restante = document.getElementById("restanteOrdenNueva");
    var totalOrdenNueva = document.getElementById("totalOrdenNueva");
    var adelanto = document.getElementById("adelantoOrdenNueva");

    if (Number(adelanto.value) > Number(totalOrdenNueva.value)) {
        adelanto.value = Number(totalOrdenNueva.value);
    }
    restante.value = Number(totalOrdenNueva.value) - Number(adelanto.value);
    adelanto.setAttribute("max", totalOrdenNueva.value);
}

function handleClick(num, request, i) {
    if (num == 1) {
        if (i === 0) {
            document.getElementById("AlertBox").style.display = "none";
        }
        document.getElementById("id01").style.display = "block";
        document.getElementById("cantidadProductoAgregar").value = "";
        oldnombre = document.getElementById("nombreProductoAgregar").value;

        document.getElementById("nombreProductoAgregar").value = "";
    }
    if (num == 2) {
        document.getElementById("removerProducto").style.display = "block";
        document.getElementById("nomProductoRemover").innerHTML = request.data[i].Nombre;
        document.getElementById("canProductoRemover").innerHTML = request.data[i].Cantidad;
        document.getElementById("btnAceptarRemover").onclick = removerProductoClick;
    }
    if (num == 3) {
        beforeEditName = request.data[i].Nombre;
        beforeEditCantidad = request.data[i].Cantidad;
        document.getElementById("editarProducto").style.display = "block";
        document.getElementById("nombreProductoEditar").setAttribute("value", request.data[i].Nombre);
        oldnombre = document.getElementById("nombreProductoEditar").value;
        document.getElementById("cantidadProductoEditar").setAttribute("value", request.data[i].Cantidad);
        document.getElementById("cantidadMasEditar").value = 0;
    }
    // Editar Orden de trabajo
    if (num == 4) {
        if (i === 0) {
            document.getElementById("AlertBox").style.display = "none";
        }
        editarOrdenTrabajo = true;
        var oldnom = request.data[i].NombreCliente;
        var oldtel = request.data[i].TelCliente;
        arregloServicios = new Array();
        arregloProductos = new Array();
        indexServicios = 0;
        indexProductos = 0;
        document.getElementById("ordenNumeroOrden").value = request.data[i].NumOrden;
        document.getElementById("fechaRecepcionOrden").value = request.data[i].FechaRecepcion;
        document.getElementById("ordenFolio").value = request.data[i].Folio;
        document.getElementById("fechaEntregaOrden").value = request.data[i].FechaEntrega;
        document.getElementById("ordenNombreCliente").value = request.data[i].NombreCliente;
        document.getElementById("ordenTelefonoCliente").value = request.data[i].TelCliente;
        document.getElementById("ordenVehiculo").value = request.data[i].Vehiculo;
        document.getElementById("ordenTelefonoCliente").value = request.data[i].TelCliente;
        document.getElementById("servicios_usados_input").value = request.data[i].Servicios;
        document.getElementById("productos_usados_input").value = request.data[i].Productos;
        document.getElementById("servicios_usados_input").value = request.data[i].Servicios;
        document.getElementById("ordenDescripcion").value = request.data[i].Descripcion;
        document.getElementById("ordenObservaciones").value = request.data[i].Observaciones;
        document.getElementById("adelantoOrdenNueva").value = request.data[i].Adelanto;
        document.getElementById("restanteOrdenNueva").value = request.data[i].Restante;
        document.getElementById("totalOrdenNueva").value = request.data[i].Total;
        document.getElementById("btnBorrarOrden").style.display = "block";
        visibe_modal = document.getElementById("crearOrdenTrabajo");
        document.getElementById("btnGuardarOrden").onclick = function() {
            editarOrden(oldnom, oldtel);
            // agregarOrdenClick();
            // guardarOrden();
        };
        visibe_modal.style.display = "block";
    }
    // Imprimir Orden de trabajo
    if (num == 5) {

        document.getElementById("printNumeroOrden").value = request.data[i].NumOrden;
        document.getElementById("printNumeroFolio").value = request.data[i].Folio;
        document.getElementById("printNomCliente").value = request.data[i].NombreCliente;
        document.getElementById("printTelCliente").value = request.data[i].TelCliente;
        document.getElementById("printVehiculo").value = request.data[i].Vehiculo;
        document.getElementById("printServicios").value = request.data[i].Servicios;
        document.getElementById("printFechaRecepcion").value = request.data[i].FechaRecepcion;
        document.getElementById("printFechaEntrega").value = request.data[i].FechaEntrega;
        document.getElementById("printDescripcionOrden").value = request.data[i].Descripcion;
        document.getElementById("printObservaciones").value = request.data[i].Observaciones;
        document.getElementById("printTotalOrden").value = request.data[i].Total;
        document.getElementById("printAdelanto").value = request.data[i].Adelanto;
        document.getElementById("printRestante").value = request.data[i].Restante;
        print2();
    }
    //MOSTRAR MODAL PARA IMPRIMIR NOTA DE GARANTIA
    if (num == 6) {

        document.getElementById("print_garantia_modal").style.display = "block";
        document.getElementById("nombrePrintGarantia").value = request.data[i].NombreCliente;
        document.getElementById("vehiculoPrintGarantia").value = request.data[i].Vehiculo;
        document.getElementById("totalPrintGarantia").value = request.data[i].Total;
        document.getElementById("notaPrintGarantia").value = request.data[i].Observaciones;
        document.getElementById("printProductosGarantia").value = request.data[i].Productos;
        document.getElementById("printServiciosGarantia").value = request.data[i].Servicios;
        var servicios = request.data[i].Servicios.split(",");
        var meses = new Array();
        var productos = request.data[i].Productos.split(",");
        var table = document.getElementById("tableServicioPrintsGarantia");
        var table2 = document.getElementById("tableProductosPrintGarantia");
        var length1 = table.rows.length;
        var length2 = table2.rows.length;
        if (length1 > 1) {
            for (var i = 1; i < length1; i++) {
                table.deleteRow(1);

            }
        }
        if (length2 > 1) {
            for (var i = 1; i < length2; i++) {
                table2.deleteRow(1);

            }
        }
        var request = new XMLHttpRequest();
        request.open("GET", "http://is2016.atwebpages.com/moflesyradiadores/readServicios.php");
        request.onload = function() {
            var mimo = JSON.parse(request.responseText);
            for (var i = 0; i < servicios.length; i++) {
                var row = table.insertRow(-1);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);

                cell1.innerHTML ="<input type='checkbox' onclick= '' checked = 'true'>"
                cell2.innerHTML = servicios[i];
                for (var y = 0; y < mimo.data.length; y++) {


                    if (servicios[i] == mimo.data[y].nombre) {
                        cell3.innerHTML = mimo.data[y].meses;
                        y = mimo.data.length;
                    }
                }
            }
        };
        request.send(null);

        for (var i = 0; i < productos.length; i++) {
            var row = table2.insertRow(-1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);

            cell1.innerHTML = "<input type='checkbox' onclick= '' checked ='true'>"
            cell2.innerHTML = productos[i];
        }

        document.getElementById("btn_aceptar_print_garantia").onclick = function () {
            document.getElementById("printNombre").value = document.getElementById("nombrePrintGarantia").value;
            document.getElementById("printVehiculoGarantia").value = document.getElementById("vehiculoPrintGarantia").value;
            document.getElementById("printTotalGarantia").value = document.getElementById("totalPrintGarantia").value;
            document.getElementById("printNota").value = document.getElementById("notaPrintGarantia").value;
            // document.getElementById("printProductosGarantia").value = request.data[i].Productos;
            // document.getElementById("printServiciosGarantia").value = request.data[i].Servicios;
            var sum=0;
            for(var i = 1;i < table.rows.length;i++){
                console.log(table.rows[i].cells[2].innerHTML);
                sum +=Number(table.rows[i].cells[2].innerHTML);
            }
            document.getElementById("printMesesGarantia").value = sum;
            // for(var i = 1;i < table2.rows.length;i++){
            //     console.log(table.rows[i].cells[0].innerHTML);
            // }
            document.getElementById("print_garantia_modal").style.display = "none";
            print1();
        };

        // document.getElementById("nombrePrintGarantia").value = request.data[i].NombreCliente;
    }

}

function borrarOrden() {

    var request = new XMLHttpRequest();
    // TODO: create deleteOrdenTrabajo.php
    var mystring = "http://is2016.atwebpages.com/moflesyradiadores/removeOrdenTrabajo.php?nombre=" + nombreClienteOrden.value +
        "&telefono=" + telefonoClienteOrden.value;
    request.open("GET", "http://is2016.atwebpages.com/moflesyradiadores/removeOrdenTrabajo.php?nombre=" + nombreClienteOrden.value +
        "&telefono=" + telefonoClienteOrden.value
    );
    request.onload = function() {
        //location.reload();
        if (request.responseText)
            location.reload();
    };
    request.send(null);
}

function editarOrden(oldnom, oldtel) {

    var request = new XMLHttpRequest();
    // TODO: create editOrdenTrabajo.php
    request.open("GET", "http://is2016.atwebpages.com/moflesyradiadores/editOrdenTrabajo.php?fechaEntrega=" + fechaEntregaOrden.value +
        "&nombre=" + nombreClienteOrden.value +
        "&telefono=" + telefonoClienteOrden.value +
        "&vehiculo=" + vehiculoOrden.value +
        "&servicios=" + serviciosUsadosInput.value +
        "&productos=" + productosUsadosString.value +
        "&descripcion=" + descripcionOrden.value +
        "&observaciones=" + observacionesOrden.value +
        "&adelanto=" + adelantoOrdenNueva.value +
        "&restante=" + restanteOrdenNueva.value +
        "&total=" + totalOrdenNueva.value +
        "&oldnom=" + oldnom +
        "&oldtel=" + oldtel);
    request.onload = function() {
        if (request.responseText)
            location.reload();
        //todasLasOrdenes = request.responseText;
        //showAlertAgregado(request.responseText, 1);
    };
    request.send(null);

}

function agregarOrdenClick() {

    var num_orden = numeroOrden.value;
    var folio = numeroFolio.value;
    var fecha_recepcion = fechaRecepcionOrden.value;
    var fecha_entrega = fechaEntregaOrden.value;
    var nom_cliente = nombreClienteOrden.value;
    var tel_cliente = telefonoClienteOrden.value;
    var vehiculo = vehiculoOrden.value;
    var servicios = serviciosUsadosInput.value;
    var productos = productosUsadosString.value;
    var descripcion = descripcionOrden.value;
    var observaciones = observacionesOrden.value;
    var adelanto = adelantoOrdenNueva.value;
    var restante = restanteOrdenNueva.value;
    var total = totalOrdenNueva.value;
    var request = new XMLHttpRequest();

    request.open("GET", "http://is2016.atwebpages.com/moflesyradiadores/addOrdenTrabajo.php?num_orden=" + num_orden +
        "&folio=" + folio +
        "&fechaEntrega=" + fecha_entrega +
        "&nombre=" + nom_cliente +
        "&telefono=" + tel_cliente +
        "&vehiculo=" + vehiculo +
        "&servicios=" + servicios +
        "&productos=" + productos +
        "&observaciones=" + observaciones +
        "&descripcion=" + descripcion +
        "&adelanto=" + adelanto +
        "&restante=" + restante +
        "&total=" + total);
    request.onload = function() {
        //location.reload();
        todasLasOrdenes = request.responseText;
        showAlertAgregado(request.responseText, 1);
    };
    request.send(null);

}



function onClickSave() {
    localStorage.setItem("posicionTab", JSON.stringify(nombreTab));
    //localstorage.setItem("ordenes",JSON.stringify(nombreTab));
}

function onClickLoad() {

    nombreTab = JSON.parse(localStorage.getItem("posicionTab"));
    if (nombreTab) {
        openCity(nombreTab);
    } else {
        nombreTab = "manejoInventario";
        openCity("manejoInventario");
    }
}

function openCity(cityName) {

    var x = document.getElementsByClassName("city"),
        i;
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    document.getElementById(cityName).style.display = "block";
    if (cityName == "manejoInventario") {
        changeNavBarColors(1);
        insertTableData(1);
    }
    if (cityName == "OrdenTrabajo") {
        changeNavBarColors(2);
        insertTableData(4);
    }
    if (cityName == "NotaGarantia") {
        changeNavBarColors(3);
        insertTableData(6);
    }
    if (cityName == "NotaVenta") {
        changeNavBarColors(4);
        insertTableData(5);
    }
    nombreTab = cityName;
    onClickSave();
}

function changeNavBarColors(indexA) {
    var lista = document.getElementById("navbartop");
    var nodelist = lista.getElementsByClassName("child");
    for (i = 1; i < 5; i++) {
        if (i != indexA) {
            if (nodelist[i].className.indexOf("w3-theme") == -1) {
                nodelist[i].className += " w3-theme";
            }
            nodelist[i].className = nodelist[i].className.replace(" w3-theme-l1", "");
        } else {
            nodelist[indexA].className = nodelist[indexA].className.replace(" w3-theme", "");
            nodelist[indexA].className += " w3-theme-l1";
        }
    }
}


function removerProductoClick() {
    var nomRemover = document.getElementById("nomProductoRemover").innerHTML;
    var request = new XMLHttpRequest();

    request.open("GET", "http://is2016.atwebpages.com/moflesyradiadores/removeProducto.php?nombre=" + nomRemover);
    request.onload = function() {
        document.getElementById("removerProducto").style.display = "none";
        location.reload();
    };
    request.send(null);
}

function editarProductoClick(id) {
    console.log("editar Producto Click");
    var newnombre = document.getElementById("nombreProductoEditar").value;
    var newcantidad = document.getElementById("cantidadProductoEditar").value;
    var cantidadMas = document.getElementById("cantidadMasEditar").value;
    console.log(cantidadMas);
    console.log(newcantidad);
    console.log(newnombre);
    newcantidad = Number(newcantidad) + Number(cantidadMas);
    console.log(newcantidad);
    if (newnombre != beforeEditName || cantidadMas != 0) {
        var request = new XMLHttpRequest();
        request.open("GET", "http://is2016.atwebpages.com/moflesyradiadores/editProducto.php?nombre=" + oldnombre + "&newnombre=" + newnombre + "&cantidad=" + newcantidad);
        request.onload = function() {
            console.log(request.responseText);
            location.reload();
        };
        request.send(null);

    }

}

function agregarProductoClick() {

    var nombre = document.getElementById("nombreProductoAgregar");
    var cantidad = document.getElementById("cantidadProductoAgregar").value;
    var request = new XMLHttpRequest();
    if (cantidad > 0) {
        request.open("GET", "http://is2016.atwebpages.com/moflesyradiadores/addProducto.php?nombre=" + nombre.value + "&cantidad=" + cantidad);
        request.onload = function() {
            //location.reload();
            showAlertAgregado(request.responseText, 0);
        };
        request.send(null);
    } else {
        alert("La cantidad debe ser mayor a 0");
    }
}

function agregarBtnAgregarClick() {

    document.getElementById("id01").style.display = "block";
    document.getElementById("nombreProductoAgregar").value = "";
    document.getElementById("cantidadProductoAgregar").value = "";
}

function showAlertAgregado(request, i) {
    if (request) {

        if (i == 1) {
            document.getElementById("crearOrdenTrabajo").style.display = "none";
        } else {
            document.getElementById("id01").style.display = "none";
        }
        document.getElementById("AlertBox").style.display = "block";
        document.getElementById("btnAlert1").onclick = function() {
            if (i == 1) {
                handleClick(4, "", 0);
            } else {
                handleClick(1, "", 0);
            }

        };
    }
}
