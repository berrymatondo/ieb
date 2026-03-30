import { defineConfig } from "prisma/config"
import * as fs from "fs"
import * as path from "path"

// Load .env manually for CLI commands (prisma db push, migrate, etc.)
const envPath = path.resolve(process.cwd(), ".env")
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf-8").split("\n")) {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*"?([^"#\n]*)"?\s*$/)
    if (match) process.env[match[1]] = match[2]
  }
}

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL!,
  },
})
