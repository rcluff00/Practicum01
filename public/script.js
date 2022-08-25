// document.querySelector('button').setAttribute('disabled', '');

let uvuIdInputDiv = document.getElementsByClassName('uvu-id')[0];
let uvuIdInput = document.getElementById('uvuId');
let courseDropdown = document.getElementById('course');
let logsDiv = document.querySelector('.logs-div');

logsDiv.style.display = 'none';

// show uvuId textbox after course is selected
courseDropdown.onchange = function () {
  if (courseDropdown.selectedIndex != 0) {
    uvuIdInputDiv.style.display = 'block';
    // checkUvuId();
  } else {
    uvuIdInputDiv.style.display = 'none';
  }
};

// check uvuId for proper input
function checkUvuId() {
  input = uvuIdInput.value;

  if (input.length == 8) {
    replaceLogs();
  }
}
uvuIdInput.addEventListener('input', checkUvuId);

let logs = document.querySelectorAll('ul li');
for (let i = 0; i < logs.length; i++) {
  logs[i].addEventListener('click', function () {
    showHideLog(this);
  });
}

// toggle displaying of log text
function showHideLog(log) {
  logText = log.querySelector('pre');
  if (logText.style.display != 'none') logText.style.display = 'none';
  else logText.style.display = 'block';
}

// replace static course options with options from API
async function replaceCourseSelect() {
  let courseSelect = document.getElementById('course');
  let courseOptions = courseSelect.options;
  let courseOptionsLen = courseOptions.length;
  let url =
    'https://json-server-5phigi--3000.local.webcontainer.io/api/v1/courses';

  for (let i = 1; i < courseOptionsLen; i++) {
    courseSelect.remove(1);
  }

  let json = await fetchJson(url);

  let courseJsonLen = json.length;
  for (let i = 0; i < courseJsonLen; i++) {
    let option = document.createElement('option');
    option.text = json[i].display;
    option.value = json[i].id;
    courseSelect.add(option);
  }
}

// replace static course logs with logs from API
async function replaceLogs() {
  let logsList = document.getElementById('logsUl');

  while (logsList.firstChild) {
    logsList.removeChild(logsList.firstChild);
  }

  let courseId = document.getElementById('course').value;
  let uvuId = document.getElementById('uvuId').value;
  let json = await fetchJson(
    `https://json-server-5phigi--3000.local.webcontainer.io/logs?courseId=${courseId}&uvuId=${uvuId}`
  );
  for (log of json) {
    let logLi = document.createElement('li');

    let small = document.createElement('small');
    let div = document.createElement('div');
    small.innerHTML = log.date;
    div.appendChild(small);
    logLi.appendChild(div);

    let pre = document.createElement('pre');
    let p = document.createElement('p');
    p.innerText = log.text;
    pre.appendChild(p);
    logLi.appendChild(pre);

    logsList.appendChild(logLi);
  }

  logsDiv.style.display = 'block';

  // let url = `https://json-server-5phigi--3000.local.webcontainer.io/logs?courseId=cs4660&uvuId=10111111`;
  // console.log('url: ' + url);

  // const xhttp = new XMLHttpRequest();
  // xhttp.onload = function () {
  //   console.log('this.status: ' + this.status);
  //   console.log('this.response: ' + this.response);
  //   let object = JSON.parse(this.response);
  //   console.log('ojbect: ' + object);
  // };
  // xhttp.open('GET', url);
  // xhttp.setRequestHeader('Content-Type', 'application/json');
  // xhttp.send();
  //
}

// return json from fetch
async function fetchJson(src) {
  let response = await fetch(src);
  let myJson = await response.json();
  return myJson;
}

replaceCourseSelect();

// function createUUID() {
//   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
//      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
//      return v.toString(16);
//   });
// }
