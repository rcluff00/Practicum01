document.querySelector('button').setAttribute('disabled', '');

let uvuIdInputDiv = document.getElementsByClassName('uvu-id')[0];
let uvuIdInput = document.getElementById('uvuId');
let courseDropdown = document.getElementById('course');

uvuIdInput.value = '10234567';

// show uvuId textbox after course is selected
courseDropdown.onchange = function () {
  if (courseDropdown.selectedIndex != 0) {
    uvuIdInputDiv.style.display = 'block';
  } else {
    uvuIdInputDiv.style.display = 'none';
  }
};

// check uvuId for proper input
uvuIdInput.addEventListener('input', function () {
  input = uvuIdInput.value;
  let regex = /^[0-9]{0,8}$/gm;
  if (!regex.test(input)) {
    input = input.substring(0, input.length - 1);
    uvuIdInput.value = input;
  } else {
    if (input.length == 8) {
      replaceLogs();
    }
  }
});

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
  let courseId = document.getElementById('course').value;
  let studentNum = document.getElementById('uvuId').value;
  // let json = await fetchJson(
  //   `https://json-server-5phigi--3000.local.webcontainer.io/logs?courseId=${courseId}&uvuId=${studentNum}`
  // );

  let url = `https://json-server-5phigi--3000.local.webcontainer.io/logs?courseId=${courseId}&uvuId=${studentNum}`;
  console.log('url: ' + url);

  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    console.log(this.status);
    console.log('this: ' + this);
  };
  xhttp.open('GET', url);
  xhttp.send();
}

// return json from fetch
async function fetchJson(src) {
  let response = await fetch(src);
  let myJson = await response.json();
  return myJson;
}

replaceCourseSelect();
