// function to wait for an element to appear on the page and then execute a callback
function waitForElement(selector, callback, timeout = 10000) { 
  const startTime = new Date().getTime();
  // check for the element every 100ms
    const checkInterval = setInterval(() => {
      const element = document.querySelector(selector);
      if (element) {
        clearInterval(checkInterval);
        callback(element);
      }
      // if the element is not found after 10s, log an error 
      else if (new Date().getTime() - startTime > timeout) {
        clearInterval(checkInterval);
        console.error(`Timeout after waiting ${timeout}ms for element "${selector}"`);
      }
    }, 100);
}

// function to get the problem info from the page and format it for the prompt
const getProblemInfo = () => {
    const problem_header = document.querySelector('.problems_header_content__title__L2cB2.g-mb-0')
    const problem_content = document.querySelector('.problems_problem_content__Xm_eO')
    let problem_info  = "Problem Title: "
    problem_info += problem_header.innerText + "\nProblem Content:\n```\n"
    problem_info += problem_content.innerText + "\n"
    problem_info += "```"
    return problem_info
};

// function to add the problem info to the prompt
const addPrompt = (problemAndCode) => {
    return `
"""
${problemAndCode}
"""
`
}

// function to display the code review overlay
const display_code_review = () => {
  // create the overlay
    const overlay = document.createElement('div');
    overlay.style.display = 'block';
    overlay.classList.add('overlay-code-review');
  // create the code review div where the code review will be displayed
    const code_review_div = document.createElement('div');
    code_review_div.classList.add('code_review_div');
  // create the code review text element
    const code_review_text = document.createElement('p');
    code_review_text.innerHTML = '<img src="https://s6.imgcdn.dev/tq4EB.gif" width="100px" height="100px" style="display: block; margin: 0 auto;"/>'; // loading gif while there is no code review
    code_review_text.classList.add('code_review_text');
  // create the code review title div
    const code_review_title_div = document.createElement('div');
    code_review_title_div.classList.add('code_review_title_div');
  // create the close button
    const close_button = document.createElement('button');
    close_button.classList.add('code_review_close');
    close_button.innerHTML = 'x';
    close_button.addEventListener('click', () => {
        overlay.style.display = 'none';
    });
  // create the code review title
    const code_review_title = document.createElement('h2');
    code_review_title.classList.add('code_review_title');
    code_review_title.innerHTML = 'Code Review';
  // append the elements to the overlay
    code_review_title_div.appendChild(code_review_title);
    code_review_title_div.appendChild(close_button);

    code_review_div.appendChild(code_review_title_div);
    code_review_div.appendChild(code_review_text);
    overlay.appendChild(code_review_div);

    document.body.appendChild(overlay);
    return code_review_div;
  }

// function to add the event listener to a button to get the code review
const add_listener = (element) => {
    // add the event listener to the button
    element.addEventListener('click', async () => {
      // get the user's code
        const user_code = document.querySelector('.ace_text-layer')
        let s = ""
        for (let i = 0; i < user_code.children.length; i++) {
            s += user_code.children[i].innerText + "\n"
        }
      // get the problem info
        const problem_info = getProblemInfo()
      // format the problem info and the user's code for the prompt
        const final = problem_info + "\n\nUsers Code:\n```\n" + s + "\n```"
      // create the code review overlay
        const code_review_div = display_code_review()
        fPrompt = addPrompt(final)
      // send the prompt to the background script to get the code review 
        const code_review = await chrome.runtime.sendMessage({type:'prompt',prompt: fPrompt});
      // display the code review in the overlay
        code_review_div.querySelector('.code_review_text').innerHTML = 
          marked.parse(code_review); // parse the markdown into html
    });
}
// function to add the get code review button to the page
const add_review_button = (element) => {
    const review_button = document.createElement('button');
    review_button.innerHTML = 'Get Code Review ✨';
    review_button.style.cssText = 'font-family: var(--gfg-font-primary); background: #2f8d46; color: #fff; border-radius: 8px; font-size: 16px; width: 100%; padding: 10px; cursor: pointer; margin: 20px 0px; border: none;';
    const parent = element.parentElement;
    parent.insertBefore(review_button, element);
    add_listener(review_button);
}

// wait for the submit button to appear on the page and then add the event listener to the submit button
waitForElement('.problems_submit_button__6QoNQ', (element)=>{
  element.addEventListener('click', () => {
  // when the submit button is clicked, wait for the gfg to display successful submission message and then add the get code review button
    waitForElement('.problems_next_problems__VpOTk', add_review_button, 60000);
  });
}, 10000);