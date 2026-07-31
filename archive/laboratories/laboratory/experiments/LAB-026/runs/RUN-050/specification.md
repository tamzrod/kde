# CipherUnion

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:47.288165Z
**Run ID**: RUN-050
**Seed**: 1700000050

---

## Architecture

- Architecture: centralized_leader
- Node Type: uniform
- Quorum Type: weighted

## Leader Election

- Method: rotation
- Term/Epochs: False
- Randomized Timeout: True
- Lease-Based: False

## Voting

- Model: flexible_quorum
- Vote Granting: grant_to_highest_term
- Vote Revocations: False

## Log Replication

- Type: value_log
- Structure: ring_buffer
- Commit Method: quorum_commit

## Recovery

- Strategy: incremental_snapshot
- Snapshot Policy: log_compaction

## Membership

- Model: remove_node
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: adaptive
- Model: timing

## Timing

- Timeout Model: adaptive
- Heartbeat Interval: 436ms
- Election Timeout Base: 451ms
- Election Timeout Range: 142ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- snapshot
- term_update

## State Machine

- Type: deterministic
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:rotation
- concept:randomized_timeout
- voting:flexible_quorum
- vote_granting:grant_to_highest_term
- log:value_log
- log_structure:ring_buffer
- commit:quorum_commit
- recovery:incremental_snapshot
- snapshot:log_compaction
- dynamic_membership:remove_node
- failure_detection:adaptive

---

## Simulation Results

### 3 Nodes

- Election Attempts: 46
- Elections Succeeded: 41
- Election Success Rate: 89.13%
- Messages Sent: 206
- Commits: 24
- Avg Messages/Commit: 8.58
- Leader Changes: 41
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 54
- Elections Succeeded: 45
- Election Success Rate: 83.33%
- Messages Sent: 272
- Commits: 15
- Avg Messages/Commit: 18.13
- Leader Changes: 45
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 50
- Elections Succeeded: 47
- Election Success Rate: 94.00%
- Messages Sent: 388
- Commits: 12
- Avg Messages/Commit: 32.33
- Leader Changes: 47
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 55
- Elections Succeeded: 42
- Election Success Rate: 76.36%
- Messages Sent: 487
- Commits: 14
- Avg Messages/Commit: 34.79
- Leader Changes: 42
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

