# BeaconSync

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:47.184128Z
**Run ID**: RUN-048
**Seed**: 1700000048

---

## Architecture

- Architecture: hierarchical
- Node Type: heterogeneous
- Quorum Type: flexible

## Leader Election

- Method: voting_based
- Term/Epochs: True
- Randomized Timeout: True
- Lease-Based: False

## Voting

- Model: weighted_votes
- Vote Granting: grant_if_log_newer
- Vote Revocations: False

## Log Replication

- Type: value_log
- Structure: tree_structure
- Commit Method: index_based

## Recovery

- Strategy: incremental_snapshot
- Snapshot Policy: log_compaction

## Membership

- Model: static
- Add Node: 
- Remove Node: 

## Failure Handling

- Detection: adaptive
- Model: crash_recovery

## Timing

- Timeout Model: proportional
- Heartbeat Interval: 258ms
- Election Timeout Base: 315ms
- Election Timeout Range: 299ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- leader_announce
- term_update

## State Machine

- Type: fsm
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:voting_based
- concept:term_epochs
- concept:randomized_timeout
- voting:weighted_votes
- vote_granting:grant_if_log_newer
- log:value_log
- log_structure:tree_structure
- commit:index_based
- recovery:incremental_snapshot
- snapshot:log_compaction
- failure_detection:adaptive

---

## Simulation Results

### 3 Nodes

- Election Attempts: 50
- Elections Succeeded: 45
- Election Success Rate: 90.00%
- Messages Sent: 195
- Commits: 19
- Avg Messages/Commit: 10.26
- Leader Changes: 45
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 54
- Elections Succeeded: 43
- Election Success Rate: 79.63%
- Messages Sent: 234
- Commits: 18
- Avg Messages/Commit: 13.00
- Leader Changes: 43
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 53
- Elections Succeeded: 45
- Election Success Rate: 84.91%
- Messages Sent: 350
- Commits: 24
- Avg Messages/Commit: 14.58
- Leader Changes: 45
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 57
- Elections Succeeded: 57
- Election Success Rate: 100.00%
- Messages Sent: 666
- Commits: 26
- Avg Messages/Commit: 25.62
- Leader Changes: 57
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

