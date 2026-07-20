# BastionCoordination

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:48.327308Z
**Run ID**: RUN-070
**Seed**: 1700000070

---

## Architecture

- Architecture: fully_distributed
- Node Type: uniform
- Quorum Type: majority

## Leader Election

- Method: term_based
- Term/Epochs: True
- Randomized Timeout: True
- Lease-Based: True

## Voting

- Model: flexible_quorum
- Vote Granting: grant_to_candidate
- Vote Revocations: False

## Log Replication

- Type: value_log
- Structure: ring_buffer
- Commit Method: batch_commit

## Recovery

- Strategy: state_transfer
- Snapshot Policy: leader_change

## Membership

- Model: full_dynamic
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: heartbeat
- Model: byzantine

## Timing

- Timeout Model: adaptive
- Heartbeat Interval: 183ms
- Election Timeout Base: 472ms
- Election Timeout Range: 79ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- leader_announce

## State Machine

- Type: deterministic
- Safety: True
- Liveness: False

---

## Discovered Features

- leader_election:term_based
- concept:term_epochs
- concept:randomized_timeout
- concept:lease_based_leadership
- voting:flexible_quorum
- vote_granting:grant_to_candidate
- concept:majority_quorum
- log:value_log
- log_structure:ring_buffer
- commit:batch_commit
- recovery:state_transfer
- snapshot:leader_change
- dynamic_membership:full_dynamic
- failure_detection:heartbeat
- concept:heartbeat

---

## Simulation Results

### 3 Nodes

- Election Attempts: 74
- Elections Succeeded: 55
- Election Success Rate: 74.32%
- Messages Sent: 219
- Commits: 18
- Avg Messages/Commit: 12.17
- Leader Changes: 55
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 53
- Elections Succeeded: 50
- Election Success Rate: 94.34%
- Messages Sent: 282
- Commits: 14
- Avg Messages/Commit: 20.14
- Leader Changes: 50
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 56
- Elections Succeeded: 52
- Election Success Rate: 92.86%
- Messages Sent: 412
- Commits: 34
- Avg Messages/Commit: 12.12
- Leader Changes: 52
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 67
- Elections Succeeded: 56
- Election Success Rate: 83.58%
- Messages Sent: 605
- Commits: 28
- Avg Messages/Commit: 21.61
- Leader Changes: 56
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

