window.sharing = {};

let modal = null;
var yaShare = null;

document.addEventListener("DOMContentLoaded", () => {
   modal = document.getElementById("sharing-modal");
   yaShare = Ya.share2("ya-share2", {});
    console.log("Sharing initialized");
});

window.sharing.hideModal = () => {
    modal.style.display = "none";
};

window.sharing.showModal = (isWinCombination) => {
    setTitle(isWinCombination);
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    span.onclick = function() {
        modal.style.display = "none";
    };
    window.onclick = function(event) {
        if (event.target == modal) {
            window.sharing.hideModal();
        }
    };
};

function setTitle(isWinCombination)
{
    var titleMessage = null;
    if(isWinCombination)
    {
        titleMessage = "Ура!! Вам выпала призовая комбинация"
    }
    else
    {
        titleMessage = "Ура!! Вам выпала бонусная комбинация"
    }
    yaShare.updateContent({
        title: titleMessage
    });
    setTitleMeta(titleMessage);
    setPageTitle(titleMessage);
}

function setTitleMeta(title)
{
    var meta = document.createElement('meta');
    meta.name='og:title';
    meta.setAttribute('content', title);
    document.getElementsByTagName('head')[0].appendChild(meta);
}

function setPageTitle(title)
{
    if(window.sharing.titleTimeout != undefined && window.sharing.titleTimeout != null)
    {
        clearTimeout(window.sharing.titleTimeout);
    }
    else
    {
        window.sharing.previousTitle = document.title;
    }
    document.title = title;
    startTimeout();
}

function startTimeout()
{
    const tenSeconds = 10000;
    window.sharing.titleTimeout = setTimeout(() => {
        document.title = window.sharing.previousTitle;
        window.sharing.titleTimeout = null;
    }, tenSeconds);
}