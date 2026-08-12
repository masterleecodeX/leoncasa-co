import translate from "translate";
translate.engine = "google";

async function run() {
  const langs = ['es', 'fr', 'de', 'it', 'ja'];
  for (const lang of langs) {
    try {
      const res = await translate("Hello", lang);
      console.log(lang, res);
    } catch (e) {
      console.log(lang, "failed:", e.message);
    }
  }
}
run();
