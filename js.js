let myleads=[]
const inputEl = document.getElementById("input-el")
const inputbtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deletebtn = document.getElementById("delete-btn")
let leadsFromLocalStorage = JSON.parse( localStorage.getItem("myleads") )
const tabbtn = document.getElementById("tab-btn")

if(leadsFromLocalStorage){
  myleads = leadsFromLocalStorage
  render(myleads)
} 
const tabs = [
  {url: "https://www.linkedin.com/in/per-harald-borgen/"}
]

tabbtn.addEventListener("click", function(){
   chrome.tabs.query({active: true, currentWindows: true}, function(tabs){
  myleads.push(tabs[0].url)
  localStorage.getItem("myleads", JSON.stringify(myleads))
  render(myleads)
})
})


function render(leads) {
let listItems = ""
for (let i = 0; i < leads.length; i++) {
    
    listItems += `
       <li>
         <a target ='_blank' href='${ myleads[i] }'>
    ${myleads[i]} 
    </a>
    </li>
    `
   }
  ulEl.innerHTML = listItems
}
deletebtn.addEventListener("dblclick" ,function(){
  localStorage.clear();
  myleads = []
  render(myleads)
})
inputbtn.addEventListener("click", function(){
       myleads.push(inputEl.value)
       inputEl.value = ""                                       //Clearing value on input text field
       localStorage.getItem("myleads", JSON.stringify(myleads)) //Saving in local storage
       render(myleads)
})

