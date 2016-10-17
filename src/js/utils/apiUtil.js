import request from 'superagent';

class Api {

  /**
   * GETメソッドでAPIを投げる
   *
   * @param {string} endpoint - APIエンドポイントURL
   * @param {object} params - パラメータ
   * @param {string} token - jwtトークン
   * @returns {Promise} APIの戻り
   */
  static ajaxGet(endpoint, params, token = undefined) {
    return this._ajaxRequest(request.get, endpoint, params, token);
  }


  /**
   * POSTメソッドでAPIを投げる
   *
   * @param {string} endpoint - APIエンドポイントURL
   * @param {object} params - パラメータ
   * @param {string} token - jwtトークン
   * @returns {Promise} APIの戻り
   */
  static ajaxPost(endpoint, params, token = undefined) {
    return this._ajaxRequest(request.post, endpoint, params, token);
  }


  /**
   * DELETEメソッドでAPIを投げる
   *
   * @param {string} endpoint - APIエンドポイントURL
   * @param {object} params - パラメータ
   * @param {string} token - jwtトークン
   * @returns {Promise} APIの戻り
   */
  static ajaxDelete(endpoint, params, token = undefined) {
    return this._ajaxRequest(request.del, endpoint, params, token);
  }


  /**
   * PATCHメソッドでAPIを投げる
   *
   * @param {string} endpoint - APIエンドポイントURL
   * @param {object} params - パラメータ
   * @param {string} token - jwtトークン
   * @returns {Promise} APIの戻り
   */
  static ajaxPatch(endpoint, params, token = undefined) {
    return this._ajaxRequest(request.patch, endpoint, params, token);
  }


  /**
   * tokenの有無に応じたヘッダーを作成する
   *
   * @param {string} token - jwtトークン
   * @returns {object} リクエストヘッダー
   */
  static _makeHeader(token) {
    return token ? {Authorization: token} : {};
  }


  /**
   * 汎用ajaxリクエストメソッド
   *
   * @param {string} endpoint - APIエンドポイントURL
   * @param {object} params - パラメータ
   * @param {string} token - jwtトークン
   * @returns {Promise} APIの戻り
   */
  static _ajaxRequest(method, endpoint, params, token) {
    return new Promise(
      (resolve, reject) => {
        method(endpoint)
        .withCredentials()
        .send(params)
        .set(this._makeHeader(token))
        .end((err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(JSON.parse(res.text));
          }
        });
      }
    );
  }
}

module.exports = Api;
