$(document).ready(function(){
  $('#searchBar').on('keyup', function(){
    var value = $(this).val().toLowerCase();
    $("#searchResults tr").filter(function(){
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    })
  })
})

$(document).ready(function(){
  $('#salas').on('click', function(){
    $('.container-salas').toggle();
    $('#salas').toggle();
  })
  $('#fechar_salas').on('click', function(){
    $('.container-salas').toggle();
    $('#salas').toggle();   
  })
})

$(document).ready(function(){
  $('#filas').on('click', function(){
      $('.container-filas').toggle();
      $('#filas').toggle();   
  })
  $('#fechar_filas').on('click', function(){
    $('.container-filas').toggle();
    $('#filas').toggle();   
  })
})