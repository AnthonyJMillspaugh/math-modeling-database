/* JS file :) */

document.getElementById("submit").addEventListener("click", search_titles);

function search_titles() {
    let input = document.getElementById('search').value.toLowerCase();
    let results = [];

     fetch('http://localhost:3000/paper')
        .then(response => response.json())
        .then(data => {
            const paperTitles = data.map(item => item.title);

            for (let i = 0; i < paperTitles.length; i++) {
                if (input === "") {
                    break;
                } else if (paperTitles[i].toLowerCase().includes(input)) {
                    results.push(paperTitles[i]);
                }
            }

            const resultsDiv = document.getElementById("searchResults");
            if (results.length > 0) {
                resultsDiv.innerHTML = results.join(", ");
            } else if (results.length === 0 && input === "") {
                resultsDiv.innerHTML = "";
            } else {
                resultsDiv.innerHTML = "No matches found.";
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}
