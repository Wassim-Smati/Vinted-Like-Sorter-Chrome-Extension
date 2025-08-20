document.getElementById("startBtn").addEventListener("click", () => {
    console.log("bouton cliqué"); 
    chrome.tabs.query({ active:true, currentWindow:true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {action: "launch_my_code"}); 
        })
    });