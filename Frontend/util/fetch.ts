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
            throw new Error('User creation failed');
        }
        return response.json();
    } catch(error) {
        console.log("서버 없음")
        throw error;
    }
};