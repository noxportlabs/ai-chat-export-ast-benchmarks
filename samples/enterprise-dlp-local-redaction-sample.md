---
title: "Enterprise DLP Local Redaction & Incremental DIFF Export Specimen"
category: "Data Loss Prevention (DLP)"
export_tool: "Noxport AI Exporter v3.0.4.226"
export_provenance:
  generator: "noxport-dlp-engine"
  mode: "local-first-redaction"
  timestamp: "2026-10-28T12:00:00Z"
  network_font_fetches: 0
  telemetry_calls: 0
  allow_complete_claim: false
  key_id: "nxp-ed25519-2026-v4"
  sha256_pre_redaction: "b0d055d686ac7e0e654c75cc057748fa34611d3cf879893b022eded65f8ee758"
  sha256_post_redaction: "63643fd9f189db683bf0f872cc3f7fa66ef5264264f9a7942848169c172796ad"
---

# Enterprise DLP Local Redaction & Incremental DIFF Export Specimen

## Objective
Enterprise compliance policies (HIPAA, GDPR, SOC2) strictly prohibit sending unredacted customer emails, internal project codenames, or confidential API keys to external export services.

This specimen proves how Noxport AI Exporter (v3.0.4.226) executes deterministic, client-side Data Loss Prevention (DLP) redaction inside browser RAM before compiling Word (`.docx`), Vector Text PDF, or Pro Markdown files with zero network egress.

---

## 1. Verified In-Browser Redaction Features

Noxport Pro provides four verified, deterministic redaction and scope controls:

1. **Automatic Email Address Redaction (`#redactEmails`):**
   - RFC 5322 pattern recognition identifies email addresses across all user and assistant turns.
   - Replaces matched addresses with deterministic token: `[REDACTED_EMAIL]`.

2. **User-Defined Sensitive Term Redaction (`#redactTerms`):**
   - Configurable list of custom sensitive terms (case-sensitive strings `>= 3` characters).
   - Scans and redacts matches across message body text, turn titles, code blocks, and markdown links.
   - Replaces matched terms with deterministic token: `[REDACTED_TERM]`.

3. **Incremental DIFF Export (`Changes Only`):**
   - Computes local cryptographic SHA-256 hashes of each conversation message turn.
   - Allows users to export strictly newly added turns since the last export snapshot, suppressing unchanged conversational history.

4. **Unavailable Attachment Link Handling:**
   - Tri-state configuration for expired, sandboxed, or access-restricted attachment references:
     - `readable`: formats as an inspectable italic reference marker,
     - `raw`: preserves original internal URI reference,
     - `hide`: suppresses broken attachment nodes entirely.

---

## 2. Redaction Diff Specimen

### Input Text (Inside Browser Memory Before Export)
```text
Incident Report for Project Apollo:
Engineering lead contact: alex.miller@internal-corp.net
Confidential Codename: ProjectZeusCore
Internal Repository Link: https://git.internal-corp.net/core/ProjectZeusCore
Attachment status: sandbox-attachment://exp-2026-turn-4/payload.bin
```

### Exported Output (Written to File with #redactEmails and #redactTerms="ProjectZeusCore")
```text
Incident Report for Project Apollo:
Engineering lead contact: [REDACTED_EMAIL]
Confidential Codename: [REDACTED_TERM]
Internal Repository Link: https://git.internal-corp.net/core/[REDACTED_TERM]
Attachment status: [Attachment unavailable in export: payload.bin]
```

---

## 3. Redaction Audit Log (Bilateral Verification)

| Rule / Field | Configuration Flag | Match Context | Redacted Output |
| :--- | :--- | :--- | :--- |
| **Email Address** | `#redactEmails` (Enabled) | `alex.miller@internal-corp.net` | `[REDACTED_EMAIL]` |
| **Sensitive Term** | `#redactTerms` (`ProjectZeusCore`) | Body string and link URL | `[REDACTED_TERM]` |
| **Attachment Link** | `#attachmentPolicy` (`readable`) | Sandboxed binary payload | `[Attachment unavailable: payload.bin]` |
| **Incremental Filter** | `#exportMode` (`diff_only`) | Unchanged turns 1-12 | Suppressed (only turns 13-16 exported) |

---

## 4. Cryptographic Local Guarantee
No external HTTP request leaves the user's browser during DLP redaction or AST compilation. All string parsing, hashing, and regex evaluation occur strictly in client RAM via the WebCrypto API.
Inspect the manifest contract at [/samples/noxport-export-integrity-manifest.json](/samples/noxport-export-integrity-manifest.json).
