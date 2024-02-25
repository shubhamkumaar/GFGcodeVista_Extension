const titleEle = document.querySelector("#title")
const contentEle = document.querySelector("#content")
const submit = document.querySelector("#submit")
submit.addEventListener("click",()=>{


    const prefs = {
        title:titleEle.value,
        content:contentEle.value
    }
    localStorage.setItem(titleEle.value,contentEle.value)
    chrome.runtime.sendMessage({event:'snippet',prefs})
    // console.log(title)
    // console.log(content)

})

chrome.storage.local.get(["title","content"],(res)=>{
    const {title,content} = res
    titleEle.value = title,
    contentEle.value = content
})