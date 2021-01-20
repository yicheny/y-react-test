'use strict';

let currentId = 2;

module.exports =  {
    get: () => {
        return Promise.resolve({
            data: [
                {
                    id: 0,
                    name: 'ylf',
                },
                {
                    id: 1,
                    name: 'lpf',
                },
            ],
        });
    },
    post: (url,data) => {
        return Promise.resolve({
            data: {
                name: data.task,
                id: currentId++,
            },
        });
    }
};
