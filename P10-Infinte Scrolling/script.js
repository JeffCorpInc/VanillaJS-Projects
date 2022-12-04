const search = document.getElementById("filter");
const post_container = document.getElementById('post-container');
const loader = document.getElementById("loader");

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
    loader.classList.add("show");
    setTimeout(() => {
        loader.classList.remove("show");
    } , 1000);
}

//event handler 
window.addEventListener( 'scroll' , () => {
        
    const { scrollTop , scrollHeight , clientHeight } = document.documentElement;
    if (scrollTop + clientHeight === scrollHeight) {
        showloader();
    }
})