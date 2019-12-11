/* ----------------------------------------------------------------------
CPSC 335-05 Project 3 Sort Race
Team: LYL Brian Chung (889201612), Blue Bayani (889517108) - Project 2
Contact: bchung4@csu.fullerton.edu, kbayani@csu.fullerton.edu
Last Modified: 
------------------------------------------------------------------------*/

//For Blue:
//For all the get__SortAnimations, given an unsorted array, the function will console.log the sorted array and return a list called animations
//The animations list is what our race manager will use to print the arrays. For our problem we will need to change the implementation for the animation.push values
//For instance, we may want to push the following animation[step, index, swap]
//The step will tell the manager what step we're currently on, all animations on step 1 will display on the first row
//The index will obvious tell the manger what index so that the manager knows what index to change color
//The swap will be a bool, true refers to a swap and false refers to a comparison. Each will be represented with a different color

//The race manager, given the original array will call the get__SortAnimations functions and will be returned a rulebook of sorts so that it may properly
//display each step. A new step would indicate that the race manager would create a new row underneath the previous row

//Possible Issues: I do not think it will be able to sort hex values, therefore we will need to implement a function that conversts hex to int and int to hex

//Since we're not using Node we're limited to just this javascript file and the drawing functions of P5


//Sorting Algorithms
//Merge Sort
function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    console.log(array);
    return animations;
}
  
function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}
  
function doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      animations.push([i, j]);
      animations.push([i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      animations.push([i, i]);
      animations.push([i, i]);
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      animations.push([j, j]);
      animations.push([j, j]);
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }

//Quick Sort
function getQuickSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    doQuickSort(auxiliaryArray, 0, array.length - 1, animations);
    console.log(auxiliaryArray);
    return animations;
}
  
function doQuickSort(array, startIdx, endIdx, animations) {
    if (startIdx >= endIdx){
      return;
    }
    const pivotIdx = partitionArray(array, startIdx, endIdx, animations);
    doQuickSort(array, startIdx, pivotIdx-1, animations);
    doQuickSort(array, pivotIdx+1, endIdx, animations);
}
  
function partitionArray(array, startIdx, endIdx, animations){
    // pivot (Element to be placed at right position) also the last element
    let pivotValue = array[endIdx];
    let pivotIdx = startIdx; // Index of smaller element
    for (let i=startIdx; i<endIdx; i++){
      // If current element is smaller than the pivot
      if (array[i] < pivotValue){
        animations.push([i, pivotIdx, true]);
        animations.push([i, pivotIdx, true]);
        animations.push([i, array[pivotIdx], false]);
        animations.push([pivotIdx, array[i], false]);
        swap(array, i, pivotIdx);
        pivotIdx++; // increment index of smaller element
      }
    }
    animations.push([pivotIdx, endIdx, true]);
    animations.push([pivotIdx, endIdx, true]);
    animations.push([pivotIdx, array[endIdx], false]);
    animations.push([endIdx, array[pivotIdx], false]);
    swap(array, pivotIdx, endIdx);
    return(pivotIdx);
}

//Selection Sort
export function getSelectionSortAnimations(array){
    const animations=[];
    if(array.length<=1)return array;
    const auxiliaryArray=array.slice();
    doSelectionSort(auxiliaryArray,animations);
    console.log(auxiliaryArray);
    return animations;
}
  
function doSelectionSort(array, animations){
    let minIdx;
    let len = array.length;
    for(let i=0; i < len; i++){
      minIdx = i;
      for(let j = i+1; j < len; j++){
        if(array[j] < array[minIdx]){
          minIdx = j;
        }
        animations.push([i, j, true]);
        animations.push([i, j, true]);
      }
      animations.push([i, array[minIdx], false]);
      animations.push([minIdx, array[i], false]);
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