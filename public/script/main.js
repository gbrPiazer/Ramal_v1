$(document).ready(function(){
  $('#searchBar').on('keyup', function(){
    var value = $(this).val().toLowerCase();
    $("#searchResults tr").filter(function(){
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    })
  })
})

$('#f1').on('click', function(){
  $('#searchResults').html('>_lista_filas');
})