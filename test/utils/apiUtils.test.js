import assert from 'assert';
import api from '../../src/js/utils/apiUtil';
import request from 'superagent';
import sinon from 'sinon';

// shared
// call _ajaxRequest
function shouldCallAjaxRequest(testTarget, method, endpoint) {
  describe('',() => {
    afterEach(() => {
      api._ajaxRequest.restore();
    });

    // common test variables
    const params = {params: 'params'};
    const token = 'token';

    describe('when it gets token', () => {
      it('should call _ajaxRequest once with correct args', () => {
        // define spy
        const spy = sinon.spy(api, '_ajaxRequest');

        // call test target method
        api[testTarget](endpoint, params, token);

        // assert
        assert(true, spy.calledOnce);
        assert(true, spy.calledWith(method, endpoint, params, token));
      });
    });

    describe('when it does not get token', () => {
      it('should call _ajaxRequest once with correct args', () => {
        // define spy
        const spy = sinon.spy(api, '_ajaxRequest');

        // call test target method
        api[testTarget](endpoint, params);

        // assert
        assert(true, spy.calledOnce);
        assert(true, spy.calledWith(method, endpoint, params, undefined));
      });
    });
  });
}


describe('apiUtils', () => {
  describe('ajaxGet', () => {
    // test variables
    const method = request.get;
    const endpoint = 'http://httpbin.org/get';

    // call shared behavior
    shouldCallAjaxRequest('ajaxGet', method, endpoint);
  });

  describe('ajaxPost', () => {
    // test variables
    const method = request.post;
    const endpoint = 'http://httpbin.org/post';

    // call shared behavior
    shouldCallAjaxRequest('ajaxPost', method, endpoint);
  });

  describe('ajaxDelete', () => {
    // test variables
    const method = request.del;
    const endpoint = 'http://httpbin.org/delete';

    // call shared behavior
    shouldCallAjaxRequest('ajaxDelete', method, endpoint);
  });

  describe('ajaxPatch', () => {
    // test variables
    const method = request.patch;
    const endpoint = 'http://httpbin.org/patch';

    // call shared behavior
    shouldCallAjaxRequest('ajaxPatch', method, endpoint);
  });


  describe('_makeHeader', () => {
    describe('when it gets truthy token', () => {
      it('should return object has Authorization property', () => {
        const token = 'token';
        const expected = {Authorization: token};

        assert(expected, api._makeHeader(token));
      });
    });

    describe('when it gets falsy token', () => {
      it('should return empty object', () => {
        const token = undefined;
        const expected = {};

        assert(expected, api._makeHeader(token));
      });
    });
  });


  describe('_ajaxRequest', () => {
    afterEach(() => {
      api._makeHeader.restore();
    });

    describe('success call', () => {
      it('should return Promise object and call _makeHeader once with token', () => {
        // test variables
        const method = request.get;
        const endpoint = 'http://httpbin.org/get';
        const params = {params: 'params'};
        const token = 'token';

        // define spy
        const spy = sinon.spy(api, '_makeHeader');

        // call test target method
        api._ajaxRequest(method, endpoint, params, token)
        .then((obj) => {
          assert(true, obj instanceof object);
          assert(true, spy.calledOnce);
          assert(true, spy.calledWith(token));
        })
        .catch((obj) => {
          throw new Exception('it should execute `then` block.');
        });
      });
    });

    describe('failed call', () => {
      it('should return Promise object and call _makeHeader once with token', () => {
        // test variables
        const method = request.post;
        const endpoint = 'http://httpbin.org/get';
        const params = {params: 'params'};
        const token = 'token';

        // define spy
        const spy = sinon.spy(api, '_makeHeader');

        // call test target method
        api._ajaxRequest(method, endpoint, params, token)
        .then((obj) => {
          throw new Exception('it should execute `catch` block.');
        })
        .catch((obj) => {
          assert(true, ret instanceof object);
          assert(true, spy.calledOnce);
          assert(true, spy.calledWith(token));
        });
      });
    });
  });
});
