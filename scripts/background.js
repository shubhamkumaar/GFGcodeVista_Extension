chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if(message.type === 'prompt'){
        const options = {
            method: 'POST',
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
              Authorization: 'Bearer e7e6f424ef0d78e5ce45c6165c3964cade308c74bf615a0b6872db3c55c17ccc'
            },
            body: JSON.stringify({
              model: 'Qwen/Qwen1.5-72B-Chat',
              messages: [
                {
                  role: 'system',
                  content: `You will be given details about a DSA problem, and then a user's solution for that problem. Your task is to give the user a code review. Your code review should follow these guidelines strictly:
                    - Your code review should be constructive, and should not be demotivating.
                    - Your code review should not be verbose, and you should try to keep it as concise as possible.
                    - Do not include any code in your review, as the user is still trying to solve the problem, and if you give him the code, it would count as cheating.
                    - Your main focus in the code review should be on the following:
                        - code quality,
                        - efficiency, and
                        - adherence to best practices.
                    - Use points instead of writing paragraphs.`
                },
                {
                    role: 'user', 
                    content: `${message.prompt}`
                }
              ],
              max_tokens: 1024,
              stop: ['</s>'],
              stream: false,
              temperature: 0.8
            })
        };
        console.log(message.prompt)

        fetch('https://api.together.xyz/v1/completions', options)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            console.log(response.choices[0].text)
            sendResponse(response.choices[0].text)
        })
        .catch(err => console.error(err));
    }
    return true
});