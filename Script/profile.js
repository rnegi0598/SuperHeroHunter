const aboutEl=document.querySelector('.about');
const comicEl=document.querySelector('.comic');
const seriesEl=document.querySelector('.series');


loremText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, iure provident enim esse quidem fugiatLorem ipsum dolor sit amet consectetur adipisicing elit. Facere, iure provident enim esse quidem fugiat? Quis minus dolores, itaque eveniet unde laborum architecto est id labore et fuga dolorem aspernatur? Quis minus dolores, itaque eveniet unde laborum architecto est id labore et fuga dolorem aspernatur?";

async function displayProfile(id){
    searchQuery=`
    https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=77ce7d3102daafaaa9a139ef76fe789b&hash=81477754fbbff115257d613158113ecc
    `;
    const response=await fetch(searchQuery);
    const data=await response.json();
    result=data.data.results[0];
    imgLink=result.thumbnail.path+"."+result.thumbnail.extension
    aboutSection(result.name,imgLink,result.comics.available,result.series.available);
    comicSection(result.comics.items);
    seriesSection(result.series.items);

    
    

}


function aboutSection(name,imgLink,comicsCount,seriesCount){
    aboutEl.innerHTML=`
        <img src=${imgLink} alt="">
        <div class="profile-data">
            <p class="name-hero">${name}</p>
            <p class="comic-hero">Comics : ${comicsCount}</p>
            <p class="series-hero">Series : ${seriesCount}</p>
        </div>
        

    `;
}

async function comicSection(comics){
    // let response=await fetch(element.resourceURI);
    let arr=[];
    for(let i=0;i<comics.length;i++){
        element=comics[i];
        let response=await fetch(element.resourceURI+'?ts=1&apikey=77ce7d3102daafaaa9a139ef76fe789b&hash=81477754fbbff115257d613158113ecc');
        let data=await response.json();
        let result=data.data.results[0];
        obj={
            title:result.title,
            desc:result.description,
            thumbnail:result.thumbnail,
        }
        arr.push(obj);
    };

    // inserting into html
    comicEl.innerHTML='';
    arr.forEach(element => {
        if(element.desc==null){
            // insert random text if no desc found
            element.desc=loremText;
        }
        comicEl.innerHTML+=`
            <div class="comic-item">
                <img src=${element.thumbnail.path+"."+element.thumbnail.extension} >
                <div>
                    <p class="comic-title">${element.title}</p>
                    <p class="comic-desc">${element.desc}</p>
                </div>
            </div>
        `;
    });

}

async function seriesSection(series){
    // let response=await fetch(element.resourceURI);
    let arr=[];
    for(let i=0;i<series.length;i++){
        element=series[i];
        let response=await fetch(element.resourceURI+'?ts=1&apikey=77ce7d3102daafaaa9a139ef76fe789b&hash=81477754fbbff115257d613158113ecc');
        let data=await response.json();
        let result=data.data.results[0];
        obj={
            title:result.title,
            thumbnail:result.thumbnail,
        }
        arr.push(obj);
    };

    // inserting into html
    seriesEl.innerHTML='';
    arr.forEach(element => {
        seriesEl.innerHTML+=`
            <div class="series-item">
                <img src=${element.thumbnail.path+"."+element.thumbnail.extension} >
                <p class="series-title">${element.title}</p>
            </div>
        `;
    });

}
