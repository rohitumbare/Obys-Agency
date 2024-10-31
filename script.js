function locoScroll() {
    gsap.registerPlugin(ScrollTrigger);
    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".data-scroll-container"),
        smooth: true,
        smoothMobile: true
    });
    locoScroll.on("scroll", ScrollTrigger.update);
    ScrollTrigger.scrollerProxy(".data-scroll-container", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: document.querySelector(".data-scroll-container").style.transform ? "transform" : "fixed"
    });
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();
}

function progressCounter() {
    const progressCount = document.querySelector("#progress h5")
    let count = 0;

    const counter = setInterval(function () {
        count++;
        if (count === 100) {
            clearInterval(counter)
        }
        progressCount.textContent = count
    }, 30)
}

function preloaderAnimations() {
    gsap.from(".line h1", {
        y: 150,
        stagger: .25,
        duration: .5,
        delay: .3,
    })

    gsap.from("#progress", {
        opacity: 0,
        duration: .8,
        delay: .6,
    })

    gsap.from("#wait-message p", {
        opacity: 0,
        duration: .4,
        delay: 1.2,
    })

    gsap.to("#line1 #progress", {
        opacity: 0,
        duration: .5,
        delay: 3.2,
    })

    gsap.to("#line1 h1", {
        opacity: 0,
        duration: .9,
        delay: 3.2,
    })

    gsap.to("#line3 h1 span", {
        opacity: 0,
        duration: .9,
        delay: 3.2,
    })

    gsap.to("#wait-message p", {
        opacity: 0,
        duration: .9,
        delay: 3.2,
    })

    gsap.to("#line2 h1", {
        opacity: 0,
        duration: .8,
        delay: 3.4,
    })

    gsap.to("#line3 h1", {
        opacity: 0,
        duration: .8,
        delay: 3.4,
    })

    gsap.to("#preloader", {
        y: -1600,
        duration: 1.45,
        delay: 4.5,
    })

    gsap.to("#preloader", {
        display: "none",
        delay: 4.65
    })

    gsap.from(".hero-text h1", {
        y: 150,
        duration: .6,
        stagger: .25,
        delay: 4.35,
    })

    gsap.to(".hero-text", {
        overflow: "visible",
        delay: 5.7
    })
}

function cursor() {
    document.documentElement.style.cursor = "none"

    document.addEventListener("mousemove", function (dets) {
        gsap.to("#cursor", {
            x: dets.clientX,
            y: dets.clientY,
            ease: "expo.out"
        })
    })

    cursorAnimation()
}

function cursorAnimation() {
    function scaleCursorOnHover(elem) {
        const elements = document.querySelectorAll(elem)
        elements.forEach(element => {
            element.addEventListener("mousemove", function () {
                gsap.to("#cursor", {
                    scale: 1.4,
                    duration: .3,
                    ease: "sine"
                })
            })

            element.addEventListener("mouseleave", function () {
                gsap.to("#cursor", {
                    scale: 1,
                    duration: .3,
                    ease: "sine"
                })
            })
        });
    }

    scaleCursorOnHover("#menu")
    scaleCursorOnHover("#nav-part2 h4")
}

function magnetEffect() {
    Shery.makeMagnet("#menu", {
        ease: "cubic-bezier(0.23, 1, 0.320, 1)",
        duration: .4,
    });

    Shery.makeMagnet("#nav-part2 h4", {
        ease: "sine",
        duration: .3,
    });
}

function flagAnimation() {
    const hoverContainer = document.querySelector(".text3")
    const hoverContainerDims = hoverContainer.getBoundingClientRect()

    hoverContainer.addEventListener("mousemove", function (dets) {
        let moveX = dets.clientX - hoverContainerDims.x
        let moveY = dets.clientY - hoverContainerDims.y

        gsap.to("#flag", {
            top: "50%",
            x: moveX,
            y: moveY,
            opacity: 1,
            ease: "circ"
        })
    })

    hoverContainer.addEventListener("mouseleave", function (dets) {
        let moveX = dets.clientX - hoverContainerDims.x
        let moveY = dets.clientY - hoverContainerDims.y

        gsap.to("#flag", {
            top: "50%",
            x: moveX,
            y: moveY,
            opacity: 0,
            ease: "circ"
        })
    })
}

