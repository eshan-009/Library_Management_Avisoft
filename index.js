const booklist = document.querySelector(".booklist")
const addbutton = document.querySelector("[addbookbutton]")
const addbookform = document.querySelector("form");
const searchinput = document.querySelector("[searchinput]");
const searchbutton = document.querySelector("[searchbutton]")
const searchresult = document.querySelector("[searchresult]")
const searchbox = document.querySelector("[searchbox]");
const addbooktab = document.querySelector("[booktab]")
const tab1 = document.querySelector("[tab1]");
const tab2 = document.querySelector("[tab2]");
const tab3 = document.querySelector("[tab3]");
const library = [];
let currentTab=tab1;
toggle(currentTab);
// booklist.classList.add("active");
// console.log("cu",currentTab);
function toggle(tab)
{
    tab1.classList.remove("current");
    tab2.classList.remove("current");
    tab3.classList.remove("current");
    tab.classList.add("current");
    if(tab === tab1)
        {
            searchbox.classList.remove("active");
            addbooktab.classList.remove("active")
            booklist.classList.add("active");
            currentTab=tab1;
          
        }
        else if(tab === tab2)
        {
            
            addbooktab.classList.remove("active")
            booklist.classList.remove("active");
            searchbox.classList.add("active");
            currentTab=tab2;
          
        }
        else
        {
        
            booklist.classList.remove("active");
            searchbox.classList.remove("active");
            addbooktab.classList.add("active");
            currentTab=tab3;
            console.log("cu",currentTab);
        }
}
tab1.addEventListener("click",()=>{
    currentTab = tab1;
    toggle(currentTab);
})
tab2.addEventListener("click",()=>{
    toggle(tab2);
})
tab3.addEventListener("click",()=>{
    toggle(tab3);
})
// localStorage.setItem("library",JSON.stringify(library));
// localStorage.clear()
function addBook(id, title, author){
    let librariran = JSON.parse(localStorage.getItem("library"))
    if(!librariran)
    {
        librariran=[];
        localStorage.setItem("library",JSON.stringify(librariran));

    }
    console.log("ADD BOOk",id,title,author);
    if(!id || !title || !author)
    {
        return alert("Fill All details")
    }
    else
    {
        librariran.push({
            id:id,
            title:title,
            author:author,
            isBorrowed:false,
    
        });
        console.log("Hererere")
    }
   
  
    localStorage.setItem("library",JSON.stringify(librariran));
    location.reload();
}
function borrowBook(id)
{
    const librariran = JSON.parse(localStorage.getItem("library"))

    const bookdata = librariran.find((item)=>item.id===id);
    if(bookdata.isBorrowed)
    {
        return console.log(`${bookdata.title} is Not Available`)
    }
    else{
        bookdata.isBorrowed = true;
        localStorage.setItem("library",JSON.stringify(librariran));
    }
    return
}

function returnBook(id)
{
    const bookdata = library.find((item)=>item.id===id);
    bookdata.isBorrowed = false;
    localStorage.setItem("library",JSON.stringify(library));
}
function listAvailableBooks(){
    const librariran = JSON.parse(localStorage.getItem("library"))
    if(librariran)
    {
        for(item of librariran)
            {
                listbookitem(item.title,item.id,item.author,item.isBorrowed);

                // if(item.isBorrowed === false)
                // {
                //     console.log(item.id,item.title,item.author);
                // }
            }
    }
    else
    {
        return alert("Library is Empty")
    }
   
    
}

function searchBook(title){
    const librariran = JSON.parse(localStorage.getItem("library"))
    if(librariran)
    {
        const bookdata = librariran.find((item)=>item.title===title);
        if(bookdata)
        {
            
            return bookdata;
        }
        else 
        {
           
            return null;
        }
    }
   
}

searchbutton.addEventListener("click",(e)=>{
    // e.preventDefault();
    const text = searchinput.value;
    let searchdata = searchBook(text);
    console.log(searchdata)
    let title = searchdata.title;
    let author = searchdata.author;
    let id = searchdata.id;
    let isBorrowed = searchdata.isBorrowed;
    var listitem;
    
    searchresult.children[0]?searchresult.children[0].innerHTML = `${title} &nbsp  &nbsp &nbsp by ${author} `  :listitem = document.createElement("li");
    

    if(listitem)
    {
        listitem.classList.add("listitem");
    listitem.innerHTML= `${title} &nbsp  &nbsp &nbsp by ${author} ` ;
    }
     
    const button = document.createElement("button");
    button.innerHTML = `${isBorrowed ? "Return Book" : "Borrow Book"}`;
    button.style.cssText = `${isBorrowed ? "background-color: #E94F37" : "background-color: #3BB273"}; border-radius: 1rem;height: 2.6rem ;width: 7rem; display:flex;justify-content:center ;align-items: center;font-size: 1rem; color:#FFFFFF;`

    button.addEventListener("click",(e)=>{
        e.preventDefault();
        const librariran = JSON.parse(localStorage.getItem("library"))
        const requiredbook = librariran.find((item)=>item.id === id);
        if(button.innerHTML === "Return Book" )
        {
            requiredbook.isBorrowed = false;
        }
        else
        {
            requiredbook.isBorrowed = true;
        }
        localStorage.setItem("library",JSON.stringify(librariran));
        currentTab=tab2;
        location.reload();
       
       
    })
   
    if(listitem)
    {
        listitem.appendChild(button);
    searchresult.appendChild(listitem)
    }
    else
    {
        searchresult.children[0].appendChild(button)
    }
    
    
    })

const listbookitem = (text,id,author,isBorrowed)=>{
    
    const listitem = document.createElement("li");
    listitem.classList.add("listitem");
    listitem.innerHTML= `${text} &nbsp  &nbsp &nbsp by ${author} &nbsp&nbsp&nbsp `
    const button = document.createElement("button");
    button.innerHTML = `${isBorrowed ? "Return Book" : "Borrow Book"}`;
    button.style.cssText = `${isBorrowed ? "background-color: #E94F37" : "background-color: #3BB273"}; border-radius: 1rem;height: 2.6rem ;width: 7rem; display:flex;justify-content:center ;align-items: center;font-size: 1rem; color:#FFFFFF;`

    button.addEventListener("click",(e)=>{
        e.preventDefault();
        const librariran = JSON.parse(localStorage.getItem("library"))
        const requiredbook = librariran.find((item)=>item.id === id);
        if(button.innerHTML === "Return Book" )
        {
            requiredbook.isBorrowed = false;
        }
        else
        {
            requiredbook.isBorrowed = true;
        }
        localStorage.setItem("library",JSON.stringify(librariran));
        location.reload();
    })
    listitem.appendChild(button);
    booklist.appendChild(listitem);
}



addbookform.addEventListener("submit",(e)=>{
    e.preventDefault();
  
    const formdata = new FormData(addbookform);
    let id = formdata.get("input_id");
    let title = formdata.get("title")
    let author = formdata.get("author_name");
   console.log(id,title,author)

    console.log(searchBook(title));
    if(searchBook(title))
    {
        return alert("Book Already Exist")
    }
    else
    {
        addBook(id,title,author);
    }
    

});



listAvailableBooks();



