export default {
  async fetch(request) {

    const url = new URL(request.url);
    const ua = request.headers.get("user-agent") || "";

    // 🔒 permitir solo apps IPTV
    const permitido = /sparkle|iptv|okhttp|exo/i.test(ua);

    if (!permitido) {
      return Response.redirect("https://google.com", 302);
    }

    // 📺 DSPORTS automático
    if (url.pathname === "/dsports") {

      const pageUrl = "https://www.tvenvivo2.com/directv-sports-en-vivo-por-internet.html";

      const res = await fetch(pageUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0",
          "Referer": "https://www.tvenvivo2.com/"
        }
      });

      const html = await res.text();

      // 🔍 buscar m3u8 directo
      let match = html.match(/https?:\/\/[^"' ]+\.m3u8[^"' ]*/);

      // 🔁 si no aparece, intentar iframe
      if (!match) {
        const iframe = html.match(/<iframe[^>]+src="([^"]+)"/i);

        if (iframe) {
          const iframeUrl = iframe[1];

          const iframeRes = await fetch(iframeUrl, {
            headers: {
              "User-Agent": "Mozilla/5.0",
              "Referer": pageUrl
            }
          });

          const iframeHtml = await iframeRes.text();

          match = iframeHtml.match(/https?:\/\/[^"' ]+\.m3u8[^"' ]*/);
        }
      }

      if (!match) {
        return new Response("No se encontró el stream", { status: 500 });
      }

      const streamUrl = match[0];

      // 🎬 devolver stream
      const streamRes = await fetch(streamUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0",
          "Referer": pageUrl,
          "Origin": "https://www.tvenvivo2.com"
        }
      });

      return new Response(streamRes.body, {
        headers: {
          "Content-Type": "application/x-mpegURL"
        }
      });
    }

    return new Response("Ruta no válida", { status: 404 });
  }
};
