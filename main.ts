import username from "https://deno.land/x/username@v1.1.1/mod.ts";
import { format } from "https://deno.land/std@0.128.0/datetime/mod.ts";
import { copy } from "https://deno.land/std@0.128.0/fs/mod.ts";

const TARGET_PATH = "C:\\elden_ring_backups\\";
const READ_PATH = "C:\\Users\\{NAME}\\AppData\\Roaming\\EldenRing\\";

export async function main(): Promise<void> {
  const name = await username();
  if (name === undefined) {
    console.error("Could not determine system username");
    Deno.exit(1);
  }
  const readPath = READ_PATH.replace("{NAME}", name);
  try {
    await Deno.lstat(readPath);
  } catch (_err) {
    console.error(`Could not find your Elden Ring saves at "${readPath}"`);
    Deno.exit(1);
  }
  try {
    await Deno.lstat(TARGET_PATH);
  } catch (_err) {
    console.log(`Save directory "${TARGET_PATH}" does not exist, creating`);
    try {
      await Deno.mkdir(TARGET_PATH);
    } catch (err) {
      console.error(`Could not create save directory: ${err}`);
      Deno.exit(1);
    }
  }
  const dateStr = format(new Date(), "yyyy-MM-dd_HH-mm-ss");
  const writePath = TARGET_PATH + dateStr;
  await copy(readPath, writePath);
}

if (import.meta.main) {
  await main();
}
