const favListEl=document.querySelector('.fav-list');
let favList=JSON.parse(localStorage.getItem('favourites')) || [];

favListEl.innerHTML='';
console.log(favList);
async function getFav(){
    for(i=0;i<favList.length;i++){
        id=favList[i];
        const response=await fetch(`https://gateway.marvel.com:443/v1/public/characters/${id}?ts=1&apikey=77ce7d3102daafaaa9a139ef76fe789b&hash=81477754fbbff115257d613158113ecc`);
        const data=await response.json();
        const results=data.data.results[0];
        
        // create dom element
        favItem=document.createElement('div');
        favItem.classList.add('fav-item');
        favImage=document.createElement('div');
        favImage.classList.add('fav-image');
        imgLink=`${results.thumbnail.path}.${results.thumbnail.extension}`
        favImage.innerHTML=`<img src=${imgLink}>`;
        favItem.appendChild(favImage);
        favDes=document.createElement('div');
        favDes.classList.add('fav-desc');
        favItem.appendChild(favDes);
        favName=document.createElement('span');
        favName.classList.add('fav-name');
        favName.innerHTML=`${results.name}`;
        favRem=document.createElement('span');
        favRem.classList.add('fav-remove');
        favRem.setAttribute('id',`f${results.id}`);
        favRem.innerHTML='<img src="./Images/delete-red.svg">'
        favDes.appendChild(favName);
        favDes.appendChild(favRem);

        favListEl.appendChild(favItem);


        // add event listener on delete btn
        document.getElementById(`f${results.id}`).addEventListener('click',()=>{
            id=`${results.id}`;
            id=parseInt(id);
            ind=favList.indexOf(id);
            if(ind>-1){
                favList.splice(ind,1);
            }
            localStorage.setItem('favourites',JSON.stringify(favList));
            location.reload();
        });
    }
}

getFav();

