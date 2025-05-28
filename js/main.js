
// Background logo parallax effect
function logoParallax() {
    var s = document.getElementById('logo-bg');
    s.style.top = 0-window.pageYOffset/8 + 'px';
    s.style.filter = 'blur(' + window.pageYOffset/100 + 'px)';
}
window.addEventListener('scroll', function () {
    logoParallax();
});



// After page load
window.onload = () => {
    // drop navbar down
    document.getElementById('navbar').style.top = 0 + 'px';
    // roll arrow up
    document.getElementById('home-arrow').style.paddingTop = '80vh';
    // fade in background logo
    let logo_bg = document.getElementById('logo-bg');
    if (window.location.hash && window.location.hash != '#top') {
        logo_bg.style.filter = 'blur(' + window.pageYOffset / 100 + 'px)';
    } else {
        let i = 0;
        function logo_bg_fadein_incr() {
            setTimeout(() => {
                i += 1;
                logo_bg.style.filter = `blur(${100 - i}px) brightness(${i}%)`;
                if (i < 100) {
                    logo_bg_fadein_incr();
                } else {
                    logo_bg.style.filter = 'blur(' + window.pageYOffset / 100 + 'px)';
                }
            }, 10);
        }
        logo_bg_fadein_incr();
    }

    // Init Bootstrap toasts
    let contact_form_toast;
    document.querySelectorAll('.toast').forEach((toastEl) => {
        const toast = new bootstrap.Toast(toastEl);
        if (toastEl.id == 'contact-form-toast') {
            contact_form_toast = toast;
        }
    });
    

    // Contact form submission
    const contact_form = document.querySelector("#contact-form");
    contact_form.addEventListener("submit", async function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        let data = {};
        for (const elem of e.target) {
            data[elem.name] = elem.value;
        }
        contact_form.reset();
        try {
            const resp = await fetch('https://docs.google.com/forms/d/e/1FAIpQLSdyIT2Q30dOsxirRTuXPYAmtXmRJm0XenPu7r_PDzOHBx37CA/formResponse', {
                method: "POST",
                body: new URLSearchParams(data),
                headers: {
                    "Content-type": "application/x-www-form-urlencoded"
                }
            })
            contact_form_toast.show()
        } catch (error) {
            contact_form_toast.show()
        }
    });
}