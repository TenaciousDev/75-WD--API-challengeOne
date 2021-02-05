const baseURL = 'https://cat-fact.herokuapp.com';
const factArea = document.querySelector('#displayFact');
const getFactBtn = document.querySelector('#getFact');
let url;
getFactBtn.addEventListener('click', fetchFact);

function fetchFact(e) {
  console.log(e);
  url = baseURL + '/facts/random?animal+type=cat&amount=1';
  console.log(url);
  fetch(url)
    .then(function(result){
      return result.json();
    }).then(function(json){
      // some of the "facts" submitted by uses are really stupid or obvious placeholder text, but most of those are shorter than 18 characters. So:
      if(json.text.length < 18){
        console.log("not enough characters, this probably wasn't a very good fact anyway");
        fetchFact();  // recursion!!! Squeeeee!
      } else {
      displayFact(json);
    }
    })

function displayFact(json){
  while (factArea.firstChild){
    factArea.removeChild(factArea.firstChild);
  }
  let text = json.text;
    let fact = document.createElement('p');
    fact.textContent = text;
    console.log(text);
    factArea.appendChild(fact);
  }
}