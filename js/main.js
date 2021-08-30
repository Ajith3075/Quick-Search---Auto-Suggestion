const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

//search the json file and retur the value
const searchStates = async searchText => {
//creating a fetch api for calling the json file
const res = await fetch("/data/states.json");
const states = await res.json();


//get matches to the current text input that will change

let matches = states.filter(state => {
    const regex = new RegExp(`^${searchText}`,'gi');
    return state.name.match(regex) || state.abbr.match(regex);
});

if(searchText.length==0){
    matches = [];

}
outputHtml(matches);

};

const outputHtml = matches =>{
    if (matches.length >0){
        const html = matches.map(match =>`
        <div class = "card card-body mb-1">
        <h4> ${match.name} (${match.abbr})</h4><span class = "text-primary"> ${match.capital}</span></h4>
        <small>Lat: ${match.lat} / Long: ${match.long}</small>
        </div>
        `).join('');
        matchList.innerHTML=html;
    }
};
//passing the value as an argument for calling the search
search.addEventListener('input',()=> searchStates(search.value));