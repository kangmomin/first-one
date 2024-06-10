const isCostInclude = document.getElementById("isCostInclude");
isCostInclude.addEventListener("click", e => {
    for (let e of document.getElementsByClassName("isCostInclude")) {
        e.classList.toggle("d-none")
    }
})