# NovaFlow

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:49.474769Z
**Run ID**: RUN-092
**Seed**: 1700000092

---

## Architecture

- Architecture: hierarchical
- Node Type: heterogeneous
- Quorum Type: majority

## Leader Election

- Method: rotation
- Term/Epochs: True
- Randomized Timeout: False
- Lease-Based: False

## Voting

- Model: read_quorum
- Vote Granting: grant_if_log_newer
- Vote Revocations: False

## Log Replication

- Type: replicated_log
- Structure: hash_chain
- Commit Method: index_based

## Recovery

- Strategy: incremental_snapshot
- Snapshot Policy: log_compaction

## Membership

- Model: joint_consensus
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: heartbeat
- Model: crash_recovery

## Timing

- Timeout Model: proportional
- Heartbeat Interval: 491ms
- Election Timeout Base: 305ms
- Election Timeout Range: 231ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- leader_announce
- term_update

## State Machine

- Type: lua_script
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:rotation
- concept:term_epochs
- voting:read_quorum
- vote_granting:grant_if_log_newer
- concept:majority_quorum
- log:replicated_log
- log_structure:hash_chain
- commit:index_based
- recovery:incremental_snapshot
- snapshot:log_compaction
- dynamic_membership:joint_consensus
- failure_detection:heartbeat
- concept:heartbeat

---

## Simulation Results

### 3 Nodes

- Election Attempts: 62
- Elections Succeeded: 54
- Election Success Rate: 87.10%
- Messages Sent: 187
- Commits: 22
- Avg Messages/Commit: 8.50
- Leader Changes: 54
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 53
- Elections Succeeded: 44
- Election Success Rate: 83.02%
- Messages Sent: 284
- Commits: 14
- Avg Messages/Commit: 20.29
- Leader Changes: 44
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 51
- Elections Succeeded: 36
- Election Success Rate: 70.59%
- Messages Sent: 210
- Commits: 17
- Avg Messages/Commit: 12.35
- Leader Changes: 36
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 46
- Elections Succeeded: 46
- Election Success Rate: 100.00%
- Messages Sent: 584
- Commits: 21
- Avg Messages/Commit: 27.81
- Leader Changes: 46
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

