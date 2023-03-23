!(function () {
  'use strict'
  const e = 'undefined' == typeof self,
    t = e ? {} : self,
    r = (e) => e && 'object' == typeof e && 'function' == typeof e.then
  class n extends Promise {
    constructor(e) {
      let t, n
      super((e, r) => {
        ;(t = e), (n = r)
      }),
        (this._s = 'pending'),
        (this.resolve = (e) => {
          this.isPending &&
            (r(e) ? (this.task = e) : ((this._s = 'fulfilled'), t(e)))
        }),
        (this.reject = (e) => {
          this.isPending && ((this._s = 'rejected'), n(e))
        }),
        (this.task = e)
    }
    get status() {
      return this._s
    }
    get isPending() {
      return 'pending' === this._s
    }
    get isFulfilled() {
      return 'fulfilled' === this._s
    }
    get isRejected() {
      return 'rejected' === this._s
    }
    get task() {
      return this._task
    }
    set task(e) {
      let t
      ;(this._task = e),
        r(e) ? (t = e) : 'function' == typeof e && (t = new Promise(e)),
        t &&
          (async () => {
            try {
              const r = await t
              e === this._task && this.resolve(r)
            } catch (t) {
              e === this._task && this.reject(t)
            }
          })()
    }
    get isEmpty() {
      return null == this._task
    }
  }

  let o, a, s, i, c

  if (
    ('undefined' != typeof navigator &&
      ((o = navigator),
      (a = o.userAgent),
      (s = o.platform),
      (i = o.mediaDevices)),
    !e)
  ) {
    const e = {
        Edge: { search: 'Edg', verSearch: 'Edg' },
        OPR: null,
        Chrome: null,
        Safari: {
          str: o.vendor,
          search: 'Apple',
          verSearch: ['Version', 'iPhone OS', 'CPU OS'],
        },
        Firefox: null,
        Explorer: { search: 'MSIE', verSearch: 'MSIE' },
      },
      t = {
        HarmonyOS: null,
        Android: null,
        iPhone: null,
        iPad: null,
        Windows: { str: s, search: 'Win' },
        Mac: { str: s },
        Linux: { str: s },
      }
    let r = 'unknownBrowser',
      n = 0,
      i = 'unknownOS'
    for (let t in e) {
      const o = e[t] || {}
      let s = o.str || a,
        i = o.search || t,
        c = o.verStr || a,
        d = o.verSearch || t
      if ((d instanceof Array || (d = [d]), -1 != s.indexOf(i))) {
        r = t
        for (let e of d) {
          let t = c.indexOf(e)
          if (-1 != t) {
            n = parseFloat(c.substring(t + e.length + 1))
            break
          }
        }
        break
      }
    }
    for (let e in t) {
      const r = t[e] || {}
      let n = r.str || a,
        o = r.search || e
      if (-1 != n.indexOf(o)) {
        i = e
        break
      }
    }
    'Linux' == i && -1 != a.indexOf('Windows NT') && (i = 'HarmonyOS'),
      (c = { browser: r, version: n, OS: i })
  }
  e && (c = { browser: 'ssr', version: 0, OS: 'ssr' }),
    'undefined' != typeof WebAssembly &&
      a &&
      (!/Safari/.test(a) ||
        /Chrome/.test(a) ||
        /\(.+\s11_2_([2-6]).*\)/.test(a)),
    i && i.getUserMedia
  const d =
    ('Chrome' === c.browser && c.version > 66) ||
    ('Safari' === c.browser && c.version > 13) ||
    ('OPR' === c.browser && c.version > 43) ||
    ('Edge' === c.browser && c.version > 15)
  var l = (function () {
    try {
      if ('undefined' != typeof indexedDB) return indexedDB
      if ('undefined' != typeof webkitIndexedDB) return webkitIndexedDB
      if ('undefined' != typeof mozIndexedDB) return mozIndexedDB
      if ('undefined' != typeof OIndexedDB) return OIndexedDB
      if ('undefined' != typeof msIndexedDB) return msIndexedDB
    } catch (e) {
      return
    }
  })()

  function u(e, t) {
    ;(e = e || []), (t = t || {})
    try {
      return new Blob(e, t)
    } catch (o) {
      if ('TypeError' !== o.name) throw o
      for (
        var r = new ('undefined' != typeof BlobBuilder
            ? BlobBuilder
            : 'undefined' != typeof MSBlobBuilder
            ? MSBlobBuilder
            : 'undefined' != typeof MozBlobBuilder
            ? MozBlobBuilder
            : WebKitBlobBuilder)(),
          n = 0;
        n < e.length;
        n += 1
      )
        r.append(e[n])
      return r.getBlob(t.type)
    }
  }

  function f(e, t) {
    t &&
      e.then(
        function (e) {
          t(null, e)
        },
        function (e) {
          t(e)
        }
      )
  }

  function m(e, t, r) {
    'function' == typeof t && e.then(t), 'function' == typeof r && e.catch(r)
  }

  function h(e) {
    return (
      'string' != typeof e &&
        (console.warn(`${e} used as a key, but it is not a string.`),
        (e = String(e))),
      e
    )
  }

  function g() {
    if (
      arguments.length &&
      'function' == typeof arguments[arguments.length - 1]
    )
      return arguments[arguments.length - 1]
  }

  const y = 'local-forage-detect-blob-support'

  let p

  const b = {},
    v = Object.prototype.toString,
    w = 'readonly',
    S = 'readwrite'

  function _(e) {
    return 'boolean' == typeof p
      ? Promise.resolve(p)
      : (function (e) {
          return new Promise(function (t) {
            var r = e.transaction(y, S),
              n = u([''])
            r.objectStore(y).put(n, 'key'),
              (r.onabort = function (e) {
                e.preventDefault(), e.stopPropagation(), t(!1)
              }),
              (r.oncomplete = function () {
                var e = navigator.userAgent.match(/Chrome\/(\d+)/),
                  r = navigator.userAgent.match(/Edge\//)
                t(r || !e || parseInt(e[1], 10) >= 43)
              })
          }).catch(function () {
            return !1
          })
        })(e).then(function (e) {
          return (p = e), p
        })
  }

  function k(e) {
    var t = b[e.name],
      r = {}
    ;(r.promise = new Promise(function (e, t) {
      ;(r.resolve = e), (r.reject = t)
    })),
      t.deferredOperations.push(r),
      t.dbReady
        ? (t.dbReady = t.dbReady.then(function () {
            return r.promise
          }))
        : (t.dbReady = r.promise)
  }

  function I(e) {
    var t = b[e.name].deferredOperations.pop()
    if (t) return t.resolve(), t.promise
  }

  function M(e, t) {
    var r = b[e.name].deferredOperations.pop()
    if (r) return r.reject(t), r.promise
  }

  function x(e, t) {
    return new Promise(function (r, n) {
      if (
        ((b[e.name] = b[e.name] || {
          forages: [],
          db: null,
          dbReady: null,
          deferredOperations: [],
        }),
        e.db)
      ) {
        if (!t) return r(e.db)
        k(e), e.db.close()
      }
      var o = [e.name]
      t && o.push(e.version)
      var a = l.open.apply(l, o)
      t &&
        (a.onupgradeneeded = function (t) {
          var r = a.result
          try {
            r.createObjectStore(e.storeName),
              t.oldVersion <= 1 && r.createObjectStore(y)
          } catch (r) {
            if ('ConstraintError' !== r.name) throw r
            console.warn(
              'The database "' +
                e.name +
                '" has been upgraded from version ' +
                t.oldVersion +
                ' to version ' +
                t.newVersion +
                ', but the storage "' +
                e.storeName +
                '" already exists.'
            )
          }
        }),
        (a.onerror = function (e) {
          e.preventDefault(), n(a.error)
        }),
        (a.onsuccess = function () {
          var t = a.result
          ;(t.onversionchange = function (e) {
            e.target.close()
          }),
            r(t),
            I(e)
        })
    })
  }

  function C(e) {
    return x(e, !1)
  }

  function P(e) {
    return x(e, !0)
  }

  function D(e, t) {
    if (!e.db) return !0
    var r = !e.db.objectStoreNames.contains(e.storeName),
      n = e.version < e.db.version,
      o = e.version > e.db.version
    if (
      (n &&
        (e.version !== t &&
          console.warn(
            'The database "' +
              e.name +
              '" can\'t be downgraded from version ' +
              e.db.version +
              ' to version ' +
              e.version +
              '.'
          ),
        (e.version = e.db.version)),
      o || r)
    ) {
      if (r) {
        var a = e.db.version + 1
        a > e.version && (e.version = a)
      }
      return !0
    }
    return !1
  }

  function N(e) {
    var t = (function (e) {
      for (
        var t = e.length, r = new ArrayBuffer(t), n = new Uint8Array(r), o = 0;
        o < t;
        o++
      )
        n[o] = e.charCodeAt(o)
      return r
    })(atob(e.data))
    return u([t], { type: e.type })
  }

  function R(e) {
    var t = this,
      r = t._initReady().then(function () {
        var e = b[t._dbInfo.name]
        if (e && e.dbReady) return e.dbReady
      })
    return m(r, e, e), r
  }

  function T(e, t, r, n) {
    void 0 === n && (n = 1)
    try {
      var o = e.db.transaction(e.storeName, t)
      r(null, o)
    } catch (o) {
      if (
        n > 0 &&
        (!e.db || 'InvalidStateError' === o.name || 'NotFoundError' === o.name)
      )
        return Promise.resolve()
          .then(() => {
            if (
              !e.db ||
              ('NotFoundError' === o.name &&
                !e.db.objectStoreNames.contains(e.storeName) &&
                e.version <= e.db.version)
            )
              return e.db && (e.version = e.db.version + 1), P(e)
          })
          .then(() =>
            (function (e) {
              k(e)
              for (var t = b[e.name], r = t.forages, n = 0; n < r.length; n++) {
                const e = r[n]
                e._dbInfo.db && (e._dbInfo.db.close(), (e._dbInfo.db = null))
              }
              return (
                (e.db = null),
                C(e)
                  .then((t) => ((e.db = t), D(e) ? P(e) : t))
                  .then((n) => {
                    e.db = t.db = n
                    for (var o = 0; o < r.length; o++) r[o]._dbInfo.db = n
                  })
                  .catch((t) => {
                    throw (M(e, t), t)
                  })
              )
            })(e).then(function () {
              T(e, t, r, n - 1)
            })
          )
          .catch(r)
      r(o)
    }
  }

  var E = {
    _driver: 'asyncStorage',
    _initStorage: function (e) {
      var t = this,
        r = { db: null }
      if (e) for (var n in e) r[n] = e[n]
      var o = b[r.name]
      o ||
        ((o = { forages: [], db: null, dbReady: null, deferredOperations: [] }),
        (b[r.name] = o)),
        o.forages.push(t),
        t._initReady || ((t._initReady = t.ready), (t.ready = R))
      var a = []
      function s() {
        return Promise.resolve()
      }
      for (var i = 0; i < o.forages.length; i++) {
        var c = o.forages[i]
        c !== t && a.push(c._initReady().catch(s))
      }
      var d = o.forages.slice(0)
      return Promise.all(a)
        .then(function () {
          return (r.db = o.db), C(r)
        })
        .then(function (e) {
          return (r.db = e), D(r, t._defaultConfig.version) ? P(r) : e
        })
        .then(function (e) {
          ;(r.db = o.db = e), (t._dbInfo = r)
          for (var n = 0; n < d.length; n++) {
            var a = d[n]
            a !== t && ((a._dbInfo.db = r.db), (a._dbInfo.version = r.version))
          }
        })
    },
    _support: (function () {
      try {
        if (!l || !l.open) return !1
        var e =
            'undefined' != typeof openDatabase &&
            /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) &&
            !/Chrome/.test(navigator.userAgent) &&
            !/BlackBerry/.test(navigator.platform),
          t =
            'function' == typeof fetch &&
            -1 !== fetch.toString().indexOf('[native code')
        return (
          (!e || t) &&
          'undefined' != typeof indexedDB &&
          'undefined' != typeof IDBKeyRange
        )
      } catch (e) {
        return !1
      }
    })(),
    getItem: function (e, t) {
      var r = this
      e = h(e)
      var n = new Promise(function (t, n) {
        r.ready()
          .then(function () {
            T(r._dbInfo, w, function (o, a) {
              if (o) return n(o)
              try {
                var s = a.objectStore(r._dbInfo.storeName).get(e)
                ;(s.onsuccess = function () {
                  var e = s.result
                  void 0 === e && (e = null),
                    (function (e) {
                      return e && e.__local_forage_encoded_blob
                    })(e) && (e = N(e)),
                    t(e)
                }),
                  (s.onerror = function () {
                    n(s.error)
                  })
              } catch (e) {
                n(e)
              }
            })
          })
          .catch(n)
      })
      return f(n, t), n
    },
    setItem: function (e, t, r) {
      var n = this
      e = h(e)
      var o = new Promise(function (r, o) {
        var a
        n.ready()
          .then(function () {
            return (
              (a = n._dbInfo),
              '[object Blob]' === v.call(t)
                ? _(a.db).then(function (e) {
                    return e
                      ? t
                      : ((r = t),
                        new Promise(function (e, t) {
                          var n = new FileReader()
                          ;(n.onerror = t),
                            (n.onloadend = function (t) {
                              var n = btoa(t.target.result || '')
                              e({
                                __local_forage_encoded_blob: !0,
                                data: n,
                                type: r.type,
                              })
                            }),
                            n.readAsBinaryString(r)
                        }))
                    var r
                  })
                : t
            )
          })
          .then(function (t) {
            T(n._dbInfo, S, function (a, s) {
              if (a) return o(a)
              try {
                var i = s.objectStore(n._dbInfo.storeName)
                null === t && (t = void 0)
                var c = i.put(t, e)
                ;(s.oncomplete = function () {
                  void 0 === t && (t = null), r(t)
                }),
                  (s.onabort = s.onerror = function () {
                    var e = c.error ? c.error : c.transaction.error
                    o(e)
                  })
              } catch (e) {
                o(e)
              }
            })
          })
          .catch(o)
      })
      return f(o, r), o
    },
    removeItem: function (e, t) {
      var r = this
      e = h(e)
      var n = new Promise(function (t, n) {
        r.ready()
          .then(function () {
            T(r._dbInfo, S, function (o, a) {
              if (o) return n(o)
              try {
                var s = a.objectStore(r._dbInfo.storeName).delete(e)
                ;(a.oncomplete = function () {
                  t()
                }),
                  (a.onerror = function () {
                    n(s.error)
                  }),
                  (a.onabort = function () {
                    var e = s.error ? s.error : s.transaction.error
                    n(e)
                  })
              } catch (e) {
                n(e)
              }
            })
          })
          .catch(n)
      })
      return f(n, t), n
    },
    clear: function (e) {
      var t = this,
        r = new Promise(function (e, r) {
          t.ready()
            .then(function () {
              T(t._dbInfo, S, function (n, o) {
                if (n) return r(n)
                try {
                  var a = o.objectStore(t._dbInfo.storeName).clear()
                  ;(o.oncomplete = function () {
                    e()
                  }),
                    (o.onabort = o.onerror = function () {
                      var e = a.error ? a.error : a.transaction.error
                      r(e)
                    })
                } catch (e) {
                  r(e)
                }
              })
            })
            .catch(r)
        })
      return f(r, e), r
    },
    length: function (e) {
      var t = this,
        r = new Promise(function (e, r) {
          t.ready()
            .then(function () {
              T(t._dbInfo, w, function (n, o) {
                if (n) return r(n)
                try {
                  var a = o.objectStore(t._dbInfo.storeName).count()
                  ;(a.onsuccess = function () {
                    e(a.result)
                  }),
                    (a.onerror = function () {
                      r(a.error)
                    })
                } catch (e) {
                  r(e)
                }
              })
            })
            .catch(r)
        })
      return f(r, e), r
    },
    keys: function (e) {
      var t = this,
        r = new Promise(function (e, r) {
          t.ready()
            .then(function () {
              T(t._dbInfo, w, function (n, o) {
                if (n) return r(n)
                try {
                  var a = o.objectStore(t._dbInfo.storeName).openKeyCursor(),
                    s = []
                  ;(a.onsuccess = function () {
                    var t = a.result
                    t ? (s.push(t.key), t.continue()) : e(s)
                  }),
                    (a.onerror = function () {
                      r(a.error)
                    })
                } catch (e) {
                  r(e)
                }
              })
            })
            .catch(r)
        })
      return f(r, e), r
    },
    dropInstance: function (e, t) {
      t = g.apply(this, arguments)
      var r = this.config()
      ;(e = ('function' != typeof e && e) || {}).name ||
        ((e.name = e.name || r.name),
        (e.storeName = e.storeName || r.storeName))
      var n,
        o = this
      if (e.name) {
        const t =
          e.name === r.name && o._dbInfo.db
            ? Promise.resolve(o._dbInfo.db)
            : C(e).then((t) => {
                const r = b[e.name],
                  n = r.forages
                r.db = t
                for (var o = 0; o < n.length; o++) n[o]._dbInfo.db = t
                return t
              })
        n = e.storeName
          ? t.then((t) => {
              if (!t.objectStoreNames.contains(e.storeName)) return
              const r = t.version + 1
              k(e)
              const n = b[e.name],
                o = n.forages
              t.close()
              for (let e = 0; e < o.length; e++) {
                const t = o[e]
                ;(t._dbInfo.db = null), (t._dbInfo.version = r)
              }
              const a = new Promise((t, n) => {
                const o = l.open(e.name, r)
                ;(o.onerror = (e) => {
                  o.result.close(), n(e)
                }),
                  (o.onupgradeneeded = () => {
                    o.result.deleteObjectStore(e.storeName)
                  }),
                  (o.onsuccess = () => {
                    const e = o.result
                    e.close(), t(e)
                  })
              })
              return a
                .then((e) => {
                  n.db = e
                  for (let t = 0; t < o.length; t++) {
                    const r = o[t]
                    ;(r._dbInfo.db = e), I(r._dbInfo)
                  }
                })
                .catch((t) => {
                  throw ((M(e, t) || Promise.resolve()).catch(() => {}), t)
                })
            })
          : t.then((t) => {
              k(e)
              const r = b[e.name],
                n = r.forages
              t.close()
              for (var o = 0; o < n.length; o++) {
                n[o]._dbInfo.db = null
              }
              const a = new Promise((t, r) => {
                var n = l.deleteDatabase(e.name)
                ;(n.onerror = () => {
                  const e = n.result
                  e && e.close(), r(n.error)
                }),
                  (n.onblocked = () => {
                    console.warn(
                      'dropInstance blocked for database "' +
                        e.name +
                        '" until all open connections are closed'
                    )
                  }),
                  (n.onsuccess = () => {
                    const e = n.result
                    e && e.close(), t(e)
                  })
              })
              return a
                .then((e) => {
                  r.db = e
                  for (var t = 0; t < n.length; t++) {
                    I(n[t]._dbInfo)
                  }
                })
                .catch((t) => {
                  throw ((M(e, t) || Promise.resolve()).catch(() => {}), t)
                })
            })
      } else n = Promise.reject('Invalid arguments')
      return f(n, t), n
    },
  }
  const O = new Map()

  function B(e, t) {
    let r = e.name + '/'
    return e.storeName !== t.storeName && (r += e.storeName + '/'), r
  }

  var F = {
    _driver: 'tempStorageWrapper',
    _initStorage: async function (e) {
      const t = {}
      if (e) for (let r in e) t[r] = e[r]
      const r = (t.keyPrefix = B(e, this._defaultConfig))
      ;(this._dbInfo = t), O.has(r) || O.set(r, new Map())
    },
    getItem: function (e, t) {
      e = h(e)
      const r = this.ready().then(() => O.get(this._dbInfo.keyPrefix).get(e))
      return f(r, t), r
    },
    setItem: function (e, t, r) {
      e = h(e)
      const n = this.ready().then(
        () => (
          void 0 === t && (t = null), O.get(this._dbInfo.keyPrefix).set(e, t), t
        )
      )
      return f(n, r), n
    },
    removeItem: function (e, t) {
      e = h(e)
      const r = this.ready().then(() => {
        O.get(this._dbInfo.keyPrefix).delete(e)
      })
      return f(r, t), r
    },
    clear: function (e) {
      const t = this.ready().then(() => {
        const e = this._dbInfo.keyPrefix
        O.has(e) && O.delete(e)
      })
      return f(t, e), t
    },
    length: function (e) {
      const t = this.ready().then(() => O.get(this._dbInfo.keyPrefix).size)
      return f(t, e), t
    },
    keys: function (e) {
      const t = this.ready().then(() => [
        ...O.get(this._dbInfo.keyPrefix).keys(),
      ])
      return f(t, e), t
    },
    dropInstance: function (e, t) {
      if (
        ((t = g.apply(this, arguments)),
        !(e = ('function' != typeof e && e) || {}).name)
      ) {
        const t = this.config()
        ;(e.name = e.name || t.name), (e.storeName = e.storeName || t.storeName)
      }
      let r
      return (
        (r = e.name
          ? new Promise((t) => {
              e.storeName ? t(B(e, this._defaultConfig)) : t(`${e.name}/`)
            }).then((e) => {
              O.delete(e)
            })
          : Promise.reject('Invalid arguments')),
        f(r, t),
        r
      )
    },
  }

  const A = (e, t) => {
      const r = e.length
      let n = 0
      for (; n < r; ) {
        if (
          (o = e[n]) === (a = t) ||
          ('number' == typeof o && 'number' == typeof a && isNaN(o) && isNaN(a))
        )
          return !0
        n++
      }
      var o, a
      return !1
    },
    j =
      Array.isArray ||
      function (e) {
        return '[object Array]' === Object.prototype.toString.call(e)
      },
    U = {},
    J = {},
    W = { INDEXEDDB: E, TEMPSTORAGE: F },
    z = [W.INDEXEDDB._driver, W.TEMPSTORAGE._driver],
    H = ['dropInstance'],
    L = ['clear', 'getItem', 'keys', 'length', 'removeItem', 'setItem'].concat(
      H
    ),
    $ = {
      description: '',
      driver: z.slice(),
      name: 'localforage',
      size: 4980736,
      storeName: 'keyvaluepairs',
      version: 1,
    }

  function V(e, t) {
    e[t] = function () {
      const r = arguments
      return e.ready().then(function () {
        return e[t].apply(e, r)
      })
    }
  }

  function K() {
    for (let e = 1; e < arguments.length; e++) {
      const t = arguments[e]
      if (t)
        for (let e in t)
          t.hasOwnProperty(e) &&
            (j(t[e])
              ? (arguments[0][e] = t[e].slice())
              : (arguments[0][e] = t[e]))
    }
    return arguments[0]
  }

  class Z {
    constructor(e) {
      for (let e in W)
        if (W.hasOwnProperty(e)) {
          const t = W[e],
            r = t._driver
          ;(this[e] = r), U[r] || this.defineDriver(t)
        }
      ;(this._defaultConfig = K({}, $)),
        (this._config = K({}, this._defaultConfig, e)),
        (this._driverSet = null),
        (this._initDriver = null),
        (this._ready = !1),
        (this._dbInfo = null),
        this._wrapLibraryMethodsWithReady(),
        this.setDriver(this._config.driver).catch(() => {})
    }
    config(e) {
      if ('object' == typeof e) {
        if (this._ready)
          return new Error(
            "Can't call config() after localforage has been used."
          )
        for (let t in e) {
          if (
            ('storeName' === t && (e[t] = e[t].replace(/\W/g, '_')),
            'version' === t && 'number' != typeof e[t])
          )
            return new Error('Database version must be a number.')
          this._config[t] = e[t]
        }
        return (
          !('driver' in e) || !e.driver || this.setDriver(this._config.driver)
        )
      }
      return 'string' == typeof e ? this._config[e] : this._config
    }
    defineDriver(e, t, r) {
      const n = new Promise(function (t, r) {
        try {
          const n = e._driver,
            o = new Error(
              'Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver'
            )
          if (!e._driver) return void r(o)
          const a = L.concat('_initStorage')
          for (let t = 0, n = a.length; t < n; t++) {
            const n = a[t]
            if ((!A(H, n) || e[n]) && 'function' != typeof e[n])
              return void r(o)
          }
          const s = function () {
            const t = function (e) {
              return function () {
                const t = new Error(
                    `Method ${e} is not implemented by the current driver`
                  ),
                  r = Promise.reject(t)
                return f(r, arguments[arguments.length - 1]), r
              }
            }
            for (let r = 0, n = H.length; r < n; r++) {
              const n = H[r]
              e[n] || (e[n] = t(n))
            }
          }
          s()
          const i = function (r) {
            U[n] && console.info(`Redefining LocalForage driver: ${n}`),
              (U[n] = e),
              (J[n] = r),
              t()
          }
          '_support' in e
            ? e._support && 'function' == typeof e._support
              ? e._support().then(i, r)
              : i(!!e._support)
            : i(!0)
        } catch (e) {
          r(e)
        }
      })
      return m(n, t, r), n
    }
    driver() {
      return this._driver || null
    }
    getDriver(e, t, r) {
      const n = U[e]
        ? Promise.resolve(U[e])
        : Promise.reject(new Error('Driver not found.'))
      return m(n, t, r), n
    }
    ready(e) {
      const t = this,
        r = t._driverSet.then(
          () => (null === t._ready && (t._ready = t._initDriver()), t._ready)
        )
      return m(r, e, e), r
    }
    setDriver(e, t, r) {
      const n = this
      j(e) || (e = [e])
      const o = this._getSupportedDrivers(e)
      function a() {
        n._config.driver = n.driver()
      }
      function s(e) {
        return (
          n._extend(e), a(), (n._ready = n._initStorage(n._config)), n._ready
        )
      }
      const i =
        null !== this._driverSet
          ? this._driverSet.catch(() => Promise.resolve())
          : Promise.resolve()
      return (
        (this._driverSet = i
          .then(() => {
            const e = o[0]
            return (
              (n._dbInfo = null),
              (n._ready = null),
              n.getDriver(e).then((e) => {
                ;(n._driver = e._driver),
                  a(),
                  n._wrapLibraryMethodsWithReady(),
                  (n._initDriver = (function (e) {
                    return function () {
                      let t = 0
                      return (function r() {
                        for (; t < e.length; ) {
                          let o = e[t]
                          return (
                            t++,
                            (n._dbInfo = null),
                            (n._ready = null),
                            n.getDriver(o).then(s).catch(r)
                          )
                        }
                        a()
                        const o = new Error(
                          'No available storage method found.'
                        )
                        return (n._driverSet = Promise.reject(o)), n._driverSet
                      })()
                    }
                  })(o))
              })
            )
          })
          .catch(() => {
            a()
            const e = new Error('No available storage method found.')
            return (n._driverSet = Promise.reject(e)), n._driverSet
          })),
        m(this._driverSet, t, r),
        this._driverSet
      )
    }
    supports(e) {
      return !!J[e]
    }
    _extend(e) {
      K(this, e)
    }
    _getSupportedDrivers(e) {
      const t = []
      for (let r = 0, n = e.length; r < n; r++) {
        const n = e[r]
        this.supports(n) && t.push(n)
      }
      return t
    }
    _wrapLibraryMethodsWithReady() {
      for (let e = 0, t = L.length; e < t; e++) V(this, L[e])
    }
    createInstance(e) {
      return new Z(e)
    }
  }

  var G = new Z()

  Date.prototype.kUtilFormat = function (e) {
    const t = {
      'M+': this.getUTCMonth() + 1,
      'd+': this.getUTCDate(),
      'H+': this.getUTCHours(),
      'h+': this.getUTCHours() % 12 || 12,
      'm+': this.getUTCMinutes(),
      's+': this.getUTCSeconds(),
      'q+': Math.floor((this.getUTCMonth() + 3) / 3),
      'S+': this.getUTCMilliseconds(),
    }
    ;/(y+)/.test(e) &&
      (e = e.replace(
        RegExp.$1,
        (this.getUTCFullYear() + '').substr(4 - RegExp.$1.length)
      ))
    for (let r in t)
      new RegExp('(' + r + ')').test(e) &&
        (e = e.replace(
          RegExp.$1,
          1 == RegExp.$1.length
            ? t[r]
            : ('000' + t[r]).substr(('000' + t[r]).length - RegExp.$1.length)
        ))
    return e
  }

  let X,
    Y,
    q,
    Q,
    ee,
    te,
    re,
    ne = (e) => {
      let r,
        o,
        a,
        s,
        i,
        c,
        l,
        u,
        f,
        m = t.btoa,
        h = t.atob,
        g = e.bd,
        y = e.dm
      const p = ['https://mlts.dynamsoft.com/', 'https://slts.dynamsoft.com/']
      let b,
        v,
        w,
        S,
        _,
        k,
        I,
        M,
        x,
        C,
        P,
        D,
        N,
        R,
        T,
        E = p,
        O = !1,
        B = Promise.resolve(),
        F =
          (e.log &&
            ((...t) => {
              try {
                e.log.apply(null, t)
              } catch (e) {
                setTimeout(() => {
                  throw e
                }, 0)
              }
            })) ||
          (() => {}),
        A = (g && F) || (() => {}),
        j = (e) => e.join(''),
        U = {
          a: [80, 88, 27, 82, 145, 164, 199, 211],
          b: [187, 87, 89, 128, 150, 44, 190, 213],
          c: [89, 51, 74, 53, 99, 72, 82, 118],
          d: [99, 181, 118, 158, 215, 103, 76, 117],
          e: [99, 51, 86, 105, 100, 71, 120, 108],
          f: [97, 87, 49, 119, 98, 51, 74, 48, 83, 50, 86, 53],
          g: [81, 85, 86, 84, 76, 85, 100, 68, 84, 81, 32, 32],
          h: [90, 87, 53, 106, 99, 110, 108, 119, 100, 65, 32, 32],
          i: [90, 71, 86, 106, 99, 110, 108, 119, 100, 65, 32, 32],
          j: [97, 88, 89, 32],
          k: [29, 83, 122, 137, 5, 180, 157, 114],
          l: [100, 71, 70, 110, 84, 71, 86, 117, 90, 51, 82, 111],
        },
        J = () =>
          t[j(U.c)][j(U.e)][j(U.f)](
            'raw',
            new Uint8Array(U.a.concat(U.b, U.d, U.k)),
            j(U.g),
            !0,
            [j(U.h), j(U.i)]
          ),
        W = (e) => h(h(e.replace(/\n/g, '+').replace(/\s/g, '=')).substring(1)),
        z = (e) =>
          m(String.fromCharCode(97 + 25 * Math.random()) + m(e))
            .replace(/\+/g, '\n')
            .replace(/=/g, ' '),
        H = () => {
          if (t.crypto) {
            let e = new Uint8Array(36)
            t.crypto.getRandomValues(e)
            let r = ''
            for (let t = 0; t < 36; ++t) {
              let n = e[t] % 36
              r += n < 10 ? n : String.fromCharCode(n + 87)
            }
            return r
          }
          return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
            /[xy]/g,
            function (e) {
              var t = (16 * Math.random()) | 0
              return ('x' == e ? t : (3 & t) | 8).toString(16)
            }
          )
        }
      const L = 'Failed to connect to the Dynamsoft License Server: ',
        $ = {
          dlsErrorAndCacheExpire:
            L +
            'The cached license has expired. Please get connected to the network as soon as possible or contact the site administrator for more information.',
          publicTrialNetworkTimeout:
            L +
            'network timed out. Check your Internet connection or [contact Dynamsoft](https://www.dynamsoft.com/company/contact/) for more information.',
          networkTimeout:
            L +
            'network timed out. Check your Internet connection or contact the site administrator for more information.',
          publicTrialFailConnect:
            L +
            'network connection error. Check your Internet connection or [contact Dynamsoft](https://www.dynamsoft.com/company/contact/) for more information.',
          failConnect:
            L +
            'network connection error. Check your Internet connection or contact the site administrator for more information.',
          checkLocalTime:
            'Your system date and time appear to have been changed, causing the license to fail. Please correct the system data and time and try again.',
          idbTimeout: 'Failed to open indexedDB: Timeout.',
        }
      let V,
        K,
        Z,
        X,
        Y = async () => {
          if (V) return V
          ;(V = new n()),
            await (async () => {
              I || (I = G)
            })(),
            await Promise.race([
              (async () => {
                let e = await I.createInstance({ name: 'dynamjssdkhello' })
                await e.setItem('dynamjssdkhello', 'available')
              })(),
              new Promise((e, t) => {
                setTimeout(() => t(new Error($.idbTimeout)), 5e3)
              }),
            ]),
            (x = await I.createInstance({ name: 'dynamdlsinfo' })),
            (C = m(
              m('v2') +
                String.fromCharCode(y.charCodeAt(y.length / 2) + 1) +
                m(y)
            ))
          try {
            let e = await x.getItem(C)
            if (!e) {
              let t = await I.createInstance({ name: 'dynamltsinfo' })
              ;(e = await t.getItem(C)), e && (await x.setItem(C, e))
            }
            e && ([l, _] = JSON.parse(await W(e)))
          } catch (e) {}
          try {
            null == l &&
              ((l = H()), x.setItem(C, await z(JSON.stringify([l, null]))))
          } catch (e) {}
          V.resolve()
        },
        q = async () => {
          ;(P = m(
            String.fromCharCode(s.charCodeAt(0) + 10) +
              m(r) +
              m(s) +
              a +
              m('' + c)
          )),
            (M = await I.createInstance({
              name:
                'dynamdlsuns' +
                m(m('v2')) +
                m(
                  String.fromCharCode(s.charCodeAt(0) + 10) +
                    m(r) +
                    m(s) +
                    a +
                    m('' + c)
                ),
            }))
          try {
            i = await x.getItem(P)
          } catch (e) {}
          j = (e) =>
            h(
              String.fromCharCode
                .apply(null, e)
                .replace(/\n/g, '+')
                .replace(/\s/g, '=')
            )
        },
        Q = async (e) => {
          if (((Z = Date.now()), K)) return K
          K = new n()
          try {
            let t = {
              pd: r,
              vm: a,
              v: o,
              dt: c || 'browser',
              ed: 'javascript',
              cu: l,
              ad: y,
              os: u,
              fn: f,
            }
            w && (t.rmk = w),
              s &&
                (t = -1 != s.indexOf('-') ? { ...t, hs: s } : { ...t, og: s })
            let n = {}
            if (_) {
              let e = await x.getItem(C)
              e && ([l, _] = JSON.parse(await W(e))), (n['lts-time'] = _)
            }
            v && (t.sp = v)
            let d = await Promise.race([
              (async () => {
                let r,
                  o = new Date().kUtilFormat('yyyy-MM-ddTHH:mm:ss.SSSZ')
                _ && (x.setItem(C, await z(JSON.stringify([l, o]))), (_ = o))
                let a = 'auth/?ext=' + encodeURIComponent(m(JSON.stringify(t)))
                S && (a += '&v=' + encodeURIComponent(S))
                let s,
                  c = !1,
                  d = !1,
                  u = async (e) => {
                    if (e && !e.ok)
                      try {
                        let t = await e.text()
                        if (t) {
                          let e = JSON.parse(t)
                          e.errorCode &&
                            ((s = e),
                            e.errorCode > 100 &&
                              e.errorCode < 200 &&
                              ((i = null), (c = !0), (d = !0)))
                        }
                      } catch (e) {}
                  }
                try {
                  ;(r = await Promise.race([
                    fetch(E[0] + a, {
                      headers: n,
                      cache: e ? 'reload' : 'default',
                      mode: 'cors',
                    }),
                    new Promise((e, t) => setTimeout(t, 1e4)),
                  ])),
                    await u(r)
                } catch (e) {}
                if (!(i || (r && r.ok) || c))
                  try {
                    ;(r = await Promise.race([
                      fetch(E[1] + a, { headers: n, mode: 'cors' }),
                      new Promise((e, t) => setTimeout(t, 3e4)),
                    ])),
                      await u(r)
                  } catch (e) {}
                if (!(i || (r && r.ok) || c))
                  try {
                    ;(r = await Promise.race([
                      fetch(E[0] + a, { headers: n, mode: 'cors' }),
                      new Promise((e, t) => setTimeout(t, 3e4)),
                    ])),
                      await u(r)
                  } catch (e) {}
                s &&
                  151 == s.errorCode &&
                  (x.removeItem(C),
                  x.removeItem(P),
                  (l = H()),
                  (t.cu = l),
                  (_ = void 0),
                  (a = 'auth/?ext=' + encodeURIComponent(m(JSON.stringify(t)))),
                  (r = await Promise.race([
                    fetch(E[0] + a, { headers: n, mode: 'cors' }),
                    new Promise((e, t) => setTimeout(t, 3e4)),
                  ])),
                  await u(r))
                ;(() => {
                  if (!r || !r.ok) {
                    let e
                    d && x.setItem(P, ''),
                      s
                        ? 111 == s.errorCode
                          ? (e = s.message)
                          : ((e = s.message.trim()),
                            e.endsWith('.') || (e += '.'),
                            (e = b
                              ? `An error occurred during authorization: ${e} [Contact Dynamsoft](https://www.dynamsoft.com/company/contact/) for more information.`
                              : `An error occurred during authorization: ${e} Contact the site administrator for more information.`))
                        : (e = b ? $.publicTrialFailConnect : $.failConnect)
                    let t = Error(e)
                    throw (
                      (s && s.errorCode && (t.ltsErrorCode = s.errorCode), t)
                    )
                  }
                })()
                let f = await r.text()
                try {
                  _ || (x.setItem(C, await z(JSON.stringify([l, o]))), (_ = o)),
                    x.setItem(P, f)
                } catch (e) {}
                return f
              })(),
              new Promise((e, t) => {
                let r
                ;(r = b ? $.publicTrialNetworkTimeout : $.networkTimeout),
                  setTimeout(() => t(new Error(r)), i ? 3e3 : 15e3)
              }),
            ])
            i = d
          } catch (e) {
            g && console.error(e), (k = e)
          }
          K.resolve(), (K = null)
        },
        ee = async () => {
          X ||
            (X = (async () => {
              if ((A(l), !i)) {
                if (!O) throw (F(k.message), k)
                return
              }
              let e = { dm: y }
              g && (e.bd = !0),
                (e.brtk = !0),
                (e.ls = E[0]),
                s && (-1 != s.indexOf('-') ? (e.hs = s) : (e.og = s)),
                (e.cu = l),
                f && (e.fn = f),
                r && (e.pd = r),
                o && (e.v = o),
                c && (e.dt = c),
                u && (e.os = u),
                w && (e.rmk = w),
                A(i)
              try {
                let r = JSON.parse(
                  await (async (e) => {
                    if (
                      t[j(U.c)] &&
                      t[j(U.c)][j(U.e)] &&
                      t[j(U.c)][j(U.e)][j(U.f)]
                    ) {
                      let r = h(e),
                        n = new Uint8Array(r.length)
                      for (let e = 0; e < r.length; ++e) n[e] = r.charCodeAt(e)
                      let o = n.subarray(0, 12),
                        a = n.subarray(o.length)
                      T || (T = await J())
                      let s = await t[j(U.c)][j(U.e)][j(U.i)](
                        { name: j(U.g), [j(U.j)]: o, [j(U.l)]: 128 },
                        T,
                        a
                      )
                      return String.fromCharCode.apply(null, new Uint8Array(s))
                    }
                  })(i)
                )
                r.ba && (e.ba = r.ba),
                  r.usu && (e.usu = r.usu),
                  r.trial && (e.trial = r.trial),
                  r.its && (e.its = r.its),
                  1 == e.trial && r.msg
                    ? (e.msg = r.msg)
                    : k
                    ? (e.msg = k.message || k)
                    : r.msg && (e.msg = r.msg),
                  (e.ar = r.in),
                  (e.bafc = !!k)
              } catch (e) {}
              A(e)
              try {
                await D(e)
              } catch (e) {
                A('error updl')
              }
              await te(), O || (O = !0), (X = null)
            })()),
            await X
        },
        te = async () => {
          let e = new Date().kUtilFormat('yyyy-MM-ddTHH:mm:ss.SSSZ'),
            t = await R()
          if ((A(t), t && t < e))
            throw k
              ? new Error($.dlsErrorAndCacheExpire)
              : new Error($.checkLocalTime)
        }
      const re = new n()
      let ne = null,
        oe = async (e, t) => (
          (B = B.then(async () => {
            try {
              let r = await M.keys()
              if (
                (t ||
                  (re.isFulfilled
                    ? e && (r = r.filter((t) => t < e))
                    : e && r.includes(e)
                    ? (r = [e])
                    : ((r = []), A('Unexpected null key'))),
                !r.length)
              )
                return
              for (let e = 0; e < r.length / 1e3; ++e) {
                let t = r.slice(1e3 * e, 1e3 * (e + 1)),
                  n = []
                for (let e = 0; e < t.length; ++e) n.push(await M.getItem(t[e]))
                _ = new Date().kUtilFormat('yyyy-MM-ddTHH:mm:ss.SSSZ')
                {
                  let e = await x.getItem(C)
                  e && ([l] = JSON.parse(await W(e))),
                    x.setItem(C, await z(JSON.stringify([l, _])))
                }
                try {
                  let e,
                    r,
                    o = E[0] + 'verify/v2'
                  _ && (o += '?ltstime=' + encodeURIComponent(_))
                  try {
                    e = fetch(o, {
                      method: 'POST',
                      body: n.join(';'),
                      keepalive: !0,
                    })
                  } finally {
                    !re.isFulfilled && d && re.resolve()
                  }
                  try {
                    r = await e
                  } finally {
                    re.isFulfilled || re.resolve()
                  }
                  if (!r.ok)
                    throw new Error('verify failed. Status Code: ' + r.status)
                  for (let e = 0; e < t.length; ++e) await M.removeItem(t[e])
                } catch (e) {
                  throw (re.isFulfilled || re.resolve(), e)
                }
              }
            } catch (e) {}
          })),
          await B
        )
      return {
        i: async (e) => {
          ;(r = e.pd),
            (o = e.v),
            (a = o.split('.')[0]),
            e.dt && (c = e.dt),
            (s = e.l || ''),
            (u = 'string' != typeof e.os ? JSON.stringify(e.os) : e.os),
            (f = e.fn),
            'string' == typeof f && (f = f.substring(0, 50)),
            e.ls && e.ls.length && ((E = e.ls), 1 == E.length && E.push(E[0])),
            (b = p === E && (!s || '200001' === s || s.startsWith('200001-'))),
            (v = e.sp),
            (w = e.rmk),
            e.cv && (S = '' + e.cv),
            (D = e.updl),
            (N = e.mnet),
            (R = e.mxet),
            await Y(),
            await q(),
            await Q(),
            await ee(),
            (!k || (k.ltsErrorCode >= 102 && k.ltsErrorCode <= 120)) &&
              oe(null, !0)
        },
        c: async () => {
          let e = new Date()
          if (e.getTime() < Z + 36e4) return
          let t = e.kUtilFormat('yyyy-MM-ddTHH:mm:ss.SSSZ'),
            r = await N(),
            n = await R()
          if (n && n < t) await Q(!0), await ee()
          else if (r && r < t) {
            let t = new Date(e.getTime())
            t.setMinutes(e.getMinutes() - 6)
            let r = t.kUtilFormat('yyyy-MM-ddTHH:mm:ss.SSSZ')
            _ < r && Q().then(() => ee())
          }
        },
        s: async (e, r, n, o) => {
          try {
            let e
            ;(e =
              r.startsWith('{') && r.endsWith('}')
                ? await (async (e) => {
                    if (
                      t[j(U.c)] &&
                      t[j(U.c)][j(U.e)] &&
                      t[j(U.c)][j(U.e)][j(U.f)]
                    ) {
                      let r = new Uint8Array(e.length)
                      for (let t = 0; t < e.length; ++t) r[t] = e.charCodeAt(t)
                      let n = t.crypto.getRandomValues(new Uint8Array(12))
                      T || (T = await J())
                      let o = await t[j(U.c)][j(U.e)][j(U.h)](
                          { name: j(U.g), [j(U.j)]: n, [j(U.l)]: 128 },
                          T,
                          r
                        ),
                        a = new Uint8Array(o),
                        s = new Uint8Array(n.length + a.length)
                      return (
                        s.set(n),
                        s.set(a, n.length),
                        m(String.fromCharCode.apply(null, s))
                      )
                    }
                  })(r)
                : r),
              e
                ? (A('bs ' + n), await M.setItem(n, e), A('ss ' + n))
                : A('ept ecpt')
          } catch (e) {}
          o && (A('bd ' + n), await oe(n, 2 == o), A('sd ' + n)),
            ne && clearTimeout(ne),
            (ne = setTimeout(async () => {
              await oe()
            }, 36e4))
        },
        p: re,
        u: async () => (await Y(), l),
      }
    },
    oe = t,
    ae = 'dbr',
    se = !1,
    ie = 'BarcodeReaderWasm',
    ce = 0,
    de = 0

  let le = new n(),
    ue = !1,
    fe = async (e) => {
      await le, (ee = e.trial), (te = e.msg), Module[ie].init(JSON.stringify(e))
    },
    me = () => {
      let e = Module[ie].getMinExpireTime
      return e ? e() : null
    },
    he = () => {
      let e = Module[ie].getMaxExpireTime
      return e ? e() : null
    },
    ge = new Map(),
    ye = 0,
    pe = !1,
    be = async function (e) {
      const r = e.data ? e.data : e,
        n = r.id,
        o = r.instanceID,
        a = r.body
      switch (
        (!Q ||
          ('decodeBuffer' != r.type && 'decodeFileInMemory' != r.type) ||
          (await re.c()),
        r.type)
      ) {
        case 'loadWasm':
          try {
            ;(X = r.bd),
              (Y = r.engineResourcePath),
              (se = r.bUseFullFeature),
              (q = r.v)
            let e = r.dm,
              n = r.l
            Q = r.brtk
            let o,
              a = r.bptk
            ;(async () => {
              if (ue) throw "can't load wasm twice"
              ;(ue = !0), ve('wasm loading...')
              let e = Date.now()
              await new Promise(async (e) => {
                ;(t.KModule = t.Module = {
                  locateFile: function (e) {
                    return ['dbr.full.wasm.wasm', 'dbr.wasm.wasm'].includes(e)
                      ? 'Safari' === c.browser &&
                        [11, 12].includes(Math.floor(c.version))
                        ? Y +
                          ae +
                          '-' +
                          q +
                          '.standby' +
                          (se ? '.full' : '') +
                          '.wasm'
                        : Y + ae + '-' + q + (se ? '.full' : '') + '.wasm'
                      : Y + e
                  },
                  print: (e) => {
                    ve(e)
                  },
                  printErr: (e) => {
                    console.error(e), ve(e)
                  },
                  onRuntimeInitialized: e,
                }),
                  'Safari' === c.browser &&
                  [11, 12].includes(Math.floor(c.version))
                    ? importScripts(
                        Y +
                          ae +
                          '-' +
                          q +
                          '.standby' +
                          (se ? '.full' : '') +
                          '.wasm.js'
                      )
                    : importScripts(
                        Y + ae + '-' + q + (se ? '.full' : '') + '.wasm.js'
                      )
              }),
                ve('wasm initialized, cost ' + (Date.now() - e) + ' ms'),
                (Module = KModule),
                le.resolve()
            })()
            let s = async () => {
                try {
                  ;(re = ne({ log: ve, bd: X, dm: e })),
                    (t.scsd = re.s),
                    (r.pd = 'dbr'),
                    (r.updl = fe),
                    (r.mnet = me),
                    (r.mxet = he),
                    await re.i(r)
                } catch (e) {
                  if (!a) throw e
                  ;(Q = !1),
                    await i(),
                    (o = e.ltsErrorCode),
                    (te = e.message || e)
                }
              },
              i = async () => {
                let t = { pk: n, dm: e }
                X && (t.bd = !0), await fe(t)
              }
            Q ? await s() : await i(),
              oe.postMessage({
                type: 'load',
                success: !0,
                version: Module[ie].getVersion(),
                trial: ee,
                ltsErrorCode: o,
                message: te,
              })
          } catch (e) {
            let t = e && e.message
            oe.postMessage({
              type: 'load',
              success: !1,
              ltsErrorCode: e && e.ltsErrorCode,
              message: t,
              trial: ee,
              stack: X && e ? e.stack : null,
            })
          }
          break
        case 'createInstance': {
          const e = ye++
          try {
            let t = new Module[ie](r.bScanner, e)
            ge.set(e, t)
            let n = JSON.parse(t.getRuntimeSettings())
            r.bScanner
              ? ((n.localizationModes = [2, 0, 0, 0, 0, 0, 0, 0]),
                (n.deblurLevel = 0))
              : ((n.expectedBarcodesCount = 512),
                (n.scaleDownThreshold = 1e5),
                (n.timeout = 1e5)),
              se || (n.barcodeFormatIds = 238028799),
              t.updateRuntimeSettings(JSON.stringify(n))
          } catch (e) {
            Se(e, n)
            break
          }
          oe.postMessage({
            type: 'task',
            id: n,
            body: { success: !0, instanceID: e },
          })
          break
        }
        case 'destroyContext':
          try {
            if (!ge.get(o)) break
            ge.get(o).delete(), ge.delete(o)
          } catch (e) {
            Se(e, n)
            break
          }
          oe.postMessage({ type: 'task', id: n, body: { success: !0 } })
          break
        case 'decodeBuffer': {
          let e,
            t,
            r,
            s,
            i = Date.now()
          try {
            ;(e = X ? Date.now() : 0),
              (d = a.buffer),
              (l = a.stride * a.height) > ce &&
                (de && Module._free(de), (de = Module._malloc(l)), (ce = l)),
              Module.HEAPU8.set(d.subarray(0, l), de),
              (t = X ? Date.now() : 0),
              (s = JSON.parse(
                ge
                  .get(o)
                  .decodeBufferPtr(
                    de,
                    a.width,
                    a.height,
                    a.stride,
                    a.format,
                    void 0 === a.orientation ? 0 : a.orientation,
                    !(!a.config || !a.config.bScanner)
                  )
              )),
              (r = Date.now())
          } catch (e) {
            Se(e, n)
            break
          }
          !pe &&
            Q &&
            re.p.isPending &&
            (await Promise.race([re.p, new Promise((e) => setTimeout(e, 500))]),
            (pe = !0)),
            oe.postMessage(
              {
                type: 'task',
                id: n,
                body: {
                  success: !0,
                  decodeReturn: s,
                  buffer: a.buffer,
                  duration: Date.now() - i,
                },
              },
              [a.buffer.buffer]
            ),
            we(
              [
                'timeWorkerGetMsg: ' + i,
                'timeBeforeSendBufferToWasm: ' + e + ' ' + (e - i),
                'timeBeforeDecode: ' + t + ' ' + (t - e),
                'timeFinishDecode: ' + r + ' ' + (r - t),
              ].join('\n')
            )
          break
        }
        case 'decodeFileInMemory': {
          let e, t, r
          try {
            ;(t = X ? Date.now() : 0),
              (e = JSON.parse(ge.get(o).decodeFileInMemory(a.bytes))),
              (r = X ? Date.now() : 0)
          } catch (e) {
            Se(e, n)
            break
          }
          oe.postMessage({
            type: 'task',
            id: n,
            body: { success: !0, decodeReturn: e, duration: r - t },
          })
          break
        }
        case 'clearMapDecodeRecord':
          try {
            ge.get(o).clearMapDecodeRecord()
          } catch (e) {
            Se(e, n)
            break
          }
          oe.postMessage({ type: 'task', id: n, body: { success: !0 } })
          break
        case 'getRuntimeSettings': {
          let e
          try {
            e = ge.get(o).getRuntimeSettings()
          } catch (e) {
            Se(e, n)
            break
          }
          oe.postMessage({
            type: 'task',
            id: n,
            body: { success: !0, results: e },
          })
          break
        }
        case 'updateRuntimeSettings': {
          let e
          try {
            e = JSON.parse(ge.get(o).updateRuntimeSettings(a.settings))
          } catch (e) {
            Se(e, n)
            break
          }
          oe.postMessage({
            type: 'task',
            id: n,
            body: { success: !0, updateReturn: e },
          })
          break
        }
        case 'resetRuntimeSettings':
          try {
            let e = ge.get(o)
            e.resetRuntimeSettings()
            let t = JSON.parse(e.getRuntimeSettings())
            e.bScanner
              ? ((t.expectedBarcodesCount = 1),
                (t.deblurLevel = 0),
                (t.localizationModes = [16, 2, 0, 0, 0, 0, 0, 0]))
              : ((t.expectedBarcodesCount = 512),
                (t.scaleDownThreshold = 1e5),
                (t.timeout = 1e5)),
              se || (t.barcodeFormatIds = 238028799),
              e.updateRuntimeSettings(JSON.stringify(t)),
              e.bScanner &&
                (e.setModeArgument(
                  'BinarizationModes',
                  0,
                  'EnableFillBinaryVacancy',
                  '0'
                ),
                e.setModeArgument('LocalizationModes', 0, 'ScanDirection', '2'),
                e.setModeArgument('BinarizationModes', 0, 'BlockSizeX', '71'),
                e.setModeArgument('BinarizationModes', 0, 'BlockSizeY', '71'))
          } catch (t) {
            Se(e, n)
            break
          }
          oe.postMessage({ type: 'task', id: n, body: { success: !0 } })
          break
        case 'resetRuntimeSettingsToCppDefault':
          try {
            ge.get(o).resetRuntimeSettings()
          } catch (t) {
            Se(e, n)
            break
          }
          oe.postMessage({ type: 'task', id: n, body: { success: !0 } })
          break
        case 'outputRuntimeSettingsToString': {
          let e
          try {
            e = ge.get(o).outputSettingsToString()
          } catch (e) {
            Se(e, n)
            break
          }
          oe.postMessage({
            type: 'task',
            id: n,
            body: { success: !0, results: e },
          })
          break
        }
        case 'initRuntimeSettingsWithString': {
          let e
          try {
            e = JSON.parse(ge.get(o).initRuntimeSettingsWithString(a.settings))
          } catch (e) {
            Se(e, n)
            break
          }
          oe.postMessage({
            type: 'task',
            id: n,
            body: { success: !0, initReturn: e },
          })
          break
        }
        case 'getIntermediateResults': {
          let e = []
          try {
            var s = ge.get(o).getIntermediateResults(),
              i = JSON.parse(s, (t, r) => {
                if ('bytes' === t && 'ptr' in r && 'length' in r) {
                  var n = r,
                    o = n.ptr,
                    a = n.length
                  let t = Module[ie].getBytes(o, a)
                  return (t = t.slice(0)), e.push(t.buffer), t
                }
                return r
              })
          } catch (e) {
            Se(e, n)
            break
          }
          oe.postMessage(
            { type: 'task', id: n, body: { success: !0, results: i } },
            e
          ),
            ge.get(o).freeIntermediateResults()
          break
        }
        case 'setModeArgument': {
          let e
          try {
            e = JSON.parse(
              ge
                .get(o)
                .setModeArgument(
                  a.modeName,
                  a.index,
                  a.argumentName,
                  a.argumentValue
                )
            )
          } catch (e) {
            Se(e, n)
            break
          }
          oe.postMessage({
            type: 'task',
            id: n,
            body: { success: !0, setReturn: e },
          })
          break
        }
        case 'getModeArgument': {
          let e
          try {
            e = JSON.parse(
              ge.get(o).getModeArgument(a.modeName, a.index, a.argumentName)
            )
          } catch (e) {
            Se(e, n)
            break
          }
          oe.postMessage({
            type: 'task',
            id: n,
            body: { success: !0, getReturn: e },
          })
          break
        }
        case 'updateScanSettings':
          try {
            let e = ge.get(o),
              t = a.settings
            ;(e.duplicateForgetTime = t.duplicateForgetTime),
              (e.oneDRememberFrameCount = t.oneDRememberFrameCount),
              (e.oneDTrustFrameCount = t.oneDTrustFrameCount)
          } catch (e) {
            Se(e, n)
            break
          }
          oe.postMessage({ type: 'task', id: n, body: { success: !0 } })
          break
        case 'getScanSettings': {
          let e = {}
          try {
            let t = ge.get(o)
            ;(e.duplicateForgetTime = t.duplicateForgetTime),
              (e.oneDRememberFrameCount = t.oneDRememberFrameCount),
              (e.oneDTrustFrameCount = t.oneDTrustFrameCount)
          } catch (e) {
            Se(e, n)
            break
          }
          oe.postMessage({
            type: 'task',
            id: n,
            body: { success: !0, results: e },
          })
          break
        }
        default:
          console.warn('Unmatched task: ', e)
      }
      var d, l
    }

  oe.onmessage = be

  let ve = (e) => {
      oe.postMessage({ type: 'log', message: e })
    }

  let we = (e) => {
      X && ve(e)
    }
  
  let Se = (e, t) => {
      oe.postMessage({
        type: 'task',
        id: t,
        body: { success: !1, message: e.message, stack: e.stack },
      }),
        setTimeout(() => {
          throw e
        }, 0)
    }

})()
