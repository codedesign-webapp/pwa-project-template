import {registerRoute} from 'workbox-routing';
import {precacheAndRoute } from 'workbox-precaching';
import {StaleWhileRevalidate} from 'workbox-strategies';
import {ExpirationPlugin} from 'workbox-expiration';

// Workbox를 디버그모드로 설정 
/*
workbox.setConfig({
  debug: false,
});
*/


// Vue-Cli에서 기본으로 제공하는 프리캐시 설정을 Workbox에 적용 
//workbox.precaching.precacheAndRoute(self.__precacheManifest);
precacheAndRoute(self.__WB_MANIFEST);

// 촬영된 이미지 캐시
registerRoute(
  ({url}) => url.origin === 'https://firebasestorage.googleapis.com/v0/b/pwa-camera.appspot.com/.*',
  new StaleWhileRevalidate({
      cacheName: 'camera-images',
      plugins: [
          new ExpirationPlugin({
            maxEntries: 60,
            maxAgeSeconds: 365 * 24 * 60 * 60, // 1년 지정
          }),
        ],
  })
);