(function () {
    "use strict";

    // Find the script tag that loaded this widget.
    var scriptTag = document.currentScript;
    if (!scriptTag) {
        var scripts = document.querySelectorAll("script[data-form-id]");
        scriptTag = scripts[scripts.length - 1];
    }

    if (!scriptTag) {
        console.error("SmartForm widget: missing script tag.");
        return;
    }

    var publicId = scriptTag.getAttribute("data-form-id");
    if (!publicId) {
        console.error("SmartForm widget: missing data-form-id attribute.");
        return;
    }

    // Derive the SmartForm application URL from the script src.
    var appUrl = "";
    try {
        var src = scriptTag.getAttribute("src") || "";
        var url = new URL(src, window.location.href);
        appUrl = url.origin;
    } catch (e) {
        appUrl = window.location.origin;
    }

    if (!appUrl) {
        appUrl = window.location.origin;
    }

    // Avoid creating the widget more than once.
    if (window.__smartFormWidgetLoaded) {
        return;
    }
    window.__smartFormWidgetLoaded = true;

    var settings = {
        launcherButtonText: "Chat with us",
        themeColor: "#6366F1",
        chatbotPosition: "Bottom right",
    };

    // Try to load the saved settings so the launcher matches the form.
    fetch(appUrl + "/api/public/forms/" + encodeURIComponent(publicId))
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data && data.success && data.form && data.form.settings) {
                var s = data.form.settings;
                settings.launcherButtonText = s.launcherButtonText || settings.launcherButtonText;
                settings.themeColor = s.themeColor || settings.themeColor;
                settings.chatbotPosition = s.chatbotPosition || settings.chatbotPosition;
                updateLauncher();
            }
        })
        .catch(function () {
            // Keep the default launcher if settings cannot be loaded.
        });

    var isLeft = settings.chatbotPosition === "Bottom left";

    var launcher = document.createElement("button");
    launcher.type = "button";
    launcher.setAttribute("aria-label", "Open chat");
    launcher.style.position = "fixed";
    launcher.style.bottom = "20px";
    launcher.style.zIndex = "999998";
    launcher.style.border = "none";
    launcher.style.borderRadius = "9999px";
    launcher.style.padding = "12px 18px";
    launcher.style.fontSize = "14px";
    launcher.style.fontWeight = "600";
    launcher.style.color = "#ffffff";
    launcher.style.cursor = "pointer";
    launcher.style.boxShadow = "0 10px 25px rgba(0,0,0,0.15)";
    launcher.style.display = "inline-flex";
    launcher.style.alignItems = "center";
    launcher.style.gap = "8px";

    function updateLauncher() {
        launcher.style.backgroundColor = settings.themeColor;
        launcher.textContent = settings.launcherButtonText;
        if (settings.chatbotPosition === "Bottom left") {
            launcher.style.left = "20px";
            launcher.style.right = "auto";
        } else {
            launcher.style.right = "20px";
            launcher.style.left = "auto";
        }
    }

    updateLauncher();
    document.body.appendChild(launcher);

    var iframeWrapper = document.createElement("div");
    iframeWrapper.style.position = "fixed";
    iframeWrapper.style.bottom = "90px";
    iframeWrapper.style.width = "min(92vw, 380px)";
    iframeWrapper.style.height = "min(70vh, 600px)";
    iframeWrapper.style.zIndex = "999999";
    iframeWrapper.style.display = "none";
    iframeWrapper.style.borderRadius = "16px";
    iframeWrapper.style.overflow = "hidden";
    iframeWrapper.style.boxShadow = "0 20px 45px rgba(0,0,0,0.2)";

    var iframe = document.createElement("iframe");
    iframe.src = appUrl + "/forms/" + encodeURIComponent(publicId);
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none";
    iframe.setAttribute("title", "SmartForm chatbot");
    iframeWrapper.appendChild(iframe);
    document.body.appendChild(iframeWrapper);

    function positionWrapper() {
        if (settings.chatbotPosition === "Bottom left") {
            iframeWrapper.style.left = "20px";
            iframeWrapper.style.right = "auto";
        } else {
            iframeWrapper.style.right = "20px";
            iframeWrapper.style.left = "auto";
        }
    }
    positionWrapper();

    // Make the widget usable on small screens.
    function applyResponsive() {
        if (window.innerWidth <= 480) {
            iframeWrapper.style.width = "100vw";
            iframeWrapper.style.height = "100vh";
            iframeWrapper.style.bottom = "0";
            iframeWrapper.style.left = "0";
            iframeWrapper.style.right = "0";
            iframeWrapper.style.borderRadius = "0";
        } else {
            iframeWrapper.style.width = "min(92vw, 380px)";
            iframeWrapper.style.height = "min(70vh, 600px)";
            iframeWrapper.style.bottom = "90px";
            positionWrapper();
            iframeWrapper.style.borderRadius = "16px";
        }
    }
    applyResponsive();
    window.addEventListener("resize", applyResponsive);

    var isOpen = false;
    launcher.addEventListener("click", function () {
        isOpen = !isOpen;
        iframeWrapper.style.display = isOpen ? "block" : "none";
        launcher.style.opacity = isOpen ? "0.7" : "1";
    });
})();
