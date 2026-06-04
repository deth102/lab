"use client";

// =================================================================
//  SANITY STUDIO CONFIG
// =================================================================
//  This config is shared by:
//    - The embedded Studio at  /studio  (Phương án A)
//    - The Sanity CLI (`npx sanity ...`) if you ever switch to a
//      standalone studio (Phương án B) — no rewrite needed.
// =================================================================

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";
import { apiVersion, dataset, projectId } from "./sanity/env";

export default defineConfig({
  name: "itd-lab",
  title: "ITD Lab — Quản lý nội dung",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
  schema: { types: schemaTypes },
});
