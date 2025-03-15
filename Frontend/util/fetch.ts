export async function postData(url: string, data: object) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const responseData = await response.json();
            throw new Error(responseData);
        }
        return response.json();
    } catch (error) {
        console.error("postData에러:", error);
        throw error;
    }
};

export async function getData(url: string) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('get error');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("getData 에러:", error);
        throw error;
    }
};