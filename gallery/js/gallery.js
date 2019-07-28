class Gallery {

    constructor(listArea, mainImage) {
        this.index = 0;

        this.defaultLists = {
            "Fractals": [
                "https://images7.alphacoders.com/898/898633.png",
                "https://images.alphacoders.com/901/901632.png",
                "https://images2.alphacoders.com/857/857206.png",
            ],
            "Android Jones": [
                "https://androidjones.com/wp-content/uploads/2014/06/tigershopify-copy.jpg",
                "https://www.geek.com/wp-content/uploads/2016/06/samskaraart.jpg",
            ],
            "Flowy Gifs": [
                "https://i.imgur.com/6dqZUSl.mp4"
            ],
            "Vibrant Paintings":[
                "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/intermediary/f/de96a427-aecc-41f3-8e1b-3a425360d246/dd05pt5-0c786621-edf1-4189-be13-e5a865205e23.png"
            ],
            "Math!":[
                "https://preview.redd.it/44x3k7f3nse21.gif?width=600&format=mp4&s=87156e45f3666cc88947ce14d716bc127cf7de03"
            ]
        }

        this.lists = this.defaultLists //TODO: add in storing and saving 

    }

    setupGalleryControls() {
        //gallery mode exit 
        document.getElementById("exitButton").addEventListener("click", function () {
            document.getElementById("listView").hidden = false;
            document.getElementById("listView").classList.remove("uk-animation-reverse");
            document.getElementById("galleryView").className += "uk-animation-reverse"
            document.getElementById("galleryView").hidden = true;
        });

        //forward button
        document.getElementById("forwardButton").addEventListener("click", function () {
            thisGallery.index += 1;
            if (thisGallery.index > thisGallery.chosenList.length - 1) {
                thisGallery.index = 0;
            }
            thisGallery.showImage();
        });

        //back button
        document.getElementById("backButton").addEventListener("click", function () {
            thisGallery.index -= 1;
            if (thisGallery.index < 0) {
                thisGallery.index = thisGallery.chosenList.length - 1;
            }
            thisGallery.showImage();
        });

        thisGallery.timeSinceIdle = 0;
        // make buttons disappear when mouse is idle 
        document.body.onmousemove = function () {
            thisGallery.timeSinceIdle = 0;
            if (document.getElementById("listView").hidden) {
                thisGallery.showControls();
            }
        }
        setInterval(function () {
            thisGallery.timeSinceIdle += 100;
            console.log(thisGallery.timeSinceIdle);
            if (thisGallery.timeSinceIdle > 3000) {
                thisGallery.hideControls();
            }
        }, 100)
    }

    showControls() {
        document.getElementById("bottomControls").classList.remove("uk-animation-slide-bottom")
        document.getElementById("bottomControls").classList.remove("uk-animation-reverse")
        document.getElementById("exitButton").classList.remove("uk-animation-slide-top")
        document.getElementById("exitButton").classList.remove("uk-animation-reverse")
        document.getElementById("bottomControls").classList.add("uk-animation-slide-bottom")
        document.getElementById("exitButton").classList.add("uk-animation-slide-top")
    }

    hideControls() {
        document.getElementById("bottomControls").classList.remove("uk-animation-slide-bottom")
        document.getElementById("bottomControls").classList.remove("uk-animation-reverse")
        document.getElementById("exitButton").classList.remove("uk-animation-slide-top")
        document.getElementById("exitButton").classList.remove("uk-animation-reverse")

        document.getElementById("bottomControls").classList.add("uk-animation-slide-bottom")
        document.getElementById("bottomControls").classList.add("uk-animation-reverse")
        document.getElementById("exitButton").classList.add("uk-animation-slide-top")
        document.getElementById("exitButton").classList.add("uk-animation-reverse")

    }

    showImage() {
        document.getElementById("mainImage").style.backgroundImage = `url('${this.chosenList[this.index]}')`;
    }

    renderLists() {
        console.log("Rendering list");
        for (const [aListName, aList] in Object.entries(this.lists)) {
            const divWrapper = document.createElement("div");
            const template =
                `<div class="uk-width-1-3 galleryCard" data-listname="${aListName}">
                <a href="#">
                    <div class="uk-card uk-card-default uk-card-body">
                        <img src="https://pbs.twimg.com/profile_images/839928218710855680/B6JS6Aip.jpg">
                        <div class="uk-text-large"> ${aListName}</div>
                    </div>
                </a>
            </div>`;
            // add the element
            divWrapper.innerHTML = template;
            document.getElementById("galleryListGrid").insertAdjacentHTML('afterbegin', divWrapper);

            // set up click handler to choose list 
            divWrapper.addEventListener("click", () => {
                this.showGallery(aListName);
                this.showImage();
            });

            // hover to show cards effect 
            let hoverInterval;
            document.querySelector(".galleryCard").addEventListener("mouseenter", function () {
                let listName = this.dataset.listname; //TODO: clean up aListName vs. aList 
                let element = this;
                let index = 0;

                hoverInterval = setInterval(function () {
                    element.querySelector("img").src = thisGallery.lists[listName][index];
                    // console.log(`Showing image at ${thisGallery.lists[listName][index]}`);
                    index += 1;
                    if (index > thisGallery.lists[listName].length - 1) {
                        index = 0;
                    }
                }, 2000)

            });

            // Todo: might need to be finished 
            document.getElementsByClassName("galleryCard")[0].addEventListener("mouseleave", function () {
                clearInterval(hoverInterval);
            });
        }
    }

    showGallery(listName) {
        console.log("showing " + listName);
        document.getElementById("listView").className += "uk-animation-slide-top uk-animation-reverse uk-transform-origin-top-center"
        document.getElementById("galleryView").hidden = false;

        document.getElementById("listView").hidden = true;

        document.getElementById("galleryView").className += "uk-animation-slide-bottom uk-transform-origin-top-center"

        this.chosenList = thisGallery.lists[listName];
        console.log(this);
    }
}

let thisGallery = new Gallery();

document.addEventListener('DOMContentLoaded', (event) => {


    thisGallery.renderLists();
    thisGallery.setupGalleryControls();

});

// TODO: 
// Figure out how to intercept the back button to go back to list view 