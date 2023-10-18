const arrayDiv = document.getElementById("array-element");
const generateBtn = document.getElementById("generate-btn");
const visualizeBtn = document.getElementById("visualize-btn");
const resetBtn = document.getElementById("reset-btn");

//by default the reset and visualize button will not be shown
visualizeBtn.style.display = "none";
resetBtn.style.display = "none";

const speed = document.getElementById("speed-range");

var speedValue, time;

//set speed of sorting
function setSpeed() {
  speedValue = speed.value;
  time = speedValue / 1000;
  document.getElementById("range-value").innerText = `${time}s delay`;
}

// Function to generate and display the initial random array
function generateArray() {
  generateBtn.style.display = "none";
  visualizeBtn.style.display = "block";
  resetBtn.style.display = "block";

  document.getElementById("sorting-heading").innerText =
    "please set speed and click sort button to start sorting 👇";

  arrayDiv.innerHTML = "";

  const randomArray = [];

  for (let i = 0; i < 5; i++) {
    const randomNum = Math.floor(Math.random() * 200) - 100; // Fix random number generation
    randomArray.push(randomNum);
  }

  displayArray(randomArray);

  return randomArray;
}

// Function to display an array in the HTML
function displayArray(arr) {
  arrayDiv.innerHTML = "";
  for (let j = 0; j < arr.length; j++) {
    arrayDiv.innerHTML += `
      <span id="arr-element-${j}" class="array-element w-[50px] h-[50px] lg:w-[80px] lg:h-[80px] flex items-center justify-center text-bold text-xl bg-[#575757] text-white border border-white">${arr[j]}</span>
    `;
  }
}

// Function to visualize the bubble sort with randomArray
async function visualizeBubbleSort() {
  //hide the buttons while sorting
  generateBtn.style.display = "none";
  visualizeBtn.style.display = "none";
  resetBtn.style.display = "none";

  //hide the speed adjuster
  speed.style.display = "none";

  const randomArray = generateArray();
  document.getElementById("sorting-heading").innerText = "Sorting 🗃️";

  let swapped;

  do {
    swapped = false;
    for (let i = 0; i < randomArray.length - 1; i++) {
      document.getElementById(`arr-element-${i}`).style.backgroundColor = "red";
      document.getElementById(`arr-element-${i + 1}`).style.backgroundColor =
        "red";

      await new Promise((resolve) => setTimeout(resolve, speedValue));

      if (randomArray[i] > randomArray[i + 1]) {
        let temp = randomArray[i];
        randomArray[i] = randomArray[i + 1];
        randomArray[i + 1] = temp;
        displayArray(randomArray);

        //highlight when swapped
        document.getElementById(`arr-element-${i}`).style.backgroundColor =
          "green";
        document.getElementById(`arr-element-${i + 1}`).style.backgroundColor =
          "green";

        await new Promise((resolve) => setTimeout(resolve, speedValue));

        //reset the background after swap
        document.getElementById(`arr-element-${i}`).style.backgroundColor = "";
        document.getElementById(`arr-element-${i + 1}`).style.backgroundColor =
          "";

        swapped = true;
      }

      document.getElementById(`arr-element-${i}`).style.backgroundColor = ""; // Reset background color
      document.getElementById(`arr-element-${i + 1}`).style.backgroundColor =
        "";
    }
  } while (swapped);

  //show the button again after completing of sorting
  generateBtn.style.display = "block";
  visualizeBtn.style.display = "block";
  resetBtn.style.display = "block";

  //show speed adjuster
  speed.style.display = "block";

  document.getElementById("sorting-heading").innerText = "Sorted ✔️";
}

//function to visualize the insertion sort with randomArray
async function visualizeInsertionSort() {
  //hide the buttons while sorting
  generateBtn.style.display = "none";
  visualizeBtn.style.display = "none";
  resetBtn.style.display = "none";

  //hide the speed adjuster
  speed.style.display = "none";

  const randomArray = generateArray();
  document.getElementById("sorting-heading").innerText = "Sorting 🗃️";

  for (let i = 1; i < randomArray.length; i++) {
    document.getElementById(`arr-element-${i}`).style.backgroundColor = "red";

    let key = randomArray[i];
    let j = i - 1;

    await new Promise((resolve) => setTimeout(resolve, speedValue));

    while (j >= 0 && randomArray[j] > key) {
      randomArray[j + 1] = randomArray[j];
      displayArray(randomArray); // Update the array in the visualization
      document.getElementById(`arr-element-${j + 1}`).style.backgroundColor =
        "green";
      await new Promise((resolve) => setTimeout(resolve, speedValue));
      document.getElementById(`arr-element-${j + 1}`).style.backgroundColor =
        "";
      j--;
    }

    randomArray[j + 1] = key;
    displayArray(randomArray); // Update the array in the visualization
    document.getElementById(`arr-element-${j + 1}`).style.backgroundColor =
      "green";
    await new Promise((resolve) => setTimeout(resolve, speedValue));
    document.getElementById(`arr-element-${j + 1}`).style.backgroundColor = "";
  }

  generateBtn.style.display = "block";
  visualizeBtn.style.display = "block";
  resetBtn.style.display = "block";

  //show speed adjuster
  speed.style.display = "block";

  document.getElementById("sorting-heading").innerText = "Sorted ✔️";
}

