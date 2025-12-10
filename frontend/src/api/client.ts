export async function apiFetch<T>(url: string, options: RequestInit = {}): Promise<T> {
    const token = localStorage.getItem("token");

    const response = await fetch(`/api${url}`, {
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
            ...(options.headers || {})
        },
        ...options
    });

    if (!response.ok) throw new Error(await response.text() || "Erro na requisição");
    
    // if (response.status === 204) return {} as T;

    return response.json() as Promise<T>;
}
