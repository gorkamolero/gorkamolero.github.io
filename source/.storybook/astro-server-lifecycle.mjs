/**
 * Astro 7.3 starts its dev app asynchronously. Astro's own closeContainer waits
 * for this promise; storybook-astro 1.12 closes its internal Vite servers directly.
 * Match Astro's shutdown order so closing the Container API render server cannot
 * disconnect fetchModule while the background app is still starting.
 * This plugin is loaded in Storybook only, including its internal SSR servers.
 */
export function astroServerLifecycle() {
  return {
    name: 'portfolio:astro-server-lifecycle',
    configureServer(server) {
      const close = server.close.bind(server);
      server.close = async () => {
        await server[Symbol.for('astro.devServerAppReady')];
        return close();
      };
    },
  };
}
