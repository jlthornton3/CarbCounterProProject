//Make sure the service worker can be registered

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
    .then((reg) => {
    console.log("sw.js successfully registered");
    }).catch(error =>{
        console.log("sw.js error (${error})");
    })
}
