import { footer } from "../components/footer.js";



document.addEventListener("DOMContentLoaded", () => {
    let a = document.getElementById("main")
    a.innerHTML+=footer()
});

window.go = function(){
    window.location.href = "user-panel.html";
}