var mainMD = document.getElementById("mainMD");
var active = false;
var mouseOnMenu = false;

function mouseStatus(n) {
  mouseOnMenu = n;
}

// Menu klappt aus, wenn Elemente per Tap fokusiert werden... (Aufruf der Funktion)
Array.from(document.getElementsByClassName("focusable")).forEach(function(element) {
  element.addEventListener('focus', showMenu);
});

// Menu klappt aus bei Klick auf Menu-Item (Aufruf der Funktion)
document.getElementById('mainM').addEventListener('click', showMenu);

// Menu wird sichtbar
function showMenu() {
  active = true;
  mainMD.classList.add("showMenu");
  document.body.addEventListener("scroll", function() {
    if (!mouseOnMenu) hideMenu();

  });
  document.getElementById('main').addEventListener('click', hideMenu);
  var menuItems = document.getElementById('mainMD').getElementsByTagName("li");
  for (var i = 0; i < menuItems.length; i++) {
    // console.log('Registrate ClickListener'); // Check als Consolen-Log
    menuItems[i].addEventListener('click', function() {
      hideMenu();
      // loadAnimation(); // Backup falls beforeunload nicht funktioniert
    });
  }
}


// Falls eine neue Seite geladen wird... soll die Ladeanimation abgespielt werden...
window.addEventListener('beforeunload', loadAnimation);

// Für die Ladeanimation
function loadAnimation() {
  // Drehender Kreis
  document.body.insertAdjacentHTML('afterbegin', '<div id="loader"><div></div></div>');
  // alter Seiteninhalt wird s/w
  document.getElementById('main').style.filter = "grayscale(100%)";
}

// Menu wird unsichtbar
function hideMenu() {
  if (active) {
    mainMD.classList.remove("showMenu");
    active = false;
    document.removeEventListener("scroll", hideMenu);
    document.getElementById('main').removeEventListener('click', hideMenu);

  }
}
