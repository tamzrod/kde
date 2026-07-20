# AnchorSync

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:45.859919Z
**Run ID**: RUN-023
**Seed**: 1700000023

---

## Architecture

- Architecture: fully_distributed
- Node Type: heterogeneous
- Quorum Type: weighted

## Leader Election

- Method: rotation
- Term/Epochs: True
- Randomized Timeout: False
- Lease-Based: False

## Voting

- Model: majority_quorum
- Vote Granting: grant_based_on_priority
- Vote Revocations: False

## Log Replication

- Type: hybrid
- Structure: tree_structure
- Commit Method: batch_commit

## Recovery

- Strategy: snapshot_transfer
- Snapshot Policy: adaptive

## Membership

- Model: static
- Add Node: 
- Remove Node: 

## Failure Handling

- Detection: gossip
- Model: timing

## Timing

- Timeout Model: exponential
- Heartbeat Interval: 128ms
- Election Timeout Base: 292ms
- Election Timeout Range: 91ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- leader_announce
- term_update

## State Machine

- Type: simple_state
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:rotation
- concept:term_epochs
- voting:majority_quorum
- vote_granting:grant_based_on_priority
- log:hybrid
- log_structure:tree_structure
- commit:batch_commit
- recovery:snapshot_transfer
- snapshot:adaptive
- failure_detection:gossip

---

## Simulation Results

### 3 Nodes

- Election Attempts: 60
- Elections Succeeded: 48
- Election Success Rate: 80.00%
- Messages Sent: 188
- Commits: 27
- Avg Messages/Commit: 6.96
- Leader Changes: 48
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 66
- Elections Succeeded: 53
- Election Success Rate: 80.30%
- Messages Sent: 301
- Commits: 20
- Avg Messages/Commit: 15.05
- Leader Changes: 53
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 66
- Elections Succeeded: 56
- Election Success Rate: 84.85%
- Messages Sent: 315
- Commits: 20
- Avg Messages/Commit: 15.75
- Leader Changes: 56
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 53
- Elections Succeeded: 53
- Election Success Rate: 100.00%
- Messages Sent: 571
- Commits: 21
- Avg Messages/Commit: 27.19
- Leader Changes: 53
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

