function createIcon(selector, imageURL, animateFunc, duration) {

    var iconContainer = Snap(selector);
    var animating = false;
    var over = false;

    var p = new Promise(function(resolve, reject) {
        Snap.load(imageURL, function(s) {
            iconContainer.append(s)
            iconContainer.select("svg").attr("pointer-events","none");
            resolve();
        });
    })

    p.then(function() {
        iconContainer.mouseover(function() {

            over = true;

            this.mouseout(function() {
                over = false;
            });

            // over ? repeater() : null
            repeater()
        });
    });

    function repeater() {
        if (!animating) {
            console.log("repeater",animateFunc.name);
            
            animating = true;
            animateFunc ? animateFunc(iconContainer, duration) : null;
            setTimeout(function() {
                animating = false
                repeater()
            }, duration)
        }
    }
}

function hideEl(el) {
    el.forEach(function(item) {
        item.animation({
            opacity: 0 
        });
    }, this);
}

function decreaseEl(el) {
    el.forEach(function(item) {
        item.transform("s0,0");
    }, this);
}
