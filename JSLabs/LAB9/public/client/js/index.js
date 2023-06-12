$('.extend, .close').on('click', function (e) {
  e.preventDefault();
  console.log(about.className)
  $('.detail, html, body').toggleClass('open');
  console.log(about.className)
});

// document.getElementById("myspan").textContent="newtext";



const tableBody = document.getElementById("tableBody");
const updateButton = document.getElementById("update");
const table = document.getElementById("table");
const keyInput = document.getElementById("input")
const about = document.getElementById("about")
const url = 'http://127.0.0.1:5005/v4/models';
let count = 0
let apikey = '1111';

function updateCounter() {
  document.getElementById("counter").textContent = count == 0 ? "There is no models" : `All models:${count}`
}

async function fetchModels() {
  try {
    let response = await fetch(url, {
      mode: 'cors',
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    });
    if (response.ok) {
      let models = await response.json();
      tableBody.innerHTML = ""
      models.forEach(i => {
        const row = document.createElement('tr');
        row.id = i.id
        row.innerHTML = ""
        row.innerHTML = `<td data-title="Name">${i.name}</td>`
        row.innerHTML += `<td data-title="Id">${i._id}</td>`
        row.innerHTML += `<td class="select">
                            <a class="button extend" id="${i._id}" href="#"> Select </a>
                            <a class="button delete" id="${i._id}" href="#"> Delete </a>
                          </td>`
        tableBody.appendChild(row);
      });
      count = models.length
      console.log(count)
      updateCounter();
    }
  } catch (error) {
    console.error(error);
    console.log(error);
    alert(error);
  }
}


document.body.addEventListener('click', async function (event) {


  if (event.target.className == 'button delete') {
    console.log("delete")
    deleteModel(event.target.id)
  }

  if (event.target.className == 'update') {
    fetchModels();
  }

  updateCounter()
});



async function deleteModel(id) {
  try {
    fetch(`http://127.0.0.1:5005/v3/deleteModels/${id}?key=${keyInput.value}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((result) => {
        if (result.status != '200') {
          alert('Что-то пошло не так, проверьте ваш apikey');
        } else {
          tableBody.innerHTML = '';
          count -= 1
          setTimeout(fetchModels, 100);
          updateCounter()
        }
      })

  } catch (err) {
    console.log(err);
    alert('Что-то пошло не так, проверьте ваш apikey');
  }
}