// TODO: Wire up the app's behavior here.
// NOTE: The TODOs are listed in index.html

document.querySelector('button').setAttribute('disabled', '');

let uvuIdInputDiv = document.getElementsByClassName('uvu-id')[0];
let uvuIdInput = document.getElementById('uvuId');
let courseDropdown = document.getElementById('course');

courseDropdown.onchange = function () {
  if (courseDropdown.selectedIndex != 0) {
    uvuIdInputDiv.style.display = 'block';
  } else {
    uvuIdInputDiv.style.display = 'none';
  }
};

uvuIdInput.addEventListener('input', function () {
  input = uvuIdInput.value;
  let regex = /^[0-9]{0,10}$/gm;
  if (!regex.test(input)) {
    input = input.substring(0, input.length - 1);
    uvuIdInput.value = input;
  }
});

let logs = document.querySelectorAll('ul li');
for (let i = 0; i < logs.length; i++) {
  logs[i].addEventListener('click', function () {
    showHideLog(this);
  });
}

function showHideLog(log) {
  logText = log.querySelector('pre');
  if (logText.style.display != 'none') logText.style.display = 'none';
  else logText.style.display = 'block';
}

async function getStuff(src) {
  let myObject = await fetch(src);
  alert(myObject);
  console.log(myObject);
}

getStuff(
  'https://json-server-ft3qa5--3000.local.webcontainer.io/api/v1/courses'
);
