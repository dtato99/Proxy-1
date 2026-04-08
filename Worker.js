// 👉 ESPN Premium automático
if (url.pathname === "/espnpremium") {

  const pageUrl = "https://streamtp10.com/global1.php?stream=espnpremium";

  const pageRes = await fetch(pageUrl, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      "Referer": "https://streamtp10.com/"
    }
  });

  const html = await pageRes.text();

  // buscar m3u8
  const match = html.match(/https?:\/\/[^"' ]+\.m3u8[^"' ]*/);

  if (!match) {
    return new Response("No se encontró stream ESPN", { status: 500 });
  }

  const streamUrl = match[0];

  const streamRes = await fetch(streamUrl, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      "Referer": pageUrl,
      "Origin": "https://streamtp10.com"
    }
  });

  return new Response(streamRes.body, {
    headers: {
      "Content-Type": "application/x-mpegURL"
    }
  });
}
