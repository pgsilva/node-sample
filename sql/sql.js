let sql = require('mysql')
let dbconfig = require('./config.json')
let util = require('util')


let pool = null

const _db_settings = process.env.env == 'production' ? dbconfig['production'] : dbconfig['development'];


const execQuery = function (query, params, connection, releaseConnection) {
    return new Promise((resolve, reject) => {
        if (!params) params = {};
        else {
            for (let i = 0; i < params.length; i++) {
                if (Array.isArray(params[i])) {
                    params[i] = params[i].toString();
                }
            }
        }

        connection.query(query, params, (error, results) => {
            if (error) {
                console.log(error);

                if (releaseConnection)
                    connection.release()
                reject(error)
            } else {
                if (releaseConnection)
                    connection.release()
                resolve(results)
            }
        });
    });
}

/**
 * Gerencia execucao da query a partir de um pool de comections
 * @type {{pool: {}, exec: (function(*=, *=): Promise<any>)}}
 */
module.exports = {

    pool: {},

    exec: (query, params, providedConnection) => {
        return new Promise((resolve, reject) => {
            try {
                console.log(util.format('Query SQL [%s]', query))
                if (!pool)
                    pool = sql.createPool(_db_settings)

                if (providedConnection) {
                    execQuery(query, params, providedConnection, false).then(results => {
                        resolve(results);
                    }, (err) => {
                        reject(err);
                    });
                } else
                    pool.getConnection((err, connection) => {
                        if (err) reject(err)
                        else
                            execQuery(query, params, connection, true).then(results => {
                                resolve(results);
                            }, (err) => {
                                reject(err);
                            });
                    });
            } catch (err) {
                console.log(err);
                reject(err);
            }

        })
    },

    getConnection: () => {
        return new Promise((resolve, reject) => {
            try {
                if (!pool)
                    pool = sql.createPool(_db_settings)

                pool.getConnection((err, connection) => {
                    if (err)
                        reject(err);
                    else
                        resolve(connection);
                });
            } catch (e) {
                reject(e);
            }
        });

    },

    execBulk: (query, params, providedConnection) => {
        return new Promise((resolve, reject) => {
            try {
                console.log(util.format('Query SQL [%s]', query))
                if (!pool)
                    pool = sql.createPool(_db_settings)

                if (providedConnection)
                    providedConnection.query(query, [params], function (err, result) {
                        if (err)
                            reject(err);
                        else
                            resolve(result);
                    });
                else {
                    pool.query(query, [params], (error, results) => {
                        if (error) {
                            console.log(error);
                            reject(error)
                        } else {
                            resolve(results)
                        }
                    });
                }
            } catch (err) {
                console.log(err);
                reject(err);
            }

        })
    },


}
