/* JS file :) */

document.getElementById("submit").addEventListener("click", search_keywords);

// Get the input field
var input = document.getElementById("search");

// Submit with Enter key
input.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    input.blur();
    // Trigger the button element with a click
    document.getElementById("submit").click();
  }
});

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
    params.append('keyword', keyword);
    selectedYears.forEach(year => params.append('year', year));
    selectedProblems.forEach(type => params.append('problem_type', type));

    const resultsDiv = document.getElementById("searchResults");

    fetch('http://localhost:3000/api/result/?' + params.toString())
        .then(response => response.json())
        .then(data => {
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



function deselectAll(boxId) {
    const box = document.getElementById(boxId);
    const checkboxes = box.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => cb.checked = false);
}


function selectAll(boxId) {
    const box = document.getElementById(boxId);
    const checkboxes = box.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => cb.checked = true);
}



window.addEventListener("DOMContentLoaded", populateAutocomplete);

function populateAutocomplete() {
    fetch('http://localhost:3000/api/keyword')
        .then(response => response.json())
        .then(data => {
            const datalist = document.getElementById("keywords");
            const input = document.getElementById('search');

            // Update whenever the user types
            input.addEventListener('input', () => {
                const value = input.value.toLowerCase();
                datalist.innerHTML = ''; // Clear old options

                const numItems = 10; // The max number of items for the datalist
                const filtered = data
                .filter(row => row.keyword_text.toLowerCase().includes(value))
                .slice(0, numItems); // Limit to first 10 matches

                filtered.forEach(row => {
                    const option = document.createElement("option");
                    option.value = row.keyword_text;
                    datalist.appendChild(option);
                });
            });

        })
        .catch(error => {
            console.error('Error loading autocomplete keywords:', error);
        });
}