const axios = require('axios');
class JsonDump {
    constructor(secret) {
        this.secret = secret;
    }

    async get() {
        try {
            const response = await axios.get('http://api.localhost:8000/v1/dumps', {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    'X-SECRET': this.secret,
                },
            });
            return await response.data;
        } catch (error) {
            throw new Error(error.message);
        }

    }

    async find(name) {
        try {
            const response = await axios.get(`http://api.localhost:8000/v1/dumps/${name}`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    'X-SECRET': this.secret,
                },
            });
            return await response.data;
        } catch (error) {
            return error.response?.data;
        }
    }

    async create(name, json) {
        try {
            const response = await axios.post(`http://api.localhost:8000/v1/dumps/`,
                { name: name, json: json },
                {
                    headers: {
                        "Accept": "application/json",
                        'X-SECRET': this.secret,
                    },
                });
            return await response.data;
        } catch (error) {
            return error.response?.data;
        }
    }

    async update(name, json, newName = false) {
        try {
            let request = {};
            request.json = json;
            if (newName) {
                request.name = newName;
            }
            const response = await axios.put(`http://api.localhost:8000/v1/dumps/${name}`,
                request,
                {
                    headers: {
                        "Accept": "application/json",
                        'X-SECRET': this.secret,
                    },
                });
            return await response.data;
        } catch (error) {
            return error.response?.data;
        }
    }

    async delete(name) {
        try {
            const response = await axios.delete(`http://api.localhost:8000/v1/dumps/${name}`,
                {
                    headers: {
                        "Accept": "application/json",
                        'X-SECRET': this.secret,
                    },
                });
            return await response.data;
        } catch (error) {
            return error.response?.data;
        }
    }
}

module.exports = JsonDump;