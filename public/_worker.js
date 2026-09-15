export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    // If static file is not found (like /admin/login), serve index.html
    if (response.status === 404) {
      const url = new URL(request.url);
      url.pathname = '/index.html';
      return env.ASSETS.fetch(new Request(url.toString(), request));
    }
    return response;
  },
};
