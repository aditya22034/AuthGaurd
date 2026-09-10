const API_URL = "http://localhost:8080";

export async function apiFetch(url, options = {}) {

    let accessToken = localStorage.getItem("accessToken");

    let response = await fetch(`${API_URL}${url}`, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${accessToken}`
        }
    });

    // Access token expired
    if (response.status === 401) {

        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
            throw new Error("No refresh token");
        }

        const refreshResponse = await fetch(
            `${API_URL}/api/auth/refresh`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    refreshToken: refreshToken
                })
            }
        );

        if (!refreshResponse.ok) {
            throw new Error("Refresh token expired");
        }

        const refreshData = await refreshResponse.json();

        localStorage.setItem(
            "accessToken",
            refreshData.accessToken
        );

        accessToken = refreshData.accessToken;

        // Retry original request
        response = await fetch(`${API_URL}${url}`, {
            ...options,
            headers: {
                ...options.headers,
                Authorization: `Bearer ${accessToken}`
            }
        });
    }

    return response;
}