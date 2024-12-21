// Listado de provincias y ciudades de Argentina
const provincias = ['Buenos Aires', 'Córdoba', 'Santa Fe', 'Mendoza', 'Tucumán', 'Salta', 'Entre Ríos', 'Chaco', 'Formosa'];
const ciudades = ['Córdoba', 'Rosario', 'La Plata', 'San Miguel de Tucumán', 'Mar del Plata', 'Salta', 'Santa Fe', 'Resistencia', 'Formosa'];

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
