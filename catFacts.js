const baseURL = "https://cat-fact.herokuapp.com";
const factArea = document.querySelector(".fact-area");
const getFactBtn = document.querySelector(".feed");
let url;
let clickCount = 0;
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
      } else if (json.text.includes("*@*mail.*" || "*youtu.be*")) {
        console.log("this is not a cat fact");
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
    let factChars = text.length;
    let factStyle = fact.style;
    fact.className = "fact-bubble";
    fact.textContent = text;
    if (factChars < 80) {
      factStyle.width = factChars / 1.5 + "ch";
      factStyle.padding = "5px";
      factStyle.left = (factChars + 700) / 1.5 + "px";
      factStyle.top = (factChars + 50) / 1.5 + "px";
    } else if (factChars < 180) {
      factStyle.width = factChars / 2 + "ch";
      factStyle.padding = "5px";
      factStyle.left = (factChars + 500) / 2 + "px";
      factStyle.top = (factChars + 30) / 2 + "px";
    } else if (factChars < 250) {
      factStyle.width = factChars / 3 + "ch";
      factStyle.padding = "5px";
      factStyle.left = (400 - factChars) * 3 + "px";
      factStyle.top = (factChars - 50) / 3 + "px";
    } else {
      factStyle.width = factChars / 4 + "ch";
      factStyle.padding = "5px";
      factStyle.left = (400 - factChars) * 2.5 + "px";
      factStyle.top = (factChars - 100) / 3 + "px";
    }
    // console.log(text);
    factArea.appendChild(fact);
    clickCount++;
    // console.log(clickCount);
    if (clickCount >= 60) {
      document.querySelector(".feed").style.marginTop = "15ch";
    }
    showHidden(clickCount);
  }

  function showHidden(i) {
    let hiddenId = document.querySelector(`#show-${i}`);
    // let showId = hiddenId.style.display;
    if (hiddenId) {
      hiddenId.style.display = "inline";
    } else {
      return;
    }
  }
}
