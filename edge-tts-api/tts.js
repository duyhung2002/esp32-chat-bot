import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";

export default async function handler(req, res) {
  const text = req.query.text;
  const voice = req.query.voice || "vi-VN-HoaiMyNeural";

  if (!text) {
    return res.status(400).send("Thiếu tham số ?text=");
  }

  try {
    const tts = new MsEdgeTTS();
    await tts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);

    const readable = tts.toStream(text);

    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Access-Control-Allow-Origin", "*");

    readable.pipe(res);
  } catch (error) {
    res.status(500).send("Lỗi TTS: " + error.message);
  }
}