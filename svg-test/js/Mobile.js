function Mobile(d) {

    var iconContainer = Snap("#icon2"),
        animating = false,
        over = false;

    Snap.load("./ico/mobile.svg", function(s) {
        iconContainer.append(s)
        iconContainer.select("svg").attr("pointer-events","none");

        iconContainer.mouseover(function() {
            over = true;

            this.mouseout(function() {
                over = false;
            });

            over ? mobileRepeater() : null;
        });

        function mobileRepeater() {
            if (!animating) {
                
                animating = true;
                mobileScenario()
                setTimeout(function() {
                    animating = false
                    over ? mobileRepeater() : null;
                }, d)
            }
        }

        var svg = iconContainer.select("#mContainer"),
            svgBBox = svg.getBBox(),
            Case = iconContainer.select("#case_wb"),
            interface = iconContainer.select("#interface");
            
        function mobileScenario() {
            mobileStep1(0, d/4);
            // mobileStep2(d/4, d/4);
            mobileStep3(d/2, d/4);
            // mobileStep4(d*3/4, d/4);
        }

        // console.log(svgBBox);
        
        function mobileStep1(delay, duration) {

            var svg = iconContainer.select("#mContainer")

            svg.animate({
                transform: "r-90"
            }, duration);
            
            // Case.animate({
            //     transform: "s1.5,1"
            // }, duration);
        }

        function mobileStep2(delay, duration) {
            setTimeout(function() {

                // console.log(interface.transform());
                interface.transform("t8.5333,-19.8632s1.5633,1.6308,0,0")

                var cx = 8.5333 + interface.getBBox().w;
                var cy = -19.8632 + interface.getBBox().h;

                var interfaceMatrix = interface.transform().localMatrix;
                interfaceMatrix.rotate(90,0,0)

                console.log(cx, cy);

                interface.animate({
                    transform: interfaceMatrix
                }, duration);
            }, delay);
        }

        function mobileStep3(delay, duration) {
            setTimeout(function() {
                svg.animate({
                    transform: ""
                }, duration);
            }, delay);
        }

        function mobileStep4(delay, duration) {
            setTimeout(function() {
                Case.animate({
                    transform: "t0,0,s1,1"
                }, duration/1.5);

                interface.animate({
                    transform: "t8.5333,-19.8632s1.5633,1.6308,0,0r0,75,75"
                }, duration/1.5);
            }, delay);
        }
    });
}