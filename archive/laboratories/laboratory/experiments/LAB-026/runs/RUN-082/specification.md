# ForgeSync

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:48.955015Z
**Run ID**: RUN-082
**Seed**: 1700000082

---

## Architecture

- Architecture: ring_based
- Node Type: heterogeneous
- Quorum Type: hierarchical

## Leader Election

- Method: load_balanced
- Term/Epochs: True
- Randomized Timeout: True
- Lease-Based: False

## Voting

- Model: flexible_quorum
- Vote Granting: grant_to_candidate
- Vote Revocations: False

## Log Replication

- Type: replicated_log
- Structure: linked_list
- Commit Method: majority_commit

## Recovery

- Strategy: incremental_snapshot
- Snapshot Policy: log_compaction

## Membership

- Model: joint_consensus
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: explicit_probe
- Model: byzantine

## Timing

- Timeout Model: exponential
- Heartbeat Interval: 354ms
- Election Timeout Base: 449ms
- Election Timeout Range: 149ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- snapshot
- membership_change

## State Machine

- Type: fsm
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:load_balanced
- concept:term_epochs
- concept:randomized_timeout
- voting:flexible_quorum
- vote_granting:grant_to_candidate
- log:replicated_log
- log_structure:linked_list
- commit:majority_commit
- recovery:incremental_snapshot
- snapshot:log_compaction
- dynamic_membership:joint_consensus
- failure_detection:explicit_probe

---

## Simulation Results

### 3 Nodes

- Election Attempts: 54
- Elections Succeeded: 41
- Election Success Rate: 75.93%
- Messages Sent: 179
- Commits: 10
- Avg Messages/Commit: 17.90
- Leader Changes: 41
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 68
- Elections Succeeded: 52
- Election Success Rate: 76.47%
- Messages Sent: 247
- Commits: 11
- Avg Messages/Commit: 22.45
- Leader Changes: 52
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 58
- Elections Succeeded: 58
- Election Success Rate: 100.00%
- Messages Sent: 591
- Commits: 17
- Avg Messages/Commit: 34.76
- Leader Changes: 58
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 46
- Elections Succeeded: 36
- Election Success Rate: 78.26%
- Messages Sent: 345
- Commits: 27
- Avg Messages/Commit: 12.78
- Leader Changes: 36
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

