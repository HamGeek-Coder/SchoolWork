async function checkSite(url) {
    return new Promise(resolve => {
        const frame = document.getElementById("testFrame");
        let loaded = false;

        frame.onload = () => {
            loaded = true;
            try {
                const title = frame.contentDocument.title || "";
                if (title.includes("iBoss") || title.includes("Blocked")) {
                    resolve("Blocked");
                } else {
                    resolve("Allowed");
                }
            } catch {
                resolve("Allowed");
            }
        };

        frame.onerror = () => resolve("Blocked");

        setTimeout(() => {
            if (!loaded) resolve("Blocked");
        }, 2000);

        frame.src = url;
    });
}
