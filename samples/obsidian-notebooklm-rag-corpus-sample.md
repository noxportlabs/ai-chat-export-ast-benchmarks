---
title: "Obsidian & NotebookLM RAG Corpus Export Specimen"
source_platform: "Google NotebookLM, Obsidian Vault & YouTube Corpus"
export_tool: "Noxport AI Exporter v3.0.4.226"
export_provenance:
  generator: "noxport-markdown-engine"
  mode: "local-first"
  timestamp: "2026-10-28T12:00:00Z"
  obsidian_vault_target: "AI Research Vault/Corpus"
  yaml_frontmatter_injected: true
  network_font_fetches: 0
  telemetry_calls: 0
  allow_complete_claim: false
  key_id: "nxp-ed25519-2026-v4"
  sha256_hash: "4f898a39e07fce1812a47ab5c639e99bc67ce5c5df2fa523bb596a5879430a5b"
tags:
  - knowledge-management
  - rag-corpus
  - obsidian
  - notebooklm
  - audio-overview
---

# Obsidian & NotebookLM RAG Corpus Export Specimen

## Architectural Scope & Product Attribution

To maintain precise architectural truth, Noxport Labs distinguishes between two specialized document engineering products:

1. **Noxport AI Exporter (v3.0.4.226 — Production Chrome Extension, Available Now):**
   - Directly compiles multi-turn AI chat conversations (ChatGPT, Claude, Google Gemini, Perplexity, Grok, DeepSeek) into **Pro Markdown with YAML Frontmatter**, Vector Text PDF, and ECMA-376 OpenXML Word (`.docx`).
   - Injects Dublin Core taxonomies, tags, token counts, and sanitized markdown tables, allowing instantaneous drag-and-drop ingestion into local **Obsidian** vaults or **Google NotebookLM** project sources.

2. **YouTube → Gemini Gem (Division II R&D Preview):**
   - Specialized research workbench for ingesting long-form technical video and audio lectures.
   - Generates millisecond-aligned (`start_ms..end_ms`) multi-speaker transcript corpora with fail-closed `seg-005 unavailable` gap flags when audio segments suffer from packet drops, copyright masking, or missing caption tracks.

---

## 1. Pro Markdown with YAML Frontmatter (Noxport AI Exporter v3.0.4.226 Output)

```markdown
---
title: "Distributed Consensus & Two-Phase Commit in Local-First Storage"
source_platform: "Claude 3.5 Sonnet & ChatGPT-4o"
export_tool: "Noxport AI Exporter v3.0.4.226"
export_date: "2026-10-28"
tags:
  - distributed-systems
  - two-phase-commit
  - local-first
  - rag-corpus
  - obsidian
turn_count: 6
allow_complete_claim: false
---

# Distributed Consensus & Two-Phase Commit in Local-First Storage

### Key Findings
- **Atomic Quota Reservation:** Noxport utilizes a Two-Phase Commit (`2PC`) protocol in IndexedDB (`tx_journal_v1`) to reserve compilation credits.
- **Fail-Safe Rollback:** Deduction only commits when the OS physical file picker write operation returns success.
```

---

## 2. Millisecond-Aligned Lecture Corpus (YouTube → Gemini Gem Preview)

```json
[
  {
    "segment_id": "seg-001",
    "start_ms": 0,
    "end_ms": 4200,
    "speaker": "Lecturer",
    "text": "In distributed state machines, atomic commitment ensures that either all participants commit or all abort."
  },
  {
    "segment_id": "seg-002",
    "start_ms": 4200,
    "end_ms": 9150,
    "speaker": "Lecturer",
    "text": "When local disk writes fail or encounter an AbortError, the coordinator must execute an immediate rollback."
  },
  {
    "segment_id": "seg-005",
    "start_ms": 24100,
    "end_ms": 28400,
    "status": "unavailable",
    "gap_flag": "seg-005 unavailable: audio frame drop detected in source stream"
  }
]
```

---

## 3. RAG Chunking Readiness for Local Vector Embeddings
This specimen document adheres to strict Markdown chunking guidelines for local embedding models (`bge-m3`, `nomic-embed-text`, `text-embedding-3-small`):
- Structural headers maintain a maximum depth of `H3` to preserve context hierarchies.
- Code blocks contain strict language fences with zero unescaped tags.
- Frontmatter taxonomy conforms to standard YAML specifications for automatic Obsidian property indexing.
