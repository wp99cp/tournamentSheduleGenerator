function loadHTMLCode(url) {
  return new Promise((resolve, reject) => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        resolve(this.responseText);
      }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  });
}