function videoCursorHandler() {
    const videoContainer = document.querySelector("#video-container")
    const videoCursor = document.querySelector("#video-cursor")
    const video = document.querySelector("#video-container video")

    videoContainer.addEventListener("mousemove", function (dets) {
        const videoDims = videoContainer.getBoundingClientRect()
        const x = dets.x - videoDims.x
        const y = dets.y - videoDims.y

        gsap.to("#cursor", {
            opacity: 0,
        })

        gsap.to("#video-cursor", {
            top: y - 50,
            left: x - 50,
            ease: "expo.out"
        })
    })

    videoContainer.addEventListener("mouseleave", function (dets) {
        gsap.to("#cursor", {
            opacity: 1,
        })

        gsap.to("#video-cursor", {
            top: "-10%",
            left: "69%",
            ease: "expo.out"
        })
    })

    let isPaused = true;
    videoContainer.addEventListener("click", function () {
        if (isPaused) {
            videoCursor.innerHTML = `<i class="ri-pause-fill"></i>`
            videoCursor.style.scale = .5
            video.play()
            video.style.opacity = 1
            if (window.innerWidth <= 768) {
                videoCursor.style.opacity = 0;
            }

            isPaused = false;
        } else {
            videoCursor.innerHTML = `<i class="ri-play-fill"></i>`
            videoCursor.style.scale = 1
            video.pause()
            video.style.opacity = 0
            videoCursor.style.opacity = 1;

            isPaused = true;
        }
    })
}

function textSwipeEffect(textContainer, swipeOffsetY, swipeDuration, hoverElementSelector = null) {
    let frames = document.querySelectorAll(textContainer)

    frames.forEach(function (frame, index) {

        let hoverElement = hoverElementSelector ? document.querySelectorAll(hoverElementSelector)[index] : frame

        hoverElement.addEventListener("mousemove", function () {
            gsap.to(frame.children, {
                y: swipeOffsetY,
                duration: swipeDuration,
            })
        })

        hoverElement.addEventListener("mouseleave", function () {
            gsap.to(frame.children, {
                y: 0,
                duration: swipeDuration,
            })
        })
    })
}

function gooeyEffect() {
    Shery.imageEffect(".project-image", {
        style: 6,
        gooey: true,
        config: { "noiseDetail": { "value": 9.16, "range": [0, 100] }, "distortionAmount": { "value": 3.74, "range": [0, 10] }, "scale": { "value": 59.54, "range": [0, 100] }, "speed": { "value": 0.51, "range": [0, 1] }, "zindex": { "value": -9996999, "range": [-9999999, 9999999] }, "aspect": { "value": 0.8886583026758482 }, "ignoreShapeAspect": { "value": true }, "shapePosition": { "value": { "x": 0, "y": 0 } }, "shapeScale": { "value": { "x": 0.5, "y": 0.5 } }, "shapeEdgeSoftness": { "value": 0, "range": [0, 0.5] }, "shapeRadius": { "value": 0, "range": [0, 2] }, "currentScroll": { "value": 0 }, "scrollLerp": { "value": 0.07 }, "gooey": { "value": true }, "infiniteGooey": { "value": false }, "growSize": { "value": 4, "range": [1, 15] }, "durationOut": { "value": 1, "range": [0.1, 5] }, "durationIn": { "value": 1.5, "range": [0.1, 5] }, "displaceAmount": { "value": 0.5 }, "masker": { "value": true }, "maskVal": { "value": 1.37, "range": [1, 5] }, "scrollType": { "value": 0 }, "geoVertex": { "range": [1, 64], "value": 1 }, "noEffectGooey": { "value": true }, "onMouse": { "value": 0 }, "noise_speed": { "value": 0.53, "range": [0, 10] }, "metaball": { "value": 0.47, "range": [0, 2] }, "discard_threshold": { "value": 0.5, "range": [0, 1] }, "antialias_threshold": { "value": 0, "range": [0, 0.1] }, "noise_height": { "value": 0.34, "range": [0, 2] }, "noise_scale": { "value": 11.45, "range": [0, 100] } }
    });
}

