# SignalCore

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:48.379895Z
**Run ID**: RUN-071
**Seed**: 1700000071

---

## Architecture

- Architecture: hierarchical
- Node Type: heterogeneous
- Quorum Type: weighted

## Leader Election

- Method: id_based
- Term/Epochs: True
- Randomized Timeout: True
- Lease-Based: False

## Voting

- Model: flexible_quorum
- Vote Granting: grant_to_highest_term
- Vote Revocations: True

## Log Replication

- Type: replicated_log
- Structure: tree_structure
- Commit Method: index_based

## Recovery

- Strategy: state_transfer
- Snapshot Policy: log_compaction

## Membership

- Model: static
- Add Node: 
- Remove Node: 

## Failure Handling

- Detection: adaptive
- Model: omission

## Timing

- Timeout Model: fixed
- Heartbeat Interval: 237ms
- Election Timeout Base: 285ms
- Election Timeout Range: 62ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- snapshot
- membership_change
- term_update

## State Machine

- Type: lua_script
- Safety: True
- Liveness: False

---

## Discovered Features

- leader_election:id_based
- concept:term_epochs
- concept:randomized_timeout
- voting:flexible_quorum
- vote_granting:grant_to_highest_term
- concept:vote_revocations
- log:replicated_log
- log_structure:tree_structure
- commit:index_based
- recovery:state_transfer
- snapshot:log_compaction
- failure_detection:adaptive

---

## Simulation Results

### 3 Nodes

- Election Attempts: 50
- Elections Succeeded: 35
- Election Success Rate: 70.00%
- Messages Sent: 152
- Commits: 17
- Avg Messages/Commit: 8.94
- Leader Changes: 35
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 54
- Elections Succeeded: 40
- Election Success Rate: 74.07%
- Messages Sent: 241
- Commits: 23
- Avg Messages/Commit: 10.48
- Leader Changes: 40
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 61
- Elections Succeeded: 57
- Election Success Rate: 93.44%
- Messages Sent: 383
- Commits: 21
- Avg Messages/Commit: 18.24
- Leader Changes: 57
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 57
- Elections Succeeded: 57
- Election Success Rate: 100.00%
- Messages Sent: 698
- Commits: 37
- Avg Messages/Commit: 18.86
- Leader Changes: 57
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

