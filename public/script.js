let uvuIdInputDiv = document.getElementsByClassName('uvu-id')[0];
let uvuIdInput = document.getElementById('uvuId');
let courseDropdown = document.getElementById('course');
let logsDiv = document.querySelector('.logs-div');
logsDiv.style.display = 'none';

document.getElementById('logForm').addEventListener('submit', function (event) {
  event.preventDefault();
});

document.getElementById('submit').addEventListener('click', postData);

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
  let courseOptionsLen = courseSelect.options.length;
  let url =
    'https://json-server-5phigi--3000.local.webcontainer.io/api/v1/courses';

  for (let i = 1; i < courseOptionsLen; i++) {
    courseSelect.remove(1);
  }

  let json = await fetchJson(url);

  for (let i = 0; i < json.length; i++) {
    let option = document.createElement('option');
    option.text = json[i].display;
    option.value = json[i].id;
    courseSelect.add(option);
  }
}

// replace static course logs with logs from API
async function replaceLogs() {
  let logsList = document.getElementById('logsUl');

  // clear log list
  while (logsList.firstChild) {
    logsList.removeChild(logsList.firstChild);
  }

  // fetch log info
  let courseId = document.getElementById('course').value;
  let uvuId = document.getElementById('uvuId').value;
  let json = await fetchJson(
    `https://json-server-5phigi--3000.local.webcontainer.io/api/v1/logs?courseId=${courseId}&uvuId=${uvuId}`
  );

  //print log info
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
  document.getElementById('uvuIdSpan').innerText = json[0].uvuId;
  logsDiv.style.display = 'block';
  document.querySelector('button').disabled = false;
}

function postData(url, data) {
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

function postLog(event) {
  event.preventDefault();
  let d = new Date();
  let date = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
  let amPm = d.getHours() < 12 ? 'AM' : 'PM';
  let time = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} ${amPm}`;
  let json = {};
  json.courseId = courseDropdown.value;
  json.uvuId = uvuIdInput.value;
  json.date = `${date}, ${time}`;
  json.text = document.getElementById('logBody').value;
  json.id = createUUID();

  postData(
    'https://json-server-5phigi--3000.local.webcontainer.io/api/v1/logs',
    json
  );
}

let testUrl =
  'https://json-server-5phigi--3000.local.webcontainer.io/api/v1/logs';
let testData = {
  courseId: 'cs666',
  uvuId: '10666666',
  date: '1/23/2021 1:23:36 PM',
  text: 'COVFEFE',
  id: '420',
};

// return json from fetch
async function fetchJson(src) {
  let response = await fetch(src);
  let myJson = await response.json();
  return myJson;
}

replaceCourseSelect();

function createUUID() {
  return 'xxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
