# SignalCore

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:47.753906Z
**Run ID**: RUN-059
**Seed**: 1700000059

---

## Architecture

- Architecture: decentralized
- Node Type: uniform
- Quorum Type: weighted

## Leader Election

- Method: random_winner
- Term/Epochs: True
- Randomized Timeout: True
- Lease-Based: True

## Voting

- Model: hierarchical_quorum
- Vote Granting: grant_if_log_newer
- Vote Revocations: True

## Log Replication

- Type: value_log
- Structure: tree_structure
- Commit Method: majority_commit

## Recovery

- Strategy: log_catchup
- Snapshot Policy: adaptive

## Membership

- Model: static
- Add Node: 
- Remove Node: 

## Failure Handling

- Detection: heartbeat
- Model: byzantine

## Timing

- Timeout Model: fixed
- Heartbeat Interval: 397ms
- Election Timeout Base: 162ms
- Election Timeout Range: 288ms

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

- leader_election:random_winner
- concept:term_epochs
- concept:randomized_timeout
- concept:lease_based_leadership
- voting:hierarchical_quorum
- vote_granting:grant_if_log_newer
- concept:vote_revocations
- log:value_log
- log_structure:tree_structure
- commit:majority_commit
- recovery:log_catchup
- snapshot:adaptive
- failure_detection:heartbeat
- concept:heartbeat

---

## Simulation Results

### 3 Nodes

- Election Attempts: 58
- Elections Succeeded: 43
- Election Success Rate: 74.14%
- Messages Sent: 179
- Commits: 14
- Avg Messages/Commit: 12.79
- Leader Changes: 43
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 72
- Elections Succeeded: 65
- Election Success Rate: 90.28%
- Messages Sent: 343
- Commits: 27
- Avg Messages/Commit: 12.70
- Leader Changes: 65
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 68
- Elections Succeeded: 65
- Election Success Rate: 95.59%
- Messages Sent: 392
- Commits: 16
- Avg Messages/Commit: 24.50
- Leader Changes: 65
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 45
- Elections Succeeded: 45
- Election Success Rate: 100.00%
- Messages Sent: 582
- Commits: 14
- Avg Messages/Commit: 41.57
- Leader Changes: 45
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

