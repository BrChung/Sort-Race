/* ----------------------------------------------------------------------
CPSC 335-05 Project 3 Sort Race
Team: LYL Brian Chung (889201612), Blue Bayani (889517108) - Project 2
Contact: bchung4@csu.fullerton.edu, kbayani@csu.fullerton.edu
Last Modified: 
------------------------------------------------------------------------*/

//For Blue:
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

var MergeSortSteps = []
var QuickSortSteps = []
var SelectionSortSteps = []
var hexUsed = true;
var GivenArray = [0, 'b', 'a', 3, 2, 8, 4, 7, 6, 5, 1, 9]
var passedArray = GivenArray.slice()

//Convert all values into ints to put into sorting algo
if(hexUsed){
  for(let i = 0; i < passedArray.length; i++){
    passedArray[i] = parseInt(passedArray[i], 16);
  }
}

console.log(passedArray);


//Race Manager
function raceManager(){
  MergeSortSteps = getMergeSortSteps(passedArray.slice());
  QuickSortSteps = getQuickSortSteps(passedArray.slice());
  SelectionSortSteps = getSelectionSortSteps(passedArray.slice());
}

//MergeSort GUI
function drawMergeSortSteps(){
  mergeSortArray = GivenArray.slice();
  for(let i=0;i<MergeSortSteps.length;i++){
    const isComparison = MergeSortSteps[i][2];
    if(isComparison){
      const idx1 = MergeSortSteps[i][0];
      const idx2 = MergeSortSteps[i][1];
      if(idx1 === idx2){
        //Pivot value?
      }
      else{
      //pass but make 
      }
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
    }
    console.log(mergeSortArray)
  }
}

//QuickSort GUI
function drawQuickSortSteps(){
  quickSortArray = GivenArray.slice();
  for(let i=0;i<QuickSortSteps.length;i++){
    const isComparison = QuickSortSteps[i][2];
    if(isComparison){
      const idx1 = QuickSortSteps[i][0];
      const idx2 = QuickSortSteps[i][1];
      //
    }
    else{
      const idx1 = QuickSortSteps[i][0];
      const idx2 = QuickSortSteps[i][1];
      swap(quickSortArray, idx1, idx2)
    }
    console.log(quickSortArray)
  }
}

//Selection Sort GUI
function drawSelectionSortSteps(){
  selectionSortArray = GivenArray.slice();
  for(let i=0;i<SelectionSortSteps.length;i++){
    const isComparison = SelectionSortSteps[i][2];
    if(isComparison){
      const idx1 = SelectionSortSteps[i][0];
      const idx2 = SelectionSortSteps[i][1];
      //pass but make 
    }
    else{
      const idx1 = SelectionSortSteps[i][0];
      const idx2 = SelectionSortSteps[i][1];
      swap(selectionSortArray, idx1, idx2)
    }
    console.log(selectionSortArray)
  }
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

raceManager();
//drawQuickSortSteps();
drawSelectionSortSteps();
//drawMergeSortSteps();