/* ----------------------------------------------------------------------
CPSC 335-05 Project 3 Sort Race
Team: LYL Brian Chung (889201612), Blue Bayani (889517108) - Project 2
Contact: bchung4@csu.fullerton.edu, kbayani@csu.fullerton.edu
Last Modified: 12/14
------------------------------------------------------------------------*/

//For all the get__SortAnimations, given an unsorted array, the function will console.log the sorted array and return a list called steps
//The steps list is what our race manager will use to print the arrays. For our problem we will need to change the implementation for the animation.push values
//For instance, we may want to push the following animation[step, index, swap]
//The step will tell the manager what step we're currently on, all steps on step 1 will display on the first row
//The index will obvious tell the manger what index so that the manager knows what index to change color
//The swap will be a bool, true refers to a swap and false refers to a comparison. Each will be represented with a different color

//The race manager, given the original array will call the get__SortAnimations functions and will be returned a rulebook of sorts so that it may properly
//display each step. A new step would indicate that the race manager would create a new row underneath the previous row

//Possible Issues: I do not think it will be able to sort hex values, therefore we will need to implement a function that conversts hex to int and int to hex

//Since we're not using Node we're limited to just this javascript file and the drawing functions of P5

var MergeSortSteps = [];
var QuickSortSteps = [];
var SelectionSortSteps = [];
var hexUsed = true;
var GivenArray = [0, 'b', 'a', 3, 2, 8, 4, 7, 6, 5, 1, 9];
//test arrays
//'a', 4, 0, 'b', 5, 8, 6, 1, 7, 9, 2, 3
//0, 'b', 'a', 3, 2, 8, 4, 7, 6, 5, 1, 9
//4, 0, 'b', 0, 6, 5, 6, 6, 7, 1, 0, 'a'
var passedArray = GivenArray.slice();
var m_a = [];
var q_a = [];
var s_a = [];
var count = 0;
//Convert all values into ints to put into sorting algorithm
if(hexUsed) {
  for(let i = 0; i < passedArray.length; i++){
    passedArray[i] = parseInt(passedArray[i], 16);
  }
}

//initializes variables used by race_manager
//O(1)
function init_display(){
  MergeSortSteps = getMergeSortSteps(passedArray.slice());
  QuickSortSteps = getQuickSortSteps(passedArray.slice());
  SelectionSortSteps = getSelectionSortSteps(passedArray.slice());
  m_a = drawMergeSortSteps();
  q_a = drawQuickSortSteps();
  s_a = drawSelectionSortSteps();
}

//changes the color of an array element at a certain index.
//O(1)
function color_change(arr,i1,i2,col) {
  var temp_arr = arr.slice()
  temp_arr[i1] = temp_arr[i1].toString().fontcolor(col)
  temp_arr[i2] = temp_arr[i2].toString().fontcolor(col)
  return temp_arr
}

//MergeSort GUI
//O(N)
function drawMergeSortSteps(){
  mergeSortArray = GivenArray.slice();
  for(let i=0;i<MergeSortSteps.length;i++){
    const isComparison = MergeSortSteps[i][2];
    if(isComparison){
      const idx1 = MergeSortSteps[i][0];
      const idx2 = MergeSortSteps[i][1];
      if(idx1 === idx2){
        m_a.push([color_change(mergeSortArray,idx1,idx2,"deepskyblue")])
      }
      // else{

      // }
    }
    else{
      const idx = MergeSortSteps[i][0];
      const idxHeight = MergeSortSteps[i][1];
      if(hexUsed){
        if(idxHeight > 9){
          let hexString = idxHeight.toString(16);
          mergeSortArray[idx] = hexString;
        }
        else{
          mergeSortArray[idx] = idxHeight;
        }
      }
      else{
        mergeSortArray[idx] = idxHeight;
      }
      m_a.push([color_change(mergeSortArray,idx,idxHeight,"red")])
    }
  }
  return m_a
}

//QuickSort GUI
//O(N)
function drawQuickSortSteps(){
  quickSortArray = GivenArray.slice();
  for(let i=0;i<QuickSortSteps.length;i++){
  const isComparison = QuickSortSteps[i][2];
  if(isComparison){
    const idx1 = QuickSortSteps[i][0];
    const idx2 = QuickSortSteps[i][1];
    q_a.push([color_change(quickSortArray,idx1,idx2,"deepskyblue")])
  }
  else{
    const idx1 = QuickSortSteps[i][0];
    const idx2 = QuickSortSteps[i][1];
    swap(quickSortArray, idx1, idx2)
    q_a.push([color_change(quickSortArray,idx1,idx2,"red")])
  }
  }
  return q_a
}

