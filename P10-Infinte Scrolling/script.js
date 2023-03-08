const search = document.getElementById("filter");
const post_container = document.getElementById("post-container");
const loader1 = document.getElementById("loader");

let limit=5;
let page=1;

// get data fromk the api
async function getdata(){
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
    const data = await res.json();                                                                            //fetched data in result...res ka data json me store karke return kara lenge  
    return data;    
}

// show data after fetch
async function showdata(){
    const posts = await getdata();
    posts.forEach( post => {
            const postElement = document.createElement("div");
            postElement.classList.add("post");
            postElement.innerHTML = `
            <div class="number">${post.id}</div>
            <div class="post-info">
                <h2 class="post-title">${post.title}</h2>
                <p class="post-body">${post.body}</p>
            </div>
            `;
            post_container.appendChild(postElement);
        }
    );
}
showdata();

//function to show loader 
function showloader(){
    loader1.classList.add('show');

    setTimeout( () => {
        loader1.classList.remove("show");

        setTimeout( ()=> {
            page++;
            showdata();
        } , 250)

    } , 1000);
}

//function to filter post 
function filterposts(e){
    const filterterm = e.target.value.toUpperCase();
    const allposts = document.querySelectorAll(".post");                            //queryselector se hamne sare node get krliye of const me save krliya
    allposts.forEach( post => {                                                     //forEach lagakr hamne sare div jinme pos-title or post-body ki class he wo save karle const me 
        const title = post.querySelector(".post-title").innerText.toUpperCase();
        const body = post.querySelector(".post-body").innerText.toUpperCase();

        if (title.indexOf(filterterm) > -1 || body.indexOf(filterterm) > -1){        //indexOf dekhe ga ke filterterm me "title" he ya nhi or value bari ho -1 se to function apply kre  
            post.style.display = "flex";
        } else {
            post.style.display = "none";
        }
    })   
}

//event handler 
//1- event handler for page scrolling 
window.addEventListener("scroll", () => {
        const { scrollTop , scrollHeight , clientHeight } = document.documentElement;
        if( scrollTop + clientHeight === scrollHeight - 75 ){
            showloader();
        }
    }
)
//2- filter posts
search.addEventListener("input" , filterposts);