class Transport {
    constructor (url, authToken) {
        this.baseURL = url;
        this.authToken = authToken
        // eslint-disable-next-line no-undef
        this.headers = new Headers({
            'Content-Type': 'application/json'
        });
        this.params = {
            headers: this.headers,
            mode: 'cors'
        }
    }

    setHeader (key, value) {
        this.params.headers.set(key, value);
    }

    async request ({ method = 'GET', path, params }) {
        if (!path) {
            console.error(`[MARKA landing] http error: Incorrect request params, path is ${path}`)
            return;
        }

        const url = path.startsWith('http') ? path : `${this.baseURL}${path}`;
        const config = params || this.params;

        config.method = method;

        try {
            // eslint-disable-next-line no-undef
            const response = await fetch(url, config);

            if (response.ok) {
                const json = await response.json();

                return {
                    result: json,
                    error: null
                };
            } else {
                return {
                    result: null,
                    error: `statusCode: ${response.status}, statusText: ${response.statusText}`
                };
            }
        } catch (error) {
            return {
                result: null,
                error
            };
        }
    }

    requestRatings (campaignId) {
        return this.request({ path: `ratings/campaign/${campaignId}` });
    }

    requestLeaders (ratingId) {
        return this.request({ path: `ratings/${ratingId}/leaders` })
    }

    requestCurrentUser (ratingId) {
        return this.request({ path: `ratings/${ratingId}/client` })
    }

    setAuthToken (authToken) {
        this.setHeader('Authorization', `Bearer ${authToken}`);

        this.authToken = authToken;
    }

    requestClientBets (ratingId) {
        return this.request({ path: `ratings/${ratingId}/client/full` })
    }

    requestActions (externalId, channelTypeId) {
        const params = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type'               : 'application/json',
                'X-API-BranchId'             : externalId,
                Accept                       : 'application/json',
                mode                         : 'no-cors'
            }
        };

        return this.request({ path: `content/channelType/${channelTypeId}?state=Started&take=2`, params })
    }

    _parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    };

    _getClientNumberFromToken (token) {
        try {
            const decoded = this._parseJwt(token);
            const sub = JSON.parse(decoded.sub);

            return String(sub.number);
        } catch (error) {
            this.logger.error(error);
        }

        return '';
    }

    _uuidv4 () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0; const v = c === 'x' ? r : (r & 0x3 | 0x8);

            return v.toString(16);
        })
    }

    async getUserInfo (token) {
        return await fetch('https://api.ligastavok.ru/rest/auth/v6/getUserInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'x-api-cred': `|${token}`,
                'x-req-id': this._uuidv4(),
                'x-user': this._getClientNumberFromToken(token),
                'x-application-name': 'desktop'
            }
        })
    }
}

export default Transport;
