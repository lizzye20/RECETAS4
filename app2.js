document.addEventListener('DOMContentLoaded', function(){
    var urlParams = new URLSearchParams(window.location.search);
    var nombre = urlParams.get('nombre');
    valorConsulta = urlParams.get('consulta');
    criterio = urlParams.get('criterio');
    console.log("Nombre recibido: ", nombre)
    apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${nombre}`;
    fetch(apiUrl)
    .then(function(response) {
        if (!response.ok) {
            throw new Error('La respuesta de la red no fue exitosa');
        }
        return response.json();
    })
    .then(function(data) {
        console.log('Datos recibidos:', data);
        if(data.meals != null){
            var contenedor = document.getElementById("container_platos");
            var nuevoDiv = document.createElement("div");
            var ingredientesConcatenados = "";
            for (var i = 1; i <= 20; i++) {
                var atributo = "strIngredient" + i;
                if (data.meals[0].hasOwnProperty(atributo)) {
                    if(data.meals[0][atributo] != null && data.meals[0][atributo] != '') ingredientesConcatenados += data.meals[0][atributo] + ", ";
                } 
            }
            ingredientesConcatenados = ingredientesConcatenados.slice(0, -2);
            console.log("Ingredientes concatenados:", ingredientesConcatenados);
            nuevoDiv.classList.add('platos');
            nuevoDiv.innerHTML = `
            <div>
            <h2>${data.meals[0].strMeal}</h2>
            <img id="imagen_plato" style="height: 300px; cursor: pointer;" src="${data.meals[0].strMealThumb}" alt="${data.meals[0].strMeal}">
            </div>
            <div id="detalles_plato">
                <p>Ingredientes: </p> <p>${ingredientesConcatenados}</p>
                <p>Instrucciones: </p> <p>${data.meals[0].strInstructions}</p>
                <p>Etiquetas: </p> <p>${data.meals[0].strTags}</p>
            </div>`;
            contenedor.appendChild(nuevoDiv);
            
            // Añadir evento de clic a la imagen para mostrar detalles
            var imagenPlato = document.getElementById('imagen_plato');
            var detallesPlato = document.getElementById('detalles_plato');
            imagenPlato.addEventListener('click', function(){
                detallesPlato.style.display = detallesPlato.style.display === 'none' ? 'block' : 'none';
            });
        }else{
            alert("No se ha encontrado el plato con los valores proporcionados");
        }
    })
    .catch(function(error) {
        console.log("Error en la ejecución");
    });
                
    document.getElementById('btn_home').addEventListener('click', function(){
        window.location.href = 'https://lizzye20.github.io/RECETAS4/index.html?';
    });
});
