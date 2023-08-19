//get the form
let searchIssueForm = document.getElementById('search-issue-form');
let searchJson = document.getElementById('issue-data').getAttribute('data');
let searchIssues = JSON.parse(searchJson);
let searchList = document.getElementById('issues-list');

searchIssueForm.addEventListener('submit', function (e) {
  e.preventDefault();

  let searchedIssues = [];    


  let titleValue = searchIssueForm.querySelector('input[name="tie"]').value;
  let descriptionValue =
    searchIssueForm.querySelector('input[name="des"]').value;

  //add issue to searched issues array
  searchIssues.map((el) => {
    if (el.title == titleValue || el.description == descriptionValue) {
      if (!searchedIssues.includes(el)) {
        searchedIssues.push(el);
      }
    }
  });

  //create a div and add details of the searched issues
  searchList.innerHTML = '';
  for (let issue of searchedIssues) {
    let Div = document.createElement('div');
    Div.style = 'none';
    Div.innerHTML = `
     
      <h1 class="card-title">Title : ${issue.title} </h1>
      <h3 class="card-title">Author : ${issue.author}</h3>
      <h4 class="card-subtitle mb-2 text-muted">
        Description : ${issue.description}
      </h4>
  `;
    searchList.appendChild(Div);
  }
});