
var $tbody = document.querySelector("tbody");
var $searchType = document.querySelector("#searchType");
var $searchInput = document.querySelector("#searchText");
var $searchBtn = document.querySelector("#search");


var $records_per_page =document.querySelector("#recordsPerPage");
var records_per_page = $records_per_page.value;


$searchBtn.addEventListener("click", handleSearchButtonClick);
$records_per_page.addEventListener("change", updateRecordsPerPage);


var ufoSightings = dataSet;


var current_page = 1;
var max_page = 0;
var min_page = 0;

window.onload = function() {
   
    renderTable(1);
};

function updateRecordsPerPage() {
    records_per_page=$records_per_page.value;
    renderTable(1);
}



function renderTable(page) {
    $tbody.innerHTML = "";

  
    if(page % 10 > 0){

        min_page = +(page - (page % 10)) + +1;
        max_page = +page + +(10 - (page % 10));

        paginate(min_page, max_page);

        
    }
    else {

        min_page = page - 9;
        max_page = page;

        paginate(min_page, max_page);
    }
        
    current_page = page;

  
    $pageActive = document.querySelector("#page" + current_page);
    $pageActive.setAttribute("class", "page-item active");

    
   
    if (current_page < 1) current_page = 1;
    if (current_page > numPages()) current_page = numPages();

    for (var i = (current_page-1) * records_per_page; i < (current_page * records_per_page) && i < dataSet.length; i++) {
         
        var ufo = ufoSightings[i];
        var fields = Object.keys(ufo);
        var rowIndex = 0;
       
        
        var $row = $tbody.insertRow(rowIndex);
        for (var j = 0; j < fields.length; j++) {
            
            var field = fields[j];
            var $cell = $row.insertCell(j);
            $cell.innerText = ufo[field];
        }
        rowIndex++;   

    }

    if (current_page == 1) {
        document.querySelector('#pagePrev').setAttribute('class', 'page-item disabled');
    } else {
        document.querySelector('#pagePrev').setAttribute('class', 'page-item');
    }

    if (current_page == numPages()) {
        document.querySelector('#pageNext').setAttribute('class', 'page-item disabled');
    } else {
        document.querySelector('#pageNext').setAttribute('class', 'page-item');
    }
}

function handleSearchButtonClick() {
    console.log('Inside click');
    
    var filterSearch = $searchInput.value.trim().toLowerCase();
    var searchType = $searchType.value;
    console.log('Filter Search: ' + filterSearch);
    console.log('Search Type: ' + searchType);
    
    
    ufoSightings = dataSet.filter(function (ufo) {
        var ufoDateTime = ufo.datetime.toLowerCase();
        var ufoCountry = ufo.country.toLowerCase();
        var ufoState = ufo.state.toLowerCase();
        var ufoCity = ufo.city.toLowerCase();
        var ufoShape = ufo.shape.toLowerCase();
        
        var returnSearch = "";

       
        switch(searchType)
        {
            case '1':
                returnSearch = ufoDateTime;
                break;
            case '2':
                returnSearch = ufoCountry;
                break;
            case '3':
                returnSearch = ufoState;
                break;
            case '4':
                returnSearch = ufoCity;
                break;
            case '5':
                returnSearch =  ufoShape;
                break;
            default:
                returnSearch = ufoDateTime;
                break;
        }

        return returnSearch === filterSearch;
    });

   
    renderTable(1);

}

function numPages() {
    return Math.ceil(ufoSightings.length / records_per_page);
}



function prevPage()
{
    if (current_page > 1) {
        current_page--;
        renderTable(current_page);
    }
}


function nextPage()
{
    if (current_page < numPages()) {
        current_page++;
        renderTable(current_page);
    }
}
function paginate(min_page, max_page) {

   
    var $pages = document.querySelector("#pages");
    
    $pages.innerHTML = '';

    
    var li = document.createElement("li"); 
    li.setAttribute("id", "pagePrev"); 
    li.setAttribute("class", "page-item") 

    var link = document.createElement("a"); 
    link.setAttribute('class', 'page-link');
    link.setAttribute('id', 'btn_prev'); 
    link.innerHTML = '<<';
    link.addEventListener("click", prevPage);

    li.appendChild(link);
    $pages.appendChild(li);

    link = undefined;
    li = undefined;

    
    for(x=min_page;x<=max_page;x++) {
        var li = document.createElement("li"); 
        li.setAttribute("id", "page" + x); 
        li.setAttribute("class", "page-item") 

        var link = document.createElement("a"); 
        link.setAttribute('class', 'page-link');
        link.setAttribute('id', 'link' + x); 
        link.innerHTML = x; 
        
        link.addEventListener("click", function () {
            renderTable(this.innerHTML);
        }, false);


        li.appendChild(link);

        $pages.appendChild(li);

        link = undefined;
        li = undefined;

        }

  
    var li = document.createElement("li"); 
    li.setAttribute("id", "pageNext"); 
    li.setAttribute("class", "page-item") 

    var link = document.createElement("a"); 
    link.setAttribute('class', 'page-link');
    link.setAttribute('id', 'btn_next'); 
    link.innerHTML = '>>';
    link.addEventListener("click", nextPage);

    li.appendChild(link);
    $pages.appendChild(li);

    link = undefined;
    li = undefined;
    
    
  }