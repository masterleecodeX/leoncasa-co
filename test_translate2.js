import translate from "translate";

translate.engine = "google";

async function run() {
  try {
    const text = await translate("Hello world", "es");
    console.log(text);
  } catch (err) {
    console.error("Error:", err.message);
  }
}
run();
