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
      // some of the "facts" submitted by users are really stupid or obvious placeholder text, but most of those are shorter than 18 characters. I'd also like to limit the length of characters, so I don't run into overflow issues. So:
      if (json.text.length < 18) {
        console.log("not enough characters, fetching a different fact");
        fetchFact(); // recursion!!! Squeeeee!
      } else if (json.text.length > 300) {
        console.log("too many characters, fetching a different fact");
        fetchFact(); //recursion again
        // filter out email addresses and URLs, may not catch everything but it gets most of them
      } else if (json.text.includes("*@*mail.*" || "*youtu.be*" || "*http*")) {
        console.log("this is not a cat fact");
        fetchFact(); //and once more, recursion. I just like pointing out recursion, it makes me happy
      } else {
        displayFact(json);
      }
    });
  // I wanted to have facts of different sizes show up in different areas around the screen. The code below doesn't accomplish what I originally envisioned perfectly, but I'm happy with the result.
  //
  //I've tested placement with 1000+ API calls of varying character counts and ironed out the math as best I can. At this point, there SHOULDN'T be any spacing bugs, but my experience is that the very first time someone other than me uses something I've built, that's when the bug will happen. So fingers crossed.
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
    // console.log(text); // <-- uncomment for testing
    factArea.appendChild(fact);
    clickCount++;
    // console.log(clickCount); // <-- uncomment for testing
    if (clickCount >= 60) {
      document.querySelector(".feed").style.marginTop = "15ch";
    }
    showHidden(clickCount);
  }

  // I'm pretty proud of this idea (below). Before I added this, my project was pretty boring: click a button, get a cat fact. So I decided to spice it up a bit with a growing list of 'secret messages' that are tied to the click-count since initial page load. At least this way, there's more than one interactive thing happening on the screen.
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
