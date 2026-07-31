# BastionFlow

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:44.762050Z
**Run ID**: RUN-002
**Seed**: 1700000002

---

## Architecture

- Architecture: decentralized
- Node Type: uniform
- Quorum Type: flexible

## Leader Election

- Method: term_based
- Term/Epochs: True
- Randomized Timeout: True
- Lease-Based: True

## Voting

- Model: flexible_quorum
- Vote Granting: grant_based_on_priority
- Vote Revocations: False

## Log Replication

- Type: hybrid
- Structure: ring_buffer
- Commit Method: batch_commit

## Recovery

- Strategy: snapshot_transfer
- Snapshot Policy: size_based

## Membership

- Model: full_dynamic
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: swim_like
- Model: timing

## Timing

- Timeout Model: adaptive
- Heartbeat Interval: 162ms
- Election Timeout Base: 309ms
- Election Timeout Range: 203ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat

## State Machine

- Type: simple_state
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:term_based
- concept:term_epochs
- concept:randomized_timeout
- concept:lease_based_leadership
- voting:flexible_quorum
- vote_granting:grant_based_on_priority
- log:hybrid
- log_structure:ring_buffer
- commit:batch_commit
- recovery:snapshot_transfer
- snapshot:size_based
- dynamic_membership:full_dynamic
- failure_detection:swim_like

---

## Simulation Results

### 3 Nodes

- Election Attempts: 63
- Elections Succeeded: 40
- Election Success Rate: 63.49%
- Messages Sent: 150
- Commits: 11
- Avg Messages/Commit: 13.64
- Leader Changes: 40
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 51
- Elections Succeeded: 46
- Election Success Rate: 90.20%
- Messages Sent: 254
- Commits: 22
- Avg Messages/Commit: 11.55
- Leader Changes: 46
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 56
- Elections Succeeded: 52
- Election Success Rate: 92.86%
- Messages Sent: 423
- Commits: 28
- Avg Messages/Commit: 15.11
- Leader Changes: 52
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 59
- Elections Succeeded: 59
- Election Success Rate: 100.00%
- Messages Sent: 676
- Commits: 35
- Avg Messages/Commit: 19.31
- Leader Changes: 59
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

