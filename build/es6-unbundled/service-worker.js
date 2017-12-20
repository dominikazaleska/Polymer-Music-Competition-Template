/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["bower_components/app-layout/app-drawer-layout/app-drawer-layout.html","1d59e0ed57fa72c8c192147925eb844c"],["bower_components/app-layout/app-drawer/app-drawer.html","c93a7976d3bfad91061c8461529751b2"],["bower_components/app-layout/app-header-layout/app-header-layout.html","6901fbc31ce398b1eb08b0465b505431"],["bower_components/app-layout/app-header/app-header.html","2cd5d5d7c9bdabc63ac870d0b1ae8610"],["bower_components/app-layout/app-layout-behavior/app-layout-behavior.html","68c44a7d0ce56eec5179385ddd1fcad5"],["bower_components/app-layout/app-scroll-effects/app-scroll-effects-behavior.html","b50a6011f9cb492c9e2a83d2f8955399"],["bower_components/app-layout/app-scroll-effects/effects/waterfall.html","af6cf17fbb4f94216eea9d2e6c26a775"],["bower_components/app-layout/app-toolbar/app-toolbar.html","1969068eeac3ed606025f04bf7871282"],["bower_components/app-layout/helpers/helpers.html","1da38888481edb36a5d7f15a8633dd9f"],["bower_components/app-route/app-location.html","8fd3320544adb5e25f032dc9ca593d45"],["bower_components/app-route/app-route-converter-behavior.html","67ec6daf2bbe9f59beecbdd5b863af14"],["bower_components/app-route/app-route.html","bee92f77d4503b43a33d1761a33936d7"],["bower_components/app-storage/app-network-status-behavior.html","974bc78cfcc967de98b5d7b54826d079"],["bower_components/app-storage/app-storage-behavior.html","50424b44ed5f5b55a9de73a4ac768970"],["bower_components/firebase/firebase-app.js","2c0842d25b7cee7535d8db5588d697c8"],["bower_components/firebase/firebase-auth.js","3e6f33a96985cb73c50432822a5cb736"],["bower_components/firebase/firebase-database.js","4ac3a83b78cc6992b1a9c39b73763335"],["bower_components/firebase/firebase-messaging.js","70936a52786bb69645467986a88c59df"],["bower_components/firebase/firebase-storage.js","bdacabda544aaac9adb1314de6c37cbf"],["bower_components/font-roboto/roboto.html","3dd603efe9524a774943ee9bf2f51532"],["bower_components/google-apis/google-youtube-api.html","ca2806467a47a6abbb6c03e6a2a4aea2"],["bower_components/google-youtube/google-youtube.html","c6c121482a3e23eb901788854f726408"],["bower_components/iron-a11y-announcer/iron-a11y-announcer.html","1844b46b152179da8a8d2b8a8093f06c"],["bower_components/iron-a11y-keys-behavior/iron-a11y-keys-behavior.html","29525580c0d4f39a6d65ef1ea65dfa7b"],["bower_components/iron-ajax/iron-ajax.html","f3f383a10317908599e2487245a41069"],["bower_components/iron-ajax/iron-request.html","c4483d48a701e088292b5f7b907b24b5"],["bower_components/iron-autogrow-textarea/iron-autogrow-textarea.html","d37e58ed9ab92b9945ee49c1d969fbab"],["bower_components/iron-behaviors/iron-button-state.html","7f7f96935de5deaf9a51264225eb1a5a"],["bower_components/iron-behaviors/iron-control-state.html","f1329af310a186a0c3ce264937c34c5e"],["bower_components/iron-flex-layout/iron-flex-layout.html","3e285c2698feec264710fffd609630ad"],["bower_components/iron-form-element-behavior/iron-form-element-behavior.html","2f0a609a52c3b90dc78d529858f04445"],["bower_components/iron-form/iron-form.html","6402a656b16ad4c15a9bac9327bf6aef"],["bower_components/iron-icon/iron-icon.html","0d81dc84af38dfdaa7eca375ab7a9b9e"],["bower_components/iron-icons/iron-icons.html","f167b940536136378cba6ddbc6bb00d0"],["bower_components/iron-iconset-svg/iron-iconset-svg.html","b4ba3d89346b84fd775da5d96c484015"],["bower_components/iron-image/iron-image.html","2c7dd007dfbf8aa1d759cac087063e6b"],["bower_components/iron-input/iron-input.html","117e335561f348f7cc615443df387405"],["bower_components/iron-jsonp-library/iron-jsonp-library.html","6fbe41762e05781ad3cf14ca6e772861"],["bower_components/iron-label/iron-label.html","74bbfe93fe50eb35ba1f4a1a80d8820b"],["bower_components/iron-localstorage/iron-localstorage.html","74182ae1de4bc661525255b342f1a136"],["bower_components/iron-location/iron-location.html","253d51cc4db35f8179fc351936db8e90"],["bower_components/iron-location/iron-query-params.html","41964ce091583f5f99f9e257dbb86fb2"],["bower_components/iron-media-query/iron-media-query.html","0082aca119880bf33ce3ffd1fa0e9011"],["bower_components/iron-menu-behavior/iron-menu-behavior.html","e8ea32d368e18a5050178535f62a68ea"],["bower_components/iron-meta/iron-meta.html","e719f259632ea1c1d83e632ea3a7389a"],["bower_components/iron-pages/iron-pages.html","aeb0aff1b1109fc353d8b7af89792220"],["bower_components/iron-resizable-behavior/iron-resizable-behavior.html","06556d669ceef498e29ced3f53e70e6d"],["bower_components/iron-scroll-target-behavior/iron-scroll-target-behavior.html","9971205eaf94e97c3a987be2d4e50e52"],["bower_components/iron-selector/iron-multi-selectable.html","196a7c658213a28e6924e9152628b50c"],["bower_components/iron-selector/iron-selectable.html","b0803b285eb65f6a9689918d8df735fe"],["bower_components/iron-selector/iron-selection.html","19a051eb5d88baed09f6439512841bda"],["bower_components/iron-selector/iron-selector.html","76e80b0f3e145257b34de6fde1addd1a"],["bower_components/iron-validatable-behavior/iron-validatable-behavior.html","15574530462b9f0c2ae512b078c596a2"],["bower_components/paper-behaviors/paper-button-behavior.html","d3c9b2685f6e6585da6cf1e632c50574"],["bower_components/paper-behaviors/paper-inky-focus-behavior.html","52c2ca1ef155e8bca281d806fc9a8673"],["bower_components/paper-behaviors/paper-ripple-behavior.html","360acdba9e68fb7bf5c2be15f3fc5845"],["bower_components/paper-button/paper-button.html","e56a59ed88bb90e19df8338c53e984a5"],["bower_components/paper-card/paper-card.html","86feddb1aa52e5c01a980bd1c0ecc613"],["bower_components/paper-fab/paper-fab.html","d2179fce15722c8defad314178fb03d7"],["bower_components/paper-icon-button/paper-icon-button.html","c3acafc40e7feb18eec57b7e49df808c"],["bower_components/paper-input/paper-input-addon-behavior.html","db9171b2bf4fdb8327dd4f311ccc0296"],["bower_components/paper-input/paper-input-behavior.html","67889a88ef1e8a20fb80c9dc3a880232"],["bower_components/paper-input/paper-input-char-counter.html","3cd45d4dbda33d1d0fc8252be47fc1ed"],["bower_components/paper-input/paper-input-container.html","70762e4c7a010b67eb2d87d4fb6cd838"],["bower_components/paper-input/paper-input-error.html","19103517e283f3c553437b1b82a5bcd2"],["bower_components/paper-input/paper-input.html","3d1cf6f58cb45937aed21fdc70f8374f"],["bower_components/paper-input/paper-textarea.html","c594834b8ca9f60fe130ed798eec0fa2"],["bower_components/paper-listbox/paper-listbox.html","93927bd9e8bbfa08b9d8b8e9d9b66ab8"],["bower_components/paper-ripple/paper-ripple.html","4101ea573f9fe2526b3938aad9c804c0"],["bower_components/paper-styles/color.html","8a42182f196047ae8d1ab99348bfa614"],["bower_components/paper-styles/default-theme.html","1f6c3a2b219ac12e7ac9c214caf1b475"],["bower_components/paper-styles/element-styles/paper-material-styles.html","8d8d619e6f98be2c5d7e49ca022e423c"],["bower_components/paper-styles/shadow.html","59828e88951b92c0ad70d3fd796d5b0f"],["bower_components/paper-styles/typography.html","e545246e3dd0f6c8984f4a9aa0ad9af3"],["bower_components/polymer/lib/elements/array-selector.html","13f4740735a915be0e50ba6a63ed90d7"],["bower_components/polymer/lib/elements/custom-style.html","af3ddc8b66d5a50f3a4b584d43090915"],["bower_components/polymer/lib/elements/dom-bind.html","3e642e81f832d69360fb29f7bfa9d752"],["bower_components/polymer/lib/elements/dom-if.html","e76d292871019807b1903d1c4a07147e"],["bower_components/polymer/lib/elements/dom-module.html","03d709239d9f30b27a38f6ad51eb3cf0"],["bower_components/polymer/lib/elements/dom-repeat.html","3d4133bd69d9a8a12682b8386bcd50c3"],["bower_components/polymer/lib/legacy/class.html","b114ba5596f2c46809f6015184f695bd"],["bower_components/polymer/lib/legacy/legacy-element-mixin.html","f1377a1da971f174729578f0e9caac2d"],["bower_components/polymer/lib/legacy/mutable-data-behavior.html","28624529941c143a2c89a560f5be9a3e"],["bower_components/polymer/lib/legacy/polymer-fn.html","4ecb6f82dd2003974ec5004dcb5644f0"],["bower_components/polymer/lib/legacy/polymer.dom.html","6ded7e4df3f70b01cb85ea1ce1bfebbd"],["bower_components/polymer/lib/legacy/templatizer-behavior.html","499ccaf2f4ddf10fc22775674021e4c1"],["bower_components/polymer/lib/mixins/element-mixin.html","6e834b50e4ecc362ab669f6a6458f5d9"],["bower_components/polymer/lib/mixins/gesture-event-listeners.html","2adeec3f92aa2847b0fc89190c6f48de"],["bower_components/polymer/lib/mixins/mutable-data.html","c3da616d8fc7f5d73f01e59c9f74e2fb"],["bower_components/polymer/lib/mixins/property-accessors.html","cac80c227b5699f3299451bc72c1ac6b"],["bower_components/polymer/lib/mixins/property-effects.html","5aa13a91bfc85c095b42fddd02f762f5"],["bower_components/polymer/lib/mixins/template-stamp.html","f2618c862b1780d9add415d2a0c4c283"],["bower_components/polymer/lib/utils/array-splice.html","1caf5b485e0d3b5e5e8473bd4aee2051"],["bower_components/polymer/lib/utils/async.html","964f41ccd907d5d57106685d618f8262"],["bower_components/polymer/lib/utils/boot.html","b3fede816782ec1791b4930fbccdec92"],["bower_components/polymer/lib/utils/case-map.html","fbcc9191460c40f56274059303f240f5"],["bower_components/polymer/lib/utils/debounce.html","b82b45dd67d803863875428273dbd278"],["bower_components/polymer/lib/utils/flattened-nodes-observer.html","51a62175d3c1242676bd97395b2246f1"],["bower_components/polymer/lib/utils/flush.html","3f1ae81bfde1d720931126833dcb6c12"],["bower_components/polymer/lib/utils/gestures.html","c688f29f85a75f0f6ef1d845cd82e0f1"],["bower_components/polymer/lib/utils/import-href.html","ab67a53713c709ca6422271643e5c6ef"],["bower_components/polymer/lib/utils/mixin.html","48def86200787e0dec66d862f6fbf945"],["bower_components/polymer/lib/utils/path.html","c6c703f031a793a1d013efb629f13f7f"],["bower_components/polymer/lib/utils/render-status.html","f1d2f69c7dc8114d8daa841c9a85bf70"],["bower_components/polymer/lib/utils/resolve-url.html","9655e21ed83a0b9c7daab6e150001dda"],["bower_components/polymer/lib/utils/settings.html","f3ea2029347fb4a2775eed852987bee9"],["bower_components/polymer/lib/utils/style-gather.html","7d5925ca13aaea95388d0294888340f1"],["bower_components/polymer/lib/utils/templatize.html","d575f0ecbdbce4ca1d3d35a59d0261d7"],["bower_components/polymer/lib/utils/unresolved.html","2ed3277470301933b1af10d413d8c614"],["bower_components/polymer/polymer-element.html","7e714c300932fa5c6d7bee1c8da03721"],["bower_components/polymer/polymer.html","041f02f3388a7a3c087298fde431df80"],["bower_components/polymerfire/firebase-app-script.html","df1897d11acb9c75522859d372873358"],["bower_components/polymerfire/firebase-app.html","251301a34120bf378941824c3e3bf579"],["bower_components/polymerfire/firebase-auth-script.html","12fe480c116018252246dd4366d1a1ef"],["bower_components/polymerfire/firebase-auth.html","c64ec9b44032c3e65c2861764cd8952d"],["bower_components/polymerfire/firebase-common-behavior.html","3a2eb38c75233229a8e9632307346e27"],["bower_components/polymerfire/firebase-database-behavior.html","a0f518c13c6d0e855c3b7d17caa62d0f"],["bower_components/polymerfire/firebase-database-script.html","b280409885282a43d9b5dd1ee5226fed"],["bower_components/polymerfire/firebase-messaging-script.html","33e0a36b60580c0bcbde7440ce9216e7"],["bower_components/polymerfire/firebase-query.html","74690d7684dce34922a816111d3fbf81"],["bower_components/polymerfire/firebase-storage-script.html","73903c0e578289a5910eaad341a730ca"],["bower_components/shadycss/apply-shim.html","5b73ef5bfcac4955f6c24f55ea322eb1"],["bower_components/shadycss/apply-shim.min.js","058df1a64fc2a4db3a1bceca054be299"],["bower_components/shadycss/custom-style-interface.html","7e28230b85cdcc2488e87172c3395d52"],["bower_components/shadycss/custom-style-interface.min.js","021cb6e169bd7c5ecc405c048894e043"],["bower_components/webcomponentsjs/custom-elements-es5-adapter.js","a5043c1d0dd16d84558ee6cc2276212e"],["bower_components/webcomponentsjs/gulpfile.js","0366da1f0f7858c9af2daa3ef7d950ea"],["bower_components/webcomponentsjs/webcomponents-hi-ce.js","e0655b55c34560830d28eda5ec51726c"],["bower_components/webcomponentsjs/webcomponents-hi-sd-ce.js","ffe437e8a8797cef96b23ced1591b7eb"],["bower_components/webcomponentsjs/webcomponents-hi.js","b88ce284fda849097ab4997d97bfc8b6"],["bower_components/webcomponentsjs/webcomponents-lite.js","91af6c96521441dd2349d3a0fa83923c"],["bower_components/webcomponentsjs/webcomponents-loader.js","f13bbbbf647b7922575a7894367ddaaf"],["bower_components/webcomponentsjs/webcomponents-sd-ce.js","2b3ce5380128f1e0e3ad8a130d68cf2a"],["index.html","46e8971a0886649e11235b33237cf4d6"],["manifest.json","2054c0fcd7888e9fce5584a993121cff"],["src/bb-about.html","5f00d39634b65a4f5f30afc0bad31414"],["src/bb-app.html","82545f983e97d093e58424f3bb67c1b5"],["src/bb-bands.html","3f8068cf72ab2fa6ef07b1c57f78423e"],["src/bb-contact.html","88e0bd4f3099f523cabeb8a979d2505b"],["src/bb-home.html","cb5fde9024d89b8710bd78d1307ac695"],["src/bb-lastedition.html","400747a206cb34501b786a3c96fc3ae7"],["src/bb-partners.html","93cc3f675e2936999f74b999bc949343"],["src/bb-team.html","0f13c5681e95da92283def82566ea50c"],["src/bb-termsheet.html","52d68145f898c2f406aef13c95b88ac6"],["src/bb-view404.html","9471acbba101e19239b18ab854e84352"],["src/shared-styles.html","557a75672019ddf35e4dede293f53010"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = '';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = 'index.html';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted(["\\/[^\\/\\.]*(\\?|$)"], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







