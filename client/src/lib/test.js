function measureOriginalExecutionTime(mat) {
  const startTime = performance.now();
  let resOriginal = shiftRowsOriginal(mat);
  const endTime = performance.now();
  const timeTaken = endTime - startTime;
  console.log(`Time taken to execute original function: ${timeTaken} milliseconds`);
  return resOriginal;
}

function measureImprovedExecutionTime(mat) {
  const startTime = performance.now();
  let resImproved = shiftRowsImproved(mat);
  const endTime = performance.now();
  const timeTaken = endTime - startTime;
  console.log(`Time taken to execute improved function: ${timeTaken} milliseconds`);
  return resImproved
}

function rotateArray(arr, k) {
  let left = arr.slice(k);
  let right = arr.slice(0,k);
  return left.concat(right)
}

// console.log(rotateArray([1,2,3,4,5],2))

function shiftRowsImproved(state) {
  // for (var r=1; r<4; r++) {
  //   s[r]=rotateArray(s[r],r);
  // }          
  // return s;
  let shiftedState = new Array(4);
    for (let i = 0; i < 4; i++) {
        shiftedState[i] = new Array(4).fill(0);
    }
    
    // Perform alternative shift rows operation
    for (let row = 1; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            shiftedState[row][(col + row) % 4] = state[row][col];
        }
    }
    
    return shiftedState;
};

function shiftRowsOriginal(s) {
  var t = new Array(4);
  for (var r=1; r<4; r++) {
      for (var c=0; c<4; c++) t[c] = s[r][(c+r)%4];  // shift into temp copy
      for (var c=0; c<4; c++) s[r][c] = t[c];         // and copy back
  }          
  return s;  
};

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate the matrix filled with random numbers
function generateMatrix(rows, cols) {
  const matrix = [];
  for (let i = 0; i < rows; i++) {
      matrix[i] = [];
      for (let j = 0; j < cols; j++) {
          matrix[i][j] = getRandomNumber(0, 4); // Modify range as needed
      }
  }
  return matrix;
}

mat=generateMatrix(4,4)
console.log(mat)
let a = measureOriginalExecutionTime(mat)
let b = measureImprovedExecutionTime(mat)
console.log(a)
console.log(b)



