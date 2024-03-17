async function fetchWithLimit(fetchList, limit) {
    const results = [];
    let completedCount = 0;
    let errorOccurred = false;

    async function fetchOne(fetchItem) {
        try {
            const result = await fetchItem();
            console.log('Request succeeded:', result);
            results.push(result);
        } catch (error) {
            console.error('Request failed:', error);
            errorOccurred = true;
        } finally {
            completedCount++;
        }
    }

    // 按并发限制逐个处理请求
    while (completedCount < fetchList.length && !errorOccurred) {
        const currentBatch = fetchList.slice(completedCount, completedCount + limit);
        await Promise.all(currentBatch.map(fetchOne));
    }

    // 如果有请求失败，则抛出错误
    if (errorOccurred) {
        throw new Error('One or more requests failed');
    }

    return results;
}

async function fetchWithLimit(fetchList, limit) {
    let results = [];
    let currentIndex = 0;
    let runningCount = 0;
    let errorOccurred = false;

    async function fetchAndHandle(index) {
        try {
            const result = await fetchList[index]();
            results.push(result);
        } catch (error) {
            errorOccurred = true;
            throw error;
        } finally {
            runningCount--;
            if (!errorOccurred && currentIndex < fetchList.length) {
                fetchAndHandle(currentIndex);
                runningCount++;
                currentIndex++;
            }
        }
    }

    while (currentIndex < fetchList.length && runningCount < limit) {
        fetchAndHandle(currentIndex);
        runningCount++;
        currentIndex++;
    }

    while (runningCount > 0) {
        await new Promise(resolve => setTimeout(resolve, 0)); // 等待当前请求完成
    }

    if (errorOccurred) {
        throw new Error('One or more requests failed.');
    }

    return results;
}

// 示例的异步请求方法
function asyncFetch(url) {
    return new Promise((resolve, reject) => {
        const random = Math.random();
        setTimeout(() => {
            if (random < 1) {
                console.log(url)
                resolve(`Request to ${url} succeeded: ${random}`);
            } else {
                reject(`Request to ${url} failed: ${random}`);
            }
        }, random * 10000);
    });
}

// 示例 fetchList
const fetchList = [
    async () => asyncFetch('http://example.com/1'),
    async () => asyncFetch('http://example.com/2'),
    async () => asyncFetch('http://example.com/3'),
    async () => asyncFetch('http://example.com/4'),
    async () => asyncFetch('http://example.com/5'),
    async () => asyncFetch('http://example.com/6'),
    async () => asyncFetch('http://example.com/7'),
    async () => asyncFetch('http://example.com/8'),
    async () => asyncFetch('http://example.com/9'),
    async () => asyncFetch('http://example.com/10'),
    async () => asyncFetch('http://example.com/11')
];

const limit = 2;

(async () => {
    try {
        const result = await fetchWithLimit(fetchList, limit);
        console.log('All requests succeeded:', result);
    } catch (error) {
        console.error('Request failed:', error.message);
    }
})();

// // Example usage:
// async function exampleFetch() {
//     async function fetchExample(url) {
//         // Simulated asynchronous fetch
//         const random = Math.random();
//         await new Promise(resolve => setTimeout(resolve, random * 10000));
//         console.log(url)
//         return `Response from ${url}`;
//     }

//     const fetchList = [
//         () => fetchExample("https://api.example.com/endpoint1"),
//         () => fetchExample("https://api.example.com/endpoint2"),
//         () => fetchExample("https://api.example.com/endpoint3"),
//         () => fetchExample("https://api.example.com/endpoint4"),
//         () => fetchExample("https://api.example.com/endpoint5"),
//         () => fetchExample("https://api.example.com/endpoint6"),
//         () => fetchExample("https://api.example.com/endpoint7"),
//         () => fetchExample("https://api.example.com/endpoint8"),
//         () => fetchExample("https://api.example.com/endpoint9"),
//         () => fetchExample("https://api.example.com/endpoint10"),
//         () => fetchExample("https://api.example.com/endpoint11"),
//         () => fetchExample("https://api.example.com/endpoint12")
//     ];

//     try {
//         const results = await fetchWithLimit(fetchList, 3);
//         console.log(results);
//     } catch (error) {
//         console.error(error.message);
//     }
// }

// exampleFetch();
