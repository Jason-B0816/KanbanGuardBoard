const login = async (userInfo) => {
    // TODO: make a POST request to the login route
    try {
        const response = await fetch("/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userInfo),
        });
        if (!response.ok) {
            throw new Error("invalid username or password");
        }
        const data = await response.json();
        return data.token; // JWT token
    }
    catch (error) {
        console.error("Login error", error);
        return null; // or handle the error as needed
    }
};
export { login };
