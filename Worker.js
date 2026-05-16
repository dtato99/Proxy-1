export default async function handler(req, res) {

  const REAL_URL =
    "https://drive.google.com/uc?export=download&id=1IL3ayNtVyUj7L5EbLxb7gIveGQXEConw";

  // USER AGENT
  const ua = (req.headers["user-agent"] || "").toLowerCase();

  // SOLO SPARKLE TV
  const soloSparkle =
    ua.includes("sparkle");

  // BLOQUEAR TODO LO DEMÁS
  if (!soloSparkle) {

    return res.status(404).send("Not found");

  }

  try {

    const response = await fetch(REAL_URL);

    const text = await response.text();

    // IPTV
    res.setHeader(
      "Content-Type",
      "audio/x-mpegurl"
    );

    // evitar cache
    res.setHeader(
      "Cache-Control",
      "no-store"
    );

    return res.status(200).send(text);

  } catch (e) {

    return res.status(500).send("Error");

  }
}
