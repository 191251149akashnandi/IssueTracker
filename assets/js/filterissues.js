// accessing form and divs from issue_form
let filterIssueForm = document.getElementById('filter-issue-form');
let issuesJson = document.getElementById('issue-data').getAttribute('data');

//parssing issue data from div
let issues = JSON.parse(issuesJson);

//accessing issue lists from issues 
let issueList = document.getElementById('issues-list');


filterIssueForm.addEventListener('submit', function (e) {
  e.preventDefault();

  let filteredIssues = [];

//   accessing labels by querySelector
  let labelsList = filterIssueForm.querySelectorAll('input[type=checkbox]');
  
  //adding multiple arrays of labels by '...' method
  let labelsElements = [...labelsList].filter((Element) => Element.checked);

//   accessing authors
  let authorVal = filterIssueForm.querySelector(
    'input[type=radio][name=author]:checked'
  ).value;

//   mapping and adding labels array
  let [...labelsArr] = labelsElements.map((Element) => Element.value);

  issues.map((el) => {
    if (el.author == authorVal) {
      if (!filteredIssues.includes(el)) {
        filteredIssues.push(el);
      }
    }
    labelsArr.map((label) => {
      if (el.labels.includes(label)) {
        if (!filteredIssues.includes(el)) {
          filteredIssues.push(el);
        }
      }
    });
  });
  
  //sending data from DOM to backend
  issueList.innerHTML = '';
  for (let issue of filteredIssues) {
    let Div = document.createElement('div');
    Div.style = 'none';
    Div.innerHTML = `
      <h1>Title : ${issue.title} </h1>
      <h3>Author : ${issue.author}</h3>
      <h4>
        Description : ${issue.description}
      </h4>
  `;
    issueList.appendChild(Div);
  }
});
