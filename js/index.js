// Listado de provincias y ciudades de Argentina
const provincias = ['Buenos Aires', 'Córdoba', 'Santa Fe', 'Mendoza', 'Tucumán', 'Salta', 'Entre Ríos', 'Chaco', 'Formosa',
  'Misiones', 'Corrientes', 'Jujuy', 'La Rioja', 'Catamarca', 'Santiago del Estero', 'San Juan', 'San Luis',
  'Río Negro', 'Chubut', 'Neuquén', 'La Pampa', 'Santa Cruz', 'Tierra del Fuego'];
  const ciudades = [
    'Avellaneda',
    'Azul',
    'Bahía Blanca',
    'Bariloche',
    'Bell Ville',
    'Caleta Olivia',
    'Catamarca',
    'Chivilcoy',
    'Ciudad Autónoma de Buenos Aires',
    'Colón',
    'Comodoro Rivadavia',
    'Concepción del Uruguay',
    'Concordia',
    'Corrientes',
    'Cutral Có',
    'Córdoba',
    'Dolores',
    'El Bolsón',
    'El Calafate',
    'Esquel',
    'Formosa',
    'General Roca',
    'Goya',
    'Junín',
    'La Plata',
    'La Rioja',
    'Las Heras',
    'Libertador General San Martín',
    'Lomas de Zamora',
    'Luján',
    'Malargüe',
    'Mar del Plata',
    'Mendoza',
    'Mercedes',
    'Miramar',
    'Necochea',
    'Neuquén',
    'Olavarría',
    'Orán',
    'Paraná',
    'Paso de los Libres',
    'Pehuajó',
    'Pergamino',
    'Pinamar',
    'Posadas',
    'Puerto Iguazú',
    'Rafaela',
    'Rawson',
    'Reconquista',
    'Resistencia',
    'Rosario',
    'Río Cuarto',
    'Río Gallegos',
    'Río Grande',
    'Río Tercero',
    'Salta',
    'San Carlos de Bariloche',
    'San Fernando del Valle de Catamarca',
    'San Francisco',
    'San Francisco Solano',
    'San Juan',
    'San Luis',
    'San Martín de los Andes',
    'San Miguel de Tucumán',
    'San Nicolás',
    'San Pedro',
    'San Rafael',
    'Santa Cruz',
    'Santa Fe',
    'Santa Rosa',
    'Santiago del Estero',
    'Santo Tomé',
    'Tandil',
    'Tartagal',
    'Tigre',
    'Tilcara',
    'Trelew',
    'Ushuaia',
    'Venado Tuerto',
    'Villa Carlos Paz',
    'Villa Gesell',
    'Villa María',
    'Villa Mercedes',
    'Villa Regina',
    'Zapala'
  ];
  

// Obtener elementos del DOM
const provinciaSelect = document.getElementById('provincia');
const ciudadSelect = document.getElementById('ciudad');

// Rellenar selects de provincias y ciudades si están vacíos
if (provinciaSelect.options.length === 0) {
  provincias.forEach(provincia => {
    const option = document.createElement('option');
    option.value = provincia.toLowerCase();
    option.textContent = provincia;
    provinciaSelect.appendChild(option);
  });
}

if (ciudadSelect.options.length === 0) {
  ciudades.forEach(ciudad => {
    const option = document.createElement('option');
    option.value = ciudad.toLowerCase();
    option.textContent = ciudad;
    ciudadSelect.appendChild(option);
  });
}

// Validación de formato de teléfono
document.getElementById('telefono').addEventListener('input', function () {
  const pattern = /^[1-9][0-9]{2}[0-9]{6,7}$/;
  if (!pattern.test(this.value)) {
    this.setCustomValidity('Formato incorrecto. Use 3512016896');
  } else {
    this.setCustomValidity('');
  }
});

// Validación de email
document.getElementById('email').addEventListener('input', function () {
  const pattern = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
  if (!pattern.test(this.value)) {
    this.setCustomValidity('Ingrese un email válido.');
  } else {
    this.setCustomValidity('');
  }
});

// Validación del formulario
document.getElementById('presupuestoForm').addEventListener('submit', function (event) {
  const telefono = document.getElementById('telefono').value;
  const email = document.getElementById('email').value;

  if (!/^[1-9][0-9]{2}[0-9]{6,7}$/.test(telefono)) {
    alert('Formato de teléfono incorrecto');
    event.preventDefault();
  }

  if (!/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(email)) {
    alert('Formato de email incorrecto');
    event.preventDefault();
  }
});

// Manejo del popup modal para el formulario
document.getElementById("presupuestoForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Evita el envío estándar del formulario

  const formData = new FormData(this); // Recoge los datos del formulario

  fetch("procesar_formulario.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      const modal = document.getElementById("responseModal");
      const modalMessage = document.getElementById("modalMessage");

      if (data.success) {
        modalMessage.innerHTML = `<p>${data.message}</p>`;
        document.getElementById("presupuestoForm").reset(); // Limpia el formulario
      } else {
        modalMessage.innerHTML = `<p>${data.message}</p>`;
        if (data.errors) {
          modalMessage.innerHTML += `<ul>${data.errors
            .map((error) => `<li>${error}</li>`)
            .join("")}</ul>`;
        }
      }

      modal.style.display = "block"; // Muestra el modal
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

// Cierra el modal cuando el usuario hace clic en el botón "Cerrar"
document.getElementById("closeModal").addEventListener("click", function () {
  document.getElementById("responseModal").style.display = "none";
});


document.addEventListener("DOMContentLoaded", function() {
  // Mostrar el botón de WhatsApp con un retardo de 2 segundos
  setTimeout(function() {
    var whatsappButton = document.querySelector('.whatsapp-float');
    if (whatsappButton) {
      whatsappButton.style.display = "flex";
    }
  }, 2000); // 2000 milisegundos = 2 segundos
});

