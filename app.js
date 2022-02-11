let form = document.querySelector("#form");
 let update = document.querySelector("#update");

form.addEventListener("submit",async e => {
  e.preventDefault();
  console.log("hiii");
  let std_name = e.target[0].value;
  let stdid = e.target[1].value;
  let stdemail = e.target[2].value;
  let stdcourses = e.target[3].value;
  let payload = {
    name: std_name,
    std_id: stdid,
    email: stdemail,
    courses: stdcourses,
  };
  let url = "http://localhost:4000/api/students";
  let body = await window.fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });
    // console.log(body);
    window.location.reload();
   
});
let getdata = async () => {
     let url = "http://localhost:4000/api/students";
    let data = await window.fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
  let table = document.querySelector("#body")
  
    let finaldata =await data.json();
let body1 = finaldata.payload
    console.log(body1);
  let output = ""
 
    body1.map((value, index) => {
        output += `
        <tr class="tablerow">
        <td>${value.name}</td>
        <td>${value.email}</td>
        <td>${value.std_id}</td>
        <td>${value.courses}</td>
        <td><button class="deleteBtn" onclick="deletepost('${value._id}')">Delete</button></td>
        <td><button class="editBtn" onclick="editpost('${value._id}')  " >Edit</button></td>
        </tr>
         `;
       
    })
  table.innerHTML = output;
 

}
getdata();


let deletepost = async (x) => {
  window.location.reload();
 let url = `http://localhost:4000/api/students/${x}`;
 let data = await window.fetch(url, {
   method: "DELETE",
   headers: {
     "Content-type": "application/json",
   },
 });
}

let empName = document.querySelector("#name");

let empId = document.querySelector("#stdid");
let empEmail = document.querySelector("#email");
let empCourses = document.querySelector("#courses");
let btnoutput = "";
let btn = document.querySelector(".btn1");


let editpost = async (y) => {
  console.log(y);
   let url = `http://localhost:4000/api/students/${y}`;
   let data = await window.fetch(url, {
     method: "GET",
     headers: {
       "Content-type": "application/json",
     },
   });
   let editdata = await data.json();
  let editpayload = editdata.payload;
  console.log(editpayload.name);
  empName.setAttribute("value", `${editpayload.name}`);
  empId.setAttribute("value", `${editpayload.std_id}`);
  empEmail.setAttribute("value", `${editpayload.email}`);
  empCourses.setAttribute("value", `${editpayload.courses}`);

 
  btnoutput = `<button onclick="updatepost('${editpayload._id}')">Update</button>`;
   btn.innerHTML = btnoutput;
}


let updatepost = async(z , e)  => {
  console.log("put");
  let std_name = empName.value;
  let stdid = empId.value;
  let stdemail = empEmail.value;
  let stdcourses = empCourses.value;
  var payload = {
    name: std_name,
    std_id: stdid,
    email: stdemail,
    courses: stdcourses,
  };
  console.log("hhh", z);
  var url = `http://localhost:4000/api/students/${z}`;
  let body = await window.fetch(url, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  window.location.reload();
};
 
 

