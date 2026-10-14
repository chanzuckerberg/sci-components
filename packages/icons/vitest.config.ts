import { dirname } from "path";
import { fileURLToPath } from "url";
import { createVitestConfig } from "../../vitest.shared";

export default createVitestConfig(dirname(fileURLToPath(import.meta.url)));
