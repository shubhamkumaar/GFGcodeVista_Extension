console.log("formatCode.js loaded!")

function waitForElement(selector, callback, timeout = 10000) {
    const startTime = new Date().getTime();
    const checkInterval = setInterval(() => {
      const element = document.querySelector(selector);
      if (element) {
        clearInterval(checkInterval);
        callback(element);
      } else if (new Date().getTime() - startTime > timeout) {
        clearInterval(checkInterval);
        console.error(`Timeout after waiting ${timeout}ms for element "${selector}"`);
      }
    }, 100);
}

const getProblemInfo = () => {
    const problem_header = document.querySelector('.problems_header_content__title__L2cB2.g-mb-0')
    const problem_content = document.querySelector('.problems_problem_content__Xm_eO')
    let problem_info  = "Problem Title: "
    problem_info += problem_header.innerText + "\nProblem Content:\n```\n"
    problem_info += problem_content.innerText + "\n"
    problem_info += "```"
    return problem_info
};

const addPrompt = (problemAndCode) => {
    return `
"""
${problemAndCode}
"""
`
}

const display_code_review = () => {
    const overlay = document.createElement('div');
    overlay.style.display = 'block';
    overlay.classList.add('overlay-code-review');

    const code_review_div = document.createElement('div');
    code_review_div.classList.add('code_review_div');

    const code_review_text = document.createElement('p');
    code_review_text.innerHTML = '<img src="https://s6.imgcdn.dev/teI9q.gif" width="100px" height="100px" style="display: block; margin: 0 auto;"/>';
    code_review_text.classList.add('code_review_text');

    const code_review_title_div = document.createElement('div');
    code_review_title_div.classList.add('code_review_title_div');

    const close_button = document.createElement('button');
    close_button.classList.add('code_review_close');
    close_button.innerHTML = 'x';
    close_button.addEventListener('click', () => {
        overlay.style.display = 'none';
    });
    
    const code_review_title = document.createElement('h2');
    code_review_title.classList.add('code_review_title');
    code_review_title.innerHTML = 'Code Review';

    code_review_title_div.appendChild(code_review_title);
    code_review_title_div.appendChild(close_button);

    code_review_div.appendChild(code_review_title_div);
    code_review_div.appendChild(code_review_text);
    overlay.appendChild(code_review_div);

    document.body.appendChild(overlay);
    return code_review_div;
  }

const add_listener = (element) => {
    element.addEventListener('click', async () => {
        console.log("Compile button clicked!")
        const user_code = document.querySelector('.ace_text-layer')
        let s = ""
        for (let i = 0; i < user_code.children.length; i++) {
            s += user_code.children[i].innerText + "\n"
        }
        const problem_info = getProblemInfo()

        const final = problem_info + "\n\nUsers Code:\n```\n" + s + "\n```"
        const code_review_div = display_code_review()
        fPrompt = addPrompt(final)
        console.log("Got prompt")
        const code_review = await chrome.runtime.sendMessage({type:'prompt',prompt: fPrompt});
        code_review_div.querySelector('.code_review_text').innerHTML = 
          marked.parse(code_review);
        console.log(code_review)
    });
}

const add_review_button = (element) => {
    const review_button = document.createElement('button');
    review_button.innerHTML = 'Get Code Review ✨';
    review_button.style.cssText = 'font-family: var(--gfg-font-primary); background: #2f8d46; color: #fff; border-radius: 8px; font-size: 16px; width: 100%; padding: 10px; cursor: pointer; margin: 20px 0px; border: none;';
    const parent = element.parentElement;
    parent.insertBefore(review_button, element);
    add_listener(review_button);
}

waitForElement('.problems_compile_button__Lfluz', add_listener, 10000);


waitForElement('.problems_submit_button__6QoNQ', (element)=>{
  element.addEventListener('click', () => {
    waitForElement('.problems_next_problems__VpOTk', add_review_button, 60000);
  });
}, 10000);