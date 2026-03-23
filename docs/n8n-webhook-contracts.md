# n8n Webhook Contracts

All webhook endpoints require the `x-bd-team-secret` header to match `N8N_SHARED_SECRET`.

## `POST /api/webhooks/n8n/icp-run`

```json
{
  "workflowRunId": "n8n-run-icp-0091",
  "icpId": "10000000-0000-0000-0000-000000000001",
  "triggeredByUserId": "00000000-0000-0000-0000-000000000001",
  "source": "manual"
}
```

## `POST /api/webhooks/n8n/lead-enrichment`

```json
{
  "workflowRunId": "n8n-run-enrich-4312",
  "leadId": "lead_1",
  "contactConfidence": 88,
  "bestContactPath": {
    "type": "email",
    "value": "rina@heliostack.dev",
    "confidence": 0.88,
    "sourceUrl": "https://hunter.io/verify/heliostack"
  },
  "fallbackContactPath": {
    "type": "linkedin",
    "value": "https://www.linkedin.com/in/rina-patel-growth/",
    "confidence": 0.81,
    "sourceUrl": "https://www.linkedin.com/in/rina-patel-growth/"
  }
}
```

## `POST /api/webhooks/n8n/draft-ready`

```json
{
  "workflowRunId": "n8n-run-draft-1288",
  "leadId": "lead_1",
  "whySelected": ["High score", "Clear trigger event"],
  "personalizationPoints": ["Pricing update", "Hiring SDR leadership"],
  "shortDraft": "Short draft text",
  "warmDraft": "Warm draft text",
  "followUpDraft": "Follow-up draft text"
}
```

## `POST /api/webhooks/n8n/send-status`

```json
{
  "workflowRunId": "n8n-run-send-992",
  "leadId": "lead_1",
  "gmailDraftId": "rfc822-draft-id",
  "gmailMessageId": "gmail-message-id",
  "status": "draft_created"
}
```

## Acknowledgement contract

Every webhook returns:

```json
{
  "ok": true,
  "kind": "draft_ready",
  "dedupeKey": "sha256-hash",
  "persisted": false,
  "payload": {}
}
```

`dedupeKey` exists so n8n and the application can stay idempotent across retries.
