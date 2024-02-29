// This is the background script for the extension. It listens for messages from the content script and sends a request to the Together.ai API to get a response for the prompt.
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // check if the message is a prompt
    if(message.type === 'prompt'){
        const options = {
            method: 'POST',
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
              //  Paste your API key here.
              Authorization: 'Bearer e7e6f424ef0d78e5ce45c6165c3964cade308c74bf615a0b6872db3c55c17ccc'
            },
            body: JSON.stringify({
              model: 'Qwen/Qwen1.5-72B-Chat', // the LLM to use from together.ai
              messages: [
                {
                  // system prompt to the llm, giving instructions on what to do with the problem info and the user's code
                  role: 'system',
                  content: `You will be given details about a DSA problem, and then a user's solution for that problem. Your task is to give the user a code review. Your code review should follow these guidelines strictly:
                    - Your code review should be constructive, and should not be demotivating.
                    - Your code review should not be verbose, and you should try to keep it as concise as possible.
                    - Do not include any code in your review, as the user is still trying to solve the problem, and if you give him the code, it would count as cheating.
                    - Your main focus in the code review should be on the following:
                        - code quality,
                        - efficiency, and
                        - adherence to best practices.
                    - Use points instead of writing paragraphs.
                    - Use markdown to format your review.`
                },
                {
                    // prompt with the problem info and the user's code
                    role: 'user', 
                    content: `${message.prompt}`
                }
              ],
              // options for the llm
              max_tokens: 1024,
              stop: ['</s>'],
              stream: false,
              temperature: 0.7
            })
        };
        // send the request to the together.ai API
        fetch('https://api.together.xyz/v1/completions', options)
        .then(response => response.json())
        .then(response => {
          // send the recieved response back to the content-script
            sendResponse(response.choices[0].text)
        })
        .catch(err => console.error(err));
    }
    return true
});