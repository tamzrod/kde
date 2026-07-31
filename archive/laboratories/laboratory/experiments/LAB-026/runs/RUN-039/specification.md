# PrismProtocol

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:46.699926Z
**Run ID**: RUN-039
**Seed**: 1700000039

---

## Architecture

- Architecture: hierarchical
- Node Type: heterogeneous
- Quorum Type: majority

## Leader Election

- Method: timestamp_based
- Term/Epochs: False
- Randomized Timeout: True
- Lease-Based: False

## Voting

- Model: hierarchical_quorum
- Vote Granting: grant_to_highest_term
- Vote Revocations: True

## Log Replication

- Type: replicated_log
- Structure: tree_structure
- Commit Method: pipeline_commit

## Recovery

- Strategy: log_catchup
- Snapshot Policy: leader_change

## Membership

- Model: static
- Add Node: 
- Remove Node: 

## Failure Handling

- Detection: heartbeat
- Model: omission

## Timing

- Timeout Model: fixed
- Heartbeat Interval: 456ms
- Election Timeout Base: 412ms
- Election Timeout Range: 67ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- membership_change
- leader_announce

## State Machine

- Type: fsm
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:timestamp_based
- concept:randomized_timeout
- voting:hierarchical_quorum
- vote_granting:grant_to_highest_term
- concept:vote_revocations
- concept:majority_quorum
- log:replicated_log
- log_structure:tree_structure
- commit:pipeline_commit
- recovery:log_catchup
- snapshot:leader_change
- failure_detection:heartbeat
- concept:heartbeat

---

## Simulation Results

### 3 Nodes

- Election Attempts: 59
- Elections Succeeded: 42
- Election Success Rate: 71.19%
- Messages Sent: 163
- Commits: 12
- Avg Messages/Commit: 13.58
- Leader Changes: 42
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 62
- Elections Succeeded: 56
- Election Success Rate: 90.32%
- Messages Sent: 271
- Commits: 21
- Avg Messages/Commit: 12.90
- Leader Changes: 56
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 44
- Elections Succeeded: 43
- Election Success Rate: 97.73%
- Messages Sent: 317
- Commits: 16
- Avg Messages/Commit: 19.81
- Leader Changes: 43
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 55
- Elections Succeeded: 55
- Election Success Rate: 100.00%
- Messages Sent: 585
- Commits: 30
- Avg Messages/Commit: 19.50
- Leader Changes: 55
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

