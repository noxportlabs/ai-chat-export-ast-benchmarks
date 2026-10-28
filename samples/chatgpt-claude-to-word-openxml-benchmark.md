---
title: "ChatGPT & Claude to Word (OpenXML) AST Conversion Benchmark"
source: "ChatGPT-4o & Claude 3.5 Sonnet Technical Thread Specimen"
export_tool: "Noxport AI Exporter v3.0.4.226"
export_provenance:
  generator: "noxport-ast-engine"
  mode: "local-first"
  timestamp: "2026-10-28T12:00:00Z"
  network_font_fetches: 0
  telemetry_calls: 0
  allow_complete_claim: false
  ast_nodes_processed: 142
  hash_sha256: "510d9225b0ee275ce7fdb770908257a7b3249224c591903fc4d6863e6c841a88"
  key_id: "nxp-ed25519-2026-v4"
---

# ChatGPT & Claude to Word (OpenXML) AST Conversion Benchmark

## Executive Overview
When knowledge workers and engineering teams export complex technical conversations from LLMs (ChatGPT, Claude, Gemini, Grok, NotebookLM) into Microsoft Word documents, simple browser clipboard copy-pasting fails systematically.

This specimen demonstrates how Noxport AI Exporter (v3.0.4.226) compiles mounted DOM conversation turns into a typed Abstract Syntax Tree (AST), converting math, tables, code, and links into native ECMA-376 OpenXML elements.

---

## 1. Mathematical Equation Formatting (LaTeX to OMML)

### Raw LaTeX Formula from Assistant Response
```latex
\mathcal{L}_{AST} = \sum_{i=1}^{N} \left\| \phi(T_i) - \hat{\phi}(T_i) \right\|^2 + \lambda \mathcal{R}_{layout}(\Omega)
```

### Clipboard Copy-Paste Result: Broken
Clipboard copy-paste pastes raw unrendered ASCII text with missing symbols or duplicate MathML accessibility trees (`E=mc^2 E=mc^2`). It does not create an editable Microsoft Office math element.

### Noxport AST Result: Native OMML (`m:oMath`)
Noxport parses the AST math node directly into native Office OpenXML Math (`m:oMathPara` / `m:oMath`) with full sub-element styling, ensuring the equation is fully editable in Microsoft Word 2016 through Microsoft 365 without third-party plugins.

---

## 2. Table Structure & Cell Padding Benchmark

| Metric / Dimension | Raw Clipboard Copy-Paste | Generic Cloud Exporter | Noxport Pro AST Engine (v3.0.4.226) |
| :--- | :--- | :--- | :--- |
| **Cell Margins (`w:tcMar`)** | Collapsed (0 pt padding) | Hardcoded 100 pt | Calibrated 120 dxa (6 pt) |
| **Header Row Repeat (`w:tblHeader`)** | Disabled | Disabled | Enabled across page splits |
| **Grid Fit (`w:tblW`)** | Overflow beyond margin | Fixed pixel clip | `dxa` responsive to page margins |
| **PII & Data Leakage Risk** | Zero (local clip) | High (3rd-party cloud proxy) | Zero (100% in-browser RAM execution) |
| **Offline Ed25519 Token Ring** | N/A | Central SaaS account | Stateless offline ring (`nxp-ed25519-2026-v4`) |

---

## 3. DOM Virtualization Scoping & Font Architecture

1. **DOM Virtualization Scoping & Fail-Closed Invariants:**
   - Long conversation threads on modern AI platforms unmount off-screen turns to conserve DOM memory.
   - Noxport compiles mounted DOM turns into a typed AST. Core Adapters support first-party session/auto-scroll extraction, while Optional DOM sites are scoped to visible DOM turns.
   - When virtualized turns are unmounted off-screen, Noxport's **Readiness Card** and **`manifest.json` (`allow_complete_claim: false`)** fail closed, surfacing an explicit scope warning to the user rather than silently dropping turns or manufacturing false "100% Complete" claims.

2. **Vector Text PDF Font Subset Architecture:**
   - Unlike cloud PDF converters that trigger 15-30 HTTP font fetches across external CDNs (leaking document metadata), Noxport embeds a local **DejaVu OpenType/CFF vector glyph subset (`pdf-font-vectors.js`) with `ToUnicode` CMap tables**.
   - Ensures crisp vector rendering, searchability, and exact character extraction with exactly **0 network font requests**.

3. **Table Row Integrity (`w:cantSplit`):**
   - Injects `w:cantSplit` on every table row node so multi-line table rows never sever awkwardly across page breaks.

4. **Code Block Indentation & Language Tags:**
   - Wraps code syntax nodes in `w:shd` background slabs with Monaco/Consolas typography, preserving exact 4-space indentation and language badges.

5. **Validated Hyperlinks:**
   - Resolves LLM search citations (Perplexity, ChatGPT Web Search, Gemini Grounding) into native Word Hyperlinks (`w:hyperlink`).

---

## 4. Verification & Scope Receipts
Every export produced by Noxport Pro includes a cryptographically verifiable JSON integrity receipt matching `noxport.manifest.v1`.
Inspect the companion manifest sample at [/samples/noxport-export-integrity-manifest.json](/samples/noxport-export-integrity-manifest.json).
