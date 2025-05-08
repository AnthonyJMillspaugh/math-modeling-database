/* JS file :) */

document.getElementById("submit").addEventListener("click", search_keywords);

function search_titles() { // Do we want or need this?
    let input = document.getElementById('search').value.toLowerCase();
    let results = [];

     fetch('http://localhost:3000/api/paper')
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


function search_keywords() {
    // Get the keyword
    const keyword = document.getElementById('search').value.toLowerCase();
    let matchingPapers = [];

    // Get the parameters
    const params = new URLSearchParams();
    const yearBoxes = document.querySelectorAll('#yearBox input[type="checkbox"]:checked');
    const selectedYears = Array.from(yearBoxes).map(cb => cb.value);
    const problemBoxes = document.querySelectorAll('#problemBox input[type="checkbox"]:checked');
    const selectedProblems = Array.from(problemBoxes).map(cb => cb.value);
    selectedYears.forEach(year => params.append('year', year));
    selectedProblems.forEach(type => params.append('problem_type', type));

    const resultsDiv = document.getElementById("searchResults");

    if (keyword === "") {
        resultsDiv.innerHTML = "";
        return;
    }

    fetch('http://localhost:3000/api/result/' + keyword + '?' + params.toString())
        .then(response => response.json())
        .then(data => {
            // Filter papers where any keyword matches the input
            // matchingPapers = data.filter(paper => 
            //     paper.keywords &&
            //     paper.keywords.some(kw => kw.toLowerCase().includes(input))
            // );
            matchingPapers = data;

            if (matchingPapers.length === 0) {
                resultsDiv.innerHTML = "No matches found.";
                return;
            }

            // Create table
            let table = `<table border='1'>
                <thead><tr>
                    <th>Team</th>
                    <th>Title</th>
                    <th>Link</th>
                    <th>Keywords</th>
                    <th>Year</th>
                    <th>Problem</th>
                    <th>Problem Title</th>
                    <th>Problem Link</th>
                </tr></thead>
                <tbody>`;
                matchingPapers.forEach((row, index) => {
                    //const rowColor = index % 2 === 1 ? "#5DE2E7" : "#EFC3CA"; // light gray and white
                    table += `<tr>
                        <td>${row.team_control_num}</td>
                        <td>${row.title}</td>
                        <td><a href="${row.paper_link}" target="_blank">View Paper</a></td>
                        <td>${row.keywords ? row.keywords.split(",").join(", <br><br>") : ""}</td>
                        <td>${row.year}</td>
                        <td>${row.problem_type}</td>
                        <td>${row.problem_title}</td>
                        <td><a href="${row.problem_link}" target="_blank">View Problem</a></td>
                    </tr>`;
                });
            table += "</tbody></table>";

            resultsDiv.innerHTML = table;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}



window.addEventListener("DOMContentLoaded", populateAutocomplete);

function populateAutocomplete() {
    fetch('http://localhost:3000/api/keyword')
        .then(response => response.json())
        .then(data => {
            const datalist = document.getElementById("keywords");
            // Old code
            //const allKeywords = data.flatMap(paper => paper.keywords || []);
            //const uniqueKeywords = [...new Set(allKeywords.map(k => k.toLowerCase()))];

            // Clear previous options
            datalist.innerHTML = "";

            // Add options to datalist
            data.forEach(row => {
                const option = document.createElement("option");
                option.value = row.keyword_text;
                datalist.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error loading autocomplete keywords:', error);
        });
}