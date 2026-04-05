export default {
  async fetch(request) {

    const target = "https://drive.google.com/uc?export=download&id=119AbosoTLjIeSlbeMjbnrVSzsuDhCM1X"

    const ua = request.headers.get("user-agent") || ""

    const permitido = /sparkle|iptv|exo|okhttp/i.test(ua)

    if (!permitido) {
      return Response.redirect("https://google.com", 302)
    }

    const res = await fetch(target)

    return new Response(res.body, {
      headers: {
        "Content-Type": "application/x-mpegURL"
      }
    })
  }
}
