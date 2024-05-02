var criterio = '';
var valorConsulta = '';
var apiUrl = '';
var categorias = [];
var ingredientes = [];
var areas = [];

document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('btn_click').addEventListener('click', function () {

        console.log(areas, categorias, ingredientes)

        valorConsulta = document.getElementById('valor_consulta').value
        console.log(valorConsulta, "- ", criterio)

        if (valorConsulta != '') {
            console.log('valorConsulta: ', valorConsulta)
        } else {
            alert('Ingrese un valor a consultar')
            return false;
        }

        if(criterio == 'Área'){
            var banArea = false
            areas.meals.forEach(Element => {
                if(valorConsulta.toUpperCase() == Element.strArea.toUpperCase()){
                    banArea = true
                }
            })

            if(!banArea){
                alert("La Área ingresada no se encuentra en la base de datos"); 
                document.getElementById('contenedor_platos_galeria').innerHTML = '';
                return false;
            }
        }

        
        if(criterio == 'Ingrediente principal'){
            var banIngrediente = false
            ingredientes.meals.forEach(Element => {
                if(valorConsulta.toUpperCase() == Element.strIngredient.toUpperCase()){
                    banIngrediente = true
                }
            })

            if(!banIngrediente){
                alert("El ingrediente no se encuetra en la base de datos"); 
                document.getElementById('contenedor_platos_galeria').innerHTML = '';
                return false;
            }
        }


        
        if(criterio == 'Categoría'){
            var banCategoria = false
            categorias.meals.forEach(Element => {
                if(valorConsulta.toUpperCase() == Element.strCategory.toUpperCase()){
                    banCategoria = true
                }
            })

            if(!banCategoria){
                alert("La categoría no se encuentra en la base de datos"); 
                document.getElementById('contenedor_platos_galeria').innerHTML = '';
                return false;
            }
        }

        if (criterio != '') {
            console.log('criterio: ', criterio)

            switch (criterio) {

                case 'Nombre':
                    apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${valorConsulta}`;
                    fetch(apiUrl)
                        .then(function (respuesta) {

                            if (!respuesta.ok) {
                                throw new Error('La respuesta de la red no fue exitosa');
                            }
                            return respuesta.json();
                        })
                        .then(function (datos) {
                            console.log('Datos recibidos:', datos);

                            if (datos.meals != null) {
                                if(datos.meals.length == 1){
                                    var urlProductos = 'https://lizzye20.github.io/RECETAS4/productos.html?nombre=' + encodeURIComponent(valorConsulta);
                                window.location.href = urlProductos;
                                }else{
                                    visualizarProductos(datos)
                                }

                            } else {
                                alert("No se ha encontrado el plato con los valores proporcionados")
                            }
                        })
                        .catch(function (error) {
                            console.log("Error en la ejecución")
                        });
                    break;

                case 'Ingrediente principal':
                    apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${valorConsulta}`;
                    fetch(apiUrl)
                        .then(function (respuesta) {

                            if (!respuesta.ok) {
                                throw new Error('La respuesta de la red no fue exitosa');
                            }
                            return respuesta.json();
                        })
                        .then(function (datos) {
                            console.log('Datos recibidos:', datos);
                            if (datos.meals != null) {
                                visualizarProductos(datos);
                            } else {
                                alert("No se ha encontrado el plato con los valores proporcionados")
                            }
                        })
                        .catch(function (error) {
                            console.log("Error consultando al API")
                        });
                    break;
                case 'Categoría':
                    apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${valorConsulta}`;
                    fetch(apiUrl)
                        .then(function (respuesta) {

                            if (!respuesta.ok) {
                                throw new Error('La respuesta de la red no fue exitosa');
                            }
                            return respuesta.json();
                        })
                        .then(function (datos) {
                            console.log('Datos recibidos:', datos);
                            if (datos.meals != null) {
                                visualizarProductos(datos);
                            } else {
                                alert("No se ha encontrado el plato con los valores proporcionados")
                            }
                        })
                        .catch(function (error) {
                            console.log("Error consultando al API")
                        });
                    break;

                case 'Área':
                    apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${valorConsulta}`;
                    fetch(apiUrl)
                        .then(function (respuesta) {

                            if (!respuesta.ok) {
                                throw new Error('La respuesta de la red no fue exitosa');
                            }
                            return respuesta.json();
                        })
                        .then(function (datos) {
                            console.log('Datos recibidos:', datos);
                            if (datos.meals != null) {
                                visualizarProductos(datos);
                            } else {
                                alert("No se ha encontrado el plato con los valores proporcionados")
                            }
                        })
                        .catch(function (error) {
                            console.log("Error consultando al API")
                        });
                    break;
            }
        } else {
            alert('Seleccione un criterio')
            return false;
        }

    })

    var inputCriterio = document.getElementById("criterio");

    inputCriterio.addEventListener("input", function (evento) {
        criterio = inputCriterio.value;
        console.log(criterio);
    });
    obtenerValores();
})


function obtenerValores(){
    var datos;
    fetch(`https://www.themealdb.com/api/json/v1/1/list.php?c=list`)
  .then(response => {
    if (!response.ok) {
      throw new Error('La solicitud no fue exitosa');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);

    categorias = data;
  })
  .catch(error => {
    console.error('Error al realizar la solicitud:', error);
  });

  fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
  .then(response => {
    if (!response.ok) {
      throw new Error('La solicitud no fue exitosa');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);

    ingredientes = data;
  })
  .catch(error => {
    console.error('Error al realizar la solicitud:', error);
  });

  fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
  .then(response => {
    if (!response.ok) {
      throw new Error('La solicitud no fue exitosa');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);

    areas = data;
  })
  .catch(error => {
    console.error('Error al realizar la solicitud:', error);
  });
}

function visualizarProductos(datos) {
    var contenedor = document.getElementById("contenedor_platos_galeria");
    contenedor.innerHTML = ''
    var nombre = '';
    console.log("rec en fn: ", datos)
    var iteraciones = (datos.meals.length <= 18) ? datos.meals.length - 1 : 17;
    for (var i = 0; i <= iteraciones; i++) {
        var nuevoDiv = document.createElement("button");

        nuevoDiv.classList.add('platos')
        var vIdentificador = datos.meals[i].strMeal.replaceAll(' ', '-')
        nombre = datos.meals[i].strMeal;
        nuevoDiv.id = `tarjeta_${vIdentificador}`
        nuevoDiv.innerHTML = `
        <h2 id="h2_${vIdentificador}">${datos.meals[i].strMeal}</h2>
        <img id="img_${vIdentificador}" style="height: 100px;" src="${datos.meals[i].strMealThumb}" alt="Texto alternativo de la imagen">`;
        console.log(nuevoDiv)

        nuevoDiv.addEventListener('click', function (evento) {
            console.log(evento.target.id)
            var vValorConsulta = evento.target.id.replaceAll('-', ' ').replace('tarjeta_', '').replace('h2_', '').replace('img_', '')
            var urlProductos2 = 'https://lizzye20.github.io/RECETAS4/productos.html?nombre=' + encodeURIComponent(vValorConsulta)
            console.log(i, ": ", urlProductos2)
            window.location.href = urlProductos2;
        })
        contenedor.appendChild(nuevoDiv);
    }
}