function textFadeEffect() {
    const string = "Let's Create"
    const textContainer = document.querySelector(".text-container")
    const headings = document.querySelectorAll(".text-container h1")
    let hoverTimer;
    let isHovering = false;

    headings.forEach(function (heading) {
        for (let i = 0; i < string.length; i++) {
            const span = document.createElement("span")
            span.textContent = string[i]
            heading.appendChild(span)
        }
    })

    textContainer.addEventListener("mouseenter", function () {
        isHovering = true;
        hoverTimer = setTimeout(() => {
            if (isHovering) {
                gsap.to(".heading1 span", {
                    opacity: 0,
                    duration: .2,
                    stagger: .05
                })

                gsap.to(".heading2 span", {
                    opacity: 1,
                    duration: .2,
                    stagger: .05,
                    delay: .2
                })

                if (window.innerWidth <= 768) {
                    gsap.to(".arrow", {
                        x: 40,
                        duration: .4,
                        ease: "circ"
                    })
                } else {
                    gsap.to(".arrow", {
                        x: 100,
                        duration: .4,
                        ease: "circ"
                    })
                }
            }
        }, 500);
    })

    textContainer.addEventListener("mouseleave", function () {
        isHovering = false;
        clearTimeout(hoverTimer);

        gsap.to(".heading2 span", {
            opacity: 0,
            duration: .3,
            stagger: .05,
        })

        gsap.to(".heading1 span", {
            opacity: 1,
            duration: .3,
            stagger: .05,
            delay: .3
        })

        if (window.innerWidth <= 768) {
            gsap.to(".arrow", {
                x: 10,
                duration: .4,
                ease: "circ",
                delay: .5
            })
        } else {
            gsap.to(".arrow", {
                x: 20,
                duration: .4,
                ease: "circ",
                delay: .5
            })
        }
    })
}

function underlineAnimations() {
    let underlines = document.querySelectorAll(".underline")
    underlines.forEach(function (underline) {
        let underlineParentId = underline.parentElement.id;
        gsap.to(`#${underlineParentId} .underline`, {
            scaleX: 1,
            duration: 1,
            ease: "circ",
            stagger: .3,
            scrollTrigger: {
                trigger: `#${underlineParentId}`,
                scroller: ".data-scroll-container",
                start: "top 70%",
            }
        })
    })

    let projectItems = document.querySelectorAll(".project-item")
    projectItems.forEach(projectItem => {
        gsap.to(projectItem, {
            onStart: () => {
                projectItem.classList.add("animate-image-underline")
            },
            scrollTrigger: {
                trigger: projectItem,
                scroller: ".data-scroll-container",
                start: "25% 20%",
            }
        })
    })
}

locoScroll()
cursor()
progressCounter()
preloaderAnimations()
underlineAnimations()
flagAnimation()
videoCursorHandler()
textSwipeEffect(".header-frame", "-2.1vw", 0.45, ".project-item")
textSwipeEffect(".frame", "-1.6vw", 0.55)
textFadeEffect()


function runOnDesktop() {
    if (window.innerWidth > 768) {
        magnetEffect()
        gooeyEffect()
    } else {
        console.info("Desktop Specific Code Not Running!")
    }
}
runOnDesktop()

function removeImages() {
    let projectImages = document.querySelectorAll(".project-image img")
    projectImages.forEach((projectImage, index) => {
        if (index % 2 !== 0) {
            projectImage.style.display = "none"
        }
    })
}

function runOnMobile() {
    if (window.innerWidth <= 768) {
        removeImages()
        textSwipeEffect(".header-frame", "-6.7vw", 0.45, ".project-item")
        textSwipeEffect(".frame", "-6.5vw", 0.55)
    } else {
        console.info("Mobile Specific Code Not Running!")
    }
}
runOnMobile()