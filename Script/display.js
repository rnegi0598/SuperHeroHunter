const inputEl=document.querySelector('.search-box input');
const homeEl=document.querySelector('.home');
const containerEl=document.querySelector('.container');
const searchKeyEl=document.querySelector('.search-key');
const displayEl=document.querySelector('.display');
const searchBarEl=document.querySelector('.search-bar');
const profileDivEl=document.querySelector('.profile-div');

let favList=JSON.parse(localStorage.getItem('favourites')) || [];


inputEl.value="";
// search super hero
inputEl.addEventListener('change',async ()=>{
    
    searchQuery=`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${inputEl.value}&apikey=77ce7d3102daafaaa9a139ef76fe789b`;
    searchQuery+='&ts=1&hash=81477754fbbff115257d613158113ecc';
    const response=await fetch(searchQuery);
    const data=await response.json();
    const results=data.data.results;
    displayMarvels(results,inputEl.value);    
    inputEl.value="";
});

// display all marvels on home page
getAllMarvels();

homeEl.addEventListener('click',()=>{
    getAllMarvels();
    // unhide home(searchBarEl displayEl) hide profile(profile-div)
    searchBarEl.classList.remove('hide');
    displayEl.classList.remove('hide');
    profileDivEl.classList.add('hide');
});

//on initial load and when home is clicked
async function getAllMarvels(){
    const response=await fetch('https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=77ce7d3102daafaaa9a139ef76fe789b&hash=81477754fbbff115257d613158113ecc');
    data=await response.json();
    data=data.data;
    results=data.results;
    displayMarvels(results,'');

}





function displayMarvels(results,searchKey){
    if(searchKey!=''){
        searchKeyEl.innerHTML=`Showing results for "${searchKey}"`;
    }else{
        searchKeyEl.innerHTML='';
    }
    
    containerEl.innerHTML='';
    results.forEach(element => {

        childDiv=document.createElement('div');
        childDiv.classList.add('child');
        imageDiv=document.createElement('div');
        imageDiv.classList.add('image');
        imageDiv.setAttribute('id',element.id);
        a=document.createElement('a');
        image=document.createElement('img');
        image.src=element.thumbnail.path+"."+element.thumbnail.extension;
        p=document.createElement('p');
        p.innerHTML=`<span class="hero-name">${element.name}</span><span class="fav" ><img src="./Images/favRed.svg"></span>`;
        a.appendChild(image);
        imageDiv.appendChild(a);
        imageDiv.appendChild(p);
        childDiv.appendChild(imageDiv);
        containerEl.appendChild(childDiv);
        // add event listener on fav button
        favBtn=imageDiv.lastChild.lastChild;
        favBtn.addEventListener('click',()=>{
            // to not add duplicate element
            if(!favList.includes(element.id)){
                favList.push(element.id);
                localStorage.setItem('favourites',JSON.stringify(favList));
            }
            

        })
        // adding eventlistener for profile view
        const profileEl=document.getElementById(element.id);
        const profileImg= profileEl.firstChild.lastChild;
        profileImg.addEventListener('click',(e)=>{
            displayProfile(profileEl.id);
            //hide home(searchBarEl displayEl) unhide profile(profile-div)
            searchBarEl.classList.add('hide');
            displayEl.classList.add('hide');
            profileDivEl.classList.remove('hide');

        });

    });


}


