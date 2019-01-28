function saveComments(key, id){
    var element = document.getElementById(id);
    //alert(element.value);
    sessionStorage.setItem(key, element.value);
}