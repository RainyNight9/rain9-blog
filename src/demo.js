const axios = require('axios');

const concurrency = (urls, limit) => {
    const result = [];
    let count = 0,
        completed = 0;
    const len = urls.length;
    if (len === 0) return Promise.resolve([]);
    
    return new Promise(resolve => {
        const next = () => {
            if (count === len) return;

            let current = count++;
            axios
                .get(urls[current])
                .then(res => {
                    result[current] = { result: res.data };
                })
                .catch(err => {
                    result[current] = { error: err };
                })
                .finally(() => {
                    if (++completed === len) {
                        resolve(result);
                    } else {
                        next();
                    }
                });
        };
        while (count < limit) {
            next();
        }
    });
};