# BeaconFlow

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:45.022353Z
**Run ID**: RUN-007
**Seed**: 1700000007

---

## Architecture

- Architecture: fully_distributed
- Node Type: uniform
- Quorum Type: majority

## Leader Election

- Method: lease_based
- Term/Epochs: True
- Randomized Timeout: False
- Lease-Based: False

## Voting

- Model: hierarchical_quorum
- Vote Granting: grant_if_log_newer
- Vote Revocations: True

## Log Replication

- Type: hybrid
- Structure: ring_buffer
- Commit Method: batch_commit

## Recovery

- Strategy: incremental_snapshot
- Snapshot Policy: log_compaction

## Membership

- Model: joint_consensus
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: gossip
- Model: crash_recovery

## Timing

- Timeout Model: exponential
- Heartbeat Interval: 118ms
- Election Timeout Base: 351ms
- Election Timeout Range: 58ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- term_update

## State Machine

- Type: fsm
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:lease_based
- concept:term_epochs
- voting:hierarchical_quorum
- vote_granting:grant_if_log_newer
- concept:vote_revocations
- concept:majority_quorum
- log:hybrid
- log_structure:ring_buffer
- commit:batch_commit
- recovery:incremental_snapshot
- snapshot:log_compaction
- dynamic_membership:joint_consensus
- failure_detection:gossip

---

## Simulation Results

### 3 Nodes

- Election Attempts: 54
- Elections Succeeded: 39
- Election Success Rate: 72.22%
- Messages Sent: 129
- Commits: 12
- Avg Messages/Commit: 10.75
- Leader Changes: 39
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 50
- Elections Succeeded: 40
- Election Success Rate: 80.00%
- Messages Sent: 252
- Commits: 21
- Avg Messages/Commit: 12.00
- Leader Changes: 40
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 41
- Elections Succeeded: 37
- Election Success Rate: 90.24%
- Messages Sent: 282
- Commits: 14
- Avg Messages/Commit: 20.14
- Leader Changes: 37
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 52
- Elections Succeeded: 51
- Election Success Rate: 98.08%
- Messages Sent: 571
- Commits: 18
- Avg Messages/Commit: 31.72
- Leader Changes: 51
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

