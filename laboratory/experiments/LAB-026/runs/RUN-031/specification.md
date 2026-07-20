# AetherAgreement

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:46.279276Z
**Run ID**: RUN-031
**Seed**: 1700000031

---

## Architecture

- Architecture: fully_distributed
- Node Type: heterogeneous
- Quorum Type: majority

## Leader Election

- Method: rotation
- Term/Epochs: True
- Randomized Timeout: True
- Lease-Based: True

## Voting

- Model: weighted_votes
- Vote Granting: grant_based_on_priority
- Vote Revocations: True

## Log Replication

- Type: hybrid
- Structure: linked_list
- Commit Method: index_based

## Recovery

- Strategy: snapshot_transfer
- Snapshot Policy: adaptive

## Membership

- Model: remove_node
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: heartbeat
- Model: crash_recovery

## Timing

- Timeout Model: exponential
- Heartbeat Interval: 126ms
- Election Timeout Base: 469ms
- Election Timeout Range: 269ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- snapshot
- membership_change
- leader_announce
- term_update

## State Machine

- Type: deterministic
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:rotation
- concept:term_epochs
- concept:randomized_timeout
- concept:lease_based_leadership
- voting:weighted_votes
- vote_granting:grant_based_on_priority
- concept:vote_revocations
- concept:majority_quorum
- log:hybrid
- log_structure:linked_list
- commit:index_based
- recovery:snapshot_transfer
- snapshot:adaptive
- dynamic_membership:remove_node
- failure_detection:heartbeat
- concept:heartbeat

---

## Simulation Results

### 3 Nodes

- Election Attempts: 54
- Elections Succeeded: 40
- Election Success Rate: 74.07%
- Messages Sent: 174
- Commits: 13
- Avg Messages/Commit: 13.38
- Leader Changes: 40
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 52
- Elections Succeeded: 47
- Election Success Rate: 90.38%
- Messages Sent: 317
- Commits: 34
- Avg Messages/Commit: 9.32
- Leader Changes: 47
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 43
- Elections Succeeded: 28
- Election Success Rate: 65.12%
- Messages Sent: 215
- Commits: 9
- Avg Messages/Commit: 23.89
- Leader Changes: 28
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 56
- Elections Succeeded: 56
- Election Success Rate: 100.00%
- Messages Sent: 673
- Commits: 19
- Avg Messages/Commit: 35.42
- Leader Changes: 56
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

