# HelixPact

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:46.121383Z
**Run ID**: RUN-028
**Seed**: 1700000028

---

## Architecture

- Architecture: ring_based
- Node Type: heterogeneous
- Quorum Type: majority

## Leader Election

- Method: voting_based
- Term/Epochs: False
- Randomized Timeout: True
- Lease-Based: False

## Voting

- Model: read_quorum
- Vote Granting: grant_based_on_priority
- Vote Revocations: False

## Log Replication

- Type: command_log
- Structure: append_only_array
- Commit Method: batch_commit

## Recovery

- Strategy: hybrid_recovery
- Snapshot Policy: adaptive

## Membership

- Model: full_dynamic
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: gossip
- Model: crash_recovery

## Timing

- Timeout Model: adaptive
- Heartbeat Interval: 193ms
- Election Timeout Base: 488ms
- Election Timeout Range: 105ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- snapshot
- membership_change
- leader_announce

## State Machine

- Type: deterministic
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:voting_based
- concept:randomized_timeout
- voting:read_quorum
- vote_granting:grant_based_on_priority
- concept:majority_quorum
- log:command_log
- log_structure:append_only_array
- commit:batch_commit
- recovery:hybrid_recovery
- snapshot:adaptive
- dynamic_membership:full_dynamic
- failure_detection:gossip

---

## Simulation Results

### 3 Nodes

- Election Attempts: 59
- Elections Succeeded: 39
- Election Success Rate: 66.10%
- Messages Sent: 175
- Commits: 16
- Avg Messages/Commit: 10.94
- Leader Changes: 39
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 61
- Elections Succeeded: 40
- Election Success Rate: 65.57%
- Messages Sent: 281
- Commits: 19
- Avg Messages/Commit: 14.79
- Leader Changes: 40
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 66
- Elections Succeeded: 52
- Election Success Rate: 78.79%
- Messages Sent: 361
- Commits: 12
- Avg Messages/Commit: 30.08
- Leader Changes: 52
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 58
- Elections Succeeded: 58
- Election Success Rate: 100.00%
- Messages Sent: 562
- Commits: 26
- Avg Messages/Commit: 21.62
- Leader Changes: 58
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

