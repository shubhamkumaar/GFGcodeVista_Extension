
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
                
        fPrompt = addPrompt(final)
        console.log("Got prompt")
        const code_review = await chrome.runtime.sendMessage({type:'prompt',prompt: fPrompt});
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

// waitForElement('.problems_compile_button__Lfluz', add_listener, 10000);


waitForElement('.problems_submit_button__6QoNQ', (element)=>{
  element.addEventListener('click', () => {
    waitForElement('.problems_next_problems__VpOTk', add_review_button, 60000);
  });
}, 10000);