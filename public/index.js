/* let's go! */

const getElementById = (element) =>{
    return document.getElementById(element)
}
const fetch= (method,url,cb) =>{
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200){
                cb(JSON.parse(xhr.responseText))
            }
        }
    };
    xhr.open(method, url);
    xhr.send();
}
const handleUser = (data) =>{
    getElementById("github-user-link").href=data.html_url
    getElementById("github-user-handle").textContent =data.login
    getElementById("github-user-avatar").src=data.avatar_url
    getElementById("github-user-repos").textContent=data.public_repos
}
const handleDetails = (data) =>{
    let star=0
    const languages=[]
    data.forEach(repo => {
        star +=repo.stargazers_count
        if(languages.indexOf( repo.language) === -1 && repo.language != null) {
            languages.push(repo.language)
        }
    });
    getElementById("github-repos-languages").textContent=languages.join(',')
    getElementById("github-repos-stars").textContent=star  
}
const handleRepos = (data) =>{
    getElementById('github-repo-link').href=data[0].html_url
     getElementById("github-repo-name").textContent=data[0].name
     getElementById("github-repo-created").textContent=data[0].created_at
     getElementById("github-repo-open-issues").textContent=data[0].open_issues_count
     getElementById("github-repo-watchers").textContent=data[0].watchers_count
     fetch("GET",data[0].contributors_url,handleContributions)    
}
const handleContributions = (data) => {
    const contributors=data.map(contributor => contributor.login )
    getElementById("github-repo-contributors").textContent=contributors.join(',')
}

getElementById('form').addEventListener('submit',(e)=>{
    e.preventDefault();
    const username=getElementById('input-name').value
    const url =`https://api.github.com/users/${username}`
    const urlRepos=`https://api.github.com/users/${username}/repos`
    fetch("GET",url,handleUser)
    fetch("GET",urlRepos,handleDetails)
    fetch("GET",urlRepos,handleRepos)
})
let url =`https://api.github.com/users/karam-zomlut`
let urlRepos=`https://api.github.com/users/karam-zomlut/repos`
fetch("GET",url,handleUser)
fetch("GET",urlRepos,handleDetails)
fetch("GET",urlRepos,handleRepos)