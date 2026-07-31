# SignalCoordination

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:48.903771Z
**Run ID**: RUN-081
**Seed**: 1700000081

---

## Architecture

- Architecture: fully_distributed
- Node Type: uniform
- Quorum Type: weighted

## Leader Election

- Method: voting_based
- Term/Epochs: True
- Randomized Timeout: False
- Lease-Based: True

## Voting

- Model: weighted_votes
- Vote Granting: grant_if_log_newer
- Vote Revocations: True

## Log Replication

- Type: hybrid
- Structure: linked_list
- Commit Method: pipeline_commit

## Recovery

- Strategy: incremental_snapshot
- Snapshot Policy: size_based

## Membership

- Model: joint_consensus
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: phi_accrual
- Model: crash_stop

## Timing

- Timeout Model: exponential
- Heartbeat Interval: 122ms
- Election Timeout Base: 252ms
- Election Timeout Range: 123ms

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

- Type: fsm
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:voting_based
- concept:term_epochs
- concept:lease_based_leadership
- voting:weighted_votes
- vote_granting:grant_if_log_newer
- concept:vote_revocations
- log:hybrid
- log_structure:linked_list
- commit:pipeline_commit
- recovery:incremental_snapshot
- snapshot:size_based
- dynamic_membership:joint_consensus
- failure_detection:phi_accrual

---

## Simulation Results

### 3 Nodes

- Election Attempts: 60
- Elections Succeeded: 42
- Election Success Rate: 70.00%
- Messages Sent: 154
- Commits: 16
- Avg Messages/Commit: 9.62
- Leader Changes: 42
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 50
- Elections Succeeded: 49
- Election Success Rate: 98.00%
- Messages Sent: 297
- Commits: 19
- Avg Messages/Commit: 15.63
- Leader Changes: 49
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 55
- Elections Succeeded: 53
- Election Success Rate: 96.36%
- Messages Sent: 398
- Commits: 28
- Avg Messages/Commit: 14.21
- Leader Changes: 53
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 63
- Elections Succeeded: 63
- Election Success Rate: 100.00%
- Messages Sent: 759
- Commits: 23
- Avg Messages/Commit: 33.00
- Leader Changes: 63
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

