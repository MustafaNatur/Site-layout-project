
// document.getElementById("myspan").textContent="newtext";



const tableBody = document.getElementById("tableBody");
const updateButton = document.getElementById("update");
const table = document.getElementById("table");
const keyInput = document.getElementById("input")
const about = document.getElementById("about")

const userNameField = document.getElementById("userName")
const modelNameField = document.getElementById("modelName")
const modelTypeField = document.getElementById("modelType")
const creationDateField = document.getElementById("creationDate")
const descriptionField = document.getElementById("description")
const commentsField = document.getElementById("comments")

const inputs = document.getElementsByClassName("inputField");
const dds = document.getElementsByClassName("ddClass");

const buttonUpdateModel = document.getElementById("updateModel")

let idO = undefined




const send = document.getElementById("send")
//const scene = require('scene');

function hideDdsShowInputs() {
  Array.from(inputs).forEach(element => element.style.display = "block");
  Array.from(dds).forEach(element => element.style.display = "none");
}

function hideInputsShowDds() {
  Array.from(inputs).forEach(element => element.style.display = "none");
  Array.from(dds).forEach(element => element.style.display = "block");
}

function hideSendButton() {
  send.style.display = "none"
}

function showSendButton() {
  send.style.display = "block"
}

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

async function fetchModelsByID(id) {
  let url = `http://127.0.0.1:5005/v4/models/${id}`
  try {
    let response = await fetch(url, {
      mode: 'cors',
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })

    if (response.ok) {
      return await response.json();
    }

  } catch (error) {
    alert(error);
  }
}


document.body.addEventListener('click', async function (event) {

  let t = event.target.className
  let id = event.target.id


  if (t == 'button delete') {
    console.log("delete")
    deleteModel(event.target.id)
  }

  if (id == 'update') {
    fetchModels();
  }

  if (id == 'send') {
    const data = {
      username: document.getElementById("inputFieldUserName").value,
      name: document.getElementById("inputFieldModelName").value,
      modelType: document.getElementById("inputFieldModelType").value,
      modelObj: model,
      type: modelSelect.value,
      color: colorPicker.value,
      desc: document.getElementById("inputFieldDescription").value,
      comments: [
        "Nice model",
        "Awesome Polygones"
      ],
      creationDate: "2023-06-12T20:30:25.938Z",
      lastChangesDate: "2023-06-12T20:30:25.938Z"
    }

    if (idO == undefined) {
      fetch_post(data)
    } else {
      fetch_put(data)
    }
    idO = undefined

    console.log(JSON.stringify(data));

    $('.detail, html, body').toggleClass('open');
    fetchModels();
  }

  if (id == 'create') {
    showSendButton()
    updateScene()
    createModel()
    animate()
    hideDdsShowInputs();
    $('.detail, html, body').toggleClass('open');

  }

  if (t == 'button extend' || t == "close") {
    hideDdsShowInputs()
    if (t == 'button extend') {
      idO = event.target.id
      //hideSendButton()
      console.log(idO)
      updateScene()
      //hideInputsShowDds()
      let model = await fetchModelsByID(event.target.id)
      buildDetailPage(model)
      loadModel(model.modelObj);
      animate();
    }

    $('.detail, html, body').toggleClass('open');
  }
  updateCounter()
});

function buildDetailPage(model) {

  let userName = model.username
  let modelName = model.name
  let modelType = model.modelType
  let creationDate = model.creationDate
  let desc = model.desc
  let comments = model.comments

  document.getElementById("inputFieldUserName").value = userName
  document.getElementById("inputFieldModelName").value = modelName
  document.getElementById("inputFieldModelType").value = modelType
  creationDateField.textContent = creationDate
  descriptionField.textContent = desc
  commentsField.textContent = comments.join(" ,")

  colorPicker.value = model.color
  modelSelect.value = model.type

}



async function deleteModel(id) {
  try {
    fetch(`http://127.0.0.1:5005/v3/deleteModels/${id}?key=${keyInput.value}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((result) => {
        if (result.status != '200') {
          alert('Ошибка, проверьте ваш apikey');
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

async function fetch_post(data) {

  try {
    console.log('Объект');
    const response = await fetch(`http://127.0.0.1:5005/v3/postModels?key=BIdAWH7i9n7YeC/kfM5MQ`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (response.ok) {
      console.log('Объект успешно добавлен в базу данных');
    } else {
      console.error('Ошибка при добавлении объекта в базу данных');
    }
  } catch (error) {
    console.error(error);
  }
}

async function fetch_put(data) {

  try {
    console.log('Объект');
    const response = await fetch(`http://127.0.0.1:5005/v3/putModels/${idO}?key=BIdAWH7i9n7YeC/kfM5MQ`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (response.ok) {
      console.log('Объект успешно добавлен в базу данных');
    } else {
      console.error('Ошибка при добавлении объекта в базу данных');
    }
  } catch (error) {
    console.error(error);
  }
}



























import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/controls/OrbitControls.js';

const canvasContainer = document.getElementById('canvas-container');
const modelSelect = document.getElementById('model-select');
const colorPicker = document.getElementById('color-picker');

let camera, scene, renderer, controls, model;
scene = new THREE.Scene();
function init() {

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 10, 7);
  scene.add(light);
  const color1 = new THREE.Color();
  scene.background = color1;

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(ambientLight);

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(5, 5, 5);
  camera.lookAt(0, 0, 0);

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(900, 900 / 16 * 9);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.rotateSpeed = 0.5;
  controls.enableZoom = false;

  canvasContainer.appendChild(renderer.domElement);
}

function createModel() {
  const loader = new THREE.ObjectLoader();
  const geometry = getModelGeometry(modelSelect.value);
  const material = new THREE.MeshPhongMaterial({ color: colorPicker.value });
  model = new THREE.Mesh(geometry, material);
  model.castShadow = true;
  model.receiveShadow = true;


  scene.add(model);
}

function loadModel(modelJSON) {
  console.log(modelJSON)
  const loader = new THREE.ObjectLoader();

  let object = loader.parse(modelJSON)
  scene.add(object);
}

function getModelGeometry(modelType) {
  switch (modelType) {
    case 'sphere':
      return new THREE.SphereGeometry(1, 32, 32);
    case 'cone':
      return new THREE.ConeGeometry(1, 2, 32);
    case 'pyramid':
      return new THREE.CylinderGeometry(0, 1, 2, 4, 1);
    case 'cube':
      return new THREE.BoxGeometry(2, 2, 2);
    default:
      throw new Error(`Invalid model type: ${modelType} `);
  }
}

buttonUpdateModel.addEventListener('click', function (event) {
  updateScene()
  createModel();
});

function updateScene() {
  scene.clear()
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 10, 7);
  scene.add(light);
  const color1 = new THREE.Color();
  scene.background = color1;

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(ambientLight);
}


function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);

}

init()


