function Team(d) {

    var iconContainer = Snap("#icon3"),
        animating = false,
        over = false;

    Snap.load("./ico/team.svg", function(s) {
        iconContainer.append(s)
        iconContainer.select("svg").attr("pointer-events","none");

        iconContainer.mouseover(function() {
            over = true;

            this.mouseout(function() {
                over = false;
            });

            over ? teamRepeater() : null;
        });

        function teamRepeater() {
            if (!animating) {
                
                animating = true;
                teamScenario();
                setTimeout(function() {
                    animating = false;
                    over ? teamRepeater() : null;
                }, d)
            }
        }

        var svg = iconContainer.select("svg"),
            pazzles = svg.selectAll("path"),
            svgBBox = svg.getBBox(),
            shift = 15,
            scale = 1.2,
            tCorrect = (scale - 1)/scale;

        function teamScenario() {
            teamStep1(0, d/2);
            teamStep2(d/2, d/2);
        }
        
        function teamStep1(delay, duration) {
            setTimeout(function() {
                svgBBox = svg.getBBox();

                svg.animate({
                    transform: "r180,0,0s"+scale+"t"+svgBBox.cx*tCorrect+","+svgBBox.cy*tCorrect
                }, duration)
            
                pazzles[0].animate({
                    transform: "t"+shift*0+","+shift*(-1)
                }, duration)
                
                pazzles[1].animate({
                    transform: "t"+shift*(-1)+","+shift*0
                }, duration)
                
                pazzles[2].animate({
                    transform: "t"+shift*0+","+shift*1
                }, duration)
                
                pazzles[3].animate({
                    transform: "t"+shift*1+","+shift*0
                }, duration)

            }, delay);
        }

        function teamStep2(delay, duration) {
            setTimeout(function() {
                svgBBox = svg.getBBox();

                svg.animate({
                    transform: "r270,0,0s1t0,0"
                }, duration)
            
                pazzles.forEach(function(item, i) {
                    item.animate({
                        transform: "t0,0"
                    }, duration)
                });

            }, delay);
        }
    });
}