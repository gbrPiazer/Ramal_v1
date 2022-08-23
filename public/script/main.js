const searchResults = document.getElementById('searchResults')


function sendData(e){
  let match = e.value.match(/^[a-zA-Z]*/)
  let match2 = e.value.match(/\s*/)
  if(match2[0] === e.value){
    searchResults.innerHTML = '{{>_lista_ramal}}';
  }
  fetch("extrairFunc", {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({payload: e.value})
  }).then(res => res.json()).then(data => {
    let payload = data.payload;
    searchResults.innerHTML = '';
    if(payload.length < 1){
      searchResults.innerHTML = '<tr> <td></td> <td> Nenhum funcionário encontrado </td><td></td><td></td> </tr>';
    }
    payload.forEach((item, index) => {
      searchResults.innerHTML += `
      <tr>
        <td scope="row">${item.setor.nome}</td>
        <td scope="row">${item.nome_func}</td>
        <td scope="row"><a class="btn btn-outline-danger" href="tel:${item.ramal}">${item.ramal}</a></td>
        <td scope="row"><a class="btn btn-outline-danger" href="mailto:${item.email}">${item.email}</a></td>
      </tr>
      `
    })
  })
}
