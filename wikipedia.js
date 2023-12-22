let searchInputEl = document.getElementById("searchBox");
let searchResults = document.getElementById("searchResults");
let spinner = document.getElementById("spinner");
// let clearBtn = document.getElementById("clearButton");

/*function clearSearch()
{
    clearBtn.addEventListener("click", function()
    {
        searchResults.textContent = "";
        searchInputEl.value ="";
        clearBtn.classList.toggle("d-flex");
    });
}*/
function createAndAppendresults(result)
{
    
    let {title, link, description} = result;
    //1. create search item div
    let searchItem = document. createElement("div");
    searchItem.classList.add("searchItem");
    searchResults.appendChild(searchItem);

    // 2. add heading text as link  to search item div
    let header = document. createElement("a");
    header.classList.add("searchTitle");
    header.href = link;
    header.target = "_blank";
    header.textContent = title;
    searchItem.appendChild(header);

    // 3. adding a brake statement
    let br1 = document.createElement("br");
    searchItem.appendChild(br1);

    // 4 . add original link to search item div
    let addLink = document.createElement("a");
    addLink.classList.add("searchLink");
    addLink.textContent = link;
    addLink.href = link;
    searchItem.appendChild(addLink);

    let br2 = document.createElement("br");
    searchItem.appendChild(br2);
    
    // 5. add description of search to serach item div
    let addDescription = document.createElement("p");
    // addDescription.classList.add("searchDescription");
    addDescription.textContent = description;
    searchItem.appendChild(addDescription);
    
}

function display_Results(search_results)
{
    spinner.classList.toggle("d-none");
    for(let result of search_results)
    {
        
        createAndAppendresults(result);
    }
    //clearSearch();
}
function searchWikipedia(event)
{
    if(event.key === "Enter")
    {
        spinner.classList.toggle("d-none");
        searchResults.textContent ="";
        let searchInput = searchInputEl.value ;
        //clearBtn.classList.add("d-flex");
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;

        let options = 
        {
            method : "GET"
        };
        fetch(url,options)
        .then(function (response)
        {
            return response.json();

        })

        .then(function(jsonData)
        {
            // console.log(jsonData);
            let {search_results} = jsonData;
            if(Object.keys(search_results).length === 0)
            {
                spinner.classList.add("d-none");
                let invalidHeader = document.createElement("h3");
                invalidHeader.classList.add("invalidInput");
                invalidHeader.textContent = "404 Error page not found";
                searchResults.appendChild(invalidHeader);
                // clearSearch();
                return;
            }
            display_Results(search_results);
        })
    }
}
searchInputEl.addEventListener("keydown",searchWikipedia)