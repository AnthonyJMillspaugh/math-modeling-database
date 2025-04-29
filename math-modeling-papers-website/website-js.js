/* JS file :) */

document.getElementByID("submit").addEventListener("click", search_titles());

function search_titles() {
    let input = document.getElementById('search').value.toLowerCase();

    const testList = ["This", "Is", "The", "Test", "Search", "List", "Until", "We", "Connect", "The", "Database"];
    let results = [];

    for (i = 0; i < testList.length; i++) {
        if (testList[i].toLowerCase().includes(input)) {
            results.push(testList[i]);
        }
    }

    const resultsDiv = document.getElementById("searchResults");
    if (results.length > 0) {
        resultsDiv.innerHTML = results.join(", ");
    } else {
        resultsDiv.innerHTML = "No matches found.";
    }
}
