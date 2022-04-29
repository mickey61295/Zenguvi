//// Initialize a XMLHttpRequest
// var xhr = new XMLHttpRequest();
// xhr.open('GET', "https://jsonplaceholder.typicode.com/comment")

// // Send the request to server
// xhr.send();

// //set up listener to process the request
// xhr.onload = function () {
//     //check status code of 200 to 300
//     if (xhr.status >= 200 && xhr.status < 300) {
//         //parse the response
//         var data = JSON.parse(xhr.responseText);
//         //display the response
//         console.log(data);
//     } else {
//         console.log(this.response);
//     }
// }

//Exercise 1
var xhr = new XMLHttpRequest();
xhr.open('GET', "https://jsonplaceholder.typicode.com/users")

//setup listener to process the request
xhr.onload = function () {
    //check status code of 200 to 300
    if (xhr.status >= 200 && xhr.status < 300) {
        //parse the response
        var data = JSON.parse(xhr.responseText);
        console.log(data);
    }else{
        console.log(this.response);
    }
}