//Selection Sort GUI
//O(N)
function drawSelectionSortSteps(){
  selectionSortArray = GivenArray.slice();
  for(let i=0;i<SelectionSortSteps.length;i++){
    const isComparison = SelectionSortSteps[i][2];
    if(isComparison){
      const idx1 = SelectionSortSteps[i][0];
      const idx2 = SelectionSortSteps[i][1];
      s_a.push([color_change(selectionSortArray,idx1,idx2,"deepskyblue")])
    }
    else{
      const idx1 = SelectionSortSteps[i][0];
      const idx2 = SelectionSortSteps[i][1];
      swap(selectionSortArray, idx1, idx2)
      s_a.push([color_change(selectionSortArray,idx1,idx2,"red")])
    }    
  }
  return s_a;
}

//Sorting Algorithms
//Merge Sort
function getMergeSortSteps(array) {
  const steps = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, steps);
  return steps;
}
  
function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, steps) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, steps);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, steps);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, steps);
}
  
function doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, steps) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    steps.push([i, j, true]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      steps.push([k, auxiliaryArray[i], false]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      steps.push([k, auxiliaryArray[j], false]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    steps.push([i, i, true]);
    steps.push([k, auxiliaryArray[i], false]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    steps.push([j, j, true]);
    steps.push([k, auxiliaryArray[j], false]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

//Quick Sort
function getQuickSortSteps(array) {
  const steps = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  doQuickSort(auxiliaryArray, 0, array.length - 1, steps);
  return steps;
}
  
function doQuickSort(array, startIdx, endIdx, steps) {
  if (startIdx >= endIdx){
    return;
  }
  const pivotIdx = partitionArray(array, startIdx, endIdx, steps);
  doQuickSort(array, startIdx, pivotIdx-1, steps);
  doQuickSort(array, pivotIdx+1, endIdx, steps);
}
  
function partitionArray(array, startIdx, endIdx, steps){
  // pivot (Element to be placed at right position) also the last element
  let pivotValue = array[endIdx];
  let pivotIdx = startIdx; // Index of smaller element
  for (let i=startIdx; i<endIdx; i++){
    // If current element is smaller than the pivot
    if (array[i] < pivotValue){
      steps.push([i, pivotIdx, true]);
      steps.push([i, pivotIdx, false]);
      swap(array, i, pivotIdx);
      pivotIdx++; // increment index of smaller element
    }
  }
  steps.push([pivotIdx, endIdx, true]);
  steps.push([pivotIdx, endIdx, false]);
  swap(array, pivotIdx, endIdx);
  return(pivotIdx);
}

//Selection Sort
function getSelectionSortSteps(array){
  const steps=[];
  if(array.length<=1)return array;
  const auxiliaryArray=array.slice();
  doSelectionSort(auxiliaryArray,steps);
  return steps;
}
  
function doSelectionSort(array, steps){
  let minIdx;
  let len = array.length;
  for(let i=0; i < len; i++){
    minIdx = i;
    for(let j = i+1; j < len; j++){
      if(array[j] < array[minIdx]){
        minIdx = j;
      }
      steps.push([i, j, true]);
    }
    steps.push([i, minIdx, false]);
    swap(array, i, minIdx)
  }
  return array;
}
  
//Swap function for swapping values
function swap(array, firstIndex, secondIndex){
  let tempValue = array[firstIndex];
  array[firstIndex] = array[secondIndex];
  array[secondIndex] = tempValue;
}



init_display();


//displays sort step by step
//O(1)
function race_manager() {
  //on the first pass the function writes out the following information
  if(count == 0) {
    document.write("<h1>CPSC-335-05 Project 3: Sort-Race</h1><br></br><h3>LYL: Brian Chung (889201612), Blue Bayani (889517108)</h3>")
    document.write("<br></br>Blue = comparison, Red = swap<br></br>")
    document.write("<br></br><br></br>&emsp;MERGE SORT&emsp;&emsp;&emsp;&emsp;&emsp;QUICK SORT&emsp;&emsp;&emsp;SELECTION SORT<br></br>")
    document.body.style.backgroundColor = "beige";
  }
  //if count is greater than the longest array, stop calling function
  if(count > Math.max(m_a.length,q_a.length,s_a.length) - 1) {
    clearInterval(myVar)
  }
  //if there are still elements in the merge sort steps array, display it
  if (count < m_a.length) { 
      document.write("[" + m_a[count] + "]&emsp;")
  }
  //if there are still elements in the quick sort steps array, display it
 if (count < q_a.length) { 
    document.write("[" + q_a[count] + "]&emsp;")
  }
  
  if (count < s_a.length) { 
    //if count is less than maximum but greater than the amount of values in the quick sort steps array
    if (count >= q_a.length) {
      document.write("&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;   " )
    }
    //if count is less than maximum but greater than the amount of values in the merge sort steps array
    if (count >= m_a.length){
    document.write("&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;   " )
  }
  //display selection sort array
    document.write("[" + s_a[count] + "]")
  }
  count++;
  document.write("<br></br>")
}

//draws each step of the sorting race step by step.
//O(N), will take as long as the length of the sorting algorithm that takes the longest.
var myVar = setInterval(race_manager, 500);


//total time complexity of visualization of three-sort race: O(N)

