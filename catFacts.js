const baseURL = "https://cat-fact.herokuapp.com";
const factArea = document.querySelector(".fact-area");
const getFactBtn = document.querySelector(".feed");
let url;
getFactBtn.addEventListener("click", fetchFact);

function fetchFact(e) {
  // console.log(e);
  url = baseURL + "/facts/random?animal+type=cat&amount=1";
  console.log(url);
  fetch(url)
    .then(function (result) {
      return result.json();
    })
    .then(function (json) {
      // some of the "facts" submitted by uses are really stupid or obvious placeholder text, but most of those are shorter than 18 characters. I'd also like to limit the length of characters, so I don't run into overflow issues. So:
      if (json.text.length < 18) {
        console.log("not enough characters, fetching a different fact");
        fetchFact(); // recursion!!! Squeeeee!
      } else if (json.text.length > 300) {
        console.log("too many characters, fetching a different fact");
        fetchFact();
      } else {
        displayFact(json);
      }
    });

  function displayFact(json) {
    while (factArea.firstChild) {
      factArea.removeChild(factArea.firstChild);
    }
    let text = json.text;
    let fact = document.createElement("p");
    fact.className = "fact-bubble";
    fact.textContent = text;
    let factChars = text.length;
    let factStyle = fact.style;
    if (factChars < 80) {
      factStyle.width = text.length / 2 + "ch";
      factStyle.padding = "5px";
    } else {
      factStyle = text.length / 3 + "ch";
      factStyle.padding = "5px";
    }
    console.log(text);
    factArea.appendChild(fact);
  }
}
