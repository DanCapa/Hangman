// Hangman Project

playAgain();

const newGame = document.querySelector(".new-game");

if (newGame) {
  newGame.addEventListener("click", function (e) {
    e.preventDefault();
    document.location.href = "index.html";
    playAgain();
  });
}

function playAgain() {
  const fetchFileUrl = "https://www.wordgamedb.com/api/v2/words/random";

  fetch(fetchFileUrl)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      let word = data.word;
      let hint = data.hint;
      const output = document.querySelector(".output");
      const buttons = document.querySelectorAll("button");
      const hintDom = document.querySelector(".hint");
      if (hintDom) {
        hintDom.innerHTML += `<h2>Hint : " ${hint} "</h2>`;
        for (let i = 0; i < word.length; i++) {
          const p = document.createElement("p");
          p.textContent = "_____";
          p.style.display = "inline-block";
          p.style.margin = "0 5px";
          output.appendChild(p);
        }
      }

      const paragraphs = document.querySelectorAll(".output p");
      const mainImage = document.querySelector(".main-image");
      const loadDom = document.querySelector(".load");
      const answerDom = document.querySelector(".answer");

      let letter = "";
      let count = 0;
      let letterCount = 0;

      buttons.forEach((button) => {
        button.addEventListener("click", function (e) {
          e.preventDefault();
          letter = e.target.textContent;
          // Disable it regardless if its correct or not
          e.target.disabled = true;
          let isTrue = false;

          // Loop only if correct
          for (let i = 0; i < paragraphs.length; i++) {
            if (letter.toUpperCase() == word[i].toUpperCase()) {
              paragraphs[i].textContent = word[i].toUpperCase();
              paragraphs[i].style.padding = "10px 15px";
              paragraphs[i].style.margin = "0px 10px 20px 10px";
              paragraphs[i].style.backgroundColor = "#6197ef";
              paragraphs[i].style.color = "#fff";
              paragraphs[i].style.fontWeight = "bold";
              paragraphs[i].style.borderRadius = "5px";
              paragraphs[i].style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.2)";
              paragraphs[i].style.transition =
                "transform 0.3s ease, background-color 0.3s ease";
              paragraphs[i].style.transform = "scale(1.2)";
              setTimeout(() => {
                paragraphs[i].style.transform = "scale(1)";
              }, 300);

              isTrue = true;
              letterCount += 1;
            }
          }

          const htmlLocations = {
            winner: "winner.html",
            loser: "gameover.html",
          };

          if (letterCount == word.length) {
            loadDom.style.display = "block";
            setTimeout(() => {
              window.location.href = htmlLocations.winner;
            }, 2000);
          }

          // If it is not correct, set hangman
          if (!isTrue) {
            count += 1;
            mainImage.setAttribute("src", `../img/hangman/${count}.jpg`);
          }
          if (count > 9) {
            loadDom.style.display = "block";
            answerDom.innerHTML += `<h2>The answer is: ${word.toUpperCase()}</h2>`;
            setTimeout(() => {
              window.location.href = htmlLocations.loser;
            }, 3000);
          }
        });
      });
    });
}
