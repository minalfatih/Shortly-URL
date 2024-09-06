let input = document.querySelector(".the-input");
let box = document.querySelector(".short .box");
let errorMesg = document.createElement("p");
errorMesg.className = "error-mesg";
errorMesg.textContent = "Please add a link";
box.appendChild(errorMesg);
let boxLink = document.querySelector(".short .box-link");

let urlRe = /\bhttps?:\/\//ig

document.querySelector(".short-btn").onclick = function(e) {
  if (input.value !== "" && urlRe.test(input.value)) {
    var link = input.value;
    var data = {
      "domain":"g5sy.short.gy",
      "originalURL": link,
      "allowDuplicates":false }; 
   fetch('https://api.short.cm/links/public', {
      method: 'post',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': 'pk_5tQcYlSiEmEnYmO1'
      },
      body: JSON.stringify(data)
    }) .then(function(response) {
          return response.json();
      }) 
      .then(function(data){ 
        let box = document.createElement("div");
        //box.innerHTML = "Your short link is " + data.shortURL 
        box.className = "box";
        boxLink.appendChild(box);
        
        let linkName = document.createElement("p");
        linkName.className = "link-name";
        linkName.innerHTML = data.shortURL;
        box.appendChild(linkName);

        let copy = document.createElement("div");
        copy.className = "copy";
        box.appendChild(copy);
        let link = document.createElement("span");
        link.className = "link";
        link.innerHTML = data.shortURL;
        copy.appendChild(link);
        
        let btn = document.createElement("button");
        btn.className = "copy-btn";
        btn.id = "special"
        btn.textContent = "Copy";
        copy.appendChild(btn);
        
      })
      input.value='';
      errorMesg.classList.remove("active")
  } else {
    errorMesg.classList.add("active")
  }
    e.preventDefault()
 }

document.addEventListener("click", e => {
  if(e.target.className === "copy-btn") {
    let text = e.target.previousElementSibling
    navigator.clipboard.writeText(text.textContent).then(() => {
    // successfully copied
  });
  e.target.textContent = "Copied!";
  e.target.classList.add("copied");
  }
})
