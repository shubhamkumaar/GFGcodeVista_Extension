# ![logo](./Images/logo16.png) GeekHelper 

GeekHelper is a chrome-based extension designed to provide help for all the geeks who are continuously solving coding problems in Geeks for Geeks. It offers a code review on your submission and, a writing board where you can do your rough work while solving problems.

## Features
***Code Review***

- Provide feedback on your code.
- Checks the code quality for the problems. 
- Efficiency of the code.
- Improvements that you can make.
- Adhering to best practices.

***Writing Board***
- Every coder needs a notebook while solving the problem.
- Here, you can do rough work.
- If you have done anything important then you can save it.

## Getting Started
### Prerequisites
- Google Chrome installed on your machine.
### Installation
- Click on `Code`
- Click on `Download ZIP`

![Download](./Images/readme_img/download.jpg)

- Unzip the downloaded file.
- [Register to get API key from Together.ai](https://api.together.xyz/settings/api-keys)
- Open the `background.js`in the scripts folder inside the folder you just unzipped and paste your API key.
- Open `Google Chrome`
- Click on `control Google Chrome -> Extensions`
- Click on `Manage Extension`
- On top right side corner start `Developer mode`
- Then click `Load unpacked` button and then select the folder you just unzipped.

**Now Extension is Installed Successfully**

## Usage
- When you successfully submit any problem, in the problem stats card, you will get a  `Get Code Review ` button.
- On clicking this button you get the code review.
- On clicking the extension button or pressing `Ctrl + q` you can see a popup Writing Board window.

## Contribution

- One of the ideas that can be accepted is: A code snippet library where a user can save their code snippets and use them in the future. User can also add a keyword to the snippet so that they can directly add the snippet content in the code editor by just typing the keyword.
- For any other suggestion for new features, improvement, or bug fixes, please submit a pull request.

## Acknowledgement
- Special thanks to `Geeks for geeks` to hosting the Hackathon that led us to make this extension.
- Special thanks to [QwenLM](https://huggingface.co/Qwen/Qwen1.5-72B-Chat) for the open source LLM hosted on `Together.ai`.
- Special thanks to `Together.ai`  And `Google Chrome`