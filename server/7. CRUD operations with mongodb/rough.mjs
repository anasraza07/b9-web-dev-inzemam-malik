// let linear = [
//   82, 57, 91, 48, 30, 18, 77, 62, 52, 94, 15, 7, 3, 46, 70, 59, 88, 38, 49, 73,
//   65, 2, 35, 85, 24, 29, 61, 23, 45, 81, 41, 64, 40, 25, 32, 87, 100, 33, 79,
//   56, 66, 76, 21, 20, 67, 98, 37, 84, 5, 9, 97, 17, 92, 12, 19, 74, 93, 78, 36,
//   26, 68, 50, 14, 1, 96, 22, 55, 95, 34, 54, 4, 69, 6, 80, 63, 43, 99, 16, 71,
//   90, 58, 31, 42, 53, 27, 86, 75, 72, 89, 51, 28, 10, 47, 60, 8, 11, 44, 83, 39,
// ];

let binary = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
  42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
  61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79,
  80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98,
  99, 100,
];
// // linear search
// const givenQuery = 500;
// for (let i = 0; i < linear.length; i++) {
//   console.log("iteration: ", i + 1);
//   if (linear[i] === givenQuery) {
//     console.log("found at index: ", i);
//     break;
//   } else {
//     console.log("not found");
//   }
// }

// Binary search
// const givenQuery = 500;
let dataCopy = [...binary];
const search = (givenQuery, data, index = 0) => {
  console.log("iteration number:", index + 1);
  console.log("dataCopy:", data);

  let mid = parseInt(data.length / 2);
  let left = data.slice(0, mid);
  let right = data.slice(mid + 1, data.length);

  if (givenQuery === data[mid]) {
    console.log("found at index: ", mid);
    return;
  } else if (givenQuery < data[mid]) {
    search(givenQuery, left, index + 1);
  } else if (givenQuery < data[mid]) {
    search(givenQuery, right, index + 1);
  } else {
    console.log("not found");
  }
};
search(2, dataCopy);
