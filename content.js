console.log("Extension Vinted activée !");
console.log("COUCOU"); 

function itemSorting(){
    const interval = setInterval(() => {

    let items = NaN; 
    let parent = NaN; 

    if (window.location.pathname === "/"){
        items = Array.from(document.querySelectorAll('.homepage-blocks__item.homepage-blocks__item--one-fifth'));
        parent = document.querySelector('.homepage-blocks');
    } else {
        items = Array.from(document.querySelectorAll('.feed-grid__item'));
        parent = document.querySelector('.feed-grid');
    }
    
    if (items.length === 0) {
        console.log("En attente que les articles apparaissent...");
        return; 
    }
    
    const itemsWithLikes = items.map(item => {
        const spanLike = item.querySelector('.web_ui__Text__text.web_ui__Text__caption.web_ui__Text__left');
        let likeCount = spanLike ? parseInt(spanLike.textContent.trim()) : 0;
        likeCount = isNaN(likeCount) ? 0 : likeCount;
        return { element: item, likes: likeCount };
    });

    async function trierEtInserer(){
        itemsWithLikes.sort((a, b) => -(b.likes - a.likes));

        function sleep(ms){
            return new Promise(resolve => setTimeout(resolve, ms)); 
        }

        //await sleep(200); 
        //console.log('Après 1s'); 

        itemsWithLikes.forEach(({ element }) => {
            parent.insertBefore(element, parent.firstChild);
        });

        console.log("✅ Vêtements triés du plus liké au moins liké !");
        clearInterval(interval);
    }

    trierEtInserer(); 

    }, 1000);
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "launch_my_code"){
        itemSorting(); 
    }
})