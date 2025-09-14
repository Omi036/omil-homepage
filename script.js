// Funcionalidad de navegación
const navItems = document.querySelectorAll(".nav-item");
const sections = document.querySelectorAll(".section");

const timer = document.querySelector(".timer");
const dater = document.querySelector(".dater");

function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
}


navItems.forEach((item) => {
    item.addEventListener("click", () => {
        // Remover clase activa de todos los items
        navItems.forEach((nav) => nav.classList.remove("active"));
        // Agregar clase activa al item clickeado
        item.classList.add("active");

        const sectionName = item.getAttribute("data-section");

        // Mostrar/ocultar secciones
        if (sectionName === "todos") {
            sections.forEach((section) => (section.style.display = "block"));
        } else {
            sections.forEach((section) => {
                if (section.id === `section-${sectionName}`) {
                    section.style.display = "block";
                } else {
                    section.style.display = "none";
                }
            });
        }
    });
});

// Funcionalidad de búsqueda en Google
function performGoogleSearch(event) {
    event.preventDefault();
    const searchTerm = document
        .getElementById("googleSearchInput")
        .value.trim();
    if (searchTerm) {
        const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(
            searchTerm
        )}`;
        window.open(googleUrl, "_blank");
        // Limpiar el campo de búsqueda después de buscar
        document.getElementById("googleSearchInput").value = "";
    }
}

// Permitir búsqueda con Enter
document.getElementById("googleSearchInput").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        performGoogleSearch(e);
    }
});

document.addEventListener("keypress", (e) => {
    if(e.target.tagName == 'INPUT' || e.target.tagName == 'TEXTAREA') return
    const number = parseInt(e.key);

    if(isNaN(number)) return

    if(navItems[number - 1]) {
        navItems[number - 1].click()
    } else if (number == 0) {
        navItems[0].click()
    } else {
        navItems[navItems.length - 1].click()
    }
})


function openApp(url) {
    const win = window.open(url); 
    if (win) {
        // algunos navegadores devuelven la pestaña residual
        setTimeout(() => {
            try { win.close(); } catch(e) {}
        }, 200);
    }
}

// update timer.innerText every minute
setInterval(() => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    timer.innerText = `${hours}:${minutes}`;
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dater.innerText = now.toLocaleDateString('es-ES', options);
}, 60000);

// set initial time
{
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    timer.innerText = `${hours}:${minutes}`;
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dater.innerText = toTitleCase(now.toLocaleDateString('es-ES', options));
}