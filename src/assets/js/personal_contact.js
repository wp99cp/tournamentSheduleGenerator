var portraitCards = document.getElementsByClassName('contactable');

for (var i = 0; i < portraitCards.length; i++) {
  var contact = portraitCards[i];
  contact.addEventListener("click", function() {
    cardEvent(this);
  });
}

var onloadCallback = function() {
  grecaptcha.render('reCaptcha', {
    'sitekey': '6LegdCkTAAAAANnQ7DNBVr7TxPgLM1wXeFrkNOhn'
  }).catch((err) => {});
};


var mainOld = "";

function cardEvent(contact) {

  if (contact.id != null) {
    console.log(contact.id);

    // Ladet den HTML Code für das Kontaktformular
    loadHTMLCode('/form/personal_contact.html').then(content => {


      mainOld = document.getElementById('main').innerHTML;

      //  document.getElementsByTagName("html")[0].overflow = "hidden";

      // Content wird angezeogt
      document.getElementById('main').innerHTML = content;

      onloadCallback();

      // script für POST
      var actionPHP = "https://zh11.ch/form/webmaster.php";
      var form = document.getElementById("kontaktformular");


    });
  }

}


function uebermittle() {
  if (grecaptcha.getResponse().length !== 0) {
    form.action = actionPHP;
    form.submit();
  } else {
    document.getElementById("reCaptcha").getElementsByTagName("iframe")[0].style.border = "1px solid #dd4b39";
  }
}
