function CambioTexto(){
    var e=document.getElementsByClassName("todo");
    var x=document.getElementById("valor");
    for (var i = 0; i < e.length; i++){
      if (x.options[x.selectedIndex].text=="elige"){
        return false
      }
      e[i].style.fontSize=x.options[x.selectedIndex].text+"px";
      e[i].style.fontFamily="Arial";
      e[i].style.color="#000000";
    }
  }