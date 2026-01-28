export async function apiFetch<T>(url: string, options: RequestInit = {}): Promise<T> {
    const token = localStorage.getItem("token");

    const response = await fetch(`/api${url}`, {
        credentials: "include",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
            ...(options.headers || {})
        },
        ...options
    });

    if (!response.ok) {
        const error = await response.json().catch(() => null);
        throw error ?? new Error("Erro na requisição");
    }

    return response.json() as Promise<T>;
}