// Function to visualize the quick sort with randomArray
async function visualizeQuickSort() {
  generateBtn.style.display = "none";
  visualizeBtn.style.display = "none";
  resetBtn.style.display = "none";
  speed.style.display = "none";

  const randomArray = generateArray();
  document.getElementById("sorting-heading").innerText = "Sorting 🗃️";

  await quickSort(randomArray, 0, randomArray.length - 1);

  generateBtn.style.display = "block";
  visualizeBtn.style.display = "block";
  resetBtn.style.display = "block";
  speed.style.display = "block";

  document.getElementById("sorting-heading").innerText = "Sorted ✔️";
}

async function quickSort(randomArray, start, end) {
  if (start < end) {
    let pivotIndex = await partition(randomArray, start, end);
    document.getElementById(`arr-element-${pivotIndex}`).style.backgroundColor =
      "#AA336A";
    await new Promise((resolve) => setTimeout(resolve, speedValue));
    document.getElementById(`arr-element-${pivotIndex}`).style.backgroundColor =
      "";

    await quickSort(randomArray, start, pivotIndex - 1);
    await quickSort(randomArray, pivotIndex + 1, end);
  }
}

async function partition(randomArray, start, end) {
  let pivotValue = randomArray[end];
  let pivotIndex = start;

  document.getElementById(`arr-element-${end}`).style.backgroundColor =
    "#AA336A";
  await new Promise((resolve) => setTimeout(resolve, speedValue));

  for (let i = start; i < end; i++) {
    if (randomArray[i] < pivotValue) {
      await swap(randomArray, i, pivotIndex);
      pivotIndex++;
    }
  }

  await swap(randomArray, pivotIndex, end);

  return pivotIndex;
}

async function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  displayArray(arr);

  document.getElementById(`arr-element-${i}`).style.backgroundColor = "green";
  document.getElementById(`arr-element-${j}`).style.backgroundColor = "green";
  await new Promise((resolve) => setTimeout(resolve, speedValue));
  document.getElementById(`arr-element-${i}`).style.backgroundColor = "";
  document.getElementById(`arr-element-${j}`).style.backgroundColor = "";
}

// Function to visualize Merge Sort with randomArray
async function visualizeMergeSort() {
  generateBtn.style.display = "none";
  visualizeBtn.style.display = "none";
  resetBtn.style.display = "none";
  speed.style.display = "none";

  const randomArray = generateArray();
  document.getElementById("sorting-heading").innerText = "Sorting 🗃️";

  await mergeSort(randomArray, 0, randomArray.length - 1);

  generateBtn.style.display = "block";
  visualizeBtn.style.display = "block";
  resetBtn.style.display = "block";
  speed.style.display = "block";

  document.getElementById("sorting-heading").innerText = "Sorted ✔️";
}

async function mergeSort(randomArray, left, right) {
  if (left < right) {
    const middle = Math.floor((left + right) / 2);
    await mergeSort(randomArray, left, middle);
    await mergeSort(randomArray, middle + 1, right);
    await merge(randomArray, left, middle, right);
  }
}

async function merge(randomArray, left, middle, right) {
  const n1 = middle - left + 1;
  const n2 = right - middle;

  const leftArray = new Array(n1);
  const rightArray = new Array(n2);

  for (let i = 0; i < n1; i++) {
    leftArray[i] = randomArray[left + i];
    document.getElementById(`arr-element-${left + i}`).style.backgroundColor =
      "green";
    await new Promise((resolve) => setTimeout(resolve, speedValue));
    document.getElementById(`arr-element-${left + i}`).style.backgroundColor =
      "";
  }

  for (let j = 0; j < n2; j++) {
    rightArray[j] = randomArray[middle + 1 + j];
    document.getElementById(
      `arr-element-${middle + 1 + j}`
    ).style.backgroundColor = "#AA336A";
    await new Promise((resolve) => setTimeout(resolve, speedValue));
    document.getElementById(
      `arr-element-${middle + 1 + j}`
    ).style.backgroundColor = "";
  }

  let i = 0,
    j = 0,
    k = left;
  while (i < n1 && j < n2) {
    if (leftArray[i] <= rightArray[j]) {
      randomArray[k] = leftArray[i];
      i++;
    } else {
      randomArray[k] = rightArray[j];
      j++;
    }
    displayArray(randomArray);
    k++;
  }

  while (i < n1) {
    randomArray[k] = leftArray[i];
    displayArray(randomArray);
    i++;
    k++;
  }

  while (j < n2) {
    randomArray[k] = rightArray[j];
    displayArray(randomArray);
    j++;
    k++;
  }
}
