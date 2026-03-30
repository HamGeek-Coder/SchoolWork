async function checkSite(url) {
    return new Promise(resolve => {
        const frame = document.getElementById("testFrame");
        frame.src = url;

        frame.onload = () => {
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
    });
}

async function startCheck() {
    const urls = document.getElementById("urlList").value.split("\n");
    const table = document.getElementById("results");

    for (let url of urls) {
        url = url.trim();
        if (!url) continue;

        const status = await checkSite(url);

        const row = document.createElement("tr");
        row.innerHTML = `<td>${url}</td><td>${status}</td>`;
        table.appendChild(row);
    }
}
